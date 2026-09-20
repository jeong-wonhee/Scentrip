# Scentrip 디자인 QA 리포트 — 원본 프로토타입 ↔ 배포본

- 원본(기준): 이 레포 `screens/*.html` (npx serve 로컬 렌더) · 배포(검수 대상): https://scentrip.vercel.app
- 검수일: 2026-09-16 · 브라우저: Playwright Chromium · 뷰포트 1440×900 / 1280×800 / 1024×768 / 640×800
- 회원 화면: 신규 Google 계정 A(qa검수A, 검사 없이 가입) · B(qa검수B, 비회원 검사 후 가입)로 확인
- 단계별 상세: `qa/00-page-map.md` · `qa/01-text.md` · `qa/02-style.md` · `qa/03-width.md` · `qa/04-flow.md` / 스크린샷 `qa/screens/` / 원시 데이터 `qa/raw/`
- 원본 샘플 데이터(장소명·소식 글·리뷰 내용 등 자리표시자)와 배포 실데이터의 값 차이는 제외 — 라벨·문구 규칙·구성·형식·스타일·동작만 대조

## 요약

### 심각도별

| 심각도 | 기준 | 건수 |
|---|---|---|
| P0 | 페이지 미구현 · 기획/플로우 미반영 · 텍스트 오류 · 1280 이상 레이아웃 깨짐 | 309 |
| P1 | 컬러·크기·아이콘·폰트 등 눈에 띄는 디자인 차이 · 1024 깨짐/접힘 차이 | 43 |
| P2 | 미세 간격·여백·라운드 차이 · 640에서만 차이 | 24 |
| **티켓 합계** | | **376** |

| 티켓 외 기록 | 건수 |
|---|---|
| 원본에 없는데 배포본에 있음 | 38 |
| 원본 확인 필요 | 7 |
| 확인필요(검수 미완) | 5 |

### 페이지별

| 페이지 | P0 | P1 | P2 | 합계 |
|---|---|---|---|---|
| 공통(토큰) | 0 | 4 | 1 | 5 |
| 공통(헤더) | 2 | 4 | 2 | 8 |
| 공통(카드) | 9 | 2 | 3 | 14 |
| 공통(탐색 필터 바) | 2 | 0 | 0 | 2 |
| 공통(로그인 모달) | 3 | 0 | 0 | 3 |
| 공통(튜토리얼) | 2 | 0 | 0 | 2 |
| 공통(리뷰 카드) | 3 | 0 | 0 | 3 |
| 공통(리뷰 작성·수정) | 7 | 0 | 0 | 7 |
| 공통(없는 상세) | 1 | 0 | 0 | 1 |
| 로그인 | 13 | 1 | 1 | 15 |
| 회원가입 | 18 | 1 | 1 | 20 |
| 취향 테스트 | 58 | 4 | 0 | 62 |
| 홈 | 18 | 4 | 1 | 23 |
| 소식 목록 | 13 | 1 | 1 | 15 |
| 소식 상세 | 14 | 0 | 0 | 14 |
| 탐색 · 장소 | 10 | 5 | 3 | 18 |
| 탐색 · 동선 | 9 | 1 | 0 | 10 |
| 장소 상세 | 13 | 3 | 2 | 18 |
| 장소 리뷰 | 9 | 0 | 1 | 10 |
| 동선 상세 | 12 | 2 | 3 | 17 |
| 동선 만들기 · 조건 | 19 | 2 | 1 | 22 |
| 동선 만들기 · 장소 선택 | 4 | 2 | 0 | 6 |
| 동선 만들기 · 결과 | 16 | 0 | 1 | 17 |
| 내 여행 | 1 | 0 | 0 | 1 |
| 내 여행 · 내 장소 | 7 | 1 | 1 | 9 |
| 내 여행 · 내 동선 | 5 | 0 | 1 | 6 |
| 마이페이지 | 22 | 2 | 0 | 24 |
| 센트립 소개 | 13 | 2 | 1 | 16 |
| 이용약관 | 3 | 2 | 0 | 5 |
| 개인정보처리방침 | 3 | 0 | 0 | 3 |

### 핵심 요약

1. **텍스트 전반 불일치** — 전 화면 document title이 "Scentrip"으로 고정, 로그인·테스트 표지·소개·약관·마이페이지 문구가 원본과 다른 카피로 구현됨. 취향 테스트 12문항 중 9문항 선택지 순서가 뒤바뀌고 16유형 결과 요약·프로필·행동 패턴·향 피라미드가 모두 다름
2. **기획/플로우 미반영** — 가입 완료 화면 없음, 동선 만들기 모달 대신 위저드 내 모드 선택 + `?mode=` 무시, 동선 상세 진입 경로별 breadcrumb 미분기, 결과 화면 삭제 확인·출발 설정 모달 없음, 비회원 게이트 대신 로그인 리다이렉트, **회원탈퇴 직후 사이트 전체 무한 리다이렉트**, 소식 목록 정렬·지역 필터·개수 없음
3. **AI 매칭 배지 라벨** — 서비스 핵심 개념인 "AI 매칭 %"가 "취향 유사도 %"/"유사도 %"로 바뀌었고 일부 카드(로컬 장소·소식)에는 배지 자체가 없음
4. **토큰 미준수** — 전역 자간 -3% 미적용, Phosphor → Lucide 아이콘, 토큰 밖 색·검정 그림자·라운드 사용
5. **창 축소 동작** — 1024에서 동선 그리드·소식·소개 카드 열 수, 마이페이지 메뉴 방향, 장소 선택 분할이 원본과 다르게 접힘. 640에서 헤더 내비가 둘째 줄로 내려감

## 티켓 — P0

### [SCT-001] P0 | 공통(헤더) | 로고 링크 aria-label 불일치
- 위치: 전 화면 헤더 로고 a[href='/'] (배포 aria-label='Scentrip 홈')
- 기대(디자인): 센트립 홈 (취향 테스트 화면은 '센트립 홈으로 이동') — 근거 `screens/home.html:304, screens/onboarding-test.html:1217`
- 실제(배포): Scentrip 홈 — 증거 `qa/raw/home-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: aria-label을 '센트립 홈'으로 (취향 테스트는 '센트립 홈으로 이동')
- 상세: `qa/01-text.md` F009

### [SCT-002] P0 | 공통(헤더) | 헤더 로그인 버튼이 현재 페이지 복귀 주소(next)를 넘기지 않음
- 위치: https://scentrip.vercel.app/explore/tour_00031 (비로그인) → 헤더 로그인
- 기대(디자인): login.html?next={현재 페이지 경로+쿼리+해시} → 로그인 후 보던 화면으로 복귀 — 근거 `screens/home.html:610 (data-login)`
- 실제(배포): /login (next 없음) — 증거 `qa/raw/flows-dev.json`
- 뷰포트: all
- 수정 가이드: 로그인 링크에 next=현재 경로
- 상세: `qa/04-flow.md` F420

### [SCT-003] P0 | 공통(카드) | 매칭 배지 라벨 불일치 'AI 매칭 %' → '취향 유사도 %'
- 위치: 홈·탐색·장소 상세 추천 등 장소/동선 카드 좌상단 배지 (배포: '✦ 취향 유사도 65%')
- 기대(디자인): AI 매칭 {n}% — 근거 `screens/home.html:527, screens/home.html:562`
- 실제(배포): 취향 유사도 {n}% — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 배지 문구를 'AI 매칭 {n}%'로 (카드 공용 컴포넌트)
- 상세: `qa/01-text.md` F021

### [SCT-004] P0 | 공통(카드) | 여행 장소 추천 카드 메타 — 취향 항목 누락, '매칭 근거' 추가
- 위치: 홈(/) · 탐색(/explore) · '님 취향의 여행 장소 추천' 카드 본문 하단
- 기대(디자인): 지역 · 특징 · 취향 3개 항목 (card-meta span 3개) — 근거 `screens/home.html:555`
- 실제(배포): 지역 · 특징 2개 + 별도 줄 '▸ {유형} 타입 · 매칭 근거' 펼침 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 메타를 지역/특징/취향 3항목으로, '매칭 근거' 펼침 제거
- 상세: `qa/01-text.md` F022

### [SCT-005] P0 | 공통(카드) | 장소 카드 지역이 '지역 정보 확인 중'으로 고정 노출
- 위치: 홈(/) · 탐색(/explore) · 여행 장소 추천·요즘 뜨는 로컬 여행 장소 카드 메타 첫 항목 (고투몰, 이효석문화예술촌, 임실N장미축제, 호가정, 용아생가, 월봉서원)
- 기대(디자인): 지역명 (예: 충청남도 홍성군) — 근거 `screens/home.html:555`
- 실제(배포): 지역 정보 확인 중 (페이지 로드 후에도 바뀌지 않음) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지역 데이터가 없을 때 로딩 문구가 남지 않게 — 지역명 표시
- 상세: `qa/01-text.md` F023

### [SCT-006] P0 | 공통(카드) | 동선 카드 제목 구성 불일치
- 위치: 홈(/) · 탐색 동선(/explore?tab=routes) — 동선 카드 제목
- 기대(디자인): [대표 장소명] + 동선 이름 (예: [안동하회마을] 안동 숨은 힙플레이스 탐방), 대표 장소명은 브랜드색 — 근거 `screens/home.html:591, 611`
- 실제(배포): '장소A · 장소B' 한 덩어리 (예: 중랑캠핑숲 · 망우리공원) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목을 [대표 장소] + 동선 이름 2요소로
- 상세: `qa/01-text.md` F026

### [SCT-007] P0 | 공통(카드) | 동선 카드 메타 구성 불일치
- 위치: 홈(/) · 탐색 동선(/explore?tab=routes) — 동선 카드 하단 메타
- 기대(디자인): 장소 수 · 일정 · 코스 여유도 · {유형} 취향 (예: 5개 장소 · 2박3일 · 여유로운 코스 · OOO 취향) — 근거 `screens/home.html:611`
- 실제(배포): 2개 장소 · 당일 · 이동 약 6분 · 여유로운 코스 ('취향' 항목 없음, '이동 약 N분' 추가) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '이동 약 N분' 제거, 끝에 '{유형} 취향' 추가
- 상세: `qa/01-text.md` F027

### [SCT-008] P0 | 공통(카드) | 동선 카드 지역 표기 형식 불일치 (시·도 전체 이름)
- 위치: 탐색 동선 캐러셀 카드 메타 · 동선 카드 메타
- 기대(디자인): 시·도 약칭 + 시·군·구 (예: 전남 담양, 경북 안동) — 근거 `screens/route.html:443`
- 실제(배포): 시·도 전체 이름만 (예: 서울특별시, 부산광역시) — 증거 `qa/screens/explore-routes-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지역을 '시도약칭 시군구'로
- 상세: `qa/01-text.md` F099

### [SCT-009] P0 | 공통(카드) | 장소 카드 지역 표기 형식 불일치 (시·도 전체 이름)
- 위치: /dashboard · /explore · 홈 장소 카드 메타 첫 항목
- 기대(디자인): 시·도 약칭 + 시·군·구 (예: 강원 강릉시, 서울 종로구) — 근거 `screens/my-trip.html:477-483`
- 실제(배포): 시·도 전체 이름 + 시·군·구 (예: 부산광역시 강서구) — 증거 `qa/screens/mytrip-places-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지역 표기를 '시도약칭 시군구'로
- 상세: `qa/01-text.md` F171

### [SCT-010] P0 | 공통(카드) | 저장 동선 카드 대괄호 항목이 대표 장소가 아닌 지역
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — 동선 카드 제목 앞 [ ]
- 기대(디자인): [대표 장소명] (예: [강릉], [연무장길], [황리단길]) — 근거 `screens/my-trip-routes.html:508-520, 489`
- 실제(배포): [시·도 정식명] (예: [경상남도], [부산광역시]) — 증거 `qa/screens/mytrip-routes-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 대괄호에 대표 장소명
- 상세: `qa/01-text.md` F175

### [SCT-011] P0 | 공통(카드) | 내 동선 카드 배지 라벨 '유사도 %'
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — 동선 카드 좌상단 배지
- 기대(디자인): AI 매칭 {n}% — 근거 `screens/my-trip-routes.html:483`
- 실제(배포): 유사도 {n}% (탐색·홈은 "취향 유사도") — 증거 `qa/screens/mytrip-routes-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 'AI 매칭 {n}%'로 통일
- 상세: `qa/01-text.md` F177

### [SCT-012] P0 | 공통(탐색 필터 바) | 지역 검색 결과 0건 안내 문구 누락
- 위치: /explore 지역 필터 팝오버 — 검색어 '없는지역'
- 기대(디자인): '‘{검색어}’에 맞는 지역이 없어요' / '시·도나 시·군·구 이름으로 검색해 보세요' — 근거 `screens/place-recommend.html:611`
- 실제(배포): '검색 결과 0곳'만 표시 — 증거 `qa/screens/ov-filter-region-search-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 빈 결과 안내 2줄
- 상세: `qa/01-text.md` F300

### [SCT-013] P0 | 공통(탐색 필터 바) | 취향 필터 옵션 보조 설명 3개 불일치
- 위치: /explore 취향 타입 필터 팝오버
- 기대(디자인): 사색가 타입 "박물관·독립서점 탐방 선호" / 미학가 타입 "미술관·공연 관람 선호" / 모험가 타입 "계곡·폭포 전망 선호" — 근거 `screens/place-recommend.html:407, 413, 416`
- 실제(배포): "박물관·독립서점 선호" / "미술관·공연 선호" / "계곡·폭포 선호" — 증거 `qa/screens/ov-filter-taste-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 보조 설명 원본대로
- 상세: `qa/01-text.md` F301

### [SCT-014] P0 | 공통(로그인 모달) | 로그인 모달 제목 줄바꿈 불일치
- 위치: 비회원이 찜·리뷰 쓰기 등 클릭 시 모달 제목 (예: /explore 카드 하트)
- 기대(디자인): 나의 향 취향을<br>여행으로 이어가요 (2줄) — 근거 `reference/login-modal.js:54`
- 실제(배포): 나의 향 취향을 여행으로 이어가요 (1줄) — 증거 `qa/screens/ov-login-modal-save-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목 2줄로
- 상세: `qa/01-text.md` F296

### [SCT-015] P0 | 공통(로그인 모달) | 로그인 모달 설명 문구 불일치
- 위치: 로그인 모달 제목 아래 설명
- 기대(디자인): 센트립의 모든 서비스를 이용하시려면 회원가입해 주세요. — 근거 `reference/login-modal.js:55`
- 실제(배포): 로그인하면 마음에 드는 장소를 저장하고 나만의 여행 동선을 만들 수 있어요. — 증거 `qa/screens/ov-login-modal-save-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 문구 교체
- 상세: `qa/01-text.md` F297

### [SCT-016] P0 | 공통(로그인 모달) | 로그인 모달 '로그인하면 할 수 있어요' 혜택 3줄 누락
- 위치: 로그인 모달 설명과 Google 버튼 사이
- 기대(디자인): 아이콘 + '향 취향 검사 결과를 저장해요' / '마음에 드는 여행지를 찜해요' / '나만의 여행 동선을 만들고 저장해요' (ul aria-label '로그인하면 할 수 있어요') — 근거 `reference/login-modal.js:56-60`
- 실제(배포): 혜택 목록 없음 — 증거 `qa/screens/ov-login-modal-save-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 혜택 3줄 추가
- 상세: `qa/01-text.md` F298

### [SCT-017] P0 | 공통(튜토리얼) | 튜토리얼 마지막 단계 버튼 라벨 불일치
- 위치: 홈·소식·탐색·내 여행 코치마크 패널 primary 버튼 (tutorial-tour-module__primary)
- 기대(디자인): 알겠어요 — 근거 `reference/tour.js:122`
- 실제(배포): 확인했어요 — 증거 `qa/screens/home-A-tour-04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 마지막 단계 라벨을 '알겠어요'로
- 상세: `qa/01-text.md` F065

### [SCT-018] P0 | 공통(튜토리얼) | 튜토리얼 1단계에서 '이전' 버튼 노출
- 위치: 코치마크 패널 1/N 단계 (tutorial-tour-module__actions)
- 기대(디자인): 1단계에서는 이전 버튼 숨김 — 근거 `reference/tour.js:120`
- 실제(배포): 1단계에도 이전 버튼 노출 — 증거 `qa/screens/home-A-tour-01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 첫 단계에서 이전 버튼 hidden
- 상세: `qa/01-text.md` F066

### [SCT-019] P0 | 공통(리뷰 카드) | 리뷰 카드 작성자 줄 — 아바타·취향 유형·방문일 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 카드 상단
- 기대(디자인): 아바타 + 닉네임 / '{코드} · {타입명} · YY.MM.DD 방문' (예: WHAN · 감성가 타입 · 26.08.20 방문) — 근거 `screens/place-detail.html:393-397`
- 실제(배포): 닉네임만, 방문일은 하단 날짜 줄로 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 작성자 줄 원본대로
- 상세: `qa/01-text.md` F334

### [SCT-020] P0 | 공통(리뷰 카드) | 리뷰 카드 하단 날짜 형식 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 카드 하단
- 기대(디자인): 작성일 YYYY.MM.DD (예: 2026.08.21) — 근거 `screens/place-detail.html:403`
- 실제(배포): 2026. 9. 10. 방문 · 2026. 9. 16. — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 'YYYY.MM.DD' 작성일만
- 상세: `qa/01-text.md` F335

### [SCT-021] P0 | 공통(리뷰 카드) | 내 리뷰 카드 — ⋯ 메뉴(리뷰 수정·리뷰 삭제) 대신 휴지통 버튼
- 위치: https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 내 리뷰 카드 우상단
- 기대(디자인): ⋯ 버튼(aria-label '내 리뷰 관리') → 메뉴 '리뷰 수정' / '리뷰 삭제' — 근거 `screens/place-detail.html:383-389`
- 실제(배포): 휴지통 아이콘(aria-label '리뷰 삭제')만 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 케밥 메뉴로
- 상세: `qa/01-text.md` F336

### [SCT-022] P0 | 공통(리뷰 작성·수정) | 리뷰 작성 폼 — 장소 위치 줄·별점 제목 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 / https://scentrip.vercel.app/mypage#review-edit
- 기대(디자인): 장소명 아래 '{지역} · {특징}' 줄 + legend '별점' — 근거 `screens/mypage.html:562-567`
- 실제(배포): 장소명만, 별점 제목 없음(작성 모달) / 수정 화면은 별점 제목 있음·위치 줄 없음 — 증거 `qa/screens/review-write-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 위치 줄·별점 제목 추가
- 상세: `qa/01-text.md` F326

### [SCT-023] P0 | 공통(리뷰 작성·수정) | 리뷰 작성 폼 — '방문 날짜' 라벨 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달
- 기대(디자인): 방문 날짜 — 근거 `screens/mypage.html:575`
- 실제(배포): 방문일 — 증거 `qa/screens/review-write-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '방문 날짜'
- 상세: `qa/01-text.md` F327

### [SCT-024] P0 | 공통(리뷰 작성·수정) | 리뷰 내용 placeholder 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 textarea
- 기대(디자인): 이 장소의 향과 분위기를 기록해 주세요. — 근거 `screens/mypage.html:581`
- 실제(배포): 장소에서 느낀 향기와 분위기를 들려주세요. — 증거 `qa/screens/review-write-1440-dev.png`
- 뷰포트: all
- 수정 가이드: placeholder 교체
- 상세: `qa/01-text.md` F328

### [SCT-025] P0 | 공통(리뷰 작성·수정) | 리뷰 작성 폼 — 글자 수 카운터 누락 (작성 모달)
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 textarea 아래
- 기대(디자인): 0/300 — 근거 `screens/mypage.html:580-585`
- 실제(배포): 카운터 없음 (수정 화면에는 있음) — 증거 `qa/screens/review-write-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 카운터 추가
- 상세: `qa/01-text.md` F329

### [SCT-026] P0 | 공통(리뷰 작성·수정) | 사진 추가 영역 라벨 불일치 · 수정 화면 사진 영역 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 / mypage#review-edit
- 기대(디자인): '사진 최대 5장' + 추가 버튼 '추가 {n}/5' (작성·수정 공통) — 근거 `screens/mypage.html:590-593`
- 실제(배포): 작성: '사진 최대 5장' + 파일 선택 '선택' / 수정: 사진 영역 없음 — 증거 `qa/screens/review-edit-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 추가 버튼 '추가 n/5', 수정 화면에도 사진 영역
- 상세: `qa/01-text.md` F330

### [SCT-027] P0 | 공통(리뷰 작성·수정) | 리뷰 작성 버튼 구성 불일치 (취소 없음, 라벨)
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 하단
- 기대(디자인): [취소] [등록하기] (수정 화면은 [취소] [저장하기]) — 근거 `screens/mypage.html:596-597, 1129`
- 실제(배포): 작성: [리뷰 저장]만 / 수정: [취소] [저장] — 증거 `qa/screens/review-edit-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 작성 '취소·등록하기', 수정 '취소·저장하기'
- 상세: `qa/01-text.md` F331

### [SCT-028] P0 | 공통(리뷰 작성·수정) | 리뷰 빈 제출 시 별점 오류 문구 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 → 아무것도 안 하고 제출
- 기대(디자인): '별점을 선택해 주세요.' + '리뷰 내용을 입력해 주세요.' — 근거 `screens/mypage.html:571, 584`
- 실제(배포): '리뷰 내용을 입력해 주세요.'만 — 증거 `qa/screens/review-write-empty-submit-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 별점 미선택 오류 추가
- 상세: `qa/01-text.md` F332

### [SCT-029] P0 | 공통(없는 상세) | 없는 동선·소식·장소 주소의 안내 화면 불일치
- 위치: /planner/not-exist-route · /news/not-exist-slug · /explore/not-exist-place — 전역 404
- 기대(디자인): 헤더·푸터가 있는 화면 안에서 '동선을 찾을 수 없어요'/'소식을 찾을 수 없어요' + '삭제되었거나 주소가 잘못되었을 수 있어요.' + '동선 목록으로'/'여행 소식 목록으로' 버튼 — 근거 `screens/route-detail.html:721-723, screens/news-detail.html:348`
- 실제(배포): 헤더·푸터 없는 404: '404 / 페이지를 찾을 수 없어요 / 주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다. / 홈으로 · 여행지 탐색' — 증거 `qa/screens/route-detail-missing-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 상세 종류별 안내 문구·목록 버튼 + 공통 헤더/푸터
- 상세: `qa/01-text.md` F133

### [SCT-030] P0 | 로그인 | document title 불일치
- 위치: https://scentrip.vercel.app/login — <title>
- 기대(디자인): Scentrip — 로그인 — 근거 `screens/login.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: /login 메타 title을 'Scentrip — 로그인'으로
- 상세: `qa/01-text.md` F001

### [SCT-031] P0 | 로그인 | 타이틀 텍스트 불일치
- 위치: https://scentrip.vercel.app/login — main > section > h1
- 기대(디자인): 나의 향 취향을<br>여행으로 이어가요 (2줄) — 근거 `screens/login.html:127`
- 실제(배포): 로그인 — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: h1을 '나의 향 취향을' + 줄바꿈 + '여행으로 이어가요'로
- 상세: `qa/01-text.md` F002

### [SCT-032] P0 | 로그인 | 타이틀 아래 설명 문구 불일치
- 위치: https://scentrip.vercel.app/login — h1 다음 p
- 기대(디자인): 센트립의 모든 서비스를 이용하시려면 회원가입해 주세요. — 근거 `screens/login.html:128`
- 실제(배포): 나만의 취향을 찾아 떠나는 여행, 센트립 — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 문구를 원본 문장으로 교체
- 상세: `qa/01-text.md` F003

### [SCT-033] P0 | 로그인 | 혜택 목록 1번 문구 불일치
- 위치: https://scentrip.vercel.app/login — 혜택 목록 1번째 li
- 기대(디자인): 향 취향 검사 결과를 저장해요 — 근거 `screens/login.html:131`
- 실제(배포): 나의 향 취향에 맞는 여행지 추천 — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구를 '향 취향 검사 결과를 저장해요'로
- 상세: `qa/01-text.md` F004

### [SCT-034] P0 | 로그인 | 혜택 목록 2번 문구 불일치
- 위치: https://scentrip.vercel.app/login — 혜택 목록 2번째 li
- 기대(디자인): 마음에 드는 여행지를 찜해요 — 근거 `screens/login.html:132`
- 실제(배포): 마음에 드는 장소와 동선 저장 — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구를 '마음에 드는 여행지를 찜해요'로
- 상세: `qa/01-text.md` F005

### [SCT-035] P0 | 로그인 | 혜택 목록 3번 문구 불일치
- 위치: https://scentrip.vercel.app/login — 혜택 목록 3번째 li
- 기대(디자인): 나만의 여행 동선을 만들고 저장해요 — 근거 `screens/login.html:133`
- 실제(배포): AI로 만드는 나만의 여행 동선 — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구를 '나만의 여행 동선을 만들고 저장해요'로
- 상세: `qa/01-text.md` F006

### [SCT-036] P0 | 로그인 | 혜택 목록 aria-label 누락
- 위치: https://scentrip.vercel.app/login — 혜택 목록 ul
- 기대(디자인): aria-label="로그인하면 할 수 있어요" — 근거 `screens/login.html:130`
- 실제(배포): aria-label 없음 — 증거 `qa/raw/login-1440-dev.html`
- 뷰포트: all
- 수정 가이드: 혜택 ul에 aria-label='로그인하면 할 수 있어요' 추가
- 상세: `qa/01-text.md` F007

### [SCT-037] P0 | 로그인 | 로그인 오류 안내 문구 불일치 — cancel
- 위치: https://scentrip.vercel.app/login?error=cancel — Google 버튼 위 알림(role=alert)
- 기대(디자인): 경고 박스 제목 'Google 로그인이 취소되었습니다. 다시 시도해 주세요.' — 근거 `screens/login.html:179, 228`
- 실제(배포): '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) — 증거 `qa/screens/login-error-cancel-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 오류 코드 cancel 전용 문구로
- 상세: `qa/01-text.md` F290

### [SCT-038] P0 | 로그인 | 로그인 오류 안내 문구 불일치 — expired
- 위치: https://scentrip.vercel.app/login?error=expired — Google 버튼 위 알림(role=alert)
- 기대(디자인): 경고 박스 제목 '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.' — 근거 `screens/login.html:180, 228`
- 실제(배포): '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) — 증거 `qa/screens/login-error-expired-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 오류 코드 expired 전용 문구로
- 상세: `qa/01-text.md` F291

### [SCT-039] P0 | 로그인 | 로그인 오류 안내 문구 불일치 — failed
- 위치: https://scentrip.vercel.app/login?error=failed — Google 버튼 위 알림(role=alert)
- 기대(디자인): 경고 박스 제목 'Google 계정을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.' — 근거 `screens/login.html:181, 228`
- 실제(배포): '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) — 증거 `qa/screens/login-error-failed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 오류 코드 failed 전용 문구로
- 상세: `qa/01-text.md` F292

### [SCT-040] P0 | 로그인 | 로그인 오류 안내 문구 불일치 — network
- 위치: https://scentrip.vercel.app/login?error=network — Google 버튼 위 알림(role=alert)
- 기대(디자인): 경고 박스 제목 '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' — 근거 `screens/login.html:182, 228`
- 실제(배포): '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) — 증거 `qa/screens/login-error-network-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 오류 코드 network 전용 문구로
- 상세: `qa/01-text.md` F293

### [SCT-041] P0 | 로그인 | 로그인 오류 안내 문구 불일치 — noemail
- 위치: https://scentrip.vercel.app/login?error=noemail — Google 버튼 위 알림(role=alert)
- 기대(디자인): 경고 박스 제목 '이메일 제공에 동의해 주셔야 가입할 수 있어요.' + 설명 '센트립은 계정 확인과 중요한 안내를 위해 이메일을 사용해요. 다시 로그인하면서 이메일 제공에 동의해 주세요.' — 근거 `screens/login.html:183, 228`
- 실제(배포): '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) — 증거 `qa/screens/login-error-noemail-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 오류 코드 noemail 전용 문구로
- 상세: `qa/01-text.md` F294

### [SCT-042] P0 | 로그인 | 로그인 오류 안내 문구 불일치 — suspended
- 위치: https://scentrip.vercel.app/login?error=suspended — Google 버튼 위 알림(role=alert)
- 기대(디자인): 경고 박스 제목 '이용이 제한된 계정이에요.' + 설명 '제한 사유와 해제 방법은 info.scentrip@gmail.com 으로 문의해 주세요.' — 근거 `screens/login.html:184, 228`
- 실제(배포): '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) — 증거 `qa/screens/login-error-suspended-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 오류 코드 suspended 전용 문구로
- 상세: `qa/01-text.md` F295

### [SCT-043] P0 | 회원가입 | document title 불일치
- 위치: https://scentrip.vercel.app/signup — <title>
- 기대(디자인): Scentrip — 회원가입 — 근거 `screens/signup.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F270

### [SCT-044] P0 | 회원가입 | Google 계정 칩 구성 불일치 (아바타·이름 누락, 인증 표기)
- 위치: https://scentrip.vercel.app/signup — 설명 아래 계정 박스
- 기대(디자인): 아바타 + 이름(굵게) + 이메일 / 오른쪽 G 로고 + '인증 완료' — 근거 `screens/signup.html:190-195`
- 실제(배포): 이메일 + 아래 줄 'Google 계정 인증 완료' (아바타·이름·G 로고 없음) — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 칩 구성으로
- 상세: `qa/01-text.md` F271

### [SCT-045] P0 | 회원가입 | '약관 동의' 그룹 제목 누락
- 위치: https://scentrip.vercel.app/signup — 약관 체크 목록 위
- 기대(디자인): legend 약관 동의 — 근거 `screens/signup.html:199`
- 실제(배포): 없음 — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 그룹 제목 추가
- 상세: `qa/01-text.md` F272

### [SCT-046] P0 | 회원가입 | 약관 전문 링크 라벨 '보기' → '전문 보기'
- 위치: https://scentrip.vercel.app/signup — 이용약관·개인정보 행 우측
- 기대(디자인): '보기' (aria-label '이용약관 전문 보기' / '개인정보 수집 및 이용 전문 보기') — 근거 `screens/signup.html:216, 224`
- 실제(배포): '전문 보기' (aria-label 없음) — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 라벨 '보기' + aria-label
- 상세: `qa/01-text.md` F273

### [SCT-047] P0 | 회원가입 | 약관 전문이 모달이 아닌 새 탭으로 열림
- 위치: https://scentrip.vercel.app/signup — '전문 보기' 클릭
- 기대(디자인): 모달(제목 '이용약관' / '개인정보 수집 및 이용', 본문 iframe, [닫기] [동의하기] — 동의하기 누르면 해당 항목 체크) — 근거 `screens/signup.html:266-277, 400-410`
- 실제(배포): 새 탭으로 /terms · /privacy 이동 (target=_blank) — 증거 `qa/screens/signup-legal-terms-1440-design.png`
- 뷰포트: all
- 수정 가이드: 약관 모달 + 동의하기 연동
- 상세: `qa/01-text.md` F274

### [SCT-048] P0 | 회원가입 | 닉네임 입력 placeholder 누락
- 위치: https://scentrip.vercel.app/signup — 닉네임 input
- 기대(디자인): 2~12자 · 한글, 영문, 숫자 — 근거 `screens/signup.html:239`
- 실제(배포): placeholder 없음 — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: placeholder 추가
- 상세: `qa/01-text.md` F275

### [SCT-049] P0 | 회원가입 | 닉네임 기본 안내 문구 불일치
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 안내
- 기대(디자인): 프로필과 리뷰에 표시돼요. — 근거 `screens/signup.html:240, 347`
- 실제(배포): 2~12자의 한글, 영문, 숫자를 사용할 수 있어요. 영문 대소문자 구분 없이 중복된 닉네임은 사용할 수 없어요. — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 안내 문구 교체
- 상세: `qa/01-text.md` F276

### [SCT-050] P0 | 회원가입 | 닉네임 검증 문구 누락 — '닉네임을 입력해 주세요'
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 (비운 채로 포커스 이동)
- 기대(디자인): '닉네임을 입력해 주세요' (오류는 빨간 경고 아이콘 + aria-invalid=true) — 근거 `reference/nickname.js:42, 66` · `screens/signup.html:329-349`
- 실제(배포): 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 — 증거 `qa/screens/signup-A-02-blur-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 검증 규칙별 문구 노출
- 상세: `qa/01-text.md` F277

### [SCT-051] P0 | 회원가입 | 닉네임 검증 문구 누락 — '2자 이상 입력해 주세요'
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('가' 입력)
- 기대(디자인): '2자 이상 입력해 주세요' (오류는 빨간 경고 아이콘 + aria-invalid=true) — 근거 `reference/nickname.js:46, 70` · `screens/signup.html:329-349`
- 실제(배포): 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 — 증거 `qa/screens/signup-A-03-one-char-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 검증 규칙별 문구 노출
- 상세: `qa/01-text.md` F278

### [SCT-052] P0 | 회원가입 | 닉네임 검증 문구 누락 — '한글, 영문, 숫자만 쓸 수 있어요'
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('ab!' 입력)
- 기대(디자인): '한글, 영문, 숫자만 쓸 수 있어요' (오류는 빨간 경고 아이콘 + aria-invalid=true) — 근거 `reference/nickname.js:45, 69` · `screens/signup.html:329-349`
- 실제(배포): 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 — 증거 `qa/screens/signup-A-05-special-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 검증 규칙별 문구 노출
- 상세: `qa/01-text.md` F279

### [SCT-053] P0 | 회원가입 | 닉네임 검증 문구 누락 — '공백 없이 입력해 주세요'
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('ab cd' 입력 — 한 칸이든 두 칸이든 불가)
- 기대(디자인): '공백 없이 입력해 주세요' (오류는 빨간 경고 아이콘 + aria-invalid=true) — 근거 `reference/nickname.js:43, 67` · `screens/signup.html:329-349`
- 규칙 갱신(2026-09-20): 공백 한 칸 허용 → 공백 전면 불가. 앞뒤 공백은 검사 전에 자동 제거한다. 증거 스크린샷은 두 칸 공백으로 찍은 것이지만 배포본 상태(문구 없음)는 그대로다.
- 실제(배포): 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 — 증거 `qa/screens/signup-A-06-double-space-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 검증 규칙별 문구 노출
- 상세: `qa/01-text.md` F280

### [SCT-054] P0 | 회원가입 | 닉네임 검증 문구 누락 — '이미 사용 중인 닉네임이에요'
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('향기' 입력 (원본 샘플 중복 목록))
- 기대(디자인): '이미 사용 중인 닉네임이에요' (오류는 빨간 경고 아이콘 + aria-invalid=true) — 근거 `reference/nickname.js:39, 49, 75` · `screens/signup.html:329-349`
- 실제(배포): 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 — 증거 `qa/screens/signup-A-09-taken-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 검증 규칙별 문구 노출
- 상세: `qa/01-text.md` F281

### [SCT-055] P0 | 회원가입 | 닉네임 검증 문구 누락 — '사용할 수 있는 닉네임이에요'
- 위치: https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('qa검수A' 입력 (성공 표시, 체크 아이콘))
- 기대(디자인): '사용할 수 있는 닉네임이에요' (오류는 빨간 경고 아이콘 + aria-invalid=true) — 근거 `reference/nickname.js:50, 77` · `screens/signup.html:329-349`
- 실제(배포): 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 — 증거 `qa/screens/signup-A-10-valid-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 검증 규칙별 문구 노출
- 상세: `qa/01-text.md` F282

### [SCT-056] P0 | 회원가입 | 닉네임 12자 초과 처리 불일치 (입력 차단 vs 오류 안내)
- 위치: https://scentrip.vercel.app/signup — 닉네임에 13자 입력
- 기대(디자인): 13자까지 입력되고 카운터 '13/12'(초과 색) + '12자 이하로 입력해 주세요' — 근거 `reference/nickname.js:47, 71` · `screens/signup.html:332-333, 347`
- 실제(배포): maxlength=12로 12자에서 입력 차단, 안내 없음 — 증거 `qa/screens/signup-A-04-13chars-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 입력은 허용하고 초과 안내
- 상세: `qa/01-text.md` F283

### [SCT-057] P0 | 회원가입 | 금칙어 검증 문구 불일치
- 위치: https://scentrip.vercel.app/signup — 'admin' / '센트립' 입력
- 기대(디자인): 사용할 수 없는 단어가 들어 있어요 — 근거 `reference/nickname.js:26-36, 48, 74` · `screens/signup.html:329-349`
- 실제(배포): 운영자로 오해할 수 있는 이름이나 부적절한 표현은 사용할 수 없어요. — 증거 `qa/screens/signup-A-07-banned-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 교체
- 상세: `qa/01-text.md` F284

### [SCT-058] P0 | 회원가입 | 가입 버튼 진행 중 라벨 불일치
- 위치: https://scentrip.vercel.app/signup — '가입 완료하기' 클릭 직후
- 기대(디자인): 가입하는 중... (스피너) — 근거 `screens/signup.html:365`
- 실제(배포): 가입 내용 저장 중 — 증거 `qa/00-page-map.md 0-7 (계정 A 가입 기록)`
- 뷰포트: all
- 수정 가이드: '가입하는 중...'
- 상세: `qa/01-text.md` F285

### [SCT-059] P0 | 회원가입 | 가입 완료 화면 미구현 (검사 결과 없는 경우)
- 위치: https://scentrip.vercel.app/signup — 가입 완료하기 성공 후
- 기대(디자인): 체크 아이콘 + '{닉네임}님, 가입을 환영해요' / '12문항 향 취향 검사로 나에게 맞는 향과 여행지를 찾아볼까요?' / [향 취향 검사 시작하기] [나중에 할게요] — 근거 `screens/signup.html:254-262, 391-397`
- 실제(배포): 완료 화면 없이 /dashboard로 바로 이동 + 튜토리얼 — 증거 `qa/screens/signup-done-no-result-1440-design.png`
- 뷰포트: all
- 수정 가이드: 가입 완료 화면 추가
- 상세: `qa/01-text.md` F287

### [SCT-060] P0 | 회원가입 | 가입 완료 화면 미구현 (가입 전 검사 결과 있는 경우)
- 위치: https://scentrip.vercel.app/signup — 비회원 검사 → 가입하고 여행지 추천받기 → 가입 완료
- 기대(디자인): '{닉네임}님, 가입을 환영해요' / '가입 전에 한 향 취향 검사 결과를 계정에 저장했어요. 이제 취향에 맞는 여행지를 둘러보세요.' / [추천 여행지 보러 가기] [나중에 할게요] — 근거 `screens/signup.html:391-398`
- 실제(배포): 완료 화면 없이 /dashboard로 바로 이동 (계정 B 확인) — 증거 `qa/screens/signup-done-with-result-1440-design.png`
- 뷰포트: all
- 수정 가이드: 결과 저장 분기 완료 화면 추가
- 상세: `qa/01-text.md` F288

### [SCT-061] P0 | 취향 테스트 | document title 불일치
- 위치: https://scentrip.vercel.app/taste — <title>
- 기대(디자인): Scentrip — 취향 테스트 (진행 · 로딩 · 결과) — 근거 `screens/onboarding-test.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/taste-intro-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: /taste 메타 title 지정
- 상세: `qa/01-text.md` F011

### [SCT-062] P0 | 취향 테스트 | 표지 상단 소제목 불일치
- 위치: https://scentrip.vercel.app/taste — main.scent-intro > section > p (첫 번째)
- 기대(디자인): 여행 취향 테스트 — 근거 `screens/onboarding-test.html:1258`
- 실제(배포): SCENTRIP TASTE — 증거 `qa/screens/taste-intro-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 소제목을 '여행 취향 테스트'로
- 상세: `qa/01-text.md` F012

### [SCT-063] P0 | 취향 테스트 | 표지 설명 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 표지 h1 아래 설명 p
- 기대(디자인): 12개의 질문으로 당신의 여행 취향을 분석해,<br>16가지 향(香) 유형 중 당신의 유형을 찾아드려요. — 근거 `screens/onboarding-test.html:1273`
- 실제(배포): 열두 개의 여행 장면을 고르면 네 가지 감각이 만나<br>나만의 향 타입과 어울리는 여행을 알려드려요. — 증거 `qa/screens/taste-intro-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 문구를 원본 2줄로 교체
- 상세: `qa/01-text.md` F013

### [SCT-064] P0 | 취향 테스트 | 시작 버튼 라벨 불일치
- 위치: https://scentrip.vercel.app/taste — 표지 시작 button
- 기대(디자인): 테스트 시작하기 — 근거 `screens/onboarding-test.html:1274`
- 실제(배포): 취향 테스트 시작 — 증거 `qa/screens/taste-intro-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 버튼 라벨을 '테스트 시작하기'로
- 상세: `qa/01-text.md` F014

### [SCT-065] P0 | 취향 테스트 | 01번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 01번 문항 선택지 2번(B)
- 기대(디자인): 설명 "가슴속까지 뻥 뚫리듯 시원하고 정신이 번쩍 들게 만드는" / 키워드 "청량한 공기" — 근거 `screens/onboarding-test.html:1404`
- 실제(배포): 설명 "가슴속까지 뻥 뚫리듯 정신이 번쩍 들게 만드는" / 키워드 "시원하고 청량한 공기" — 증거 `qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F224

### [SCT-066] P0 | 취향 테스트 | 02번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 02번 문항 선택지 1번(A)
- 기대(디자인): 설명 "볕에 잘 말려 온기가 남아있는" / 키워드 "몸을 폭 감싸주는 두툼한 이불" — 근거 `screens/onboarding-test.html:1407`
- 실제(배포): 설명 "볕에 잘 말려 온기가 남아 있고 몸을 포근하게 감싸주는" / 키워드 "두툼하고 따뜻한 이불" — 증거 `qa/screens/taste-A-member-first-WHAN-q02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F225

### [SCT-067] P0 | 취향 테스트 | 03번 문항 질문 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 03번 문항 질문 제목
- 기대(디자인): 여행지에서 만난 로컬 주민이<br>따뜻한 환대의 의미로 음료를 건넨다면? — 근거 `screens/onboarding-test.html:1410`
- 실제(배포): 여행지에서 만난 로컬 주민이 환대의 의미로 음료를 건넨다면 더 반가운 것은? — 증거 `qa/screens/taste-A-member-first-WHAN-q03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 질문 문구·줄바꿈 원본대로
- 상세: `qa/01-text.md` F226

### [SCT-068] P0 | 취향 테스트 | 03번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 03번 문항 선택지 1번(A)
- 기대(디자인): 설명 "김이 모락모락 피어오르는, 고소하고 부드러운" / 키워드 "우유를 넣은 로컬 차" — 근거 `screens/onboarding-test.html:1411`
- 실제(배포): 설명 "김이 모락모락 피어오르고 고소한 우유가 부드럽게 어우러진" / 키워드 "따뜻한 로컬 차" — 증거 `qa/screens/taste-A-member-first-WHAN-q03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F227

### [SCT-069] P0 | 취향 테스트 | 03번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 03번 문항 선택지 2번(B)
- 기대(디자인): 설명 "얼음이 짤랑거리는, 가볍고 청량하게 목을 축여주는" / 키워드 "시원한 청과 에이드" — 근거 `screens/onboarding-test.html:1412`
- 실제(배포): 설명 "얼음이 짤랑거리고 가볍고 청량하게 목을 축여주는" / 키워드 "시원한 청과 에이드" — 증거 `qa/screens/taste-A-member-first-WHAN-q03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F228

### [SCT-070] P0 | 취향 테스트 | 04번 문항 상황 라벨 불일치
- 위치: https://scentrip.vercel.app/taste — 04번 문항 상단 라벨
- 기대(디자인): 짐 짜기 — 근거 `screens/onboarding-test.html:1414`
- 실제(배포): 짐 꾸리기 — 증거 `qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 라벨 '짐 짜기'
- 상세: `qa/01-text.md` F229

### [SCT-071] P0 | 취향 테스트 | 04번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 04번 문항 선택지 1번(A)
- 기대(디자인): 설명 "피부 깊숙이 스며들어 시간이 지날수록 깊은 잔향을 남기는" / 키워드 "존재감 있는 묵직한 향" — 근거 `screens/onboarding-test.html:1416`
- 실제(배포): 설명 "피부 깊숙이 스며들어 시간이 지날수록 잔향이 깊어지는" / 키워드 "묵직하고 존재감 있는 향" — 증거 `qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F230

### [SCT-072] P0 | 취향 테스트 | 04번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 04번 문항 선택지 2번(B)
- 기대(디자인): 설명 "걸을 때마다 바람을 타고 은은하게 스쳐 가는" / 키워드 "가볍고 산뜻한 향" — 근거 `screens/onboarding-test.html:1417`
- 실제(배포): 설명 "걸을 때마다 바람을 타고 은은하게 스쳐 가는" / 키워드 "가볍고 산뜻한 인상의 향" — 증거 `qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F231

### [SCT-073] P0 | 취향 테스트 | 04번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 04번 문항 선택지 카드 순서
- 기대(디자인): 1번 "존재감 있는 묵직한 향" · 2번 "가볍고 산뜻한 향" — 근거 `screens/onboarding-test.html:1416-1417, 1862`
- 실제(배포): 1번 "묵직하고 존재감 있는 향" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F232

### [SCT-074] P0 | 취향 테스트 | 05번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 05번 문항 선택지 1번(A)
- 기대(디자인): 설명 "발걸음을 차분하게 늦추며 깊은 사색에 잠기게 만드는" / 키워드 "묵직한 첼로 연주나 재즈" — 근거 `screens/onboarding-test.html:1420`
- 실제(배포): 설명 "발걸음을 차분하게 늦추며 깊은 사색에 잠기게 하는" / 키워드 "묵직한 첼로 연주와 재즈" — 증거 `qa/screens/taste-A-member-first-WHAN-q05-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F233

### [SCT-075] P0 | 취향 테스트 | 05번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 05번 문항 선택지 2번(B)
- 기대(디자인): 설명 "발걸음을 가볍게 만들어 주는" / 키워드 "경쾌한 어쿠스틱 기타나 시티팝" — 근거 `screens/onboarding-test.html:1421`
- 실제(배포): 설명 "발걸음을 가볍게 만들어 주는" / 키워드 "경쾌한 기타 선율과 시티팝" — 증거 `qa/screens/taste-A-member-first-WHAN-q05-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F234

### [SCT-076] P0 | 취향 테스트 | 05번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 05번 문항 선택지 카드 순서
- 기대(디자인): 1번 "묵직한 첼로 연주나 재즈" · 2번 "경쾌한 어쿠스틱 기타나 시티팝" — 근거 `screens/onboarding-test.html:1420-1421, 1862`
- 실제(배포): 1번 "묵직한 첼로 연주와 재즈" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q05-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F235

### [SCT-077] P0 | 취향 테스트 | 06번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 06번 문항 선택지 1번(A)
- 기대(디자인): 설명 "어두운 톤의 원목과 짙은 유화 작품들이 배치된" / 키워드 "깊이감과 중후함이 느껴지는 공간" — 근거 `screens/onboarding-test.html:1424`
- 실제(배포): 설명 "어두운 원목과 짙은 유화 작품이 깊이감을 만드는" / 키워드 "중후하고 묵직한 공간" — 증거 `qa/screens/taste-A-member-first-WHAN-q06-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F236

### [SCT-078] P0 | 취향 테스트 | 06번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 06번 문항 선택지 2번(B)
- 기대(디자인): 설명 "여백이 많고 파스텔톤 컬러가 어우러진" / 키워드 "경쾌하고 산뜻한 공간" — 근거 `screens/onboarding-test.html:1425`
- 실제(배포): 설명 "여백과 파스텔톤 컬러가 어우러져" / 키워드 "경쾌하고 산뜻한 공간" — 증거 `qa/screens/taste-A-member-first-WHAN-q06-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F237

### [SCT-079] P0 | 취향 테스트 | 06번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 06번 문항 선택지 카드 순서
- 기대(디자인): 1번 "깊이감과 중후함이 느껴지는 공간" · 2번 "경쾌하고 산뜻한 공간" — 근거 `screens/onboarding-test.html:1424-1425, 1862`
- 실제(배포): 1번 "중후하고 묵직한 공간" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q06-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F238

### [SCT-080] P0 | 취향 테스트 | 07번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 07번 문항 선택지 1번(A)
- 기대(디자인): 설명 "아침 이슬이나 안개를 흠뻑 머금어 푹신하게 가라앉은" / 키워드 "촉촉한 이끼와 흙길" — 근거 `screens/onboarding-test.html:1429`
- 실제(배포): 설명 "아침 이슬과 안개를 머금어 푹신하게 가라앉은" / 키워드 "촉촉한 이끼와 흙길" — 증거 `qa/screens/taste-A-member-first-WHAN-q07-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F239

### [SCT-081] P0 | 취향 테스트 | 07번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 07번 문항 선택지 2번(B)
- 기대(디자인): 설명 "햇살 아래 바짝 말라 발을 디딜 때마다 바스락 소리를 내는" / 키워드 "낙엽 가득한 마른 길" — 근거 `screens/onboarding-test.html:1430`
- 실제(배포): 설명 "햇살 아래 바짝 말라 발을 디딜 때마다 바스락 소리를 내는" / 키워드 "낙엽이 가득한 길" — 증거 `qa/screens/taste-A-member-first-WHAN-q07-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F240

### [SCT-082] P0 | 취향 테스트 | 07번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 07번 문항 선택지 카드 순서
- 기대(디자인): 1번 "촉촉한 이끼와 흙길" · 2번 "낙엽 가득한 마른 길" — 근거 `screens/onboarding-test.html:1429-1430, 1862`
- 실제(배포): 1번 "촉촉한 이끼와 흙길" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q07-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F241

### [SCT-083] P0 | 취향 테스트 | 08번 문항 질문 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 08번 문항 질문 제목
- 기대(디자인): 카페에서 곁들인<br>디저트 한 입의 감촉은? — 근거 `screens/onboarding-test.html:1432`
- 실제(배포): 카페에서 곁들인 디저트 한 입, 더 기분 좋은 감촉은? — 증거 `qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 질문 문구·줄바꿈 원본대로
- 상세: `qa/01-text.md` F242

### [SCT-084] P0 | 취향 테스트 | 08번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 08번 문항 선택지 1번(A)
- 기대(디자인): 설명 "베어 물면 촉촉하게 녹아내리는" / 키워드 "과즙 가득한 타르트·푸딩" — 근거 `screens/onboarding-test.html:1433`
- 실제(배포): 설명 "베어 물면 촉촉하게 녹아내리는" / 키워드 "과즙 가득한 타르트와 푸딩" — 증거 `qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F243

### [SCT-085] P0 | 취향 테스트 | 08번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 08번 문항 선택지 2번(B)
- 기대(디자인): 설명 "입안에서 바스러지듯 부서지는" / 키워드 "바삭하고 담백한 스콘·비스킷" — 근거 `screens/onboarding-test.html:1434`
- 실제(배포): 설명 "입안에서 바스러지듯 부서지는" / 키워드 "바삭하고 담백한 스콘" — 증거 `qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F244

### [SCT-086] P0 | 취향 테스트 | 08번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 08번 문항 선택지 카드 순서
- 기대(디자인): 1번 "과즙 가득한 타르트·푸딩" · 2번 "바삭하고 담백한 스콘·비스킷" — 근거 `screens/onboarding-test.html:1433-1434, 1862`
- 실제(배포): 1번 "과즙 가득한 타르트와 푸딩" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F245

### [SCT-087] P0 | 취향 테스트 | 09번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 09번 문항 선택지 1번(A)
- 기대(디자인): 설명 "물기를 머금은 듯 빛나는" / 키워드 "촉촉하게 윤기가 도는 피부" — 근거 `screens/onboarding-test.html:1437`
- 실제(배포): 설명 "촉촉하게 윤기가 돌아 물기를 머금은 듯" / 키워드 "은은하게 빛나는 피부" — 증거 `qa/screens/taste-A-member-first-WHAN-q09-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F246

### [SCT-088] P0 | 취향 테스트 | 09번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 09번 문항 선택지 2번(B)
- 기대(디자인): 설명 "산뜻하게 마무리된" / 키워드 "보송하고 매트한 피부" — 근거 `screens/onboarding-test.html:1438`
- 실제(배포): 설명 "보송하고 매트하게 정돈되어" / 키워드 "산뜻하게 마무리된 피부" — 증거 `qa/screens/taste-A-member-first-WHAN-q09-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F247

### [SCT-089] P0 | 취향 테스트 | 09번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 09번 문항 선택지 카드 순서
- 기대(디자인): 1번 "촉촉하게 윤기가 도는 피부" · 2번 "보송하고 매트한 피부" — 근거 `screens/onboarding-test.html:1437-1438, 1862`
- 실제(배포): 1번 "은은하게 빛나는 피부" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q09-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F248

### [SCT-090] P0 | 취향 테스트 | 10번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 10번 문항 선택지 1번(A)
- 기대(디자인): 설명 "덩굴이 자유롭게 벽을 타고 풀들이 제멋대로 우거진" / 키워드 "깊은 산속의 야생 정원" — 근거 `screens/onboarding-test.html:1442`
- 실제(배포): 설명 "덩굴이 자유롭게 벽을 타고 풀이 제멋대로 우거진" / 키워드 "깊은 산속의 야생 정원" — 증거 `qa/screens/taste-A-member-first-WHAN-q10-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F249

### [SCT-091] P0 | 취향 테스트 | 10번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 10번 문항 선택지 2번(B)
- 기대(디자인): 설명 "조경사의 손길로 대칭을 이루고 깔끔하게 전정된" / 키워드 "유럽식 분수 정원" — 근거 `screens/onboarding-test.html:1443`
- 실제(배포): 설명 "정교한 손길로 대칭을 이루고 깔끔하게 전정된" / 키워드 "유럽식 분수 정원" — 증거 `qa/screens/taste-A-member-first-WHAN-q10-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F250

### [SCT-092] P0 | 취향 테스트 | 10번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 10번 문항 선택지 카드 순서
- 기대(디자인): 1번 "깊은 산속의 야생 정원" · 2번 "유럽식 분수 정원" — 근거 `screens/onboarding-test.html:1442-1443, 1862`
- 실제(배포): 1번 "깊은 산속의 야생 정원" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q10-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F251

### [SCT-093] P0 | 취향 테스트 | 11번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 11번 문항 선택지 1번(A)
- 기대(디자인): 설명 "가공되지 않아 거친 나뭇결과 옹이가 살아있는" / 키워드 "통원목·자연석 오브제" — 근거 `screens/onboarding-test.html:1446`
- 실제(배포): 설명 "거친 나뭇결과 옹이가 그대로 살아 있는" / 키워드 "통원목과 자연석 오브제" — 증거 `qa/screens/taste-A-member-first-WHAN-q11-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F252

### [SCT-094] P0 | 취향 테스트 | 11번 문항 선택지 2번(B) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 11번 문항 선택지 2번(B)
- 기대(디자인): 설명 "매끄럽게 마감된 메탈이나 도자기처럼 정교한" / 키워드 "세련된 오브제" — 근거 `screens/onboarding-test.html:1447`
- 실제(배포): 설명 "메탈이나 도자기처럼 정교하고 매끄럽게 가공된" / 키워드 "세련된 오브제" — 증거 `qa/screens/taste-A-member-first-WHAN-q11-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F253

### [SCT-095] P0 | 취향 테스트 | 11번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 11번 문항 선택지 카드 순서
- 기대(디자인): 1번 "통원목·자연석 오브제" · 2번 "세련된 오브제" — 근거 `screens/onboarding-test.html:1446-1447, 1862`
- 실제(배포): 1번 "통원목과 자연석 오브제" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q11-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F254

### [SCT-096] P0 | 취향 테스트 | 12번 문항 선택지 1번(A) 문구 불일치
- 위치: https://scentrip.vercel.app/taste — 12번 문항 선택지 1번(A)
- 기대(디자인): 설명 "크라프트지에 마끈으로 툭 묶어 무심한 듯" / 키워드 "자연스러운 미학이 살아있는 포장" — 근거 `screens/onboarding-test.html:1450`
- 실제(배포): 설명 "크라프트지에 마끈으로 툭 묶어 자연스러운 미학이 살아 있는" / 키워드 "소박한 수작업 포장" — 증거 `qa/screens/taste-A-member-first-WHAN-q12-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명·키워드 원본대로
- 상세: `qa/01-text.md` F255

### [SCT-097] P0 | 취향 테스트 | 12번 문항 선택지 순서 뒤바뀜
- 위치: https://scentrip.vercel.app/taste — 12번 문항 선택지 카드 순서
- 기대(디자인): 1번 "자연스러운 미학이 살아있는 포장" · 2번 "모던한 패키징" — 근거 `screens/onboarding-test.html:1450-1451, 1862`
- 실제(배포): 1번 "소박한 수작업 포장" 쪽이 오른쪽(2번)에 표시 — 증거 `qa/screens/taste-A-member-first-WHAN-q12-1440-dev.png`
- 뷰포트: all
- 수정 가이드: a 선택지를 왼쪽(1번)에
- 상세: `qa/01-text.md` F256

### [SCT-098] P0 | 취향 테스트 | 선택지 카드 번호 표시(1 / 2) 누락
- 위치: https://scentrip.vercel.app/taste — 선택지 카드 좌상단
- 기대(디자인): 카드마다 번호 힌트 '1', '2' — 근거 `screens/onboarding-test.html:1864`
- 실제(배포): 번호 없음 — 증거 `qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: choice-hint 번호 추가
- 상세: `qa/01-text.md` F258

### [SCT-099] P0 | 취향 테스트 | 이전 질문 버튼 라벨·위치 불일치
- 위치: https://scentrip.vercel.app/taste — 2번 문항부터
- 기대(디자인): 진행 점 아래 텍스트 버튼 '← 이전 질문' — 근거 `screens/onboarding-test.html:1290`
- 실제(배포): 좌상단 아이콘 버튼(aria-label·title '이전 질문', 텍스트 없음) — 증거 `qa/screens/taste-A-member-first-WHAN-q02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 하단 텍스트 버튼 '← 이전 질문'
- 상세: `qa/01-text.md` F259

### [SCT-100] P0 | 취향 테스트 | 진행 표시 aria-label 불일치
- 위치: https://scentrip.vercel.app/taste — 하단 진행 점 progressbar
- 기대(디자인): 설문 진행률 — 근거 `screens/onboarding-test.html:1289`
- 실제(배포): 12개 질문 중 N번째 — 증거 `qa/raw/taste-A-member-first-WHAN-q01-1440-dev.json`
- 뷰포트: all
- 수정 가이드: aria-label '설문 진행률'
- 상세: `qa/01-text.md` F260

### [SCT-101] P0 | 취향 테스트 | 로딩 화면 문구 불일치 (3단계 순환 → 고정 제목·설명)
- 위치: https://scentrip.vercel.app/taste — 12번 응답 직후 로딩
- 기대(디자인): 향이 피어오르는 연출 + 축 단계(온도·무게·수분감·자연도) + 문구 순환 '12개의 답을 향으로 옮기고 있어요' → '탑 · 미들 · 베이스를 쌓고 있어요' → '당신의 향이 피어오르고 있어요' — 근거 `screens/onboarding-test.html:1295-1313, 1929-1933`
- 실제(배포): 아이콘 + 제목 '당신만의 여행 향을 찾고 있어요' + 설명 '12개의 장면에 남은 감각을 천천히 엮는 중입니다.' (문구 변화·축 단계 없음) — 증거 `qa/screens/taste-A-member-first-WHAN-loading-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 로딩 연출·문구로
- 상세: `qa/01-text.md` F261

### [SCT-102] P0 | 취향 테스트 | 결과 — 4축 막대 라벨에 % 표기 추가
- 위치: https://scentrip.vercel.app/taste — 결과 여행자 프로필 4축 막대
- 기대(디자인): 양 끝 라벨만(예: 시원함 ··· 따뜻함), 퍼센트 없음 — 근거 `screens/onboarding-test.html:2053-2067`
- 실제(배포): 이긴 쪽 라벨에 '100%' (예: 따뜻함 100%) + aria-label '온도: 따뜻함 100%' — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: % 표기 제거
- 상세: `qa/01-text.md` F262

### [SCT-103] P0 | 취향 테스트 | 결과 — 향 한 줄 인용문 앞뒤 따옴표 추가
- 위치: https://scentrip.vercel.app/taste — 결과 향 피라미드 아래 인용
- 기대(디자인): 오래된 오크와 누룩 향이 깊어질수록, 당신의 여행도 천천히 익어갑니다. (따옴표 없음) — 근거 `screens/onboarding-test.html:1363, 2042`
- 실제(배포): “오래된 오크와 누룩 향이 깊어질수록, 당신의 여행도 천천히 익어갑니다.” — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 따옴표 제거
- 상세: `qa/01-text.md` F263

### [SCT-104] P0 | 취향 테스트 | 결과 — 추천 여행지 섹션 제목 불일치
- 위치: https://scentrip.vercel.app/taste — 결과 추천 여행지 h2
- 기대(디자인): 센트립 추천 여행지 — 근거 `screens/onboarding-test.html:1367`
- 실제(배포): Scentrip 추천 여행지 — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '센트립 추천 여행지'
- 상세: `qa/01-text.md` F264

### [SCT-105] P0 | 취향 테스트 | 결과 — 추천 여행지 카드 무드가 내 유형과 다름
- 위치: https://scentrip.vercel.app/taste — 추천 여행지 카드 보조 줄
- 기대(디자인): '{내 유형 무드} · {계절}' (예: WHAN → 빈티지 우디 · 가을, CLDR → 코튼 머스크 · 초봄) — 근거 `screens/onboarding-test.html:1367-1370`
- 실제(배포): WHAN 결과에 '플로럴 · 가을', CLDR 결과에 '메탈릭 · 초봄' — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 카드 무드를 결과 유형의 무드로
- 상세: `qa/01-text.md` F266

### [SCT-106] P0 | 취향 테스트 | 결과 CTA(가입 후 첫 검사) 제목·설명·버튼 불일치
- 위치: https://scentrip.vercel.app/taste — 회원 첫 검사 결과 하단 CTA
- 기대(디자인): '내 취향의 여행 장소를 더 만나보세요' / '당신의 취향에 꼭 맞는 추천 여행지가 준비됐어요. 지금 바로 둘러보세요.' / [여행지 둘러보기] [다시 검사하기] — 근거 `screens/onboarding-test.html:2174-2180`
- 실제(배포): 'qa검수A님 취향의 여행 장소를 더 만나보세요' / '이 취향을 바탕으로 나만의 여행 동선을 만들어 보세요.' / [내 여행에서 추천 보기] [다시 검사하기] — 증거 `qa/screens/taste-A-member-first-WHAN-result-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구·버튼 라벨 원본대로
- 상세: `qa/01-text.md` F267

### [SCT-107] P0 | 취향 테스트 | 결과 CTA(비회원) 설명 문구 불일치
- 위치: https://scentrip.vercel.app/taste (비로그인) — 결과 하단 CTA 설명
- 기대(디자인): 가입하면 취향에 꼭 맞는 여행지를 홈·탐색에서 계속 추천받고, 이 결과도 프로필에 저장돼요. — 근거 `screens/onboarding-test.html:2167`
- 실제(배포): 가입하면 취향에 꼭 맞는 여행지를 계속 추천받고, 이 결과도 프로필에 저장돼요. ('홈·탐색에서' 누락) — 증거 `qa/screens/taste-B-guest-CLDR-result-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '홈·탐색에서' 추가
- 상세: `qa/01-text.md` F268

### [SCT-108] P0 | 취향 테스트 | 결과 — 유형 한 줄 요약 문구 불일치 (16유형 전부)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 히어로 별칭 아래 한 줄
- 기대(디자인): 원본 TYPES 요약 (예: WHAN '시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자', CHAN '시원한 공기 속 깊은 감정을 품은 여행자') — 16유형 대조표 qa/01-text.md — 근거 `screens/onboarding-test.html:1445-1800 (TYPES)`
- 실제(배포): (예: WHAN '시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자입니다', CHAN '시원한 공기 속 깊은 감정을 품었습니다') — 증거 `qa/screens/taste-type-CHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 16유형 요약을 원본 TYPES 값으로
- 상세: `qa/01-text.md` F305

### [SCT-109] P0 | 취향 테스트 | 결과 — 여행자 프로필 문단 불일치 (16유형 전부)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 여행자 프로필 본문
- 기대(디자인): 원본 프로필 '당신은 …' 문단 (예: WHAN '당신은 새것의 화려함보다 시간이 쌓인 것의 깊이에 끌리는 사람이에요. 여행에서도 이름난 명소보다 세월이 밴 …') — 근거 `screens/onboarding-test.html:1445-1800 (TYPES)`
- 실제(배포): 요약 문장을 반복하는 문단 (예: WHAN '시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자입니다. 반짝이는 신도시보다 오래된 골목을, 세련…') — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 16유형 프로필 문단을 원본 값으로
- 상세: `qa/01-text.md` F306

### [SCT-110] P0 | 취향 테스트 | 결과 — 여행 행동 패턴 문구·어미 불일치 (16유형 전부)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 여행 행동 패턴 4줄
- 기대(디자인): '~해요' 체 (예: WHAN ['관광지보다 오래된 골목을 먼저 찾아요', '유명 카페보다 로컬 노포에 관심이 많아요', '여행 중 사진보다 분위기를 기억해요', '여행 후 장소와 역사, 사람 이야기를 기억해요']) — 근거 `screens/onboarding-test.html:1445-1800 (TYPES)`
- 실제(배포): '~함' 명사형 (예: WHAN ['관광지보다 오래된 골목을 먼저 찾음', '유명 카페보다 로컬 노포에 관심이 많음', '여행 중 사진보다 분위기를 기억함', '여행 후 가장 기억하는 것은 장소의 역사와 사람 이야기']) — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 16유형 패턴 4줄을 원본 값으로
- 상세: `qa/01-text.md` F307

### [SCT-111] P0 | 취향 테스트 | 결과 — 연상되는 향 TOP·MIDDLE·BASE 불일치 (16유형 전부)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 향 피라미드
- 기대(디자인): 원본 피라미드 (예: WHAN ['솔잎', '한옥 나무결', '오래된 오크통'], CLDR ['비누 거품', '코튼', '화이트 머스크']) — 근거 `screens/onboarding-test.html:1800-1821 (PYRAMID)`
- 실제(배포): (예: WHAN ['오래된 오크통', '젖은 흙', '전통 한옥의 나무결'], CLDR ['화이트 린넨', '깨끗한 머스크', '은은한 샌달우드']) — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 16유형 피라미드를 원본 값으로
- 상세: `qa/01-text.md` F308

### [SCT-112] P0 | 취향 테스트 | 결과 — 향 라벨 이모지 불일치 (4유형)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 히어로 향 라벨
- 기대(디자인): WHAN 🪵 · WHDN 💼 · WLAN 🌳 · CHDR 📕 — 근거 `screens/onboarding-test.html:1445-1800 (TYPES emoji)`
- 실제(배포): WHAN 🌳 · WHDN 🧳 · WLAN 🌲 · CHDR 📚 — 증거 `qa/screens/taste-type-WHDN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 이모지 원본대로
- 상세: `qa/01-text.md` F309

### [SCT-113] P0 | 취향 테스트 | 결과 — '이런 공간을 좋아해요' 항목 문구 불일치 (2유형 3항목)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 이런 공간을 좋아해요
- 기대(디자인): WHAN '전통주가 익어가는 양조장 숙성고' / WHAR '빈티지 샹들리에가 있는 티룸', '근대 건축을 리모델링한 카페' — 근거 `screens/onboarding-test.html:1445-1800 (TYPES spaces)`
- 실제(배포): WHAN '전통주 양조장 숙성고' / WHAR '빈티지 샹들리에 티룸', '근대 건축을 고친 카페' — 증거 `qa/screens/taste-type-WHAR-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 항목 문구 원본대로
- 상세: `qa/01-text.md` F310

### [SCT-114] P0 | 취향 테스트 | 결과 — '이런 여행을 좋아해요' 항목 문구 불일치 (2유형)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 이런 여행을 좋아해요
- 기대(디자인): WHAN '전통주·발효음식처럼 시간이 만든 맛 경험하기' / WHDN '산골 마을과 폐광 마을 탐험하기' — 근거 `screens/onboarding-test.html:1445-1800 (TYPES trips)`
- 실제(배포): WHAN '…시간이 만든 맛을 경험하기' / WHDN '산골 마을과 오래된 폐광 마을 탐험하기' — 증거 `qa/screens/taste-type-WHDN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 항목 문구 원본대로
- 상세: `qa/01-text.md` F311

### [SCT-115] P0 | 취향 테스트 | 결과 — 4축 막대 양 끝 라벨 좌우 순서 반대 (16유형 전부)
- 위치: https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 여행자 프로필 4축 막대
- 기대(디자인): 왼쪽 앞 글자 성향 · 오른쪽 뒷 글자 (따뜻함 | 시원함 · 묵직함 | 가벼움 · 수분감 | 건조함 · 자연감 | 정돈감) — 근거 `screens/onboarding-test.html:1457-1462, 2053-2063`
- 실제(배포): 왼쪽 시원함 | 오른쪽 따뜻함 · 가벼움 | 묵직함 · 건조함 | 수분감 · 정돈감 | 자연감 — 증거 `qa/screens/taste-type-WHAN-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 라벨·막대 방향을 원본 순서로
- 상세: `qa/01-text.md` F312

### [SCT-116] P0 | 취향 테스트 | 회원 결과 CTA 이동 경로 불일치 (탐색 → 내 여행)
- 위치: https://scentrip.vercel.app/taste?result=latest — '내 여행에서 추천 보기'
- 기대(디자인): '여행지 둘러보기' → 탐색 장소 추천(place-recommend.html) — 근거 `screens/onboarding-test.html:2219`
- 실제(배포): /dashboard (내 여행) — 증거 `qa/screens/taste-A-member-first-WHAN-result-1440-dev.png`
- 뷰포트: all
- 수정 가이드: /explore 로 이동
- 상세: `qa/04-flow.md` F417

### [SCT-117] P0 | 취향 테스트 | 비회원 결과 가입 CTA 복귀 경로 불일치
- 위치: https://scentrip.vercel.app/taste (비로그인 결과) — '가입하고 여행지 추천받기'
- 기대(디자인): login.html?next=place-recommend.html&from=test → 가입 후 탐색으로, 검사 결과 저장 안내 — 근거 `screens/onboarding-test.html:2221`
- 실제(배포): /login?next=/dashboard → 가입 후 내 여행 — 증거 `qa/screens/login-B-from-test-1440-dev.png`
- 뷰포트: all
- 수정 가이드: next=/explore, from=test 전달
- 상세: `qa/04-flow.md` F418

### [SCT-118] P0 | 취향 테스트 | 재검사(결과 있는 회원) CTA 상태 미구현
- 위치: 계정 A(WHAN 결과 보유)로 /taste 재검사 → CLDR 결과
- 기대(디자인): '새로운 결과가 나왔어요' / '이 결과로 프로필을 업데이트하면 새 취향에 맞는 여행지를 추천받아요. 저장 전까지는 기존 취향이 그대로 유지돼요.' / [업데이트하고 추천받기] [다시 검사하기] — 근거 `screens/onboarding-test.html:2181-2188`
- 실제(배포): 첫 검사와 같은 CTA 'qa검수A님 취향의 여행 장소를 더 만나보세요 / 내 여행에서 추천 보기' — 업데이트 확인 단계 없음 — 증거 `qa/screens/taste-A-member-retest-CLDR-result-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 재검사 결과에 업데이트 확인 CTA 분기
- 상세: `qa/04-flow.md` F419

### [SCT-119] P0 | 홈 | document title 불일치
- 위치: https://scentrip.vercel.app/ — <title>
- 기대(디자인): Scentrip — 홈 — 근거 `screens/home.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: / 메타 title을 'Scentrip — 홈'으로
- 상세: `qa/01-text.md` F017

### [SCT-120] P0 | 홈 | 여행 소식 섹션 제목 불일치 (회원)
- 위치: https://scentrip.vercel.app/ — 취향 카드 오른쪽 소식 영역 h2
- 기대(디자인): {닉네임}님을 위한 여행 소식 (예: 이서연님을 위한 여행 소식) — 근거 `screens/home.html:399`
- 실제(배포): 지금 어울리는 여행 소식 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 회원일 때 '{닉네임}님을 위한 여행 소식'으로
- 상세: `qa/01-text.md` F018

### [SCT-121] P0 | 홈 | 여행 소식 '전체 보기' 링크 띄어쓰기
- 위치: https://scentrip.vercel.app/ — 소식 영역 우측 링크
- 기대(디자인): 전체 보기 — 근거 `screens/home.html:401`
- 실제(배포): 전체보기 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '전체 보기'로 띄어쓰기
- 상세: `qa/01-text.md` F019

### [SCT-122] P0 | 홈 | 소식 항목 메타 정보 불일치 (날짜 누락, 장소 수 추가)
- 위치: https://scentrip.vercel.app/ — 소식 목록 각 항목 하단 메타
- 기대(디자인): [카테고리 태그] [날짜 YYYY.MM.DD] (예: 오래된 목조 2026.08.06) — 근거 `screens/home.html:568`
- 실제(배포): 태그 · 장소 N곳 (예: 향기 · 장소 3곳), 날짜 없음 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 메타를 카테고리 + 게시일(YYYY.MM.DD)로
- 상세: `qa/01-text.md` F020

### [SCT-123] P0 | 홈 | 장소 카드 저장 버튼 aria-label 불일치
- 위치: https://scentrip.vercel.app/ — 장소 카드 하트 button
- 기대(디자인): 저장 — 근거 `screens/home.html:540`
- 실제(배포): 여행 장소 저장 — 증거 `qa/raw/home-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: aria-label을 원본 기준으로 맞춤
- 상세: `qa/01-text.md` F024

### [SCT-124] P0 | 홈 | 동선 섹션 제목 불일치
- 위치: https://scentrip.vercel.app/ — 세 번째 섹션 제목
- 기대(디자인): {닉네임}님 취향의 AI 맞춤 동선 — 근거 `screens/home.html:420`
- 실제(배포): {닉네임}님 취향과 가까운 테마 동선 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목을 '{닉네임}님 취향의 AI 맞춤 동선'으로
- 상세: `qa/01-text.md` F025

### [SCT-125] P0 | 홈 | AI 동선 배너 설명 문구 마침표
- 위치: https://scentrip.vercel.app/ — '센트립 AI로 나만의 여행 동선을 제작해보세요' 배너 설명
- 기대(디자인): 원하는 조건으로 커스텀할 수 있어요 (마침표 없음) — 근거 `screens/home.html:431`
- 실제(배포): 원하는 조건으로 커스텀할 수 있어요. — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 끝 마침표 제거
- 상세: `qa/01-text.md` F028

### [SCT-126] P0 | 홈 | 요즘 뜨는 로컬 여행 장소 카드에 AI 매칭 배지 없음
- 위치: https://scentrip.vercel.app/ — '요즘 뜨는 로컬 여행 장소' 카드 사진 좌상단
- 기대(디자인): AI 매칭 {n}% 배지 (회원) — 근거 `screens/home.html:440, 549`
- 실제(배포): 배지 없음 (하트만) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: 1440
- 수정 가이드: 로컬 장소 카드에도 매칭 배지 노출
- 상세: `qa/01-text.md` F029

### [SCT-127] P0 | 홈 | 비회원 취향 카드 버튼 라벨 불일치
- 위치: https://scentrip.vercel.app/ (비로그인) — 취향 카드 '1분이면 찾는 나만의 여행 유형' 버튼
- 기대(디자인): 취향 테스트하기 — 근거 `screens/home.html:391`
- 실제(배포): 취향 테스트 시작 — 증거 `qa/screens/home-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 버튼 라벨을 '취향 테스트하기'로
- 상세: `qa/01-text.md` F033

### [SCT-128] P0 | 홈 | 비회원 여행 소식 섹션 제목 불일치
- 위치: https://scentrip.vercel.app/ (비로그인) — 소식 영역 h2
- 기대(디자인): 지금 뜨는 여행 소식 — 근거 `screens/home.html:524`
- 실제(배포): 지금 어울리는 여행 소식 — 증거 `qa/screens/home-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 제목을 '지금 뜨는 여행 소식'으로
- 상세: `qa/01-text.md` F034

### [SCT-129] P0 | 홈 | 비회원 장소 섹션 제목 불일치
- 위치: https://scentrip.vercel.app/ (비로그인) — 두 번째 섹션 제목
- 기대(디자인): 많이 찾는 여행 장소 — 근거 `screens/home.html:526`
- 실제(배포): 취향을 고르기 좋은 여행 장소 — 증거 `qa/screens/home-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 제목을 '많이 찾는 여행 장소'로
- 상세: `qa/01-text.md` F035

### [SCT-130] P0 | 홈 | 비회원 동선 섹션 제목 불일치
- 위치: https://scentrip.vercel.app/ (비로그인) — 세 번째 섹션 제목
- 기대(디자인): 인기 여행 동선 — 근거 `screens/home.html:527`
- 실제(배포): 테마별 여행 동선 — 증거 `qa/screens/home-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 제목을 '인기 여행 동선'으로
- 상세: `qa/01-text.md` F036

### [SCT-131] P0 | 홈 | 비회원 동선 카드 설명 누락 · '추천 동선' 라벨 추가
- 위치: https://scentrip.vercel.app/ (비로그인) — 동선 카드 본문
- 기대(디자인): [대표 장소] 동선 이름 / 설명 1줄 / 메타 (회원과 같은 구성, 배지만 숨김) — 근거 `screens/home.html:589-594`
- 실제(배포): '추천 동선' 라벨 / 제목 / 메타 — 설명 문장 없음 — 증거 `qa/screens/home-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 동선 카드도 설명 줄 노출, '추천 동선' 라벨 제거
- 상세: `qa/01-text.md` F037

### [SCT-132] P0 | 홈 | 첫 방문 튜토리얼 1단계 문구 불일치
- 위치: https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 1/4
- 기대(디자인): 제목 "나의 여행 취향" / 본문 "향 취향 검사로 찾은 내 여행 유형이에요. '자세히 보기'에서 유형 설명과 어울리는 향을 확인할 수 있어요." — 근거 `screens/home.html:766`
- 실제(배포): 제목 "나의 여행 취향" / 본문 "자세히 보기에서 내 유형과 어울리는 향을 확인하세요." — 증거 `qa/screens/home-A-tour-01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F049

### [SCT-133] P0 | 홈 | 첫 방문 튜토리얼 2단계 문구 불일치
- 위치: https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 2/4
- 기대(디자인): 제목 "나를 위한 여행 소식" / 본문 "취향에 맞춘 여행 소식과 읽을거리를 모아 보여드려요." — 근거 `screens/home.html:767`
- 실제(배포): 제목 "여행 소식" / 본문 "이야기를 읽고 글 속 장소로 여행을 계획해 보세요." — 증거 `qa/screens/home-A-tour-02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F050

### [SCT-134] P0 | 홈 | 첫 방문 튜토리얼 3단계 문구 불일치
- 위치: https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 3/4
- 기대(디자인): 제목 "취향 맞춤 장소 추천" / 본문 "AI 매칭 %가 높은 장소부터 추천해요. '전체 보기'를 누르면 더 많은 장소를 볼 수 있어요." — 근거 `screens/home.html:768`
- 실제(배포): 제목 "여행 장소 추천" / 본문 "장소 카드를 눌러 자세히 보고 하트로 저장하세요." — 증거 `qa/screens/home-A-tour-03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F051

### [SCT-135] P0 | 홈 | 첫 방문 튜토리얼 4단계 문구 불일치
- 위치: https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 4/4
- 기대(디자인): 제목 "AI로 나만의 동선 만들기" / 본문 "AI 추천, 원하는 지역, 찜한 장소 중 편한 방식을 골라 취향에 맞는 여행 동선을 만들 수 있어요." — 근거 `screens/home.html:769`
- 실제(배포): 제목 "동선 만들기" / 본문 "원하는 방식으로 나만의 여행 동선을 만들어 보세요." — 증거 `qa/screens/home-A-tour-04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F052

### [SCT-136] P0 | 홈 | '나만의 동선 만들기'가 모달 대신 /planner로 이동
- 위치: https://scentrip.vercel.app/ — AI 동선 배너 '나만의 동선 만들기' (a[href='/planner'])
- 기대(디자인): '동선 만들기' 모달(AI 추천 / 원하는 지역 / 찜한 장소 → 다음) → 선택한 모드로 조건 입력 — 근거 `screens/home.html:411, 모달 rmTitle`
- 실제(배포): 모달 없이 /planner 이동 (위저드 첫 단계에서 모드 선택) — 증거 `qa/screens/ov-route-make-home-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 탐색 동선 탭과 같은 동선 만들기 모달 열기
- 상세: `qa/04-flow.md` F303

### [SCT-137] P0 | 소식 목록 | document title 불일치
- 위치: https://scentrip.vercel.app/news — <title>
- 기대(디자인): Scentrip — 여행 소식 — 근거 `screens/news.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: /news 메타 title을 'Scentrip — 여행 소식'으로
- 상세: `qa/01-text.md` F038

### [SCT-138] P0 | 소식 목록 | 헤더 설명 문구 불일치
- 위치: https://scentrip.vercel.app/news — h1 아래 p
- 기대(디자인): 한 편에 하나의 주제를 정하고, 그 주제로 이어지는 장소들을 묶어 소개합니다. 마음에 드는 글을 읽고 그 안의 장소로 바로 동선을 만들어 보세요. — 근거 `screens/news.html:202`
- 실제(배포): 장소의 향과 계절, 지역의 이야기를 읽고 글 속 장소로 나만의 동선을 만들어 보세요. — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명을 원본 문장으로 교체
- 상세: `qa/01-text.md` F040

### [SCT-139] P0 | 소식 목록 | 정렬 토글(취향 매칭순 / 최신순) 미구현
- 위치: https://scentrip.vercel.app/news — 헤더 아래 필터 바 좌측
- 기대(디자인): 세그먼트 '취향 매칭순' · '최신순' (회원 기본 취향 매칭순, 비회원은 '최신순'만) — 근거 `screens/news.html:209-212, 68`
- 실제(배포): 정렬 UI 없음 — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 필터 바에 정렬 세그먼트 추가
- 상세: `qa/01-text.md` F041

### [SCT-140] P0 | 소식 목록 | 지역 필터 칩 미구현
- 위치: https://scentrip.vercel.app/news — 필터 바 정렬 오른쪽
- 기대(디자인): '지역' 드롭다운 칩(listbox) + 결과 0건 시 빈 상태 — 근거 `screens/news.html:214-219`
- 실제(배포): 지역 필터 없음 — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지역 필터 칩 추가
- 상세: `qa/01-text.md` F042

### [SCT-141] P0 | 소식 목록 | 글 개수 표시 '총 N편' 누락
- 위치: https://scentrip.vercel.app/news — 필터 바 우측
- 기대(디자인): 총 {n}편 (예: 총 9편) — 근거 `screens/news.html:221`
- 실제(배포): 없음 — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 필터 바 우측에 '총 N편' 추가
- 상세: `qa/01-text.md` F043

### [SCT-142] P0 | 소식 목록 | 목록 레이아웃 불일치 — 대표 글 히어로 + 3열
- 위치: https://scentrip.vercel.app/news — 목록 영역
- 기대(디자인): 모든 글을 같은 카드(사진 → 카테고리·지역 → 제목 → 요약 → 날짜·읽는 시간·장소 수) 3열 그리드로 — 근거 `screens/news.html:223, 296-307`
- 실제(배포): 첫 글은 좌 사진/우 초록 패널 히어로(읽어보기 →), 나머지 3개는 카드 — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 히어로 제거, 전 글을 동일 카드 그리드로
- 상세: `qa/01-text.md` F044

### [SCT-143] P0 | 소식 목록 | 소식 카드 AI 매칭 배지 누락 (회원)
- 위치: https://scentrip.vercel.app/news — 카드 사진 좌상단
- 기대(디자인): AI 매칭 {n}% (title='이야기 속 장소들의 취향 매칭 평균') — 근거 `screens/news.html:299`
- 실제(배포): 배지 없음 — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 회원일 때 카드 사진에 매칭 배지
- 상세: `qa/01-text.md` F045

### [SCT-144] P0 | 소식 목록 | 소식 카드 상단 kicker 구성 불일치
- 위치: https://scentrip.vercel.app/news — 카드 제목 위
- 기대(디자인): 카테고리 칩 · 지역 (예: 오래된 목조 · 경북 안동) — 근거 `screens/news.html:302`
- 실제(배포): 태그 · 장소 N곳 (예: 로컬 · 장소 4곳) — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: kicker를 카테고리 · 지역으로
- 상세: `qa/01-text.md` F046

### [SCT-145] P0 | 소식 목록 | 소식 카드 하단 메타(날짜 · 읽는 시간 · 장소 수) 누락
- 위치: https://scentrip.vercel.app/news — 카드 요약 아래
- 기대(디자인): YYYY.MM.DD · 읽는 데 약 N분 · 장소 N곳 — 근거 `screens/news.html:305`
- 실제(배포): 없음 (히어로만 날짜 형식 2026. 8. 28.) — 증거 `qa/screens/news-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 카드 하단 메타 줄 추가, 날짜 형식 YYYY.MM.DD
- 상세: `qa/01-text.md` F047

### [SCT-146] P0 | 소식 목록 | 첫 방문 튜토리얼 1단계 문구 불일치
- 위치: https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 1/4
- 기대(디자인): 제목 "여행 소식" / 본문 "한 편에 하나의 주제로, 그 주제로 이어지는 장소들을 묶어 소개해요." — 근거 `screens/news.html:469`
- 실제(배포): 제목 "여행 소식" / 본문 "지역과 향을 주제로 묶은 여행 이야기를 만나보세요." — 증거 `qa/screens/news-A-tour-01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F053

### [SCT-147] P0 | 소식 목록 | 첫 방문 튜토리얼 2단계 문구 불일치
- 위치: https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 2/4
- 기대(디자인): 제목 "취향 매칭순으로 보기" / 본문 "글 속 장소가 내 취향과 잘 맞는 이야기부터 보여드려요. 최신순으로도 볼 수 있어요." — 근거 `screens/news.html:470`
- 실제(배포): 제목 "추천 소식" / 본문 "대표 이야기를 눌러 글과 소개된 장소를 읽어보세요." — 증거 `qa/screens/news-A-tour-02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F054

### [SCT-148] P0 | 소식 목록 | 첫 방문 튜토리얼 3단계 문구 불일치
- 위치: https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 3/4
- 기대(디자인): 제목 "지역으로 좁혀 보기" / 본문 "가고 싶은 지역의 이야기만 골라 볼 수 있어요." — 근거 `screens/news.html:471`
- 실제(배포): 제목 "여행 이야기" / 본문 "다른 이야기도 둘러보세요. 글 아래에서 동선을 만들 수 있어요." — 증거 `qa/screens/news-A-tour-03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F055

### [SCT-149] P0 | 소식 목록 | 첫 방문 튜토리얼 4단계 누락
- 위치: https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 4/4
- 기대(디자인): 제목 "이야기 카드" / 본문 "AI 매칭 %는 글 속 장소들의 취향 매칭 평균이에요. 글을 읽고 그 장소들로 바로 동선을 만들 수 있어요." — 근거 `screens/news.html:472`
- 실제(배포): 단계 없음 (총 3단계) — 증거 `qa/screens/news-A-tour-03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 단계 추가
- 상세: `qa/01-text.md` F056

### [SCT-150] P0 | 소식 상세 | document title 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — <title>
- 기대(디자인): Scentrip — {글 제목} — 근거 `screens/news-detail.html:374`
- 실제(배포): Scentrip — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title을 'Scentrip — {글 제목}'으로
- 상세: `qa/01-text.md` F067

### [SCT-151] P0 | 소식 상세 | 제목 위 kicker 구성 불일치 (지역·날짜·읽는 시간 누락)
- 위치: https://scentrip.vercel.app/news/green-rest-guide — h1 위 kicker
- 기대(디자인): [카테고리 칩] · 지역 · YYYY.MM.DD · 읽는 데 약 N분 — 근거 `screens/news-detail.html:380`
- 실제(배포): 카테고리 텍스트만('향기'), 날짜는 요약 아래 별도 줄 '2026. 8. 28.' — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: kicker 한 줄에 카테고리·지역·날짜(YYYY.MM.DD)·읽는 시간
- 상세: `qa/01-text.md` F069

### [SCT-152] P0 | 소식 상세 | 장소 섹션 제목 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 본문 아래 장소 섹션 h2
- 기대(디자인): 이 이야기 속 장소 — 근거 `screens/news-detail.html:389`
- 실제(배포): 이 글에 담긴 장소 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '이 이야기 속 장소'로
- 상세: `qa/01-text.md` F070

### [SCT-153] P0 | 소식 상세 | 장소 섹션 안내 문구 누락
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 장소 섹션 h2 아래
- 기대(디자인): 카드를 누르면 장소 상세로 이동해요. 하트를 누르면 내 여행에 저장돼요. — 근거 `screens/news-detail.html:390`
- 실제(배포): 없음 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 섹션 설명 p 추가
- 상세: `qa/01-text.md` F071

### [SCT-154] P0 | 소식 상세 | 장소 카드 kicker(지역 · 특징) 누락
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 장소 카드 이름 위
- 기대(디자인): 지역 · 특징 (예: 전남 담양 · 대숲) — 근거 `screens/news-detail.html:325-341`
- 실제(배포): 없음 (이름부터 시작) — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 카드 이름 위 kicker 추가
- 상세: `qa/01-text.md` F072

### [SCT-155] P0 | 소식 상세 | 장소 카드 AI 매칭 % 누락
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 장소 카드 태그 줄
- 기대(디자인): 향 태그들 + ✦ AI 매칭 {n}% — 근거 `screens/news-detail.html:330`
- 실제(배포): 향 태그만('워터리') — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 태그 줄 끝에 AI 매칭 % 추가
- 상세: `qa/01-text.md` F073

### [SCT-156] P0 | 소식 상세 | 장소 카드 하트 aria-label 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 장소 카드 하트 button
- 기대(디자인): {장소명} 저장 / {장소명} 저장 해제 — 근거 `screens/news-detail.html:332`
- 실제(배포): 여행 장소 저장 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: aria-label에 장소명 포함 + 상태별 문구
- 상세: `qa/01-text.md` F074

### [SCT-157] P0 | 소식 상세 | 동선 만들기 CTA 제목 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 장소 목록 아래 초록 박스 제목
- 기대(디자인): 글에서 읽은 장소 그대로, 동선으로 (지역이 섞이면 "지역이 다른 장소가 섞여 있어요") — 근거 `screens/news-detail.html:395`
- 실제(배포): 글 속 장소를 나만의 여행으로 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목 교체 + 지역 혼합 분기
- 상세: `qa/01-text.md` F075

### [SCT-158] P0 | 소식 상세 | 동선 만들기 CTA 설명 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — CTA 박스 설명
- 기대(디자인): 이야기 속 장소를 담아 여행 조건만 고르면 AI가 동선을 짜 드려요.<br>결과에서 순서를 바꾸거나 뺄 수 있어요. — 근거 `screens/news-detail.html:398`
- 실제(배포): 글에 소개된 장소를 모두 담아 여행 조건을 정해보세요. — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 2줄로 교체
- 상세: `qa/01-text.md` F076

### [SCT-159] P0 | 소식 상세 | 동선 만들기 CTA 버튼 라벨 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — CTA 버튼
- 기대(디자인): 이 이야기 속 {n}곳으로 동선 만들기 (1곳이면 "이 장소로 동선 만들기") — 근거 `screens/news-detail.html:377`
- 실제(배포): 글 속 장소로 동선 만들기 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 장소 수를 넣은 라벨로
- 상세: `qa/01-text.md` F077

### [SCT-160] P0 | 소식 상세 | 사실 확인 안내 박스 누락
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 본문 끝 (장소 섹션 위)
- 기대(디자인): 지정 이력·면적·조성 시기는 … 정보는 {YYYY.MM.DD} 기준이니, 방문 전 공식 홈페이지에서 다시 확인해 주세요. — 근거 `screens/news-detail.html:387`
- 실제(배포): 없음 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 본문 하단 안내 박스 추가
- 상세: `qa/01-text.md` F078

### [SCT-161] P0 | 소식 상세 | 출처 접기 제목 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 출처 details summary
- 기대(디자인): 취재·자료 및 이미지 출처 ({n}건) — 근거 `screens/news-detail.html:354`
- 실제(배포): 콘텐츠 및 이미지 출처 — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목 + 건수로
- 상세: `qa/01-text.md` F079

### [SCT-162] P0 | 소식 상세 | 이전·다음 글 내비 구성 불일치
- 위치: https://scentrip.vercel.app/news/green-rest-guide — 페이지 하단 nav
- 기대(디자인): 2칸: '이전 글 / {제목}'(없으면 '가장 오래된 글입니다') · '다음 글 / {제목}'(없으면 '가장 최신 글입니다'), aria-label '이전·다음 글' — 근거 `screens/news-detail.html:366`
- 실제(배포): '← 이전 글 / {제목}' 한 칸만, 다음 글 칸 없음, aria-label '다른 여행 소식' — 증거 `qa/screens/news-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 이전·다음 2칸 + 끝 글 안내 문구
- 상세: `qa/01-text.md` F080

### [SCT-163] P0 | 소식 상세 | '글 속 장소로 동선 만들기'가 조건 입력 대신 막힘 화면으로 이동
- 위치: https://scentrip.vercel.app/news/green-rest-guide → 동선 만들기 CTA → /planner?story=green-rest-guide
- 기대(디자인): 글 속 장소를 담아 조건 입력(route-conditions.html?mode=picked, 하단 "선택한 장소" 바)으로 이동 — 근거 `screens/news-detail.html:298, 423-428`
- 실제(배포): '낙동강제방(강서30리벚꽃길) · 위치 확인 중 / 정확한 위치가 확인되지 않아 이 장소를 포함한 동선은 아직 만들 수 없습니다.' + [다른 장소 찾아보기] [장소 지정 없이 새 동선 만들기] — 조건 입력으로 못 감 — 증거 `qa/screens/flow-news-detail-cta-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 위치가 확인된 장소로 조건 입력 진행 (원본에 위치 미확인 처리 정의 없음 — 확인 필요)
- 상세: `qa/04-flow.md` F415

### [SCT-164] P0 | 탐색 · 장소 | 첫 방문 튜토리얼 1단계 문구 불일치
- 위치: https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 1/4
- 기대(디자인): 제목 "장소와 동선 둘러보기" / 본문 "여행 장소와 여행 동선을 탭으로 오가며 탐색할 수 있어요." — 근거 `screens/place-recommend.html:858`
- 실제(배포): 제목 "장소와 동선" / 본문 "탭을 바꾸며 장소와 추천 동선을 둘러보세요." — 증거 `qa/screens/explore-A-tour-01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F057

### [SCT-165] P0 | 탐색 · 장소 | 첫 방문 튜토리얼 2단계 문구 불일치
- 위치: https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 2/4
- 기대(디자인): 제목 "취향 매칭순으로 보기" / 본문 "기본은 취향 매칭순이에요. 내 취향과 잘 맞는 장소부터 보여드려요." — 근거 `screens/place-recommend.html:859`
- 실제(배포): 제목 "정렬" / 본문 "원하는 순서로 장소를 살펴보세요." — 증거 `qa/screens/explore-A-tour-02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F058

### [SCT-166] P0 | 탐색 · 장소 | 첫 방문 튜토리얼 3단계 문구 불일치
- 위치: https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 3/4
- 기대(디자인): 제목 "필터로 좁혀 보기" / 본문 "지역·특징·취향으로 원하는 장소만 골라 볼 수 있어요." — 근거 `screens/place-recommend.html:860`
- 실제(배포): 제목 "필터" / 본문 "지역·특징·취향으로 원하는 결과를 좁혀 보세요." — 증거 `qa/screens/explore-A-tour-03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F059

### [SCT-167] P0 | 탐색 · 장소 | 첫 방문 튜토리얼 4단계 문구 불일치
- 위치: https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 4/4
- 기대(디자인): 제목 "장소 카드" / 본문 "AI 매칭 %로 내 취향과 얼마나 맞는지 알려줘요. 카드를 누르면 장소 상세를 볼 수 있어요." — 근거 `screens/place-recommend.html:861`
- 실제(배포): 제목 "탐색 결과" / 본문 "카드에서 자세한 내용을 확인하고 마음에 드는 여행을 저장하세요." — 증거 `qa/screens/explore-A-tour-04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F060

### [SCT-168] P0 | 탐색 · 장소 | document title 불일치
- 위치: https://scentrip.vercel.app/explore — <title>
- 기대(디자인): Scentrip — 탐색 · 장소 추천 — 근거 `screens/place-recommend.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: /explore title을 'Scentrip — 탐색 · 장소 추천'으로
- 상세: `qa/01-text.md` F081

### [SCT-169] P0 | 탐색 · 장소 | 회원 기본 취향 필터 프리셋 '{유형} 타입' 칩 미적용
- 위치: https://scentrip.vercel.app/explore — 필터 바 세 번째 칩
- 기대(디자인): 진입 시 내 유형 칩이 선택된 상태로 표시 (예: '감성가 타입 ⊗', 선택 스타일 + 해제 x) — 근거 `screens/place-recommend.html:390-397`
- 실제(배포): '취향 타입 ▾' 미선택 상태 — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 회원 진입 시 내 유형을 취향 필터 기본값으로 적용
- 상세: `qa/01-text.md` F082

### [SCT-170] P0 | 탐색 · 장소 | 거리순 버튼 title 누락 · 인기순에 원본에 없는 title
- 위치: https://scentrip.vercel.app/explore — 정렬 세그먼트
- 기대(디자인): 거리순 title='위치 정보 수집 필요', 인기순 title 없음 — 근거 `screens/place-recommend.html:290-291`
- 실제(배포): 인기순 title='추정 방문객 수 기준', 거리순 title 없음 — 증거 `qa/raw/explore-places-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: title 속성을 원본대로
- 상세: `qa/01-text.md` F083

### [SCT-171] P0 | 탐색 · 장소 | 비회원에게 '취향 매칭순' 정렬 노출
- 위치: https://scentrip.vercel.app/explore (비로그인) — 정렬 세그먼트 첫 버튼 (a[href="/login?next=/taste"])
- 기대(디자인): 비회원은 취향 매칭순 숨김 → 인기순 · 거리순 2개, 기본 인기순 — 근거 `screens/place-recommend.html:68-69, 728`
- 실제(배포): 취향 매칭순(로그인 링크) · 인기순 · 거리순 3개 — 증거 `qa/screens/explore-places-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원일 때 취향 매칭순 버튼 숨김
- 상세: `qa/01-text.md` F087

### [SCT-172] P0 | 탐색 · 장소 | 비회원에게 '취향 타입' 필터 노출
- 위치: https://scentrip.vercel.app/explore (비로그인) — 필터 바 세 번째 칩
- 기대(디자인): 비회원은 지역 · 특징 2개만 — 근거 `screens/place-recommend.html:68-69, 728`
- 실제(배포): 지역 · 특징 · 취향 타입 3개 — 증거 `qa/screens/explore-places-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원일 때 취향 필터 숨김
- 상세: `qa/01-text.md` F088

### [SCT-173] P0 | 탐색 · 장소 | 비회원 로그인 유도 배너 누락
- 위치: https://scentrip.vercel.app/explore (비로그인) — 필터 바와 카드 그리드 사이
- 기대(디자인): 배너: '로그인하고 내 취향에 맞는 장소를 매칭받아 보세요' / '향 취향 검사 결과로 AI가 매칭도 높은 장소를 추천해 드려요.' / [로그인] 버튼 — 근거 `screens/place-recommend.html:300-306`
- 실제(배포): 배너 없음 — 증거 `qa/screens/explore-places-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 전용 배너 추가
- 상세: `qa/01-text.md` F089

### [SCT-174] P0 | 탐색 · 동선 | document title 불일치
- 위치: https://scentrip.vercel.app/explore?tab=routes — <title>
- 기대(디자인): Scentrip — 탐색 · 여행 동선 — 근거 `screens/route.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/explore-routes-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title을 'Scentrip — 탐색 · 여행 동선'으로
- 상세: `qa/01-text.md` F090

### [SCT-175] P0 | 탐색 · 동선 | 추천 동선 캐러셀 제목 불일치 (회원)
- 위치: https://scentrip.vercel.app/explore?tab=routes — 캐러셀 헤더 h2
- 기대(디자인): {닉네임}님을 위한 AI 맞춤 동선 — 근거 `screens/route.html:335`
- 실제(배포): {닉네임}님을 위한 맞춤 동선 — 증거 `qa/screens/explore-routes-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 'AI' 추가
- 상세: `qa/01-text.md` F091

### [SCT-176] P0 | 탐색 · 동선 | 추천 동선 캐러셀 카드 윗줄 문구 불일치 (회원)
- 위치: https://scentrip.vercel.app/explore?tab=routes — 캐러셀 카드 제목 위 p
- 기대(디자인): {닉네임}님의 취향을 만족시켜줄 — 근거 `screens/route.html:440`
- 실제(배포): 당신의 취향을 따라 만나는 — 증거 `qa/screens/explore-routes-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '{닉네임}님의 취향을 만족시켜줄'로
- 상세: `qa/01-text.md` F092

### [SCT-177] P0 | 탐색 · 동선 | 비회원 캐러셀 제목 불일치
- 위치: https://scentrip.vercel.app/explore?tab=routes (비로그인) — 캐러셀 헤더 h2
- 기대(디자인): 지금 인기 있는 여행 동선 — 근거 `screens/route.html:862`
- 실제(배포): 새로운 여행을 위한 추천 동선 — 증거 `qa/screens/explore-routes-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 제목을 '지금 인기 있는 여행 동선'으로
- 상세: `qa/01-text.md` F093

### [SCT-178] P0 | 탐색 · 동선 | 비회원 캐러셀 카드 윗줄 문구 불일치 · '추천 동선' 라벨 추가
- 위치: https://scentrip.vercel.app/explore?tab=routes (비로그인) — 캐러셀 카드 제목 위
- 기대(디자인): 여행자들에게 인기 있는 — 근거 `screens/route.html:863`
- 실제(배포): '추천 동선' 라벨 + '{향} 분위기를 따라 만나는' (예: 워터리 분위기를 따라 만나는) — 증거 `qa/screens/explore-routes-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 윗줄을 '여행자들에게 인기 있는'으로, '추천 동선' 라벨 제거
- 상세: `qa/01-text.md` F094

### [SCT-179] P0 | 탐색 · 동선 | 필터 칩 라벨 '여유도' → '페이스'
- 위치: https://scentrip.vercel.app/explore?tab=routes — 필터 바 세 번째 칩
- 기대(디자인): 여유도 (옵션: 여유로운 코스 / 보통 / 부지런한 코스) — 근거 `screens/route.html:549`
- 실제(배포): 페이스 — 증거 `qa/screens/explore-routes-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 칩 라벨을 '여유도'로
- 상세: `qa/01-text.md` F095

### [SCT-180] P0 | 탐색 · 동선 | 회원 기본 취향 필터 프리셋 칩 미적용 · 라벨 '취향 타입'
- 위치: https://scentrip.vercel.app/explore?tab=routes — 필터 바 다섯 번째 칩
- 기대(디자인): 내 유형 칩이 선택된 상태 (예: '감성가 타입 ⊗') — 근거 `screens/route.html:551`
- 실제(배포): '취향 타입 ▾' 미선택 — 증거 `qa/screens/explore-routes-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 회원 진입 시 내 유형 프리셋 적용
- 상세: `qa/01-text.md` F096

### [SCT-181] P0 | 탐색 · 동선 | 비회원에게 '취향 매칭순' 정렬 · '취향 타입' 필터 노출
- 위치: https://scentrip.vercel.app/explore?tab=routes (비로그인) — 정렬 세그먼트 / 필터 바
- 기대(디자인): 비회원은 인기순만 + 지역·기간·여유도·테마 (취향 칩 숨김) — 근거 `screens/route.html:67-68`
- 실제(배포): 취향 매칭순 · 인기순 + 취향 타입 칩 노출 — 증거 `qa/screens/explore-routes-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원일 때 매칭 정렬과 취향 칩 숨김
- 상세: `qa/01-text.md` F097

### [SCT-182] P0 | 탐색 · 동선 | 비회원 로그인 유도 배너 누락
- 위치: https://scentrip.vercel.app/explore?tab=routes (비로그인) — 필터 바 아래
- 기대(디자인): '로그인하고 내 취향에 맞는 동선을 매칭받아 보세요' / '향 취향 검사 결과로 AI가 매칭도 높은 여행 동선을 추천해 드려요.' / [로그인] — 근거 `screens/route.html:359-365`
- 실제(배포): 배너 없음 — 증거 `qa/screens/explore-routes-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원 전용 배너 추가
- 상세: `qa/01-text.md` F098

### [SCT-183] P0 | 장소 상세 | document title 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 — <title>
- 기대(디자인): Scentrip — 여행 장소 상세 — 근거 `screens/place-detail.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title을 'Scentrip — 여행 장소 상세'로
- 상세: `qa/01-text.md` F100

### [SCT-184] P0 | 장소 상세 | 제목 옆 저장 버튼 aria-label 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 장소명 우측 하트 button
- 기대(디자인): 저장 전 '저장' / 저장 후 '저장 해제' — 근거 `screens/place-detail.html:251, 434`
- 실제(배포): 저장 전 '여행 장소 저장' / 저장 후 '저장한 여행에서 제거' — 증거 `qa/raw/place-detail-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: aria-label '저장'
- 상세: `qa/01-text.md` F101

### [SCT-185] P0 | 장소 상세 | 정보 박스 4번째 줄 항목 불일치 (교통 거리 → 권장 체류시간)
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 장소 소개 아래 정보 박스 4번째 행
- 기대(디자인): 버스 아이콘 + 가까운 터미널/역 기준 거리 (예: 장흥터미널에서 8km) — 근거 `screens/place-detail.html:272`
- 실제(배포): 권장 체류시간 60분 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 4번째 행을 교통 거리 정보로
- 상세: `qa/01-text.md` F102

### [SCT-186] P0 | 장소 상세 | 지도 외부 링크 문구·위치 불일치 ('카카오맵에서 보기')
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 지도 섹션
- 기대(디자인): 지도 오른쪽 아래 버튼 '카카오맵에서 보기' (새 탭 map.kakao.com) — 근거 `screens/place-detail.html:292`
- 실제(배포): 지도 섹션 제목 오른쪽 'OpenStreetMap ↗' 링크 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지도 안 오른쪽 아래 '카카오맵에서 보기'로
- 상세: `qa/01-text.md` F107

### [SCT-187] P0 | 장소 상세 | 리뷰 섹션 제목에 리뷰 수 누락 · 별점 요약 줄 추가
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 리뷰 섹션 헤더
- 기대(디자인): '리뷰 {n}' (제목 옆 숫자) — 근거 `screens/place-detail.html:299`
- 실제(배포): 제목 '리뷰' + 아래 줄 '★ - · 리뷰 0개' — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목 옆에 개수, 별점 요약 줄 제거
- 상세: `qa/01-text.md` F109

### [SCT-188] P0 | 장소 상세 | 리뷰 작성 버튼 라벨 불일치 (회원)
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 리뷰 헤더 우측 버튼
- 기대(디자인): 리뷰 작성하기 (텍스트 링크) — 근거 `screens/place-detail.html:300`
- 실제(배포): 리뷰 작성 (아이콘 채운 버튼) — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 라벨 '리뷰 작성하기'
- 상세: `qa/01-text.md` F110

### [SCT-189] P0 | 장소 상세 | 비회원 리뷰 작성 버튼 라벨 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 (비로그인) — 리뷰 헤더 우측 버튼
- 기대(디자인): '리뷰 작성하기' (누르면 로그인 모달) — 근거 `screens/place-detail.html:300, 444`
- 실제(배포): 로그인하고 리뷰 쓰기 — 증거 `qa/screens/place-detail-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원도 '리뷰 작성하기' + 로그인 모달
- 상세: `qa/01-text.md` F111

### [SCT-190] P0 | 장소 상세 | 리뷰 0개 빈 상태 설명 문구 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 리뷰 빈 상태 박스 span
- 기대(디자인): 다녀온 뒤 첫 리뷰를 남겨 주세요. — 근거 `screens/place-detail.html:305`
- 실제(배포): 이 장소의 첫 향기 경험을 남겨주세요. — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 문구 교체
- 상세: `qa/01-text.md` F112

### [SCT-191] P0 | 장소 상세 | 리뷰 0개 빈 상태 '첫 리뷰 작성하기' 버튼 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 리뷰 빈 상태 박스
- 기대(디자인): 박스 안 버튼 '첫 리뷰 작성하기' — 근거 `screens/place-detail.html:306`
- 실제(배포): 버튼 없음 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 빈 상태에 버튼 추가
- 상세: `qa/01-text.md` F113

### [SCT-192] P0 | 장소 상세 | 리뷰 0개일 때 '전체 리뷰 보기' 노출
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 리뷰 섹션 하단 버튼
- 기대(디자인): 리뷰 0개면 전체 리뷰 보기 숨김 — 근거 `screens/place-detail.html:158, 308`
- 실제(배포): 전체 리뷰 보기 노출 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 리뷰 0개일 때 숨김
- 상세: `qa/01-text.md` F114

### [SCT-193] P0 | 장소 상세 | 주변 장소 추천 메타 형식 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 향이 이어지는 주변 장소 추천 각 항목 보조 텍스트
- 기대(디자인): 거리 · 도보 시간 (예: 800m · 도보 12분 / 1.2km) — 근거 `screens/place-detail.html:319`
- 실제(배포): '직선거리 1.2km · 워터리' (도보 시간 없음, 향 태그 추가) — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '직선거리' 접두어와 향 태그 제거, 도보 시간 표기
- 상세: `qa/01-text.md` F115

### [SCT-194] P0 | 장소 상세 | 리뷰 작성이 별도 화면이 아닌 상세 안 모달
- 위치: https://scentrip.vercel.app/explore/tour_00031 — '리뷰 작성' 클릭
- 기대(디자인): 마이페이지 리뷰 작성 화면(mypage.html?place=…&loc=…#review-write)으로 이동, 사이드 메뉴 없는 단독 화면 — 근거 `screens/place-detail.html:277, screens/mypage.html:1100-1122`
- 실제(배포): 장소 상세 위 dialog 모달 — 증거 `qa/screens/review-write-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 리뷰 작성 화면으로 이동 (4단계 플로우 참고)
- 상세: `qa/01-text.md` F325

### [SCT-195] P0 | 장소 상세 | '카카오맵에서 보기'가 OpenStreetMap 링크로 대체
- 위치: https://scentrip.vercel.app/explore/tour_00031 — 지도 영역 외부 링크
- 기대(디자인): map.kakao.com/link/search/{주소} 새 탭 — 근거 `screens/place-detail.html:292`
- 실제(배포): openstreetmap.org/?mlat…&mlon… 새 탭 (지도 제목 옆 + 정보 박스 아래 2곳) — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 카카오맵 검색 링크로
- 상세: `qa/04-flow.md` F421

### [SCT-196] P0 | 장소 리뷰 | document title 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — <title>
- 기대(디자인): Scentrip — 리뷰 · {장소명} — 근거 `screens/place-reviews.html:388`
- 실제(배포): Scentrip — 증거 `qa/screens/place-reviews-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title을 'Scentrip — 리뷰 · {장소명}'으로
- 상세: `qa/01-text.md` F116

### [SCT-197] P0 | 장소 리뷰 | 페이지 제목 구성 불일치 ('리뷰 {n}' + 장소 줄)
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 뒤로가기 링크 아래 헤더
- 기대(디자인): h1 '리뷰 {n}' + 아래 줄 '{장소명} · {지역} · {특징}' (예: 천관산 억새 언덕 · 전남 장흥군 · 자연 명소) — 근거 `screens/place-reviews.html:293-294`
- 실제(배포): h1 '{장소명}' + h2 '리뷰' + '★ - · 리뷰 0개' — 증거 `qa/screens/place-reviews-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: h1을 '리뷰 {n}'으로, 장소명·지역·특징 줄 추가, 중복 제목·별점 줄 제거
- 상세: `qa/01-text.md` F117

### [SCT-198] P0 | 장소 리뷰 | 리뷰 작성 버튼 라벨 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 헤더 우측 버튼
- 기대(디자인): 리뷰 작성하기 (연필 아이콘) — 근거 `screens/place-reviews.html:296`
- 실제(배포): 리뷰 작성 (문서 아이콘) — 증거 `qa/screens/place-reviews-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 라벨 '리뷰 작성하기', 아이콘 연필
- 상세: `qa/01-text.md` F118

### [SCT-199] P0 | 장소 리뷰 | 리뷰 0개일 때 별점 요약·정렬·필터 노출
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 별점 요약 박스 + 추천순/최신순/별점 전체/사진 리뷰 줄
- 기대(디자인): 리뷰가 하나도 없으면 요약과 필터 줄 숨김 — 근거 `screens/place-reviews.html:442-443`
- 실제(배포): 요약 박스(– / 리뷰 0개 / 5~1점 0)와 정렬·필터 모두 노출 — 증거 `qa/screens/place-reviews-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 리뷰 0개면 sum·tools hidden
- 상세: `qa/01-text.md` F119

### [SCT-200] P0 | 장소 리뷰 | 리뷰 0개 빈 상태 설명 문구 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 빈 상태 span
- 기대(디자인): 다녀온 뒤 오른쪽 위 ‘리뷰 작성하기’로 첫 리뷰를 남겨 주세요. — 근거 `screens/place-reviews.html:445`
- 실제(배포): 이 장소의 첫 향기 경험을 남겨주세요. — 증거 `qa/screens/place-reviews-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 교체
- 상세: `qa/01-text.md` F120

### [SCT-201] P0 | 장소 리뷰 | 사진 필터 토글 라벨 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 필터 줄 사진 토글 버튼
- 기대(디자인): 사진 리뷰만 — 근거 `screens/place-reviews.html:313`
- 실제(배포): 사진 리뷰 (카메라 아이콘) — 증거 `qa/screens/place-reviews-empty-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 라벨 '사진 리뷰만', 아이콘 제거
- 상세: `qa/01-text.md` F121

### [SCT-202] P0 | 장소 리뷰 | 필터 줄 결과 개수 '{n}개' 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 필터 줄 우측
- 기대(디자인): {n}개 (role=status) — 근거 `screens/place-reviews.html:314`
- 실제(배포): 리뷰 1개 상태에서도 필터 줄에 개수 없음 — 증거 `qa/screens/place-reviews-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 필터 줄 우측에 개수
- 상세: `qa/01-text.md` F122

### [SCT-203] P0 | 장소 리뷰 | 정렬 그룹 aria-label 불일치
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 추천순/최신순 그룹
- 기대(디자인): 정렬 — 근거 `screens/place-reviews.html:305`
- 실제(배포): 리뷰 정렬 — 증거 `qa/raw/place-reviews-empty-1440-dev.json`
- 뷰포트: all
- 수정 가이드: aria-label '정렬'
- 상세: `qa/01-text.md` F123

### [SCT-204] P0 | 장소 리뷰 | 내 리뷰 카드 '내 리뷰' 칩 누락
- 위치: https://scentrip.vercel.app/explore/tour_00031/reviews — 내 리뷰 카드 닉네임 옆
- 기대(디자인): 칩 '내 리뷰' — 근거 `screens/place-reviews.html:423-433`
- 실제(배포): 없음 — 증거 `qa/screens/place-reviews-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 칩 추가
- 상세: `qa/01-text.md` F337

### [SCT-205] P0 | 동선 상세 | document title 불일치
- 위치: https://scentrip.vercel.app/planner/river-forest — <title>
- 기대(디자인): Scentrip — {동선 이름} — 근거 `screens/route-detail.html:649`
- 실제(배포): Scentrip — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title을 'Scentrip — {동선 이름}'으로
- 상세: `qa/01-text.md` F124

### [SCT-206] P0 | 동선 상세 | breadcrumb 마지막 단계(현재 동선 이름) 누락
- 위치: https://scentrip.vercel.app/planner/river-forest — 좌측 상단 nav[aria-label=현재 위치]
- 기대(디자인): 탐색 › 여행 동선 › {동선 이름}(aria-current) — 근거 `screens/route-detail.html:630-631`
- 실제(배포): 탐색 › 여행 동선 — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 마지막에 현재 동선 이름 추가
- 상세: `qa/01-text.md` F125

### [SCT-207] P0 | 동선 상세 | 제목 옆 '찜' 버튼 미구현
- 위치: https://scentrip.vercel.app/planner/river-forest — 동선 제목 행 우측
- 기대(디자인): ♡ 찜 버튼 (aria-label '찜하기' / '찜 해제') — 근거 `screens/route-detail.html:450, 721`
- 실제(배포): 버튼 없음 (하단 바만 있음) — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목 행 우측에 찜 토글 버튼
- 상세: `qa/01-text.md` F126

### [SCT-208] P0 | 동선 상세 | 제목 아래 메타 줄 구성 불일치
- 위치: https://scentrip.vercel.app/planner/river-forest — 제목 아래 p.meta
- 기대(디자인): 센트립 추천 동선(내가 만든 동선) · {시도 시군구} · {일정} · 장소 {n}곳 · {여유도} · 찜 {n} — 근거 `screens/route-detail.html:642-644`
- 실제(배포): 당일 · 이동 약 19분 · 2개 장소 — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 메타 항목·순서·표기를 원본대로
- 상세: `qa/01-text.md` F127

### [SCT-209] P0 | 동선 상세 | 리드 문구 불일치
- 위치: https://scentrip.vercel.app/planner/river-forest — 메타 아래 설명 p
- 기대(디자인): {닉네임}님의 취향을 만족시켜줄 {동선 이름} (진입 desc 없으면 '{닉네임}님의 취향을 분석해 구성한 동선이에요.') — 근거 `screens/route-detail.html:646`
- 실제(배포): 부산광역시 안의 2곳을 잇는 당일 코스입니다. 가까운 구간은 도보, 나머지는 대중교통 이동을 가정합니다. — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 리드 문구를 원본 규칙대로
- 상세: `qa/01-text.md` F128

### [SCT-210] P0 | 동선 상세 | '여행 컨셉' 값 형식 불일치
- 위치: https://scentrip.vercel.app/planner/river-forest — 여행 컨셉 칩
- 기대(디자인): {시도 시군구} 일대의 {지역 태그라인} 여행 (문장형, 예: 전남 담양 일대의 대숲과 가로수 그늘이 만드는 짙은 초록 향의 고장 여행) — 근거 `screens/route-detail.html:647`
- 실제(배포): 자연·힐링 (테마 태그) — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 컨셉 문장으로
- 상세: `qa/01-text.md` F129

### [SCT-211] P0 | 동선 상세 | 이동 구간 표기 불일치 (수단·시간 / 길찾기)
- 위치: https://scentrip.vercel.app/planner/river-forest — 타임라인 장소 사이 이동 구간 행
- 기대(디자인): '{이동수단} · 약 {n}분' (+ '또는 {수단} 약 {n}분') + 우측 '길찾기 ›' (카카오맵 길찾기 새 탭) — 근거 `screens/route-detail.html:674-678`
- 실제(배포): '예상 이동 19분 · 1.6km' + 우측 '지도 보기' — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 이동수단 라벨 표기, 거리 제거, 링크 라벨 '길찾기'
- 상세: `qa/01-text.md` F130

### [SCT-212] P0 | 동선 상세 | 지도 아래 안내 문구 불일치
- 위치: https://scentrip.vercel.app/planner/river-forest — 지도 좌하단 안내
- 기대(디자인): 위치 확인용 · 실제 길안내는 구간별 링크로 연결됩니다 — 근거 `screens/route-detail.html:470`
- 실제(배포): 이동시간은 거리 기반 예상치입니다. 실제 교통 상황은 반영하지 않습니다. — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 교체
- 상세: `qa/01-text.md` F131

### [SCT-213] P0 | 동선 상세 | 홈에서 들어온 동선 상세의 breadcrumb가 진입 경로를 반영하지 않음
- 위치: https://scentrip.vercel.app/ → 동선 카드 클릭 → /planner/green-rest
- 기대(디자인): 홈 진입: '홈 › {동선 이름}' (홈 링크 → /), 헤더 선택 메뉴 없음 — 근거 `screens/route-detail.html:605-610 (renderCrumb · from=home)`
- 실제(배포): '탐색 › 여행 동선' (진입 경로와 무관하게 고정) — 증거 `qa/screens/flow-home-route-detail-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 진입 경로(홈/탐색/내 여행)를 넘겨 breadcrumb·헤더 선택 상태 분기
- 상세: `qa/04-flow.md` F412

### [SCT-214] P0 | 동선 상세 | 내 여행에서 들어온 내 동선 상세의 breadcrumb·하단 버튼 불일치
- 위치: https://scentrip.vercel.app/dashboard?tab=routes → 저장 동선 카드 → /planner/{uuid}
- 기대(디자인): breadcrumb '내 여행 › 내 동선 › {동선 이름}' (내 동선 → 내 동선 탭), 헤더 '내 여행' 선택, 하단 버튼 '편집하기' — 근거 `screens/route-detail.html:628-633, 731`
- 실제(배포): breadcrumb '내 여행 › 여행 동선'(현재 동선 이름 없음), 하단 버튼 '이 일정 수정하기' — 증거 `qa/screens/flow-mytrip-route-detail-1440-dev.png`
- 뷰포트: all
- 수정 가이드: breadcrumb 2단계 라벨 '내 동선' + 현재 이름, 버튼 '편집하기'
- 상세: `qa/04-flow.md` F413

### [SCT-215] P0 | 동선 상세 | '이 동선으로 여행 만들기'가 결과 화면 대신 장소 선택 화면으로 이동
- 위치: https://scentrip.vercel.app/planner/river-forest → 하단 CTA
- 기대(디자인): 동선을 담아 AI 맞춤 동선 결과 화면(route-result.html?open=1)으로 이동 — 여행 조건 모달이 열린 상태 — 근거 `screens/route-detail.html:493-495`
- 실제(배포): /planner?template=river-forest — "여행 동선을 만들 장소를 선택해주세요" 장소 선택 화면 (총 6개 장소) — 증거 `qa/screens/flow-route-detail-cta-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 결과 화면으로 바로 이동 + 여행 조건 모달 열기
- 상세: `qa/04-flow.md` F414

### [SCT-216] P0 | 동선 상세 | 구간 '길찾기'(카카오맵 길찾기 새 탭)가 페이지 내 지도 앵커로 대체
- 위치: https://scentrip.vercel.app/planner/river-forest — 이동 구간 우측 링크
- 기대(디자인): map.kakao.com/link/to/{다음 장소},{위도},{경도} 새 탭 — 근거 `screens/route-detail.html:655, screens/route-result.html (tl-link)`
- 실제(배포): '지도 보기' → #route-detail-map (같은 페이지, 1440에서는 화면에 안 보임) — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 구간별 카카오맵 길찾기 링크
- 상세: `qa/04-flow.md` F422

### [SCT-217] P0 | 동선 만들기 · 조건 | document title 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — <title>
- 기대(디자인): Scentrip — 동선 만들기 · 조건 입력 — 근거 `screens/route-conditions.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/planner-ai-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F134

### [SCT-218] P0 | 동선 만들기 · 조건 | mode 파라미터 무시 — 항상 AI 추천이 선택된 채 시작
- 위치: https://scentrip.vercel.app/planner?mode=region · ?mode=picked — 첫 화면 라디오
- 기대(디자인): ?mode=ai|region|picked 에 맞는 플로우로 바로 1단계 시작 (지역 → 기간… / 기간… ) — 근거 `screens/route-conditions.html:265-273`
- 실제(배포): 어떤 mode로 들어와도 'AI에게 여행지 추천 받기'가 선택된 모드 선택 화면 — 증거 `qa/screens/planner-region-s01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: mode 쿼리를 읽어 해당 플로우로 시작
- 상세: `qa/01-text.md` F135

### [SCT-219] P0 | 동선 만들기 · 조건 | 위저드 안 '어떤 동선을 만들어볼까요?' 모드 선택 단계
- 위치: https://scentrip.vercel.app/planner?mode=ai — 조건 입력 카드 첫 화면
- 기대(디자인): 모드 선택은 진입 전 "동선 만들기" 모달(홈·탐색·내 여행)에서 하고, 조건 입력 카드는 곧바로 첫 질문 — 근거 `screens/home.html (rmTitle 동선 만들기 모달), screens/route-conditions.html:243-251`
- 실제(배포): 카드 안 첫 단계로 3개 모드 라디오 + 다음 — 증거 `qa/screens/planner-ai-s01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 모드 선택을 모달로 옮기고 위저드는 첫 질문부터 (4단계 플로우와 함께 확인)
- 상세: `qa/01-text.md` F136

### [SCT-220] P0 | 동선 만들기 · 조건 | 카드 헤더 — 플로우 이름 누락
- 위치: https://scentrip.vercel.app/planner?mode=ai — 카드 상단 뒤로가기 버튼 영역
- 기대(디자인): [‹ 뒤로(aria-label '이전 단계로')] + '동선 만들기 · {플로우 이름}' (예: 동선 만들기 · AI에게 여행지 추천 받기) — 근거 `screens/route-conditions.html:211-214`
- 실제(배포): '‹ 동선 만들기 · 여행 조건' (버튼 텍스트, 플로우 이름 없음) — 증거 `qa/screens/planner-ai-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '여행 조건' 자리에 선택한 플로우 이름
- 상세: `qa/01-text.md` F137

### [SCT-221] P0 | 동선 만들기 · 조건 | 선택 질문 표시 '선택사항' 위치·표기 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — 동행·숙소 단계 질문
- 기대(디자인): 질문 제목 끝 배지 '선택사항' (붙여 씀) — 근거 `screens/route-conditions.html:371`
- 실제(배포): 진행 텍스트 줄 '6 / 7 · 선택 사항' (띄어 씀) — 증거 `qa/screens/planner-ai-s07-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 질문 제목 옆 '선택사항' 배지로
- 상세: `qa/01-text.md` F139

### [SCT-222] P0 | 동선 만들기 · 조건 | 기간 질문 문구 띄어쓰기 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — 기간 단계 h1
- 기대(디자인): 며칠동안 여행하실 계획인가요? — 근거 `screens/route-conditions.html:251`
- 실제(배포): 며칠 동안 여행하실 계획인가요? — 증거 `qa/screens/planner-ai-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 문구로 (원본 띄어쓰기 오류 여부는 원본 확인 필요)
- 상세: `qa/01-text.md` F140

### [SCT-223] P0 | 동선 만들기 · 조건 | 이동 수단 선택지 표기 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — 이동 수단 단계 두 번째 선택지
- 기대(디자인): 도보/대중교통 — 근거 `screens/route-conditions.html:253`
- 실제(배포): 도보 / 대중교통 — 증거 `qa/screens/planner-ai-s03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '도보/대중교통'
- 상세: `qa/01-text.md` F141

### [SCT-224] P0 | 동선 만들기 · 조건 | 거리 질문 문구 앞부분 누락
- 위치: https://scentrip.vercel.app/planner?mode=ai — 거리 단계 h1
- 기대(디자인): 여행지 안에서, 여행 장소 사이 거리는 어느 정도까지 괜찮으신가요? — 근거 `screens/route-conditions.html:255`
- 실제(배포): 여행 장소 사이 거리는 어느 정도까지 괜찮으신가요? — 증거 `qa/screens/planner-ai-s05-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '여행지 안에서, ' 추가
- 상세: `qa/01-text.md` F143

### [SCT-225] P0 | 동선 만들기 · 조건 | 거리 선택지 라벨 형식·문구 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — 거리 단계 선택지 3개
- 기대(디자인): 한 줄 '가깝게 (약 35분 이내)' · '적당히 (약 35~70분)' · '멀어도 괜찮아요 (약 70분 이상)' — 근거 `screens/route-conditions.html:335-336`
- 실제(배포): 두 줄 '가깝게 / 약 35분 이내' · '적당히 / 약 35~70분' · '멀어도 괜찮아요 / 약 70분 이상도 괜찮아요' — 증거 `qa/screens/planner-ai-s05-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 괄호 한 줄 형식, 마지막 보조 문구 "약 70분 이상"
- 상세: `qa/01-text.md` F144

### [SCT-226] P0 | 동선 만들기 · 조건 | 출발 이동 시간 선택지 '상관 없어요' 띄어쓰기
- 위치: https://scentrip.vercel.app/planner?mode=ai — 출발지 단계 4번째 선택지
- 기대(디자인): 상관 없어요 — 근거 `screens/route-conditions.html:258`
- 실제(배포): 상관없어요 — 증거 `qa/screens/planner-ai-s06-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '상관 없어요'
- 상세: `qa/01-text.md` F145

### [SCT-227] P0 | 동선 만들기 · 조건 | 출발지 하위 질문 제목·선택 상자 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — 출발지 단계 하단
- 기대(디자인): h2 '출발지를 입력해주세요' + 선택 상자 placeholder '출발지 선택' (옵션 17개 약칭: 서울 부산 대구 인천 광주 대전 울산 세종 경기 강원 충북 충남 전북 전남 경북 경남 제주) — 근거 `screens/route-conditions.html:246-247, 259`
- 실제(배포): p '출발지 입력' + 펼침 '출발지' (옵션: 출발지 전체 + 정식 명칭 15개, 세종·울산 없음, 순서 다름) — 증거 `qa/screens/planner-ai-s06-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목·placeholder·옵션 목록/순서/표기를 원본대로
- 상세: `qa/01-text.md` F146

### [SCT-228] P0 | 동선 만들기 · 조건 | 동행 질문 단일 선택 → 다중 선택(체크박스)
- 위치: https://scentrip.vercel.app/planner?mode=ai — 동행 단계 선택지
- 기대(디자인): 혼자/연인과/친구와/가족과 중 하나만 (role=radio) — 근거 `screens/route-conditions.html:260, 337-340`
- 실제(배포): 체크박스 — 여러 개 동시 선택 — 증거 `qa/screens/planner-ai-s07-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 단일 선택으로
- 상세: `qa/01-text.md` F148

### [SCT-229] P0 | 동선 만들기 · 조건 | 숙소 질문 문구 불일치
- 위치: https://scentrip.vercel.app/planner?mode=ai — 숙소 단계 h1
- 기대(디자인): 어디에 숙박할지 정해지셨나요? — 근거 `screens/route-conditions.html:262`
- 실제(배포): 머무르실 숙소가 정해졌나요? — 증거 `qa/screens/planner-ai-s08-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 문구로
- 상세: `qa/01-text.md` F149

### [SCT-230] P0 | 동선 만들기 · 조건 | 숙소 입력 방식 불일치 (박별 '숙소 미정/정해졌어요' + 주소 입력)
- 위치: https://scentrip.vercel.app/planner?mode=ai — 숙소 단계 본문
- 기대(디자인): 박마다 'N박째' 제목 + 선택 '숙소 미정' · '정해졌어요' → '정해졌어요'면 검색 입력 placeholder '숙소 주소를 입력해주세요' — 근거 `screens/route-conditions.html:358-362, 376-383`
- 실제(배포): 설명 '숙소 가까운 장소를 선택하면 해당 위치를 기준으로 동선을 계산해요.' + '숙소가 있는 지역' 선택 + '1박째 숙소' select(미정 / {관광지} 인근) + '숙소 근처 장소명 검색' + 지도에서 위치 지정 — 증거 `qa/screens/planner-ai-s08-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 박별 2지선다 + 주소 입력으로
- 상세: `qa/01-text.md` F150

### [SCT-231] P0 | 동선 만들기 · 조건 | 지역 플로우에 출발지 단계가 추가됨 (7단계 → 8단계)
- 위치: https://scentrip.vercel.app/planner (원하는 지역의 동선 추천 받기) — 진행 표시
- 기대(디자인): 지역 → 기간 → 이동 수단 → 일정 → 거리 → 동행 → 숙소 (7단계, 출발지 없음) — 근거 `screens/route-conditions.html:267`
- 실제(배포): 지역 → 기간 → 이동 → 일정 → 거리 → 출발지 → 동행 → 숙소 (8단계) — 증거 `qa/screens/planner-region-s07-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지역 플로우에서 출발지 단계 제거
- 상세: `qa/01-text.md` F152

### [SCT-232] P0 | 동선 만들기 · 조건 | 지역 질문 선택 상자 placeholder·옵션 불일치
- 위치: https://scentrip.vercel.app/planner (지역 플로우) 1단계
- 기대(디자인): 선택 상자 placeholder '여행지 선택', 옵션 17개 약칭(서울…제주) — 근거 `screens/route-conditions.html:246-247, 250`
- 실제(배포): 펼침 '여행할 지역' (옵션: 여행할 지역 전체 + 정식 명칭 15개, 세종·울산 없음) — 증거 `qa/screens/planner-region-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: placeholder·옵션을 원본대로
- 상세: `qa/01-text.md` F153

### [SCT-233] P0 | 동선 만들기 · 조건 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트
- 위치: https://scentrip.vercel.app/planner?mode=ai (비로그인)
- 기대(디자인): 헤더·푸터 유지 + '로그인이 필요해요 / 동선 만들기는 로그인 후 이용할 수 있어요.<br>몇 가지 조건만 고르면 취향에 맞는 동선을 만들어 드려요. / [로그인]' — 근거 `screens/route-conditions.html:201-203`
- 실제(배포): 307 → /login?next=%2Fplanner%3Fmode%3Dai — 증거 `(크롤 결과 qa/00-page-map.md 0-3)`
- 뷰포트: all
- 수정 가이드: 비회원은 화면 안 게이트로
- 상세: `qa/01-text.md` F182

### [SCT-234] P0 | 동선 만들기 · 조건 | 찜한 장소 플로우 — '선택한 장소' 칩 바 누락
- 위치: https://scentrip.vercel.app/planner?mode=saved-places — 장소 선택 후 조건 단계 하단
- 기대(디자인): CTA 위 '선택한 장소' + 장소명 칩(최대 3개, 넘으면 '+N개') — 근거 `screens/route-conditions.html:223-226, 277-287`
- 실제(배포): 선택한 장소 표시 없음 — 증거 `qa/screens/planner-picked-s01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 조건 단계 하단에 선택한 장소 바
- 상세: `qa/01-text.md` F318

### [SCT-235] P0 | 동선 만들기 · 조건 | 찜한 장소 플로우에 출발지 단계 포함 (6단계 → 장소 선택 포함 8단계)
- 위치: https://scentrip.vercel.app/planner?mode=saved-places — 진행 표시
- 기대(디자인): 기간 → 이동 수단 → 일정 → 거리 → 동행 → 숙소 (6단계, 출발지 없음; 장소 선택은 별도 화면) — 근거 `screens/route-conditions.html:268`
- 실제(배포): 장소 선택 1단계 + 기간(2/8) → 이동(3/8) → 일정(4/8) → 거리(5/8) → 출발지(6/8) → 동행(7/8) → 숙소(8/8) — 증거 `qa/screens/planner-picked-s01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 찜한 장소 플로우는 출발지 없이 6단계
- 상세: `qa/01-text.md` F319

### [SCT-236] P0 | 동선 만들기 · 장소 선택 | document title 불일치
- 위치: https://scentrip.vercel.app/planner?mode=saved-places — <title>
- 기대(디자인): Scentrip — 동선 만들기 · 장소 선택 — 근거 `screens/route-create.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/route-create-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F313

### [SCT-237] P0 | 동선 만들기 · 장소 선택 | 상단 breadcrumb 대신 '← 이전 단계로' 버튼
- 위치: https://scentrip.vercel.app/planner?mode=saved-places — 제목 위
- 기대(디자인): nav[aria-label=현재 위치] '동선 만들기 › 장소 선택'(현재) — 근거 `screens/route-create.html:422-425`
- 실제(배포): '← 이전 단계로' 텍스트 버튼 — 증거 `qa/screens/route-create-1440-dev.png`
- 뷰포트: all
- 수정 가이드: breadcrumb로
- 상세: `qa/01-text.md` F314

### [SCT-238] P0 | 동선 만들기 · 장소 선택 | 선택 가능 개수 문구 불일치
- 위치: https://scentrip.vercel.app/planner?mode=saved-places — 필터 아래 개수 줄
- 기대(디자인): 선택 가능한 장소 {n}곳 — 근거 `screens/route-create.html:433`
- 실제(배포): 총 {n}개 장소 · 같은 시·도에서 최대 12개 선택 — 증거 `qa/screens/route-create-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 원본대로
- 상세: `qa/01-text.md` F315

### [SCT-239] P0 | 동선 만들기 · 장소 선택 | 지도 안내 캡션 누락
- 위치: https://scentrip.vercel.app/planner?mode=saved-places — 오른쪽 지도 좌하단
- 기대(디자인): 선택한 장소가 지도에 표시됩니다 — 근거 `screens/route-create.html:444`
- 실제(배포): 캡션 없음 — 증거 `qa/screens/route-create-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지도 캡션 추가
- 상세: `qa/01-text.md` F316

### [SCT-240] P0 | 동선 만들기 · 결과 | document title 불일치
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — <title>
- 기대(디자인): Scentrip — AI 맞춤 동선 — 근거 `screens/route-result.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 'Scentrip — AI 맞춤 동선'
- 상세: `qa/01-text.md` F154

### [SCT-241] P0 | 동선 만들기 · 결과 | 결과 제목 형식 불일치
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 좌측 상단 h1
- 기대(디자인): {시도약칭 시군구} {기간} 향기 동선 (예: 강원 강릉 1박 2일 향기 동선) — 근거 `screens/route-result.html:821`
- 실제(배포): {시도 정식명} · {유형 별칭}의 {N}일 동선 (예: 강원특별자치도 · 시간을 수집하는 감성가의 2일 동선), textarea로 편집 가능(aria-label 일정 이름) — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목 형식을 원본대로, 인라인 편집 제거
- 상세: `qa/01-text.md` F155

### [SCT-242] P0 | 동선 만들기 · 결과 | '여행 컨셉' 값 형식 불일치 · 테마 편집 펼침 추가
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 여행 컨셉 박스
- 기대(디자인): 여행 컨셉 {지역} 일대의 {태그라인} 여행 (문장, 고정 박스) — 근거 `screens/route-result.html:449-454, 831`
- 실제(배포): '여행 컨셉 자연·힐링' 펼침 → '여행 테마 / 장소 구성을 바탕으로 자동 분류했어요. 직접 바꿀 수 있어요.' + 테마 5종 선택 + 설명 문장 — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 컨셉 문장으로, 테마 편집 UI 제거
- 상세: `qa/01-text.md` F156

### [SCT-243] P0 | 동선 만들기 · 결과 | '다른 지역으로 다시 추천' 버튼 위치·라벨 불일치
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 여행 컨셉 박스 옆
- 기대(디자인): 컨셉 박스 오른쪽 버튼 '다른 지역으로 다시 추천' (AI 모드만) — 근거 `screens/route-result.html:454, 833`
- 실제(배포): '▸ 일정 설정 및 안내' 펼침 안쪽 '다른 지역 추천' — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 컨셉 박스 옆으로 꺼내고 라벨 원본대로
- 상세: `qa/01-text.md` F157

### [SCT-244] P0 | 동선 만들기 · 결과 | 조건에서 고른 출발지가 결과에 반영되지 않음
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 첫 행 출발지
- 기대(디자인): 조건 입력에서 고른 출발지 → '{출발지}에서 출발' + '수정 ›' — 근거 `screens/route-result.html:963-974`
- 실제(배포): 출발지(서울특별시)를 골랐는데 '출발지와 출발 시각을 설정해 주세요' + '출발지 설정 ›' — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 조건의 출발지를 결과 출발지 행에 반영
- 상세: `qa/01-text.md` F160

### [SCT-245] P0 | 동선 만들기 · 결과 | 장소 드래그로 순서 변경 미구현
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 장소 카드
- 기대(디자인): 카드 좌측 grip(title '끌어서 순서 변경'), 카드 draggable — 근거 `screens/route-result.html:914-915`
- 실제(배포): 드래그 핸들 없음, 더보기 메뉴의 '위로/아래로'로만 이동 — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 드래그 정렬 + grip 추가
- 상세: `qa/01-text.md` F162

### [SCT-246] P0 | 동선 만들기 · 결과 | 이동 구간 표기 불일치
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 장소 사이 이동 행
- 기대(디자인): '{자동차|대중교통} · 약 {n}분' + '길찾기 ›' — 근거 `screens/route-result.html:861-873`
- 실제(배포): '예상 24분 · 14.3km' + '지도 보기' — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 수단 라벨 + 길찾기 링크
- 상세: `qa/01-text.md` F163

### [SCT-247] P0 | 동선 만들기 · 결과 | 숙소 미정일 때 숙소 전 구간 안내 문구 누락
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 마지막 장소와 숙소 행 사이
- 기대(디자인): 이동 행 '{자동차} · 숙소를 입력하면 이 구간의 이동 시간을 계산해 드려요' — 근거 `screens/route-result.html:861`
- 실제(배포): 구간 행 없음 — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 숙소 미정 구간 안내 행 추가
- 상세: `qa/01-text.md` F164

### [SCT-248] P0 | 동선 만들기 · 결과 | 지도 안내 문구 불일치
- 위치: https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 지도 좌하단
- 기대(디자인): 위치 확인용 · 실제 길안내는 구간별 링크로 연결됩니다 — 근거 `screens/route-result.html:484`
- 실제(배포): 이동시간은 거리 기반 예상치입니다. 실제 교통 상황은 반영하지 않습니다. — 증거 `qa/screens/route-result-ai-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 교체
- 상세: `qa/01-text.md` F166

### [SCT-249] P0 | 동선 만들기 · 결과 | '내 여행에 저장' 후 토스트 누락
- 위치: https://scentrip.vercel.app/planner (결과) — 하단 저장 바 '내 여행에 저장' 클릭
- 기대(디자인): 토스트 '내 여행에 저장했어요' (다시 저장 시 '변경사항을 저장했어요', 변경 없으면 '이미 내 여행에 저장된 동선이에요') — 근거 `screens/route-result.html:1465, 1493`
- 실제(배포): 토스트 없음 — 증거 `qa/screens/route-result-saved-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 저장 성공 시 토스트 노출
- 상세: `qa/01-text.md` F167

### [SCT-250] P0 | 동선 만들기 · 결과 | 저장 후 하단 바 '보러 가기' 링크 누락
- 위치: https://scentrip.vercel.app/planner (결과) — 하단 저장 바 메시지
- 기대(디자인): 내 여행에 저장된 동선이에요 · 보러 가기(→ 내 동선) — 근거 `screens/route-result.html:1503`
- 실제(배포): 내 여행에 저장된 동선이에요 (링크 없음) — 증거 `qa/screens/route-result-saved-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '· 보러 가기' 링크 추가 (→ /dashboard?tab=routes)
- 상세: `qa/01-text.md` F168

### [SCT-251] P0 | 동선 만들기 · 결과 | 여행 조건 모달 설명 문구 불일치
- 위치: https://scentrip.vercel.app/planner (결과) — 헤더 '여행 조건' 버튼 → 모달 제목 아래
- 기대(디자인): 조건 변경시 동선을 다시 구상합니다. — 근거 `screens/route-result.html:523`
- 실제(배포): 조건을 바꾸면 새 동선을 만듭니다. 취소하면 현재 일정이 유지됩니다. — 증거 `qa/screens/rr-cond-modal-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 문구 교체
- 상세: `qa/01-text.md` F320

### [SCT-252] P0 | 동선 만들기 · 결과 | 여행 조건 모달 항목 구성 불일치
- 위치: https://scentrip.vercel.app/planner (결과) — 여행 조건 모달 본문
- 기대(디자인): 요약형 행 6개: 여행 기간 / 이동 수단 / 일정 밀도 / 장소 사이 거리(예: 적당히 (약 35~70분)) / 이동 가능 시간 / 동행(선택 안 함) — 버튼 [이 조건으로 다시 만들기] — 근거 `screens/route-result.html:518-538`
- 실제(배포): 편집 폼: 지역 · {시도} / 시작일 / 기간 5지선다 / 이동 수단 / 일정 여유도(넉넉하게·적당히·빽빽하게) / 여행 장소 사이 거리 / 출발지(시도 목록) / 출발 위치(지도에서 위치 지정) / 첫날 출발 시각 / 출발지에서 첫 목적지까지 / 동행 — 버튼 [취소] [이 조건으로 다시 만들기] — 증거 `qa/screens/rr-cond-modal-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 항목·라벨로 (일정 밀도 옵션 2개, 라벨 "일정 밀도"·"이동 가능 시간")
- 상세: `qa/01-text.md` F321

### [SCT-253] P0 | 동선 만들기 · 결과 | '출발지 설정'이 출발 설정 모달 대신 여행 조건 모달을 엶
- 위치: https://scentrip.vercel.app/planner (결과) — 타임라인 출발지 행 '출발지 설정 ›'
- 기대(디자인): '출발 설정' 모달: 출발지 / 출발 시각 / 안내 '출발 시각과 출발지까지의 이동 시간으로 첫날 시작 시간대를 정해요.' / [저장] — 근거 `screens/route-result.html:539-553, 974`
- 실제(배포): 여행 조건 전체 편집 모달이 열림 — 증거 `qa/screens/rr-origin-modal-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 출발 설정 전용 모달 연결
- 상세: `qa/01-text.md` F322

### [SCT-254] P0 | 동선 만들기 · 결과 | 장소 더보기 메뉴 구성 불일치
- 위치: https://scentrip.vercel.app/planner (결과) — 타임라인 장소 카드 ⋯
- 기대(디자인): '시간대' 라디오(오전/오후/저녁 중 다른 시간대) · '일차 이동' '{N}일차로 옮기기' · 구분선 · '장소 변경' · '삭제'(danger) — 근거 `screens/route-result.html:898-908`
- 실제(배포): 장소명 · 위로 · 아래로 · 체류시간(15~480분) · 시간대(오전/오후/저녁) · 장소 변경 · 삭제 이유(선택) 6종 · 장소 삭제 — 증거 `qa/screens/rr-place-menu-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 메뉴 항목·라벨을 원본대로 (위로/아래로·체류시간·삭제 이유 제거)
- 상세: `qa/01-text.md` F323

### [SCT-255] P0 | 동선 만들기 · 결과 | 장소 삭제 시 확인 모달 없이 즉시 삭제
- 위치: https://scentrip.vercel.app/planner (결과) — ⋯ → '장소 삭제'
- 기대(디자인): 확인 모달 '이 장소를 뺄까요?' / '{장소명}을 일정에서 뺍니다. 뺀 장소는 다시 추천되지 않아요.' / [그대로 둘게요] [빼기] — 근거 `screens/route-result.html:503-515`
- 실제(배포): 확인 없이 바로 타임라인에서 제거 (공곶이 삭제로 확인) — 증거 `qa/screens/rr-place-delete-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 확인 모달 추가
- 상세: `qa/01-text.md` F324

### [SCT-256] P0 | 내 여행 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트
- 위치: https://scentrip.vercel.app/dashboard (비로그인)
- 기대(디자인): 헤더·푸터 유지 + '로그인이 필요해요 / 내 여행은 로그인 후 이용할 수 있어요.<br>저장한 장소와 동선을 한곳에서 확인해 보세요. / [로그인]' — 근거 `screens/my-trip.html:388-390`
- 실제(배포): 307 → /login?next=/dashboard — 증거 `qa/screens/mytrip-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원은 화면 안 게이트로 (로그인 누르면 로그인 화면)
- 상세: `qa/01-text.md` F180

### [SCT-257] P0 | 내 여행 · 내 장소 | 첫 방문 튜토리얼 1단계 문구 불일치
- 위치: https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 1/4
- 기대(디자인): 제목 "내 장소 · 내 동선" / 본문 "찜한 장소와 저장한 여행 동선을 탭으로 나눠 모아 둬요." — 근거 `screens/my-trip.html:1077`
- 실제(배포): 제목 "내 장소 · 내 동선" / 본문 "저장한 장소와 동선을 탭으로 나누어 볼 수 있어요." — 증거 `qa/screens/mytrip-A-tour-01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F061

### [SCT-258] P0 | 내 여행 · 내 장소 | 첫 방문 튜토리얼 2단계 문구 불일치
- 위치: https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 2/4
- 기대(디자인): 제목 "필터로 찾아보기" / 본문 "찜한 장소가 많아지면 필터로 원하는 장소만 볼 수 있어요." — 근거 `screens/my-trip.html:1078`
- 실제(배포): 제목 "필터" / 본문 "필터로 저장한 여행을 찾아보세요." — 증거 `qa/screens/mytrip-A-tour-02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F062

### [SCT-259] P0 | 내 여행 · 내 장소 | 첫 방문 튜토리얼 3단계 문구 불일치
- 위치: https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 3/4
- 기대(디자인): 제목 "여행 동선 만들기" / 본문 "AI 추천, 원하는 지역, 찜한 장소 중 편한 방식을 골라 취향에 맞는 동선을 만들 수 있어요." — 근거 `screens/my-trip.html:1079`
- 실제(배포): 제목 "동선 만들기" / 본문 "저장한 장소로 새 여행을 계획해 보세요." — 증거 `qa/screens/mytrip-A-tour-03-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F063

### [SCT-260] P0 | 내 여행 · 내 장소 | 첫 방문 튜토리얼 4단계 문구 불일치
- 위치: https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 4/4
- 기대(디자인): 제목 "지도로 한눈에" / 본문 "찜한 장소가 어디에 있는지 지도에서 확인해요." — 근거 `screens/my-trip.html:1080`
- 실제(배포): 제목 "저장한 여행" / 본문 "위치가 있는 장소는 지도에 표시돼요. 저장한 동선은 상세에서 편집하세요." — 증거 `qa/screens/mytrip-A-tour-04-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 단계 제목·본문으로 교체
- 상세: `qa/01-text.md` F064

### [SCT-261] P0 | 내 여행 · 내 장소 | document title 불일치
- 위치: https://scentrip.vercel.app/dashboard — <title>
- 기대(디자인): Scentrip — 내 여행 · 내 장소 — 근거 `screens/my-trip.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/mytrip-places-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F169

### [SCT-262] P0 | 내 여행 · 내 장소 | 찜한 장소 하트 aria-label 불일치
- 위치: https://scentrip.vercel.app/dashboard — 카드 하트 button
- 기대(디자인): {장소명} 저장 해제 (해제 후 {장소명} 다시 저장) — 근거 `screens/my-trip.html:485, 932`
- 실제(배포): 저장한 여행에서 제거 — 증거 `qa/raw/mytrip-places-1440-dev.json`
- 뷰포트: all
- 수정 가이드: aria-label에 장소명 + 상태별 문구
- 상세: `qa/01-text.md` F172

### [SCT-263] P0 | 내 여행 · 내 장소 | '동선 만들기'가 모달 대신 /planner?mode=saved-places로 이동
- 위치: https://scentrip.vercel.app/dashboard — 필터 바 우측 '동선 만들기'
- 기대(디자인): '동선 만들기' 모달 → 모드 선택 — 근거 `screens/my-trip.html:405-408`
- 실제(배포): 모달 없이 /planner?mode=saved-places 이동 — 증거 `qa/screens/ov-route-make-mytrip-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 동선 만들기 모달 열기
- 상세: `qa/04-flow.md` F304

### [SCT-264] P0 | 내 여행 · 내 동선 | document title 불일치
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — <title>
- 기대(디자인): Scentrip — 내 여행 · 내 동선 — 근거 `screens/my-trip-routes.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/mytrip-routes-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F170

### [SCT-265] P0 | 내 여행 · 내 동선 | 저장 동선 카드 메타 구성 불일치 (저장일 추가, 여유도·취향 누락)
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — 동선 카드 하단 메타
- 기대(디자인): {n}개 장소 · {기간} · {여유도} · {유형} 취향 (예: 6개 장소 · 1박2일 · 부지런한 코스 · OOO 취향) — 근거 `screens/my-trip-routes.html:508`
- 실제(배포): {n}개 장소 · 당일치기 · 2026. 9. 16. 저장 — 증거 `qa/screens/mytrip-routes-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 저장일 제거, 여유도·취향 추가
- 상세: `qa/01-text.md` F176

### [SCT-266] P0 | 내 여행 · 내 동선 | 추천 동선(남이 만든 동선) 카드에 하트 대신 더보기(⋯) 메뉴
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — 탐색에서 찜한 "다대포해수욕장 · 몰운대" 카드 우상단
- 기대(디자인): 추천 동선: 하트(aria-label "{동선명} 저장 해제", 해제 후 "다시 저장") / 내가 만든 동선만 ⋯ 메뉴 — 근거 `screens/my-trip-routes.html:485-487`
- 실제(배포): 두 종류 모두 ⋯ 메뉴 (하트 없음) — 증거 `qa/screens/mytrip-routes-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 소유 구분에 따라 하트/⋯ 분기
- 상세: `qa/01-text.md` F178

### [SCT-267] P0 | 내 여행 · 내 동선 | 더보기 메뉴 항목 라벨 불일치
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — 내가 만든 동선 ⋯ 메뉴
- 기대(디자인): 삭제 (휴지통 아이콘, danger) — 근거 `screens/my-trip-routes.html:467`
- 실제(배포): 동선 삭제 — 증거 `qa/raw/mytrip-routes-1440-dev.json`
- 뷰포트: all
- 수정 가이드: 메뉴 라벨 '삭제'
- 상세: `qa/01-text.md` F179

### [SCT-268] P0 | 내 여행 · 내 동선 | 동선 삭제 확인이 브라우저 기본 confirm
- 위치: https://scentrip.vercel.app/dashboard?tab=routes — ⋯ → 동선 삭제
- 기대(디자인): 앱 모달(alertdialog) '이 동선을 삭제할까요?' / "'{동선명}' 동선이 내 여행에서 사라져요. 삭제한 동선은 되돌릴 수 없어요." / [취소] [삭제] — 근거 `screens/my-trip-routes.html:1008-1022`
- 실제(배포): window.confirm('저장한 동선을 삭제할까요?') — 증거 `qa/screens/ov-mytrip-route-delete-1440-design.png`
- 뷰포트: all
- 수정 가이드: 확인 모달 컴포넌트로 교체, 문구 원본대로
- 상세: `qa/01-text.md` F299

### [SCT-269] P0 | 마이페이지 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트
- 위치: https://scentrip.vercel.app/mypage (비로그인)
- 기대(디자인): 헤더·푸터 유지 + '로그인이 필요해요 / 마이페이지는 로그인 후 이용할 수 있어요.<br>향 취향 결과와 내가 남긴 리뷰를 확인해 보세요. / [로그인]' — 근거 `screens/mypage.html:643-645`
- 실제(배포): 307 → /login?next=/mypage — 증거 `qa/screens/mypage-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비회원은 화면 안 게이트로
- 상세: `qa/01-text.md` F181

### [SCT-270] P0 | 마이페이지 | document title 불일치
- 위치: https://scentrip.vercel.app/mypage#account — <title>
- 기대(디자인): Scentrip — 마이페이지 — 근거 `screens/mypage.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/mypage-account-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F183

### [SCT-271] P0 | 마이페이지 | 계정 설정 — 프로필 카드(사진·닉네임·이메일·유형) 미구현
- 위치: https://scentrip.vercel.app/mypage#account — 콘텐츠 상단
- 기대(디자인): 아바타 버튼(aria-label '프로필 사진 변경', 호버 '사진 변경', 변경 후 '기본 이미지로') + 닉네임 + 이메일 + 유형 칩 '{코드} · {별칭}' — 근거 `screens/mypage.html:443-457`
- 실제(배포): 프로필 카드 없음 — 증거 `qa/screens/mypage-account-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 프로필 카드 추가
- 상세: `qa/01-text.md` F185

### [SCT-272] P0 | 마이페이지 | 계정 설정 — '이름' 행과 '수정'(이름 수정 모달) 미구현
- 위치: https://scentrip.vercel.app/mypage#account — 계정 정보 목록
- 기대(디자인): dt '이름' / dd 닉네임 / [수정] → '이름 수정' 모달 — 근거 `screens/mypage.html:462-467, 697`
- 실제(배포): 이름 행·수정 없음 — 증거 `qa/screens/mypage-account-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 이름 행 + 수정 버튼/모달
- 상세: `qa/01-text.md` F186

### [SCT-273] P0 | 마이페이지 | 계정 설정 — 이메일 행 칩 문구 불일치
- 위치: https://scentrip.vercel.app/mypage#account — 이메일 행
- 기대(디자인): 이메일 옆 칩 'Google 로그인' — 근거 `screens/mypage.html:470-473`
- 실제(배포): 이메일 옆 칩 '인증됨' — 증거 `qa/screens/mypage-account-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 칩 문구 'Google 로그인'
- 상세: `qa/01-text.md` F187

### [SCT-274] P0 | 마이페이지 | 계정 설정 — '회원탈퇴' 링크 누락
- 위치: https://scentrip.vercel.app/mypage#account — 계정 정보 아래 우측
- 기대(디자인): 빨간 텍스트 버튼 '회원탈퇴' → 회원탈퇴 화면 — 근거 `screens/mypage.html:479`
- 실제(배포): 없음 (#withdraw 직접 진입만 가능) — 증거 `qa/screens/mypage-account-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 회원탈퇴 링크 추가
- 상세: `qa/01-text.md` F189

### [SCT-275] P0 | 마이페이지 | 내 리뷰 — 지역 필터 칩 누락
- 위치: https://scentrip.vercel.app/mypage#reviews — 리뷰 목록 상단
- 기대(디자인): '지역 ▾' 필터 (결과 0이면 '해당 지역의 리뷰가 없어요 / 다른 지역을 선택해 보세요.') — 근거 `screens/mypage.html:488-491, 503-504`
- 실제(배포): 필터 없음 — 증거 `qa/screens/mypage-reviews-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 지역 필터 추가
- 상세: `qa/01-text.md` F190

### [SCT-276] P0 | 마이페이지 | 내 리뷰 — 빈 상태 문구 불일치 · 버튼 추가
- 위치: https://scentrip.vercel.app/mypage#reviews — 리뷰 0개 빈 상태
- 기대(디자인): '아직 작성한 리뷰가 없어요' / '다녀온 여행지에 리뷰를 남기면 이곳에 모여요.' — 근거 `screens/mypage.html:499-500`
- 실제(배포): '아직 작성한 리뷰가 없어요.'(마침표) / '다녀온 장소에 나만의 취향을 남겨보세요.' / [장소 둘러보기] — 증거 `qa/screens/mypage-reviews-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 원본대로, 버튼 제거
- 상세: `qa/01-text.md` F191

### [SCT-277] P0 | 마이페이지 | 고객센터 — FAQ 1 답변 문구 불일치
- 위치: https://scentrip.vercel.app/mypage#support — 자주 묻는 질문 1 펼침
- 기대(디자인): 향 취향 검사 응답을 바탕으로 16가지 유형 중 하나로 분석됩니다. 결과는 계정 설정의 프로필 카드에서 확인할 수 있습니다. — 근거 `screens/mypage.html:523`
- 실제(배포): 12개 질문 응답을 네 가지 감각 축으로 계산해 16가지 유형 중 하나로 분석합니다. — 증거 `qa/screens/mypage-support-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 답변 원본대로
- 상세: `qa/01-text.md` F192

### [SCT-278] P0 | 마이페이지 | 고객센터 — FAQ 2 답변 문구 불일치
- 위치: https://scentrip.vercel.app/mypage#support — 자주 묻는 질문 2 펼침
- 기대(디자인): 계정 설정 > 이메일의 [수정] 버튼에서 변경할 수 있어요. Google 계정으로 로그인한 경우 연동된 주소가 표시됩니다. — 근거 `screens/mypage.html:533`
- 실제(배포): 현재 Google 소셜 로그인을 사용하므로 이메일은 Google 계정에서 관리합니다. — 증거 `qa/screens/mypage-support-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 답변 원본대로
- 상세: `qa/01-text.md` F193

### [SCT-279] P0 | 마이페이지 | 고객센터 — FAQ 3 질문·답변 불일치
- 위치: https://scentrip.vercel.app/mypage#support — 자주 묻는 질문 3
- 기대(디자인): Q 회원탈퇴하면 Google 계정도 삭제되나요? / A 아니요. 센트립 계정과 서비스 이용 데이터만 삭제되며, Google 계정 자체에는 영향을 주지 않습니다. 탈퇴 후에도 같은 Google 계정으로 언제든 다시 가입할 수 있습니다. — 근거 `screens/mypage.html:537, 543`
- 실제(배포): Q 탈퇴하면 데이터는 어떻게 되나요? / A 탈퇴 시 프로필, 취향 검사, 리뷰와 저장 데이터가 함께 삭제되며 복구할 수 없습니다. — 증거 `qa/screens/mypage-support-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 질문·답변 원본대로
- 상세: `qa/01-text.md` F194

### [SCT-280] P0 | 마이페이지 | 고객센터 — 문의하기가 메일 링크가 아닌 1:1 문의 폼
- 위치: https://scentrip.vercel.app/mypage#support — 문의하기 영역
- 기대(디자인): 안내 '자주 묻는 질문에서 해결되지 않는 내용은 메일로 보내 주세요. 문의하기를 누르면 메일 앱이 열려요 (info.scentrip@gmail.com).' + [문의하기] mailto 링크(제목 [센트립 문의]) — 근거 `screens/mypage.html:549-552`
- 실제(배포): 폼: '문의 유형' select(계정 · 로그인 …) + '문의 내용' textarea(placeholder '문의하실 내용을 입력해 주세요.') + [문의 접수] — 증거 `qa/screens/mypage-support-1440-dev.png`
- 뷰포트: all
- 수정 가이드: mailto 안내 + 문의하기 버튼으로
- 상세: `qa/01-text.md` F195

### [SCT-281] P0 | 마이페이지 | 회원탈퇴 — 안내 문구 불일치
- 위치: https://scentrip.vercel.app/mypage#withdraw — 제목 아래
- 기대(디자인): 탈퇴하면 센트립 계정과 아래 서비스 이용 데이터가 삭제되며 복구할 수 없습니다. 같은 Google 계정으로 다시 가입할 수 있지만, 삭제된 정보는 되돌아오지 않습니다. — 근거 `screens/mypage.html:606`
- 실제(배포): '계정 삭제 전 아래 내용을 꼭 확인해 주세요.' + 경고 박스 '탈퇴하면 계정을 다시 살릴 수 없으며 서비스 데이터가 함께 삭제됩니다.' — 증거 `qa/screens/mypage-withdraw-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 안내 문구 원본대로, 경고 박스 제거
- 상세: `qa/01-text.md` F196

### [SCT-282] P0 | 마이페이지 | 회원탈퇴 — '삭제되는 정보' 목록 형식 불일치
- 위치: https://scentrip.vercel.app/mypage#withdraw — 삭제되는 정보 박스
- 기대(디자인): 불릿 4줄: 회원 프로필과 닉네임 / 이메일 및 Google 연동 정보 / 향 취향 검사 응답과 결과 / 저장한 여행지와 추천 기록 — 근거 `screens/mypage.html:610-615`
- 실제(배포): 한 문장: 프로필, 향 취향 검사 결과와 문항 응답, 장소 리뷰, 저장한 여행과 설정 정보가 삭제됩니다. — 증거 `qa/screens/mypage-withdraw-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 불릿 4항목으로
- 상세: `qa/01-text.md` F197

### [SCT-283] P0 | 마이페이지 | 회원탈퇴 — 탈퇴 사유(선택) 라디오 미구현
- 위치: https://scentrip.vercel.app/mypage#withdraw — 삭제되는 정보 아래
- 기대(디자인): '탈퇴 사유 (선택)' 라디오 4개: 더 이상 사용하지 않아서 / 추천 결과가 마음에 들지 않아서 / 개인정보가 걱정돼서 / 기타 — 근거 `screens/mypage.html:620-625`
- 실제(배포): 없음 — 증거 `qa/screens/mypage-withdraw-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 사유 라디오 추가
- 상세: `qa/01-text.md` F198

### [SCT-284] P0 | 마이페이지 | 회원탈퇴 — 실행 버튼 라벨 불일치
- 위치: https://scentrip.vercel.app/mypage#withdraw — 하단 빨간 버튼
- 기대(디자인): 탈퇴하기 — 근거 `screens/mypage.html:630`
- 실제(배포): 회원탈퇴 — 증거 `qa/screens/mypage-withdraw-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '탈퇴하기'
- 상세: `qa/01-text.md` F200

### [SCT-285] P0 | 마이페이지 | 회원탈퇴 화면에 좌측 메뉴 노출
- 위치: https://scentrip.vercel.app/mypage#withdraw — 좌측 사이드 메뉴
- 기대(디자인): 회원탈퇴는 서브페이지 — 사이드 메뉴 없이 단독 화면 — 근거 `screens/mypage.html:602-605`
- 실제(배포): 사이드 메뉴(계정 설정 선택 상태) 노출 — 증거 `qa/screens/mypage-withdraw-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 서브페이지에서 사이드 메뉴 숨김
- 상세: `qa/01-text.md` F201

### [SCT-286] P0 | 마이페이지 | 리뷰 수정 화면에 좌측 메뉴 노출
- 위치: https://scentrip.vercel.app/mypage#review-edit
- 기대(디자인): 서브페이지 — 사이드 메뉴 없음 — 근거 `screens/mypage.html:734 (SOLO_VIEWS)`
- 실제(배포): 사이드 메뉴 노출 — 증거 `qa/screens/review-edit-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 사이드 메뉴 숨김
- 상세: `qa/01-text.md` F333

### [SCT-287] P0 | 마이페이지 | 내 리뷰 카드 구성 불일치
- 위치: https://scentrip.vercel.app/mypage#reviews — 리뷰 카드
- 기대(디자인): 장소명 / '{지역} · {특징} · YY.MM.DD 방문' / 별점 / 본문 / 사진 / 작성일 YYYY.MM.DD / ⋯ '{장소명} 리뷰 관리' 메뉴(리뷰 수정·리뷰 삭제) — 근거 `screens/mypage.html:983-1023`
- 실제(배포): 썸네일 + 장소명 / 별점 / 본문 / '방문 2026년 9월 10일 · 작성 2026년 9월 16일' / 연필·휴지통 아이콘 버튼(aria-label 리뷰 수정·리뷰 삭제) — 증거 `qa/screens/mypage-reviews-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 카드 구성·날짜 형식·메뉴를 원본대로
- 상세: `qa/01-text.md` F339

### [SCT-288] P0 | 마이페이지 | 리뷰 삭제 확인 모달 설명 문구 불일치
- 위치: https://scentrip.vercel.app/mypage#reviews — 리뷰 삭제 클릭
- 기대(디자인): 삭제한 리뷰는 복구할 수 없습니다. 정말 삭제하시겠어요? — 근거 `screens/mypage.html:682`
- 실제(배포): 삭제한 리뷰는 복구할 수 없습니다. — 증거 `qa/screens/review-delete-confirm-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '정말 삭제하시겠어요?' 추가
- 상세: `qa/01-text.md` F340

### [SCT-289] P0 | 마이페이지 | 메뉴 이동이 브라우저 기록에 남지 않아 뒤로가기로 이전 탭에 못 돌아감
- 위치: https://scentrip.vercel.app/mypage#account → 내 리뷰 → 고객센터 → 브라우저 뒤로
- 기대(디자인): 뷰마다 history.pushState → 뒤로가기 시 이전 뷰(#reviews)로 — 근거 `screens/mypage.html:1241`
- 실제(배포): 해시만 바뀌고 기록이 쌓이지 않아 뒤로가기 한 번에 마이페이지를 벗어남(이전 페이지로 이동) — 증거 `qa/raw/flows-dev.json`
- 뷰포트: all
- 수정 가이드: 뷰 전환 시 pushState, popstate로 뷰 복원
- 상세: `qa/04-flow.md` F416

### [SCT-290] P0 | 마이페이지 | 회원탈퇴 완료 후 로그아웃·홈 이동이 안 되고 사이트 전체가 무한 리다이렉트
- 위치: https://scentrip.vercel.app/mypage#withdraw → '탈퇴' 입력 → [회원탈퇴] → 확인 모달 [계정 삭제] (계정 B design.sadie@gmail.com 실제 탈퇴)
- 기대(디자인): 탈퇴 처리 후 비회원 상태로 홈(home.html) 이동 — 이후 모든 화면 정상 이용 — 근거 `screens/mypage.html:1218-1221`
- 실제(배포): 삭제 직후 ERR_TOO_MANY_REDIRECTS 오류 화면. 남은 세션 쿠키(sb-…-auth-token) 때문에 / → /signup, /login → /signup, /signup → /login 이 반복 (예: /mypage → /signup?next=%2Fmypage → /login?next=%2Fmypage → …). 브라우저 쿠키를 직접 지우기 전까지 홈 포함 전 화면 접근 불가. (계정 데이터는 삭제됨 — 리뷰 사라짐 확인, 쿠키 삭제 후 같은 Google 계정 로그인 시 가입 화면으로 정상 이동) — 증거 `qa/screens/withdraw-B-04-after-delete-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 계정 삭제 성공 시 서버·클라이언트 세션 쿠키를 지우고(signOut) 홈으로 이동, 미들웨어에서 "인증은 있으나 회원 없음" 상태가 login↔signup 을 서로 보내지 않게
- 상세: `qa/04-flow.md` F424

### [SCT-291] P0 | 센트립 소개 | document title 불일치
- 위치: https://scentrip.vercel.app/about — <title>
- 기대(디자인): Scentrip — 센트립 소개 — 근거 `screens/about.html:6`
- 실제(배포): Scentrip — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 지정
- 상세: `qa/01-text.md` F202

### [SCT-292] P0 | 센트립 소개 | WHY SCENTRIP 설명 문단 누락
- 위치: https://scentrip.vercel.app/about — "향 취향을 여행의 기준으로 바꾸는 맞춤 여행 추천 서비스" 아래
- 기대(디자인): 사람마다 같은 장소에서도 기억하는 감각은 다릅니다. 누군가는 숲의 젖은 흙을, 누군가는 햇살에 마른 나무를 오래 기억하죠. 센트립은 이 차이를 16가지 향 타입으로 분류해 ‘나다운 여행’을 찾도록 돕습니다. — 근거 `screens/about.html:254`
- 실제(배포): 없음 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 문단 추가
- 상세: `qa/01-text.md` F203

### [SCT-293] P0 | 센트립 소개 | 단계 카드 02 설명 불일치
- 위치: https://scentrip.vercel.app/about — 02 나의 향 타입 확인 카드 설명
- 기대(디자인): 네 가지 감각의 조합으로 나만의 향 타입과 여행 성향을 발견합니다. — 근거 `screens/about.html:297`
- 실제(배포): 네 가지 감각 축이 만나 열여섯 가지 향 타입 중 하나를 만들어요. — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 교체
- 상세: `qa/01-text.md` F204

### [SCT-294] P0 | 센트립 소개 | 단계 카드 03 설명 불일치
- 위치: https://scentrip.vercel.app/about — 03 여행지 추천 카드 설명
- 기대(디자인): 내 향의 분위기와 닮은 장소, 계절, 동선을 취향 일치도와 함께 만나보세요. — 근거 `screens/about.html:320`
- 실제(배포): 내 향 타입과 잘 맞는 장소와 동선을 매칭률과 함께 만나요. — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 문구 교체
- 상세: `qa/01-text.md` F205

### [SCT-295] P0 | 센트립 소개 | WHAT YOU GET — TYPE 항목 제목·설명 불일치
- 위치: https://scentrip.vercel.app/about — 초록 패널 TYPE
- 기대(디자인): 나의 향 취향 유형 / 16가지 중 나를 가장 잘 나타내는 향 타입과 한 줄 정의 — 근거 `screens/about.html:331`
- 실제(배포): 나만의 향 타입 / 네 가지 감각으로 발견하는 여행자 유형 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목·설명 교체
- 상세: `qa/01-text.md` F206

### [SCT-296] P0 | 센트립 소개 | WHAT YOU GET — SCENT 항목 설명 불일치
- 위치: https://scentrip.vercel.app/about — 초록 패널 SCENT
- 기대(디자인): 좋아할 가능성이 높은 향 무드와 쉽게 떠올릴 수 있는 향 표현 — 근거 `screens/about.html:332`
- 실제(배포): 좋아하는 풍경을 떠올리는 향의 언어 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 교체
- 상세: `qa/01-text.md` F207

### [SCT-297] P0 | 센트립 소개 | WHAT YOU GET — PLACE 항목 제목·설명 불일치
- 위치: https://scentrip.vercel.app/about — 초록 패널 PLACE
- 기대(디자인): 취향 맞춤 여행지 / 내 향의 분위기와 닮은 국내 장소와 취향 일치도 — 근거 `screens/about.html:333`
- 실제(배포): 취향에 맞는 여행지 / 향 취향을 바탕으로 연결되는 장소와 동선 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 제목·설명 교체
- 상세: `qa/01-text.md` F209

### [SCT-298] P0 | 센트립 소개 | WHAT YOU GET — ROUTE 항목 누락
- 위치: https://scentrip.vercel.app/about — 초록 패널 4번째 항목
- 기대(디자인): ROUTE / 여행 코스와 머무는 방식 / 장소를 즐기기 좋은 계절, 공간, 테마별 추천 동선 — 근거 `screens/about.html:334`
- 실제(배포): 없음 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: ROUTE 항목 추가
- 상세: `qa/01-text.md` F210

### [SCT-299] P0 | 센트립 소개 | 4 SCENT AXES 섹션 eyebrow·제목 줄바꿈·설명 불일치
- 위치: https://scentrip.vercel.app/about — 네 가지 감각 섹션 헤더
- 기대(디자인): eyebrow '4 SCENT AXES' / 제목 '네 가지 감각이 만나<br>하나의 향 타입이 됩니다.' (2줄) / 설명 '향의 온도와 무게, 수분감, 자연스러움에 대한 취향을 조합해 총 16가지 센트립 유형을 완성합니다.' — 근거 `screens/about.html:343-346`
- 실제(배포): eyebrow 'FOUR SCENT AXES' / 제목 한 줄 / 설명 없음 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: eyebrow·줄바꿈·설명 원본대로
- 상세: `qa/01-text.md` F211

### [SCT-300] P0 | 센트립 소개 | 16 SCENT TYPES 섹션 eyebrow·제목 줄바꿈 불일치
- 위치: https://scentrip.vercel.app/about — 열여섯 가지 향 섹션 헤더
- 기대(디자인): eyebrow '16 SCENT TYPES' / 제목 '열여섯 가지 향,<br>열여섯 가지 여행 방식' (2줄, 좌측 정렬) — 근거 `screens/about.html:355-357`
- 실제(배포): eyebrow 'SIXTEEN TYPES' / 제목 한 줄 가운데 정렬 — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: eyebrow·줄바꿈 원본대로
- 상세: `qa/01-text.md` F212

### [SCT-301] P0 | 센트립 소개 | 유형 카드 마지막 줄 형식 불일치 (16개)
- 위치: https://scentrip.vercel.app/about — 16유형 카드 하단 줄
- 기대(디자인): '{향} 향을 닮은 여행 취향' (예: 나무 향을 닮은 여행 취향) — 근거 `screens/about.html:461-476`
- 실제(배포): '{향} 향 {이모지}' (예: 나무 향 🌳) — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: '~향을 닮은 여행 취향' 문장으로, 이모지 제거
- 상세: `qa/01-text.md` F213

### [SCT-302] P0 | 센트립 소개 | SCENT TO PLACE 섹션 구성 불일치 (사진·설명·추천 장소 카드)
- 위치: https://scentrip.vercel.app/about — 좋아하는 향은 머물고 싶은 장면을 말해줍니다
- 기대(디자인): 좌 아치형 사진(alt '빛이 스며드는 숲길과 젖은 흙 산책로') + 설명 '비 내린 숲의 향을 좋아한다면, 나무와 흙의 감각을 충분히 느낄 수 있는 고요한 산책 여행을 추천해요.' + 장소 카드(AI 매칭 88% / 담양 메타세쿼이아길 / 초록 공기가 깊어지는 느린 산책 / 젖은 나무·이끼·서늘한 공기) — 근거 `screens/about.html:363-388`
- 실제(배포): 사진·장소 카드 없음, 설명 '시원한 풀 향이 좋다면 바람이 부는 초록 길로, … 이어보세요.' + 박스 3개(초록과 물기 / 나무와 온기 / 바다와 바람) — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 구성으로 교체
- 상세: `qa/01-text.md` F214

### [SCT-303] P0 | 센트립 소개 | 하단 CTA eyebrow·제목·설명·버튼 불일치
- 위치: https://scentrip.vercel.app/about — 초록 CTA 패널
- 기대(디자인): eyebrow 'YOUR SCENT, YOUR JOURNEY' / 제목 '아직 만나지 못한 여행이<br>당신이 좋아하는 향 속에 있을지도 몰라요.' / 설명 '약 3분이면 나의 향 타입과 꼭 맞는 여행지를 발견할 수 있어요.' / 버튼 '향 취향 테스트 시작하기 →' — 근거 `screens/about.html:396-399`
- 실제(배포): eyebrow·설명 없음 / 제목 '아직 만나지 못한 여행이 좋아하는 향 속에 있을지도 몰라요.' (한 줄, '당신이' 없음) / 버튼 '취향 테스트 시작 →' — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 문구·줄바꿈으로
- 상세: `qa/01-text.md` F215

### [SCT-304] P0 | 이용약관 | document title 불일치
- 위치: https://scentrip.vercel.app/terms — <title>
- 기대(디자인): Scentrip — 이용약관 — 근거 `screens/terms.html:6`
- 실제(배포): 이용약관 | 센트립 — 증거 `qa/screens/terms-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 'Scentrip — 이용약관'
- 상세: `qa/01-text.md` F217

### [SCT-305] P0 | 이용약관 | 문서 제목 불일치
- 위치: https://scentrip.vercel.app/terms — h1
- 기대(디자인): 센트립 이용약관 — 근거 `screens/terms.html:156`
- 실제(배포): 이용약관 — 증거 `qa/screens/terms-1440-dev.png`
- 뷰포트: all
- 수정 가이드: h1 '센트립 이용약관'
- 상세: `qa/01-text.md` F218

### [SCT-306] P0 | 이용약관 | 약관 본문 조항 구성·문구 전체 불일치 (15조+부칙 → 12조)
- 위치: https://scentrip.vercel.app/terms — 본문 전체
- 기대(디자인): 제1조(목적) ~ 제15조(문의처) + 부칙(2026년 9월 21일 시행), 조 제목 형식 "제N조(제목)" — 조항별 대조표 qa/01-text.md "이용약관 조항 대조" 참고 — 근거 `screens/terms.html:160-344`
- 실제(배포): 제1조 목적 ~ 제12조 문의 (조 제목 괄호 없음, 제5조 검사 결과 안내·제7조 회원가입 제한·제9조 서비스 변경 및 중단·제11조 광고 및 외부 서비스·부칙 없음, 모든 조 문구 상이) — 증거 `qa/screens/terms-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 terms.html 본문으로 전체 교체
- 상세: `qa/01-text.md` F220

### [SCT-307] P0 | 개인정보처리방침 | document title 불일치
- 위치: https://scentrip.vercel.app/privacy — <title>
- 기대(디자인): Scentrip — 개인정보처리방침 — 근거 `screens/privacy.html:6`
- 실제(배포): 개인정보처리방침 | 센트립 — 증거 `qa/screens/privacy-1440-dev.png`
- 뷰포트: all
- 수정 가이드: title 'Scentrip — 개인정보처리방침'
- 상세: `qa/01-text.md` F221

### [SCT-308] P0 | 개인정보처리방침 | 문서 제목 불일치
- 위치: https://scentrip.vercel.app/privacy — h1
- 기대(디자인): 센트립 개인정보처리방침 — 근거 `screens/privacy.html:184`
- 실제(배포): 개인정보처리방침 — 증거 `qa/screens/privacy-1440-dev.png`
- 뷰포트: all
- 수정 가이드: h1 '센트립 개인정보처리방침'
- 상세: `qa/01-text.md` F222

### [SCT-309] P0 | 개인정보처리방침 | 방침 본문 조항 구성·문구 전체 불일치 (16조 → 12조, 표 3개 → 2개)
- 위치: https://scentrip.vercel.app/privacy — 본문 전체
- 기대(디자인): 제1조 처리 목적 ~ 제16조 방침의 변경, 표 3개(pp-table ×2, is-wide ×1), 문서 끝 공고일·시행일 — 조항별 대조표 qa/01-text.md "개인정보처리방침 조항 대조" 참고 — 근거 `screens/privacy.html:188-570`
- 실제(배포): 제1조 ~ 제12조 (수집 방법·국외 이전·행태정보·자동화된 결정 조항 없음, 조 제목·문구 상이), 표 2개, 시행일은 상단 — 증거 `qa/screens/privacy-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 privacy.html 본문으로 전체 교체
- 상세: `qa/01-text.md` F223

## 티켓 — P1

### [SCT-310] P1 | 공통(토큰) | 전역 자간 -3% 미적용 (letter-spacing: normal)
- 위치: 배포 전 화면 body 기본 텍스트·버튼·입력 (텍스트 요소 약 4,090개 중 normal)
- 기대(디자인): letter-spacing -0.03em (16px → -0.48px, 14px → -0.42px) — 근거 `reference/tokens.css:252 (--letter-spacing)`
- 실제(배포): letter-spacing normal (0) — 증거 `qa/raw/home-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: body/html 에 letter-spacing: -0.03em 적용 (상속되게)
- 상세: `qa/02-style.md` F342

### [SCT-311] P1 | 공통(토큰) | 아이콘 세트 불일치 (Phosphor → Lucide)
- 위치: 배포 전 화면 아이콘 svg.lucide-* (heart, sparkles, globe, user-round, chevron-right, arrow-right, map-pin, clock-3, trash-2 등)
- 기대(디자인): 원본 Phosphor 아이콘 (viewBox 0 0 256 256, fill currentColor) — 예: 하트·반짝임·지구본·사용자·화살표 — 근거 `screens/*.html 인라인 svg, reference/lang.js:24, reference/login-modal.js:27-39`
- 실제(배포): Lucide 아이콘 (viewBox 0 0 24 24, stroke 2 / 1.8) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 SVG 경로(Phosphor)로 교체
- 상세: `qa/02-style.md` F343

### [SCT-312] P1 | 공통(토큰) | 토큰에 없는 글자색 사용
- 위치: 배포 전 화면 (예: 탐색 정렬 기본 #737b78, 선택 #344b40, 결과 개수 #4d5551, 조건 질문 #2c4034, 탭 기본 #b0b6b3, 보조 텍스트 #63756b · #859087 · #868e96, 로고 #315f54)
- 기대(디자인): 시맨틱 토큰만: content-default #21332c · content-neutral #212529 · neutral-muted #495057 · subtle #4f7a66 · primary #3a5e4e · neutral-subtle #adb5bd · disabled #ced4da — 근거 `reference/tokens.css (--color-content-*)`
- 실제(배포): #315f54, #344b40, #2c4034, #4d5551, #63756b, #737b78, #859087, #868e96, #87948a, #b0b6b3, #352d27 등 하드코딩 — 증거 `qa/raw/explore-places-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: 색을 var(--color-*) 토큰으로 교체
- 상세: `qa/02-style.md` F344

### [SCT-313] P1 | 공통(토큰) | 토큰에 없는 그림자 사용 (검정 그림자 포함)
- 위치: 배포 전 화면 카드·버튼·드롭다운 box-shadow
- 기대(디자인): 엘리베이션 5종만 (그린 틴트 #1b231d): xs 0 1px 2px /0.05 · sm 0 1px 2px /0.04, 0 2px 6px /0.06 · md · lg · xl — 근거 `reference/tokens.css:242-246`
- 실제(배포): 0 1px 3px #21332c/0.12 (236곳), 0 2px 8px #000000/0.27 (115곳), 0 12px 40px #21332c/0.09, 0 8px 24px #21332c/0.09, 0 2px 5px #183323/0.04, 0 1px 5px #182c18/0.06 등 — 증거 `qa/raw/home-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: box-shadow를 var(--elevation-*)로
- 상세: `qa/02-style.md` F345

### [SCT-314] P1 | 공통(헤더) | 언어 변경 UI가 원본과 다른 컴포넌트
- 위치: 전 화면 헤더 우측 / 로그인·가입 상단 — select[aria-label='Language / 언어 / 语言 / 言語']
- 기대(디자인): 지구본 아이콘 + 'KO' 텍스트 버튼(aria-label '언어 변경 (현재 한국어)') → 클릭 시 메뉴 5개(한국어 / English 영어 / 日本語 일본어 / 简体中文 중국어 간체 / 繁體中文 중국어 번체) + 선택 시 토스트 — 근거 `reference/lang.js:15-44`
- 실제(배포): 지구본 아이콘 + 네이티브 select(표시 '한국어'), aria-label 'Language / 언어 / 语言 / 言語' — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: lang.js 구조대로 버튼(현재 언어 약어) + 드롭다운 메뉴로 교체
- 상세: `qa/01-text.md` F010

### [SCT-315] P1 | 공통(헤더) | 로고 "Scentrip" 글자 그라디언트 누락
- 위치: 전 화면 헤더 로고 텍스트 — 배포 셀렉터 … header.sticky.top-0.z-50 > div.travel-topbar > a.inline-flex.items-center.gap-1\.5 > span
- 기대(디자인): background-image linear-gradient(#31493a 0%, #418a8b 100%); color #000000/0.00; line-height 25px — 근거 `screens/home.html:306 (.brand-name)`
- 실제(배포): background-image none; color #315f54; line-height 30px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 워드마크에 linear-gradient(#31493a → #418a8b) + background-clip:text, line-height 25px
- 상세: `qa/02-style.md` F348

### [SCT-316] P1 | 공통(헤더) | 프로필 필 닉네임 색 불일치
- 위치: 헤더 우측 프로필 필 — 배포 셀렉터 …v.relative.flex.items-center > button.account-pill > span.account-pill-name:nth-of-type(1)
- 기대(디자인): color #2f4d40 — 근거 `reference/components.css:274 (.pill-name)`
- 실제(배포): color #3a5e4e — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 닉네임 색 #2f4d40 (scent-green-700)
- 상세: `qa/02-style.md` F349

### [SCT-317] P1 | 공통(헤더) | 비회원 로그인 버튼 글자 크기·아이콘 불일치
- 위치: 비로그인 헤더 우측 로그인 버튼 — 배포 셀렉터 …r > div.flex.items-center.gap-2 > div.flex.items-center > a.account-login.inline-flex.h-10
- 기대(디자인): font-size 14px; 텍스트만, 너비 74.9px — 근거 `screens/home.html:44 (.btn-login .guest-only)`
- 실제(배포): font-size 13px; 오른쪽 log-in 아이콘 추가, 너비 94.3px — 증거 `qa/screens/home-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: font-size 14px, 아이콘 없음(원본은 텍스트만)
- 상세: `qa/02-style.md` F350

### [SCT-318] P1 | 공통(카드) | 매칭 배지 글자 크기·굵기·색·테두리 불일치
- 위치: 홈·탐색 장소 카드 좌상단 배지 — 배포 셀렉터 …f-type(2) > article.travel-card:nth-of-type(1) > div.travel-card-photo > span.travel-badge
- 기대(디자인): font-size 16px; font-weight 400; color (텍스트 없음); background-color #ffffff; border-top 1px solid #c3d7cb; padding-top 4px; border-radius pill; 높이 31px — 근거 `screens/home.html:51 (.badge)`
- 실제(배포): font-size 14px; font-weight 600; color #3a5e4e; background-color #ffffff/0.93; border-top 1px solid #d6e0db; padding-top 5px; border-radius 99px; 텍스트 14px/600 #3a5e4e, 배경 #ffffff/0.93, 높이 33px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 배지: 텍스트 #4f7a66, 흰 배경, 1px solid #c3d7cb, pill, padding 4px 10px
- 상세: `qa/02-style.md` F354

### [SCT-319] P1 | 공통(카드) | 장소 카드 메타 글자 크기·굵기 불일치
- 위치: 장소 카드 하단 지역·특징 줄 — 배포 셀렉터 …f-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > div.travel-card-meta
- 기대(디자인): font-size 16px; font-weight 500; line-height 24px — 근거 `screens/home.html:182 (.card-meta)`
- 실제(배포): font-size 14px; font-weight 400; line-height 21px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: font-size 16px / weight 500 / line-height 24px
- 상세: `qa/02-style.md` F356

### [SCT-320] P1 | 로그인 | 로그인 타이틀 크기 불일치 (24 → 28px)
- 위치: 로그인 h1 — 배포 셀렉터 …-h-dvh.flex-col > section.mx-auto.flex.w-full > h1.text-center.text-\[28px\].font-semibold
- 기대(디자인): font-size 24px; line-height 33.6px — 근거 `screens/login.html:106 (#loginTitle)`
- 실제(배포): font-size 28px; line-height 39.2px — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 24px / 33.6px (2줄)
- 상세: `qa/02-style.md` F380

### [SCT-321] P1 | 회원가입 | 닉네임 입력 글자·테두리·라운드 불일치
- 위치: 회원가입 닉네임 input — 배포 셀렉터 …fieldset.mt-6.space-y-4 > label.block.pt-4.text-sm:nth-of-type(3) > input.mt-2.h-12.w-full
- 기대(디자인): font-size 16px; font-weight 400; border-top 1px solid #dee2e6; border-radius 8px — 근거 `screens/signup.html:217 (#nick)`
- 실제(배포): font-size 14px; font-weight 600; border-top 1px solid #c3d7cb; border-radius 12px; 480×48 — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 16px / 400, 1px solid #dee2e6, radius 8px, 440×52
- 상세: `qa/02-style.md` F383

### [SCT-322] P1 | 취향 테스트 | 테스트 표지 제목 크기 불일치 (48 → 56px)
- 위치: /taste 표지 h1 — 배포 셀렉터 …ent-intro.relative.flex > section.relative.z-10.flex > h1.mt-7.text-\[38px\].font-semibold
- 기대(디자인): font-size 48px; line-height 62.4px; letter-spacing -2.16px — 근거 `screens/onboarding-test.html:131 (.intro-title)`
- 실제(배포): font-size 56px; line-height 67.2px; letter-spacing -1.68px — 증거 `qa/screens/taste-intro-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 48px / 62.4px / -2.16px
- 상세: `qa/02-style.md` F384

### [SCT-323] P1 | 취향 테스트 | 테스트 시작 버튼 글자 크기·색·위 여백 불일치
- 위치: /taste 표지 시작 버튼 — 배포 셀렉터 …ent-intro.relative.flex > section.relative.z-10.flex > button.mt-10.inline-flex.h-\[54px\]
- 기대(디자인): font-size 16px; color #121c18; margin-top 16px — 근거 `screens/onboarding-test.html:1251 (#introStart)`
- 실제(배포): font-size 14px; color #183126; margin-top 40px — 증거 `qa/screens/taste-intro-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 16px, #121c18, margin-top 16px
- 상세: `qa/02-style.md` F385

### [SCT-324] P1 | 취향 테스트 | 문항 제목 색·자간 불일치
- 위치: /taste 문항 제목 — 배포 셀렉터 …tive.flex.flex-1 > div.text-center:nth-of-type(1) > h1.mt-3.whitespace-pre-line.font-serif
- 기대(디자인): color #21332c; letter-spacing -1.26px — 근거 `screens/onboarding-test.html:1261 (#qTitle)`
- 실제(배포): color #352d27; letter-spacing normal — 증거 `qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: #21332c, letter-spacing -1.26px
- 상세: `qa/02-style.md` F386

### [SCT-325] P1 | 취향 테스트 | 선택지 카드 라운드·그림자·높이·테두리색 불일치
- 위치: /taste 문항 선택지 카드 — 배포 셀렉터 ….max-w-\[1120px\]:nth-of-type(2) > button.min-h-\[150px\].rounded-lg.border:nth-of-type(1)
- 기대(디자인): border-radius 24px; box-shadow #1b231d/0.04 0px 1px 2px 0px, #1b231d/0.06 0px 2px 6px 0px; border-top 1px solid #e0ebe4; padding-left 32px — 근거 `screens/onboarding-test.html:279 (.choice)`
- 실제(배포): border-radius 8px; box-shadow none; border-top 1px solid #ddd5cd; padding-left 48px; 높이 150px — 증거 `qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png`
- 뷰포트: all
- 수정 가이드: radius 24px, elevation-sm, 1px solid #e0ebe4, padding 0 32px, 높이 180px
- 상세: `qa/02-style.md` F387

### [SCT-326] P1 | 홈 | AI 동선 배너 버튼 아이콘 위치·모양 불일치
- 위치: https://scentrip.vercel.app/ — '나만의 동선 만들기' 버튼
- 기대(디자인): 왼쪽 반짝임(✦ sparkle) 아이콘 + 라벨 — 근거 `screens/home.html:432-434`
- 실제(배포): 라벨 + 오른쪽 화살표(→) 아이콘 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 아이콘을 좌측 sparkle로 교체
- 상세: `qa/02-style.md` F031

### [SCT-327] P1 | 홈 | 섹션 '전체 보기' 링크에 chevron 추가
- 위치: https://scentrip.vercel.app/ — 장소 추천·동선·로컬 섹션 우측 '전체 보기 >'
- 기대(디자인): 텍스트만 '전체 보기' — 근거 `screens/home.html:412`
- 실제(배포): '전체 보기' + 오른쪽 chevron 아이콘 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: chevron 제거
- 상세: `qa/02-style.md` F032

### [SCT-328] P1 | 홈 | 홈 섹션 제목 크기 불일치 (24 → 28px)
- 위치: 홈 "…취향의 여행 장소 추천" 등 섹션 제목 h2 — 배포 셀렉터 …ustify-between:nth-of-type(1) > div > h2.text-\[18px\].font-semibold.tracking-\[-0\.01em\]
- 기대(디자인): font-size 24px; line-height 30px; letter-spacing -0.48px — 근거 `screens/home.html:164 (.section-title)`
- 실제(배포): font-size 28px; line-height 35px; letter-spacing -0.84px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: font-size 24px / line-height 30px / letter-spacing -0.48px
- 상세: `qa/02-style.md` F351

### [SCT-329] P1 | 홈 | AI 동선 배너 박스 스타일 누락 (배경 그라디언트·테두리·라운드·패딩)
- 위치: 홈 "센트립 AI로 나만의 여행 동선을 제작해보세요" 배너 — 배포 셀렉터 …face > div.home-content > section.home-banner:nth-of-type(4) > div.grid.items-center.gap-5
- 기대(디자인): background-image linear-gradient(100deg, #f2f7f4, color(srgb 0.933137 0.956863 0.941765)); padding-top 32px; padding-left 48px; border-top 1px solid #e0ebe4; border-radius 24px; 박스 1320×124.2 — 근거 `screens/home.html:212 (.ai-banner)`
- 실제(배포): background-image none; padding-top 0px; padding-left 0px; border-top none; border-radius 0px; (배경은 바깥 section에 있고 안쪽 박스 1222×63.2) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 배너 박스: linear-gradient(100deg, #f2f7f4 → …), 1px solid #e0ebe4, radius 24px, padding 32px 48px
- 상세: `qa/02-style.md` F353

### [SCT-330] P1 | 소식 목록 | 1024에서 소식 카드 열 수 불일치 (2열 → 3열)
- 위치: /news 카드 목록
- 기대(디자인): 1440 3열 → 1024 2열 → 640 2열 — 근거 `screens/news.html (.grid 미디어쿼리)`
- 실제(배포): 1024에서 하단 카드 3열 유지 (+ 대표 글 히어로) — 증거 `qa/screens/news-member-1024-dev.png`
- 뷰포트: 1024
- 수정 가이드: 1024에서 2열
- 상세: `qa/03-width.md` F395

### [SCT-331] P1 | 탐색 · 장소 | 탐색 탭 글자 크기 불일치 (28 → 32px)
- 위치: 탐색 상단 "여행 장소 · 여행 동선" 탭 — 배포 셀렉터 …tion.explore-module__8HEYta__content > nav.explore-module__8HEYta__tabs > a:nth-of-type(1)
- 기대(디자인): font-size 28px; line-height 35px; letter-spacing -0.48px — 근거 `screens/place-recommend.html:57 (.tab .is-active)`
- 실제(배포): font-size 32px; line-height 40px; letter-spacing -1.28px — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: font-size 28px / line-height 35px / letter-spacing -0.48px
- 상세: `qa/02-style.md` F359

### [SCT-332] P1 | 탐색 · 장소 | 탐색 비선택 탭 색 불일치
- 위치: 탐색 상단 비선택 탭 — 배포 셀렉터 …tion.explore-module__8HEYta__content > nav.explore-module__8HEYta__tabs > a:nth-of-type(2)
- 기대(디자인): color #ced4da — 근거 `screens/place-recommend.html:57 (.tab)`
- 실제(배포): color #b0b6b3 — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비선택 탭 #ced4da
- 상세: `qa/02-style.md` F360

### [SCT-333] P1 | 탐색 · 장소 | 정렬 세그먼트 선택 항목 색·그림자 불일치
- 위치: 탐색 정렬 세그먼트 선택 항목 — 배포 셀렉터 …_8HEYta__toolbar > div.explore-module__8HEYta__sortGroup:nth-of-type(1) > a:nth-of-type(1)
- 기대(디자인): color #21332c; box-shadow none; border-radius pill — 근거 `screens/place-recommend.html:46 (.seg .is-active)`
- 실제(배포): color #344b40; box-shadow #182c18/0.06 0px 1px 5px 0px; border-radius 24px — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 선택 텍스트 #21332c, 그림자 원본 세그먼트 규격(elevation-xs), pill
- 상세: `qa/02-style.md` F361

### [SCT-334] P1 | 탐색 · 장소 | 정렬 세그먼트 비선택 항목 색 불일치
- 위치: 탐색 정렬 세그먼트 비선택 항목 — 배포 셀렉터 …_8HEYta__toolbar > div.explore-module__8HEYta__sortGroup:nth-of-type(1) > a:nth-of-type(2)
- 기대(디자인): color #adb5bd — 근거 `screens/place-recommend.html:46 (.seg)`
- 실제(배포): color #737b78 — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비선택 텍스트 #adb5bd
- 상세: `qa/02-style.md` F362

### [SCT-335] P1 | 탐색 · 장소 | 결과 개수 글자 크기·굵기·색 불일치
- 위치: 탐색 필터 바 우측 "총 N개 장소" — 배포 셀렉터 …xplore-module__8HEYta__toolbar > div.explore-module__8HEYta__toolbarEnd:nth-of-type(2) > p
- 기대(디자인): font-size 14px; font-weight 600; color #495057 — 근거 `screens/place-recommend.html:259 (#count)`
- 실제(배포): font-size 13px; font-weight 400; color #4d5551 — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 14px / 600 / #495057
- 상세: `qa/02-style.md` F365

### [SCT-336] P1 | 탐색 · 동선 | 1024에서 동선 카드 그리드 열 수 불일치 (2열 → 3열)
- 위치: /explore?tab=routes 동선 카드 그리드
- 기대(디자인): 1440·1280 3열 → 1024 2열 → 640 2열 — 근거 `screens/route.html (.grid 미디어쿼리)`
- 실제(배포): 1024에서도 3열 유지 — 증거 `qa/screens/explore-routes-member-1024-dev.png`
- 뷰포트: 1024
- 수정 가이드: 1024 구간에서 2열로 접히게
- 상세: `qa/03-width.md` F394

### [SCT-337] P1 | 장소 상세 | 향 태그 칩 굵기·테두리색·높이 불일치
- 위치: 장소 상세 제목 아래 향 태그 — 배포 셀렉터 …tail > div.pd-body:nth-of-type(2) > div.pd-badges:nth-of-type(2) > a.pd-tag:nth-of-type(1)
- 기대(디자인): font-weight 600; background-color #ffffff; border-top 1px solid #c3d7cb; border-radius pill — 근거 `screens/place-detail.html:68 (.scent-chip)`
- 실제(배포): font-weight 400; background-color #000000/0.00; border-top 1px solid #e0ebe4; border-radius 99px; 높이 43px, 링크(검색)로 동작 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: weight 600, 흰 배경, 1px solid #c3d7cb, pill, 높이 40px
- 상세: `qa/02-style.md` F366

### [SCT-338] P1 | 장소 상세 | 리뷰 작성 버튼 형태 불일치 (텍스트 링크 → 채운 버튼)
- 위치: 장소 상세 리뷰 헤더 우측 — 배포 셀렉터 …pe(4) > div.flex.flex-wrap.items-end:nth-of-type(1) > button.inline-flex.h-10.items-center
- 기대(디자인): font-size 14px; color #2f4d40; background-color #000000/0.00; padding-left 0px; border-radius 0px — 근거 `screens/place-detail.html:101 (.pd-rv-write)`
- 실제(배포): font-size 12px; color #ffffff; background-color #3a5e4e; padding-left 20px; border-radius pill; 높이 40px, 아이콘 포함 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 텍스트 링크: 14px, #2f4d40, 배경 없음, 높이 16px
- 상세: `qa/02-style.md` F369

### [SCT-339] P1 | 장소 상세 | 전체 리뷰 보기 버튼 폭·굵기·테두리색 불일치
- 위치: 장소 상세 리뷰 목록 하단 — 배포 셀렉터 …th-of-type(2) > section.place-reviews.mt-12.border-t:nth-of-type(4) > a.mt-4.flex.min-h-11
- 기대(디자인): font-weight 600; color #2f4d40; border-top 1px solid #6f9884; padding-left 24px — 근거 `screens/place-detail.html:140 (.btn-outline)`
- 실제(배포): font-weight 400; color #212529; border-top 1px solid #c3d7cb; padding-left 0px; 전체 폭 960×44 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 가운데 정렬 자동 폭 버튼(125.4×46), weight 600, #2f4d40, 1px solid #6f9884, padding 0 24px
- 상세: `qa/02-style.md` F370

### [SCT-340] P1 | 동선 상세 | 동선 상세 매칭 배지 크기·테두리 불일치
- 위치: 동선 상세 제목 옆 매칭 % — 배포 셀렉터 …e-result-module__reWCXW__titleRow:nth-of-type(1) > span.route-result-module__reWCXW__match
- 기대(디자인): font-size 14px; font-weight 600; background-color #ffffff; border-top 1px solid #c3d7cb; border-radius pill; padding-left 10px — 근거 `screens/route-detail.html:74 (.match-badge)`
- 실제(배포): font-size 13px; font-weight 400; background-color #000000/0.00; border-top 1px solid #e1e6e3; border-radius 20px; padding-left 8px; 높이 24px — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 14px / 600, 흰 배경, 1px solid #c3d7cb, pill, 높이 31px
- 상세: `qa/02-style.md` F371

### [SCT-341] P1 | 동선 상세 | 타임라인 장소 카드 박스 스타일 추가 (테두리·그림자·흰 배경)
- 위치: 동선 상세·결과 타임라인 장소 행 — 배포 셀렉터 …_track:nth-of-type(4) > div:nth-of-type(1) > article.route-result-module__reWCXW__stopCard
- 기대(디자인): background-color #000000/0.00; border-top none; border-radius 0px; box-shadow none; padding-top 8px — 근거 `screens/route-detail.html:115 (.tl-cardwrap)`
- 실제(배포): background-color #ffffff; border-top 1px solid #ecefec; border-radius 12px; box-shadow #183323/0.04 0px 2px 5px 0px; padding-top 18px — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 원본 카드: 배경 없음, 테두리·그림자 없음, padding 8px 0 (타임라인 행 형태)
- 상세: `qa/02-style.md` F374

### [SCT-342] P1 | 동선 만들기 · 조건 | 조건 질문 제목 굵기·색 불일치
- 위치: 동선 만들기 질문 제목 — 배포 셀렉터 …module__jKgwMW__wizard > div.planner-wizard-module__jKgwMW__wizardBody:nth-of-type(1) > h1
- 기대(디자인): font-weight 600; color #21332c — 근거 `screens/route-conditions.html:349 (.rc-q h2)`
- 실제(배포): font-weight 700; color #2c4034 — 증거 `qa/screens/planner-ai-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: weight 600, #21332c
- 상세: `qa/02-style.md` F376

### [SCT-343] P1 | 동선 만들기 · 조건 | 다음 버튼 비활성 글자색 불일치
- 위치: 동선 만들기 하단 다음 버튼 (선택 전) — 배포 셀렉터 …wizard-module__jKgwMW__actions:nth-of-type(2) > button.planner-wizard-module__jKgwMW__next
- 기대(디자인): color #ffffff; background-color #dee2e6; border-radius pill — 근거 `screens/route-conditions.html:205 (#next)`
- 실제(배포): color #87948a; background-color #dce2de; border-radius 28px — 증거 `qa/screens/planner-ai-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 비활성: 흰 글자 #ffffff, 배경 #dee2e6, pill
- 상세: `qa/02-style.md` F377

### [SCT-344] P1 | 동선 만들기 · 장소 선택 | 1024에서 장소 선택 화면 좌우 분할 유지 (원본은 지도 위 · 목록 아래)
- 위치: /planner?mode=saved-places 목록 · 지도
- 기대(디자인): 1440 좌 목록 · 우 지도 → 1024부터 지도 위, 목록 아래 한 단 — 근거 `screens/route-create.html (미디어쿼리)`
- 실제(배포): 1024에서 좌우 분할 유지, 640에서만 지도 위 — 증거 `qa/screens/route-create-1024-dev.png`
- 뷰포트: 1024
- 수정 가이드: 1024 구간에서 한 단으로
- 상세: `qa/03-width.md` F402

### [SCT-345] P1 | 동선 만들기 · 장소 선택 | 장소 선택 화면 푸터 누락 (센트립 소개·약관·개인정보처리방침·이메일 진입 불가)
- 위치: https://scentrip.vercel.app/planner?mode=saved-places
- 기대(디자인): 공통 푸터 (센트립 소개 / info.scentrip@gmail.com / 이용약관 / 개인정보처리방침) — 근거 `screens/route-create.html (footer)`
- 실제(배포): 푸터 없음 — 증거 `qa/screens/route-create-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 공통 푸터 추가
- 상세: `qa/04-flow.md` F423

### [SCT-346] P1 | 내 여행 · 내 장소 | 내 여행 서브 탭 글자 크기 불일치 (18 → 16px)
- 위치: 내 여행 "내 장소 · 내 동선" 탭 — 배포 셀렉터 …n.bg-background.text-on-surface > section > div.my-trip > nav.trip-tabs > a:nth-of-type(1)
- 기대(디자인): font-size 18px; line-height 27px; padding-top 16px; border-bottom none — 근거 `screens/my-trip.html:182 (.subtab .is-active)`
- 실제(배포): font-size 16px; line-height 24px; padding-top 0px; border-bottom 2px solid #212529 — 증거 `qa/screens/mytrip-places-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 18px / 27px, padding 16px 0 12px
- 상세: `qa/02-style.md` F378

### [SCT-347] P1 | 마이페이지 | 마이페이지 사이드 메뉴 선택 항목 색·배경 불일치
- 위치: /mypage 좌측 메뉴 선택 항목 — 배포 셀렉터 …den > nav.space-y-3 > div > div.space-y-1 > button.flex.w-full.items-center:nth-of-type(1)
- 기대(디자인): color #212529; background-color #000000/0.00 — 근거 `screens/mypage.html:102 (.side-link)`
- 실제(배포): color #3a5e4e; background-color lab(92.0624 -4.74024 2.07188 / 0.55) — 증거 `qa/screens/mypage-account-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 선택 항목 텍스트 #212529, 배경 없음 (원본 선택 표시 규격)
- 상세: `qa/02-style.md` F391

### [SCT-348] P1 | 마이페이지 | 1024에서 마이페이지 메뉴가 가로 탭으로 바뀌지 않음
- 위치: /mypage 좌측 메뉴
- 기대(디자인): 1440 세로 사이드 메뉴 → 1024·640 상단 가로 탭(계정 설정 · 내 리뷰 · 고객센터) — 근거 `screens/mypage.html (nav#side 미디어쿼리)`
- 실제(배포): 1024 세로 사이드 메뉴 유지, 640에서만 가로 탭 — 증거 `qa/screens/mypage-account-1024-dev.png`
- 뷰포트: 1024
- 수정 가이드: 1024 구간부터 상단 가로 탭
- 상세: `qa/03-width.md` F399

### [SCT-349] P1 | 센트립 소개 | 소개 히어로 제목 색·자간 불일치
- 위치: /about 히어로 h1 — 배포 셀렉터 …te:nth-of-type(1) > div.relative.mx-auto.max-w-\[900px\] > h1.mt-6.text-\[30px\].font-bold
- 기대(디자인): color #121c18; letter-spacing -0.48px — 근거 `screens/about.html:222 (h1)`
- 실제(배포): color #21332c; letter-spacing -1.54px — 증거 `qa/screens/about-guest-1440-dev.png`
- 뷰포트: all
- 수정 가이드: #121c18, letter-spacing -0.48px
- 상세: `qa/02-style.md` F388

### [SCT-350] P1 | 센트립 소개 | 1024에서 소개 단계 카드 열 수 불일치 (1열 → 3열)
- 위치: /about WHY SCENTRIP 단계 카드 01·02·03
- 기대(디자인): 1440·1280 3열 → 1024부터 1열 — 근거 `screens/about.html (미디어쿼리)`
- 실제(배포): 1024에서도 3열, 640에서 1열 — 증거 `qa/screens/about-guest-1024-dev.png`
- 뷰포트: 1024
- 수정 가이드: 1024 구간에서 1열로
- 상세: `qa/03-width.md` F397

### [SCT-351] P1 | 이용약관 | 약관 문서 제목 크기 불일치 (28 → 32px)
- 위치: /terms h1 (개인정보처리방침 동일 구조) — 배포 셀렉터 …10.border-b.border-surface-container-high > h1.text-\[32px\].font-semibold.tracking-normal
- 기대(디자인): font-size 28px; line-height 35px — 근거 `screens/terms.html:56 (.terms-title)`
- 실제(배포): font-size 32px; line-height 48px — 증거 `qa/screens/terms-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 28px / 35px
- 상세: `qa/02-style.md` F389

### [SCT-352] P1 | 이용약관 | 약관 조 제목 크기·굵기·색 불일치
- 위치: /terms 조 제목 h2 (개인정보처리방침 동일) — 배포 셀렉터 …rder-b.border-surface-container-high.py-8:nth-of-type(1) > h2.mb-4.text-\[21px\].font-bold
- 기대(디자인): font-size 20px; font-weight 600; color #212529; line-height 25px — 근거 `screens/terms.html:59 (.terms-art h2)`
- 실제(배포): font-size 21px; font-weight 700; color #21332c; line-height 31.5px — 증거 `qa/screens/terms-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 20px / 600 / #212529 / 25px
- 상세: `qa/02-style.md` F390

## 티켓 — P2

### [SCT-353] P2 | 공통(토큰) | 토큰에 없는 라운드 값 사용
- 위치: 배포 전 화면 (예: 칩 26px, 버튼 24px·28px·30px, 배지 99px·20px, 카드 10px)
- 기대(디자인): radius xs 2 · sm 4 · md 8 · lg 12 · xl 16 · 2xl 24 · 3xl 32 · full(pill) — 근거 `reference/tokens.css:294-302`
- 실제(배포): 10px, 20px, 26px, 28px, 30px, 99px 등 — 증거 `qa/raw/explore-places-member-1440-dev.json`
- 뷰포트: all
- 수정 가이드: border-radius를 var(--radius-*)로
- 상세: `qa/02-style.md` F346

### [SCT-354] P2 | 공통(헤더) | 헤더 하단 테두리·반투명 배경 추가
- 위치: 전 화면 상단 헤더 — 배포 셀렉터 …h-full.antialiased > main.min-h-screen.bg-white.text-on-surface > header.sticky.top-0.z-50
- 기대(디자인): background-color #ffffff; border-bottom none; padding-left 28px; padding-right 28px; height 56px — 근거 `screens/home.html:239 (.nav)`
- 실제(배포): background-color oklab(0.999994 0.0000455678 0.0000200868 / 0.95); border-bottom 1px solid #f2f7f4; padding-left 0px; padding-right 0px; height 57px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 헤더 배경 흰색 불투명, 하단 테두리 제거, 좌우 패딩 28px
- 상세: `qa/02-style.md` F347

### [SCT-355] P2 | 공통(헤더) | 640에서 헤더 내비가 두 번째 줄로 내려감
- 위치: 전 화면 헤더 (배포 nav.travel-mobile-nav)
- 기대(디자인): 640에서도 로고 · 소식 · 탐색 · 내 여행 · 우측 버튼이 한 줄(높이 56px) 유지 — 근거 `reference/components.css (.nav) · 캡처 home-member-640-design`
- 실제(배포): 로고·우측만 첫 줄, 소식·탐색·내 여행은 둘째 줄(y 56~69)로 분리되어 헤더 높이 증가 — 증거 `qa/screens/home-member-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 640까지 데스크톱 내비 한 줄 유지 (모바일 내비 전환 제거)
- 상세: `qa/03-width.md` F393

### [SCT-356] P2 | 공통(카드) | 장소 카드 사진 영역 안쪽 여백(배지·하트 위치) 불일치
- 위치: 장소 카드 사진 영역 — 배포 셀렉터 …iv.home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > div.travel-card-photo
- 기대(디자인): padding-top 12px; padding-left 12px; background-color #000000/0.00 — 근거 `screens/home.html:172 (.card-photo)`
- 실제(배포): padding-top 0px; padding-left 0px; background-color #f2f7f4 — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 사진 영역 padding 12px (배지·하트가 12px 안쪽)
- 상세: `qa/02-style.md` F355

### [SCT-357] P2 | 공통(카드) | 장소 카드 설명 줄 수 불일치 (1줄 → 2줄)
- 위치: 장소 카드 설명 — 배포 셀렉터 …v.home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > p
- 기대(디자인): 높이 24px (1줄) — 근거 `screens/home.html:181 (.card-desc)`
- 실제(배포): 높이 48px (2줄) — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 설명 1줄 말줄임
- 상세: `qa/02-style.md` F357

### [SCT-358] P2 | 공통(카드) | 동선 카드 메타 굵기·간격 불일치
- 위치: 동선 카드 하단 메타 — 배포 셀렉터 …_8HEYta__routeCard > a.explore-module__8HEYta__cardCopy > div.explore-module__8HEYta__meta
- 기대(디자인): font-weight 500; gap 4px; margin-top 0px — 근거 `screens/home.html:208 (.route-meta)`
- 실제(배포): font-weight 400; gap 7px; margin-top 8px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: weight 500, gap 4px, 설명과 간격 0
- 상세: `qa/02-style.md` F358

### [SCT-359] P2 | 로그인 | Google 버튼 테두리색·그림자 불일치
- 위치: 로그인 Google로 계속하기 버튼 — 배포 셀렉터 …n.mx-auto.flex.w-full > div.mt-6.space-y-4 > div.space-y-3 > button.flex.h-\[52px\].w-full
- 기대(디자인): border-top 1px solid #dee2e6; box-shadow #1b231d/0.05 0px 1px 2px 0px — 근거 `screens/login.html:120 (#googleBtn)`
- 실제(배포): border-top 1px solid #c3d7cb; box-shadow none — 증거 `qa/screens/login-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 1px solid #dee2e6, elevation-xs
- 상세: `qa/02-style.md` F381

### [SCT-360] P2 | 회원가입 | 가입 완료하기 버튼 크기 불일치
- 위치: 회원가입 하단 버튼 — 배포 셀렉터 …g-white.px-5 > section.mx-auto.max-w-\[480px\].py-10 > form.mt-7 > button.mt-6.h-12.w-full
- 기대(디자인): 440×52 — 근거 `screens/signup.html:226 (#submitBtn)`
- 실제(배포): 480×48 — 증거 `qa/screens/signup-A-11-all-agreed-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 440×52
- 상세: `qa/02-style.md` F382

### [SCT-361] P2 | 홈 | 소식 썸네일 테두리·라운드·배경 누락
- 위치: 홈 여행 소식 목록 썸네일 — 배포 셀렉터 … > a.home-news-item:nth-of-type(1) > div.home-news-photo:nth-of-type(1) > img.object-cover
- 기대(디자인): background-color #f2f7f4; border-top 1px solid #e0ebe4; border-radius 12px — 근거 `screens/home.html:143 (.news-thumb)`
- 실제(배포): background-color #000000/0.00; border-top none; border-radius 0px — 증거 `qa/screens/home-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 썸네일 배경 #f2f7f4, 1px solid #e0ebe4, radius 12px
- 상세: `qa/02-style.md` F352

### [SCT-362] P2 | 소식 목록 | 640에서 소식 카드가 1열로 접힘 (원본 2열)
- 위치: /news 카드 목록
- 기대(디자인): 640에서 2열 — 근거 `screens/news.html (.grid 미디어쿼리)`
- 실제(배포): 640에서 1열 + 히어로 세로 적층 — 증거 `qa/screens/news-member-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 640에서 2열 유지
- 상세: `qa/03-width.md` F396

### [SCT-363] P2 | 탐색 · 장소 | 정렬 세그먼트 배경·라운드 불일치
- 위치: 탐색 정렬 세그먼트 — 배포 셀렉터 …div.explore-module__8HEYta__toolbar > div.explore-module__8HEYta__sortGroup:nth-of-type(1)
- 기대(디자인): background-color #f1f3f5; border-radius pill; gap 4px — 근거 `screens/place-recommend.html:251 (#sortSeg)`
- 실제(배포): background-color #f3f4f5; border-radius 30px; gap normal — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 배경 #f1f3f5, pill, gap 4px
- 상세: `qa/02-style.md` F363

### [SCT-364] P2 | 탐색 · 장소 | 필터 칩 배경·라운드 불일치
- 위치: 탐색 필터 칩(지역·특징·취향) — 배포 셀렉터 …-module__8HEYta__toolbar > details.explore-module__8HEYta__filter:nth-of-type(2) > summary
- 기대(디자인): background-color #ffffff; border-radius pill — 근거 `reference/components.css:121 (.chip-btn)`
- 실제(배포): background-color #000000/0.00; border-radius 26px — 증거 `qa/screens/explore-places-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 배경 #ffffff, pill
- 상세: `qa/02-style.md` F364

### [SCT-365] P2 | 탐색 · 장소 | 640에서 결과 개수 위치 불일치
- 위치: /explore 필터 바
- 기대(디자인): 640: 정렬 세그먼트 줄 오른쪽에 '총 N개 장소' (y 228), 필터 칩은 다음 줄 — 근거 `screens/place-recommend.html (.filterbar 미디어쿼리)`
- 실제(배포): 필터 칩 아래 별도 줄에 검색 아이콘 + 개수 (y 320) — 증거 `qa/screens/explore-places-member-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 개수를 정렬 줄 오른쪽으로
- 상세: `qa/03-width.md` F403

### [SCT-366] P2 | 장소 상세 | 저장(하트) 버튼 테두리색 불일치
- 위치: 장소 상세 제목 우측 하트 버튼 — 배포 셀렉터 …title-row:nth-of-type(1) > div.pd-actions > button.inline-flex.items-center.justify-center
- 기대(디자인): border-top 1px solid #dee2e6 — 근거 `screens/place-detail.html:228 (#saveBtn)`
- 실제(배포): border-top 1px solid #e0ebe4 — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 1px solid #dee2e6
- 상세: `qa/02-style.md` F367

### [SCT-367] P2 | 장소 상세 | 지도 로딩 배경색 불일치
- 위치: 장소 상세 지도 캔버스 — 배포 셀렉터 …v.places-map.pd-map:nth-of-type(2) > div.places-map-canvas.leaflet-container.leaflet-touch
- 기대(디자인): background-color #f8f9fa — 근거 `screens/place-detail.html:267 (#pdMap)`
- 실제(배포): background-color #dddddd — 증거 `qa/screens/place-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: #f8f9fa
- 상세: `qa/02-style.md` F368

### [SCT-368] P2 | 장소 리뷰 | 640에서 별점 요약이 세로로 쌓이지 않음
- 위치: /explore/[id]/reviews 별점 요약
- 기대(디자인): 640: 평균 점수 위 · 5~1점 막대 아래 (세로) — 근거 `screens/place-reviews.html (.prv-sum 미디어쿼리)`
- 실제(배포): 평균(좌) · 막대(우) 가로 배치 유지 — 증거 `qa/screens/place-reviews-member-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 640에서 세로 배치
- 상세: `qa/03-width.md` F404

### [SCT-369] P2 | 동선 상세 | 동선 제목 줄높이 불일치
- 위치: 동선 상세 제목 — 배포 셀렉터 …div.route-result-module__reWCXW__titleRow:nth-of-type(1) > h1.min-w-0.break-words.text-2xl
- 기대(디자인): line-height 31.2px — 근거 `screens/route-detail.html:424 (#rdTitle)`
- 실제(배포): line-height 33px — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: line-height 31.2px
- 상세: `qa/02-style.md` F372

### [SCT-370] P2 | 동선 상세 | 여행 컨셉 박스 글자 크기·여백 불일치
- 위치: 동선 상세 여행 컨셉 박스 — 배포 셀렉터 …-result-module__reWCXW__timeline > div.route-result-module__reWCXW__concept:nth-of-type(2)
- 기대(디자인): font-size 14px; padding-top 12px; margin-top 0px — 근거 `screens/route-detail.html:80 (.rr-concept)`
- 실제(배포): font-size 13px; padding-top 14px; margin-top 20px — 증거 `qa/screens/route-detail-member-1440-dev.png`
- 뷰포트: all
- 수정 가이드: 14px, padding 12px, 위 여백 0
- 상세: `qa/02-style.md` F373

### [SCT-371] P2 | 동선 상세 | 640에서 지도가 타임라인 아래로 감 (원본은 위)
- 위치: /planner/[id] 지도 · 타임라인
- 기대(디자인): 640: 지도(높이 320px)가 타임라인 위 — 근거 `screens/route-detail.html (미디어쿼리)`
- 실제(배포): 타임라인 다음 맨 아래에 지도(높이 420px) — 증거 `qa/screens/route-detail-member-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 640에서 지도를 위로, 높이 320px
- 상세: `qa/03-width.md` F400

### [SCT-372] P2 | 동선 만들기 · 조건 | 조건 카드 그림자·테두리색 불일치
- 위치: 동선 만들기 조건 카드 — 배포 셀렉터 …ion.planner-shell.mx-auto.max-w-\[1380px\] > section.planner-wizard-module__jKgwMW__wizard
- 기대(디자인): box-shadow #1b231d/0.04 0px 1px 2px 0px, #1b231d/0.06 0px 2px 6px 0px; border-top 1px solid #e0ebe4; padding-left 0px — 근거 `screens/route-conditions.html:53 (.rc-card)`
- 실제(배포): box-shadow #173526/0.02 0px 2px 8px 0px; border-top 1px solid #e0e5e1; padding-left 32px — 증거 `qa/screens/planner-ai-s02-1440-dev.png`
- 뷰포트: all
- 수정 가이드: elevation-sm, 1px solid #e0ebe4
- 상세: `qa/02-style.md` F375

### [SCT-373] P2 | 동선 만들기 · 결과 | 640에서 결과 지도가 타임라인 아래로 감 (원본은 위)
- 위치: /planner 결과 지도 · 타임라인
- 기대(디자인): 640: 지도(높이 320px)가 위 — 근거 `screens/route-result.html (미디어쿼리)`
- 실제(배포): 지도(높이 420px)가 타임라인 아래 — 증거 `qa/screens/route-result-ai-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 640에서 지도를 위로
- 상세: `qa/03-width.md` F401

### [SCT-374] P2 | 내 여행 · 내 장소 | 동선 만들기 버튼 배경 그라디언트 누락
- 위치: 내 여행 필터 바 우측 버튼 — 배포 셀렉터 …split > section.trip-main > div.trip-toolbar:nth-of-type(1) > a.travel-primary.trip-create
- 기대(디자인): background-image linear-gradient(#2f4d40 0%, #3a5e4e 100%); background-color #000000/0.00; padding-left 16px; gap 6px — 근거 `screens/my-trip.html:207 (.btn-make)`
- 실제(배포): background-image none; background-color #3a5e4e; padding-left 18px; gap 8px; 높이 41px — 증거 `qa/screens/mytrip-places-1440-dev.png`
- 뷰포트: all
- 수정 가이드: linear-gradient(#2f4d40 → #3a5e4e), padding 0 16px, gap 6px, 높이 40px
- 상세: `qa/02-style.md` F379

### [SCT-375] P2 | 내 여행 · 내 동선 | 640에서 '동선 만들기' 버튼 위치 불일치
- 위치: /dashboard?tab=routes 필터 바
- 기대(디자인): 640: 필터 칩 아래 별도 줄 왼쪽 (x 32, y 314) — 근거 `screens/my-trip-routes.html (.mt-bar 미디어쿼리)`
- 실제(배포): 필터 칩과 같은 줄 오른쪽 끝 (x 499, y 282) — 증거 `qa/screens/mytrip-routes-640-dev.png`
- 뷰포트: 640
- 수정 가이드: 640에서 버튼을 다음 줄로
- 상세: `qa/03-width.md` F405

### [SCT-376] P2 | 센트립 소개 | 창을 줄여도 소개 히어로 제목 크기가 줄지 않음
- 위치: /about 히어로 h1
- 기대(디자인): 1440 44px → 1024 40.96px → 640 30px — 근거 `screens/about.html (h1 유동 크기)`
- 실제(배포): 1440·1024·640 모두 44px — 증거 `qa/screens/about-guest-640-dev.png`
- 뷰포트: 1024 / 640
- 수정 가이드: 원본처럼 너비에 따라 축소
- 상세: `qa/03-width.md` F398

## 미구현 / 기획 미반영 항목

| 티켓 | 페이지 | 항목 |
|---|---|---|
| SCT-002 | 공통(헤더) | 헤더 로그인 버튼이 현재 페이지 복귀 주소(next)를 넘기지 않음 |
| SCT-004 | 공통(카드) | 여행 장소 추천 카드 메타 — 취향 항목 누락, '매칭 근거' 추가 |
| SCT-014 | 공통(로그인 모달) | 로그인 모달 제목 줄바꿈 불일치 |
| SCT-016 | 공통(로그인 모달) | 로그인 모달 '로그인하면 할 수 있어요' 혜택 3줄 누락 |
| SCT-019 | 공통(리뷰 카드) | 리뷰 카드 작성자 줄 — 아바타·취향 유형·방문일 누락 |
| SCT-021 | 공통(리뷰 카드) | 내 리뷰 카드 — ⋯ 메뉴(리뷰 수정·리뷰 삭제) 대신 휴지통 버튼 |
| SCT-022 | 공통(리뷰 작성·수정) | 리뷰 작성 폼 — 장소 위치 줄·별점 제목 누락 |
| SCT-025 | 공통(리뷰 작성·수정) | 리뷰 작성 폼 — 글자 수 카운터 누락 (작성 모달) |
| SCT-044 | 회원가입 | Google 계정 칩 구성 불일치 (아바타·이름 누락, 인증 표기) |
| SCT-045 | 회원가입 | '약관 동의' 그룹 제목 누락 |
| SCT-047 | 회원가입 | 약관 전문이 모달이 아닌 새 탭으로 열림 |
| SCT-048 | 회원가입 | 닉네임 입력 placeholder 누락 |
| SCT-059 | 회원가입 | 가입 완료 화면 미구현 (검사 결과 없는 경우) |
| SCT-060 | 회원가입 | 가입 완료 화면 미구현 (가입 전 검사 결과 있는 경우) |
| SCT-098 | 취향 테스트 | 선택지 카드 번호 표시(1 / 2) 누락 |
| SCT-116 | 취향 테스트 | 회원 결과 CTA 이동 경로 불일치 (탐색 → 내 여행) |
| SCT-117 | 취향 테스트 | 비회원 결과 가입 CTA 복귀 경로 불일치 |
| SCT-118 | 취향 테스트 | 재검사(결과 있는 회원) CTA 상태 미구현 |
| SCT-122 | 홈 | 소식 항목 메타 정보 불일치 (날짜 누락, 장소 수 추가) |
| SCT-136 | 홈 | '나만의 동선 만들기'가 모달 대신 /planner로 이동 |
| SCT-139 | 소식 목록 | 정렬 토글(취향 매칭순 / 최신순) 미구현 |
| SCT-140 | 소식 목록 | 지역 필터 칩 미구현 |
| SCT-141 | 소식 목록 | 글 개수 표시 '총 N편' 누락 |
| SCT-143 | 소식 목록 | 소식 카드 AI 매칭 배지 누락 (회원) |
| SCT-145 | 소식 목록 | 소식 카드 하단 메타(날짜 · 읽는 시간 · 장소 수) 누락 |
| SCT-149 | 소식 목록 | 첫 방문 튜토리얼 4단계 누락 |
| SCT-151 | 소식 상세 | 제목 위 kicker 구성 불일치 (지역·날짜·읽는 시간 누락) |
| SCT-154 | 소식 상세 | 장소 카드 kicker(지역 · 특징) 누락 |
| SCT-155 | 소식 상세 | 장소 카드 AI 매칭 % 누락 |
| SCT-160 | 소식 상세 | 사실 확인 안내 박스 누락 |
| SCT-163 | 소식 상세 | '글 속 장소로 동선 만들기'가 조건 입력 대신 막힘 화면으로 이동 |
| SCT-173 | 탐색 · 장소 | 비회원 로그인 유도 배너 누락 |
| SCT-182 | 탐색 · 동선 | 비회원 로그인 유도 배너 누락 |
| SCT-187 | 장소 상세 | 리뷰 섹션 제목에 리뷰 수 누락 · 별점 요약 줄 추가 |
| SCT-191 | 장소 상세 | 리뷰 0개 빈 상태 '첫 리뷰 작성하기' 버튼 누락 |
| SCT-194 | 장소 상세 | 리뷰 작성이 별도 화면이 아닌 상세 안 모달 |
| SCT-195 | 장소 상세 | '카카오맵에서 보기'가 OpenStreetMap 링크로 대체 |
| SCT-202 | 장소 리뷰 | 필터 줄 결과 개수 '{n}개' 누락 |
| SCT-204 | 장소 리뷰 | 내 리뷰 카드 '내 리뷰' 칩 누락 |
| SCT-206 | 동선 상세 | breadcrumb 마지막 단계(현재 동선 이름) 누락 |
| SCT-207 | 동선 상세 | 제목 옆 '찜' 버튼 미구현 |
| SCT-211 | 동선 상세 | 이동 구간 표기 불일치 (수단·시간 / 길찾기) |
| SCT-213 | 동선 상세 | 홈에서 들어온 동선 상세의 breadcrumb가 진입 경로를 반영하지 않음 |
| SCT-214 | 동선 상세 | 내 여행에서 들어온 내 동선 상세의 breadcrumb·하단 버튼 불일치 |
| SCT-215 | 동선 상세 | '이 동선으로 여행 만들기'가 결과 화면 대신 장소 선택 화면으로 이동 |
| SCT-216 | 동선 상세 | 구간 '길찾기'(카카오맵 길찾기 새 탭)가 페이지 내 지도 앵커로 대체 |
| SCT-218 | 동선 만들기 · 조건 | mode 파라미터 무시 — 항상 AI 추천이 선택된 채 시작 |
| SCT-220 | 동선 만들기 · 조건 | 카드 헤더 — 플로우 이름 누락 |
| SCT-223 | 동선 만들기 · 조건 | 이동 수단 선택지 표기 불일치 |
| SCT-233 | 동선 만들기 · 조건 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트 |
| SCT-234 | 동선 만들기 · 조건 | 찜한 장소 플로우 — '선택한 장소' 칩 바 누락 |
| SCT-237 | 동선 만들기 · 장소 선택 | 상단 breadcrumb 대신 '← 이전 단계로' 버튼 |
| SCT-239 | 동선 만들기 · 장소 선택 | 지도 안내 캡션 누락 |
| SCT-244 | 동선 만들기 · 결과 | 조건에서 고른 출발지가 결과에 반영되지 않음 |
| SCT-245 | 동선 만들기 · 결과 | 장소 드래그로 순서 변경 미구현 |
| SCT-246 | 동선 만들기 · 결과 | 이동 구간 표기 불일치 |
| SCT-249 | 동선 만들기 · 결과 | '내 여행에 저장' 후 토스트 누락 |
| SCT-250 | 동선 만들기 · 결과 | 저장 후 하단 바 '보러 가기' 링크 누락 |
| SCT-252 | 동선 만들기 · 결과 | 여행 조건 모달 항목 구성 불일치 |
| SCT-253 | 동선 만들기 · 결과 | '출발지 설정'이 출발 설정 모달 대신 여행 조건 모달을 엶 |
| SCT-255 | 동선 만들기 · 결과 | 장소 삭제 시 확인 모달 없이 즉시 삭제 |
| SCT-256 | 내 여행 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트 |
| SCT-263 | 내 여행 · 내 장소 | '동선 만들기'가 모달 대신 /planner?mode=saved-places로 이동 |
| SCT-265 | 내 여행 · 내 동선 | 저장 동선 카드 메타 구성 불일치 (저장일 추가, 여유도·취향 누락) |
| SCT-266 | 내 여행 · 내 동선 | 추천 동선(남이 만든 동선) 카드에 하트 대신 더보기(⋯) 메뉴 |
| SCT-269 | 마이페이지 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트 |
| SCT-271 | 마이페이지 | 계정 설정 — 프로필 카드(사진·닉네임·이메일·유형) 미구현 |
| SCT-272 | 마이페이지 | 계정 설정 — '이름' 행과 '수정'(이름 수정 모달) 미구현 |
| SCT-274 | 마이페이지 | 계정 설정 — '회원탈퇴' 링크 누락 |
| SCT-275 | 마이페이지 | 내 리뷰 — 지역 필터 칩 누락 |
| SCT-283 | 마이페이지 | 회원탈퇴 — 탈퇴 사유(선택) 라디오 미구현 |
| SCT-289 | 마이페이지 | 메뉴 이동이 브라우저 기록에 남지 않아 뒤로가기로 이전 탭에 못 돌아감 |
| SCT-290 | 마이페이지 | 회원탈퇴 완료 후 로그아웃·홈 이동이 안 되고 사이트 전체가 무한 리다이렉트 |
| SCT-292 | 센트립 소개 | WHY SCENTRIP 설명 문단 누락 |
| SCT-298 | 센트립 소개 | WHAT YOU GET — ROUTE 항목 누락 |

## 원본에 없는데 배포본에 있는 항목

> 개발 티켓이 아니라, 원본에 반영할지 배포본에서 뺄지 결정이 필요한 목록

| # | 페이지 | 항목 | 위치 | 배포본 내용 | 증거 |
|---|---|---|---|---|---|
| F030 | 공통(푸터) | 푸터 '데이터 출처' 펼침 | 전 화면 푸터 하단 좌측 details '데이터 출처' (펼치면 '관광지 태그 데이터', '© OpenStreetMap contributors · ODbL 1.0') | 이메일 아래 '▸ 데이터 출처' 노출 | `qa/screens/home-member-1440-dev.png` |
| F084 | 공통(탐색 필터 바) | 키워드 검색 버튼(돋보기) | /explore · /explore?tab=routes — 필터 바 우측, 개수 왼쪽 돋보기 버튼 (input placeholder "장소, 향, 키워드 검색") | 돋보기 버튼 → 키워드 검색 입력 | `qa/screens/explore-places-member-1440-dev.png` |
| F302 | 공통(탐색 필터 바) | 특징·취향 필터 팝오버 하단 '초기화' 버튼 | /explore 특징 · 취향 타입 필터 팝오버 | 목록 하단 초기화 버튼 | `qa/screens/ov-filter-feature-1440-dev.png` |
| F338 | 공통(리뷰 카드) | 내 리뷰가 있으면 헤더 버튼이 '내 리뷰 수정'으로 바뀜 | https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 헤더 우측 버튼 | 내 리뷰 수정 | `qa/screens/place-detail-member-1440-dev.png` |
| F219 | 공통(약관) | 약관 상단 'Scentrip 홈으로' 링크 · 요약 문장 · '시행일' 줄 | /terms · /privacy — h1 위·아래 | 'Scentrip 홈으로' + 요약 문장(예: 본 약관은 센트립이 제공하는 …) + '시행일: 2026년 9월 21일' | `qa/screens/terms-1440-dev.png` |
| F008 | 로그인 | Google 버튼 아래 안내·약관 링크 | https://scentrip.vercel.app/login — main > section > p.mt-6.text-[12px] | '처음이라면 Google 계정으로 시작할 수 있어요.' + 이용약관 · 개인정보처리방침 링크 | `qa/screens/login-1440-dev.png` |
| F286 | 회원가입 | 가입 화면 하단 '로그아웃' 버튼 | https://scentrip.vercel.app/signup — 가입 완료하기 아래 | [→ 로그아웃] | `qa/screens/signup-A-11-all-agreed-1440-dev.png` |
| F015 | 취향 테스트 | 시작 버튼 아래 '약 1분 · 12개 질문' | https://scentrip.vercel.app/taste — 시작 버튼 다음 텍스트 | 약 1분 · 12개 질문 | `qa/screens/taste-intro-guest-1440-dev.png` |
| F016 | 취향 테스트 | 취향 테스트 화면의 언어 선택 | https://scentrip.vercel.app/taste — div.fixed.right-4.top-4 > select | 우상단 고정 언어 select | `qa/screens/taste-intro-guest-1440-dev.png` |
| F257 | 취향 테스트 | 문항 화면 상단 상황 라벨(예: 여행의 시작) 노출 | https://scentrip.vercel.app/taste — 문항 번호 위 라벨 | '여행의 시작' 등 라벨 노출 | `qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png` |
| F265 | 취향 테스트 | 결과 — 추천 여행지 안내 문구 '네 가지 취향 축의 유사도입니다…' | https://scentrip.vercel.app/taste — 추천 여행지 제목 아래 | 네 가지 취향 축의 유사도입니다. 만족도를 보장하는 확률은 아닙니다. | `qa/screens/taste-type-WHAN-1440-dev.png` |
| F269 | 취향 테스트 | 결과 CTA(비회원) '이 기기의 현재 결과 삭제' 버튼 | https://scentrip.vercel.app/taste (비로그인) — 결과 하단 CTA | 이 기기의 현재 결과 삭제 버튼 추가 | `qa/screens/taste-B-guest-CLDR-result-1440-dev.png` |
| F039 | 소식 목록 | 제목 위 'Travel news' 라벨 | https://scentrip.vercel.app/news — h1 위 아이콘+텍스트 | 📰 Travel news | `qa/screens/news-member-1440-dev.png` |
| F048 | 소식 목록 | 대표 글 '읽어보기 →' 버튼 | https://scentrip.vercel.app/news — 히어로 패널 | 읽어보기 → | `qa/screens/news-member-1440-dev.png` |
| F068 | 소식 상세 | 상단 '← 여행 소식' 뒤로가기 링크 | https://scentrip.vercel.app/news/green-rest-guide — 본문 최상단 링크 | ← 여행 소식 | `qa/screens/news-detail-member-1440-dev.png` |
| F085 | 탐색 · 장소 | 페이지 넘김 '1 / 149 · 다음 장소 보기' | https://scentrip.vercel.app/explore — 카드 그리드 하단 nav[aria-label=장소 페이지] | 1 / 149 + 다음 장소 보기 버튼 | `qa/screens/explore-places-member-1440-dev.png` |
| F086 | 탐색 · 장소 | 목록 보기 / 지도 보기 전환 토글 | https://scentrip.vercel.app/explore — 그리드 하단 우측 아이콘 토글(aria-label 목록 보기 / 지도 보기, ?view=map) | 목록/지도 토글 | `qa/screens/explore-places-member-1440-dev.png` |
| F104 | 장소 상세 | 정보 박스 아래 외부 링크 줄 (OpenStreetMap ↗ · 등록된 외부 정보 ↗ · 이 장소로 동선 만들기 →) | https://scentrip.vercel.app/explore/tour_00031 — 정보 박스 바로 아래 링크 3개 | OpenStreetMap ↗ / 등록된 외부 정보 ↗ / 이 장소로 동선 만들기 → | `qa/screens/place-detail-member-1440-dev.png` |
| F105 | 장소 상세 | '▸ 이 장소의 향기 이야기' 펼침 | https://scentrip.vercel.app/explore/tour_00031 — 외부 링크 줄 아래 details | 펼치면 '비 온 뒤처럼 투명한 물기 / 물가의 촉촉함과 서늘한 공기가 설명에 드러납니다.' | `qa/screens/place-detail-member-1440-dev.png` |
| F106 | 장소 상세 | 갤러리 아래 '이미지 출처: …' 캡션 | https://scentrip.vercel.app/explore/tour_00031 — 갤러리 이미지 아래 텍스트 | 이미지 출처: Wikimedia Commons · Appleysj | `qa/screens/place-detail-member-1440-dev.png` |
| F108 | 장소 상세 | 지도 위 안내 캡션 | https://scentrip.vercel.app/explore/tour_00031 — 지도 좌하단 오버레이 | 장소 위치 · 지도 링크에서 주변 지도를 확인하세요 | `qa/screens/place-detail-member-1440-dev.png` |
| F132 | 동선 상세 | 비회원 제목 옆 '테마 동선' 라벨 | https://scentrip.vercel.app/planner/river-forest (비로그인) — 제목 우측 (회원은 매칭 % 자리) | 테마 동선 | `qa/screens/route-detail-guest-1440-dev.png` |
| F138 | 동선 만들기 · 조건 | 진행 표시 'N / 7' 텍스트 | https://scentrip.vercel.app/planner?mode=ai — 진행 점 아래 p.step | '1 / 7' 텍스트 + aria-label '동선 만들기 진행률' | `qa/screens/planner-ai-s02-1440-dev.png` |
| F142 | 동선 만들기 · 조건 | 일정 밀도 선택지 보조 설명 | https://scentrip.vercel.app/planner?mode=ai — 일정 단계 선택지 | '쉬어가는 여유로운 여행' / '더 많은 장소를 만나는 여행' 보조 줄 | `qa/screens/planner-ai-s04-1440-dev.png` |
| F147 | 동선 만들기 · 조건 | 출발지 단계 '첫날 출발 시각' 입력과 '출발 위치 · 지도에서 위치 지정' | https://scentrip.vercel.app/planner?mode=ai — 출발지 단계 | time 입력(기본 09:00, '한국 시간 기준입니다. 다음 날부터는 오전 9시에 시작합니다.') + '출발 위치 / 지도에서 위치 지정' 지도 핀 선택 | `qa/screens/planner-ai-s06-1440-dev.png` |
| F151 | 동선 만들기 · 조건 | 생성 중 버튼 문구 '맞춤 동선을 만들고 있어요' | https://scentrip.vercel.app/planner?mode=ai — 마지막 단계 CTA 클릭 직후 | 위저드 안에서 버튼이 비활성 + "맞춤 동선을 만들고 있어요" | `qa/screens/planner-ai-generating-1440-dev.png` |
| F317 | 동선 만들기 · 장소 선택 | 위치 미확인 장소 선택 시 하단 경고 '이 장소의 위치를 확인 중이에요. 다른 장소를 선택해 주세요.' | https://scentrip.vercel.app/planner?mode=saved-places — 하단 선택 바 (낙동강제방 선택 시) | 경고 문구가 선택 개수 자리를 대체 | `qa/screens/route-create-2picked-1440-dev.png` |
| F158 | 동선 만들기 · 결과 | '▸ 일정 설정 및 안내' 펼침 전체 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 컨셉 박스 아래 details | 동선 생성 방식/시작일/첫날 출발 시각/지역/기간/이동/일정/동행 요약, 조건 변경, 운영시간 안내 3문단, 여행 시작일 입력, 순서 안내, 다른 지역 추천, 이 조건으로 다시 만들기, 추천 개선과 이용 기록 + 추천 개선 기록 초기화 | `qa/screens/route-result-ai-1440-dev.png` |
| F159 | 동선 만들기 · 결과 | 일차 요약 옆 총 거리·시간 ('14km · 24분') | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — "1일차 동선 요약" 오른쪽 | 14km · 24분 | `qa/screens/route-result-ai-1440-dev.png` |
| F161 | 동선 만들기 · 결과 | 장소 카드 '▸ 오전 · 예상 09:00–10:30' 펼침 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 장소 카드 하단 details | 시간대·예상 시각 펼침 → '오늘 일정의 향 구성을 다양하게 해요' / '운영시간 정보가 없어 방문 전 확인이 필요해요' / '방문 전 자유시간 65분 · …' / 체류시간 90분 | `qa/screens/route-result-ai-1440-dev.png` |
| F165 | 동선 만들기 · 결과 | '+ 이 일차에 장소 추가' 버튼 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 하단 | + 이 일차에 장소 추가 | `qa/screens/route-result-ai-1440-dev.png` |
| F173 | 내 여행 · 내 장소 | 목록 아래 '위치가 확인된 N곳을 지도에 표시했어요.' | https://scentrip.vercel.app/dashboard — 카드 그리드 하단 p.travel-note | 위치가 확인된 3곳을 지도에 표시했어요. | `qa/screens/mytrip-places-1440-dev.png` |
| F174 | 내 여행 · 내 장소 | 찜 0개 빈 상태 '아직 저장한 장소가 없어요' | https://scentrip.vercel.app/dashboard (찜 0개) — 목록 영역 | '아직 저장한 장소가 없어요 / 마음에 드는 여행을 찾아 차곡차곡 모아보세요. / [여행지 탐색]' | `qa/screens/mytrip-A-02-empty-after-tour-1440-dev.png` |
| F184 | 마이페이지 | 각 탭 상단 보이는 제목·설명 (계정 정보 / 내 리뷰 / 고객센터) | /mypage#account · #reviews · #support — 콘텐츠 상단 h1 + p | 보이는 제목 '계정 정보' + '계정 식별에 필요한 최소 정보만 표시합니다.' / '내 리뷰' + '내가 작성한 장소 리뷰를 관리합니다.' / '고객센터' + '자주 묻는 질문을 확인하거나 1:1 문의를 남겨주세요.' | `qa/screens/mypage-account-1440-dev.png` |
| F188 | 마이페이지 | 계정 설정 — '가입일' · '로그인 방식' · '연결된 계정' 행 | https://scentrip.vercel.app/mypage#account — 계정 정보 목록 | 가입일 2026년 9월 16일 / 로그인 방식 Google 소셜 로그인 / 연결된 계정 Google | `qa/screens/mypage-account-1440-dev.png` |
| F199 | 마이페이지 | 회원탈퇴 — '최종 확인' 입력('탈퇴' 입력해야 활성) | https://scentrip.vercel.app/mypage#withdraw — 최종 확인 박스 | '최종 확인 / 확인을 위해 탈퇴를 입력해 주세요.' + 입력(placeholder 탈퇴) + [회원탈퇴] 비활성 | `qa/screens/mypage-withdraw-1440-dev.png` |
| F426 | 마이페이지 | 회원탈퇴 — '계정을 영구 삭제할까요?' 확인 모달 | https://scentrip.vercel.app/mypage#withdraw — [회원탈퇴] 클릭 후 | 모달 '계정을 영구 삭제할까요? / 모든 사용자 데이터가 삭제되며 되돌릴 수 없습니다. / [취소] [계정 삭제]' ('탈퇴' 입력 확인에 더해 두 번째 확인) | `qa/screens/withdraw-B-03-confirm-modal-1440-dev.png` |
| F208 | 센트립 소개 | WHAT YOU GET — STYLE '여행 행동 패턴' 항목 | https://scentrip.vercel.app/about — 초록 패널 3번째 항목 | STYLE / 여행 행동 패턴 / 나에게 편안한 여행 방식과 분위기 | `qa/screens/about-guest-1440-dev.png` |

## 원본 확인 필요

> 원본 자체에 문제가 있어 보이는 부분 — 개발 티켓으로 만들지 않음

| # | 페이지 | 뷰포트 | 현상 | 근거 | 스크린샷 |
|---|---|---|---|---|---|
| F406 | 홈 | 640 | 원본 640 가로 스크롤 (동선 카드 제목 넘침) — 문서 폭 651px > 640px, 제목 링크가 오른쪽 밖으로 나감 | `screens/home.html (.route-title)` | `qa/screens/home-member-640-design.png` |
| F407 | 탐색 · 장소 | 640 | 원본 640 가로 스크롤 — 문서 폭 693px > 640px (넘치는 보이는 요소 미특정) | `screens/place-recommend.html` | `qa/screens/explore-places-member-640-design.png` |
| F408 | 동선 만들기 · 장소 선택 | 640 | 원본 640 가로 스크롤 — 문서 폭 687px > 640px | `screens/route-create.html` | `qa/screens/route-create-640-design.png` |
| F409 | 내 여행 · 내 장소 | 640 | 원본 640 가로 스크롤 — 문서 폭 687px > 640px | `screens/my-trip.html` | `qa/screens/mytrip-places-640-design.png` |
| F410 | 내 여행 · 내 장소 | 1024 / 640 | 원본 지도 확대 버튼(+/−)이 헤더 로고를 덮음 — 실제 창(1024×768, 640×800)에서 +/− 버튼이 로고 위에 겹침 | `screens/my-trip.html (.mt-map) · Leaflet 컨트롤 z-index` | `qa/screens/mytrip-places-1024-design.png` |
| F411 | 내 여행 · 내 장소 | 640 | 원본 640 지도가 '내 장소 10' 제목을 가림 — 제목 위치의 최상단 요소가 지도 캔버스 — 제목이 가려짐 | `screens/my-trip.html (.mt-map-canvas)` | `qa/screens/mytrip-places-640-design.png` |
| F216 | 센트립 소개 · 취향 테스트 | all | 원본끼리 유형 향 이름 불일치 (CHDR · CLDR) — 배포본은 두 화면 모두 '잉크 우디' · '코튼 머스크' 사용 | `screens/about.html:450, 454 · screens/onboarding-test.html:1688, 1777` | `qa/screens/about-guest-1440-dev.png` |
| — | 동선 만들기 · 조건 | all | 기간 질문 '며칠동안'이 띄어쓰기 규범('며칠 동안')과 다름 — 배포본은 규범대로 씀. 원본 기준으로 티켓 SCT에 포함했으나 원본 수정 여부 결정 필요 | `screens/route-conditions.html:251` | `qa/screens/planner-ai-s02-1440-design.png` |
| — | 내 여행 · 내 장소 | all | 원본에 '찜 0개' 빈 상태 정의 없음(필터 결과 0건 빈 상태만) — 배포본은 자체 문구 사용 | `screens/my-trip.html:411-414` | `qa/screens/mytrip-A-02-empty-after-tour-1440-dev.png` |
| — | 장소 상세 | all | 운영시간·입장료 값이 없을 때 대체 문구 원본 미정의 | `screens/place-detail.html:269-270` | `qa/screens/place-detail-member-1440-dev.png` |

## 확인필요 (검수 미완)

| # | 페이지 | 항목 | 사유 |
|---|---|---|---|
| F392 | 공통(토큰) | 호버·프레스 상태 레이어(state-hover/pressed) 적용 여부 | 자동 캡처는 정지 상태만 수집해 확인하지 못함 |
| F425 | 로그인 | Google 로그인 취소(cancel) 실제 플로우 | 사용자 수동 로그인 과정이라 실제 취소 경로 미실행 (URL 파라미터 처리는 1단계 티켓) |
| F289 | 회원가입 | 중복 닉네임 검사 시점 | 입력 단계에서 안내 없음. 제출 시 서버 검사 여부는 실제 가입이 될 위험이 있어 미확인 |
| F103 | 장소 상세 | 정보 박스 값이 없을 때 대체 문구 | '운영시간은 방문 전 확인해 주세요.' / '입장료 정보 확인 필요' |
| F341 | 장소 리뷰 | 리뷰 10개 초과 시 '리뷰 더 보기 (N개)' 버튼 | 배포본 해당 장소 리뷰 2건이라 확인 불가 ('도움돼요 N' 토글은 원본과 같게 동작 확인: 0 → 1, aria-pressed=true) |

## 검수 중 배포 데이터 변경 기록

- 계정 A(qa검수A): 장소 찜 4곳(tour_00031~34), 탐색 동선 찜 1건, AI 동선 저장 1건, 리뷰 1건(tour_00031), 재검사 1회(CLDR 응답 — 업데이트 확인 단계가 없어 프로필 유형이 바뀌었을 수 있음). 스크립트 오류로 언어 설정이 잠시 English로 저장됐다가 한국어로 복구
- 계정 B(qa검수B · design.sadie@gmail.com): 리뷰 1건 작성 → 사용자 동의로 실제 회원탈퇴(리뷰 삭제 확인). 탈퇴 후 재로그인해 가입 화면 진입까지만 확인하고 재가입은 하지 않음
- 계정 A는 탈퇴하지 않음