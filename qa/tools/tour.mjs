// 첫 방문 튜토리얼을 단계별로 캡처하며 '다음'(마지막은 primary 버튼)으로 끝까지 진행
import fs from 'node:fs';
import { connect, capture } from './lib.mjs';
const label = process.argv[2];
const { browser, page } = await connect();
const steps = [];
for (let i = 1; i <= 12; i++) {
  await page.waitForTimeout(1200);
  const panel = page.locator('[class*="tutorial-tour-module"][class*="__panel"]');
  if (!(await panel.count()) || !(await panel.first().isVisible())) break;
  const info = await page.evaluate(() => {
    const p = document.querySelector('[class*="tutorial-tour-module"][class*="__panel"]');
    const s = document.querySelector('[class*="tutorial-tour-module"][class*="__spotlight"]');
    return { text: p.innerText, buttons: [...p.querySelectorAll('button')].map((b) => b.innerText.trim() || b.getAttribute('aria-label')),
      spotlight: s ? (({ x, y, width, height }) => ({ x, y, width, height }))(s.getBoundingClientRect()) : null };
  });
  steps.push(info);
  await capture(page, `${label}-tour-${String(i).padStart(2, '0')}`, 'dev');
  fs.writeFileSync(`qa/raw/${label}-tour.json`, JSON.stringify(steps, null, 1));
  const primary = page.locator('[class*="tutorial-tour-module"][class*="__primary"]').first();
  if (!(await primary.count())) break;
  await primary.click({ timeout: 5000 });
  await page.waitForTimeout(1500);   // 닫힘/다음 단계 애니메이션이 끝난 뒤 판정
  if (!(await page.locator('[class*="tutorial-tour-module"][class*="__primary"]').count())) break;
}
steps.push({ after: await page.evaluate(() => ({ url: location.href, ls: Object.keys(localStorage) })) });
fs.writeFileSync(`qa/raw/${label}-tour.json`, JSON.stringify(steps, null, 1));
console.log(JSON.stringify(steps, null, 1));
await browser.close().catch(() => {});
