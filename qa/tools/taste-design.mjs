// 원본 취향 테스트를 답(a/b 12자리)으로 진행하며 dev와 같은 라벨로 캡처
// 사용: node qa/tools/taste-design.mjs <라벨> <answers> <guest|member-first|member-retest>
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const [label, answers, state] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
await ctx.addInitScript((guest) => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); if (guest) localStorage.setItem('scentrip_auth', 'out'); } }, state === 'guest');
const page = await ctx.newPage();
await page.goto('http://localhost:5500/screens/onboarding-test.html' + (state && state !== 'guest' ? '' : ''), { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.locator('#introStart').click(); await page.waitForTimeout(1600);
const loading = [];
for (let i = 0; i < 12; i++) {
  await page.waitForTimeout(700);
  await capture(page, `${label}-q${String(i + 1).padStart(2, '0')}`, 'design', i === 0 ? undefined : [1440]);
  await page.locator(`.choice[data-pick="${answers[i]}"]`).click();
}
for (let t = 0; t < 80; t++) {
  const s = await page.evaluate(() => ({ active: document.querySelector('.stage.is-active')?.id, text: document.getElementById('loadingText')?.innerText }));
  if (!loading.length || loading.at(-1).text !== s.text || loading.at(-1).active !== s.active) loading.push({ ms: t * 200, ...s });
  if (t === 3) await capture(page, `${label}-loading`, 'design', [1440]);
  if (s.active === 'stage-result') break;
  await page.waitForTimeout(200);
}
if (state) await page.evaluate((st) => { const sel = document.getElementById('stateSelect'); if (sel) { sel.value = st; sel.dispatchEvent(new Event('change')); } }, state);
await page.waitForTimeout(1500);
await capture(page, `${label}-result`, 'design');
fs.writeFileSync(`${root}/raw/${label}-design-run.json`, JSON.stringify({ loading, result: await page.evaluate(() => document.body.innerText) }, null, 1));
console.log(JSON.stringify(loading));
await browser.close();
