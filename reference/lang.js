/*
  Scentrip — 언어 변경 버튼 (헤더 공용)
  각 화면 </body> 앞에서 불러오면 헤더 오른쪽(.nav-right 맨 앞)이나 로그인·가입 상단 바(.auth-top 오른쪽)에
  지구본 버튼을 넣는다. 스타일은 components.css '.lang'.
    <script src="../reference/lang.js"></script>
  - 지원: 한국어 · English · 日本語 · 简体中文 · 繁體中文 (선택값은 localStorage scentrip_lang, <html lang> 도 바꾼다)
  - 프로토타입은 한국어 화면만 있어서, 다른 언어를 고르면 선택만 기억하고 안내 토스트를 띄운다.
  TODO(개발): 언어별 번역 리소스(i18n) 연결 · 첫 방문은 브라우저 언어(Accept-Language)로 기본값 ·
              로그인 사용자는 계정 설정에 저장 · 언어별 URL(/en/ 등)로 검색 노출
*/
(function () {
  const KEY = "scentrip_lang";
  const LANGS = [
    { code: "ko",    short: "KO",   name: "한국어",   ko: "" },
    { code: "en",    short: "EN",   name: "English",  ko: "영어" },
    { code: "ja",    short: "JA",   name: "日本語",   ko: "일본어" },
    { code: "zh-CN", short: "简中", name: "简体中文", ko: "중국어 간체" },
    { code: "zh-TW", short: "繁中", name: "繁體中文", ko: "중국어 번체" },
  ];
  const read = () => { try { return localStorage.getItem(KEY) || "ko"; } catch (e) { return "ko"; } };
  let cur = LANGS.some((l) => l.code === read()) ? read() : "ko";
  document.documentElement.lang = cur;

  const globe = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.62,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"/></svg>';
  const check = '<svg class="check" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"/></svg>';

  const slot = document.querySelector(".nav-right") || document.querySelector(".auth-top");
  if (!slot) return;
  const wrap = document.createElement("div");
  wrap.className = "lang";
  wrap.innerHTML = `
    <button class="lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="언어 변경">
      ${globe}<span class="lang-cur"></span>
    </button>
    <div class="menu lang-menu" role="listbox" aria-label="언어">
      ${LANGS.map((l) => `<button class="menu-item" type="button" role="option" data-lang="${l.code}" lang="${l.code}">
        <span>${l.name}${l.ko ? ` <em lang="ko">${l.ko}</em>` : ""}</span>${check}</button>`).join("")}
    </div>`;
  if (slot.classList.contains("nav-right")) slot.prepend(wrap); else slot.append(wrap);

  const btn = wrap.querySelector(".lang-btn"), menu = wrap.querySelector(".lang-menu");
  function paint() {
    const l = LANGS.find((x) => x.code === cur);
    wrap.querySelector(".lang-cur").textContent = l.short;
    btn.setAttribute("aria-label", `언어 변경 (현재 ${l.name})`);
    menu.querySelectorAll(".menu-item").forEach((o) => o.setAttribute("aria-selected", o.dataset.lang === cur ? "true" : "false"));
  }
  function setOpen(on) {
    menu.classList.toggle("is-open", on);
    btn.setAttribute("aria-expanded", on ? "true" : "false");
    if (on) (menu.querySelector('[aria-selected="true"]') || menu.querySelector(".menu-item")).focus();
  }
  let toastT;
  function say(msg) {   // 화면마다 토스트가 없을 수 있어 직접 만든다 (components.css '.toast')
    let t = document.querySelector(".lang-toast");
    if (!t) { t = document.createElement("div"); t.className = "toast lang-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.innerHTML = `${globe}<span></span>`;
    t.querySelector("span").textContent = msg;
    requestAnimationFrame(() => t.classList.add("is-open"));
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("is-open"), 2800);
  }

  btn.addEventListener("click", (e) => { e.stopPropagation(); setOpen(!menu.classList.contains("is-open")); });
  menu.addEventListener("click", (e) => {
    const o = e.target.closest("[data-lang]"); if (!o) return;
    setOpen(false); btn.focus();
    if (o.dataset.lang === cur) return;
    cur = o.dataset.lang;
    try { localStorage.setItem(KEY, cur); } catch (x) {}
    document.documentElement.lang = cur;
    paint();
    const l = LANGS.find((x) => x.code === cur);
    say(cur === "ko" ? "한국어로 바꿨어요" : `${l.name}(${l.ko})로 바꿨어요 · 번역 화면은 개발 단계에서 연결돼요`);
  });
  menu.addEventListener("keydown", (e) => {   // ↑/↓ 로 항목 이동
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = [...menu.querySelectorAll(".menu-item")], i = items.indexOf(document.activeElement);
    items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length].focus();
  });
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); btn.focus(); } });
  paint();
})();
