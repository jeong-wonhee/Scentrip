/*
  Scentrip — 첫 방문 튜토리얼 (코치마크 투어)
  신규 회원이 가입을 마친 뒤 홈·소식·탐색·내 여행에 처음 들어가면, 그 화면에서 할 수 있는 일을
  스포트라이트 + 말풍선으로 몇 단계 보여준다. 화면마다 한 번만. 스타일은 components.css '.tour'.

  사용법 (각 화면 </body> 앞)
    <script src="../reference/tour.js"></script>
    <script>ScentTour.run("home", [{ el: "#tasteCard", title: "…", body: "…" }, …]);</script>
  - el 이 없거나 화면에 안 보이는 단계는 건너뛴다. el 을 비우면 화면 가운데에 띄운다.
  - 노출 조건: 로그인 상태 + scentrip_tour_pending(가입 완료 때 signup.html 이 켬) + 이 화면을 아직 안 봄
  - 검수: 주소에 ?tour=1 을 붙이면 조건과 상관없이 다시 보인다.
  - TODO(개발): 본 여부는 계정에 저장 (기기가 바뀌어도 다시 뜨지 않게)
*/
(function () {
  const PENDING = "scentrip_tour_pending";
  const SEEN = "scentrip_tour_seen";
  const MAIN = ["home", "news", "explore", "mytrip"];   // 네 화면을 다 보면 pending 을 끈다
  const read = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  function shouldShow(key) {
    if (/[?&]tour=1\b/.test(location.search)) return true;
    if (document.documentElement.classList.contains("is-guest")) return false;
    return read(PENDING, false) === true && !read(SEEN, []).includes(key);
  }
  function markSeen(key) {
    const seen = read(SEEN, []);
    if (!seen.includes(key)) seen.push(key);
    write(SEEN, seen);
    if (MAIN.every((k) => seen.includes(k))) { try { localStorage.removeItem(PENDING); } catch (e) {} }
  }
  /* fit: true — 가로로 긴 줄(탭 바처럼 화면 폭 전체인 요소)은 안쪽 내용만 비춘다 */
  function fitRect(el) {
    const rs = [...el.children].map((c) => c.getBoundingClientRect()).filter((r) => r.width && r.height);
    if (!rs.length) return el.getBoundingClientRect();
    const top = Math.min(...rs.map((r) => r.top)), bottom = Math.max(...rs.map((r) => r.bottom));
    const left = Math.min(...rs.map((r) => r.left)), right = Math.max(...rs.map((r) => r.right));
    return { top, bottom, left, right, width: right - left, height: bottom - top };
  }
  function visible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
  }

  function run(key, steps) {
    const start = () => {
      if (!shouldShow(key)) return;
      const list = steps.filter((s) => !s.el || visible(document.querySelector(s.el)));
      if (list.length) open(key, list);
    };
    // 카드를 스크립트로 그리는 화면이 있어 로드가 끝난 뒤에 잰다
    if (document.readyState === "complete") setTimeout(start, 400);
    else window.addEventListener("load", () => setTimeout(start, 400));
  }

  function open(key, steps) {
    let i = 0;
    const lastFocus = document.activeElement;
    const root = document.createElement("div");
    root.className = "tour";
    root.innerHTML = `
      <div class="tour-hole" aria-hidden="true"></div>
      <div class="tour-pop" role="dialog" aria-modal="true" aria-labelledby="tourTitle" aria-describedby="tourBody">
        <div class="tour-top">
          <span class="tour-dots" aria-hidden="true">${steps.map(() => "<i></i>").join("")}</span>
          <span class="tour-count"></span>
        </div>
        <h2 class="tour-title" id="tourTitle"></h2>
        <p class="tour-body" id="tourBody"></p>
        <div class="tour-foot">
          <button class="tour-skip" type="button">건너뛰기</button>
          <span class="tour-nav">
            <button class="tour-prev" type="button">이전</button>
            <button class="tour-next" type="button"></button>
          </span>
        </div>
      </div>`;
    document.body.appendChild(root);
    const hole = root.querySelector(".tour-hole");
    const pop = root.querySelector(".tour-pop");
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";   // 투어 중에는 사용자 스크롤을 막는다 (단계를 넘길 때만 스크롤)

    function place() {
      const s = steps[i];
      const el = s.el && document.querySelector(s.el);
      const vw = innerWidth, vh = innerHeight, M = 16, PAD = 8, GAP = 14;
      if (!el) {
        root.classList.add("is-center");
        Object.assign(hole.style, { top: vh / 2 + "px", left: vw / 2 + "px", width: "0px", height: "0px" });
        pop.style.top = pop.style.left = "";
        return;
      }
      root.classList.remove("is-center");
      const r = s.fit ? fitRect(el) : el.getBoundingClientRect();
      // 화면보다 큰 영역은 보이는 부분만 비춘다
      const top = Math.max(r.top - PAD, 8), bottom = Math.min(r.bottom + PAD, vh - 8);
      const left = Math.max(r.left - PAD, 8), right = Math.min(r.right + PAD, vw - 8);
      Object.assign(hole.style, { top: top + "px", left: left + "px", width: right - left + "px", height: bottom - top + "px" });
      if (vw <= 560) { pop.style.top = pop.style.left = ""; return; }   // 모바일은 하단 시트 (CSS)
      const pw = pop.offsetWidth, ph = pop.offsetHeight;
      let y;
      if (bottom + GAP + ph <= vh - M) y = bottom + GAP;          // 아래
      else if (top - GAP - ph >= M) y = top - GAP - ph;           // 위
      else y = vh - M - ph;                                       // 둘 다 자리가 없으면 화면 아래에 겹쳐 띄운다
      pop.style.top = y + "px";
      pop.style.left = Math.min(Math.max(left, M), vw - M - pw) + "px";
    }

    function go(n) {
      i = n;
      const s = steps[i];
      const el = s.el && document.querySelector(s.el);
      if (el) el.scrollIntoView({ block: "center" });
      root.querySelector(".tour-title").textContent = s.title;
      root.querySelector(".tour-body").textContent = s.body;
      root.querySelector(".tour-count").textContent = `${i + 1} / ${steps.length}`;
      root.querySelectorAll(".tour-dots i").forEach((d, k) => d.classList.toggle("is-on", k === i));
      root.querySelector(".tour-prev").hidden = i === 0;
      root.querySelector(".tour-next").textContent = i === steps.length - 1 ? "시작하기" : "다음";
      pop.classList.remove("is-in");
      void pop.offsetWidth;
      pop.classList.add("is-in");
      place();
      setTimeout(place, 350);   // 부드러운 스크롤이 끝난 뒤 다시 맞춘다
      root.querySelector(".tour-next").focus();
    }
    function next() { if (i < steps.length - 1) go(i + 1); else close(); }
    function close() {
      markSeen(key);
      removeEventListener("resize", place);
      removeEventListener("scroll", place, true);
      document.removeEventListener("keydown", onKey, true);
      document.documentElement.style.overflow = prevOverflow;
      root.classList.remove("is-open");
      setTimeout(() => root.remove(), 220);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" && i > 0) { e.preventDefault(); go(i - 1); }
      else if (e.key === "Tab") {   // 말풍선 안에서만 이동
        const f = [...pop.querySelectorAll("button:not([hidden])")];
        const first = f[0], last = f[f.length - 1];
        if (!pop.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    root.querySelector(".tour-next").addEventListener("click", next);
    root.querySelector(".tour-prev").addEventListener("click", () => go(i - 1));
    root.querySelector(".tour-skip").addEventListener("click", close);
    addEventListener("resize", place);
    addEventListener("scroll", place, true);
    document.addEventListener("keydown", onKey, true);
    requestAnimationFrame(() => root.classList.add("is-open"));
    go(0);
  }

  window.ScentTour = { run };
})();
