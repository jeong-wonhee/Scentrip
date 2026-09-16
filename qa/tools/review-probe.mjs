import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
// design: 리뷰 작성 화면
{ const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5500/screens/place-detail.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await p.locator('.pd-rv-write').click(); await p.waitForTimeout(1500);
  console.log('DESIGN', p.url()); console.log(await p.locator('[data-view="review-edit"]').innerText());
  await capture(p, 'review-write', 'design');
  await ctx.close(); }
// dev: 리뷰 작성 폼
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  await p.goto('https://scentrip.vercel.app/explore/tour_00031', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  await p.locator('button', { hasText: /^\s*리뷰 작성\s*$/ }).first().click(); await p.waitForTimeout(1500);
  console.log('DEV', p.url());
  const info = await p.evaluate(() => { const f = [...document.querySelectorAll('form,[role=dialog],dialog[open]')].filter((e) => e.getClientRects().length).pop(); return f ? { tag: f.tagName, role: f.getAttribute('role'), text: f.innerText, inputs: [...f.querySelectorAll('input,textarea,select,button')].map((i) => [i.tagName, i.type, i.placeholder, i.getAttribute('aria-label'), i.innerText?.trim(), i.maxLength]) } : null; });
  console.log(JSON.stringify(info, null, 1));
  await capture(p, 'review-write', 'dev');
  await ctx.close(); }
await browser.close();
