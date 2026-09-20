# 02. 스타일 대조

- 기준: 원본 `screens/*.html` (npx serve 로컬) ↔ 배포 https://scentrip.vercel.app · 1440×900 · 확인일 2026-09-16
- 회원 화면은 신규 Google 계정 A(qa검수A · WHAN)로, 가입 전 검사 분기는 계정 B(qa검수B · CLDR)로 확인
- 표기: **P0/P1/P2** = 개발 티켓 후보 · **확인필요** = 확인하지 못함 · **원본에없음** = 배포본에만 있음 · **원본확인** = 원본 자체 문제
- 원본 샘플 데이터(장소명·소식 글·리뷰 등 자리표시자)와 배포 실데이터 값 차이는 제외하고, 라벨·문구 규칙·구성·형식만 대조

## 요약

| 구분 | 건수 |
|---|---|
| P1 | 36 |
| P2 | 16 |
| 확인필요 | 1 |
| **합계** | **53** |

| 페이지 | 건수 |
|---|---|
| 공통(토큰) | 6 |
| 공통(헤더) | 4 |
| 공통(카드) | 5 |
| 로그인 | 2 |
| 회원가입 | 2 |
| 취향 테스트 | 4 |
| 홈 | 5 |
| 탐색 · 장소 | 7 |
| 장소 상세 | 5 |
| 동선 상세 | 4 |
| 동선 만들기 · 조건 | 3 |
| 내 여행 · 내 장소 | 2 |
| 마이페이지 | 1 |
| 센트립 소개 | 1 |
| 이용약관 | 2 |

## 공통(토큰)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F342 | P1 | 전역 자간 -3% 미적용 (letter-spacing: normal) | 배포 전 화면 body 기본 텍스트·버튼·입력 (텍스트 요소 약 4,090개 중 normal) | letter-spacing -0.03em (16px → -0.48px, 14px → -0.42px) | `reference/tokens.css:252 (--letter-spacing)` | letter-spacing normal (0) | qa/raw/home-member-1440-dev.json | all |
| F343 | P1 | 아이콘 세트 불일치 (Phosphor → Lucide) | 배포 전 화면 아이콘 svg.lucide-* (heart, sparkles, globe, user-round, chevron-right, arrow-right, map-pin, clock-3, trash-2 등) | 원본 Phosphor 아이콘 (viewBox 0 0 256 256, fill currentColor) — 예: 하트·반짝임·지구본·사용자·화살표 | `screens/*.html 인라인 svg, reference/lang.js:24, reference/login-modal.js:27-39` | Lucide 아이콘 (viewBox 0 0 24 24, stroke 2 / 1.8) | qa/screens/home-member-1440-dev.png | all |
| F344 | P1 | 토큰에 없는 글자색 사용 | 배포 전 화면 (예: 탐색 정렬 기본 #737b78, 선택 #344b40, 결과 개수 #4d5551, 조건 질문 #2c4034, 탭 기본 #b0b6b3, 보조 텍스트 #63756b · #859087 · #868e96, 로고 #315f54) | 시맨틱 토큰만: content-default #21332c · content-neutral #212529 · neutral-muted #495057 · subtle #4f7a66 · primary #3a5e4e · neutral-subtle #adb5bd · disabled #ced4da | `reference/tokens.css (--color-content-*)` | #315f54, #344b40, #2c4034, #4d5551, #63756b, #737b78, #859087, #868e96, #87948a, #b0b6b3, #352d27 등 하드코딩 | qa/raw/explore-places-member-1440-dev.json | all |
| F345 | P1 | 토큰에 없는 그림자 사용 (검정 그림자 포함) | 배포 전 화면 카드·버튼·드롭다운 box-shadow | 엘리베이션 5종만 (그린 틴트 #1b231d): xs 0 1px 2px /0.05 · sm 0 1px 2px /0.04, 0 2px 6px /0.06 · md · lg · xl | `reference/tokens.css:242-246` | 0 1px 3px #21332c/0.12 (236곳), 0 2px 8px #000000/0.27 (115곳), 0 12px 40px #21332c/0.09, 0 8px 24px #21332c/0.09, 0 2px 5px #183323/0.04, 0 1px 5px #182c18/0.06 등 | qa/raw/home-member-1440-dev.json | all |
| F346 | P2 | 토큰에 없는 라운드 값 사용 | 배포 전 화면 (예: 칩 26px, 버튼 24px·28px·30px, 배지 99px·20px, 카드 10px) | radius xs 2 · sm 4 · md 8 · lg 12 · xl 16 · 2xl 24 · 3xl 32 · full(pill) | `reference/tokens.css:294-302` | 10px, 20px, 26px, 28px, 30px, 99px 등 | qa/raw/explore-places-member-1440-dev.json | all |
| F392 | 확인필요 | 호버·프레스 상태 레이어(state-hover/pressed) 적용 여부 | 전 화면 버튼·카드·칩 호버/프레스 | 색을 바꾸지 않고 --color-state-hover(-brand) / --color-state-pressed(-brand) 알파를 겹침 | `reference/tokens.css (--color-state-*), CLAUDE.md 상태 레이어 규칙` | 자동 캡처는 정지 상태만 수집해 확인하지 못함 | - | all |

## 공통(헤더)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F348 | P1 | 로고 "Scentrip" 글자 그라디언트 누락 | 전 화면 헤더 로고 텍스트 — 배포 셀렉터 … header.sticky.top-0.z-50 > div.travel-topbar > a.inline-flex.items-center.gap-1\.5 > span | background-image linear-gradient(#31493a 0%, #418a8b 100%); color #000000/0.00; line-height 25px | `screens/home.html:306 (.brand-name)` | background-image none; color #315f54; line-height 30px | qa/screens/home-member-1440-dev.png | all |
| F349 | P1 | 프로필 필 닉네임 색 불일치 | 헤더 우측 프로필 필 — 배포 셀렉터 …v.relative.flex.items-center > button.account-pill > span.account-pill-name:nth-of-type(1) | color #2f4d40 | `reference/components.css:274 (.pill-name)` | color #3a5e4e | qa/screens/home-member-1440-dev.png | all |
| F350 | P1 | 비회원 로그인 버튼 글자 크기·아이콘 불일치 | 비로그인 헤더 우측 로그인 버튼 — 배포 셀렉터 …r > div.flex.items-center.gap-2 > div.flex.items-center > a.account-login.inline-flex.h-10 | font-size 14px; 텍스트만, 너비 74.9px | `screens/home.html:44 (.btn-login .guest-only)` | font-size 13px; 오른쪽 log-in 아이콘 추가, 너비 94.3px | qa/screens/home-guest-1440-dev.png | all |
| F347 | P2 | 헤더 하단 테두리·반투명 배경 추가 | 전 화면 상단 헤더 — 배포 셀렉터 …h-full.antialiased > main.min-h-screen.bg-white.text-on-surface > header.sticky.top-0.z-50 | background-color #ffffff; border-bottom none; padding-left 28px; padding-right 28px; height 56px | `screens/home.html:239 (.nav)` | background-color oklab(0.999994 0.0000455678 0.0000200868 / 0.95); border-bottom 1px solid #f2f7f4; padding-left 0px; padding-right 0px; height 57px | qa/screens/home-member-1440-dev.png | all |

## 공통(카드)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F354 | P1 | 매칭 배지 글자 크기·굵기·색·테두리 불일치 | 홈·탐색 장소 카드 좌상단 배지 — 배포 셀렉터 …f-type(2) > article.travel-card:nth-of-type(1) > div.travel-card-photo > span.travel-badge | font-size 16px; font-weight 400; color (텍스트 없음); background-color #ffffff; border-top 1px solid #c3d7cb; padding-top 4px; border-radius pill; 높이 31px | `screens/home.html:51 (.badge)` | font-size 14px; font-weight 600; color #3a5e4e; background-color #ffffff/0.93; border-top 1px solid #d6e0db; padding-top 5px; border-radius 99px; 텍스트 14px/600 #3a5e4e, 배경 #ffffff/0.93, 높이 33px | qa/screens/home-member-1440-dev.png | all |
| F356 | P1 | 장소 카드 메타 글자 크기·굵기 불일치 | 장소 카드 하단 지역·특징 줄 — 배포 셀렉터 …f-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > div.travel-card-meta | font-size 16px; font-weight 500; line-height 24px | `screens/home.html:182 (.card-meta)` | font-size 14px; font-weight 400; line-height 21px | qa/screens/home-member-1440-dev.png | all |
| F355 | P2 | 장소 카드 사진 영역 안쪽 여백(배지·하트 위치) 불일치 | 장소 카드 사진 영역 — 배포 셀렉터 …iv.home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > div.travel-card-photo | padding-top 12px; padding-left 12px; background-color #000000/0.00 | `screens/home.html:172 (.card-photo)` | padding-top 0px; padding-left 0px; background-color #f2f7f4 | qa/screens/home-member-1440-dev.png | all |
| F357 | P2 | 장소 카드 설명 줄 수 불일치 (1줄 → 2줄) | 장소 카드 설명 — 배포 셀렉터 …v.home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > p | 높이 24px (1줄) | `screens/home.html:181 (.card-desc)` | 높이 48px (2줄) | qa/screens/home-member-1440-dev.png | all |
| F358 | P2 | 동선 카드 메타 굵기·간격 불일치 | 동선 카드 하단 메타 — 배포 셀렉터 …_8HEYta__routeCard > a.explore-module__8HEYta__cardCopy > div.explore-module__8HEYta__meta | font-weight 500; gap 4px; margin-top 0px | `screens/home.html:208 (.route-meta)` | font-weight 400; gap 7px; margin-top 8px | qa/screens/home-member-1440-dev.png | all |

## 로그인

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F380 | P1 | 로그인 타이틀 크기 불일치 (24 → 28px) | 로그인 h1 — 배포 셀렉터 …-h-dvh.flex-col > section.mx-auto.flex.w-full > h1.text-center.text-\[28px\].font-semibold | font-size 24px; line-height 33.6px | `screens/login.html:106 (#loginTitle)` | font-size 28px; line-height 39.2px | qa/screens/login-1440-dev.png | all |
| F381 | P2 | Google 버튼 테두리색·그림자 불일치 | 로그인 Google로 계속하기 버튼 — 배포 셀렉터 …n.mx-auto.flex.w-full > div.mt-6.space-y-4 > div.space-y-3 > button.flex.h-\[52px\].w-full | border-top 1px solid #dee2e6; box-shadow #1b231d/0.05 0px 1px 2px 0px | `screens/login.html:120 (#googleBtn)` | border-top 1px solid #c3d7cb; box-shadow none | qa/screens/login-1440-dev.png | all |

## 회원가입

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F383 | P1 | 닉네임 입력 글자·테두리·라운드 불일치 | 회원가입 닉네임 input — 배포 셀렉터 …fieldset.mt-6.space-y-4 > label.block.pt-4.text-sm:nth-of-type(3) > input.mt-2.h-12.w-full | font-size 16px; font-weight 400; border-top 1px solid #dee2e6; border-radius 8px | `screens/signup.html:217 (#nick)` | font-size 14px; font-weight 600; border-top 1px solid #c3d7cb; border-radius 12px; 480×48 | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |
| F382 | P2 | 가입 완료하기 버튼 크기 불일치 | 회원가입 하단 버튼 — 배포 셀렉터 …g-white.px-5 > section.mx-auto.max-w-\[480px\].py-10 > form.mt-7 > button.mt-6.h-12.w-full | 440×52 | `screens/signup.html:226 (#submitBtn)` | 480×48 | qa/screens/signup-A-11-all-agreed-1440-dev.png | all |

## 취향 테스트

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F384 | P1 | 테스트 표지 제목 크기 불일치 (48 → 56px) | /taste 표지 h1 — 배포 셀렉터 …ent-intro.relative.flex > section.relative.z-10.flex > h1.mt-7.text-\[38px\].font-semibold | font-size 48px; line-height 62.4px; letter-spacing -2.16px | `screens/onboarding-test.html:131 (.intro-title)` | font-size 56px; line-height 67.2px; letter-spacing -1.68px | qa/screens/taste-intro-guest-1440-dev.png | all |
| F385 | P1 | 테스트 시작 버튼 글자 크기·색·위 여백 불일치 | /taste 표지 시작 버튼 — 배포 셀렉터 …ent-intro.relative.flex > section.relative.z-10.flex > button.mt-10.inline-flex.h-\[54px\] | font-size 16px; color #121c18; margin-top 16px | `screens/onboarding-test.html:1251 (#introStart)` | font-size 14px; color #183126; margin-top 40px | qa/screens/taste-intro-guest-1440-dev.png | all |
| F386 | P1 | 문항 제목 색·자간 불일치 | /taste 문항 제목 — 배포 셀렉터 …tive.flex.flex-1 > div.text-center:nth-of-type(1) > h1.mt-3.whitespace-pre-line.font-serif | color #21332c; letter-spacing -1.26px | `screens/onboarding-test.html:1261 (#qTitle)` | color #352d27; letter-spacing normal | qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png | all |
| F387 | P1 | 선택지 카드 라운드·그림자·높이·테두리색 불일치 | /taste 문항 선택지 카드 — 배포 셀렉터 ….max-w-\[1120px\]:nth-of-type(2) > button.min-h-\[150px\].rounded-lg.border:nth-of-type(1) | border-radius 24px; box-shadow #1b231d/0.04 0px 1px 2px 0px, #1b231d/0.06 0px 2px 6px 0px; border-top 1px solid #e0ebe4; padding-left 32px | `screens/onboarding-test.html:279 (.choice)` | border-radius 8px; box-shadow none; border-top 1px solid #ddd5cd; padding-left 48px; 높이 150px | qa/screens/taste-A-member-first-WHAN-q01-1440-dev.png | all |

## 홈

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F031 | P1 | AI 동선 배너 버튼 아이콘 위치·모양 불일치 | https://scentrip.vercel.app/ — '나만의 동선 만들기' 버튼 | 왼쪽 반짝임(✦ sparkle) 아이콘 + 라벨 | `screens/home.html:432-434` | 라벨 + 오른쪽 화살표(→) 아이콘 | qa/screens/home-member-1440-dev.png | all |
| F032 | P1 | 섹션 '전체 보기' 링크에 chevron 추가 | https://scentrip.vercel.app/ — 장소 추천·동선·로컬 섹션 우측 '전체 보기 >' | 텍스트만 '전체 보기' | `screens/home.html:412` | '전체 보기' + 오른쪽 chevron 아이콘 | qa/screens/home-member-1440-dev.png | all |
| F351 | P1 | 홈 섹션 제목 크기 불일치 (24 → 28px) | 홈 "…취향의 여행 장소 추천" 등 섹션 제목 h2 — 배포 셀렉터 …ustify-between:nth-of-type(1) > div > h2.text-\[18px\].font-semibold.tracking-\[-0\.01em\] | font-size 24px; line-height 30px; letter-spacing -0.48px | `screens/home.html:164 (.section-title)` | font-size 28px; line-height 35px; letter-spacing -0.84px | qa/screens/home-member-1440-dev.png | all |
| F353 | P1 | AI 동선 배너 박스 스타일 누락 (배경 그라디언트·테두리·라운드·패딩) | 홈 "센트립 AI로 나만의 여행 동선을 제작해보세요" 배너 — 배포 셀렉터 …face > div.home-content > section.home-banner:nth-of-type(4) > div.grid.items-center.gap-5 | background-image linear-gradient(100deg, #f2f7f4, color(srgb 0.933137 0.956863 0.941765)); padding-top 32px; padding-left 48px; border-top 1px solid #e0ebe4; border-radius 24px; 박스 1320×124.2 | `screens/home.html:212 (.ai-banner)` | background-image none; padding-top 0px; padding-left 0px; border-top none; border-radius 0px; (배경은 바깥 section에 있고 안쪽 박스 1222×63.2) | qa/screens/home-member-1440-dev.png | all |
| F352 | P2 | 소식 썸네일 테두리·라운드·배경 누락 | 홈 여행 소식 목록 썸네일 — 배포 셀렉터 … > a.home-news-item:nth-of-type(1) > div.home-news-photo:nth-of-type(1) > img.object-cover | background-color #f2f7f4; border-top 1px solid #e0ebe4; border-radius 12px | `screens/home.html:143 (.news-thumb)` | background-color #000000/0.00; border-top none; border-radius 0px | qa/screens/home-member-1440-dev.png | all |

## 탐색 · 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F359 | P1 | 탐색 탭 글자 크기 불일치 (28 → 32px) | 탐색 상단 "여행 장소 · 여행 동선" 탭 — 배포 셀렉터 …tion.explore-module__8HEYta__content > nav.explore-module__8HEYta__tabs > a:nth-of-type(1) | font-size 28px; line-height 35px; letter-spacing -0.48px | `screens/place-recommend.html:57 (.tab .is-active)` | font-size 32px; line-height 40px; letter-spacing -1.28px | qa/screens/explore-places-member-1440-dev.png | all |
| F360 | P1 | 탐색 비선택 탭 색 불일치 | 탐색 상단 비선택 탭 — 배포 셀렉터 …tion.explore-module__8HEYta__content > nav.explore-module__8HEYta__tabs > a:nth-of-type(2) | color #ced4da | `screens/place-recommend.html:57 (.tab)` | color #b0b6b3 | qa/screens/explore-places-member-1440-dev.png | all |
| F361 | P1 | 정렬 세그먼트 선택 항목 색·그림자 불일치 | 탐색 정렬 세그먼트 선택 항목 — 배포 셀렉터 …_8HEYta__toolbar > div.explore-module__8HEYta__sortGroup:nth-of-type(1) > a:nth-of-type(1) | color #21332c; box-shadow none; border-radius pill | `screens/place-recommend.html:46 (.seg .is-active)` | color #344b40; box-shadow #182c18/0.06 0px 1px 5px 0px; border-radius 24px | qa/screens/explore-places-member-1440-dev.png | all |
| F362 | P1 | 정렬 세그먼트 비선택 항목 색 불일치 | 탐색 정렬 세그먼트 비선택 항목 — 배포 셀렉터 …_8HEYta__toolbar > div.explore-module__8HEYta__sortGroup:nth-of-type(1) > a:nth-of-type(2) | color #adb5bd | `screens/place-recommend.html:46 (.seg)` | color #737b78 | qa/screens/explore-places-member-1440-dev.png | all |
| F365 | P1 | 결과 개수 글자 크기·굵기·색 불일치 | 탐색 필터 바 우측 "총 N개 장소" — 배포 셀렉터 …xplore-module__8HEYta__toolbar > div.explore-module__8HEYta__toolbarEnd:nth-of-type(2) > p | font-size 14px; font-weight 600; color #495057 | `screens/place-recommend.html:259 (#count)` | font-size 13px; font-weight 400; color #4d5551 | qa/screens/explore-places-member-1440-dev.png | all |
| F363 | P2 | 정렬 세그먼트 배경·라운드 불일치 | 탐색 정렬 세그먼트 — 배포 셀렉터 …div.explore-module__8HEYta__toolbar > div.explore-module__8HEYta__sortGroup:nth-of-type(1) | background-color #f1f3f5; border-radius pill; gap 4px | `screens/place-recommend.html:251 (#sortSeg)` | background-color #f3f4f5; border-radius 30px; gap normal | qa/screens/explore-places-member-1440-dev.png | all |
| F364 | P2 | 필터 칩 배경·라운드 불일치 | 탐색 필터 칩(지역·특징·취향) — 배포 셀렉터 …-module__8HEYta__toolbar > details.explore-module__8HEYta__filter:nth-of-type(2) > summary | background-color #ffffff; border-radius pill | `reference/components.css:121 (.chip-btn)` | background-color #000000/0.00; border-radius 26px | qa/screens/explore-places-member-1440-dev.png | all |

## 장소 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F366 | P1 | 향 태그 칩 굵기·테두리색·높이 불일치 | 장소 상세 제목 아래 향 태그 — 배포 셀렉터 …tail > div.pd-body:nth-of-type(2) > div.pd-badges:nth-of-type(2) > a.pd-tag:nth-of-type(1) | font-weight 600; background-color #ffffff; border-top 1px solid #c3d7cb; border-radius pill | `screens/place-detail.html:68 (.scent-chip)` | font-weight 400; background-color #000000/0.00; border-top 1px solid #e0ebe4; border-radius 99px; 높이 43px, 링크(검색)로 동작 | qa/screens/place-detail-member-1440-dev.png | all |
| F369 | P1 | 리뷰 작성 버튼 형태 불일치 (텍스트 링크 → 채운 버튼) | 장소 상세 리뷰 헤더 우측 — 배포 셀렉터 …pe(4) > div.flex.flex-wrap.items-end:nth-of-type(1) > button.inline-flex.h-10.items-center | font-size 14px; color #2f4d40; background-color #000000/0.00; padding-left 0px; border-radius 0px | `screens/place-detail.html:101 (.pd-rv-write)` | font-size 12px; color #ffffff; background-color #3a5e4e; padding-left 20px; border-radius pill; 높이 40px, 아이콘 포함 | qa/screens/place-detail-member-1440-dev.png | all |
| F370 | P1 | 전체 리뷰 보기 버튼 폭·굵기·테두리색 불일치 | 장소 상세 리뷰 목록 하단 — 배포 셀렉터 …th-of-type(2) > section.place-reviews.mt-12.border-t:nth-of-type(4) > a.mt-4.flex.min-h-11 | font-weight 600; color #2f4d40; border-top 1px solid #6f9884; padding-left 24px | `screens/place-detail.html:140 (.btn-outline)` | font-weight 400; color #212529; border-top 1px solid #c3d7cb; padding-left 0px; 전체 폭 960×44 | qa/screens/place-detail-member-1440-dev.png | all |
| F367 | P2 | 저장(하트) 버튼 테두리색 불일치 | 장소 상세 제목 우측 하트 버튼 — 배포 셀렉터 …title-row:nth-of-type(1) > div.pd-actions > button.inline-flex.items-center.justify-center | border-top 1px solid #dee2e6 | `screens/place-detail.html:228 (#saveBtn)` | border-top 1px solid #e0ebe4 | qa/screens/place-detail-member-1440-dev.png | all |
| F368 | P2 | 지도 로딩 배경색 불일치 | 장소 상세 지도 캔버스 — 배포 셀렉터 …v.places-map.pd-map:nth-of-type(2) > div.places-map-canvas.leaflet-container.leaflet-touch | background-color #f8f9fa | `screens/place-detail.html:267 (#pdMap)` | background-color #dddddd | qa/screens/place-detail-member-1440-dev.png | all |

## 동선 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F371 | P1 | 동선 상세 매칭 배지 크기·테두리 불일치 | 동선 상세 제목 옆 매칭 % — 배포 셀렉터 …e-result-module__reWCXW__titleRow:nth-of-type(1) > span.route-result-module__reWCXW__match | font-size 14px; font-weight 600; background-color #ffffff; border-top 1px solid #c3d7cb; border-radius pill; padding-left 10px | `screens/route-detail.html:74 (.match-badge)` | font-size 13px; font-weight 400; background-color #000000/0.00; border-top 1px solid #e1e6e3; border-radius 20px; padding-left 8px; 높이 24px | qa/screens/route-detail-member-1440-dev.png | all |
| F374 | P1 | 타임라인 장소 카드 박스 스타일 추가 (테두리·그림자·흰 배경) | 동선 상세·결과 타임라인 장소 행 — 배포 셀렉터 …_track:nth-of-type(4) > div:nth-of-type(1) > article.route-result-module__reWCXW__stopCard | background-color #000000/0.00; border-top none; border-radius 0px; box-shadow none; padding-top 8px | `screens/route-detail.html:115 (.tl-cardwrap)` | background-color #ffffff; border-top 1px solid #ecefec; border-radius 12px; box-shadow #183323/0.04 0px 2px 5px 0px; padding-top 18px | qa/screens/route-detail-member-1440-dev.png | all |
| F372 | P2 | 동선 제목 줄높이 불일치 | 동선 상세 제목 — 배포 셀렉터 …div.route-result-module__reWCXW__titleRow:nth-of-type(1) > h1.min-w-0.break-words.text-2xl | line-height 31.2px | `screens/route-detail.html:424 (#rdTitle)` | line-height 33px | qa/screens/route-detail-member-1440-dev.png | all |
| F373 | P2 | 여행 컨셉 박스 글자 크기·여백 불일치 | 동선 상세 여행 컨셉 박스 — 배포 셀렉터 …-result-module__reWCXW__timeline > div.route-result-module__reWCXW__concept:nth-of-type(2) | font-size 14px; padding-top 12px; margin-top 0px | `screens/route-detail.html:80 (.rr-concept)` | font-size 13px; padding-top 14px; margin-top 20px | qa/screens/route-detail-member-1440-dev.png | all |

## 동선 만들기 · 조건

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F376 | P1 | 조건 질문 제목 굵기·색 불일치 | 동선 만들기 질문 제목 — 배포 셀렉터 …module__jKgwMW__wizard > div.planner-wizard-module__jKgwMW__wizardBody:nth-of-type(1) > h1 | font-weight 600; color #21332c | `screens/route-conditions.html:349 (.rc-q h2)` | font-weight 700; color #2c4034 | qa/screens/planner-ai-s02-1440-dev.png | all |
| F377 | P1 | 다음 버튼 비활성 글자색 불일치 | 동선 만들기 하단 다음 버튼 (선택 전) — 배포 셀렉터 …wizard-module__jKgwMW__actions:nth-of-type(2) > button.planner-wizard-module__jKgwMW__next | color #ffffff; background-color #dee2e6; border-radius pill | `screens/route-conditions.html:205 (#next)` | color #87948a; background-color #dce2de; border-radius 28px | qa/screens/planner-ai-s02-1440-dev.png | all |
| F375 | P2 | 조건 카드 그림자·테두리색 불일치 | 동선 만들기 조건 카드 — 배포 셀렉터 …ion.planner-shell.mx-auto.max-w-\[1380px\] > section.planner-wizard-module__jKgwMW__wizard | box-shadow #1b231d/0.04 0px 1px 2px 0px, #1b231d/0.06 0px 2px 6px 0px; border-top 1px solid #e0ebe4; padding-left 0px | `screens/route-conditions.html:53 (.rc-card)` | box-shadow #173526/0.02 0px 2px 8px 0px; border-top 1px solid #e0e5e1; padding-left 32px | qa/screens/planner-ai-s02-1440-dev.png | all |

## 내 여행 · 내 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F378 | P1 | 내 여행 서브 탭 글자 크기 불일치 (18 → 16px) | 내 여행 "내 장소 · 내 동선" 탭 — 배포 셀렉터 …n.bg-background.text-on-surface > section > div.my-trip > nav.trip-tabs > a:nth-of-type(1) | font-size 18px; line-height 27px; padding-top 16px; border-bottom none | `screens/my-trip.html:182 (.subtab .is-active)` | font-size 16px; line-height 24px; padding-top 0px; border-bottom 2px solid #212529 | qa/screens/mytrip-places-1440-dev.png | all |
| F379 | P2 | 동선 만들기 버튼 배경 그라디언트 누락 | 내 여행 필터 바 우측 버튼 — 배포 셀렉터 …split > section.trip-main > div.trip-toolbar:nth-of-type(1) > a.travel-primary.trip-create | background-image linear-gradient(#2f4d40 0%, #3a5e4e 100%); background-color #000000/0.00; padding-left 16px; gap 6px | `screens/my-trip.html:207 (.btn-make)` | background-image none; background-color #3a5e4e; padding-left 18px; gap 8px; 높이 41px | qa/screens/mytrip-places-1440-dev.png | all |

## 마이페이지

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F391 | P1 | 마이페이지 사이드 메뉴 선택 항목 색·배경 불일치 | /mypage 좌측 메뉴 선택 항목 — 배포 셀렉터 …den > nav.space-y-3 > div > div.space-y-1 > button.flex.w-full.items-center:nth-of-type(1) | color #212529; background-color #000000/0.00 | `screens/mypage.html:102 (.side-link)` | color #3a5e4e; background-color lab(92.0624 -4.74024 2.07188 / 0.55) | qa/screens/mypage-account-1440-dev.png | all |

## 센트립 소개

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F388 | P1 | 소개 히어로 제목 색·자간 불일치 | /about 히어로 h1 — 배포 셀렉터 …te:nth-of-type(1) > div.relative.mx-auto.max-w-\[900px\] > h1.mt-6.text-\[30px\].font-bold | color #121c18; letter-spacing -0.48px | `screens/about.html:222 (h1)` | color #21332c; letter-spacing -1.54px | qa/screens/about-guest-1440-dev.png | all |

## 이용약관

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F389 | P1 | 약관 문서 제목 크기 불일치 (28 → 32px) | /terms h1 (개인정보처리방침 동일 구조) — 배포 셀렉터 …10.border-b.border-surface-container-high > h1.text-\[32px\].font-semibold.tracking-normal | font-size 28px; line-height 35px | `screens/terms.html:56 (.terms-title)` | font-size 32px; line-height 48px | qa/screens/terms-1440-dev.png | all |
| F390 | P1 | 약관 조 제목 크기·굵기·색 불일치 | /terms 조 제목 h2 (개인정보처리방침 동일) — 배포 셀렉터 …rder-b.border-surface-container-high.py-8:nth-of-type(1) > h2.mb-4.text-\[21px\].font-bold | font-size 20px; font-weight 600; color #212529; line-height 25px | `screens/terms.html:59 (.terms-art h2)` | font-size 21px; font-weight 700; color #21332c; line-height 31.5px | qa/screens/terms-1440-dev.png | all |

## 부록 A. 원본 토큰 표 (reference/tokens.css) ↔ 배포 실측

측정: 1440 캡처 전체(qa/raw/*-1440-*.json)에서 텍스트 요소 computed style 빈도 집계

### 폰트 · 자간

| 항목 | 원본 | 배포 실측 |
|---|---|---|
| font-family | Pretendard, -apple-system, BlinkMacSystemFont, sans-serif | Pretendard, Geist, "Geist Fallback", "Noto Sans KR", … (1순위 Pretendard 동일) |
| letter-spacing | -0.03em (텍스트 요소 대부분 -0.03em) | normal 4,090곳 / -0.03em 계열은 일부 컴포넌트만 |
| 문항·결과 세리프 | Maru Buri (onboarding-test) | ui-serif 계열 |

### 타입 스케일

| 토큰 | 값 | 원본 사용 빈도 상위 | 배포 사용 빈도 상위 |
|---|---|---|---|
| display 48/40/36 | 48 / 40 / 36px | 16px 1,617 · 14px 1,448 · 12px 547 · 20px 493 · 13px 479 | 14px 2,546 · 16px 1,458 · 12px 1,440 · 13px 677 · 11px 601 |
| title 32/28 | 28 / 24px | 24px 176 · 28px 61 | 20px 538 · 15px 177 · 24px 171 · 22px 84 · 32px 30 · 17px 29 |
| heading 24/20 | 24 / 20px | | 토큰에 없는 15px · 17px · 22px · 29px · 56px 사용 |
| body 18/16/14 | 18 / 16 / 14px | | |
| caption 12/11 | 12 / 11px | | |

### 색 (시맨틱)

| 토큰 | 값 | 원본 텍스트 사용 | 배포 텍스트 사용 |
|---|---|---|---|
| --color-content-neutral | #212529 | 1,179 | 994 |
| --color-content-neutral-muted | #495057 | 1,218 | 985 |
| --color-content-default | #21332c | 438 | 1,686 |
| --color-content-subtle | #4f7a66 | 458 | 626 |
| --color-primary | #3a5e4e | 127 | 675 |
| neutral-subtle | #adb5bd | 846 | 518 |
| (토큰 없음) | — | — | #63756b 265 · #868e96 248 · #859087 224 · #315f54 184 · #737b78 · #344b40 · #2c4034 · #4d5551 · #b0b6b3 |

### 라운드 · 그림자

| 토큰 | 원본 사용 | 배포 사용 |
|---|---|---|
| radius full / xl16 / md8 / lg12 / 2xl24 | 9999px 2,016 · 16px 420 · 8px 369 · 12px 224 · 24px 80 | 8px 899 · pill 905 · 16px 536 · 12px 366 · 50% 326 · 99px 291 · 20px 238 · 10px 225 · 24px 202 |
| elevation-sm | 104 | 0 (대신 0 1px 3px #21332c/0.12 236곳) |
| elevation-lg | 71 | 0 (대신 0 12px 40px #21332c/0.09 · 0 8px 24px #21332c/0.09) |
| elevation-xs | 54 | 0 (대신 0 2px 8px #000000/0.27 115곳 — 검정 그림자) |

## 부록 B. 측정 방법 · 한계
- 컴포넌트 짝은 `qa/tools/pairs.py` 목록(원본 셀렉터 ↔ 배포 셀렉터)으로 비교, 결과 원본 수치는 `qa/raw/pairs-result.json`
- 위치 기반 자동 짝(`qa/tools/posdiff.py`) 결과는 `qa/raw/posdiff/*.json` — 티켓에는 짝이 확실한 항목만 반영
- 호버·포커스·프레스 상태 레이어(--color-state-*)는 자동 캡처로 확인하지 않음 → [확인필요]
- 원본 샘플 이미지·배포 실사진 차이, 콘텐츠 길이로 생긴 폭 차이는 제외
