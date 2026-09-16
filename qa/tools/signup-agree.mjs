import fs from 'node:fs';
import { connect, capture } from './lib.mjs';
const acct = process.argv[2] || 'A';
const { browser, ctx, page } = await connect();
const state = () => page.evaluate(() => ({
  checks: [...document.querySelectorAll('input[type=checkbox]')].map((c) => c.checked),
  btnDisabled: [...document.querySelectorAll('button')].find((x) => x.innerText.includes('가입'))?.disabled,
}));
const res = {};
await page.getByText('전체 동의').click(); await page.waitForTimeout(500);
res.allOn = await state();
await capture(page, `signup-${acct}-11-all-agreed`, 'dev');
await page.getByText('[필수] 만 14세 이상입니다').click(); await page.waitForTimeout(400);
res.oneOff = await state();
await capture(page, `signup-${acct}-12-one-unchecked`, 'dev', [1440]);
await page.getByText('[필수] 만 14세 이상입니다').click(); await page.waitForTimeout(400);
res.backOn = await state();
// 전문 보기 (이용약관) — 새 탭 여부
const [popup] = await Promise.all([ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null), page.getByText('전문 보기').first().click()]);
res.termsView = popup ? { newTab: true, url: popup.url() } : { newTab: false, url: page.url() };
if (popup) { await popup.waitForLoadState(); res.termsView.url = popup.url(); await popup.close(); }
await page.bringToFront();
res.afterTerms = await state();
fs.writeFileSync(`qa/raw/signup-${acct}-agree-states.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
await browser.close().catch(() => {});
