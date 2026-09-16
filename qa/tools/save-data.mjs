// 계정 A 데이터 준비: 부산 장소 4곳 찜 (장소 상세 하트) — 누를 때 토스트·라벨 변화도 기록
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
const page = await ctx.newPage();
const out = [];
for (const id of ['tour_00031', 'tour_00032', 'tour_00033', 'tour_00034']) {
  await page.goto(`https://scentrip.vercel.app/explore/${id}`, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  const heart = page.locator('main button[aria-label*="저장"]').first();
  const before = { label: await heart.getAttribute('aria-label'), pressed: await heart.getAttribute('aria-pressed') };
  if (before.pressed === 'true') { out.push({ id, before, note: 'already saved' }); continue; }
  await heart.click();
  const toasts = [];
  for (let i = 0; i < 12; i++) { await page.waitForTimeout(250); const t = await page.evaluate(() => [...document.querySelectorAll('[role=status],[role=alert],[aria-live]')].map((e) => e.innerText.trim()).filter(Boolean)); if (t.length) toasts.push(...t); if (i === 3 && id === 'tour_00031') await capture(page, 'place-detail-saved-toast', 'dev', [1440]); }
  const after = { label: await heart.getAttribute('aria-label'), pressed: await heart.getAttribute('aria-pressed') };
  out.push({ id, before, after, toasts: [...new Set(toasts)] });
}
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(`${root}/raw/save-places-log.json`, JSON.stringify(out, null, 1));
const st = await ctx.storageState(); st.cookies = st.cookies.filter((c) => c.domain.includes('scentrip')); fs.writeFileSync(`${root}/.auth/state-A.json`, JSON.stringify(st));
await browser.close();
