import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const out = {};
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-B.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  await p.goto('https://scentrip.vercel.app/explore/tour_00031', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
  const skip = p.locator('[class*=tutorial-tour-module] button', { hasText: '건너뛰기' }); if (await skip.count()) await skip.first().click();
  await p.locator('button', { hasText: /^\s*리뷰 작성\s*$/ }).first().click(); await p.waitForTimeout(1200);
  const dlg = p.locator('dialog[open]').first();
  await dlg.locator('button[aria-label="4점"]').click();
  await dlg.locator('input[type=date]').fill('2026-09-12');
  await dlg.locator('textarea').fill('QA 검수용 두 번째 계정 리뷰입니다.');
  await dlg.locator('button', { hasText: '리뷰 저장' }).click(); await p.waitForTimeout(3000);
  const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip')); fs.writeFileSync(`${root}/.auth/state-B.json`, JSON.stringify(st));
  await ctx.close(); }
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  await p.goto('https://scentrip.vercel.app/explore/tour_00031/reviews', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  out.list = await p.evaluate(() => document.querySelector('main')?.innerText.slice(0, 1500));
  await capture(p, 'place-reviews-2reviews', 'dev', [1440]);
  const help = p.locator('button', { hasText: /도움/ }).first();
  out.helpBefore = (await help.count()) ? await help.innerText() : null;
  if (out.helpBefore) { await help.click(); await p.waitForTimeout(1200); out.helpAfter = await help.innerText(); out.helpPressed = await help.getAttribute('aria-pressed'); }
  await ctx.close(); }
console.log(JSON.stringify(out, null, 1));
await browser.close();
