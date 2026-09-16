// 캡처 공용 함수 — cap.mjs(CLI)와 상태 전환 스크립트에서 같이 쓴다
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

export const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const VPS = { 1440: 900, 1280: 800, 1024: 768, 640: 800 };
const PROPS = ['display', 'position', 'color', 'background-color', 'background-image', 'font-family', 'font-size', 'font-weight',
  'line-height', 'letter-spacing', 'text-align', 'text-transform', 'white-space', 'padding-top', 'padding-right', 'padding-bottom',
  'padding-left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'gap', 'row-gap', 'column-gap', 'width', 'height',
  'max-width', 'min-width', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-radius', 'box-shadow', 'opacity',
  'overflow', 'object-fit', 'fill', 'stroke', 'grid-template-columns', 'flex-direction', 'justify-content', 'align-items', 'z-index'];


export async function connect(port = process.env.CDP_PORT || '9222', match = 'scentrip.vercel.app') {
  const browser = await chromium.connectOverCDP(`http://localhost:${port}`);
  const ctx = browser.contexts()[0];
  const page = ctx.pages().filter((p) => p.url().includes(match)).pop();
  return { browser, ctx, page };
}

export async function capture(page, label, side = 'dev', widths = [1440, 1280, 1024, 640]) {
  fs.mkdirSync(path.join(root, 'screens'), { recursive: true });
  fs.mkdirSync(path.join(root, 'raw'), { recursive: true });
  const cur = page.viewportSize();
for (const w of widths) {
    await page.setViewportSize({ width: w, height: VPS[w] });
    await page.waitForTimeout(700);
    const base = `${label}-${w}-${side}`;
    await page.screenshot({ path: path.join(root, 'screens', base + '.png'), fullPage: true, animations: 'disabled' }).catch(async (e) => {
      console.warn('full page 실패, 뷰포트만:', e.message); await page.screenshot({ path: path.join(root, 'screens', base + '.png') });
    });
    fs.writeFileSync(path.join(root, 'raw', base + '.html'), await page.content());
    const data = await page.evaluate((PROPS) => {
      const sel = (el) => {
        const parts = [];
        for (let e = el; e && e.nodeType === 1 && e !== document.documentElement; e = e.parentElement) {
          let s = e.tagName.toLowerCase();
          if (e.id) { parts.unshift(s + '#' + CSS.escape(e.id)); break; }
          const cls = [...e.classList].slice(0, 3).map((c) => '.' + CSS.escape(c)).join('');
          const sib = e.parentElement ? [...e.parentElement.children].filter((x) => x.tagName === e.tagName) : [];
          parts.unshift(s + cls + (sib.length > 1 ? `:nth-of-type(${sib.indexOf(e) + 1})` : ''));
        }
        return parts.join(' > ');
      };
      const out = [];
      for (const el of document.querySelectorAll('body *')) {
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META'].includes(el.tagName)) continue;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (!r.width || !r.height || cs.visibility === 'hidden' || cs.display === 'none') continue;
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim().replace(/\s+/g, ' ');
        const style = {}; for (const p of PROPS) style[p] = cs.getPropertyValue(p);
        out.push({ sel: sel(el), tag: el.tagName.toLowerCase(), text: own, box: [r.x, r.y + scrollY, r.width, r.height].map((v) => Math.round(v * 10) / 10),
          attrs: Object.fromEntries(['href', 'src', 'alt', 'placeholder', 'aria-label', 'title', 'role', 'type', 'target', 'disabled', 'viewBox']
            .map((a) => [a, el.getAttribute(a)]).filter(([, v]) => v != null)), style });
      }
      return { url: location.href, title: document.title, vw: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        bodyText: document.body.innerText, elements: out };
    }, PROPS);
    fs.writeFileSync(path.join(root, 'raw', base + '.json'), JSON.stringify(data));
    console.log(`${base}: 요소 ${data.elements.length}개, scrollWidth ${data.scrollWidth}`);
  }
    await page.setViewportSize(cur && cur.width ? cur : { width: 1440, height: 900 });
  await page.waitForTimeout(300);
}
