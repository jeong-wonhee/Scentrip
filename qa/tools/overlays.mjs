// 조작해야 보이는 상태(모달·팝오버·메뉴)를 원본·배포에서 같은 조작으로 캡처
// 사용: node qa/tools/overlays.mjs [id정규식]
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';

const D = 'http://localhost:5500/screens/';
const V = 'https://scentrip.vercel.app';
const click = (sel, opt = {}) => async (p) => { await p.locator(sel, opt).first().click(); await p.waitForTimeout(900); };
const seq = (...fns) => async (p) => { for (const f of fns) await f(p); };
const dialogText = (p) => p.evaluate(() => [...document.querySelectorAll('[role=dialog],[role=alertdialog],[role=menu],[role=listbox],.popover.is-open,.menu.is-open,.filter-pop.is-open,details[open]')]
  .filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity !== '0')
  .map((e) => ({ role: e.getAttribute('role'), label: e.getAttribute('aria-label'), text: e.innerText.trim().slice(0, 1500) })));

const STATES = [
  { id: 'ov-login-modal-save', auth: 'guest',
    design: { url: 'place-recommend.html', act: click('#grid .heart-btn') },
    dev: { url: '/explore', act: click('main button[aria-label="여행 장소 저장"]') } },
  { id: 'ov-login-modal-review', auth: 'guest',
    design: { url: 'place-detail.html', act: click('.pd-rv-write') },
    dev: { url: '/explore/tour_00031', act: click('button', { hasText: '로그인하고 리뷰 쓰기' }) } },
  { id: 'ov-profile-popover', auth: 'member',
    design: { url: 'home.html', act: click('#profilePill') },
    dev: { url: '/', act: click('header button[aria-label$="계정 메뉴"]') } },
  { id: 'ov-route-make-home', auth: 'member',
    design: { url: 'home.html', act: click('[data-make-route]') },
    dev: { url: '/', act: seq(click('a[href="/planner"]', { hasText: '나만의 동선 만들기' }), async (p) => { await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500); }) } },
  { id: 'ov-route-make-explore', auth: 'member',
    design: { url: 'route.html', act: click('[data-make-route]') },
    dev: { url: '/explore?tab=routes', act: seq(click('button', { hasText: '나만의 동선 만들기' }), async (p) => { await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500); }) } },
  { id: 'ov-route-make-mytrip', auth: 'member',
    design: { url: 'my-trip.html', act: click('.btn-make') },
    dev: { url: '/dashboard', act: seq(click('a[href^="/planner"]'), async (p) => { await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500); }) } },
  { id: 'ov-filter-region', auth: 'member',
    design: { url: 'place-recommend.html', act: click('#filterChips .chip-btn') },
    dev: { url: '/explore', act: click('main summary, main button', { hasText: /^\s*지역/ }) } },
  { id: 'ov-filter-feature', auth: 'member',
    design: { url: 'place-recommend.html', act: click('#filterChips .filter:nth-child(2) .chip-btn') },
    dev: { url: '/explore', act: click('main summary, main button', { hasText: /^\s*특징/ }) } },
  { id: 'ov-filter-taste', auth: 'member',
    design: { url: 'place-recommend.html', act: click('#filterChips .filter:nth-child(3) .chip-btn') },
    dev: { url: '/explore', act: click('main summary, main button', { hasText: /^\s*취향/ }) } },
  { id: 'ov-filter-region-search-empty', auth: 'member',
    design: { url: 'place-recommend.html', act: seq(click('#filterChips .chip-btn'), async (p) => { await p.locator('#rgInput').fill('없는지역'); await p.waitForTimeout(600); }) },
    dev: { url: '/explore', act: seq(click('main summary, main button', { hasText: /^\s*지역/ }), async (p) => { await p.locator('input[placeholder^="지역명 검색"]').first().fill('없는지역'); await p.waitForTimeout(800); }) } },
  { id: 'ov-mytrip-route-delete', auth: 'member',
    design: { url: 'my-trip-routes.html', act: seq(async (p) => { await p.locator('.rc-more').first().hover(); }, click('.rc-more-btn'), click('[data-delete]')) },
    dev: { url: '/dashboard?tab=routes', act: seq(click('summary[aria-label$="더보기"]'), click('details[open] button', { hasText: '동선 삭제' })) } },
  { id: 'ov-news-sort-region', auth: 'member',
    design: { url: 'news.html', act: click('#regionBtn') },
    dev: { url: '/news', act: async () => {} } },
];

const filter = process.argv[2] ? new RegExp(process.argv[2]) : null;
const browser = await chromium.launch();
const log = {};
for (const s of STATES) {
  if (filter && !filter.test(s.id)) continue;
  log[s.id] = {};
  for (const side of ['design', 'dev']) {
    const cfg = s[side]; if (!cfg) continue;
    const opts = { viewport: { width: 1440, height: 900 }, locale: 'ko-KR' };
    if (side === 'dev' && s.auth !== 'guest') opts.storageState = `${root}/.auth/state-A.json`;
    const ctx = await browser.newContext(opts);
    if (side === 'design') await ctx.addInitScript((out) => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); if (out) localStorage.setItem('scentrip_auth', 'out'); } }, s.auth === 'guest');
    const p = await ctx.newPage();
    try {
      await p.goto(side === 'design' ? D + cfg.url : V + cfg.url, { waitUntil: 'networkidle', timeout: 60000 });
      await p.waitForTimeout(1500);
      const before = p.url();
      await cfg.act(p);
      await p.waitForTimeout(600);
      log[s.id][side] = { url: p.url(), navigated: p.url() !== before, overlays: await dialogText(p) };
      await capture(p, s.id, side, [1440]);
    } catch (e) { log[s.id][side] = { error: e.message.split('\n')[0], url: p.url() }; }
    await ctx.close();
  }
  console.log(s.id, JSON.stringify(log[s.id]).slice(0, 1200));
}
const path = `${root}/raw/overlays-log.json`;
const prev = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : {};
fs.writeFileSync(path, JSON.stringify({ ...prev, ...log }, null, 1));
await browser.close();
