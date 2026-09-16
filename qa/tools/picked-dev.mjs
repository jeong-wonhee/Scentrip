import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
const p = await ctx.newPage();
await p.goto('https://scentrip.vercel.app/planner?mode=saved-places', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
const boxes = p.locator('[class*=savedCards] > button');
console.log('checkboxes', await boxes.count());
for (let i = 0; i < 2; i++) { await boxes.nth(i).click(); await p.waitForTimeout(400); }
await capture(p, 'route-create-2picked', 'dev', [1440]);
const bar = await p.evaluate(() => document.querySelector('[class*=savedBottom]')?.innerText);
console.log('bar', JSON.stringify(bar));
await p.locator('button', { hasText: /개 장소로 동선 만들기/ }).click(); await p.waitForTimeout(2000);
const s = await p.evaluate(() => ({ url: location.href, text: document.querySelector('[class*=planner-wizard]')?.innerText.slice(0, 600) }));
console.log(JSON.stringify(s, null, 1));
await capture(p, 'planner-picked-s01', 'dev', [1440]);
await browser.close();
