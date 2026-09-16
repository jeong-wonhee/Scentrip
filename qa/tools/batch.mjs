// 원본(로컬 serve) · 배포본을 같은 상태로 열어 뷰포트 4종 캡처
// 사용: node qa/tools/batch.mjs [id필터(정규식)] [--side design|dev] [--vp 1440,1280,1024,640] [--jobs 3]
// 원본: http://localhost:5500/screens/…  (npx serve -l 5500 .)
// 배포본 회원 = qa/.auth/state-A.json (qa검수A · WHAN — 원본 샘플 사용자 이서연도 WHAN)
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
import { PAGES } from './pages.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const filter = args[0] && !args[0].startsWith('--') ? new RegExp(args[0]) : null;
const onlySide = opt('--side', null);
const widths = opt('--vp', '1440,1280,1024,640').split(',').map(Number);
const jobs = +opt('--jobs', '3');
const DESIGN = 'http://localhost:5500/screens/';
const DEV = 'https://scentrip.vercel.app';

const browser = await chromium.launch();
const tasks = [];
for (const p of PAGES) {
  if (filter && !filter.test(p.id)) continue;
  for (const side of ['design', 'dev']) {
    if (onlySide && side !== onlySide) continue;
    if (!p[side]) continue;
    tasks.push({ p, side });
  }
}
const report = [];
async function run({ p, side }) {
  const s = p[side];
  const auth = s.auth ?? p.auth ?? 'member';
  const ctxOpt = { viewport: { width: 1440, height: 900 }, locale: 'ko-KR', timezoneId: 'Asia/Seoul' };
  if (side === 'dev' && auth !== 'guest') ctxOpt.storageState = `${root}/.auth/state-${auth === 'member' ? 'A' : auth}.json`;
  const ctx = await browser.newContext(ctxOpt);
  if (side === 'design') {
    await ctx.addInitScript(({ out, ls }) => {
      if (sessionStorage.getItem('__qa_init')) return;   // 첫 로드에만 (화면 안에서 바꾼 값 유지)
      sessionStorage.setItem('__qa_init', '1');
      if (out) localStorage.setItem('scentrip_auth', 'out'); else localStorage.removeItem('scentrip_auth');
      for (const [k, v] of Object.entries(ls || {})) localStorage.setItem(k, v);
    }, { out: auth === 'guest', ls: s.ls || p.ls });
  }
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const url = side === 'design' ? DESIGN + s.url : DEV + s.url;
  let status = 'ok';
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(s.wait ?? 2000);
    if (s.setup) await s.setup(page);
    await capture(page, p.id, side, s.vp || p.vp || widths);
    report.push({ id: p.id, side, url, finalUrl: page.url(), http: resp?.status(), errors });
  } catch (e) {
    status = 'fail'; report.push({ id: p.id, side, url, finalUrl: page.url(), error: e.message.split('\n')[0], errors });
  }
  if (side === 'dev' && auth !== 'guest') {   // 갱신된 토큰을 다시 저장
    const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip'));
    if (st.cookies.length) fs.writeFileSync(`${root}/.auth/state-${auth === 'member' ? 'A' : auth}.json`, JSON.stringify(st));
  }
  await ctx.close();
  console.log(`${status} ${p.id} ${side} → ${page.url()}`);
}
const queue = [...tasks];
await Promise.all(Array.from({ length: jobs }, async () => { while (queue.length) await run(queue.shift()); }));
await browser.close();
const logPath = `${root}/raw/_batch-log.json`;
const prev = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf8')) : [];
const merged = [...prev.filter((r) => !report.some((x) => x.id === r.id && x.side === r.side)), ...report];
fs.writeFileSync(logPath, JSON.stringify(merged, null, 1));
