import { chromium } from 'playwright';
import { root } from './lib.mjs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
const p = await ctx.newPage();
await p.goto('https://scentrip.vercel.app/planner?mode=saved-places', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
await p.locator('[class*=savedCards] > button').nth(0).click(); await p.waitForTimeout(300);
await p.locator('[class*=savedCards] > button').nth(2).click(); await p.waitForTimeout(300);
console.log('bar:', JSON.stringify(await p.evaluate(() => document.querySelector('[class*=savedBottom]')?.innerText)));
await p.locator('button', { hasText: /개 장소로 동선 만들기/ }).click(); await p.waitForTimeout(1500);
const PREF = ['1박 2일', '자동차', '넉넉하게', '적당히', '1시간 이내', '혼자'];
for (let i = 0; i < 10; i++) {
  const info = await p.evaluate(() => { const w = document.querySelector('[class*=planner-wizard]'); return { step: w?.querySelector('[class*=__step]')?.innerText, h1: w?.querySelector('h1')?.innerText, picked: /선택한 장소/.test(w?.innerText || '') }; });
  console.log(JSON.stringify(info));
  if (!info.h1) break;
  for (const t of PREF) { const l = p.locator('main label', { hasText: new RegExp('^\\s*' + t) }).first(); if (await l.count() && await l.isVisible()) await l.click(); }
  const sum = p.locator('main details > summary', { hasText: '출발지' }).first();
  if (await sum.count() && await sum.isVisible()) { await sum.click(); await p.locator('main details[open] button', { hasText: '부산광역시' }).first().click(); }
  const next = p.locator('button', { hasText: /^다음$/ }).first();
  if (await next.count() && await next.isEnabled()) { await next.click(); await p.waitForTimeout(900); } else break;
}
await browser.close();
