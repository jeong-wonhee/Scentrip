// 동선 만들기 조건 입력을 단계별로 캡처하며 끝까지 진행 (원본/배포 공용)
// 사용: node qa/tools/planner-walk.mjs <design|dev> <ai|region|picked> [--vp 1440] [--no-cap]
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';

const [side, mode] = process.argv.slice(2);
const noCap = process.argv.includes('--no-cap');
const widths = (process.argv.includes('--vp') ? process.argv[process.argv.indexOf('--vp') + 1] : '1440').split(',').map(Number);
const PREF = ['1박 2일', '자동차', '넉넉하게', '적당히', '1시간 이내', '혼자', '숙소 미정', '서울', '강원'];
const SELECT_PH = ['여행지 선택', '출발지 선택'];
const NEXT = ['다음', 'AI 맞춤 동선 추천 받기'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR',
  ...(side === 'dev' ? { storageState: `${root}/.auth/state-A.json` } : {}) });
if (side === 'design') await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); } });
const page = await ctx.newPage();
const url = side === 'dev' ? `https://scentrip.vercel.app/planner?mode=${mode}` : `http://localhost:5500/screens/route-conditions.html?mode=${mode}`;
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const scope = side === 'dev' ? 'main' : '.rc-card';

const snap = () => page.evaluate((scope) => {
  const root = document.querySelector(scope) || document.body;
  const vis = (e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
  return {
    url: location.pathname + location.search,
    headings: [...root.querySelectorAll('h1,h2,h3,legend,p,label,b')].filter(vis).map((e) => e.innerText.trim()).filter(Boolean),
    buttons: [...root.querySelectorAll('button,a,[role=radio],[role=option]')].filter(vis).map((b) => ({ t: b.innerText.trim().replace(/\s+/g, ' '), pressed: b.getAttribute('aria-pressed') ?? b.getAttribute('aria-checked') ?? b.getAttribute('aria-selected'), disabled: b.disabled || b.getAttribute('aria-disabled') === 'true', label: b.getAttribute('aria-label') })),
    inputs: [...root.querySelectorAll('input,select,textarea')].filter(vis).map((i) => ({ tag: i.tagName, type: i.type, ph: i.placeholder, label: i.getAttribute('aria-label'), options: i.tagName === 'SELECT' ? [...i.options].map((o) => o.text) : undefined })),
    progress: [...root.querySelectorAll('[role=progressbar]')].map((p) => `${p.getAttribute('aria-valuenow')}/${p.getAttribute('aria-valuemax')} ${p.getAttribute('aria-label') || ''} ${p.innerText.trim()}`),
  };
}, scope);

const log = [];
for (let n = 1; n <= 14; n++) {
  const s = await snap();
  log.push({ n, ...s });
  console.log(`\n## step ${n} ${s.url}\n  H: ${s.headings.join(' | ')}\n  B: ${s.buttons.map((b) => b.t + (b.pressed === 'true' ? '*' : '') + (b.disabled ? '(x)' : '')).join(' | ')}\n  I: ${JSON.stringify(s.inputs)}  P: ${s.progress}`);
  if (!noCap) await capture(page, `planner-${mode}-s${String(n).padStart(2, '0')}`, side, widths);
  const scopeEl = page.locator(scope).first();
  if (side === 'dev' && n === 1) {
    const MODE_LABEL = { ai: 'AI에게 여행지 추천 받기', region: '원하는 지역의 동선 추천 받기', picked: '찜한 장소로 동선 추천 받기' };
    const ml = scopeEl.locator('label', { hasText: MODE_LABEL[mode] }).first();
    if (await ml.count()) await ml.click();
  }
  // 선택 상자
  for (const ph of SELECT_PH) {
    const b = scopeEl.locator('button', { hasText: ph }).first();
    if (await b.count() && await b.isVisible()) {
      await b.click(); await page.waitForTimeout(300);
      const item = page.locator('[role=menuitemradio], [role=option], .menu-item', { hasText: /^\s*(서울|강원)\s*$/ }).first();
      if (await item.count()) await item.click();
    }
  }
  const sums = scopeEl.locator('details > summary');
  for (let i = 0; i < await sums.count(); i++) {
    const sum = sums.nth(i);
    if (!(await sum.isVisible()) || (await sum.getAttribute('data-selected')) === 'true') continue;
    await sum.click(); await page.waitForTimeout(300);
    const opt = scopeEl.locator('details[open] button', { hasText: /서울|강원/ }).first();
    if (await opt.count()) { await opt.click(); await page.waitForTimeout(400); }
    const still = scopeEl.locator('details[open] > summary').first();
    if (await still.count()) await still.click().catch(() => {});
  }
  for (const sel of await scopeEl.locator('select:not([aria-label^="Language"])').all()) {
    if (!(await sel.isVisible())) continue;
    const opts = await sel.locator('option').allTextContents();
    const want = opts.find((o) => /서울|강원/.test(o)) || opts[1];
    if (want) await sel.selectOption({ label: want }).catch(() => {});
  }
  // 선택지 — 이 단계에 보이는 선택지 중 선호 목록과 일치하는 것 (모드 선택 단계는 현재 모드 유지)
  for (const p of PREF) {
    const b = scopeEl.locator('button, [role=radio], label', { hasText: new RegExp('^\\s*' + p) });
    const cnt = await b.count();
    for (let i = 0; i < cnt; i++) {
      const el = b.nth(i);
      if (!(await el.isVisible())) continue;
      const pressed = await el.getAttribute('aria-pressed');
      if (pressed !== 'true') await el.click().catch(() => {});
    }
  }
  await page.waitForTimeout(400);
  const before = page.url();
  let clicked = false;
  for (const t of NEXT) {
    const nb = page.locator('button', { hasText: new RegExp('^' + t + '$') }).first();
    if (await nb.count() && await nb.isVisible() && await nb.isEnabled()) { await nb.click(); clicked = true; break; }
  }
  if (!clicked) {
    console.log('  → 다음 버튼 없음/비활성 — 종료');
    if (side === 'dev' && /1일차/.test(s.buttons.map((b) => b.t).join(' ')) && !noCap) await capture(page, `route-result-${mode}`, side);
    break;
  }
  await page.waitForTimeout(1800);
  // 마지막 단계 — 생성 중 문구를 캡처하고 화면이 바뀔 때까지 기다린다
  const busy = page.locator('button', { hasText: /만들고 있어요|만드는 중|추천 받는 중/ }).first();
  if (await busy.count()) {
    const s3 = await snap(); log.push({ n: 'busy', ...s3 });
    console.log(`\n## 생성 중 B: ${s3.buttons.map((b) => b.t).join(' | ')}`);
    if (!noCap) await capture(page, `planner-${mode}-generating`, side, [1440]);
    const t0 = Date.now();
    while (Date.now() - t0 < 120000 && (await busy.count()) && page.url() === before) await page.waitForTimeout(1000);
    console.log(`  생성 대기 ${Math.round((Date.now() - t0) / 1000)}s`);
  }
  if (page.url() !== before && !page.url().includes('planner?mode') && !page.url().includes('route-conditions')) {
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(4000);
    const s2 = await snap();
    log.push({ n: 'after', ...s2 });
    console.log(`\n## 이동 → ${page.url()}`);
    if (!noCap) await capture(page, `route-result-${mode}`, side);
    break;
  }
}
fs.writeFileSync(`${root}/raw/planner-${mode}-${side}-walk.json`, JSON.stringify(log, null, 1));
if (side === 'dev') { const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip')); fs.writeFileSync(`${root}/.auth/state-A.json`, JSON.stringify(st)); }
await browser.close();
