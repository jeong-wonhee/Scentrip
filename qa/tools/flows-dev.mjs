// 배포본 플로우 실측 (계정 A / 비회원) — 클릭 후 URL · breadcrumb · 주요 텍스트 기록
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const V = 'https://scentrip.vercel.app';
const browser = await chromium.launch();
const out = {};
async function ctxFor(auth) {
  const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR', ...(auth === 'A' ? { storageState: `${root}/.auth/state-A.json` } : {}) });
  return c;
}
const crumb = (p) => p.evaluate(() => { const n = document.querySelector('nav[aria-label="현재 위치"]'); return n ? n.innerText.replace(/\s+/g, ' ') : null; });
const navSel = (p) => p.evaluate(() => [...document.querySelectorAll('header nav a')].filter((a) => a.getAttribute('aria-current') || /active|selected/.test(a.className) || getComputedStyle(a).color !== getComputedStyle(document.querySelector('header nav a')).color).map((a) => a.innerText));
async function step(name, auth, fn) {
  const c = await ctxFor(auth); const p = await c.newPage();
  const pops = []; c.on('page', (np) => pops.push(np));
  const native = []; p.on('dialog', async (d) => { native.push(d.message()); await d.dismiss(); });
  try { out[name] = await fn(p, pops); out[name].native = native; }
  catch (e) { out[name] = { error: e.message.split('\n')[0], url: p.url() }; }
  console.log(name, JSON.stringify(out[name]).slice(0, 500));
  if (auth === 'A') { const st = await c.storageState(); st.cookies = st.cookies.filter((x) => x.domain.includes('scentrip')); if (st.cookies.length) fs.writeFileSync(`${root}/.auth/state-A.json`, JSON.stringify(st)); }
  await c.close();
}
const go = async (p, u) => { await p.goto(V + u, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500); };
const clickNav = async (p, loc) => { await Promise.all([p.waitForURL((u) => true, { timeout: 15000 }).catch(() => {}), loc.click()]); await p.waitForLoadState('networkidle').catch(() => {}); await p.waitForTimeout(1800); };

await step('home→route-detail', 'A', async (p) => { await go(p, '/'); await clickNav(p, p.locator('a[href^="/planner/"]').first()); return { url: p.url(), crumb: await crumb(p), bar: await p.locator('button, a', { hasText: /여행 만들기|편집하기/ }).allInnerTexts() }; });
await step('explore→route-detail', 'A', async (p) => { await go(p, '/explore?tab=routes'); await clickNav(p, p.locator('main a[href^="/planner/"]').first()); return { url: p.url(), crumb: await crumb(p) }; });
await step('mytrip→route-detail(saved mine)', 'A', async (p) => { await go(p, '/dashboard?tab=routes'); await clickNav(p, p.locator('main a[href*="/planner"]').first()); await capture(p, 'flow-mytrip-route-detail', 'dev', [1440]); return { url: p.url(), crumb: await crumb(p), bar: await p.locator('main button, main a', { hasText: /여행 만들기|편집하기|수정/ }).allInnerTexts(), hrefs: await p.evaluate(() => [...document.querySelectorAll('nav[aria-label="현재 위치"] a')].map((a) => a.getAttribute('href'))) }; });
await step('route-detail CTA', 'A', async (p) => { await go(p, '/planner/river-forest'); await clickNav(p, p.locator('main a, main button', { hasText: '이 동선으로 여행 만들기' }).first()); await p.waitForTimeout(4000); await capture(p, 'flow-route-detail-cta', 'dev', [1440]); return { url: p.url(), text: (await p.evaluate(() => document.querySelector('main')?.innerText || '')).slice(0, 300) }; });
await step('news-detail CTA', 'A', async (p) => { await go(p, '/news/green-rest-guide'); await clickNav(p, p.locator('main a, main button', { hasText: '글 속 장소로 동선 만들기' }).first()); await p.waitForTimeout(2500); await capture(p, 'flow-news-detail-cta', 'dev', [1440]); return { url: p.url(), text: (await p.evaluate(() => document.querySelector('main')?.innerText || '')).slice(0, 400) }; });
await step('news-detail back link', 'A', async (p) => { await go(p, '/news'); await clickNav(p, p.locator('main a[href^="/news/"]').first()); const u1 = p.url(); await clickNav(p, p.locator('main a', { hasText: '여행 소식' }).first()); return { detail: u1, afterBack: p.url() }; });
await step('place-detail→reviews→back', 'A', async (p) => { await go(p, '/explore/tour_00031'); await clickNav(p, p.locator('main a, main button', { hasText: '전체 리뷰 보기' }).first()); const u1 = p.url(); await clickNav(p, p.locator('main a', { hasText: '대저생태공원' }).first()); const u2 = p.url(); await p.goBack(); await p.waitForTimeout(1500); return { reviews: u1, backLink: u2, historyBack: p.url() }; });
await step('explore place→detail→browser back', 'A', async (p) => { await go(p, '/explore'); await clickNav(p, p.locator('main a[href^="/explore/tour_"]').first()); const u1 = p.url(); const c = await crumb(p); const backLinks = await p.locator('main a', { hasText: /←|탐색|뒤로/ }).allInnerTexts(); await p.goBack(); await p.waitForTimeout(1500); return { detail: u1, crumb: c, backLinks, afterBack: p.url() }; });
await step('taste result(member) CTA', 'A', async (p) => { await go(p, '/taste?result=latest'); await p.waitForTimeout(1500); const cta = await p.locator('main a, main button', { hasText: /추천 보기|둘러보기|추천받기/ }).allInnerTexts(); const href = await p.locator('main a', { hasText: /추천 보기|둘러보기/ }).first().getAttribute('href').catch(() => null); if (cta.length) await clickNav(p, p.locator('main a, main button', { hasText: /추천 보기|둘러보기|추천받기/ }).first()); return { cta, href, url: p.url() }; });
await step('mypage hash nav + back', 'A', async (p) => { await go(p, '/mypage#account'); await p.locator('main button, main a', { hasText: /^\s*내 리뷰\s*$/ }).first().click(); await p.waitForTimeout(1000); const u1 = p.url(); await p.locator('main button, main a', { hasText: /^\s*고객센터\s*$/ }).first().click(); await p.waitForTimeout(1000); const u2 = p.url(); await p.goBack(); await p.waitForTimeout(1200); const u3 = p.url(); const h = await p.evaluate(() => document.querySelector('main h1, main h2')?.innerText); return { afterReviews: u1, afterSupport: u2, afterBack: u3, heading: h }; });
await step('mytrip empty CTA/tab links', 'A', async (p) => { await go(p, '/dashboard'); const tabs = await p.evaluate(() => [...document.querySelectorAll('nav.trip-tabs a, nav[aria-label="내 여행 메뉴"] a')].map((a) => [a.innerText, a.getAttribute('href')])); return { tabs }; });
await step('guest header login', 'guest', async (p) => { await go(p, '/explore/tour_00031'); const href = await p.locator('header a', { hasText: '로그인' }).first().getAttribute('href'); await clickNav(p, p.locator('header a', { hasText: '로그인' }).first()); return { href, url: p.url() }; });
await step('guest home 나만의 동선 만들기', 'guest', async (p) => { await go(p, '/'); await clickNav(p, p.locator('a[href="/planner"]').first()); await p.waitForTimeout(1500); return { url: p.url(), dialogs: await p.evaluate(() => [...document.querySelectorAll('dialog[open],[role=dialog]')].filter((d) => d.getClientRects().length).map((d) => d.innerText.slice(0, 80))) }; });
await step('guest taste result signup CTA', 'guest', async (p) => { await go(p, '/taste'); return { note: 'covered by account B run: /login?next=/dashboard' }; });
await step('404 links', 'guest', async (p) => { await go(p, '/news/not-exist-slug'); return { links: await p.evaluate(() => [...document.querySelectorAll('a')].map((a) => [a.innerText, a.getAttribute('href')])) }; });
await step('place-detail kakao/osm link targets', 'guest', async (p) => { await go(p, '/explore/tour_00031'); return { links: await p.evaluate(() => [...document.querySelectorAll('main a[target]')].map((a) => [a.innerText.trim(), a.getAttribute('href').slice(0, 60), a.getAttribute('target')])) }; });
await step('route-detail 지도 보기', 'guest', async (p) => { await go(p, '/planner/river-forest'); const a = p.locator('main a', { hasText: '지도 보기' }).first(); const href = await a.getAttribute('href'); await a.click(); await p.waitForTimeout(800); return { href, url: p.url(), scrollY: await p.evaluate(() => scrollY) }; });
await step('explore detail 이 장소로 동선 만들기(guest)', 'guest', async (p) => { await go(p, '/explore/tour_00031'); await clickNav(p, p.locator('main a', { hasText: '이 장소로 동선 만들기' }).first()); return { url: p.url() }; });
fs.writeFileSync(`${root}/raw/flows-dev.json`, JSON.stringify(out, null, 1));
await browser.close();
