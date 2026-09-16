import fs from 'node:fs';
import { connect, capture, root } from './lib.mjs';
const { browser, ctx, page } = await connect('9223', 'scentrip.vercel.app');
const out = JSON.parse(fs.readFileSync(`${root}/raw/withdraw-B.json`, 'utf8')); out.seen2 = [];
page.on('dialog', async (d) => { out.native.push(d.type() + ': ' + d.message()); await d.accept(); });
await page.goto('https://scentrip.vercel.app/mypage#withdraw', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
await page.locator('main input[placeholder="탈퇴"]').fill('탈퇴'); await page.waitForTimeout(300);
await page.locator('main button', { hasText: /^\s*회원탈퇴\s*$/ }).last().click(); await page.waitForTimeout(800);
await capture(page, 'withdraw-B-03-confirm-modal', 'dev', [1440]);
await page.locator('dialog[open] button, [role=dialog] button, [role=alertdialog] button', { hasText: '계정 삭제' }).first().click();
for (let i = 0; i < 60; i++) {
  await page.waitForTimeout(250);
  const s = await page.evaluate(() => location.pathname + location.search + location.hash + ' | ' + [...document.querySelectorAll('[role=status],[role=alert],[aria-live],dialog[open],[role=dialog]')].filter((e) => e.getClientRects().length).map((e) => e.innerText.trim()).filter(Boolean).join(' / ') + ' | ' + (document.querySelector('header')?.innerText || '').replace(/\s+/g, ' ').slice(-20)).catch(() => 'navigating');
  if (out.seen2.at(-1) !== s) out.seen2.push(s);
  if (i === 8) await capture(page, 'withdraw-B-04-after-delete', 'dev', [1440]).catch(() => {});
}
out.finalUrl2 = page.url();
await capture(page, 'withdraw-B-05-final', 'dev', [1440]).catch(() => {});
await page.goto('https://scentrip.vercel.app/mypage', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
out.afterMypage2 = page.url();
// 같은 Google 계정으로 다시 로그인 시도 → 가입 화면으로 가는지 (가입은 하지 않음)
await page.goto('https://scentrip.vercel.app/login', { waitUntil: 'networkidle' }); await page.waitForTimeout(1000);
await page.getByRole('button', { name: /Google로 계속하기/ }).click(); await page.waitForTimeout(4000);
const chooser = ctx.pages().find((p) => p.url().includes('accounts.google.com')) || page;
await chooser.getByText('design.sadie@gmail.com').first().click().catch(() => {});
for (let i = 0; i < 40; i++) { await page.waitForTimeout(500); if (page.url().startsWith('https://scentrip.vercel.app') && !page.url().includes('/auth/') && !page.url().includes('/login')) break; }
await page.waitForTimeout(2500);
out.relogin = { url: page.url(), text: (await page.evaluate(() => document.body.innerText)).slice(0, 200) };
await capture(page, 'withdraw-B-06-relogin', 'dev', [1440]).catch(() => {});
fs.writeFileSync(`${root}/raw/withdraw-B.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ native: out.native, seen2: out.seen2, finalUrl2: out.finalUrl2, afterMypage2: out.afterMypage2, relogin: out.relogin }, null, 1));
await browser.close().catch(() => {});
