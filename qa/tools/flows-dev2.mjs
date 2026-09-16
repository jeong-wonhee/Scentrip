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

await step('home→route-detail', 'A', async (p) => { await go(p, '/'); await clickNav(p, p.locator('a[href^="/planner/"]:visible').first()); await capture(p, 'flow-home-route-detail', 'dev', [1440]); return { url: p.url(), crumb: await crumb(p), bar: await p.locator('button, a', { hasText: /여행 만들기|편집하기/ }).allInnerTexts() }; });
await step('explore→route-detail', 'A', async (p) => { await go(p, '/explore?tab=routes'); await clickNav(p, p.locator('main a[href^="/planner/"]:visible').first()); return { url: p.url(), crumb: await crumb(p) }; });
await step('mytrip→route-detail(saved mine)', 'A', async (p) => { await go(p, '/dashboard?tab=routes'); await clickNav(p, p.locator('article.trip-route-card a:visible').first()); await capture(p, 'flow-mytrip-route-detail', 'dev', [1440]); return { url: p.url(), crumb: await crumb(p), bar: await p.locator('main button, main a', { hasText: /여행 만들기|편집하기|수정/ }).allInnerTexts(), hrefs: await p.evaluate(() => [...document.querySelectorAll('nav[aria-label="현재 위치"] a')].map((a) => a.getAttribute('href'))) }; });
await step('news-detail CTA', 'A', async (p) => { await go(p, '/news/green-rest-guide'); await clickNav(p, p.locator('main a:visible, main button:visible', { hasText: '글 속 장소로 동선 만들기' }).first()); await p.waitForTimeout(4000); await capture(p, 'flow-news-detail-cta', 'dev', [1440]); return { url: p.url(), text: (await p.evaluate(() => document.querySelector('main')?.innerText || '')).slice(0, 400) }; });
await step('place-detail→reviews→back', 'A', async (p) => { await go(p, '/explore/tour_00031'); await clickNav(p, p.locator('main a, main button', { hasText: '전체 리뷰 보기' }).first()); const u1 = p.url(); await clickNav(p, p.locator('main a:visible', { hasText: '대저생태공원' }).first()); const u2 = p.url(); await p.goBack(); await p.waitForTimeout(1500); return { reviews: u1, backLink: u2, historyBack: p.url() }; });
await step('explore place→detail→browser back', 'A', async (p) => { await go(p, '/explore'); await clickNav(p, p.locator('main a[href^="/explore/tour_"]:visible').first()); const u1 = p.url(); const c = await crumb(p); const backLinks = await p.locator('main a', { hasText: /←|탐색|뒤로/ }).allInnerTexts(); await p.goBack(); await p.waitForTimeout(1500); return { detail: u1, crumb: c, backLinks, afterBack: p.url() }; });
await step('mypage hash nav + back', 'A', async (p) => { await go(p, '/mypage#account'); await p.locator('button:visible, a:visible', { hasText: /^\s*내 리뷰\s*$/ }).first().click(); await p.waitForTimeout(1000); const u1 = p.url(); await p.locator('button:visible, a:visible', { hasText: /^\s*고객센터\s*$/ }).first().click(); await p.waitForTimeout(1000); const u2 = p.url(); await p.goBack(); await p.waitForTimeout(1200); const u3 = p.url(); const h = await p.evaluate(() => document.querySelector('main h1, main h2')?.innerText); return { afterReviews: u1, afterSupport: u2, afterBack: u3, heading: h }; });
const prev = JSON.parse(fs.readFileSync(`${root}/raw/flows-dev.json`,'utf8'));
fs.writeFileSync(`${root}/raw/flows-dev.json`, JSON.stringify({ ...prev, ...out }, null, 1));
await browser.close();
