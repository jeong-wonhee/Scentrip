import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const browser = await chromium.launch();
const out = {};
// 계정 A 재검사 (CLDR 응답, 업데이트 버튼은 누르지 않음)
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-A.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  await p.goto('https://scentrip.vercel.app/taste', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  out.retestEntry = (await p.evaluate(() => document.querySelector('main')?.innerText || document.body.innerText)).slice(0, 300);
  const start = p.getByRole('button', { name: /취향 테스트 시작|다시 검사/ }).first();
  await start.click(); await p.waitForTimeout(1200);
  const src = fs.readFileSync(root + '/../screens/onboarding-test.html', 'utf8');
  const Q = eval(src.slice(src.indexOf('const QUESTIONS = [') + 'const QUESTIONS = '.length, src.indexOf('];', src.indexOf('const QUESTIONS = [')) + 1));
  const bg = (s) => { const n = s.replace(/<br>/g, '').replace(/\s+/g, ''); const g = new Set(); for (let i = 0; i < n.length - 1; i++) g.add(n.slice(i, i + 2)); return g; };
  for (let i = 0; i < 12; i++) {
    await p.waitForTimeout(900);
    const opts = await p.locator('main button').allInnerTexts(); const want = bg(Q[i].b.desc + Q[i].b.key);
    let best = -1, bi = 0; opts.forEach((t, k) => { if (t.trim().length < 10) return; const g = bg(t); let c = 0; for (const x of g) if (want.has(x)) c++; const s = c / Math.min(g.size, want.size); if (s > best) { best = s; bi = k; } });
    await p.locator('main button').nth(bi).click();
  }
  for (let t = 0; t < 40 && !(await p.getByText('다시 검사하기').count()); t++) await p.waitForTimeout(500);
  await p.waitForTimeout(1500);
  const txt = await p.evaluate(() => document.body.innerText);
  out.retestCTA = txt.slice(txt.lastIndexOf('이런 여행을 좋아해요'));
  await capture(p, 'taste-A-member-retest-CLDR-result', 'dev', [1440]);
  await ctx.close(); }
// 계정 B 로그아웃
{ const ctx = await browser.newContext({ storageState: `${root}/.auth/state-B.json`, viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
  const p = await ctx.newPage();
  await p.goto('https://scentrip.vercel.app/explore', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  const skip = p.locator('[class*=tutorial-tour-module] button', { hasText: '건너뛰기' }); if (await skip.count()) await skip.first().click();
  await p.locator('header button[aria-label$="계정 메뉴"]').click(); await p.waitForTimeout(600);
  await Promise.all([p.waitForLoadState('networkidle').catch(() => {}), p.locator('header button, header a, [role=menu] button', { hasText: '로그아웃' }).first().click()]);
  await p.waitForTimeout(3000);
  out.logout = { url: p.url(), header: (await p.locator('header').first().innerText()).replace(/\s+/g, ' ') };
  await ctx.close(); }
fs.writeFileSync(`${root}/raw/flows-end.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
