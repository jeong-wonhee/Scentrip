// 사용: node qa/tools/cap.mjs <라벨> [dev|design] [--port 9222] [--match 문자열] [--vp 1440,1280,1024,640]
// 떠 있는 Chrome(원격 디버깅)에 붙어 현재 탭을 뷰포트별로 캡처한다.
//  - qa/screens/{라벨}-{너비}-{dev|design}.png  (full page)
//  - qa/raw/{라벨}-{너비}-{dev|design}.html · .json (DOM · 보이는 요소의 텍스트 · 박스 · computed style)
import { connect, capture } from './lib.mjs';

const args = process.argv.slice(2);
const label = args[0];
const side = args[1] && !args[1].startsWith('--') ? args[1] : 'dev';
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
if (!label) { console.error('라벨이 필요합니다'); process.exit(1); }
const { browser, page } = await connect(opt('--port', process.env.CDP_PORT || '9222'), opt('--match', 'scentrip.vercel.app'));
if (!page) { console.error('대상 탭 없음'); process.exit(1); }
console.log('탭:', page.url());
await capture(page, label, side, opt('--vp', '1440,1280,1024,640').split(',').map(Number));
await browser.close().catch(() => {});   // CDP 연결만 끊음 — Chrome 창은 유지
