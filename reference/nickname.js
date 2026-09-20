/*
  Scentrip — 닉네임 규칙 (공용)
  가입(screens/signup.html)과 계정 설정 '이름 수정'(screens/mypage.html)이 같은 규칙을 쓰도록 한 곳에 모았다.
    <script src="../reference/nickname.js"></script>   // 화면 스크립트보다 먼저
    const r = ScentripNick.check(input.value, { current: 지금쓰는닉 });   // { ok, code, msg }

  규칙 (기획 2026-09-20)
    1. 길이       2자 이상 12자 이하 (글자 수 기준)
    2. 허용 문자  한글 완성형(가-힣) · 영문 대소문자 · 숫자
    3. 공백·특수문자 사용 불가 (중간 공백도 안 됨)
    4. 중복       다른 사용자가 쓰는 닉네임 불가
    5. 대소문자   영문 대소문자는 같은 닉네임으로 본다 (Wonhee = wonhee)
    6. 금칙어     욕설 · 혐오/성적 표현 · 사칭 가능 단어 · 서비스명이 '포함'되면 불가
                  단, 짧고 흔한 영단어 4개는 앞뒤에 영문이 붙으면 봐준다 (BANNED_EDGE)
    7. 앞뒤 공백  검사 전에 자동으로 지운다

  TODO(개발): 중복·금칙어는 서버가 최종 판정한다. 이 파일의 TAKEN/BANNED는 프로토타입용 샘플이다.
    - 중복: 소문자로 접은 값(nickname_lower)에 unique 인덱스. 입력 중에는 디바운스 조회, 저장 시 서버에서 한 번 더.
    - 금칙어: 목록은 서버(또는 관리 화면)에서 관리. 우회 표기(ㅅㅂ, 시1발, 사이 특수문자)는 서버에서 정규화 후 검사.
    - 목록에 단어를 더할 때 어느 쪽에 넣을지 정할 것. 한글은 늘 BANNED(포함) 쪽이다 —
      영문 경계 방식은 한글에 동작하지 않는다(한글만 있는 문자열에는 영문 경계가 생기지 않는다).
    - 한글은 포함 검사로 둔다 (2026-09-20 결정). 욕설이 새는 것보다 낫다고 보고,
      일상어가 걸리는 건 감수한다 — '고양이새끼'·'새끼손가락'('새끼'), '한남동주민'('한남'),
      '보지도못한'('보지') 같은 닉네임은 막힌다. 막힌 사람은 다른 이름을 쓰면 된다.
*/
(function () {
  const MIN = 2;
  const MAX = 12;

  /* 금칙어 — 욕설 · 혐오/성적 표현 · 사칭 가능 단어 · 서비스명 (샘플) */
  const BANNED = [
    /* 욕설 */
    "시발", "씨발", "씨팔", "개새끼", "새끼", "병신", "지랄", "좆", "존나", "미친놈", "미친년",
    "fuck", "shit", "bitch", "asshole",
    /* 혐오 · 성적 표현 */
    "일베", "메갈", "한남", "김치녀", "장애인비하", "섹스", "야동", "자지", "보지", "porn",
    /* 사칭 가능 단어 */
    "운영자", "관리자", "고객센터", "스태프", "공식계정", "admin", "administrator", "official",
    /* 서비스명 */
    "센트립", "scentrip",
  ];

  /* 짧고 흔해서 '포함' 으로 걸면 멀쩡한 닉네임까지 잡히는 영단어 —
     앞뒤에 영문이 붙어 있으면 다른 낱말로 보고 봐준다 (mastercard·supporter 는 통과,
     master123·마스터master 는 걸린다). 한글에는 쓸 수 없는 방식이라 영문 전용이다 */
  const BANNED_EDGE = ["master", "staff", "support", "sex"];
  const EDGE_RE = BANNED_EDGE.map((w) => new RegExp(`(?<![a-z])${w}(?![a-z])`));

  /* 이미 누가 쓰고 있는 닉네임 (샘플) — 전부 소문자로 적어 둔다 */
  const TAKEN = ["향기", "여행자", "나무향", "travelerkim"];

  const MSG = {
    empty:   "닉네임을 입력해 주세요",
    space:   "공백 없이 입력해 주세요",
    jamo:    "한글은 완성된 글자로 입력해 주세요",
    charset: "한글, 영문, 숫자만 쓸 수 있어요",
    short:   MIN + "자 이상 입력해 주세요",
    long:    MAX + "자 이하로 입력해 주세요",
    banned:  "사용할 수 없는 단어가 들어 있어요",
    taken:   "이미 사용 중인 닉네임이에요",
    ok:      "사용할 수 있는 닉네임이에요",
  };

  /* 7. 앞뒤 공백 제거 — 검사도 저장도 이 값으로 한다 */
  const normalize = (raw) => String(raw == null ? "" : raw).trim();

  /* 1. 길이는 글자 수로 센다 ("가"·"a"·"1" 모두 1자) */
  const len = (v) => Array.from(v).length;

  /* 5. 대소문자를 접은 비교용 값 */
  const fold = (v) => normalize(v).toLowerCase();

  function check(raw, opts) {
    const v = normalize(raw);
    const current = opts && opts.current ? fold(opts.current) : "";

    if (!v) return { ok: false, code: "empty", msg: MSG.empty, value: v };
    if (/\s/.test(v)) return { ok: false, code: "space", msg: MSG.space, value: v };          // 3
    if (/[ㄱ-ㅎㅏ-ㅣ]/.test(v)) return { ok: false, code: "jamo", msg: MSG.jamo, value: v };   // 2 (완성형만)
    if (!/^[가-힣a-zA-Z0-9]+$/.test(v)) return { ok: false, code: "charset", msg: MSG.charset, value: v };
    if (len(v) < MIN) return { ok: false, code: "short", msg: MSG.short, value: v };          // 1
    if (len(v) > MAX) return { ok: false, code: "long", msg: MSG.long, value: v };

    const low = v.toLowerCase();
    if (BANNED.some((w) => low.includes(w)) || EDGE_RE.some((re) => re.test(low)))
      return { ok: false, code: "banned", msg: MSG.banned, value: v };   // 6
    if (low !== current && TAKEN.includes(low)) return { ok: false, code: "taken", msg: MSG.taken, value: v };  // 4·5

    return { ok: true, code: "ok", msg: MSG.ok, value: v };
  }

  window.ScentripNick = { MIN, MAX, MSG, BANNED, BANNED_EDGE, TAKEN, normalize, fold, len, check };
})();
