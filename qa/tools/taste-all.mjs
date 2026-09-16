// 16유형 결과를 원본(?type=)·배포(비회원 응답)로 캡처 — 1440 결과 화면 + 본문 텍스트
import fs from 'node:fs';
import { chromium } from 'playwright';
import { capture, root } from './lib.mjs';
const CODES = process.argv.slice(2).length ? process.argv.slice(2) : ['WHAN','WHAR','WHDN','WHDR','WLAN','WLAR','WLDN','WLDR','CHAN','CHAR','CHDN','CHDR','CLAN','CLAR','CLDN','CLDR'];
const AX = [['W','C'],['H','L'],['A','D'],['N','R']];
const ansOf = (code) => AX.map(([a], i) => (code[i] === a ? 'aaa' : 'bbb')).join('');
const browser = await chromium.launch();
const out = {};
for (const code of CODES) {
  out[code] = {};
  // design
  { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(() => { if (!sessionStorage.getItem('__qa')) { sessionStorage.setItem('__qa', 1); localStorage.clear(); localStorage.setItem('scentrip_auth', 'out'); } });
    const p = await ctx.newPage();
    await p.goto(`http://localhost:5500/screens/onboarding-test.html?type=${code}&state=guest`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
    await capture(p, `taste-type-${code}`, 'design', [1440]);
    out[code].design = await p.evaluate(() => document.querySelector('#stage-result')?.innerText);
    await ctx.close(); }
  // dev (비회원이 실제로 응답)
  { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'ko-KR' });
    const p = await ctx.newPage();
    await p.goto('https://scentrip.vercel.app/taste', { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
    await p.getByRole('button', { name: /취향 테스트 시작/ }).first().click(); await p.waitForTimeout(1200);
    const ans = ansOf(code);
    const src = fs.readFileSync(root + '/../screens/onboarding-test.html', 'utf8');
    const Q = eval(src.slice(src.indexOf('const QUESTIONS = [') + 'const QUESTIONS = '.length, src.indexOf('];', src.indexOf('const QUESTIONS = [')) + 1));
    const bg = (s) => { const n = s.replace(/<br>/g, '').replace(/\s+/g, ''); const g = new Set(); for (let i = 0; i < n.length - 1; i++) g.add(n.slice(i, i + 2)); return g; };
    for (let i = 0; i < 12; i++) {
      await p.waitForTimeout(900);
      const opts = await p.locator('main button').allInnerTexts();
      const want = bg(Q[i][ans[i]].desc + Q[i][ans[i]].key);
      let best = -1, bi = 0;
      opts.forEach((t, k) => { if (t.trim().length < 10) return; const g = bg(t); let c = 0; for (const x of g) if (want.has(x)) c++; const s = c / Math.min(g.size, want.size); if (s > best) { best = s; bi = k; } });
      await p.locator('main button').nth(bi).click();
    }
    for (let t = 0; t < 40 && !(await p.getByText('다시 검사하기').count()); t++) await p.waitForTimeout(500);
    await p.waitForTimeout(1500);
    await capture(p, `taste-type-${code}`, 'dev', [1440]);
    out[code].dev = await p.evaluate(() => document.querySelector('main')?.innerText || document.body.innerText);
    out[code].devCode = (out[code].dev.match(/\b[WC][HL][AD][NR]\b/) || [])[0];
    await ctx.close(); }
  console.log(code, '→ dev', out[code].devCode);
  fs.writeFileSync(`${root}/raw/taste-types.json`, JSON.stringify(out, null, 1));
}
await browser.close();
