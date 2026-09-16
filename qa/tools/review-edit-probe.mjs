import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const out = {};
// design: 내 리뷰 관리 메뉴 · 삭제 모달 · 수정 화면
{ const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5500/screens/mypage.html#reviews', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await p.locator('button[aria-label$="리뷰 관리"]').first().click(); await p.waitForTimeout(500);
  out.designMenu = await p.locator('.menu.is-open, .popover.is-open, [role=menu]:visible').first().innerText().catch(() => null);
  await capture(p, 'review-menu', 'design', [1440]);
  await p.locator('[role=menu] button, .menu.is-open button', { hasText: '삭제' }).first().click(); await p.waitForTimeout(600);
  out.designDelete = await p.locator('#delModal').innerText().catch(() => null);
  await capture(p, 'review-delete-confirm', 'design', [1440]);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  await p.locator('button[aria-label$="리뷰 관리"]').first().click(); await p.waitForTimeout(400);
  await p.locator('[role=menu] button, .menu.is-open button', { hasText: '수정' }).first().click(); await p.waitForTimeout(800);
  out.designEdit = await p.locator('[data-view="review-edit"]').innerText();
  await capture(p, 'review-edit', 'design', [1440]);
  await ctx.close(); }
// dev: 마이페이지 수정 · 삭제(confirm 취소)
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  p.on('dialog', async (d) => { (out.devNative ||= []).push(d.type() + ': ' + d.message()); await d.dismiss(); });
  await p.goto('https://scentrip.vercel.app/mypage#reviews', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  await p.locator('button[aria-label="리뷰 삭제"]').first().click(); await p.waitForTimeout(1000);
  out.devDeleteDialogs = await p.evaluate(() => [...document.querySelectorAll('[role=dialog],[role=alertdialog],dialog[open]')].filter((e) => e.getClientRects().length).map((e) => e.innerText));
  await capture(p, 'review-delete-confirm', 'dev', [1440]);
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  const cancel = p.locator('dialog[open] button, [role=dialog] button, [role=alertdialog] button', { hasText: '취소' }).first();
  if (await cancel.count() && await cancel.isVisible()) await cancel.click();
  await p.goto('https://scentrip.vercel.app/mypage#reviews', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  out.devStillThere = await p.getByText('QA 검수용 리뷰입니다').count();
  await p.locator('button[aria-label="리뷰 수정"]').first().click(); await p.waitForTimeout(1500);
  out.devEditUrl = p.url();
  out.devEdit = await p.evaluate(() => { const d = [...document.querySelectorAll('dialog[open],[role=dialog]')].filter((e) => e.getClientRects().length).pop(); return d ? d.innerText : document.querySelector('main')?.innerText.slice(0, 800); });
  await capture(p, 'review-edit', 'dev', [1440]);
  await ctx.close(); }
fs.writeFileSync(`${root}/raw/review-edit-probe.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
