import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const out = {};
const statusTexts = (p) => p.evaluate(() => [...document.querySelectorAll('[role=alert],[role=status],[aria-live],.field-err,.is-err,[aria-invalid=true]')].filter((e) => e.getClientRects().length).map((e) => e.innerText?.trim()).filter(Boolean));
// design 빈 제출 검증
{ const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5500/screens/place-detail.html', { waitUntil: 'networkidle' }); await p.locator('.pd-rv-write').click(); await p.waitForTimeout(1200);
  out.designTextarea = await p.locator('#reText').getAttribute('placeholder');
  await p.locator('#reviewForm button[type=submit]').click(); await p.waitForTimeout(600);
  out.designEmptySubmit = await p.locator('[data-view="review-edit"]').innerText();
  await capture(p, 'review-write-empty-submit', 'design', [1440]);
  await ctx.close(); }
// dev: 빈 제출 → 작성 → 저장
const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
const p = await ctx.newPage();
p.on('dialog', async (d) => { (out.native ||= []).push(d.type() + ': ' + d.message()); await d.dismiss(); });
await p.goto('https://scentrip.vercel.app/explore/tour_00031', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
await p.locator('button', { hasText: /^\s*리뷰 작성\s*$/ }).first().click(); await p.waitForTimeout(1200);
const dlg = p.locator('dialog[open]').first();
await dlg.locator('button', { hasText: '리뷰 저장' }).click(); await p.waitForTimeout(800);
out.devEmptySubmit = { dialog: await dlg.innerText(), status: await statusTexts(p) };
await capture(p, 'review-write-empty-submit', 'dev', [1440]);
await dlg.locator('button[aria-label="5점"]').click();
await dlg.locator('input[type=date]').fill('2026-09-10');
await dlg.locator('textarea').fill('QA 검수용 리뷰입니다. 강바람과 풀 향이 좋았어요.');
await p.waitForTimeout(400);
out.devFilled = await dlg.innerText();
await capture(p, 'review-write-filled', 'dev', [1440]);
await dlg.locator('button', { hasText: '리뷰 저장' }).click();
const seen = [];
for (let i = 0; i < 16; i++) { await p.waitForTimeout(250); seen.push(...(await statusTexts(p))); }
out.devAfterSaveStatus = [...new Set(seen)];
await p.waitForTimeout(1500);
out.devDetailReviews = await p.evaluate(() => { const s = [...document.querySelectorAll('section')].find((x) => /^\s*리뷰/.test(x.querySelector('h2')?.innerText || '')); return s?.innerText; });
await capture(p, 'place-detail-with-review', 'dev');
fs.writeFileSync(`${root}/raw/review-flow.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip')); fs.writeFileSync(`${root}/.auth/state-A.json`, JSON.stringify(st));
await browser.close();
