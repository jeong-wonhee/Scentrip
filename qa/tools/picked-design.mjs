import { chromium } from 'playwright';
import { capture } from './lib.mjs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); } });
const p = await ctx.newPage();
await p.goto('http://localhost:5500/screens/route-create.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
const boxes = p.locator('#grid > button.card');
console.log('boxes', await boxes.count());
for (let i = 0; i < 2; i++) { await boxes.nth(i).click({ force: true }); await p.waitForTimeout(300); }
await capture(p, 'route-create-2picked', 'design', [1440]);
console.log('bar', JSON.stringify(await p.locator('#pickBar').innerText()));
await p.locator('#pickNext').click(); await p.waitForTimeout(1500);
console.log(p.url(), JSON.stringify((await p.locator('.rc-card').innerText()).slice(0, 400)));
await browser.close();
