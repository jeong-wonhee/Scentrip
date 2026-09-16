// 가입 화면 닉네임 검증 상태를 원본(signup.html checkNick)과 같은 입력값으로 차례로 만들어 캡처
import fs from 'node:fs';
import { connect, capture } from './lib.mjs';
const acct = process.argv[2] || 'A';
const { browser, page } = await connect();
const nick = page.locator('input:not([type=checkbox]):not([type=hidden])').last();
const read = () => page.evaluate(() => {
  const t = document.body.innerText; const a = t.indexOf('닉네임'), b = t.indexOf('가입 완료하기');
  const i = [...document.querySelectorAll('input')].filter((x) => !['checkbox', 'hidden'].includes(x.type)).pop();
  const btn = [...document.querySelectorAll('button')].find((x) => x.innerText.includes('가입'));
  return { value: i.value, field: t.slice(a, b).trim(), ariaInvalid: i.getAttribute('aria-invalid'), btnDisabled: btn?.disabled };
});
const cases = [
  ['02-blur-empty', ''], ['03-one-char', '가'], ['04-13chars', '가나다라마바사아자차카타파'], ['05-special', 'ab!'],
  ['06-double-space', 'ab  cd'], ['07-banned', 'admin'], ['08-banned-ko', '센트립'], ['09-taken', '향기'], ['10-valid', 'qa검수' + acct],
];
const res = {};
for (const [k, v] of cases) {
  await nick.click(); await nick.fill('');
  if (v) await nick.pressSequentially(v, { delay: 25 });
  await page.locator('h1').first().click(); await page.waitForTimeout(1500);
  res[k] = { input: v, ...(await read()) };
  await capture(page, `signup-${acct}-${k}`, 'dev', [1440]);
}
fs.writeFileSync(`qa/raw/signup-${acct}-nick-states.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await browser.close().catch(() => {});
