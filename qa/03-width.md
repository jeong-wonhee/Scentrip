# 03. 창 너비 축소 대조

- 기준: 원본 `screens/*.html` (npx serve 로컬) ↔ 배포 https://scentrip.vercel.app · 1440×900 · 확인일 2026-09-16
- 회원 화면은 신규 Google 계정 A(qa검수A · WHAN)로, 가입 전 검사 분기는 계정 B(qa검수B · CLDR)로 확인
- 표기: **P0/P1/P2** = 개발 티켓 후보 · **확인필요** = 확인하지 못함 · **원본에없음** = 배포본에만 있음 · **원본확인** = 원본 자체 문제
- 원본 샘플 데이터(장소명·소식 글·리뷰 등 자리표시자)와 배포 실데이터 값 차이는 제외하고, 라벨·문구 규칙·구성·형식만 대조
## 페이지 × 뷰포트 매트릭스

셀 = `원본 / 배포` · **정상** / **깨짐**(가로 스크롤·요소 잘림/겹침·넘침) · ⚠ = 둘 다 정상이지만 줄어드는 방식이 다름(아래 티켓)

| 페이지 | 1440 | 1280 | 1024 | 640 | 스크린샷 |
|---|---|---|---|---|---|
| 로그인 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/login-{vp}-{side}.png` |
| 회원가입 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/signup-A-01-initial-{vp}-{side}.png` |
| 취향 테스트 표지 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/taste-intro-guest-{vp}-{side}.png` |
| 취향 테스트 문항 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/taste-A-member-first-WHAN-q01-{vp}-{side}.png` |
| 취향 테스트 결과 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/taste-A-member-first-WHAN-result-{vp}-{side}.png` |
| 홈(회원) | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 깨짐 / 정상 ⚠ | `qa/screens/home-member-{vp}-{side}.png` |
| 홈(비회원) | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 깨짐 / 정상 ⚠ | `qa/screens/home-guest-{vp}-{side}.png` |
| 소식 목록 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | 정상 / 정상 ⚠ | `qa/screens/news-member-{vp}-{side}.png` |
| 소식 상세 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/news-detail-member-{vp}-{side}.png` |
| 탐색 · 장소(회원) | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 깨짐 / 정상 ⚠ | `qa/screens/explore-places-member-{vp}-{side}.png` |
| 탐색 · 장소(비회원) | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/explore-places-guest-{vp}-{side}.png` |
| 탐색 · 동선 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | 정상 / 정상 ⚠ | `qa/screens/explore-routes-member-{vp}-{side}.png` |
| 장소 상세 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/place-detail-member-{vp}-{side}.png` |
| 장소 리뷰 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/place-reviews-member-{vp}-{side}.png` |
| 동선 상세 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/route-detail-member-{vp}-{side}.png` |
| 동선 만들기 · 조건(첫 화면) | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/planner-ai-{vp}-{side}.png` |
| 동선 만들기 · 결과 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/route-result-ai-{vp}-{side}.png` |
| 동선 만들기 · 장소 선택 | 정상 / 정상 | 정상 / 정상 | 깨짐 / 정상 ⚠ | 깨짐 / 정상 ⚠ | `qa/screens/route-create-{vp}-{side}.png` |
| 내 여행 · 내 장소 | 정상 / 정상 | 정상 / 정상 | 깨짐 / 정상 | 깨짐 / 정상 ⚠ | `qa/screens/mytrip-places-{vp}-{side}.png` |
| 내 여행 · 내 동선 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/mytrip-routes-{vp}-{side}.png` |
| 마이페이지 계정 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | 정상 / 정상 ⚠ | `qa/screens/mypage-account-{vp}-{side}.png` |
| 마이페이지 고객센터 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/mypage-support-{vp}-{side}.png` |
| 마이페이지 탈퇴 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/mypage-withdraw-{vp}-{side}.png` |
| 센트립 소개 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | 정상 / 정상 ⚠ | `qa/screens/about-guest-{vp}-{side}.png` |
| 이용약관 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/terms-{vp}-{side}.png` |
| 개인정보처리방침 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 | 정상 / 정상 ⚠ | `qa/screens/privacy-{vp}-{side}.png` |

- 640 열의 ⚠는 공통: 배포 헤더 내비가 둘째 줄로 내려감
- 동선 만들기 · 조건: 첫 화면(원본 1단계 / 배포 모드 선택)만 4종 캡처, 이후 단계는 1440만 저장
- 스크린샷 경로의 `{vp}` = 1440 · 1280 · 1024 · 640, `{side}` = design · dev
- 판정 데이터: `qa/raw/width-matrix.json` (scrollWidth · 뷰포트 밖 요소). 내 여행 지도 겹침은 실제 창(640×800, 1024×768)에서 elementFromPoint로 확인
- full page 캡처 한계: 배포 결과·상세 화면의 sticky 헤더/하단 바가 페이지 중간에 찍힘(실제 창 정상), 원본 취향 결과는 스크롤 등장 애니메이션 때문에 히어로 아래가 비어 보임 — 깨짐으로 보지 않음
- 배포 640 넘침 후보(탐색 동선 검색 폼, 내 동선 필터 옵션)는 닫힌 펼침 메뉴 내부 요소로, 스크린샷상 보이지 않아 깨짐 아님


## 요약

| 구분 | 건수 |
|---|---|
| P1 | 5 |
| P2 | 8 |
| 원본확인 | 6 |
| **합계** | **19** |

| 페이지 | 건수 |
|---|---|
| 공통(헤더) | 1 |
| 홈 | 1 |
| 소식 목록 | 2 |
| 탐색 · 장소 | 2 |
| 탐색 · 동선 | 1 |
| 장소 리뷰 | 1 |
| 동선 상세 | 1 |
| 동선 만들기 · 장소 선택 | 2 |
| 동선 만들기 · 결과 | 1 |
| 내 여행 · 내 장소 | 3 |
| 내 여행 · 내 동선 | 1 |
| 마이페이지 | 1 |
| 센트립 소개 | 2 |

## 공통(헤더)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F393 | P2 | 640에서 헤더 내비가 두 번째 줄로 내려감 | 전 화면 헤더 (배포 nav.travel-mobile-nav) | 640에서도 로고 · 소식 · 탐색 · 내 여행 · 우측 버튼이 한 줄(높이 56px) 유지 | `reference/components.css (.nav) · 캡처 home-member-640-design` | 로고·우측만 첫 줄, 소식·탐색·내 여행은 둘째 줄(y 56~69)로 분리되어 헤더 높이 증가 | qa/screens/home-member-640-dev.png | 640 |

## 홈

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F406 | 원본확인 | 원본 640 가로 스크롤 (동선 카드 제목 넘침) | screens/home.html — AI 맞춤 동선 두 번째 카드 제목 '안동 숨은 힙플레이스 탐방' | 가로 스크롤 없음 | `screens/home.html (.route-title)` | 문서 폭 651px > 640px, 제목 링크가 오른쪽 밖으로 나감 | qa/screens/home-member-640-design.png | 640 |

## 소식 목록

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F395 | P1 | 1024에서 소식 카드 열 수 불일치 (2열 → 3열) | /news 카드 목록 | 1440 3열 → 1024 2열 → 640 2열 | `screens/news.html (.grid 미디어쿼리)` | 1024에서 하단 카드 3열 유지 (+ 대표 글 히어로) | qa/screens/news-member-1024-dev.png | 1024 |
| F396 | P2 | 640에서 소식 카드가 1열로 접힘 (원본 2열) | /news 카드 목록 | 640에서 2열 | `screens/news.html (.grid 미디어쿼리)` | 640에서 1열 + 히어로 세로 적층 | qa/screens/news-member-640-dev.png | 640 |

## 탐색 · 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F403 | P2 | 640에서 결과 개수 위치 불일치 | /explore 필터 바 | 640: 정렬 세그먼트 줄 오른쪽에 '총 N개 장소' (y 228), 필터 칩은 다음 줄 | `screens/place-recommend.html (.filterbar 미디어쿼리)` | 필터 칩 아래 별도 줄에 검색 아이콘 + 개수 (y 320) | qa/screens/explore-places-member-640-dev.png | 640 |
| F407 | 원본확인 | 원본 640 가로 스크롤 | screens/place-recommend.html | 가로 스크롤 없음 | `screens/place-recommend.html` | 문서 폭 693px > 640px (넘치는 보이는 요소 미특정) | qa/screens/explore-places-member-640-design.png | 640 |

## 탐색 · 동선

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F394 | P1 | 1024에서 동선 카드 그리드 열 수 불일치 (2열 → 3열) | /explore?tab=routes 동선 카드 그리드 | 1440·1280 3열 → 1024 2열 → 640 2열 | `screens/route.html (.grid 미디어쿼리)` | 1024에서도 3열 유지 | qa/screens/explore-routes-member-1024-dev.png | 1024 |

## 장소 리뷰

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F404 | P2 | 640에서 별점 요약이 세로로 쌓이지 않음 | /explore/[id]/reviews 별점 요약 | 640: 평균 점수 위 · 5~1점 막대 아래 (세로) | `screens/place-reviews.html (.prv-sum 미디어쿼리)` | 평균(좌) · 막대(우) 가로 배치 유지 | qa/screens/place-reviews-member-640-dev.png | 640 |

## 동선 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F400 | P2 | 640에서 지도가 타임라인 아래로 감 (원본은 위) | /planner/[id] 지도 · 타임라인 | 640: 지도(높이 320px)가 타임라인 위 | `screens/route-detail.html (미디어쿼리)` | 타임라인 다음 맨 아래에 지도(높이 420px) | qa/screens/route-detail-member-640-dev.png | 640 |

## 동선 만들기 · 장소 선택

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F402 | P1 | 1024에서 장소 선택 화면 좌우 분할 유지 (원본은 지도 위 · 목록 아래) | /planner?mode=saved-places 목록 · 지도 | 1440 좌 목록 · 우 지도 → 1024부터 지도 위, 목록 아래 한 단 | `screens/route-create.html (미디어쿼리)` | 1024에서 좌우 분할 유지, 640에서만 지도 위 | qa/screens/route-create-1024-dev.png | 1024 |
| F408 | 원본확인 | 원본 640 가로 스크롤 | screens/route-create.html | 가로 스크롤 없음 | `screens/route-create.html` | 문서 폭 687px > 640px | qa/screens/route-create-640-design.png | 640 |

## 동선 만들기 · 결과

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F401 | P2 | 640에서 결과 지도가 타임라인 아래로 감 (원본은 위) | /planner 결과 지도 · 타임라인 | 640: 지도(높이 320px)가 위 | `screens/route-result.html (미디어쿼리)` | 지도(높이 420px)가 타임라인 아래 | qa/screens/route-result-ai-640-dev.png | 640 |

## 내 여행 · 내 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F409 | 원본확인 | 원본 640 가로 스크롤 | screens/my-trip.html | 가로 스크롤 없음 | `screens/my-trip.html` | 문서 폭 687px > 640px | qa/screens/mytrip-places-640-design.png | 640 |
| F410 | 원본확인 | 원본 지도 확대 버튼(+/−)이 헤더 로고를 덮음 | screens/my-trip.html · screens/route-create.html — 지도가 위로 오는 1024·640 | 헤더가 지도 컨트롤 위에 보임 | `screens/my-trip.html (.mt-map) · Leaflet 컨트롤 z-index` | 실제 창(1024×768, 640×800)에서 +/− 버튼이 로고 위에 겹침 | qa/screens/mytrip-places-1024-design.png | 1024 / 640 |
| F411 | 원본확인 | 원본 640 지도가 '내 장소 10' 제목을 가림 | screens/my-trip.html — 640×800 실제 창 | 지도 아래에 제목이 보임 | `screens/my-trip.html (.mt-map-canvas)` | 제목 위치의 최상단 요소가 지도 캔버스 — 제목이 가려짐 | qa/screens/mytrip-places-640-design.png | 640 |

## 내 여행 · 내 동선

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F405 | P2 | 640에서 '동선 만들기' 버튼 위치 불일치 | /dashboard?tab=routes 필터 바 | 640: 필터 칩 아래 별도 줄 왼쪽 (x 32, y 314) | `screens/my-trip-routes.html (.mt-bar 미디어쿼리)` | 필터 칩과 같은 줄 오른쪽 끝 (x 499, y 282) | qa/screens/mytrip-routes-640-dev.png | 640 |

## 마이페이지

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F399 | P1 | 1024에서 마이페이지 메뉴가 가로 탭으로 바뀌지 않음 | /mypage 좌측 메뉴 | 1440 세로 사이드 메뉴 → 1024·640 상단 가로 탭(계정 설정 · 내 리뷰 · 고객센터) | `screens/mypage.html (nav#side 미디어쿼리)` | 1024 세로 사이드 메뉴 유지, 640에서만 가로 탭 | qa/screens/mypage-account-1024-dev.png | 1024 |

## 센트립 소개

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F397 | P1 | 1024에서 소개 단계 카드 열 수 불일치 (1열 → 3열) | /about WHY SCENTRIP 단계 카드 01·02·03 | 1440·1280 3열 → 1024부터 1열 | `screens/about.html (미디어쿼리)` | 1024에서도 3열, 640에서 1열 | qa/screens/about-guest-1024-dev.png | 1024 |
| F398 | P2 | 창을 줄여도 소개 히어로 제목 크기가 줄지 않음 | /about 히어로 h1 | 1440 44px → 1024 40.96px → 640 30px | `screens/about.html (h1 유동 크기)` | 1440·1024·640 모두 44px | qa/screens/about-guest-640-dev.png | 1024 / 640 |
