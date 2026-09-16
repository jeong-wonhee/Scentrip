# 01. 텍스트 · 기획 대조

- 기준: 원본 `screens/*.html` (npx serve 로컬) ↔ 배포 https://scentrip.vercel.app · 1440×900 · 확인일 2026-09-16
- 회원 화면은 신규 Google 계정 A(qa검수A · WHAN)로, 가입 전 검사 분기는 계정 B(qa검수B · CLDR)로 확인
- 표기: **P0/P1/P2** = 개발 티켓 후보 · **확인필요** = 확인하지 못함 · **원본에없음** = 배포본에만 있음 · **원본확인** = 원본 자체 문제
- 원본 샘플 데이터(장소명·소식 글·리뷰 등 자리표시자)와 배포 실데이터 값 차이는 제외하고, 라벨·문구 규칙·구성·형식만 대조

## 요약

| 구분 | 건수 |
|---|---|
| P0 | 295 |
| P1 | 1 |
| 확인필요 | 3 |
| 원본에없음 | 38 |
| 원본확인 | 1 |
| **합계** | **338** |

| 페이지 | 건수 |
|---|---|
| 공통(헤더) | 2 |
| 공통(푸터) | 1 |
| 공통(카드) | 9 |
| 공통(탐색 필터 바) | 4 |
| 공통(로그인 모달) | 3 |
| 공통(튜토리얼) | 2 |
| 공통(리뷰 카드) | 4 |
| 공통(리뷰 작성·수정) | 7 |
| 공통(없는 상세) | 1 |
| 공통(약관) | 1 |
| 로그인 | 14 |
| 회원가입 | 20 |
| 취향 테스트 | 60 |
| 홈 | 17 |
| 소식 목록 | 15 |
| 소식 상세 | 14 |
| 탐색 · 장소 | 12 |
| 탐색 · 동선 | 9 |
| 장소 상세 | 17 |
| 장소 리뷰 | 10 |
| 동선 상세 | 9 |
| 동선 만들기 · 조건 | 23 |
| 동선 만들기 · 장소 선택 | 5 |
| 동선 만들기 · 결과 | 20 |
| 내 여행 | 1 |
| 내 여행 · 내 장소 | 8 |
| 내 여행 · 내 동선 | 5 |
| 마이페이지 | 24 |
| 센트립 소개 | 14 |
| 센트립 소개 · 취향 테스트 | 1 |
| 이용약관 | 3 |
| 개인정보처리방침 | 3 |

## 공통(헤더)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F009 | P0 | 로고 링크 aria-label 불일치 | 전 화면 헤더 로고 a[href='/'] (배포 aria-label='Scentrip 홈') | 센트립 홈 (취향 테스트 화면은 '센트립 홈으로 이동') | `screens/home.html:304, screens/onboarding-test.html:1217` | Scentrip 홈 | qa/raw/home-member-1440-dev.json | all |
| F010 | P1 | 언어 변경 UI가 원본과 다른 컴포넌트 | 전 화면 헤더 우측 / 로그인·가입 상단 — select[aria-label='Language / 언어 / 语言 / 言語'] | 지구본 아이콘 + 'KO' 텍스트 버튼(aria-label '언어 변경 (현재 한국어)') → 클릭 시 메뉴 5개(한국어 / English 영어 / 日本語 일본어 / 简体中文 중국어 간체 / 繁體中文 중국어 번체) + 선택 시 토스트 | `reference/lang.js:15-44` | 지구본 아이콘 + 네이티브 select(표시 '한국어'), aria-label 'Language / 언어 / 语言 / 言語' | qa/screens/login-1440-dev.png | all |

## 공통(푸터)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F030 | 원본에없음 | 푸터 '데이터 출처' 펼침 | 전 화면 푸터 하단 좌측 details '데이터 출처' (펼치면 '관광지 태그 데이터', '© OpenStreetMap contributors · ODbL 1.0') | (원본 푸터 하단은 이메일 + 이용약관·개인정보처리방침만) | `screens/home.html:439-445` | 이메일 아래 '▸ 데이터 출처' 노출 | qa/screens/home-member-1440-dev.png | all |

## 공통(카드)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F021 | P0 | 매칭 배지 라벨 불일치 'AI 매칭 %' → '취향 유사도 %' | 홈·탐색·장소 상세 추천 등 장소/동선 카드 좌상단 배지 (배포: '✦ 취향 유사도 65%') | AI 매칭 {n}% | `screens/home.html:527, screens/home.html:562` | 취향 유사도 {n}% | qa/screens/home-member-1440-dev.png | all |
| F022 | P0 | 여행 장소 추천 카드 메타 — 취향 항목 누락, '매칭 근거' 추가 | 홈(/) · 탐색(/explore) · '님 취향의 여행 장소 추천' 카드 본문 하단 | 지역 · 특징 · 취향 3개 항목 (card-meta span 3개) | `screens/home.html:533` | 지역 · 특징 2개 + 별도 줄 '▸ {유형} 타입 · 매칭 근거' 펼침 | qa/screens/home-member-1440-dev.png | all |
| F023 | P0 | 장소 카드 지역이 '지역 정보 확인 중'으로 고정 노출 | 홈(/) · 탐색(/explore) · 여행 장소 추천·요즘 뜨는 로컬 여행 장소 카드 메타 첫 항목 (고투몰, 이효석문화예술촌, 임실N장미축제, 호가정, 용아생가, 월봉서원) | 지역명 (예: 충청남도 홍성군) | `screens/home.html:533` | 지역 정보 확인 중 (페이지 로드 후에도 바뀌지 않음) | qa/screens/home-member-1440-dev.png | all |
| F026 | P0 | 동선 카드 제목 구성 불일치 | 홈(/) · 탐색 동선(/explore?tab=routes) — 동선 카드 제목 | [대표 장소명] + 동선 이름 (예: [안동하회마을] 안동 숨은 힙플레이스 탐방), 대표 장소명은 브랜드색 | `screens/home.html:569, 589` | '장소A · 장소B' 한 덩어리 (예: 중랑캠핑숲 · 망우리공원) | qa/screens/home-member-1440-dev.png | all |
| F027 | P0 | 동선 카드 메타 구성 불일치 | 홈(/) · 탐색 동선(/explore?tab=routes) — 동선 카드 하단 메타 | 장소 수 · 일정 · 코스 여유도 · {유형} 취향 (예: 5개 장소 · 2박3일 · 여유로운 코스 · OOO 취향) | `screens/home.html:589` | 2개 장소 · 당일 · 이동 약 6분 · 여유로운 코스 ('취향' 항목 없음, '이동 약 N분' 추가) | qa/screens/home-member-1440-dev.png | all |
| F099 | P0 | 동선 카드 지역 표기 형식 불일치 (시·도 전체 이름) | 탐색 동선 캐러셀 카드 메타 · 동선 카드 메타 | 시·도 약칭 + 시·군·구 (예: 전남 담양, 경북 안동) | `screens/route.html:421` | 시·도 전체 이름만 (예: 서울특별시, 부산광역시) | qa/screens/explore-routes-member-1440-dev.png | all |
| F171 | P0 | 장소 카드 지역 표기 형식 불일치 (시·도 전체 이름) | /dashboard · /explore · 홈 장소 카드 메타 첫 항목 | 시·도 약칭 + 시·군·구 (예: 강원 강릉시, 서울 종로구) | `screens/my-trip.html:440-446` | 시·도 전체 이름 + 시·군·구 (예: 부산광역시 강서구) | qa/screens/mytrip-places-1440-dev.png | all |
| F175 | P0 | 저장 동선 카드 대괄호 항목이 대표 장소가 아닌 지역 | https://scentrip.vercel.app/dashboard?tab=routes — 동선 카드 제목 앞 [ ] | [대표 장소명] (예: [강릉], [연무장길], [황리단길]) | `screens/my-trip-routes.html:486-498, 467` | [시·도 정식명] (예: [경상남도], [부산광역시]) | qa/screens/mytrip-routes-1440-dev.png | all |
| F177 | P0 | 내 동선 카드 배지 라벨 '유사도 %' | https://scentrip.vercel.app/dashboard?tab=routes — 동선 카드 좌상단 배지 | AI 매칭 {n}% | `screens/my-trip-routes.html:461` | 유사도 {n}% (탐색·홈은 "취향 유사도") | qa/screens/mytrip-routes-1440-dev.png | all |

## 공통(탐색 필터 바)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F300 | P0 | 지역 검색 결과 0건 안내 문구 누락 | /explore 지역 필터 팝오버 — 검색어 '없는지역' | '‘{검색어}’에 맞는 지역이 없어요' / '시·도나 시·군·구 이름으로 검색해 보세요' | `screens/place-recommend.html:574` | '검색 결과 0곳'만 표시 | qa/screens/ov-filter-region-search-empty-1440-dev.png | all |
| F301 | P0 | 취향 필터 옵션 보조 설명 3개 불일치 | /explore 취향 타입 필터 팝오버 | 사색가 타입 "박물관·독립서점 탐방 선호" / 미학가 타입 "미술관·공연 관람 선호" / 모험가 타입 "계곡·폭포 전망 선호" | `screens/place-recommend.html:370, 376, 379` | "박물관·독립서점 선호" / "미술관·공연 선호" / "계곡·폭포 선호" | qa/screens/ov-filter-taste-1440-dev.png | all |
| F084 | 원본에없음 | 키워드 검색 버튼(돋보기) | /explore · /explore?tab=routes — 필터 바 우측, 개수 왼쪽 돋보기 버튼 (input placeholder "장소, 향, 키워드 검색") | (원본에 없음 — 검색은 만들지 않기로 결정, CLAUDE.md 2026-09-13) | `CLAUDE.md IA 우상단 유틸리티` | 돋보기 버튼 → 키워드 검색 입력 | qa/screens/explore-places-member-1440-dev.png | all |
| F302 | 원본에없음 | 특징·취향 필터 팝오버 하단 '초기화' 버튼 | /explore 특징 · 취향 타입 필터 팝오버 | (원본 특징·취향 팝오버는 옵션 목록만 — 초기화는 지역 패널에만) | `screens/place-recommend.html:579-583` | 목록 하단 초기화 버튼 | qa/screens/ov-filter-feature-1440-dev.png | all |

## 공통(로그인 모달)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F296 | P0 | 로그인 모달 제목 줄바꿈 불일치 | 비회원이 찜·리뷰 쓰기 등 클릭 시 모달 제목 (예: /explore 카드 하트) | 나의 향 취향을<br>여행으로 이어가요 (2줄) | `reference/login-modal.js:54` | 나의 향 취향을 여행으로 이어가요 (1줄) | qa/screens/ov-login-modal-save-1440-dev.png | all |
| F297 | P0 | 로그인 모달 설명 문구 불일치 | 로그인 모달 제목 아래 설명 | 센트립의 모든 서비스를 이용하시려면 회원가입해 주세요. | `reference/login-modal.js:55` | 로그인하면 마음에 드는 장소를 저장하고 나만의 여행 동선을 만들 수 있어요. | qa/screens/ov-login-modal-save-1440-dev.png | all |
| F298 | P0 | 로그인 모달 '로그인하면 할 수 있어요' 혜택 3줄 누락 | 로그인 모달 설명과 Google 버튼 사이 | 아이콘 + '향 취향 검사 결과를 저장해요' / '마음에 드는 여행지를 찜해요' / '나만의 여행 동선을 만들고 저장해요' (ul aria-label '로그인하면 할 수 있어요') | `reference/login-modal.js:56-60` | 혜택 목록 없음 | qa/screens/ov-login-modal-save-1440-dev.png | all |

## 공통(튜토리얼)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F065 | P0 | 튜토리얼 마지막 단계 버튼 라벨 불일치 | 홈·소식·탐색·내 여행 코치마크 패널 primary 버튼 (tutorial-tour-module__primary) | 알겠어요 | `reference/tour.js:122` | 확인했어요 | qa/screens/home-A-tour-04-1440-dev.png | all |
| F066 | P0 | 튜토리얼 1단계에서 '이전' 버튼 노출 | 코치마크 패널 1/N 단계 (tutorial-tour-module__actions) | 1단계에서는 이전 버튼 숨김 | `reference/tour.js:120` | 1단계에도 이전 버튼 노출 | qa/screens/home-A-tour-01-1440-dev.png | all |

## 공통(리뷰 카드)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F334 | P0 | 리뷰 카드 작성자 줄 — 아바타·취향 유형·방문일 누락 | https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 카드 상단 | 아바타 + 닉네임 / '{코드} · {타입명} · YY.MM.DD 방문' (예: WHAN · 감성가 타입 · 26.08.20 방문) | `screens/place-detail.html:370-374` | 닉네임만, 방문일은 하단 날짜 줄로 | qa/screens/place-detail-member-1440-dev.png | all |
| F335 | P0 | 리뷰 카드 하단 날짜 형식 불일치 | https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 카드 하단 | 작성일 YYYY.MM.DD (예: 2026.08.21) | `screens/place-detail.html:380` | 2026. 9. 10. 방문 · 2026. 9. 16. | qa/screens/place-detail-member-1440-dev.png | all |
| F336 | P0 | 내 리뷰 카드 — ⋯ 메뉴(리뷰 수정·리뷰 삭제) 대신 휴지통 버튼 | https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 내 리뷰 카드 우상단 | ⋯ 버튼(aria-label '내 리뷰 관리') → 메뉴 '리뷰 수정' / '리뷰 삭제' | `screens/place-detail.html:360-366` | 휴지통 아이콘(aria-label '리뷰 삭제')만 | qa/screens/place-detail-member-1440-dev.png | all |
| F338 | 원본에없음 | 내 리뷰가 있으면 헤더 버튼이 '내 리뷰 수정'으로 바뀜 | https://scentrip.vercel.app/explore/tour_00031 · https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 헤더 우측 버튼 | (원본은 항상 '리뷰 작성하기') | `screens/place-detail.html:277, screens/place-reviews.html:273` | 내 리뷰 수정 | qa/screens/place-detail-member-1440-dev.png | all |

## 공통(리뷰 작성·수정)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F326 | P0 | 리뷰 작성 폼 — 장소 위치 줄·별점 제목 누락 | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 / https://scentrip.vercel.app/mypage#review-edit | 장소명 아래 '{지역} · {특징}' 줄 + legend '별점' | `screens/mypage.html:539-544` | 장소명만, 별점 제목 없음(작성 모달) / 수정 화면은 별점 제목 있음·위치 줄 없음 | qa/screens/review-write-1440-dev.png | all |
| F327 | P0 | 리뷰 작성 폼 — '방문 날짜' 라벨 불일치 | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 | 방문 날짜 | `screens/mypage.html:552` | 방문일 | qa/screens/review-write-1440-dev.png | all |
| F328 | P0 | 리뷰 내용 placeholder 불일치 | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 textarea | 이 장소의 향과 분위기를 기록해 주세요. | `screens/mypage.html:558` | 장소에서 느낀 향기와 분위기를 들려주세요. | qa/screens/review-write-1440-dev.png | all |
| F329 | P0 | 리뷰 작성 폼 — 글자 수 카운터 누락 (작성 모달) | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 textarea 아래 | 0/300 | `screens/mypage.html:557-562` | 카운터 없음 (수정 화면에는 있음) | qa/screens/review-write-1440-dev.png | all |
| F330 | P0 | 사진 추가 영역 라벨 불일치 · 수정 화면 사진 영역 누락 | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 / mypage#review-edit | '사진 최대 5장' + 추가 버튼 '추가 {n}/5' (작성·수정 공통) | `screens/mypage.html:567-570` | 작성: '사진 최대 5장' + 파일 선택 '선택' / 수정: 사진 영역 없음 | qa/screens/review-edit-1440-dev.png | all |
| F331 | P0 | 리뷰 작성 버튼 구성 불일치 (취소 없음, 라벨) | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 모달 하단 | [취소] [등록하기] (수정 화면은 [취소] [저장하기]) | `screens/mypage.html:573-574, 1106` | 작성: [리뷰 저장]만 / 수정: [취소] [저장] | qa/screens/review-edit-1440-dev.png | all |
| F332 | P0 | 리뷰 빈 제출 시 별점 오류 문구 누락 | https://scentrip.vercel.app/explore/tour_00031 리뷰 작성 → 아무것도 안 하고 제출 | '별점을 선택해 주세요.' + '리뷰 내용을 입력해 주세요.' | `screens/mypage.html:548, 561` | '리뷰 내용을 입력해 주세요.'만 | qa/screens/review-write-empty-submit-1440-dev.png | all |

## 공통(없는 상세)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F133 | P0 | 없는 동선·소식·장소 주소의 안내 화면 불일치 | /planner/not-exist-route · /news/not-exist-slug · /explore/not-exist-place — 전역 404 | 헤더·푸터가 있는 화면 안에서 '동선을 찾을 수 없어요'/'소식을 찾을 수 없어요' + '삭제되었거나 주소가 잘못되었을 수 있어요.' + '동선 목록으로'/'여행 소식 목록으로' 버튼 | `screens/route-detail.html:721-723, screens/news-detail.html:348` | 헤더·푸터 없는 404: '404 / 페이지를 찾을 수 없어요 / 주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다. / 홈으로 · 여행지 탐색' | qa/screens/route-detail-missing-1440-dev.png | all |

## 공통(약관)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F219 | 원본에없음 | 약관 상단 'Scentrip 홈으로' 링크 · 요약 문장 · '시행일' 줄 | /terms · /privacy — h1 위·아래 | (원본은 h1 다음 바로 제1조, 시행일은 문서 끝 부칙/시행일) | `screens/terms.html:134-138, screens/privacy.html:162-166` | 'Scentrip 홈으로' + 요약 문장(예: 본 약관은 센트립이 제공하는 …) + '시행일: 2026년 9월 21일' | qa/screens/terms-1440-dev.png | all |

## 로그인

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F001 | P0 | document title 불일치 | https://scentrip.vercel.app/login — <title> | Scentrip — 로그인 | `screens/login.html:6` | Scentrip | qa/screens/login-1440-dev.png | all |
| F002 | P0 | 타이틀 텍스트 불일치 | https://scentrip.vercel.app/login — main > section > h1 | 나의 향 취향을<br>여행으로 이어가요 (2줄) | `screens/login.html:105` | 로그인 | qa/screens/login-1440-dev.png | all |
| F003 | P0 | 타이틀 아래 설명 문구 불일치 | https://scentrip.vercel.app/login — h1 다음 p | 센트립의 모든 서비스를 이용하시려면 회원가입해 주세요. | `screens/login.html:106` | 나만의 취향을 찾아 떠나는 여행, 센트립 | qa/screens/login-1440-dev.png | all |
| F004 | P0 | 혜택 목록 1번 문구 불일치 | https://scentrip.vercel.app/login — 혜택 목록 1번째 li | 향 취향 검사 결과를 저장해요 | `screens/login.html:109` | 나의 향 취향에 맞는 여행지 추천 | qa/screens/login-1440-dev.png | all |
| F005 | P0 | 혜택 목록 2번 문구 불일치 | https://scentrip.vercel.app/login — 혜택 목록 2번째 li | 마음에 드는 여행지를 찜해요 | `screens/login.html:110` | 마음에 드는 장소와 동선 저장 | qa/screens/login-1440-dev.png | all |
| F006 | P0 | 혜택 목록 3번 문구 불일치 | https://scentrip.vercel.app/login — 혜택 목록 3번째 li | 나만의 여행 동선을 만들고 저장해요 | `screens/login.html:111` | AI로 만드는 나만의 여행 동선 | qa/screens/login-1440-dev.png | all |
| F007 | P0 | 혜택 목록 aria-label 누락 | https://scentrip.vercel.app/login — 혜택 목록 ul | aria-label="로그인하면 할 수 있어요" | `screens/login.html:108` | aria-label 없음 | qa/raw/login-1440-dev.html | all |
| F290 | P0 | 로그인 오류 안내 문구 불일치 — cancel | https://scentrip.vercel.app/login?error=cancel — Google 버튼 위 알림(role=alert) | 경고 박스 제목 'Google 로그인이 취소되었습니다. 다시 시도해 주세요.' | `screens/login.html:157, 206` | '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) | qa/screens/login-error-cancel-1440-dev.png | all |
| F291 | P0 | 로그인 오류 안내 문구 불일치 — expired | https://scentrip.vercel.app/login?error=expired — Google 버튼 위 알림(role=alert) | 경고 박스 제목 '로그인 시간이 만료되었습니다. 다시 로그인해 주세요.' | `screens/login.html:158, 206` | '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) | qa/screens/login-error-expired-1440-dev.png | all |
| F292 | P0 | 로그인 오류 안내 문구 불일치 — failed | https://scentrip.vercel.app/login?error=failed — Google 버튼 위 알림(role=alert) | 경고 박스 제목 'Google 계정을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.' | `screens/login.html:159, 206` | '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) | qa/screens/login-error-failed-1440-dev.png | all |
| F293 | P0 | 로그인 오류 안내 문구 불일치 — network | https://scentrip.vercel.app/login?error=network — Google 버튼 위 알림(role=alert) | 경고 박스 제목 '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' | `screens/login.html:160, 206` | '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) | qa/screens/login-error-network-1440-dev.png | all |
| F294 | P0 | 로그인 오류 안내 문구 불일치 — noemail | https://scentrip.vercel.app/login?error=noemail — Google 버튼 위 알림(role=alert) | 경고 박스 제목 '이메일 제공에 동의해 주셔야 가입할 수 있어요.' + 설명 '센트립은 계정 확인과 중요한 안내를 위해 이메일을 사용해요. 다시 로그인하면서 이메일 제공에 동의해 주세요.' | `screens/login.html:161, 206` | '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) | qa/screens/login-error-noemail-1440-dev.png | all |
| F295 | P0 | 로그인 오류 안내 문구 불일치 — suspended | https://scentrip.vercel.app/login?error=suspended — Google 버튼 위 알림(role=alert) | 경고 박스 제목 '이용이 제한된 계정이에요.' + 설명 '제한 사유와 해제 방법은 info.scentrip@gmail.com 으로 문의해 주세요.' | `screens/login.html:162, 206` | '인증을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.' (모든 오류 공통) | qa/screens/login-error-suspended-1440-dev.png | all |
| F008 | 원본에없음 | Google 버튼 아래 안내·약관 링크 | https://scentrip.vercel.app/login — main > section > p.mt-6.text-[12px] | (원본에 없음) | `screens/login.html:125-129` | '처음이라면 Google 계정으로 시작할 수 있어요.' + 이용약관 · 개인정보처리방침 링크 | qa/screens/login-1440-dev.png | all |

## 회원가입

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F270 | P0 | document title 불일치 | https://scentrip.vercel.app/signup — <title> | Scentrip — 회원가입 | `screens/signup.html:6` | Scentrip | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F271 | P0 | Google 계정 칩 구성 불일치 (아바타·이름 누락, 인증 표기) | https://scentrip.vercel.app/signup — 설명 아래 계정 박스 | 아바타 + 이름(굵게) + 이메일 / 오른쪽 G 로고 + '인증 완료' | `screens/signup.html:168-173` | 이메일 + 아래 줄 'Google 계정 인증 완료' (아바타·이름·G 로고 없음) | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F272 | P0 | '약관 동의' 그룹 제목 누락 | https://scentrip.vercel.app/signup — 약관 체크 목록 위 | legend 약관 동의 | `screens/signup.html:177` | 없음 | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F273 | P0 | 약관 전문 링크 라벨 '보기' → '전문 보기' | https://scentrip.vercel.app/signup — 이용약관·개인정보 행 우측 | '보기' (aria-label '이용약관 전문 보기' / '개인정보 수집 및 이용 전문 보기') | `screens/signup.html:194, 202` | '전문 보기' (aria-label 없음) | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F274 | P0 | 약관 전문이 모달이 아닌 새 탭으로 열림 | https://scentrip.vercel.app/signup — '전문 보기' 클릭 | 모달(제목 '이용약관' / '개인정보 수집 및 이용', 본문 iframe, [닫기] [동의하기] — 동의하기 누르면 해당 항목 체크) | `screens/signup.html:244-255, 377-387` | 새 탭으로 /terms · /privacy 이동 (target=_blank) | qa/screens/signup-legal-terms-1440-design.png | all |
| F275 | P0 | 닉네임 입력 placeholder 누락 | https://scentrip.vercel.app/signup — 닉네임 input | 2~12자 · 한글, 영문, 숫자 | `screens/signup.html:214` | placeholder 없음 | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F276 | P0 | 닉네임 기본 안내 문구 불일치 | https://scentrip.vercel.app/signup — 닉네임 입력 아래 안내 | 프로필과 리뷰에 표시돼요. | `screens/signup.html:215` | 2~12자의 한글, 영문, 숫자를 사용할 수 있어요. 영문 대소문자 구분 없이 중복된 닉네임은 사용할 수 없어요. | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F277 | P0 | 닉네임 검증 문구 누락 — '닉네임을 입력해 주세요' | https://scentrip.vercel.app/signup — 닉네임 입력 아래 (비운 채로 포커스 이동) | '닉네임을 입력해 주세요' (오류는 빨간 경고 아이콘 + aria-invalid=true) | `screens/signup.html:312-322` | 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 | qa/screens/signup-A-02-blur-empty-1440-dev.png | all |
| F278 | P0 | 닉네임 검증 문구 누락 — '2자 이상 입력해 주세요' | https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('가' 입력) | '2자 이상 입력해 주세요' (오류는 빨간 경고 아이콘 + aria-invalid=true) | `screens/signup.html:312-322` | 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 | qa/screens/signup-A-03-one-char-1440-dev.png | all |
| F279 | P0 | 닉네임 검증 문구 누락 — '한글, 영문, 숫자만 쓸 수 있어요' | https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('ab!' 입력) | '한글, 영문, 숫자만 쓸 수 있어요' (오류는 빨간 경고 아이콘 + aria-invalid=true) | `screens/signup.html:312-322` | 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 | qa/screens/signup-A-05-special-1440-dev.png | all |
| F280 | P0 | 닉네임 검증 문구 누락 — '공백은 한 칸만 쓸 수 있어요' | https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('ab  cd' 입력) | '공백은 한 칸만 쓸 수 있어요' (오류는 빨간 경고 아이콘 + aria-invalid=true) | `screens/signup.html:312-322` | 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 | qa/screens/signup-A-06-double-space-1440-dev.png | all |
| F281 | P0 | 닉네임 검증 문구 누락 — '이미 사용 중인 닉네임이에요' | https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('향기' 입력 (원본 샘플 중복 목록)) | '이미 사용 중인 닉네임이에요' (오류는 빨간 경고 아이콘 + aria-invalid=true) | `screens/signup.html:312-322` | 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 | qa/screens/signup-A-09-taken-1440-dev.png | all |
| F282 | P0 | 닉네임 검증 문구 누락 — '사용할 수 있는 닉네임이에요' | https://scentrip.vercel.app/signup — 닉네임 입력 아래 ('qa검수A' 입력 (성공 표시, 체크 아이콘)) | '사용할 수 있는 닉네임이에요' (오류는 빨간 경고 아이콘 + aria-invalid=true) | `screens/signup.html:312-322` | 문구 없음 — 기본 안내문 그대로, aria-invalid 없음 | qa/screens/signup-A-10-valid-1440-dev.png | all |
| F283 | P0 | 닉네임 12자 초과 처리 불일치 (입력 차단 vs 오류 안내) | https://scentrip.vercel.app/signup — 닉네임에 13자 입력 | 13자까지 입력되고 카운터 '13/12'(초과 색) + '12자 이하로 입력해 주세요' | `screens/signup.html:316, 326` | maxlength=12로 12자에서 입력 차단, 안내 없음 | qa/screens/signup-A-04-13chars-1440-dev.png | all |
| F284 | P0 | 금칙어 검증 문구 불일치 | https://scentrip.vercel.app/signup — 'admin' / '센트립' 입력 | 사용할 수 없는 단어가 들어 있어요 | `screens/signup.html:319-320` | 운영자로 오해할 수 있는 이름이나 부적절한 표현은 사용할 수 없어요. | qa/screens/signup-A-07-banned-1440-dev.png | all |
| F285 | P0 | 가입 버튼 진행 중 라벨 불일치 | https://scentrip.vercel.app/signup — '가입 완료하기' 클릭 직후 | 가입하는 중... (스피너) | `screens/signup.html:342` | 가입 내용 저장 중 | qa/00-page-map.md 0-7 (계정 A 가입 기록) | all |
| F287 | P0 | 가입 완료 화면 미구현 (검사 결과 없는 경우) | https://scentrip.vercel.app/signup — 가입 완료하기 성공 후 | 체크 아이콘 + '{닉네임}님, 가입을 환영해요' / '12문항 향 취향 검사로 나에게 맞는 향과 여행지를 찾아볼까요?' / [향 취향 검사 시작하기] [나중에 할게요] | `screens/signup.html:232-240, 368-374` | 완료 화면 없이 /dashboard로 바로 이동 + 튜토리얼 | qa/screens/signup-done-no-result-1440-design.png | all |
| F288 | P0 | 가입 완료 화면 미구현 (가입 전 검사 결과 있는 경우) | https://scentrip.vercel.app/signup — 비회원 검사 → 가입하고 여행지 추천받기 → 가입 완료 | '{닉네임}님, 가입을 환영해요' / '가입 전에 한 향 취향 검사 결과를 계정에 저장했어요. 이제 취향에 맞는 여행지를 둘러보세요.' / [추천 여행지 보러 가기] [나중에 할게요] | `screens/signup.html:368-375` | 완료 화면 없이 /dashboard로 바로 이동 (계정 B 확인) | qa/screens/signup-done-with-result-1440-design.png | all |
| F289 | 확인필요 | 중복 닉네임 검사 시점 | https://scentrip.vercel.app/signup — '향기' 등 이미 쓰는 닉네임 | 입력 즉시 '이미 사용 중인 닉네임이에요' | `screens/signup.html:321` | 입력 단계에서 안내 없음. 제출 시 서버 검사 여부는 실제 가입이 될 위험이 있어 미확인 | qa/screens/signup-A-09-taken-1440-dev.png | all |
| F286 | 원본에없음 | 가입 화면 하단 '로그아웃' 버튼 | https://scentrip.vercel.app/signup — 가입 완료하기 아래 | (원본에 없음) | `screens/signup.html:224-229` | [→ 로그아웃] | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |

## 취향 테스트

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F011 | P0 | document title 불일치 | https://scentrip.vercel.app/taste — <title> | Scentrip — 취향 테스트 (진행 · 로딩 · 결과) | `screens/onboarding-test.html:6` | Scentrip | qa/screens/taste-intro-guest-1440-dev.png | all |
| F012 | P0 | 표지 상단 소제목 불일치 | https://scentrip.vercel.app/taste — main.scent-intro > section > p (첫 번째) | 여행 취향 테스트 | `screens/onboarding-test.html:1235` | SCENTRIP TASTE | qa/screens/taste-intro-guest-1440-dev.png | all |
| F013 | P0 | 표지 설명 문구 불일치 | https://scentrip.vercel.app/taste — 표지 h1 아래 설명 p | 12개의 질문으로 당신의 여행 취향을 분석해,<br>16가지 향(香) 유형 중 당신의 유형을 찾아드려요. | `screens/onboarding-test.html:1250` | 열두 개의 여행 장면을 고르면 네 가지 감각이 만나<br>나만의 향 타입과 어울리는 여행을 알려드려요. | qa/screens/taste-intro-guest-1440-dev.png | all |
| F014 | P0 | 시작 버튼 라벨 불일치 | https://scentrip.vercel.app/taste — 표지 시작 button | 테스트 시작하기 | `screens/onboarding-test.html:1251` | 취향 테스트 시작 | qa/screens/taste-intro-guest-1440-dev.png | all |
| F224 | P0 | 01번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 01번 문항 선택지 2번(B) | 설명 "가슴속까지 뻥 뚫리듯 시원하고 정신이 번쩍 들게 만드는" / 키워드 "청량한 공기" | `screens/onboarding-test.html:1381` | 설명 "가슴속까지 뻥 뚫리듯 정신이 번쩍 들게 만드는" / 키워드 "시원하고 청량한 공기" | qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png | all |
| F225 | P0 | 02번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 02번 문항 선택지 1번(A) | 설명 "볕에 잘 말려 온기가 남아있는" / 키워드 "몸을 폭 감싸주는 두툼한 이불" | `screens/onboarding-test.html:1384` | 설명 "볕에 잘 말려 온기가 남아 있고 몸을 포근하게 감싸주는" / 키워드 "두툼하고 따뜻한 이불" | qa/screens/taste-A-member-first-WHAN-q02-1440-dev.png | all |
| F226 | P0 | 03번 문항 질문 문구 불일치 | https://scentrip.vercel.app/taste — 03번 문항 질문 제목 | 여행지에서 만난 로컬 주민이<br>따뜻한 환대의 의미로 음료를 건넨다면? | `screens/onboarding-test.html:1387` | 여행지에서 만난 로컬 주민이 환대의 의미로 음료를 건넨다면 더 반가운 것은? | qa/screens/taste-A-member-first-WHAN-q03-1440-dev.png | all |
| F227 | P0 | 03번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 03번 문항 선택지 1번(A) | 설명 "김이 모락모락 피어오르는, 고소하고 부드러운" / 키워드 "우유를 넣은 로컬 차" | `screens/onboarding-test.html:1388` | 설명 "김이 모락모락 피어오르고 고소한 우유가 부드럽게 어우러진" / 키워드 "따뜻한 로컬 차" | qa/screens/taste-A-member-first-WHAN-q03-1440-dev.png | all |
| F228 | P0 | 03번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 03번 문항 선택지 2번(B) | 설명 "얼음이 짤랑거리는, 가볍고 청량하게 목을 축여주는" / 키워드 "시원한 청과 에이드" | `screens/onboarding-test.html:1389` | 설명 "얼음이 짤랑거리고 가볍고 청량하게 목을 축여주는" / 키워드 "시원한 청과 에이드" | qa/screens/taste-A-member-first-WHAN-q03-1440-dev.png | all |
| F229 | P0 | 04번 문항 상황 라벨 불일치 | https://scentrip.vercel.app/taste — 04번 문항 상단 라벨 | 짐 짜기 | `screens/onboarding-test.html:1391` | 짐 꾸리기 | qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png | all |
| F230 | P0 | 04번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 04번 문항 선택지 1번(A) | 설명 "피부 깊숙이 스며들어 시간이 지날수록 깊은 잔향을 남기는" / 키워드 "존재감 있는 묵직한 향" | `screens/onboarding-test.html:1393` | 설명 "피부 깊숙이 스며들어 시간이 지날수록 잔향이 깊어지는" / 키워드 "묵직하고 존재감 있는 향" | qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png | all |
| F231 | P0 | 04번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 04번 문항 선택지 2번(B) | 설명 "걸을 때마다 바람을 타고 은은하게 스쳐 가는" / 키워드 "가볍고 산뜻한 향" | `screens/onboarding-test.html:1394` | 설명 "걸을 때마다 바람을 타고 은은하게 스쳐 가는" / 키워드 "가볍고 산뜻한 인상의 향" | qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png | all |
| F232 | P0 | 04번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 04번 문항 선택지 카드 순서 | 1번 "존재감 있는 묵직한 향" · 2번 "가볍고 산뜻한 향" | `screens/onboarding-test.html:1393-1394, 1839` | 1번 "묵직하고 존재감 있는 향" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q04-1440-dev.png | all |
| F233 | P0 | 05번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 05번 문항 선택지 1번(A) | 설명 "발걸음을 차분하게 늦추며 깊은 사색에 잠기게 만드는" / 키워드 "묵직한 첼로 연주나 재즈" | `screens/onboarding-test.html:1397` | 설명 "발걸음을 차분하게 늦추며 깊은 사색에 잠기게 하는" / 키워드 "묵직한 첼로 연주와 재즈" | qa/screens/taste-A-member-first-WHAN-q05-1440-dev.png | all |
| F234 | P0 | 05번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 05번 문항 선택지 2번(B) | 설명 "발걸음을 가볍게 만들어 주는" / 키워드 "경쾌한 어쿠스틱 기타나 시티팝" | `screens/onboarding-test.html:1398` | 설명 "발걸음을 가볍게 만들어 주는" / 키워드 "경쾌한 기타 선율과 시티팝" | qa/screens/taste-A-member-first-WHAN-q05-1440-dev.png | all |
| F235 | P0 | 05번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 05번 문항 선택지 카드 순서 | 1번 "묵직한 첼로 연주나 재즈" · 2번 "경쾌한 어쿠스틱 기타나 시티팝" | `screens/onboarding-test.html:1397-1398, 1839` | 1번 "묵직한 첼로 연주와 재즈" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q05-1440-dev.png | all |
| F236 | P0 | 06번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 06번 문항 선택지 1번(A) | 설명 "어두운 톤의 원목과 짙은 유화 작품들이 배치된" / 키워드 "깊이감과 중후함이 느껴지는 공간" | `screens/onboarding-test.html:1401` | 설명 "어두운 원목과 짙은 유화 작품이 깊이감을 만드는" / 키워드 "중후하고 묵직한 공간" | qa/screens/taste-A-member-first-WHAN-q06-1440-dev.png | all |
| F237 | P0 | 06번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 06번 문항 선택지 2번(B) | 설명 "여백이 많고 파스텔톤 컬러가 어우러진" / 키워드 "경쾌하고 산뜻한 공간" | `screens/onboarding-test.html:1402` | 설명 "여백과 파스텔톤 컬러가 어우러져" / 키워드 "경쾌하고 산뜻한 공간" | qa/screens/taste-A-member-first-WHAN-q06-1440-dev.png | all |
| F238 | P0 | 06번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 06번 문항 선택지 카드 순서 | 1번 "깊이감과 중후함이 느껴지는 공간" · 2번 "경쾌하고 산뜻한 공간" | `screens/onboarding-test.html:1401-1402, 1839` | 1번 "중후하고 묵직한 공간" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q06-1440-dev.png | all |
| F239 | P0 | 07번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 07번 문항 선택지 1번(A) | 설명 "아침 이슬이나 안개를 흠뻑 머금어 푹신하게 가라앉은" / 키워드 "촉촉한 이끼와 흙길" | `screens/onboarding-test.html:1406` | 설명 "아침 이슬과 안개를 머금어 푹신하게 가라앉은" / 키워드 "촉촉한 이끼와 흙길" | qa/screens/taste-A-member-first-WHAN-q07-1440-dev.png | all |
| F240 | P0 | 07번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 07번 문항 선택지 2번(B) | 설명 "햇살 아래 바짝 말라 발을 디딜 때마다 바스락 소리를 내는" / 키워드 "낙엽 가득한 마른 길" | `screens/onboarding-test.html:1407` | 설명 "햇살 아래 바짝 말라 발을 디딜 때마다 바스락 소리를 내는" / 키워드 "낙엽이 가득한 길" | qa/screens/taste-A-member-first-WHAN-q07-1440-dev.png | all |
| F241 | P0 | 07번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 07번 문항 선택지 카드 순서 | 1번 "촉촉한 이끼와 흙길" · 2번 "낙엽 가득한 마른 길" | `screens/onboarding-test.html:1406-1407, 1839` | 1번 "촉촉한 이끼와 흙길" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q07-1440-dev.png | all |
| F242 | P0 | 08번 문항 질문 문구 불일치 | https://scentrip.vercel.app/taste — 08번 문항 질문 제목 | 카페에서 곁들인<br>디저트 한 입의 감촉은? | `screens/onboarding-test.html:1409` | 카페에서 곁들인 디저트 한 입, 더 기분 좋은 감촉은? | qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png | all |
| F243 | P0 | 08번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 08번 문항 선택지 1번(A) | 설명 "베어 물면 촉촉하게 녹아내리는" / 키워드 "과즙 가득한 타르트·푸딩" | `screens/onboarding-test.html:1410` | 설명 "베어 물면 촉촉하게 녹아내리는" / 키워드 "과즙 가득한 타르트와 푸딩" | qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png | all |
| F244 | P0 | 08번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 08번 문항 선택지 2번(B) | 설명 "입안에서 바스러지듯 부서지는" / 키워드 "바삭하고 담백한 스콘·비스킷" | `screens/onboarding-test.html:1411` | 설명 "입안에서 바스러지듯 부서지는" / 키워드 "바삭하고 담백한 스콘" | qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png | all |
| F245 | P0 | 08번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 08번 문항 선택지 카드 순서 | 1번 "과즙 가득한 타르트·푸딩" · 2번 "바삭하고 담백한 스콘·비스킷" | `screens/onboarding-test.html:1410-1411, 1839` | 1번 "과즙 가득한 타르트와 푸딩" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q08-1440-dev.png | all |
| F246 | P0 | 09번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 09번 문항 선택지 1번(A) | 설명 "물기를 머금은 듯 빛나는" / 키워드 "촉촉하게 윤기가 도는 피부" | `screens/onboarding-test.html:1414` | 설명 "촉촉하게 윤기가 돌아 물기를 머금은 듯" / 키워드 "은은하게 빛나는 피부" | qa/screens/taste-A-member-first-WHAN-q09-1440-dev.png | all |
| F247 | P0 | 09번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 09번 문항 선택지 2번(B) | 설명 "산뜻하게 마무리된" / 키워드 "보송하고 매트한 피부" | `screens/onboarding-test.html:1415` | 설명 "보송하고 매트하게 정돈되어" / 키워드 "산뜻하게 마무리된 피부" | qa/screens/taste-A-member-first-WHAN-q09-1440-dev.png | all |
| F248 | P0 | 09번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 09번 문항 선택지 카드 순서 | 1번 "촉촉하게 윤기가 도는 피부" · 2번 "보송하고 매트한 피부" | `screens/onboarding-test.html:1414-1415, 1839` | 1번 "은은하게 빛나는 피부" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q09-1440-dev.png | all |
| F249 | P0 | 10번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 10번 문항 선택지 1번(A) | 설명 "덩굴이 자유롭게 벽을 타고 풀들이 제멋대로 우거진" / 키워드 "깊은 산속의 야생 정원" | `screens/onboarding-test.html:1419` | 설명 "덩굴이 자유롭게 벽을 타고 풀이 제멋대로 우거진" / 키워드 "깊은 산속의 야생 정원" | qa/screens/taste-A-member-first-WHAN-q10-1440-dev.png | all |
| F250 | P0 | 10번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 10번 문항 선택지 2번(B) | 설명 "조경사의 손길로 대칭을 이루고 깔끔하게 전정된" / 키워드 "유럽식 분수 정원" | `screens/onboarding-test.html:1420` | 설명 "정교한 손길로 대칭을 이루고 깔끔하게 전정된" / 키워드 "유럽식 분수 정원" | qa/screens/taste-A-member-first-WHAN-q10-1440-dev.png | all |
| F251 | P0 | 10번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 10번 문항 선택지 카드 순서 | 1번 "깊은 산속의 야생 정원" · 2번 "유럽식 분수 정원" | `screens/onboarding-test.html:1419-1420, 1839` | 1번 "깊은 산속의 야생 정원" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q10-1440-dev.png | all |
| F252 | P0 | 11번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 11번 문항 선택지 1번(A) | 설명 "가공되지 않아 거친 나뭇결과 옹이가 살아있는" / 키워드 "통원목·자연석 오브제" | `screens/onboarding-test.html:1423` | 설명 "거친 나뭇결과 옹이가 그대로 살아 있는" / 키워드 "통원목과 자연석 오브제" | qa/screens/taste-A-member-first-WHAN-q11-1440-dev.png | all |
| F253 | P0 | 11번 문항 선택지 2번(B) 문구 불일치 | https://scentrip.vercel.app/taste — 11번 문항 선택지 2번(B) | 설명 "매끄럽게 마감된 메탈이나 도자기처럼 정교한" / 키워드 "세련된 오브제" | `screens/onboarding-test.html:1424` | 설명 "메탈이나 도자기처럼 정교하고 매끄럽게 가공된" / 키워드 "세련된 오브제" | qa/screens/taste-A-member-first-WHAN-q11-1440-dev.png | all |
| F254 | P0 | 11번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 11번 문항 선택지 카드 순서 | 1번 "통원목·자연석 오브제" · 2번 "세련된 오브제" | `screens/onboarding-test.html:1423-1424, 1839` | 1번 "통원목과 자연석 오브제" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q11-1440-dev.png | all |
| F255 | P0 | 12번 문항 선택지 1번(A) 문구 불일치 | https://scentrip.vercel.app/taste — 12번 문항 선택지 1번(A) | 설명 "크라프트지에 마끈으로 툭 묶어 무심한 듯" / 키워드 "자연스러운 미학이 살아있는 포장" | `screens/onboarding-test.html:1427` | 설명 "크라프트지에 마끈으로 툭 묶어 자연스러운 미학이 살아 있는" / 키워드 "소박한 수작업 포장" | qa/screens/taste-A-member-first-WHAN-q12-1440-dev.png | all |
| F256 | P0 | 12번 문항 선택지 순서 뒤바뀜 | https://scentrip.vercel.app/taste — 12번 문항 선택지 카드 순서 | 1번 "자연스러운 미학이 살아있는 포장" · 2번 "모던한 패키징" | `screens/onboarding-test.html:1427-1428, 1839` | 1번 "소박한 수작업 포장" 쪽이 오른쪽(2번)에 표시 | qa/screens/taste-A-member-first-WHAN-q12-1440-dev.png | all |
| F258 | P0 | 선택지 카드 번호 표시(1 / 2) 누락 | https://scentrip.vercel.app/taste — 선택지 카드 좌상단 | 카드마다 번호 힌트 '1', '2' | `screens/onboarding-test.html:1841` | 번호 없음 | qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png | all |
| F259 | P0 | 이전 질문 버튼 라벨·위치 불일치 | https://scentrip.vercel.app/taste — 2번 문항부터 | 진행 점 아래 텍스트 버튼 '← 이전 질문' | `screens/onboarding-test.html:1267` | 좌상단 아이콘 버튼(aria-label·title '이전 질문', 텍스트 없음) | qa/screens/taste-A-member-first-WHAN-q02-1440-dev.png | all |
| F260 | P0 | 진행 표시 aria-label 불일치 | https://scentrip.vercel.app/taste — 하단 진행 점 progressbar | 설문 진행률 | `screens/onboarding-test.html:1266` | 12개 질문 중 N번째 | qa/raw/taste-A-member-first-WHAN-q01-1440-dev.json | all |
| F261 | P0 | 로딩 화면 문구 불일치 (3단계 순환 → 고정 제목·설명) | https://scentrip.vercel.app/taste — 12번 응답 직후 로딩 | 향이 피어오르는 연출 + 축 단계(온도·무게·수분감·자연도) + 문구 순환 '12개의 답을 향으로 옮기고 있어요' → '탑 · 미들 · 베이스를 쌓고 있어요' → '당신의 향이 피어오르고 있어요' | `screens/onboarding-test.html:1272-1290, 1906-1910` | 아이콘 + 제목 '당신만의 여행 향을 찾고 있어요' + 설명 '12개의 장면에 남은 감각을 천천히 엮는 중입니다.' (문구 변화·축 단계 없음) | qa/screens/taste-A-member-first-WHAN-loading-1440-dev.png | all |
| F262 | P0 | 결과 — 4축 막대 라벨에 % 표기 추가 | https://scentrip.vercel.app/taste — 결과 여행자 프로필 4축 막대 | 양 끝 라벨만(예: 시원함 ··· 따뜻함), 퍼센트 없음 | `screens/onboarding-test.html:2030-2044` | 이긴 쪽 라벨에 '100%' (예: 따뜻함 100%) + aria-label '온도: 따뜻함 100%' | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F263 | P0 | 결과 — 향 한 줄 인용문 앞뒤 따옴표 추가 | https://scentrip.vercel.app/taste — 결과 향 피라미드 아래 인용 | 오래된 오크와 누룩 향이 깊어질수록, 당신의 여행도 천천히 익어갑니다. (따옴표 없음) | `screens/onboarding-test.html:1340, 2019` | “오래된 오크와 누룩 향이 깊어질수록, 당신의 여행도 천천히 익어갑니다.” | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F264 | P0 | 결과 — 추천 여행지 섹션 제목 불일치 | https://scentrip.vercel.app/taste — 결과 추천 여행지 h2 | 센트립 추천 여행지 | `screens/onboarding-test.html:1344` | Scentrip 추천 여행지 | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F266 | P0 | 결과 — 추천 여행지 카드 무드가 내 유형과 다름 | https://scentrip.vercel.app/taste — 추천 여행지 카드 보조 줄 | '{내 유형 무드} · {계절}' (예: WHAN → 빈티지 우디 · 가을, CLDR → 코튼 머스크 · 초봄) | `screens/onboarding-test.html:1344-1347` | WHAN 결과에 '플로럴 · 가을', CLDR 결과에 '메탈릭 · 초봄' | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F267 | P0 | 결과 CTA(가입 후 첫 검사) 제목·설명·버튼 불일치 | https://scentrip.vercel.app/taste — 회원 첫 검사 결과 하단 CTA | '내 취향의 여행 장소를 더 만나보세요' / '당신의 취향에 꼭 맞는 추천 여행지가 준비됐어요. 지금 바로 둘러보세요.' / [여행지 둘러보기] [다시 검사하기] | `screens/onboarding-test.html:2151-2157` | 'qa검수A님 취향의 여행 장소를 더 만나보세요' / '이 취향을 바탕으로 나만의 여행 동선을 만들어 보세요.' / [내 여행에서 추천 보기] [다시 검사하기] | qa/screens/taste-A-member-first-WHAN-result-1440-dev.png | all |
| F268 | P0 | 결과 CTA(비회원) 설명 문구 불일치 | https://scentrip.vercel.app/taste (비로그인) — 결과 하단 CTA 설명 | 가입하면 취향에 꼭 맞는 여행지를 홈·탐색에서 계속 추천받고, 이 결과도 프로필에 저장돼요. | `screens/onboarding-test.html:2144` | 가입하면 취향에 꼭 맞는 여행지를 계속 추천받고, 이 결과도 프로필에 저장돼요. ('홈·탐색에서' 누락) | qa/screens/taste-B-guest-CLDR-result-1440-dev.png | all |
| F305 | P0 | 결과 — 유형 한 줄 요약 문구 불일치 (16유형 전부) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 히어로 별칭 아래 한 줄 | 원본 TYPES 요약 (예: WHAN '시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자', CHAN '시원한 공기 속 깊은 감정을 품은 여행자') — 16유형 대조표 qa/01-text.md | `screens/onboarding-test.html:1445-1800 (TYPES)` | (예: WHAN '시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자입니다', CHAN '시원한 공기 속 깊은 감정을 품었습니다') | qa/screens/taste-type-CHAN-1440-dev.png | all |
| F306 | P0 | 결과 — 여행자 프로필 문단 불일치 (16유형 전부) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 여행자 프로필 본문 | 원본 프로필 '당신은 …' 문단 (예: WHAN '당신은 새것의 화려함보다 시간이 쌓인 것의 깊이에 끌리는 사람이에요. 여행에서도 이름난 명소보다 세월이 밴 …') | `screens/onboarding-test.html:1445-1800 (TYPES)` | 요약 문장을 반복하는 문단 (예: WHAN '시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자입니다. 반짝이는 신도시보다 오래된 골목을, 세련…') | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F307 | P0 | 결과 — 여행 행동 패턴 문구·어미 불일치 (16유형 전부) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 여행 행동 패턴 4줄 | '~해요' 체 (예: WHAN ['관광지보다 오래된 골목을 먼저 찾아요', '유명 카페보다 로컬 노포에 관심이 많아요', '여행 중 사진보다 분위기를 기억해요', '여행 후 장소와 역사, 사람 이야기를 기억해요']) | `screens/onboarding-test.html:1445-1800 (TYPES)` | '~함' 명사형 (예: WHAN ['관광지보다 오래된 골목을 먼저 찾음', '유명 카페보다 로컬 노포에 관심이 많음', '여행 중 사진보다 분위기를 기억함', '여행 후 가장 기억하는 것은 장소의 역사와 사람 이야기']) | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F308 | P0 | 결과 — 연상되는 향 TOP·MIDDLE·BASE 불일치 (16유형 전부) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 향 피라미드 | 원본 피라미드 (예: WHAN ['솔잎', '한옥 나무결', '오래된 오크통'], CLDR ['비누 거품', '코튼', '화이트 머스크']) | `screens/onboarding-test.html:1800-1821 (PYRAMID)` | (예: WHAN ['오래된 오크통', '젖은 흙', '전통 한옥의 나무결'], CLDR ['화이트 린넨', '깨끗한 머스크', '은은한 샌달우드']) | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F309 | P0 | 결과 — 향 라벨 이모지 불일치 (4유형) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 히어로 향 라벨 | WHAN 🪵 · WHDN 💼 · WLAN 🌳 · CHDR 📕 | `screens/onboarding-test.html:1445-1800 (TYPES emoji)` | WHAN 🌳 · WHDN 🧳 · WLAN 🌲 · CHDR 📚 | qa/screens/taste-type-WHDN-1440-dev.png | all |
| F310 | P0 | 결과 — '이런 공간을 좋아해요' 항목 문구 불일치 (2유형 3항목) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 이런 공간을 좋아해요 | WHAN '전통주가 익어가는 양조장 숙성고' / WHAR '빈티지 샹들리에가 있는 티룸', '근대 건축을 리모델링한 카페' | `screens/onboarding-test.html:1445-1800 (TYPES spaces)` | WHAN '전통주 양조장 숙성고' / WHAR '빈티지 샹들리에 티룸', '근대 건축을 고친 카페' | qa/screens/taste-type-WHAR-1440-dev.png | all |
| F311 | P0 | 결과 — '이런 여행을 좋아해요' 항목 문구 불일치 (2유형) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 이런 여행을 좋아해요 | WHAN '전통주·발효음식처럼 시간이 만든 맛 경험하기' / WHDN '산골 마을과 폐광 마을 탐험하기' | `screens/onboarding-test.html:1445-1800 (TYPES trips)` | WHAN '…시간이 만든 맛을 경험하기' / WHDN '산골 마을과 오래된 폐광 마을 탐험하기' | qa/screens/taste-type-WHDN-1440-dev.png | all |
| F312 | P0 | 결과 — 4축 막대 양 끝 라벨 좌우 순서 반대 (16유형 전부) | https://scentrip.vercel.app/taste — 결과 화면 (16유형 전부 비회원 응답으로 확인) 여행자 프로필 4축 막대 | 왼쪽 앞 글자 성향 · 오른쪽 뒷 글자 (따뜻함 \| 시원함 · 묵직함 \| 가벼움 · 수분감 \| 건조함 · 자연감 \| 정돈감) | `screens/onboarding-test.html:1434-1439, 2030-2040` | 왼쪽 시원함 \| 오른쪽 따뜻함 · 가벼움 \| 묵직함 · 건조함 \| 수분감 · 정돈감 \| 자연감 | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F015 | 원본에없음 | 시작 버튼 아래 '약 1분 · 12개 질문' | https://scentrip.vercel.app/taste — 시작 버튼 다음 텍스트 | (원본에 없음) | `screens/onboarding-test.html:1251` | 약 1분 · 12개 질문 | qa/screens/taste-intro-guest-1440-dev.png | all |
| F016 | 원본에없음 | 취향 테스트 화면의 언어 선택 | https://scentrip.vercel.app/taste — div.fixed.right-4.top-4 > select | (원본 onboarding-test.html은 lang.js를 불러오지 않아 언어 버튼 없음) | `screens/onboarding-test.html:1215-1220` | 우상단 고정 언어 select | qa/screens/taste-intro-guest-1440-dev.png | all |
| F257 | 원본에없음 | 문항 화면 상단 상황 라벨(예: 여행의 시작) 노출 | https://scentrip.vercel.app/taste — 문항 번호 위 라벨 | (원본 문항 화면은 번호 + 질문 + 선택지, 상황 라벨 미노출) | `screens/onboarding-test.html:1256-1270` | '여행의 시작' 등 라벨 노출 | qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png | all |
| F265 | 원본에없음 | 결과 — 추천 여행지 안내 문구 '네 가지 취향 축의 유사도입니다…' | https://scentrip.vercel.app/taste — 추천 여행지 제목 아래 | (원본에 없음) | `screens/onboarding-test.html:1344-1347` | 네 가지 취향 축의 유사도입니다. 만족도를 보장하는 확률은 아닙니다. | qa/screens/taste-type-WHAN-1440-dev.png | all |
| F269 | 원본에없음 | 결과 CTA(비회원) '이 기기의 현재 결과 삭제' 버튼 | https://scentrip.vercel.app/taste (비로그인) — 결과 하단 CTA | (원본 비회원 CTA: 가입하고 여행지 추천받기 · 다시 검사하기) | `screens/onboarding-test.html:2142-2149` | 이 기기의 현재 결과 삭제 버튼 추가 | qa/screens/taste-B-guest-CLDR-result-1440-dev.png | all |

## 홈

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F017 | P0 | document title 불일치 | https://scentrip.vercel.app/ — <title> | Scentrip — 홈 | `screens/home.html:6` | Scentrip | qa/screens/home-member-1440-dev.png | all |
| F018 | P0 | 여행 소식 섹션 제목 불일치 (회원) | https://scentrip.vercel.app/ — 취향 카드 오른쪽 소식 영역 h2 | {닉네임}님을 위한 여행 소식 (예: 이서연님을 위한 여행 소식) | `screens/home.html:377` | 지금 어울리는 여행 소식 | qa/screens/home-member-1440-dev.png | all |
| F019 | P0 | 여행 소식 '전체 보기' 링크 띄어쓰기 | https://scentrip.vercel.app/ — 소식 영역 우측 링크 | 전체 보기 | `screens/home.html:379` | 전체보기 | qa/screens/home-member-1440-dev.png | all |
| F020 | P0 | 소식 항목 메타 정보 불일치 (날짜 누락, 장소 수 추가) | https://scentrip.vercel.app/ — 소식 목록 각 항목 하단 메타 | [카테고리 태그] [날짜 YYYY.MM.DD] (예: 오래된 목조 2026.08.06) | `screens/home.html:546` | 태그 · 장소 N곳 (예: 향기 · 장소 3곳), 날짜 없음 | qa/screens/home-member-1440-dev.png | all |
| F024 | P0 | 장소 카드 저장 버튼 aria-label 불일치 | https://scentrip.vercel.app/ — 장소 카드 하트 button | 저장 | `screens/home.html:518` | 여행 장소 저장 | qa/raw/home-member-1440-dev.json | all |
| F025 | P0 | 동선 섹션 제목 불일치 | https://scentrip.vercel.app/ — 세 번째 섹션 제목 | {닉네임}님 취향의 AI 맞춤 동선 | `screens/home.html:398` | {닉네임}님 취향과 가까운 테마 동선 | qa/screens/home-member-1440-dev.png | all |
| F028 | P0 | AI 동선 배너 설명 문구 마침표 | https://scentrip.vercel.app/ — '센트립 AI로 나만의 여행 동선을 제작해보세요' 배너 설명 | 원하는 조건으로 커스텀할 수 있어요 (마침표 없음) | `screens/home.html:409` | 원하는 조건으로 커스텀할 수 있어요. | qa/screens/home-member-1440-dev.png | all |
| F029 | P0 | 요즘 뜨는 로컬 여행 장소 카드에 AI 매칭 배지 없음 | https://scentrip.vercel.app/ — '요즘 뜨는 로컬 여행 장소' 카드 사진 좌상단 | AI 매칭 {n}% 배지 (회원) | `screens/home.html:418, 527` | 배지 없음 (하트만) | qa/screens/home-member-1440-dev.png | 1440 |
| F033 | P0 | 비회원 취향 카드 버튼 라벨 불일치 | https://scentrip.vercel.app/ (비로그인) — 취향 카드 '1분이면 찾는 나만의 여행 유형' 버튼 | 취향 테스트하기 | `screens/home.html:369` | 취향 테스트 시작 | qa/screens/home-guest-1440-dev.png | all |
| F034 | P0 | 비회원 여행 소식 섹션 제목 불일치 | https://scentrip.vercel.app/ (비로그인) — 소식 영역 h2 | 지금 뜨는 여행 소식 | `screens/home.html:502` | 지금 어울리는 여행 소식 | qa/screens/home-guest-1440-dev.png | all |
| F035 | P0 | 비회원 장소 섹션 제목 불일치 | https://scentrip.vercel.app/ (비로그인) — 두 번째 섹션 제목 | 많이 찾는 여행 장소 | `screens/home.html:504` | 취향을 고르기 좋은 여행 장소 | qa/screens/home-guest-1440-dev.png | all |
| F036 | P0 | 비회원 동선 섹션 제목 불일치 | https://scentrip.vercel.app/ (비로그인) — 세 번째 섹션 제목 | 인기 여행 동선 | `screens/home.html:505` | 테마별 여행 동선 | qa/screens/home-guest-1440-dev.png | all |
| F037 | P0 | 비회원 동선 카드 설명 누락 · '추천 동선' 라벨 추가 | https://scentrip.vercel.app/ (비로그인) — 동선 카드 본문 | [대표 장소] 동선 이름 / 설명 1줄 / 메타 (회원과 같은 구성, 배지만 숨김) | `screens/home.html:567-572` | '추천 동선' 라벨 / 제목 / 메타 — 설명 문장 없음 | qa/screens/home-guest-1440-dev.png | all |
| F049 | P0 | 첫 방문 튜토리얼 1단계 문구 불일치 | https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 1/4 | 제목 "나의 여행 취향" / 본문 "향 취향 검사로 찾은 내 여행 유형이에요. '자세히 보기'에서 유형 설명과 어울리는 향을 확인할 수 있어요." | `screens/home.html:744` | 제목 "나의 여행 취향" / 본문 "자세히 보기에서 내 유형과 어울리는 향을 확인하세요." | qa/screens/home-A-tour-01-1440-dev.png | all |
| F050 | P0 | 첫 방문 튜토리얼 2단계 문구 불일치 | https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 2/4 | 제목 "나를 위한 여행 소식" / 본문 "취향에 맞춘 여행 소식과 읽을거리를 모아 보여드려요." | `screens/home.html:745` | 제목 "여행 소식" / 본문 "이야기를 읽고 글 속 장소로 여행을 계획해 보세요." | qa/screens/home-A-tour-02-1440-dev.png | all |
| F051 | P0 | 첫 방문 튜토리얼 3단계 문구 불일치 | https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 3/4 | 제목 "취향 맞춤 장소 추천" / 본문 "AI 매칭 %가 높은 장소부터 추천해요. '전체 보기'를 누르면 더 많은 장소를 볼 수 있어요." | `screens/home.html:746` | 제목 "여행 장소 추천" / 본문 "장소 카드를 눌러 자세히 보고 하트로 저장하세요." | qa/screens/home-A-tour-03-1440-dev.png | all |
| F052 | P0 | 첫 방문 튜토리얼 4단계 문구 불일치 | https://scentrip.vercel.app/ — 신규 회원 첫 방문 코치마크 4/4 | 제목 "AI로 나만의 동선 만들기" / 본문 "AI 추천, 원하는 지역, 찜한 장소 중 편한 방식을 골라 취향에 맞는 여행 동선을 만들 수 있어요." | `screens/home.html:747` | 제목 "동선 만들기" / 본문 "원하는 방식으로 나만의 여행 동선을 만들어 보세요." | qa/screens/home-A-tour-04-1440-dev.png | all |

## 소식 목록

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F038 | P0 | document title 불일치 | https://scentrip.vercel.app/news — <title> | Scentrip — 여행 소식 | `screens/news.html:6` | Scentrip | qa/screens/news-member-1440-dev.png | all |
| F040 | P0 | 헤더 설명 문구 불일치 | https://scentrip.vercel.app/news — h1 아래 p | 한 편에 하나의 주제를 정하고, 그 주제로 이어지는 장소들을 묶어 소개합니다. 마음에 드는 글을 읽고 그 안의 장소로 바로 동선을 만들어 보세요. | `screens/news.html:180` | 장소의 향과 계절, 지역의 이야기를 읽고 글 속 장소로 나만의 동선을 만들어 보세요. | qa/screens/news-member-1440-dev.png | all |
| F041 | P0 | 정렬 토글(취향 매칭순 / 최신순) 미구현 | https://scentrip.vercel.app/news — 헤더 아래 필터 바 좌측 | 세그먼트 '취향 매칭순' · '최신순' (회원 기본 취향 매칭순, 비회원은 '최신순'만) | `screens/news.html:187-190, 46` | 정렬 UI 없음 | qa/screens/news-member-1440-dev.png | all |
| F042 | P0 | 지역 필터 칩 미구현 | https://scentrip.vercel.app/news — 필터 바 정렬 오른쪽 | '지역' 드롭다운 칩(listbox) + 결과 0건 시 빈 상태 | `screens/news.html:192-197` | 지역 필터 없음 | qa/screens/news-member-1440-dev.png | all |
| F043 | P0 | 글 개수 표시 '총 N편' 누락 | https://scentrip.vercel.app/news — 필터 바 우측 | 총 {n}편 (예: 총 9편) | `screens/news.html:199` | 없음 | qa/screens/news-member-1440-dev.png | all |
| F044 | P0 | 목록 레이아웃 불일치 — 대표 글 히어로 + 3열 | https://scentrip.vercel.app/news — 목록 영역 | 모든 글을 같은 카드(사진 → 카테고리·지역 → 제목 → 요약 → 날짜·읽는 시간·장소 수) 3열 그리드로 | `screens/news.html:201, 274-285` | 첫 글은 좌 사진/우 초록 패널 히어로(읽어보기 →), 나머지 3개는 카드 | qa/screens/news-member-1440-dev.png | all |
| F045 | P0 | 소식 카드 AI 매칭 배지 누락 (회원) | https://scentrip.vercel.app/news — 카드 사진 좌상단 | AI 매칭 {n}% (title='이야기 속 장소들의 취향 매칭 평균') | `screens/news.html:277` | 배지 없음 | qa/screens/news-member-1440-dev.png | all |
| F046 | P0 | 소식 카드 상단 kicker 구성 불일치 | https://scentrip.vercel.app/news — 카드 제목 위 | 카테고리 칩 · 지역 (예: 오래된 목조 · 경북 안동) | `screens/news.html:280` | 태그 · 장소 N곳 (예: 로컬 · 장소 4곳) | qa/screens/news-member-1440-dev.png | all |
| F047 | P0 | 소식 카드 하단 메타(날짜 · 읽는 시간 · 장소 수) 누락 | https://scentrip.vercel.app/news — 카드 요약 아래 | YYYY.MM.DD · 읽는 데 약 N분 · 장소 N곳 | `screens/news.html:283` | 없음 (히어로만 날짜 형식 2026. 8. 28.) | qa/screens/news-member-1440-dev.png | all |
| F053 | P0 | 첫 방문 튜토리얼 1단계 문구 불일치 | https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 1/4 | 제목 "여행 소식" / 본문 "한 편에 하나의 주제로, 그 주제로 이어지는 장소들을 묶어 소개해요." | `screens/news.html:447` | 제목 "여행 소식" / 본문 "지역과 향을 주제로 묶은 여행 이야기를 만나보세요." | qa/screens/news-A-tour-01-1440-dev.png | all |
| F054 | P0 | 첫 방문 튜토리얼 2단계 문구 불일치 | https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 2/4 | 제목 "취향 매칭순으로 보기" / 본문 "글 속 장소가 내 취향과 잘 맞는 이야기부터 보여드려요. 최신순으로도 볼 수 있어요." | `screens/news.html:448` | 제목 "추천 소식" / 본문 "대표 이야기를 눌러 글과 소개된 장소를 읽어보세요." | qa/screens/news-A-tour-02-1440-dev.png | all |
| F055 | P0 | 첫 방문 튜토리얼 3단계 문구 불일치 | https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 3/4 | 제목 "지역으로 좁혀 보기" / 본문 "가고 싶은 지역의 이야기만 골라 볼 수 있어요." | `screens/news.html:449` | 제목 "여행 이야기" / 본문 "다른 이야기도 둘러보세요. 글 아래에서 동선을 만들 수 있어요." | qa/screens/news-A-tour-03-1440-dev.png | all |
| F056 | P0 | 첫 방문 튜토리얼 4단계 누락 | https://scentrip.vercel.app/news — 신규 회원 첫 방문 코치마크 4/4 | 제목 "이야기 카드" / 본문 "AI 매칭 %는 글 속 장소들의 취향 매칭 평균이에요. 글을 읽고 그 장소들로 바로 동선을 만들 수 있어요." | `screens/news.html:450` | 단계 없음 (총 3단계) | qa/screens/news-A-tour-03-1440-dev.png | all |
| F039 | 원본에없음 | 제목 위 'Travel news' 라벨 | https://scentrip.vercel.app/news — h1 위 아이콘+텍스트 | (원본 헤더는 h1 + 설명만) | `screens/news.html:178-181` | 📰 Travel news | qa/screens/news-member-1440-dev.png | all |
| F048 | 원본에없음 | 대표 글 '읽어보기 →' 버튼 | https://scentrip.vercel.app/news — 히어로 패널 | (원본에 없음) | `screens/news.html:274` | 읽어보기 → | qa/screens/news-member-1440-dev.png | all |

## 소식 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F067 | P0 | document title 불일치 | https://scentrip.vercel.app/news/green-rest-guide — <title> | Scentrip — {글 제목} | `screens/news-detail.html:351` | Scentrip | qa/screens/news-detail-member-1440-dev.png | all |
| F069 | P0 | 제목 위 kicker 구성 불일치 (지역·날짜·읽는 시간 누락) | https://scentrip.vercel.app/news/green-rest-guide — h1 위 kicker | [카테고리 칩] · 지역 · YYYY.MM.DD · 읽는 데 약 N분 | `screens/news-detail.html:357` | 카테고리 텍스트만('향기'), 날짜는 요약 아래 별도 줄 '2026. 8. 28.' | qa/screens/news-detail-member-1440-dev.png | all |
| F070 | P0 | 장소 섹션 제목 불일치 | https://scentrip.vercel.app/news/green-rest-guide — 본문 아래 장소 섹션 h2 | 이 이야기 속 장소 | `screens/news-detail.html:366` | 이 글에 담긴 장소 | qa/screens/news-detail-member-1440-dev.png | all |
| F071 | P0 | 장소 섹션 안내 문구 누락 | https://scentrip.vercel.app/news/green-rest-guide — 장소 섹션 h2 아래 | 카드를 누르면 장소 상세로 이동해요. 하트를 누르면 내 여행에 저장돼요. | `screens/news-detail.html:367` | 없음 | qa/screens/news-detail-member-1440-dev.png | all |
| F072 | P0 | 장소 카드 kicker(지역 · 특징) 누락 | https://scentrip.vercel.app/news/green-rest-guide — 장소 카드 이름 위 | 지역 · 특징 (예: 전남 담양 · 대숲) | `screens/news-detail.html:302-318` | 없음 (이름부터 시작) | qa/screens/news-detail-member-1440-dev.png | all |
| F073 | P0 | 장소 카드 AI 매칭 % 누락 | https://scentrip.vercel.app/news/green-rest-guide — 장소 카드 태그 줄 | 향 태그들 + ✦ AI 매칭 {n}% | `screens/news-detail.html:307` | 향 태그만('워터리') | qa/screens/news-detail-member-1440-dev.png | all |
| F074 | P0 | 장소 카드 하트 aria-label 불일치 | https://scentrip.vercel.app/news/green-rest-guide — 장소 카드 하트 button | {장소명} 저장 / {장소명} 저장 해제 | `screens/news-detail.html:309` | 여행 장소 저장 | qa/screens/news-detail-member-1440-dev.png | all |
| F075 | P0 | 동선 만들기 CTA 제목 불일치 | https://scentrip.vercel.app/news/green-rest-guide — 장소 목록 아래 초록 박스 제목 | 글에서 읽은 장소 그대로, 동선으로 (지역이 섞이면 "지역이 다른 장소가 섞여 있어요") | `screens/news-detail.html:372` | 글 속 장소를 나만의 여행으로 | qa/screens/news-detail-member-1440-dev.png | all |
| F076 | P0 | 동선 만들기 CTA 설명 불일치 | https://scentrip.vercel.app/news/green-rest-guide — CTA 박스 설명 | 이야기 속 장소를 담아 여행 조건만 고르면 AI가 동선을 짜 드려요.<br>결과에서 순서를 바꾸거나 뺄 수 있어요. | `screens/news-detail.html:375` | 글에 소개된 장소를 모두 담아 여행 조건을 정해보세요. | qa/screens/news-detail-member-1440-dev.png | all |
| F077 | P0 | 동선 만들기 CTA 버튼 라벨 불일치 | https://scentrip.vercel.app/news/green-rest-guide — CTA 버튼 | 이 이야기 속 {n}곳으로 동선 만들기 (1곳이면 "이 장소로 동선 만들기") | `screens/news-detail.html:354` | 글 속 장소로 동선 만들기 | qa/screens/news-detail-member-1440-dev.png | all |
| F078 | P0 | 사실 확인 안내 박스 누락 | https://scentrip.vercel.app/news/green-rest-guide — 본문 끝 (장소 섹션 위) | 지정 이력·면적·조성 시기는 … 정보는 {YYYY.MM.DD} 기준이니, 방문 전 공식 홈페이지에서 다시 확인해 주세요. | `screens/news-detail.html:364` | 없음 | qa/screens/news-detail-member-1440-dev.png | all |
| F079 | P0 | 출처 접기 제목 불일치 | https://scentrip.vercel.app/news/green-rest-guide — 출처 details summary | 취재·자료 및 이미지 출처 ({n}건) | `screens/news-detail.html:331` | 콘텐츠 및 이미지 출처 | qa/screens/news-detail-member-1440-dev.png | all |
| F080 | P0 | 이전·다음 글 내비 구성 불일치 | https://scentrip.vercel.app/news/green-rest-guide — 페이지 하단 nav | 2칸: '이전 글 / {제목}'(없으면 '가장 오래된 글입니다') · '다음 글 / {제목}'(없으면 '가장 최신 글입니다'), aria-label '이전·다음 글' | `screens/news-detail.html:343` | '← 이전 글 / {제목}' 한 칸만, 다음 글 칸 없음, aria-label '다른 여행 소식' | qa/screens/news-detail-member-1440-dev.png | all |
| F068 | 원본에없음 | 상단 '← 여행 소식' 뒤로가기 링크 | https://scentrip.vercel.app/news/green-rest-guide — 본문 최상단 링크 | (원본 상세는 kicker부터 시작) | `screens/news-detail.html:357` | ← 여행 소식 | qa/screens/news-detail-member-1440-dev.png | all |

## 탐색 · 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F057 | P0 | 첫 방문 튜토리얼 1단계 문구 불일치 | https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 1/4 | 제목 "장소와 동선 둘러보기" / 본문 "여행 장소와 여행 동선을 탭으로 오가며 탐색할 수 있어요." | `screens/place-recommend.html:821` | 제목 "장소와 동선" / 본문 "탭을 바꾸며 장소와 추천 동선을 둘러보세요." | qa/screens/explore-A-tour-01-1440-dev.png | all |
| F058 | P0 | 첫 방문 튜토리얼 2단계 문구 불일치 | https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 2/4 | 제목 "취향 매칭순으로 보기" / 본문 "기본은 취향 매칭순이에요. 내 취향과 잘 맞는 장소부터 보여드려요." | `screens/place-recommend.html:822` | 제목 "정렬" / 본문 "원하는 순서로 장소를 살펴보세요." | qa/screens/explore-A-tour-02-1440-dev.png | all |
| F059 | P0 | 첫 방문 튜토리얼 3단계 문구 불일치 | https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 3/4 | 제목 "필터로 좁혀 보기" / 본문 "지역·특징·취향으로 원하는 장소만 골라 볼 수 있어요." | `screens/place-recommend.html:823` | 제목 "필터" / 본문 "지역·특징·취향으로 원하는 결과를 좁혀 보세요." | qa/screens/explore-A-tour-03-1440-dev.png | all |
| F060 | P0 | 첫 방문 튜토리얼 4단계 문구 불일치 | https://scentrip.vercel.app/explore — 신규 회원 첫 방문 코치마크 4/4 | 제목 "장소 카드" / 본문 "AI 매칭 %로 내 취향과 얼마나 맞는지 알려줘요. 카드를 누르면 장소 상세를 볼 수 있어요." | `screens/place-recommend.html:824` | 제목 "탐색 결과" / 본문 "카드에서 자세한 내용을 확인하고 마음에 드는 여행을 저장하세요." | qa/screens/explore-A-tour-04-1440-dev.png | all |
| F081 | P0 | document title 불일치 | https://scentrip.vercel.app/explore — <title> | Scentrip — 탐색 · 장소 추천 | `screens/place-recommend.html:6` | Scentrip | qa/screens/explore-places-member-1440-dev.png | all |
| F082 | P0 | 회원 기본 취향 필터 프리셋 '{유형} 타입' 칩 미적용 | https://scentrip.vercel.app/explore — 필터 바 세 번째 칩 | 진입 시 내 유형 칩이 선택된 상태로 표시 (예: '감성가 타입 ⊗', 선택 스타일 + 해제 x) | `screens/place-recommend.html:353-360` | '취향 타입 ▾' 미선택 상태 | qa/screens/explore-places-member-1440-dev.png | all |
| F083 | P0 | 거리순 버튼 title 누락 · 인기순에 원본에 없는 title | https://scentrip.vercel.app/explore — 정렬 세그먼트 | 거리순 title='위치 정보 수집 필요', 인기순 title 없음 | `screens/place-recommend.html:253-254` | 인기순 title='추정 방문객 수 기준', 거리순 title 없음 | qa/raw/explore-places-member-1440-dev.json | all |
| F087 | P0 | 비회원에게 '취향 매칭순' 정렬 노출 | https://scentrip.vercel.app/explore (비로그인) — 정렬 세그먼트 첫 버튼 (a[href="/login?next=/taste"]) | 비회원은 취향 매칭순 숨김 → 인기순 · 거리순 2개, 기본 인기순 | `screens/place-recommend.html:46-47, 691` | 취향 매칭순(로그인 링크) · 인기순 · 거리순 3개 | qa/screens/explore-places-guest-1440-dev.png | all |
| F088 | P0 | 비회원에게 '취향 타입' 필터 노출 | https://scentrip.vercel.app/explore (비로그인) — 필터 바 세 번째 칩 | 비회원은 지역 · 특징 2개만 | `screens/place-recommend.html:46-47, 691` | 지역 · 특징 · 취향 타입 3개 | qa/screens/explore-places-guest-1440-dev.png | all |
| F089 | P0 | 비회원 로그인 유도 배너 누락 | https://scentrip.vercel.app/explore (비로그인) — 필터 바와 카드 그리드 사이 | 배너: '로그인하고 내 취향에 맞는 장소를 매칭받아 보세요' / '향 취향 검사 결과로 AI가 매칭도 높은 장소를 추천해 드려요.' / [로그인] 버튼 | `screens/place-recommend.html:263-269` | 배너 없음 | qa/screens/explore-places-guest-1440-dev.png | all |
| F085 | 원본에없음 | 페이지 넘김 '1 / 149 · 다음 장소 보기' | https://scentrip.vercel.app/explore — 카드 그리드 하단 nav[aria-label=장소 페이지] | (원본 장소 탐색은 페이지 넘김 UI 없음) | `screens/place-recommend.html:271-272` | 1 / 149 + 다음 장소 보기 버튼 | qa/screens/explore-places-member-1440-dev.png | all |
| F086 | 원본에없음 | 목록 보기 / 지도 보기 전환 토글 | https://scentrip.vercel.app/explore — 그리드 하단 우측 아이콘 토글(aria-label 목록 보기 / 지도 보기, ?view=map) | (원본에 없음) | `screens/place-recommend.html:271-272` | 목록/지도 토글 | qa/screens/explore-places-member-1440-dev.png | all |

## 탐색 · 동선

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F090 | P0 | document title 불일치 | https://scentrip.vercel.app/explore?tab=routes — <title> | Scentrip — 탐색 · 여행 동선 | `screens/route.html:6` | Scentrip | qa/screens/explore-routes-member-1440-dev.png | all |
| F091 | P0 | 추천 동선 캐러셀 제목 불일치 (회원) | https://scentrip.vercel.app/explore?tab=routes — 캐러셀 헤더 h2 | {닉네임}님을 위한 AI 맞춤 동선 | `screens/route.html:313` | {닉네임}님을 위한 맞춤 동선 | qa/screens/explore-routes-member-1440-dev.png | all |
| F092 | P0 | 추천 동선 캐러셀 카드 윗줄 문구 불일치 (회원) | https://scentrip.vercel.app/explore?tab=routes — 캐러셀 카드 제목 위 p | {닉네임}님의 취향을 만족시켜줄 | `screens/route.html:418` | 당신의 취향을 따라 만나는 | qa/screens/explore-routes-member-1440-dev.png | all |
| F093 | P0 | 비회원 캐러셀 제목 불일치 | https://scentrip.vercel.app/explore?tab=routes (비로그인) — 캐러셀 헤더 h2 | 지금 인기 있는 여행 동선 | `screens/route.html:840` | 새로운 여행을 위한 추천 동선 | qa/screens/explore-routes-guest-1440-dev.png | all |
| F094 | P0 | 비회원 캐러셀 카드 윗줄 문구 불일치 · '추천 동선' 라벨 추가 | https://scentrip.vercel.app/explore?tab=routes (비로그인) — 캐러셀 카드 제목 위 | 여행자들에게 인기 있는 | `screens/route.html:841` | '추천 동선' 라벨 + '{향} 분위기를 따라 만나는' (예: 워터리 분위기를 따라 만나는) | qa/screens/explore-routes-guest-1440-dev.png | all |
| F095 | P0 | 필터 칩 라벨 '여유도' → '페이스' | https://scentrip.vercel.app/explore?tab=routes — 필터 바 세 번째 칩 | 여유도 (옵션: 여유로운 코스 / 보통 / 부지런한 코스) | `screens/route.html:527` | 페이스 | qa/screens/explore-routes-member-1440-dev.png | all |
| F096 | P0 | 회원 기본 취향 필터 프리셋 칩 미적용 · 라벨 '취향 타입' | https://scentrip.vercel.app/explore?tab=routes — 필터 바 다섯 번째 칩 | 내 유형 칩이 선택된 상태 (예: '감성가 타입 ⊗') | `screens/route.html:529` | '취향 타입 ▾' 미선택 | qa/screens/explore-routes-member-1440-dev.png | all |
| F097 | P0 | 비회원에게 '취향 매칭순' 정렬 · '취향 타입' 필터 노출 | https://scentrip.vercel.app/explore?tab=routes (비로그인) — 정렬 세그먼트 / 필터 바 | 비회원은 인기순만 + 지역·기간·여유도·테마 (취향 칩 숨김) | `screens/route.html:45-46` | 취향 매칭순 · 인기순 + 취향 타입 칩 노출 | qa/screens/explore-routes-guest-1440-dev.png | all |
| F098 | P0 | 비회원 로그인 유도 배너 누락 | https://scentrip.vercel.app/explore?tab=routes (비로그인) — 필터 바 아래 | '로그인하고 내 취향에 맞는 동선을 매칭받아 보세요' / '향 취향 검사 결과로 AI가 매칭도 높은 여행 동선을 추천해 드려요.' / [로그인] | `screens/route.html:337-343` | 배너 없음 | qa/screens/explore-routes-guest-1440-dev.png | all |

## 장소 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F100 | P0 | document title 불일치 | https://scentrip.vercel.app/explore/tour_00031 — <title> | Scentrip — 여행 장소 상세 | `screens/place-detail.html:6` | Scentrip | qa/screens/place-detail-member-1440-dev.png | all |
| F101 | P0 | 제목 옆 저장 버튼 aria-label 불일치 | https://scentrip.vercel.app/explore/tour_00031 — 장소명 우측 하트 button | 저장 전 '저장' / 저장 후 '저장 해제' | `screens/place-detail.html:228, 411` | 저장 전 '여행 장소 저장' / 저장 후 '저장한 여행에서 제거' | qa/raw/place-detail-member-1440-dev.json | all |
| F102 | P0 | 정보 박스 4번째 줄 항목 불일치 (교통 거리 → 권장 체류시간) | https://scentrip.vercel.app/explore/tour_00031 — 장소 소개 아래 정보 박스 4번째 행 | 버스 아이콘 + 가까운 터미널/역 기준 거리 (예: 장흥터미널에서 8km) | `screens/place-detail.html:249` | 권장 체류시간 60분 | qa/screens/place-detail-member-1440-dev.png | all |
| F107 | P0 | 지도 외부 링크 문구·위치 불일치 ('카카오맵에서 보기') | https://scentrip.vercel.app/explore/tour_00031 — 지도 섹션 | 지도 오른쪽 아래 버튼 '카카오맵에서 보기' (새 탭 map.kakao.com) | `screens/place-detail.html:269` | 지도 섹션 제목 오른쪽 'OpenStreetMap ↗' 링크 | qa/screens/place-detail-member-1440-dev.png | all |
| F109 | P0 | 리뷰 섹션 제목에 리뷰 수 누락 · 별점 요약 줄 추가 | https://scentrip.vercel.app/explore/tour_00031 — 리뷰 섹션 헤더 | '리뷰 {n}' (제목 옆 숫자) | `screens/place-detail.html:276` | 제목 '리뷰' + 아래 줄 '★ - · 리뷰 0개' | qa/screens/place-detail-member-1440-dev.png | all |
| F110 | P0 | 리뷰 작성 버튼 라벨 불일치 (회원) | https://scentrip.vercel.app/explore/tour_00031 — 리뷰 헤더 우측 버튼 | 리뷰 작성하기 (텍스트 링크) | `screens/place-detail.html:277` | 리뷰 작성 (아이콘 채운 버튼) | qa/screens/place-detail-member-1440-dev.png | all |
| F111 | P0 | 비회원 리뷰 작성 버튼 라벨 불일치 | https://scentrip.vercel.app/explore/tour_00031 (비로그인) — 리뷰 헤더 우측 버튼 | '리뷰 작성하기' (누르면 로그인 모달) | `screens/place-detail.html:277, 421` | 로그인하고 리뷰 쓰기 | qa/screens/place-detail-guest-1440-dev.png | all |
| F112 | P0 | 리뷰 0개 빈 상태 설명 문구 불일치 | https://scentrip.vercel.app/explore/tour_00031 — 리뷰 빈 상태 박스 span | 다녀온 뒤 첫 리뷰를 남겨 주세요. | `screens/place-detail.html:282` | 이 장소의 첫 향기 경험을 남겨주세요. | qa/screens/place-detail-member-1440-dev.png | all |
| F113 | P0 | 리뷰 0개 빈 상태 '첫 리뷰 작성하기' 버튼 누락 | https://scentrip.vercel.app/explore/tour_00031 — 리뷰 빈 상태 박스 | 박스 안 버튼 '첫 리뷰 작성하기' | `screens/place-detail.html:283` | 버튼 없음 | qa/screens/place-detail-member-1440-dev.png | all |
| F114 | P0 | 리뷰 0개일 때 '전체 리뷰 보기' 노출 | https://scentrip.vercel.app/explore/tour_00031 — 리뷰 섹션 하단 버튼 | 리뷰 0개면 전체 리뷰 보기 숨김 | `screens/place-detail.html:135, 285` | 전체 리뷰 보기 노출 | qa/screens/place-detail-member-1440-dev.png | all |
| F115 | P0 | 주변 장소 추천 메타 형식 불일치 | https://scentrip.vercel.app/explore/tour_00031 — 향이 이어지는 주변 장소 추천 각 항목 보조 텍스트 | 거리 · 도보 시간 (예: 800m · 도보 12분 / 1.2km) | `screens/place-detail.html:296` | '직선거리 1.2km · 워터리' (도보 시간 없음, 향 태그 추가) | qa/screens/place-detail-member-1440-dev.png | all |
| F325 | P0 | 리뷰 작성이 별도 화면이 아닌 상세 안 모달 | https://scentrip.vercel.app/explore/tour_00031 — '리뷰 작성' 클릭 | 마이페이지 리뷰 작성 화면(mypage.html?place=…&loc=…#review-write)으로 이동, 사이드 메뉴 없는 단독 화면 | `screens/place-detail.html:277, screens/mypage.html:1100-1122` | 장소 상세 위 dialog 모달 | qa/screens/review-write-1440-dev.png | all |
| F103 | 확인필요 | 정보 박스 값이 없을 때 대체 문구 | https://scentrip.vercel.app/explore/tour_00031 — 정보 박스 1·2번째 행 | 원본은 값이 있는 경우만 정의 (예: 09:00 - 18:00 · 월 휴무 / 성인 2,000원) | `screens/place-detail.html:246-247` | '운영시간은 방문 전 확인해 주세요.' / '입장료 정보 확인 필요' | qa/screens/place-detail-member-1440-dev.png | all |
| F104 | 원본에없음 | 정보 박스 아래 외부 링크 줄 (OpenStreetMap ↗ · 등록된 외부 정보 ↗ · 이 장소로 동선 만들기 →) | https://scentrip.vercel.app/explore/tour_00031 — 정보 박스 바로 아래 링크 3개 | (원본에 없음) | `screens/place-detail.html:245-251` | OpenStreetMap ↗ / 등록된 외부 정보 ↗ / 이 장소로 동선 만들기 → | qa/screens/place-detail-member-1440-dev.png | all |
| F105 | 원본에없음 | '▸ 이 장소의 향기 이야기' 펼침 | https://scentrip.vercel.app/explore/tour_00031 — 외부 링크 줄 아래 details | (원본에 없음) | `screens/place-detail.html:245-251` | 펼치면 '비 온 뒤처럼 투명한 물기 / 물가의 촉촉함과 서늘한 공기가 설명에 드러납니다.' | qa/screens/place-detail-member-1440-dev.png | all |
| F106 | 원본에없음 | 갤러리 아래 '이미지 출처: …' 캡션 | https://scentrip.vercel.app/explore/tour_00031 — 갤러리 이미지 아래 텍스트 | (원본 갤러리는 사진만) | `screens/place-detail.html:256-262` | 이미지 출처: Wikimedia Commons · Appleysj | qa/screens/place-detail-member-1440-dev.png | all |
| F108 | 원본에없음 | 지도 위 안내 캡션 | https://scentrip.vercel.app/explore/tour_00031 — 지도 좌하단 오버레이 | (원본에 없음) | `screens/place-detail.html:266-270` | 장소 위치 · 지도 링크에서 주변 지도를 확인하세요 | qa/screens/place-detail-member-1440-dev.png | all |

## 장소 리뷰

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F116 | P0 | document title 불일치 | https://scentrip.vercel.app/explore/tour_00031/reviews — <title> | Scentrip — 리뷰 · {장소명} | `screens/place-reviews.html:365` | Scentrip | qa/screens/place-reviews-empty-1440-dev.png | all |
| F117 | P0 | 페이지 제목 구성 불일치 ('리뷰 {n}' + 장소 줄) | https://scentrip.vercel.app/explore/tour_00031/reviews — 뒤로가기 링크 아래 헤더 | h1 '리뷰 {n}' + 아래 줄 '{장소명} · {지역} · {특징}' (예: 천관산 억새 언덕 · 전남 장흥군 · 자연 명소) | `screens/place-reviews.html:270-271` | h1 '{장소명}' + h2 '리뷰' + '★ - · 리뷰 0개' | qa/screens/place-reviews-empty-1440-dev.png | all |
| F118 | P0 | 리뷰 작성 버튼 라벨 불일치 | https://scentrip.vercel.app/explore/tour_00031/reviews — 헤더 우측 버튼 | 리뷰 작성하기 (연필 아이콘) | `screens/place-reviews.html:273` | 리뷰 작성 (문서 아이콘) | qa/screens/place-reviews-empty-1440-dev.png | all |
| F119 | P0 | 리뷰 0개일 때 별점 요약·정렬·필터 노출 | https://scentrip.vercel.app/explore/tour_00031/reviews — 별점 요약 박스 + 추천순/최신순/별점 전체/사진 리뷰 줄 | 리뷰가 하나도 없으면 요약과 필터 줄 숨김 | `screens/place-reviews.html:419-420` | 요약 박스(– / 리뷰 0개 / 5~1점 0)와 정렬·필터 모두 노출 | qa/screens/place-reviews-empty-1440-dev.png | all |
| F120 | P0 | 리뷰 0개 빈 상태 설명 문구 불일치 | https://scentrip.vercel.app/explore/tour_00031/reviews — 빈 상태 span | 다녀온 뒤 오른쪽 위 ‘리뷰 작성하기’로 첫 리뷰를 남겨 주세요. | `screens/place-reviews.html:422` | 이 장소의 첫 향기 경험을 남겨주세요. | qa/screens/place-reviews-empty-1440-dev.png | all |
| F121 | P0 | 사진 필터 토글 라벨 불일치 | https://scentrip.vercel.app/explore/tour_00031/reviews — 필터 줄 사진 토글 버튼 | 사진 리뷰만 | `screens/place-reviews.html:290` | 사진 리뷰 (카메라 아이콘) | qa/screens/place-reviews-empty-1440-dev.png | all |
| F122 | P0 | 필터 줄 결과 개수 '{n}개' 누락 | https://scentrip.vercel.app/explore/tour_00031/reviews — 필터 줄 우측 | {n}개 (role=status) | `screens/place-reviews.html:291` | 리뷰 1개 상태에서도 필터 줄에 개수 없음 | qa/screens/place-reviews-member-1440-dev.png | all |
| F123 | P0 | 정렬 그룹 aria-label 불일치 | https://scentrip.vercel.app/explore/tour_00031/reviews — 추천순/최신순 그룹 | 정렬 | `screens/place-reviews.html:282` | 리뷰 정렬 | qa/raw/place-reviews-empty-1440-dev.json | all |
| F337 | P0 | 내 리뷰 카드 '내 리뷰' 칩 누락 | https://scentrip.vercel.app/explore/tour_00031/reviews — 내 리뷰 카드 닉네임 옆 | 칩 '내 리뷰' | `screens/place-reviews.html:400-410` | 없음 | qa/screens/place-reviews-member-1440-dev.png | all |
| F341 | 확인필요 | 리뷰 10개 초과 시 '리뷰 더 보기 (N개)' 버튼 | https://scentrip.vercel.app/explore/tour_00031/reviews — 리뷰 카드 하단 / 목록 하단 | 10개 넘으면 목록 하단 '리뷰 더 보기 ({남은 수}개)' | `screens/place-reviews.html:426-430` | 배포본 해당 장소 리뷰 2건이라 확인 불가 ('도움돼요 N' 토글은 원본과 같게 동작 확인: 0 → 1, aria-pressed=true) | qa/screens/place-reviews-2reviews-1440-dev.png | all |

## 동선 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F124 | P0 | document title 불일치 | https://scentrip.vercel.app/planner/river-forest — <title> | Scentrip — {동선 이름} | `screens/route-detail.html:626` | Scentrip | qa/screens/route-detail-member-1440-dev.png | all |
| F125 | P0 | breadcrumb 마지막 단계(현재 동선 이름) 누락 | https://scentrip.vercel.app/planner/river-forest — 좌측 상단 nav[aria-label=현재 위치] | 탐색 › 여행 동선 › {동선 이름}(aria-current) | `screens/route-detail.html:607-608` | 탐색 › 여행 동선 | qa/screens/route-detail-member-1440-dev.png | all |
| F126 | P0 | 제목 옆 '찜' 버튼 미구현 | https://scentrip.vercel.app/planner/river-forest — 동선 제목 행 우측 | ♡ 찜 버튼 (aria-label '찜하기' / '찜 해제') | `screens/route-detail.html:427, 698` | 버튼 없음 (하단 바만 있음) | qa/screens/route-detail-member-1440-dev.png | all |
| F127 | P0 | 제목 아래 메타 줄 구성 불일치 | https://scentrip.vercel.app/planner/river-forest — 제목 아래 p.meta | 센트립 추천 동선(내가 만든 동선) · {시도 시군구} · {일정} · 장소 {n}곳 · {여유도} · 찜 {n} | `screens/route-detail.html:619-621` | 당일 · 이동 약 19분 · 2개 장소 | qa/screens/route-detail-member-1440-dev.png | all |
| F128 | P0 | 리드 문구 불일치 | https://scentrip.vercel.app/planner/river-forest — 메타 아래 설명 p | {닉네임}님의 취향을 만족시켜줄 {동선 이름} (진입 desc 없으면 '{닉네임}님의 취향을 분석해 구성한 동선이에요.') | `screens/route-detail.html:623` | 부산광역시 안의 2곳을 잇는 당일 코스입니다. 가까운 구간은 도보, 나머지는 대중교통 이동을 가정합니다. | qa/screens/route-detail-member-1440-dev.png | all |
| F129 | P0 | '여행 컨셉' 값 형식 불일치 | https://scentrip.vercel.app/planner/river-forest — 여행 컨셉 칩 | {시도 시군구} 일대의 {지역 태그라인} 여행 (문장형, 예: 전남 담양 일대의 대숲과 가로수 그늘이 만드는 짙은 초록 향의 고장 여행) | `screens/route-detail.html:624` | 자연·힐링 (테마 태그) | qa/screens/route-detail-member-1440-dev.png | all |
| F130 | P0 | 이동 구간 표기 불일치 (수단·시간 / 길찾기) | https://scentrip.vercel.app/planner/river-forest — 타임라인 장소 사이 이동 구간 행 | '{이동수단} · 약 {n}분' (+ '또는 {수단} 약 {n}분') + 우측 '길찾기 ›' (카카오맵 길찾기 새 탭) | `screens/route-detail.html:651-655` | '예상 이동 19분 · 1.6km' + 우측 '지도 보기' | qa/screens/route-detail-member-1440-dev.png | all |
| F131 | P0 | 지도 아래 안내 문구 불일치 | https://scentrip.vercel.app/planner/river-forest — 지도 좌하단 안내 | 위치 확인용 · 실제 길안내는 구간별 링크로 연결됩니다 | `screens/route-detail.html:447` | 이동시간은 거리 기반 예상치입니다. 실제 교통 상황은 반영하지 않습니다. | qa/screens/route-detail-member-1440-dev.png | all |
| F132 | 원본에없음 | 비회원 제목 옆 '테마 동선' 라벨 | https://scentrip.vercel.app/planner/river-forest (비로그인) — 제목 우측 (회원은 매칭 % 자리) | (원본 비회원은 매칭 배지만 숨김) | `screens/route-detail.html:425` | 테마 동선 | qa/screens/route-detail-guest-1440-dev.png | all |

## 동선 만들기 · 조건

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F134 | P0 | document title 불일치 | https://scentrip.vercel.app/planner?mode=ai — <title> | Scentrip — 동선 만들기 · 조건 입력 | `screens/route-conditions.html:6` | Scentrip | qa/screens/planner-ai-s02-1440-dev.png | all |
| F135 | P0 | mode 파라미터 무시 — 항상 AI 추천이 선택된 채 시작 | https://scentrip.vercel.app/planner?mode=region · ?mode=picked — 첫 화면 라디오 | ?mode=ai\|region\|picked 에 맞는 플로우로 바로 1단계 시작 (지역 → 기간… / 기간… ) | `screens/route-conditions.html:243-251` | 어떤 mode로 들어와도 'AI에게 여행지 추천 받기'가 선택된 모드 선택 화면 | qa/screens/planner-region-s01-1440-dev.png | all |
| F136 | P0 | 위저드 안 '어떤 동선을 만들어볼까요?' 모드 선택 단계 | https://scentrip.vercel.app/planner?mode=ai — 조건 입력 카드 첫 화면 | 모드 선택은 진입 전 "동선 만들기" 모달(홈·탐색·내 여행)에서 하고, 조건 입력 카드는 곧바로 첫 질문 | `screens/home.html (rmTitle 동선 만들기 모달), screens/route-conditions.html:243-251` | 카드 안 첫 단계로 3개 모드 라디오 + 다음 | qa/screens/planner-ai-s01-1440-dev.png | all |
| F137 | P0 | 카드 헤더 — 플로우 이름 누락 | https://scentrip.vercel.app/planner?mode=ai — 카드 상단 뒤로가기 버튼 영역 | [‹ 뒤로(aria-label '이전 단계로')] + '동선 만들기 · {플로우 이름}' (예: 동선 만들기 · AI에게 여행지 추천 받기) | `screens/route-conditions.html:189-192` | '‹ 동선 만들기 · 여행 조건' (버튼 텍스트, 플로우 이름 없음) | qa/screens/planner-ai-s02-1440-dev.png | all |
| F139 | P0 | 선택 질문 표시 '선택사항' 위치·표기 불일치 | https://scentrip.vercel.app/planner?mode=ai — 동행·숙소 단계 질문 | 질문 제목 끝 배지 '선택사항' (붙여 씀) | `screens/route-conditions.html:349` | 진행 텍스트 줄 '6 / 7 · 선택 사항' (띄어 씀) | qa/screens/planner-ai-s07-1440-dev.png | all |
| F140 | P0 | 기간 질문 문구 띄어쓰기 불일치 | https://scentrip.vercel.app/planner?mode=ai — 기간 단계 h1 | 며칠동안 여행하실 계획인가요? | `screens/route-conditions.html:229` | 며칠 동안 여행하실 계획인가요? | qa/screens/planner-ai-s02-1440-dev.png | all |
| F141 | P0 | 이동 수단 선택지 표기 불일치 | https://scentrip.vercel.app/planner?mode=ai — 이동 수단 단계 두 번째 선택지 | 도보/대중교통 | `screens/route-conditions.html:231` | 도보 / 대중교통 | qa/screens/planner-ai-s03-1440-dev.png | all |
| F143 | P0 | 거리 질문 문구 앞부분 누락 | https://scentrip.vercel.app/planner?mode=ai — 거리 단계 h1 | 여행지 안에서, 여행 장소 사이 거리는 어느 정도까지 괜찮으신가요? | `screens/route-conditions.html:233` | 여행 장소 사이 거리는 어느 정도까지 괜찮으신가요? | qa/screens/planner-ai-s05-1440-dev.png | all |
| F144 | P0 | 거리 선택지 라벨 형식·문구 불일치 | https://scentrip.vercel.app/planner?mode=ai — 거리 단계 선택지 3개 | 한 줄 '가깝게 (약 35분 이내)' · '적당히 (약 35~70분)' · '멀어도 괜찮아요 (약 70분 이상)' | `screens/route-conditions.html:313-314` | 두 줄 '가깝게 / 약 35분 이내' · '적당히 / 약 35~70분' · '멀어도 괜찮아요 / 약 70분 이상도 괜찮아요' | qa/screens/planner-ai-s05-1440-dev.png | all |
| F145 | P0 | 출발 이동 시간 선택지 '상관 없어요' 띄어쓰기 | https://scentrip.vercel.app/planner?mode=ai — 출발지 단계 4번째 선택지 | 상관 없어요 | `screens/route-conditions.html:236` | 상관없어요 | qa/screens/planner-ai-s06-1440-dev.png | all |
| F146 | P0 | 출발지 하위 질문 제목·선택 상자 불일치 | https://scentrip.vercel.app/planner?mode=ai — 출발지 단계 하단 | h2 '출발지를 입력해주세요' + 선택 상자 placeholder '출발지 선택' (옵션 17개 약칭: 서울 부산 대구 인천 광주 대전 울산 세종 경기 강원 충북 충남 전북 전남 경북 경남 제주) | `screens/route-conditions.html:224-225, 237` | p '출발지 입력' + 펼침 '출발지' (옵션: 출발지 전체 + 정식 명칭 15개, 세종·울산 없음, 순서 다름) | qa/screens/planner-ai-s06-1440-dev.png | all |
| F148 | P0 | 동행 질문 단일 선택 → 다중 선택(체크박스) | https://scentrip.vercel.app/planner?mode=ai — 동행 단계 선택지 | 혼자/연인과/친구와/가족과 중 하나만 (role=radio) | `screens/route-conditions.html:238, 315-318` | 체크박스 — 여러 개 동시 선택 | qa/screens/planner-ai-s07-1440-dev.png | all |
| F149 | P0 | 숙소 질문 문구 불일치 | https://scentrip.vercel.app/planner?mode=ai — 숙소 단계 h1 | 어디에 숙박할지 정해지셨나요? | `screens/route-conditions.html:240` | 머무르실 숙소가 정해졌나요? | qa/screens/planner-ai-s08-1440-dev.png | all |
| F150 | P0 | 숙소 입력 방식 불일치 (박별 '숙소 미정/정해졌어요' + 주소 입력) | https://scentrip.vercel.app/planner?mode=ai — 숙소 단계 본문 | 박마다 'N박째' 제목 + 선택 '숙소 미정' · '정해졌어요' → '정해졌어요'면 검색 입력 placeholder '숙소 주소를 입력해주세요' | `screens/route-conditions.html:336-340, 354-361` | 설명 '숙소 가까운 장소를 선택하면 해당 위치를 기준으로 동선을 계산해요.' + '숙소가 있는 지역' 선택 + '1박째 숙소' select(미정 / {관광지} 인근) + '숙소 근처 장소명 검색' + 지도에서 위치 지정 | qa/screens/planner-ai-s08-1440-dev.png | all |
| F152 | P0 | 지역 플로우에 출발지 단계가 추가됨 (7단계 → 8단계) | https://scentrip.vercel.app/planner (원하는 지역의 동선 추천 받기) — 진행 표시 | 지역 → 기간 → 이동 수단 → 일정 → 거리 → 동행 → 숙소 (7단계, 출발지 없음) | `screens/route-conditions.html:245` | 지역 → 기간 → 이동 → 일정 → 거리 → 출발지 → 동행 → 숙소 (8단계) | qa/screens/planner-region-s07-1440-dev.png | all |
| F153 | P0 | 지역 질문 선택 상자 placeholder·옵션 불일치 | https://scentrip.vercel.app/planner (지역 플로우) 1단계 | 선택 상자 placeholder '여행지 선택', 옵션 17개 약칭(서울…제주) | `screens/route-conditions.html:224-225, 228` | 펼침 '여행할 지역' (옵션: 여행할 지역 전체 + 정식 명칭 15개, 세종·울산 없음) | qa/screens/planner-region-s02-1440-dev.png | all |
| F182 | P0 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트 | https://scentrip.vercel.app/planner?mode=ai (비로그인) | 헤더·푸터 유지 + '로그인이 필요해요 / 동선 만들기는 로그인 후 이용할 수 있어요.<br>몇 가지 조건만 고르면 취향에 맞는 동선을 만들어 드려요. / [로그인]' | `screens/route-conditions.html:179-181` | 307 → /login?next=%2Fplanner%3Fmode%3Dai | (크롤 결과 qa/00-page-map.md 0-3) | all |
| F318 | P0 | 찜한 장소 플로우 — '선택한 장소' 칩 바 누락 | https://scentrip.vercel.app/planner?mode=saved-places — 장소 선택 후 조건 단계 하단 | CTA 위 '선택한 장소' + 장소명 칩(최대 3개, 넘으면 '+N개') | `screens/route-conditions.html:201-204, 255-265` | 선택한 장소 표시 없음 | qa/screens/planner-picked-s01-1440-dev.png | all |
| F319 | P0 | 찜한 장소 플로우에 출발지 단계 포함 (6단계 → 장소 선택 포함 8단계) | https://scentrip.vercel.app/planner?mode=saved-places — 진행 표시 | 기간 → 이동 수단 → 일정 → 거리 → 동행 → 숙소 (6단계, 출발지 없음; 장소 선택은 별도 화면) | `screens/route-conditions.html:246` | 장소 선택 1단계 + 기간(2/8) → 이동(3/8) → 일정(4/8) → 거리(5/8) → 출발지(6/8) → 동행(7/8) → 숙소(8/8) | qa/screens/planner-picked-s01-1440-dev.png | all |
| F138 | 원본에없음 | 진행 표시 'N / 7' 텍스트 | https://scentrip.vercel.app/planner?mode=ai — 진행 점 아래 p.step | (원본은 진행 점만, aria-label "진행 단계") | `screens/route-conditions.html:196` | '1 / 7' 텍스트 + aria-label '동선 만들기 진행률' | qa/screens/planner-ai-s02-1440-dev.png | all |
| F142 | 원본에없음 | 일정 밀도 선택지 보조 설명 | https://scentrip.vercel.app/planner?mode=ai — 일정 단계 선택지 | '넉넉하게' / '빽빽하게' 한 줄 라벨만 | `screens/route-conditions.html:232` | '쉬어가는 여유로운 여행' / '더 많은 장소를 만나는 여행' 보조 줄 | qa/screens/planner-ai-s04-1440-dev.png | all |
| F147 | 원본에없음 | 출발지 단계 '첫날 출발 시각' 입력과 '출발 위치 · 지도에서 위치 지정' | https://scentrip.vercel.app/planner?mode=ai — 출발지 단계 | (원본 출발지 단계는 이동 시간 선택 + 출발지 시·도 선택만) | `screens/route-conditions.html:235-237` | time 입력(기본 09:00, '한국 시간 기준입니다. 다음 날부터는 오전 9시에 시작합니다.') + '출발 위치 / 지도에서 위치 지정' 지도 핀 선택 | qa/screens/planner-ai-s06-1440-dev.png | all |
| F151 | 원본에없음 | 생성 중 버튼 문구 '맞춤 동선을 만들고 있어요' | https://scentrip.vercel.app/planner?mode=ai — 마지막 단계 CTA 클릭 직후 | (원본은 곧바로 결과 화면으로 이동해 결과 화면 타임라인 자리에서 로딩) | `screens/route-conditions.html:474-494` | 위저드 안에서 버튼이 비활성 + "맞춤 동선을 만들고 있어요" | qa/screens/planner-ai-generating-1440-dev.png | all |

## 동선 만들기 · 장소 선택

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F313 | P0 | document title 불일치 | https://scentrip.vercel.app/planner?mode=saved-places — <title> | Scentrip — 동선 만들기 · 장소 선택 | `screens/route-create.html:6` | Scentrip | qa/screens/route-create-1440-dev.png | all |
| F314 | P0 | 상단 breadcrumb 대신 '← 이전 단계로' 버튼 | https://scentrip.vercel.app/planner?mode=saved-places — 제목 위 | nav[aria-label=현재 위치] '동선 만들기 › 장소 선택'(현재) | `screens/route-create.html:385-388` | '← 이전 단계로' 텍스트 버튼 | qa/screens/route-create-1440-dev.png | all |
| F315 | P0 | 선택 가능 개수 문구 불일치 | https://scentrip.vercel.app/planner?mode=saved-places — 필터 아래 개수 줄 | 선택 가능한 장소 {n}곳 | `screens/route-create.html:396` | 총 {n}개 장소 · 같은 시·도에서 최대 12개 선택 | qa/screens/route-create-1440-dev.png | all |
| F316 | P0 | 지도 안내 캡션 누락 | https://scentrip.vercel.app/planner?mode=saved-places — 오른쪽 지도 좌하단 | 선택한 장소가 지도에 표시됩니다 | `screens/route-create.html:407` | 캡션 없음 | qa/screens/route-create-1440-dev.png | all |
| F317 | 원본에없음 | 위치 미확인 장소 선택 시 하단 경고 '이 장소의 위치를 확인 중이에요. 다른 장소를 선택해 주세요.' | https://scentrip.vercel.app/planner?mode=saved-places — 하단 선택 바 (낙동강제방 선택 시) | (원본 선택 바는 '{n}개 장소 선택됨' + CTA만) | `screens/route-create.html:414-419` | 경고 문구가 선택 개수 자리를 대체 | qa/screens/route-create-2picked-1440-dev.png | all |

## 동선 만들기 · 결과

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F154 | P0 | document title 불일치 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — <title> | Scentrip — AI 맞춤 동선 | `screens/route-result.html:6` | Scentrip | qa/screens/route-result-ai-1440-dev.png | all |
| F155 | P0 | 결과 제목 형식 불일치 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 좌측 상단 h1 | {시도약칭 시군구} {기간} 향기 동선 (예: 강원 강릉 1박 2일 향기 동선) | `screens/route-result.html:798` | {시도 정식명} · {유형 별칭}의 {N}일 동선 (예: 강원특별자치도 · 시간을 수집하는 감성가의 2일 동선), textarea로 편집 가능(aria-label 일정 이름) | qa/screens/route-result-ai-1440-dev.png | all |
| F156 | P0 | '여행 컨셉' 값 형식 불일치 · 테마 편집 펼침 추가 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 여행 컨셉 박스 | 여행 컨셉 {지역} 일대의 {태그라인} 여행 (문장, 고정 박스) | `screens/route-result.html:426-431, 808` | '여행 컨셉 자연·힐링' 펼침 → '여행 테마 / 장소 구성을 바탕으로 자동 분류했어요. 직접 바꿀 수 있어요.' + 테마 5종 선택 + 설명 문장 | qa/screens/route-result-ai-1440-dev.png | all |
| F157 | P0 | '다른 지역으로 다시 추천' 버튼 위치·라벨 불일치 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 여행 컨셉 박스 옆 | 컨셉 박스 오른쪽 버튼 '다른 지역으로 다시 추천' (AI 모드만) | `screens/route-result.html:431, 810` | '▸ 일정 설정 및 안내' 펼침 안쪽 '다른 지역 추천' | qa/screens/route-result-ai-1440-dev.png | all |
| F160 | P0 | 조건에서 고른 출발지가 결과에 반영되지 않음 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 첫 행 출발지 | 조건 입력에서 고른 출발지 → '{출발지}에서 출발' + '수정 ›' | `screens/route-result.html:940-951` | 출발지(서울특별시)를 골랐는데 '출발지와 출발 시각을 설정해 주세요' + '출발지 설정 ›' | qa/screens/route-result-ai-1440-dev.png | all |
| F162 | P0 | 장소 드래그로 순서 변경 미구현 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 장소 카드 | 카드 좌측 grip(title '끌어서 순서 변경'), 카드 draggable | `screens/route-result.html:891-892` | 드래그 핸들 없음, 더보기 메뉴의 '위로/아래로'로만 이동 | qa/screens/route-result-ai-1440-dev.png | all |
| F163 | P0 | 이동 구간 표기 불일치 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 장소 사이 이동 행 | '{자동차\|대중교통} · 약 {n}분' + '길찾기 ›' | `screens/route-result.html:838-850` | '예상 24분 · 14.3km' + '지도 보기' | qa/screens/route-result-ai-1440-dev.png | all |
| F164 | P0 | 숙소 미정일 때 숙소 전 구간 안내 문구 누락 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 마지막 장소와 숙소 행 사이 | 이동 행 '{자동차} · 숙소를 입력하면 이 구간의 이동 시간을 계산해 드려요' | `screens/route-result.html:838` | 구간 행 없음 | qa/screens/route-result-ai-1440-dev.png | all |
| F166 | P0 | 지도 안내 문구 불일치 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 지도 좌하단 | 위치 확인용 · 실제 길안내는 구간별 링크로 연결됩니다 | `screens/route-result.html:461` | 이동시간은 거리 기반 예상치입니다. 실제 교통 상황은 반영하지 않습니다. | qa/screens/route-result-ai-1440-dev.png | all |
| F167 | P0 | '내 여행에 저장' 후 토스트 누락 | https://scentrip.vercel.app/planner (결과) — 하단 저장 바 '내 여행에 저장' 클릭 | 토스트 '내 여행에 저장했어요' (다시 저장 시 '변경사항을 저장했어요', 변경 없으면 '이미 내 여행에 저장된 동선이에요') | `screens/route-result.html:1442, 1470` | 토스트 없음 | qa/screens/route-result-saved-1440-dev.png | all |
| F168 | P0 | 저장 후 하단 바 '보러 가기' 링크 누락 | https://scentrip.vercel.app/planner (결과) — 하단 저장 바 메시지 | 내 여행에 저장된 동선이에요 · 보러 가기(→ 내 동선) | `screens/route-result.html:1480` | 내 여행에 저장된 동선이에요 (링크 없음) | qa/screens/route-result-saved-1440-dev.png | all |
| F320 | P0 | 여행 조건 모달 설명 문구 불일치 | https://scentrip.vercel.app/planner (결과) — 헤더 '여행 조건' 버튼 → 모달 제목 아래 | 조건 변경시 동선을 다시 구상합니다. | `screens/route-result.html:500` | 조건을 바꾸면 새 동선을 만듭니다. 취소하면 현재 일정이 유지됩니다. | qa/screens/rr-cond-modal-1440-dev.png | all |
| F321 | P0 | 여행 조건 모달 항목 구성 불일치 | https://scentrip.vercel.app/planner (결과) — 여행 조건 모달 본문 | 요약형 행 6개: 여행 기간 / 이동 수단 / 일정 밀도 / 장소 사이 거리(예: 적당히 (약 35~70분)) / 이동 가능 시간 / 동행(선택 안 함) — 버튼 [이 조건으로 다시 만들기] | `screens/route-result.html:495-515` | 편집 폼: 지역 · {시도} / 시작일 / 기간 5지선다 / 이동 수단 / 일정 여유도(넉넉하게·적당히·빽빽하게) / 여행 장소 사이 거리 / 출발지(시도 목록) / 출발 위치(지도에서 위치 지정) / 첫날 출발 시각 / 출발지에서 첫 목적지까지 / 동행 — 버튼 [취소] [이 조건으로 다시 만들기] | qa/screens/rr-cond-modal-1440-dev.png | all |
| F322 | P0 | '출발지 설정'이 출발 설정 모달 대신 여행 조건 모달을 엶 | https://scentrip.vercel.app/planner (결과) — 타임라인 출발지 행 '출발지 설정 ›' | '출발 설정' 모달: 출발지 / 출발 시각 / 안내 '출발 시각과 출발지까지의 이동 시간으로 첫날 시작 시간대를 정해요.' / [저장] | `screens/route-result.html:516-530, 951` | 여행 조건 전체 편집 모달이 열림 | qa/screens/rr-origin-modal-1440-dev.png | all |
| F323 | P0 | 장소 더보기 메뉴 구성 불일치 | https://scentrip.vercel.app/planner (결과) — 타임라인 장소 카드 ⋯ | '시간대' 라디오(오전/오후/저녁 중 다른 시간대) · '일차 이동' '{N}일차로 옮기기' · 구분선 · '장소 변경' · '삭제'(danger) | `screens/route-result.html:875-885` | 장소명 · 위로 · 아래로 · 체류시간(15~480분) · 시간대(오전/오후/저녁) · 장소 변경 · 삭제 이유(선택) 6종 · 장소 삭제 | qa/screens/rr-place-menu-1440-dev.png | all |
| F324 | P0 | 장소 삭제 시 확인 모달 없이 즉시 삭제 | https://scentrip.vercel.app/planner (결과) — ⋯ → '장소 삭제' | 확인 모달 '이 장소를 뺄까요?' / '{장소명}을 일정에서 뺍니다. 뺀 장소는 다시 추천되지 않아요.' / [그대로 둘게요] [빼기] | `screens/route-result.html:480-492` | 확인 없이 바로 타임라인에서 제거 (공곶이 삭제로 확인) | qa/screens/rr-place-delete-1440-dev.png | all |
| F158 | 원본에없음 | '▸ 일정 설정 및 안내' 펼침 전체 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 컨셉 박스 아래 details | (원본에 없음 — 조건은 헤더 "여행 조건" 모달에서만) | `screens/route-result.html:420-440` | 동선 생성 방식/시작일/첫날 출발 시각/지역/기간/이동/일정/동행 요약, 조건 변경, 운영시간 안내 3문단, 여행 시작일 입력, 순서 안내, 다른 지역 추천, 이 조건으로 다시 만들기, 추천 개선과 이용 기록 + 추천 개선 기록 초기화 | qa/screens/route-result-ai-1440-dev.png | all |
| F159 | 원본에없음 | 일차 요약 옆 총 거리·시간 ('14km · 24분') | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — "1일차 동선 요약" 오른쪽 | (원본에 없음) | `screens/route-result.html:439` | 14km · 24분 | qa/screens/route-result-ai-1440-dev.png | all |
| F161 | 원본에없음 | 장소 카드 '▸ 오전 · 예상 09:00–10:30' 펼침 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 장소 카드 하단 details | (원본 장소 카드는 이름·매칭%·설명·태그 + 드래그 핸들 + 더보기 메뉴) | `screens/route-result.html:891-905` | 시간대·예상 시각 펼침 → '오늘 일정의 향 구성을 다양하게 해요' / '운영시간 정보가 없어 방문 전 확인이 필요해요' / '방문 전 자유시간 65분 · …' / 체류시간 90분 | qa/screens/route-result-ai-1440-dev.png | all |
| F165 | 원본에없음 | '+ 이 일차에 장소 추가' 버튼 | https://scentrip.vercel.app/planner (조건 입력 완료 후 결과) — 타임라인 하단 | (원본에 없음) | `screens/route-result.html:439-461` | + 이 일차에 장소 추가 | qa/screens/route-result-ai-1440-dev.png | all |

## 내 여행

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F180 | P0 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트 | https://scentrip.vercel.app/dashboard (비로그인) | 헤더·푸터 유지 + '로그인이 필요해요 / 내 여행은 로그인 후 이용할 수 있어요.<br>저장한 장소와 동선을 한곳에서 확인해 보세요. / [로그인]' | `screens/my-trip.html:351-353` | 307 → /login?next=/dashboard | qa/screens/mytrip-guest-1440-dev.png | all |

## 내 여행 · 내 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F061 | P0 | 첫 방문 튜토리얼 1단계 문구 불일치 | https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 1/4 | 제목 "내 장소 · 내 동선" / 본문 "찜한 장소와 저장한 여행 동선을 탭으로 나눠 모아 둬요." | `screens/my-trip.html:1040` | 제목 "내 장소 · 내 동선" / 본문 "저장한 장소와 동선을 탭으로 나누어 볼 수 있어요." | qa/screens/mytrip-A-tour-01-1440-dev.png | all |
| F062 | P0 | 첫 방문 튜토리얼 2단계 문구 불일치 | https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 2/4 | 제목 "필터로 찾아보기" / 본문 "찜한 장소가 많아지면 필터로 원하는 장소만 볼 수 있어요." | `screens/my-trip.html:1041` | 제목 "필터" / 본문 "필터로 저장한 여행을 찾아보세요." | qa/screens/mytrip-A-tour-02-1440-dev.png | all |
| F063 | P0 | 첫 방문 튜토리얼 3단계 문구 불일치 | https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 3/4 | 제목 "여행 동선 만들기" / 본문 "AI 추천, 원하는 지역, 찜한 장소 중 편한 방식을 골라 취향에 맞는 동선을 만들 수 있어요." | `screens/my-trip.html:1042` | 제목 "동선 만들기" / 본문 "저장한 장소로 새 여행을 계획해 보세요." | qa/screens/mytrip-A-tour-03-1440-dev.png | all |
| F064 | P0 | 첫 방문 튜토리얼 4단계 문구 불일치 | https://scentrip.vercel.app/dashboard — 신규 회원 첫 방문 코치마크 4/4 | 제목 "지도로 한눈에" / 본문 "찜한 장소가 어디에 있는지 지도에서 확인해요." | `screens/my-trip.html:1043` | 제목 "저장한 여행" / 본문 "위치가 있는 장소는 지도에 표시돼요. 저장한 동선은 상세에서 편집하세요." | qa/screens/mytrip-A-tour-04-1440-dev.png | all |
| F169 | P0 | document title 불일치 | https://scentrip.vercel.app/dashboard — <title> | Scentrip — 내 여행 · 내 장소 | `screens/my-trip.html:6` | Scentrip | qa/screens/mytrip-places-1440-dev.png | all |
| F172 | P0 | 찜한 장소 하트 aria-label 불일치 | https://scentrip.vercel.app/dashboard — 카드 하트 button | {장소명} 저장 해제 (해제 후 {장소명} 다시 저장) | `screens/my-trip.html:448, 895` | 저장한 여행에서 제거 | qa/raw/mytrip-places-1440-dev.json | all |
| F173 | 원본에없음 | 목록 아래 '위치가 확인된 N곳을 지도에 표시했어요.' | https://scentrip.vercel.app/dashboard — 카드 그리드 하단 p.travel-note | (원본에 없음) | `screens/my-trip.html:370-377` | 위치가 확인된 3곳을 지도에 표시했어요. | qa/screens/mytrip-places-1440-dev.png | all |
| F174 | 원본에없음 | 찜 0개 빈 상태 '아직 저장한 장소가 없어요' | https://scentrip.vercel.app/dashboard (찜 0개) — 목록 영역 | (원본은 필터 결과 0건 빈 상태 '조건에 맞는 장소가 없어요 / 필터를 조정하면 저장한 다른 장소를 볼 수 있어요.'만 정의) | `screens/my-trip.html:374-377` | '아직 저장한 장소가 없어요 / 마음에 드는 여행을 찾아 차곡차곡 모아보세요. / [여행지 탐색]' | qa/screens/mytrip-A-02-empty-after-tour-1440-dev.png | all |

## 내 여행 · 내 동선

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F170 | P0 | document title 불일치 | https://scentrip.vercel.app/dashboard?tab=routes — <title> | Scentrip — 내 여행 · 내 동선 | `screens/my-trip-routes.html:6` | Scentrip | qa/screens/mytrip-routes-1440-dev.png | all |
| F176 | P0 | 저장 동선 카드 메타 구성 불일치 (저장일 추가, 여유도·취향 누락) | https://scentrip.vercel.app/dashboard?tab=routes — 동선 카드 하단 메타 | {n}개 장소 · {기간} · {여유도} · {유형} 취향 (예: 6개 장소 · 1박2일 · 부지런한 코스 · OOO 취향) | `screens/my-trip-routes.html:486` | {n}개 장소 · 당일치기 · 2026. 9. 16. 저장 | qa/screens/mytrip-routes-1440-dev.png | all |
| F178 | P0 | 추천 동선(남이 만든 동선) 카드에 하트 대신 더보기(⋯) 메뉴 | https://scentrip.vercel.app/dashboard?tab=routes — 탐색에서 찜한 "다대포해수욕장 · 몰운대" 카드 우상단 | 추천 동선: 하트(aria-label "{동선명} 저장 해제", 해제 후 "다시 저장") / 내가 만든 동선만 ⋯ 메뉴 | `screens/my-trip-routes.html:463-465` | 두 종류 모두 ⋯ 메뉴 (하트 없음) | qa/screens/mytrip-routes-1440-dev.png | all |
| F179 | P0 | 더보기 메뉴 항목 라벨 불일치 | https://scentrip.vercel.app/dashboard?tab=routes — 내가 만든 동선 ⋯ 메뉴 | 삭제 (휴지통 아이콘, danger) | `screens/my-trip-routes.html:445` | 동선 삭제 | qa/raw/mytrip-routes-1440-dev.json | all |
| F299 | P0 | 동선 삭제 확인이 브라우저 기본 confirm | https://scentrip.vercel.app/dashboard?tab=routes — ⋯ → 동선 삭제 | 앱 모달(alertdialog) '이 동선을 삭제할까요?' / "'{동선명}' 동선이 내 여행에서 사라져요. 삭제한 동선은 되돌릴 수 없어요." / [취소] [삭제] | `screens/my-trip-routes.html:986-1000` | window.confirm('저장한 동선을 삭제할까요?') | qa/screens/ov-mytrip-route-delete-1440-design.png | all |

## 마이페이지

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F181 | P0 | 비회원 진입 시 화면 안 로그인 게이트 대신 로그인 페이지로 리다이렉트 | https://scentrip.vercel.app/mypage (비로그인) | 헤더·푸터 유지 + '로그인이 필요해요 / 마이페이지는 로그인 후 이용할 수 있어요.<br>향 취향 결과와 내가 남긴 리뷰를 확인해 보세요. / [로그인]' | `screens/mypage.html:620-622` | 307 → /login?next=/mypage | qa/screens/mypage-guest-1440-dev.png | all |
| F183 | P0 | document title 불일치 | https://scentrip.vercel.app/mypage#account — <title> | Scentrip — 마이페이지 | `screens/mypage.html:6` | Scentrip | qa/screens/mypage-account-1440-dev.png | all |
| F185 | P0 | 계정 설정 — 프로필 카드(사진·닉네임·이메일·유형) 미구현 | https://scentrip.vercel.app/mypage#account — 콘텐츠 상단 | 아바타 버튼(aria-label '프로필 사진 변경', 호버 '사진 변경', 변경 후 '기본 이미지로') + 닉네임 + 이메일 + 유형 칩 '{코드} · {별칭}' | `screens/mypage.html:420-434` | 프로필 카드 없음 | qa/screens/mypage-account-1440-dev.png | all |
| F186 | P0 | 계정 설정 — '이름' 행과 '수정'(이름 수정 모달) 미구현 | https://scentrip.vercel.app/mypage#account — 계정 정보 목록 | dt '이름' / dd 닉네임 / [수정] → '이름 수정' 모달 | `screens/mypage.html:439-444, 674` | 이름 행·수정 없음 | qa/screens/mypage-account-1440-dev.png | all |
| F187 | P0 | 계정 설정 — 이메일 행 칩 문구 불일치 | https://scentrip.vercel.app/mypage#account — 이메일 행 | 이메일 옆 칩 'Google 로그인' | `screens/mypage.html:447-450` | 이메일 옆 칩 '인증됨' | qa/screens/mypage-account-1440-dev.png | all |
| F189 | P0 | 계정 설정 — '회원탈퇴' 링크 누락 | https://scentrip.vercel.app/mypage#account — 계정 정보 아래 우측 | 빨간 텍스트 버튼 '회원탈퇴' → 회원탈퇴 화면 | `screens/mypage.html:456` | 없음 (#withdraw 직접 진입만 가능) | qa/screens/mypage-account-1440-dev.png | all |
| F190 | P0 | 내 리뷰 — 지역 필터 칩 누락 | https://scentrip.vercel.app/mypage#reviews — 리뷰 목록 상단 | '지역 ▾' 필터 (결과 0이면 '해당 지역의 리뷰가 없어요 / 다른 지역을 선택해 보세요.') | `screens/mypage.html:465-468, 480-481` | 필터 없음 | qa/screens/mypage-reviews-1440-dev.png | all |
| F191 | P0 | 내 리뷰 — 빈 상태 문구 불일치 · 버튼 추가 | https://scentrip.vercel.app/mypage#reviews — 리뷰 0개 빈 상태 | '아직 작성한 리뷰가 없어요' / '다녀온 여행지에 리뷰를 남기면 이곳에 모여요.' | `screens/mypage.html:476-477` | '아직 작성한 리뷰가 없어요.'(마침표) / '다녀온 장소에 나만의 취향을 남겨보세요.' / [장소 둘러보기] | qa/screens/mypage-reviews-1440-dev.png | all |
| F192 | P0 | 고객센터 — FAQ 1 답변 문구 불일치 | https://scentrip.vercel.app/mypage#support — 자주 묻는 질문 1 펼침 | 향 취향 검사 응답을 바탕으로 16가지 유형 중 하나로 분석됩니다. 결과는 계정 설정의 프로필 카드에서 확인할 수 있습니다. | `screens/mypage.html:500` | 12개 질문 응답을 네 가지 감각 축으로 계산해 16가지 유형 중 하나로 분석합니다. | qa/screens/mypage-support-1440-dev.png | all |
| F193 | P0 | 고객센터 — FAQ 2 답변 문구 불일치 | https://scentrip.vercel.app/mypage#support — 자주 묻는 질문 2 펼침 | 계정 설정 > 이메일의 [수정] 버튼에서 변경할 수 있어요. Google 계정으로 로그인한 경우 연동된 주소가 표시됩니다. | `screens/mypage.html:510` | 현재 Google 소셜 로그인을 사용하므로 이메일은 Google 계정에서 관리합니다. | qa/screens/mypage-support-1440-dev.png | all |
| F194 | P0 | 고객센터 — FAQ 3 질문·답변 불일치 | https://scentrip.vercel.app/mypage#support — 자주 묻는 질문 3 | Q 회원탈퇴하면 Google 계정도 삭제되나요? / A 아니요. 센트립 계정과 서비스 이용 데이터만 삭제되며, Google 계정 자체에는 영향을 주지 않습니다. 탈퇴 후에도 같은 Google 계정으로 언제든 다시 가입할 수 있습니다. | `screens/mypage.html:514, 520` | Q 탈퇴하면 데이터는 어떻게 되나요? / A 탈퇴 시 프로필, 취향 검사, 리뷰와 저장 데이터가 함께 삭제되며 복구할 수 없습니다. | qa/screens/mypage-support-1440-dev.png | all |
| F195 | P0 | 고객센터 — 문의하기가 메일 링크가 아닌 1:1 문의 폼 | https://scentrip.vercel.app/mypage#support — 문의하기 영역 | 안내 '자주 묻는 질문에서 해결되지 않는 내용은 메일로 보내 주세요. 문의하기를 누르면 메일 앱이 열려요 (info.scentrip@gmail.com).' + [문의하기] mailto 링크(제목 [센트립 문의]) | `screens/mypage.html:526-529` | 폼: '문의 유형' select(계정 · 로그인 …) + '문의 내용' textarea(placeholder '문의하실 내용을 입력해 주세요.') + [문의 접수] | qa/screens/mypage-support-1440-dev.png | all |
| F196 | P0 | 회원탈퇴 — 안내 문구 불일치 | https://scentrip.vercel.app/mypage#withdraw — 제목 아래 | 탈퇴하면 센트립 계정과 아래 서비스 이용 데이터가 삭제되며 복구할 수 없습니다. 같은 Google 계정으로 다시 가입할 수 있지만, 삭제된 정보는 되돌아오지 않습니다. | `screens/mypage.html:583` | '계정 삭제 전 아래 내용을 꼭 확인해 주세요.' + 경고 박스 '탈퇴하면 계정을 다시 살릴 수 없으며 서비스 데이터가 함께 삭제됩니다.' | qa/screens/mypage-withdraw-1440-dev.png | all |
| F197 | P0 | 회원탈퇴 — '삭제되는 정보' 목록 형식 불일치 | https://scentrip.vercel.app/mypage#withdraw — 삭제되는 정보 박스 | 불릿 4줄: 회원 프로필과 닉네임 / 이메일 및 Google 연동 정보 / 향 취향 검사 응답과 결과 / 저장한 여행지와 추천 기록 | `screens/mypage.html:587-592` | 한 문장: 프로필, 향 취향 검사 결과와 문항 응답, 장소 리뷰, 저장한 여행과 설정 정보가 삭제됩니다. | qa/screens/mypage-withdraw-1440-dev.png | all |
| F198 | P0 | 회원탈퇴 — 탈퇴 사유(선택) 라디오 미구현 | https://scentrip.vercel.app/mypage#withdraw — 삭제되는 정보 아래 | '탈퇴 사유 (선택)' 라디오 4개: 더 이상 사용하지 않아서 / 추천 결과가 마음에 들지 않아서 / 개인정보가 걱정돼서 / 기타 | `screens/mypage.html:597-602` | 없음 | qa/screens/mypage-withdraw-1440-dev.png | all |
| F200 | P0 | 회원탈퇴 — 실행 버튼 라벨 불일치 | https://scentrip.vercel.app/mypage#withdraw — 하단 빨간 버튼 | 탈퇴하기 | `screens/mypage.html:607` | 회원탈퇴 | qa/screens/mypage-withdraw-1440-dev.png | all |
| F201 | P0 | 회원탈퇴 화면에 좌측 메뉴 노출 | https://scentrip.vercel.app/mypage#withdraw — 좌측 사이드 메뉴 | 회원탈퇴는 서브페이지 — 사이드 메뉴 없이 단독 화면 | `screens/mypage.html:579-582` | 사이드 메뉴(계정 설정 선택 상태) 노출 | qa/screens/mypage-withdraw-1440-dev.png | all |
| F333 | P0 | 리뷰 수정 화면에 좌측 메뉴 노출 | https://scentrip.vercel.app/mypage#review-edit | 서브페이지 — 사이드 메뉴 없음 | `screens/mypage.html:734 (SOLO_VIEWS)` | 사이드 메뉴 노출 | qa/screens/review-edit-1440-dev.png | all |
| F339 | P0 | 내 리뷰 카드 구성 불일치 | https://scentrip.vercel.app/mypage#reviews — 리뷰 카드 | 장소명 / '{지역} · {특징} · YY.MM.DD 방문' / 별점 / 본문 / 사진 / 작성일 YYYY.MM.DD / ⋯ '{장소명} 리뷰 관리' 메뉴(리뷰 수정·리뷰 삭제) | `screens/mypage.html:960-1000` | 썸네일 + 장소명 / 별점 / 본문 / '방문 2026년 9월 10일 · 작성 2026년 9월 16일' / 연필·휴지통 아이콘 버튼(aria-label 리뷰 수정·리뷰 삭제) | qa/screens/mypage-reviews-1440-dev.png | all |
| F340 | P0 | 리뷰 삭제 확인 모달 설명 문구 불일치 | https://scentrip.vercel.app/mypage#reviews — 리뷰 삭제 클릭 | 삭제한 리뷰는 복구할 수 없습니다. 정말 삭제하시겠어요? | `screens/mypage.html:659` | 삭제한 리뷰는 복구할 수 없습니다. | qa/screens/review-delete-confirm-1440-dev.png | all |
| F184 | 원본에없음 | 각 탭 상단 보이는 제목·설명 (계정 정보 / 내 리뷰 / 고객센터) | /mypage#account · #reviews · #support — 콘텐츠 상단 h1 + p | (원본은 제목을 sr-only로만 두고 바로 콘텐츠 — '계정 설정' / '내 리뷰' / '고객센터') | `screens/mypage.html:418, 462, 487` | 보이는 제목 '계정 정보' + '계정 식별에 필요한 최소 정보만 표시합니다.' / '내 리뷰' + '내가 작성한 장소 리뷰를 관리합니다.' / '고객센터' + '자주 묻는 질문을 확인하거나 1:1 문의를 남겨주세요.' | qa/screens/mypage-account-1440-dev.png | all |
| F188 | 원본에없음 | 계정 설정 — '가입일' · '로그인 방식' · '연결된 계정' 행 | https://scentrip.vercel.app/mypage#account — 계정 정보 목록 | (원본은 이름 · 이메일 2행) | `screens/mypage.html:438-452` | 가입일 2026년 9월 16일 / 로그인 방식 Google 소셜 로그인 / 연결된 계정 Google | qa/screens/mypage-account-1440-dev.png | all |
| F199 | 원본에없음 | 회원탈퇴 — '최종 확인' 입력('탈퇴' 입력해야 활성) | https://scentrip.vercel.app/mypage#withdraw — 최종 확인 박스 | (원본은 [탈퇴하기] 버튼 → 확인 없이 진행 흐름, 입력 확인 없음) | `screens/mypage.html:607` | '최종 확인 / 확인을 위해 탈퇴를 입력해 주세요.' + 입력(placeholder 탈퇴) + [회원탈퇴] 비활성 | qa/screens/mypage-withdraw-1440-dev.png | all |
| F426 | 원본에없음 | 회원탈퇴 — '계정을 영구 삭제할까요?' 확인 모달 | https://scentrip.vercel.app/mypage#withdraw — [회원탈퇴] 클릭 후 | (원본은 [탈퇴하기] 누르면 확인 없이 바로 처리) | `screens/mypage.html:1195-1198` | 모달 '계정을 영구 삭제할까요? / 모든 사용자 데이터가 삭제되며 되돌릴 수 없습니다. / [취소] [계정 삭제]' ('탈퇴' 입력 확인에 더해 두 번째 확인) | qa/screens/withdraw-B-03-confirm-modal-1440-dev.png | all |

## 센트립 소개

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F202 | P0 | document title 불일치 | https://scentrip.vercel.app/about — <title> | Scentrip — 센트립 소개 | `screens/about.html:6` | Scentrip | qa/screens/about-guest-1440-dev.png | all |
| F203 | P0 | WHY SCENTRIP 설명 문단 누락 | https://scentrip.vercel.app/about — "향 취향을 여행의 기준으로 바꾸는 맞춤 여행 추천 서비스" 아래 | 사람마다 같은 장소에서도 기억하는 감각은 다릅니다. 누군가는 숲의 젖은 흙을, 누군가는 햇살에 마른 나무를 오래 기억하죠. 센트립은 이 차이를 16가지 향 타입으로 분류해 ‘나다운 여행’을 찾도록 돕습니다. | `screens/about.html:232` | 없음 | qa/screens/about-guest-1440-dev.png | all |
| F204 | P0 | 단계 카드 02 설명 불일치 | https://scentrip.vercel.app/about — 02 나의 향 타입 확인 카드 설명 | 네 가지 감각의 조합으로 나만의 향 타입과 여행 성향을 발견합니다. | `screens/about.html:275` | 네 가지 감각 축이 만나 열여섯 가지 향 타입 중 하나를 만들어요. | qa/screens/about-guest-1440-dev.png | all |
| F205 | P0 | 단계 카드 03 설명 불일치 | https://scentrip.vercel.app/about — 03 여행지 추천 카드 설명 | 내 향의 분위기와 닮은 장소, 계절, 동선을 취향 일치도와 함께 만나보세요. | `screens/about.html:298` | 내 향 타입과 잘 맞는 장소와 동선을 매칭률과 함께 만나요. | qa/screens/about-guest-1440-dev.png | all |
| F206 | P0 | WHAT YOU GET — TYPE 항목 제목·설명 불일치 | https://scentrip.vercel.app/about — 초록 패널 TYPE | 나의 향 취향 유형 / 16가지 중 나를 가장 잘 나타내는 향 타입과 한 줄 정의 | `screens/about.html:309` | 나만의 향 타입 / 네 가지 감각으로 발견하는 여행자 유형 | qa/screens/about-guest-1440-dev.png | all |
| F207 | P0 | WHAT YOU GET — SCENT 항목 설명 불일치 | https://scentrip.vercel.app/about — 초록 패널 SCENT | 좋아할 가능성이 높은 향 무드와 쉽게 떠올릴 수 있는 향 표현 | `screens/about.html:310` | 좋아하는 풍경을 떠올리는 향의 언어 | qa/screens/about-guest-1440-dev.png | all |
| F209 | P0 | WHAT YOU GET — PLACE 항목 제목·설명 불일치 | https://scentrip.vercel.app/about — 초록 패널 PLACE | 취향 맞춤 여행지 / 내 향의 분위기와 닮은 국내 장소와 취향 일치도 | `screens/about.html:311` | 취향에 맞는 여행지 / 향 취향을 바탕으로 연결되는 장소와 동선 | qa/screens/about-guest-1440-dev.png | all |
| F210 | P0 | WHAT YOU GET — ROUTE 항목 누락 | https://scentrip.vercel.app/about — 초록 패널 4번째 항목 | ROUTE / 여행 코스와 머무는 방식 / 장소를 즐기기 좋은 계절, 공간, 테마별 추천 동선 | `screens/about.html:312` | 없음 | qa/screens/about-guest-1440-dev.png | all |
| F211 | P0 | 4 SCENT AXES 섹션 eyebrow·제목 줄바꿈·설명 불일치 | https://scentrip.vercel.app/about — 네 가지 감각 섹션 헤더 | eyebrow '4 SCENT AXES' / 제목 '네 가지 감각이 만나<br>하나의 향 타입이 됩니다.' (2줄) / 설명 '향의 온도와 무게, 수분감, 자연스러움에 대한 취향을 조합해 총 16가지 센트립 유형을 완성합니다.' | `screens/about.html:321-324` | eyebrow 'FOUR SCENT AXES' / 제목 한 줄 / 설명 없음 | qa/screens/about-guest-1440-dev.png | all |
| F212 | P0 | 16 SCENT TYPES 섹션 eyebrow·제목 줄바꿈 불일치 | https://scentrip.vercel.app/about — 열여섯 가지 향 섹션 헤더 | eyebrow '16 SCENT TYPES' / 제목 '열여섯 가지 향,<br>열여섯 가지 여행 방식' (2줄, 좌측 정렬) | `screens/about.html:333-335` | eyebrow 'SIXTEEN TYPES' / 제목 한 줄 가운데 정렬 | qa/screens/about-guest-1440-dev.png | all |
| F213 | P0 | 유형 카드 마지막 줄 형식 불일치 (16개) | https://scentrip.vercel.app/about — 16유형 카드 하단 줄 | '{향} 향을 닮은 여행 취향' (예: 나무 향을 닮은 여행 취향) | `screens/about.html:439-454` | '{향} 향 {이모지}' (예: 나무 향 🌳) | qa/screens/about-guest-1440-dev.png | all |
| F214 | P0 | SCENT TO PLACE 섹션 구성 불일치 (사진·설명·추천 장소 카드) | https://scentrip.vercel.app/about — 좋아하는 향은 머물고 싶은 장면을 말해줍니다 | 좌 아치형 사진(alt '빛이 스며드는 숲길과 젖은 흙 산책로') + 설명 '비 내린 숲의 향을 좋아한다면, 나무와 흙의 감각을 충분히 느낄 수 있는 고요한 산책 여행을 추천해요.' + 장소 카드(AI 매칭 88% / 담양 메타세쿼이아길 / 초록 공기가 깊어지는 느린 산책 / 젖은 나무·이끼·서늘한 공기) | `screens/about.html:341-366` | 사진·장소 카드 없음, 설명 '시원한 풀 향이 좋다면 바람이 부는 초록 길로, … 이어보세요.' + 박스 3개(초록과 물기 / 나무와 온기 / 바다와 바람) | qa/screens/about-guest-1440-dev.png | all |
| F215 | P0 | 하단 CTA eyebrow·제목·설명·버튼 불일치 | https://scentrip.vercel.app/about — 초록 CTA 패널 | eyebrow 'YOUR SCENT, YOUR JOURNEY' / 제목 '아직 만나지 못한 여행이<br>당신이 좋아하는 향 속에 있을지도 몰라요.' / 설명 '약 3분이면 나의 향 타입과 꼭 맞는 여행지를 발견할 수 있어요.' / 버튼 '향 취향 테스트 시작하기 →' | `screens/about.html:374-377` | eyebrow·설명 없음 / 제목 '아직 만나지 못한 여행이 좋아하는 향 속에 있을지도 몰라요.' (한 줄, '당신이' 없음) / 버튼 '취향 테스트 시작 →' | qa/screens/about-guest-1440-dev.png | all |
| F208 | 원본에없음 | WHAT YOU GET — STYLE '여행 행동 패턴' 항목 | https://scentrip.vercel.app/about — 초록 패널 3번째 항목 | (원본 4항목: TYPE · SCENT · PLACE · ROUTE) | `screens/about.html:309-312` | STYLE / 여행 행동 패턴 / 나에게 편안한 여행 방식과 분위기 | qa/screens/about-guest-1440-dev.png | all |

## 센트립 소개 · 취향 테스트

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F216 | 원본확인 | 원본끼리 유형 향 이름 불일치 (CHDR · CLDR) | screens/about.html vs screens/onboarding-test.html | about.html: CHDR '미네랄 잉크 우디', CLDR '알데하이드 코튼' / onboarding-test.html: CHDR '잉크 우디', CLDR '코튼 머스크' | `screens/about.html:450, 454 · screens/onboarding-test.html:1688, 1777` | 배포본은 두 화면 모두 '잉크 우디' · '코튼 머스크' 사용 | qa/screens/about-guest-1440-dev.png | all |

## 이용약관

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F217 | P0 | document title 불일치 | https://scentrip.vercel.app/terms — <title> | Scentrip — 이용약관 | `screens/terms.html:6` | 이용약관 \| 센트립 | qa/screens/terms-1440-dev.png | all |
| F218 | P0 | 문서 제목 불일치 | https://scentrip.vercel.app/terms — h1 | 센트립 이용약관 | `screens/terms.html:134` | 이용약관 | qa/screens/terms-1440-dev.png | all |
| F220 | P0 | 약관 본문 조항 구성·문구 전체 불일치 (15조+부칙 → 12조) | https://scentrip.vercel.app/terms — 본문 전체 | 제1조(목적) ~ 제15조(문의처) + 부칙(2026년 9월 21일 시행), 조 제목 형식 "제N조(제목)" — 조항별 대조표 qa/01-text.md "이용약관 조항 대조" 참고 | `screens/terms.html:138-322` | 제1조 목적 ~ 제12조 문의 (조 제목 괄호 없음, 제5조 검사 결과 안내·제7조 회원가입 제한·제9조 서비스 변경 및 중단·제11조 광고 및 외부 서비스·부칙 없음, 모든 조 문구 상이) | qa/screens/terms-1440-dev.png | all |

## 개인정보처리방침

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F221 | P0 | document title 불일치 | https://scentrip.vercel.app/privacy — <title> | Scentrip — 개인정보처리방침 | `screens/privacy.html:6` | 개인정보처리방침 \| 센트립 | qa/screens/privacy-1440-dev.png | all |
| F222 | P0 | 문서 제목 불일치 | https://scentrip.vercel.app/privacy — h1 | 센트립 개인정보처리방침 | `screens/privacy.html:162` | 개인정보처리방침 | qa/screens/privacy-1440-dev.png | all |
| F223 | P0 | 방침 본문 조항 구성·문구 전체 불일치 (16조 → 12조, 표 3개 → 2개) | https://scentrip.vercel.app/privacy — 본문 전체 | 제1조 처리 목적 ~ 제16조 방침의 변경, 표 3개(pp-table ×2, is-wide ×1), 문서 끝 공고일·시행일 — 조항별 대조표 qa/01-text.md "개인정보처리방침 조항 대조" 참고 | `screens/privacy.html:166-548` | 제1조 ~ 제12조 (수집 방법·국외 이전·행태정보·자동화된 결정 조항 없음, 조 제목·문구 상이), 표 2개, 시행일은 상단 | qa/screens/privacy-1440-dev.png | all |

## 부록 A. 이용약관 조항 대조

| 원본 조항 (`screens/terms.html`) | 배포 조항 (/terms) | 상태 |
|---|---|---|
| 제1조(목적) | 제1조 목적 | 조 제목·본문 문구 상이 |
| 제2조(용어의 정의) | 제2조 용어의 정의 | 조 제목·본문 문구 상이 |
| 제3조(약관의 게시 및 변경) | 제3조 약관의 게시와 변경 | 조 제목·본문 문구 상이 |
| 제4조(서비스의 내용) | 제4조 서비스의 제공 | 조 제목·본문 문구 상이 |
| 제5조(검사 결과 및 여행 정보에 관한 안내) | — | 배포본에 없음 |
| 제6조(회원가입 및 계정 관리) | 제5조 회원가입과 계정 관리 | 조 제목·본문 문구 상이 |
| 제7조(회원가입 제한) | — | 배포본에 없음 |
| 제8조(이용자의 의무) | 제6조 이용자의 의무 | 조 제목·본문 문구 상이 |
| 제9조(서비스의 변경 및 중단) | — | 배포본에 없음 |
| 제10조(지식재산권) | 제8조 지식재산권 | 조 제목·본문 문구 상이 |
| 제11조(광고 및 외부 서비스) | — | 배포본에 없음 |
| 제12조(회원탈퇴 및 이용제한) | — | 배포본에 없음 |
| 제13조(책임의 제한) | 제10조 책임의 제한 | 조 제목·본문 문구 상이 |
| 제14조(분쟁 해결) | 제11조 준거법과 분쟁 해결 | 조 제목·본문 문구 상이 |
| 제15조(문의처) | 제12조 문의 | 조 제목·본문 문구 상이 |
| 부칙 | — | 배포본에 없음 |
| — | 제7조 여행 정보와 추천의 성격 | 원본에 없음 |
| — | 제9조 이용 제한과 계약 해지 | 원본에 없음 |

## 부록 B. 개인정보처리방침 조항 대조

| 원본 조항 (`screens/privacy.html`) | 배포 조항 (/privacy) | 상태 |
|---|---|---|
| 제1조 개인정보의 처리 목적 | 제1조 개인정보의 처리 목적 | 조 제목·본문 문구 상이 |
| 제2조 처리하는 개인정보의 항목 | 제2조 처리하는 개인정보 항목 | 조 제목·본문 문구 상이 |
| 제3조 개인정보의 수집 방법 | 제6조 개인정보의 파기 | 조 제목·본문 문구 상이 |
| 제4조 개인정보의 처리 및 보유기간 | 제3조 개인정보의 처리 및 보유 기간 | 조 제목·본문 문구 상이 |
| 제5조 개인정보의 제3자 제공 | 제4조 개인정보의 제3자 제공 | 조 제목·본문 문구 상이 |
| 제6조 개인정보 처리업무의 위탁 | 제5조 개인정보 처리의 위탁 | 조 제목·본문 문구 상이 |
| 제7조 개인정보의 국외 이전 | 제6조 개인정보의 파기 | 조 제목·본문 문구 상이 |
| 제8조 개인정보의 파기 절차 및 방법 | 제6조 개인정보의 파기 | 조 제목·본문 문구 상이 |
| 제9조 이용자의 권리 및 행사 방법 | — | 배포본에 없음 |
| 제10조 개인정보의 안전성 확보조치 | 제9조 개인정보의 안전성 확보 조치 | 조 제목·본문 문구 상이 |
| 제11조 쿠키의 설치·운영 및 거부 | 제8조 쿠키의 설치·운영 및 거부 | 조 제목·본문 문구 상이 |
| 제12조 행태정보의 수집·이용 및 거부 | — | 배포본에 없음 |
| 제13조 개인정보 자동 수집 장치 및 자동화된 결정에 관한 사항 | — | 배포본에 없음 |
| 제14조 개인정보 보호책임자 및 문의처 | 제10조 개인정보 보호책임자 | 조 제목·본문 문구 상이 |
| 제15조 개인정보 침해에 대한 구제방법 | — | 배포본에 없음 |
| 제16조 개인정보처리방침의 변경 | 제12조 개인정보처리방침의 변경 | 조 제목·본문 문구 상이 |
| — | 제7조 이용자와 법정대리인의 권리 | 원본에 없음 |
| — | 제11조 권익침해 구제 방법 | 원본에 없음 |

## 부록 C. 취향 결과 16유형 대조 (한 줄 요약 · 향 피라미드)

근거: `screens/onboarding-test.html` TYPES(1445~) · PYRAMID(1800~) / 증거: `qa/screens/taste-type-{코드}-1440-{design|dev}.png`

| 유형 | 원본 한 줄 요약 | 배포 한 줄 요약 | 원본 TOP·MIDDLE·BASE | 배포 TOP·MIDDLE·BASE |
|---|---|---|---|---|
| WHAN | 시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자 | 시간이 켜켜이 쌓인 공간에서 가장 큰 안정감을 느끼는 여행자입니다 | 솔잎 · 한옥 나무결 · 오래된 오크통 | 오래된 오크통 · 젖은 흙 · 전통 한옥의 나무결 |
| WHAR | 우아함과 깊이를 동시에 추구하는 감성 수집가 | 따뜻하고 묵직하며 촉촉하지만 정돈된 아름다움을 선호하는, 우아함과 깊이를 동시에 추구하는 감성 수집가입니다 | 달콤한 사과 · 꿀 · 캐러멜 | 앰버 · 샌달우드 · 벨벳 커튼 |
| WHDN | 거칠고 투박한 자연 속에서 에너지를 얻는 사람 | 따뜻하고 묵직하며 건조한, 거칠고 투박한 자연 속에서 에너지를 얻는 여행자입니다 | 후추 · 장작 연기 · 오래된 가죽 | 장작 · 건초 · 가죽 공방 |
| WHDR | 정돈된 깊이와 지적 여유를 사랑하는 여행자 | 정돈된 깊이와 지적 여유를 사랑합니다 | 홍차 · 오래된 종이 · 삼나무 책장 | 홍차 · 오래된 책 · 시더우드 |
| WLAN | 따뜻하고 자유로운 감성을 따라 움직이는 사람 | 따뜻하고 자유로운 감성을 따라 움직입니다 | 빗물 · 이끼 · 축축한 숲바닥 | 이끼 · 비 내린 숲 · 무화과 잎 |
| WLAR | 따뜻한 감성과 세련된 취향을 가진 여행자 | 따뜻한 감성과 세련된 취향을 지녔습니다 | 귤 · 햇살 머금은 흰 꽃 · 깨끗한 머스크 | 화이트 플라워 · 베르가못 · 햇살 머금은 정원 |
| WLDN | 자유롭고 소박한 로컬 탐험가 | 자유롭고 소박한 로컬 탐험가입니다 | 레몬그라스 · 야생 풀잎 · 마른 풀 | 허브 · 레몬그라스 · 들판의 바람 |
| WLDR | 편안하고 세련된 여행을 즐기는 사람 | 가볍지만 품격 있는 여행을 즐깁니다 | 맑은 차 · 햇볕에 말린 수건 · 포근한 비누 | 린넨 · 화이트티 · 아이리스 |
| CHAN | 시원한 공기 속 깊은 감정을 품은 여행자 | 시원한 공기 속 깊은 감정을 품었습니다 | 차가운 빗물 · 깊은 호수 · 젖은 유목 | 안개 낀 호수 · 침엽수 숲 · 새벽 이슬 |
| CHAR | 차분한 품격을 사랑하는 감성가 | 차분한 품격과 조용한 몰입을 사랑합니다 | 차가운 꽃잎 · 아이리스 · 갓 세탁한 니트 | 바이올렛 · 아이리스 · 조용한 바닷바람 |
| CHDN | 자연 그대로의 풍경을 사랑하는 자유인 | 자연 그대로의 풍경을 사랑합니다 | 차가운 바람 · 삼나무 · 흙 | 삼나무 숲 · 차가운 바람 · 고원의 공기 |
| CHDR | 절제된 감성과 깊이를 가진 관찰자 | 절제된 감성과 깊이를 가진 관찰자입니다 | 잉크 · 연필심 · 마른 돌가루 | 잉크 · 오래된 기차역 · 차가운 돌벽 |
| CLAN | 생기 넘치는 자연을 따라 떠나는 탐험가 | 새로운 경험에 대한 호기심과 생동감이 넘칩니다 | 라임 · 초록 잎 · 젖은 이끼 | 초록 잎 · 계곡 물안개 · 라임 |
| CLAR | 밝고 세련된 감성을 가진 여행자 | 밝고 세련된 감성을 지녔습니다 | 오렌지 과즙 · 오렌지꽃 · 깨끗한 비누 | 오렌지 블라썸 · 햇살 · 따뜻한 브런치 |
| CLDN | 가장 자유로운 형태의 로컬 여행자 | 자유와 독립을 가장 중요하게 생각합니다 | 바닷바람 · 바다 소금 · 파도에 마른 유목 | 해풍 · 드라이우드 · 바위 절벽 |
| CLDR | 깔끔함과 여유를 동시에 추구하는 여행자 | 복잡함보다 명료함을, 화려함보다 균형감을 추구합니다 | 비누 거품 · 코튼 · 화이트 머스크 | 화이트 린넨 · 깨끗한 머스크 · 은은한 샌달우드 |

## 부록 D. 취향 결과 16유형 대조 (여행 행동 패턴)

| 유형 | 원본 | 배포 |
|---|---|---|
| WHAN | 관광지보다 오래된 골목을 먼저 찾아요 / 유명 카페보다 로컬 노포에 관심이 많아요 / 여행 중 사진보다 분위기를 기억해요 / 여행 후 장소와 역사, 사람 이야기를 기억해요 | 관광지보다 오래된 골목을 먼저 찾음 / 유명 카페보다 로컬 노포에 관심이 많음 / 여행 중 사진보다 분위기를 기억함 / 여행 후 가장 기억하는 것은 장소의 역사와 사람 이야기 |
| WHAR | 숙소 선택에 가장 많은 시간을 써요 / 여행 사진도 구도와 분위기를 중요하게 생각해요 / 관광보다 공간 자체를 즐기는 편이에요 / 클래식 호텔이나 부티크 숙소를 선호해요 | 숙소 선택에 가장 많은 시간을 사용함 / 여행 사진도 구도와 분위기를 중요하게 생각함 / 관광보다 공간 자체를 즐기는 경우가 많음 / 클래식 호텔이나 부티크 숙소를 선호함 |
| WHDN | 계획보다 현장 분위기에 따라 움직여요 / 관광객 많은 장소는 피해요 / 로컬 식당 발견에 큰 만족감을 느껴요 / 우연히 발견한 장소를 가장 좋아해요 | 계획보다 현장 분위기에 따라 움직임 / 관광객 많은 장소를 피함 / 로컬 식당 발견에 큰 만족감을 느낌 / 여행 중 우연히 발견한 장소를 가장 좋아함 |
| WHDR | 박물관과 전시관 체류 시간이 길어요 / 여행지에서도 독서나 기록을 즐겨요 / 혼자 여행 만족도가 매우 높아요 / 관광보다 탐구에 가까운 여행을 선호해요 | 박물관과 전시관 체류 시간이 김 / 여행지에서도 독서나 기록을 즐김 / 혼자 여행 만족도가 매우 높음 / 관광보다 탐구에 가까운 여행을 선호 |
| WLAN | 즉흥적으로 길을 바꾸는 경우가 많아요 / 사진보다 함께한 순간을 중요하게 여겨요 / 숲길이나 마을 산책을 좋아해요 / 여행 후 사람 이야기를 가장 많이 해요 | 즉흥적으로 길을 바꾸는 경우가 많음 / 사진보다 함께한 순간을 중요하게 여김 / 숲길이나 마을 산책을 좋아함 / 여행 후 사람 이야기를 가장 많이 함 |
| WLAR | SNS 저장 목록이 많아요 / 감성 카페 탐방을 즐겨요 / 사진 찍기 좋은 장소를 잘 찾아요 / 친구들과의 여행 만족도가 높아요 | SNS 저장 목록이 많음 / 감성 카페 탐방을 즐김 / 사진 찍기 좋은 장소를 잘 찾음 / 친구들과의 여행 만족도가 높음 |
| WLDN | 계획표가 거의 없어요 / 이동 중 발견한 장소를 방문해요 / 현지 시장과 골목 탐험을 좋아해요 / 여행 중 예상치 못한 경험을 즐겨요 | 계획표가 거의 없음 / 이동 중 발견한 장소를 방문 / 현지 시장과 골목 탐험을 좋아함 / 여행 중 예상치 못한 경험을 즐김 |
| WLDR | 여행 계획을 적당히 세워요 / 실패 확률이 적은 선택을 해요 / 카페·전시·산책을 좋아해요 / 누구와 여행해도 적응력이 높아요 | 여행 계획을 적당히 세움 / 실패 확률이 적은 선택을 함 / 카페·전시·산책을 좋아함 / 누구와 여행해도 적응력이 높음 |
| CHAN | 새벽 산책을 좋아해요 / 물가나 숲을 선호해요 / 혼자 멍 때리는 시간을 중요하게 생각해요 / 여행 중 사색 시간이 꼭 필요해요 | 새벽 산책을 좋아함 / 물가나 숲을 선호함 / 혼자 멍 때리는 시간을 중요하게 생각함 / 여행 중 사색 시간이 필요함 |
| CHAR | 전시관·공연 관람을 선호해요 / 조용한 카페를 좋아해요 / 여행 중 일정한 루틴을 유지해요 / 시끄러운 관광지는 쉽게 피곤해해요 | 전시관·공연 관람 선호 / 조용한 카페를 좋아함 / 여행 중 일정한 루틴을 유지함 / 시끄러운 관광지는 쉽게 피곤해함 |
| CHDN | 트레킹 만족도가 높아요 / 혼자 여행 적응력이 좋아요 / 자연 풍경 앞에 오래 머물러요 / SNS 핫플보다 풍경을 선호해요 | 트레킹 만족도가 높음 / 혼자 여행 적응력이 좋음 / 자연 풍경에 오래 머무름 / SNS 핫플보다 풍경을 선호 |
| CHDR | 역사 공간 탐방을 선호해요 / 여행 기록을 꼼꼼히 남겨요 / 혼자 여행 만족도가 높아요 / 깊은 몰입 경험을 선호해요 | 역사 공간 탐방 선호 / 여행 기록을 꼼꼼히 남김 / 혼자 여행 만족도가 높음 / 깊은 몰입 경험을 선호 |
| CLAN | 액티비티 참여율이 높아요 / 자연 관광지를 선호해요 / 여행 중 즉흥적인 선택을 자주 해요 / 새로운 체험에 적극적으로 참여해요 | 액티비티 참여율이 높음 / 자연 관광지를 선호함 / 여행 중 즉흥적인 선택을 자주 함 / 새로운 체험에 적극적으로 참여함 |
| CLAR | 여행 사진 촬영을 좋아해요 / 오션뷰 카페를 자주 찾아요 / 친구와의 여행 만족도가 높아요 / 트렌디한 장소를 즐겨요 | 여행 사진 촬영을 좋아함 / 오션뷰 카페를 자주 찾음 / 친구와의 여행 만족도가 높음 / 트렌디한 장소를 즐김 |
| CLDN | 계획 없이 떠나는 여행도 가능해요 / 섬·해안·산악지역을 선호해요 / 현지인이 추천하는 장소를 찾아가요 / 우연히 발견한 공간에서 오래 머물러요 | 계획 없이 떠나는 여행도 가능 / 섬·해안·산악지역을 선호함 / 현지인이 추천하는 장소를 찾아감 / 우연히 발견한 공간에서 오래 머무름 |
| CLDR | 동선을 꼼꼼하게 계획해요 / 혼잡한 장소는 피하는 편이에요 / 깔끔하고 정돈된 숙소를 선호해요 / 여행 후 만족도를 객관적으로 정리해요 | 동선을 꼼꼼하게 계획함 / 혼잡한 장소를 피하는 편 / 깔끔하고 정돈된 숙소를 선호함 / 여행 후 만족도를 객관적으로 정리함 |

## 부록 E. 1단계에서 확인한 배포본 동작 기록

- 가입: 계정 A·B 모두 가입 완료 화면 없이 `/dashboard` 이동 + 튜토리얼. 튜토리얼은 home·news·explore·dashboard 4곳만 (동선 탭·마이페이지·planner 없음), 건너뛰기 후 재노출 없음
- `?mode=` 파라미터 무시: `/planner?mode=region|picked`로 들어가도 AI 모드가 선택된 모드 선택 단계가 뜸
- 내 여행 → 동선 만들기는 `/planner?mode=saved-places` (원본 이름 `picked`)
- 찜 저장 시 토스트 없음 (원본도 장소 찜 토스트 없음 — 차이 아님)
- 동선 결과 저장 시 하단 바 문구만 바뀌고 토스트 없음 (티켓 기록)
- 리뷰 "도움돼요 N" 토글은 원본과 같게 동작 (0 → 1, aria-pressed=true)
- 탐색 동선 탭 "나만의 동선 만들기" 모달 문구는 원본 모달과 같음 (차이 없음)
- 프로필 팝오버(닉네임 · 유형 · 계정 설정 · 내 리뷰 · 고객센터 · 로그아웃) 문구는 원본과 같음
- 데이터 변경 기록(계정 A): 장소 찜 4곳(tour_00031~34), 동선 저장 2개, 리뷰 1건(tour_00031) / 계정 B: 리뷰 1건(tour_00031). 계정 A 언어 설정이 스크립트 오류로 잠시 English가 됐다가 한국어로 복구됨