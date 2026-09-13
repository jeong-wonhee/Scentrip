/* ============================================================
   Scentrip — 로그인 모달 (비회원이 로그인이 필요한 기능을 눌렀을 때)
   페이지를 옮기지 않고 모달로 Google 로그인을 띄운다. 보던 화면은 그대로.
     · 기존 회원 → 로그인 → 누르려던 동작(저장·찜·도움돼요)을 마치고 이 화면을 새로고침
                  (다른 화면으로 가야 하는 동작 — 리뷰 쓰기·동선 가져오기 — 은 그 화면으로 이동)
     · 신규 회원 → 그때 가입 화면(signup.html)으로 이동, 가입이 끝나면 이 화면으로 돌아온다
     · 실패     → 모달 안에 안내 (login.html 과 같은 문구)
   헤더·배너의 '로그인' 버튼(data-login)은 모달이 아니라 login.html 로 이동한다.

   쓰는 법: ScentLogin.require({ reason: "save", then: () => { ...저장... } })
     reason — save | like | helpful | review | route (로그인 뒤 토스트 문구)
     then   — 로그인 직후 실행. 주소 문자열을 돌려주면 그 화면으로 이동, 아니면 새로고침
   필요한 것: components.css (.modal-scrim · .modal-box · .toast · .lm-*)
   TODO(개발): Google OAuth 를 팝업(또는 리다이렉트 후 복귀)으로 열고, 콜백 결과로 아래 분기를 그대로 탄다.
               누르려던 동작은 서버에 로그인 뒤 한 번 더 요청 (지금은 브라우저 저장소에 바로 기록)
   ============================================================ */
const ScentLogin = (() => {
  const DONE = {
    save:    "로그인했어요. 저장까지 해 뒀어요.",
    like:    "로그인했어요. 찜해 뒀어요.",
    helpful: "로그인했어요. 도움돼요를 남겼어요.",
  };
  const MSG = {   // login.html 의 오류 안내와 같은 문구
    cancel:    { t: "Google 로그인이 취소되었습니다. 다시 시도해 주세요." },
    expired:   { t: "로그인 시간이 만료되었습니다. 다시 로그인해 주세요." },
    failed:    { t: "Google 계정을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요." },
    network:   { t: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
    noemail:   { t: "이메일 제공에 동의해 주셔야 가입할 수 있어요.", d: "센트립은 계정 확인과 중요한 안내를 위해 이메일을 사용해요. 다시 로그인하면서 이메일 제공에 동의해 주세요." },
    suspended: { t: "이용이 제한된 계정이에요.", d: "제한 사유와 해제 방법은 info.scentrip@gmail.com 으로 문의해 주세요." },
  };
  const TOAST_KEY = "scentrip_login_toast";
  const G_LOGO = '<svg class="lm-g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
  const X = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>';
  const WARN = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"/></svg>';
  const PERK = {   // login.html '로그인하면 좋은 점' 과 같은 아이콘
    test: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.06L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30l63.44-23.06L113,26.5a16,16,0,0,1,30,0l23.06,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z"/></svg>',
    heart: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32Zm-50,174c-18.26-11.06-96-64.11-96-112A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0C142.22,58.36,158.55,48,178,48a46.06,46.06,0,0,1,46,46C224,141.87,146.24,194.93,128,206Z"/></svg>',
    map: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z"/></svg>',
  };
  const OK = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>';

  let scrim = null, pending = null, opener = null, busy = false;
  const $ = (id) => document.getElementById(id);
  const here = () => (location.pathname.split("/").pop() || "home.html") + location.search + location.hash;

  function build() {
    scrim = document.createElement("div");
    scrim.className = "modal-scrim";
    scrim.id = "lmScrim";
    scrim.hidden = true;
    scrim.innerHTML = `
      <div class="modal-box lm-box" role="dialog" aria-modal="true" aria-labelledby="lmTitle" aria-describedby="lmDesc">
        <button class="modal-close lm-close" type="button" data-lm-close aria-label="닫기">${X}</button>
        <h2 class="lm-title" id="lmTitle">나의 향 취향을<br>여행으로 이어가요</h2>
        <p class="lm-sub" id="lmDesc">센트립의 모든 서비스를 이용하시려면 회원가입해 주세요.</p>
        <ul class="lm-perks" aria-label="로그인하면 할 수 있어요">
          <li><span class="lm-perk-ic" aria-hidden="true">${PERK.test}</span>향 취향 검사 결과를 저장해요</li>
          <li><span class="lm-perk-ic" aria-hidden="true">${PERK.heart}</span>마음에 드는 여행지를 찜해요</li>
          <li><span class="lm-perk-ic" aria-hidden="true">${PERK.map}</span>나만의 여행 동선을 만들고 저장해요</li>
        </ul>
        <div class="lm-alert" id="lmAlert" role="alert" hidden>${WARN}<div><b id="lmAlertT"></b><p id="lmAlertD" hidden></p></div></div>
        <button class="lm-google" id="lmGoogle" type="button">${G_LOGO}<span class="lm-spin" hidden></span><span id="lmGoogleLabel">Google로 계속하기</span></button>
      </div>
      <!-- 검수용 — 개발 전달 시 제거 (실서비스는 Google 콜백 결과로 분기). login.html 스위처처럼 화면 오른쪽 아래 -->
      <label class="lm-qa">Google 인증 결과
        <select id="lmQa">
          <option value="existing">기존 회원 → 이 화면에서 로그인</option>
          <option value="new">신규 회원 → 가입 화면으로</option>
          <option value="cancel">로그인 취소</option>
          <option value="expired">인증 시간 만료</option>
          <option value="failed">인증 실패</option>
          <option value="network">네트워크·서버 오류</option>
          <option value="noemail">이메일 제공 미동의</option>
          <option value="suspended">이용 제한 계정</option>
        </select>
      </label>`;
    document.body.appendChild(scrim);
    scrim.addEventListener("click", (e) => { if (e.target === scrim || e.target.closest("[data-lm-close]")) close(); });
    scrim.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;   // 모달 안에서만 포커스가 돈다
      const f = [...scrim.querySelectorAll("button:not([disabled]), select")];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    });
    $("lmGoogle").addEventListener("click", go);
  }

  function setBusy(on) {
    busy = on;
    $("lmGoogle").disabled = on;
    scrim.querySelector(".lm-g").style.display = on ? "none" : "";
    scrim.querySelector(".lm-spin").hidden = !on;
    $("lmGoogleLabel").textContent = on ? "Google로 연결 중..." : "Google로 계속하기";
  }
  function showAlert(key) {
    const m = MSG[key];
    $("lmAlertT").textContent = m.t;
    $("lmAlertD").textContent = m.d || "";
    $("lmAlertD").hidden = !m.d;
    $("lmAlert").hidden = false;
  }

  function open(opts) {
    if (!scrim) build();
    pending = opts || {};
    opener = document.activeElement;
    $("lmAlert").hidden = true;
    setBusy(false);
    scrim.hidden = false;
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => { scrim.classList.add("is-open"); $("lmGoogle").focus(); });
  }
  function close() {
    if (!scrim || busy) return;
    scrim.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    setTimeout(() => { scrim.hidden = true; }, 180);
    if (opener && opener.focus) opener.focus();
  }

  /* Google로 계속하기 — 여러 번 눌러도 첫 요청만 (login.html 과 같은 규칙) */
  function go() {
    if (busy) return;
    $("lmAlert").hidden = true;
    setBusy(true);
    setTimeout(() => {
      const r = $("lmQa").value;
      if (r === "new") { location.href = "signup.html?" + new URLSearchParams({ next: here() }); return; }
      if (r === "existing") {
        try { localStorage.setItem("scentrip_auth", "in"); } catch (e) {}
        document.documentElement.classList.remove("is-guest");   // then() 안의 원래 동작이 회원으로 돈다
        const url = pending.then ? pending.then() : null;
        if (typeof url === "string") { location.href = url; return; }
        try { sessionStorage.setItem(TOAST_KEY, DONE[pending.reason] || "로그인했어요."); } catch (e) {}
        location.reload();
        return;
      }
      setBusy(false);
      showAlert(r);
      $("lmGoogle").focus();
    }, 1100);
  }

  /* 새로고침 뒤 '로그인했어요' 토스트 */
  function toastAfterReload() {
    let msg = null;
    try { msg = sessionStorage.getItem(TOAST_KEY); sessionStorage.removeItem(TOAST_KEY); } catch (e) {}
    if (!msg) return;
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.innerHTML = OK + "<span></span>";
    t.querySelector("span").textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("is-open"));
    setTimeout(() => t.classList.remove("is-open"), 2600);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", toastAfterReload);
  else toastAfterReload();

  /* 회원이면 바로 실행, 비회원이면 모달 */
  function require(opts) {
    if (!document.documentElement.classList.contains("is-guest")) {
      const url = opts && opts.then ? opts.then() : null;
      if (typeof url === "string") location.href = url;
      return true;
    }
    open(opts);
    return false;
  }
  return { require, open, close };
})();
