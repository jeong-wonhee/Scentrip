// 사용: node qa/tools/act.mjs '<async (page, ctx) 본문>' [--port 9222]
// 떠 있는 Chrome의 센트립 탭에 붙어 코드를 실행하고 결과(return 값)를 출력한다.
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const i = args.indexOf('--port'); const port = i >= 0 ? args[i + 1] : '9222';
const match = args.includes('--match') ? args[args.indexOf('--match') + 1] : 'scentrip.vercel.app';
const browser = await chromium.connectOverCDP(`http://localhost:${port}`);
const ctx = browser.contexts()[0];
const page = ctx.pages().filter((p) => p.url().includes(match)).pop();
const fn = new Function('page', 'ctx', `return (async () => { ${args[0]} })()`);
try { const r = await fn(page, ctx); if (r !== undefined) console.log(typeof r === 'string' ? r : JSON.stringify(r, null, 1)); }
catch (e) { console.error('ERR', e.message); process.exitCode = 1; }
await browser.close().catch(() => {});
