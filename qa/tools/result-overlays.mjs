// 결과 화면 모달·메뉴: 원본(route-result.html) / 배포(AI 당일치기 생성 후)
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const vis = (p) => p.evaluate(() => [...document.querySelectorAll('[role=dialog],[role=alertdialog],[role=menu],dialog[open],details[open]')]
  .filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity !== '0' && !e.closest('[hidden]'))
  .map((e) => e.innerText.trim().slice(0, 1200)));
const prevOut = JSON.parse(fs.readFileSync(`${root}/raw/result-overlays.json`, 'utf8'));
const out = { design: prevOut.design, dev: { 'cond-modal': prevOut.dev['cond-modal'] } };
async function run(side, p, steps) {
  for (const [name, open, close] of steps) {
    const native = [];
    const h = async (d) => { native.push(d.type() + ': ' + d.message()); await d.dismiss(); };
    p.on('dialog', h);
    try { await open(p); await p.waitForTimeout(900); out[side][name] = { overlays: await vis(p), native }; await capture(p, `rr-${name}`, side, [1440]); }
    catch (e) { out[side][name] = { error: e.message.split('\n')[0] }; }
    p.off('dialog', h);
    try { await close(p); } catch (e) {}
    await p.waitForTimeout(500);
  }
}
if (false) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5500/screens/route-result.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(3500);
  const esc = async (p) => { await p.keyboard.press('Escape'); };
  await run('design', p, [
    ['cond-modal', async (p) => p.locator('#condBtn').click(), esc],
    ['origin-modal', async (p) => p.locator('[data-origin-edit]').first().click(), esc],
    ['place-menu', async (p) => { await p.locator('.tl-item').first().hover(); await p.locator('.tl-more-btn').first().click(); }, esc],
    ['place-delete', async (p) => { await p.locator('.tl-item').first().hover(); await p.locator('.tl-more-btn').first().click(); await p.locator('[data-act="del"]').first().click(); }, esc],
  ]);
  await ctx.close(); }
// dev
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  await p.goto('https://scentrip.vercel.app/planner?mode=ai', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  const next = async () => { await p.locator('button', { hasText: /^다음$|^AI 맞춤 동선 추천 받기$/ }).first().click(); await p.waitForTimeout(900); };
  await next();
  for (const t of ['당일치기', '자동차', '넉넉하게', '적당히', '1시간 이내']) { await p.locator('main label', { hasText: new RegExp('^\\s*' + t) }).first().click(); await p.waitForTimeout(300);
    if (t === '1시간 이내') { await p.locator('main summary', { hasText: '출발지' }).first().click(); await p.locator('main details[open] button', { hasText: '부산광역시' }).first().click(); }
    await next(); }
  await p.locator('button', { hasText: /^건너뛰기$/ }).first().click(); await p.waitForTimeout(900);
  if (await p.locator('button', { hasText: /^AI 맞춤 동선 추천 받기$/ }).count()) await next();
  for (let i = 0; i < 60 && !(await p.locator('button', { hasText: '내 여행에 저장' }).count()); i++) await p.waitForTimeout(1000);
  await p.waitForTimeout(2000);
  const esc = async (p) => { await p.keyboard.press('Escape'); const x = p.locator('[role=dialog] button[aria-label="닫기"]').first(); if (await x.count() && await x.isVisible()) await x.click(); };
  await run('dev', p, [
    ['origin-modal', async (p) => p.locator('main button', { hasText: '출발지 설정' }).first().click(), esc],
    ['place-menu', async (p) => p.locator('main summary[aria-label$="더보기"], main button[aria-label$="더보기"]').first().click(), async () => {}],
    ['place-delete', async (p) => { await p.locator('main button', { hasText: /^\s*장소 삭제\s*$/ }).first().click(); }, esc],
  ]);
  const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip')); fs.writeFileSync(`${root}/.auth/state-A.json`, JSON.stringify(st));
  await ctx.close(); }
fs.writeFileSync(`${root}/raw/result-overlays.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
