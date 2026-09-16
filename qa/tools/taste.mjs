// 취향 검사를 원본 문항 기준 답(a/b 12자리)으로 진행하며 문항 · 로딩 · 결과를 캡처
// 사용: node qa/tools/taste.mjs <라벨> <aaaaaaaaaaaa> [--all-q] [--port 9222]
import fs from 'node:fs';
import { connect, capture, root } from './lib.mjs';
const [label, answers] = process.argv.slice(2);
const allQ = process.argv.includes('--all-q');
const port = process.argv.includes('--port') ? process.argv[process.argv.indexOf('--port') + 1] : '9222';
const src = fs.readFileSync(root + '/../screens/onboarding-test.html', 'utf8');
const QUESTIONS = eval(src.slice(src.indexOf('const QUESTIONS = [') + 'const QUESTIONS = '.length, src.indexOf('];', src.indexOf('const QUESTIONS = [')) + 1));
const norm = (s) => s.replace(/<br>/g, ' ').replace(/\s+/g, '');
const bigrams = (s) => { const n = norm(s); const set = new Set(); for (let i = 0; i < n.length - 1; i++) set.add(n.slice(i, i + 2)); return set; };
const sim = (x, y) => { const a = bigrams(x), b = bigrams(y); let c = 0; for (const g of a) if (b.has(g)) c++; return c / Math.max(1, Math.min(a.size, b.size)); };

const { browser, page } = await connect(port);
const log = [];
for (let i = 0; i < 12; i++) {
  await page.waitForTimeout(1300);
  const q = QUESTIONS[i];
  const btns = page.locator('main button');
  const dom = await page.evaluate(() => ({ text: document.querySelector('main')?.innerText || document.body.innerText,
    opts: [...document.querySelectorAll('main button')].map((b) => b.innerText.replace(/\s+/g, ' ').trim()) }));
  const opts = dom.opts.map((t, k) => ({ k, t })).filter((o) => o.t.length > 10);
  const want = q[answers[i]]; const wantText = want.desc + ' ' + want.key;
  const scored = opts.map((o) => ({ ...o, s: sim(o.t, wantText) })).sort((x, y) => y.s - x.s);
  const pick = scored[0];
  log.push({ n: i + 1, answer: answers[i], design: { ctx: q.ctx, title: q.title.replace(/<br>/g, '\n'), a: q.a.desc + ' / ' + q.a.key, b: q.b.desc + ' / ' + q.b.key },
    dev: { text: dom.text, opts: dom.opts }, picked: pick.t, score: +pick.s.toFixed(2) });
  if (allQ || i === 0) await capture(page, `${label}-q${String(i + 1).padStart(2, '0')}`, 'dev', i === 0 ? undefined : [1440]);
  await btns.nth(pick.k).click();
}
// 로딩 — 문구가 바뀌는 대로 기록, 첫 프레임은 캡처
const loading = []; let capturedLoading = false;
for (let t = 0; t < 60; t++) {
  const s = await page.evaluate(() => ({ url: location.pathname + location.search, text: document.body.innerText.slice(0, 400) }));
  if (!loading.length || loading.at(-1).text !== s.text) loading.push({ ms: t * 250, ...s });
  if (!capturedLoading && t === 2) { capturedLoading = true; await capture(page, `${label}-loading`, 'dev', [1440]); }
  if (/다시 검사|둘러보기|업데이트|가입하고/.test(s.text) && t > 4) break;
  await page.waitForTimeout(250);
}
await page.waitForTimeout(1500);
await capture(page, `${label}-result`, 'dev');
const result = await page.evaluate(() => ({ url: location.href, text: document.body.innerText }));
fs.writeFileSync(`${root}/raw/${label}-run.json`, JSON.stringify({ answers, log, loading, result }, null, 1));
console.log(JSON.stringify({ lowScore: log.filter((l) => l.score < 0.6).map((l) => [l.n, l.score, l.picked]), loading: loading.map((l) => l.text.slice(0, 80)), resultUrl: result.url, resultHead: result.text.slice(0, 500) }, null, 1));
await browser.close().catch(() => {});
