import fs from 'node:fs';
import { connect, capture, root } from './lib.mjs';
const { browser, ctx, page } = await connect('9223', 'scentrip.vercel.app');
const out = { native: [], seen: [] };
page.on('dialog', async (d) => { out.native.push(d.type() + ': ' + d.message()); await d.accept(); });
const btn = page.locator('main button', { hasText: /^\s*회원탈퇴\s*$/ }).last();
const input = page.locator('main input[placeholder="탈퇴"]');
out.initialDisabled = await btn.isDisabled();
await capture(page, 'withdraw-B-01-initial', 'dev', [1440]);
await input.fill('탈퇴하기'); await page.waitForTimeout(400); out.wrongInputDisabled = await btn.isDisabled();
await input.fill('탈퇴'); await page.waitForTimeout(400); out.correctInputDisabled = await btn.isDisabled();
await capture(page, 'withdraw-B-02-ready', 'dev', [1440]);
await btn.click();
for (let i = 0; i < 40; i++) {
  await page.waitForTimeout(250);
  const s = await page.evaluate(() => location.pathname + location.search + location.hash + ' | ' + [...document.querySelectorAll('[role=status],[role=alert],[aria-live],dialog[open],[role=dialog]')].filter((e) => e.getClientRects().length).map((e) => e.innerText.trim()).filter(Boolean).join(' / ') + ' | ' + (document.querySelector('header')?.innerText || '').replace(/\s+/g, ' ').slice(0, 80)).catch(() => 'navigating');
  if (out.seen.at(-1) !== s) out.seen.push(s);
  if (i === 6) await capture(page, 'withdraw-B-03-after-click', 'dev', [1440]).catch(() => {});
}
await page.waitForTimeout(2000);
out.finalUrl = page.url();
await capture(page, 'withdraw-B-04-final', 'dev', [1440]).catch(() => {});
// 탈퇴 후 보호 화면 접근
await page.goto('https://scentrip.vercel.app/mypage', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
out.afterMypage = page.url();
fs.writeFileSync(`${root}/raw/withdraw-B.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close().catch(() => {});
