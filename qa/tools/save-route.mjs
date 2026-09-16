// 계정 A: 탐색 동선 카드 1개 찜 + AI 결과 동선 '내 여행에 저장' — 문구 변화 기록
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
const page = await ctx.newPage();
const out = {};
const texts = () => page.evaluate(() => [...document.querySelectorAll('[role=status],[role=alert],[aria-live]')].map((e) => e.innerText.trim()).filter(Boolean));
await page.goto('https://scentrip.vercel.app/explore?tab=routes', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
const h = page.locator('button[aria-label="다대포해수욕장 · 몰운대 저장"]').last();
out.routeHeartBefore = await h.getAttribute('aria-pressed');
await h.click(); await page.waitForTimeout(1500);
out.routeHeartAfter = await page.locator('button[aria-label^="다대포해수욕장 · 몰운대"]').last().evaluate((b) => ({ label: b.getAttribute('aria-label'), pressed: b.getAttribute('aria-pressed') }));
out.routeHeartToast = await texts();
// AI 결과 저장 — 결과 화면까지 진행
await page.goto('https://scentrip.vercel.app/planner?mode=ai', { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
const next = async () => { await page.locator('button', { hasText: /^다음$|^AI 맞춤 동선 추천 받기$/ }).first().click(); await page.waitForTimeout(900); };
await next();
for (const t of ['당일치기', '자동차', '넉넉하게', '적당히', '1시간 이내']) { await page.locator('main label', { hasText: new RegExp('^\\s*' + t) }).first().click(); await page.waitForTimeout(300);
  if (t === '1시간 이내') { await page.locator('main summary', { hasText: '출발지' }).first().click(); await page.locator('main details[open] button', { hasText: '부산광역시' }).first().click(); }
  await next(); }
await page.locator('button', { hasText: /^건너뛰기$/ }).first().click(); await page.waitForTimeout(900);
if (await page.locator('button', { hasText: /^AI 맞춤 동선 추천 받기$/ }).count()) await next();
for (let i = 0; i < 60 && !(await page.locator('button', { hasText: '내 여행에 저장' }).count()); i++) await page.waitForTimeout(1000);
await page.waitForTimeout(1500);
out.resultBarBefore = await page.evaluate(() => document.body.innerText.match(/아직 저장하지 않은 동선이에요|내 여행에 저장된 동선이에요[^\n]*/g));
await page.locator('button', { hasText: '내 여행에 저장' }).first().click();
const seen = [];
for (let i = 0; i < 16; i++) { await page.waitForTimeout(250); seen.push(...(await texts())); if (i === 4) await capture(page, 'route-result-saved', 'dev', [1440]); }
out.resultSaveToast = [...new Set(seen)];
out.resultBarAfter = await page.evaluate(() => document.body.innerText.match(/아직 저장하지 않은 동선이에요|[^\n]*저장된 동선[^\n]*|보러 가기/g));
out.url = page.url();
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(`${root}/raw/save-routes-log.json`, JSON.stringify(out, null, 1));
const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip')); fs.writeFileSync(`${root}/.auth/state-A.json`, JSON.stringify(st));
await browser.close();
