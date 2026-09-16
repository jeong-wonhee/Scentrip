# 04. 플로우 · 연결 대조

- 기준: 원본 `screens/*.html` (npx serve 로컬) ↔ 배포 https://scentrip.vercel.app · 1440×900 · 확인일 2026-09-16
- 회원 화면은 신규 Google 계정 A(qa검수A · WHAN)로, 가입 전 검사 분기는 계정 B(qa검수B · CLDR)로 확인
- 표기: **P0/P1/P2** = 개발 티켓 후보 · **확인필요** = 확인하지 못함 · **원본에없음** = 배포본에만 있음 · **원본확인** = 원본 자체 문제
- 원본 샘플 데이터(장소명·소식 글·리뷰 등 자리표시자)와 배포 실데이터 값 차이는 제외하고, 라벨·문구 규칙·구성·형식만 대조

## 요약

| 구분 | 건수 |
|---|---|
| P0 | 14 |
| P1 | 1 |
| 확인필요 | 1 |
| **합계** | **16** |

| 페이지 | 건수 |
|---|---|
| 공통(헤더) | 1 |
| 로그인 | 1 |
| 취향 테스트 | 3 |
| 홈 | 1 |
| 소식 상세 | 1 |
| 장소 상세 | 1 |
| 동선 상세 | 4 |
| 동선 만들기 · 장소 선택 | 1 |
| 내 여행 · 내 장소 | 1 |
| 마이페이지 | 2 |

## 공통(헤더)

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F420 | P0 | 헤더 로그인 버튼이 현재 페이지 복귀 주소(next)를 넘기지 않음 | https://scentrip.vercel.app/explore/tour_00031 (비로그인) → 헤더 로그인 | login.html?next={현재 페이지 경로+쿼리+해시} → 로그인 후 보던 화면으로 복귀 | `screens/home.html:610 (data-login)` | /login (next 없음) | qa/raw/flows-dev.json | all |

## 로그인

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F425 | 확인필요 | Google 로그인 취소(cancel) 실제 플로우 | /login → Google 화면에서 취소 | login.html?error=cancel → 'Google 로그인이 취소되었습니다. 다시 시도해 주세요.' | `screens/login.html:157` | 사용자 수동 로그인 과정이라 실제 취소 경로 미실행 (URL 파라미터 처리는 1단계 티켓) | - | all |

## 취향 테스트

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F417 | P0 | 회원 결과 CTA 이동 경로 불일치 (탐색 → 내 여행) | https://scentrip.vercel.app/taste?result=latest — '내 여행에서 추천 보기' | '여행지 둘러보기' → 탐색 장소 추천(place-recommend.html) | `screens/onboarding-test.html:2196` | /dashboard (내 여행) | qa/screens/taste-A-member-first-WHAN-result-1440-dev.png | all |
| F418 | P0 | 비회원 결과 가입 CTA 복귀 경로 불일치 | https://scentrip.vercel.app/taste (비로그인 결과) — '가입하고 여행지 추천받기' | login.html?next=place-recommend.html&from=test → 가입 후 탐색으로, 검사 결과 저장 안내 | `screens/onboarding-test.html:2198` | /login?next=/dashboard → 가입 후 내 여행 | qa/screens/login-B-from-test-1440-dev.png | all |
| F419 | P0 | 재검사(결과 있는 회원) CTA 상태 미구현 | 계정 A(WHAN 결과 보유)로 /taste 재검사 → CLDR 결과 | '새로운 결과가 나왔어요' / '이 결과로 프로필을 업데이트하면 새 취향에 맞는 여행지를 추천받아요. 저장 전까지는 기존 취향이 그대로 유지돼요.' / [업데이트하고 추천받기] [다시 검사하기] | `screens/onboarding-test.html:2158-2165` | 첫 검사와 같은 CTA 'qa검수A님 취향의 여행 장소를 더 만나보세요 / 내 여행에서 추천 보기' — 업데이트 확인 단계 없음 | qa/screens/taste-A-member-retest-CLDR-result-1440-dev.png | all |

## 홈

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F303 | P0 | '나만의 동선 만들기'가 모달 대신 /planner로 이동 | https://scentrip.vercel.app/ — AI 동선 배너 '나만의 동선 만들기' (a[href='/planner']) | '동선 만들기' 모달(AI 추천 / 원하는 지역 / 찜한 장소 → 다음) → 선택한 모드로 조건 입력 | `screens/home.html:411, 모달 rmTitle` | 모달 없이 /planner 이동 (위저드 첫 단계에서 모드 선택) | qa/screens/ov-route-make-home-1440-dev.png | all |

## 소식 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F415 | P0 | '글 속 장소로 동선 만들기'가 조건 입력 대신 막힘 화면으로 이동 | https://scentrip.vercel.app/news/green-rest-guide → 동선 만들기 CTA → /planner?story=green-rest-guide | 글 속 장소를 담아 조건 입력(route-conditions.html?mode=picked, 하단 "선택한 장소" 바)으로 이동 | `screens/news-detail.html:275, 400-405` | '낙동강제방(강서30리벚꽃길) · 위치 확인 중 / 정확한 위치가 확인되지 않아 이 장소를 포함한 동선은 아직 만들 수 없습니다.' + [다른 장소 찾아보기] [장소 지정 없이 새 동선 만들기] — 조건 입력으로 못 감 | qa/screens/flow-news-detail-cta-1440-dev.png | all |

## 장소 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F421 | P0 | '카카오맵에서 보기'가 OpenStreetMap 링크로 대체 | https://scentrip.vercel.app/explore/tour_00031 — 지도 영역 외부 링크 | map.kakao.com/link/search/{주소} 새 탭 | `screens/place-detail.html:269` | openstreetmap.org/?mlat…&mlon… 새 탭 (지도 제목 옆 + 정보 박스 아래 2곳) | qa/screens/place-detail-member-1440-dev.png | all |

## 동선 상세

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F412 | P0 | 홈에서 들어온 동선 상세의 breadcrumb가 진입 경로를 반영하지 않음 | https://scentrip.vercel.app/ → 동선 카드 클릭 → /planner/green-rest | 홈 진입: '홈 › {동선 이름}' (홈 링크 → /), 헤더 선택 메뉴 없음 | `screens/route-detail.html:605-610 (renderCrumb · from=home)` | '탐색 › 여행 동선' (진입 경로와 무관하게 고정) | qa/screens/flow-home-route-detail-1440-dev.png | all |
| F413 | P0 | 내 여행에서 들어온 내 동선 상세의 breadcrumb·하단 버튼 불일치 | https://scentrip.vercel.app/dashboard?tab=routes → 저장 동선 카드 → /planner/{uuid} | breadcrumb '내 여행 › 내 동선 › {동선 이름}' (내 동선 → 내 동선 탭), 헤더 '내 여행' 선택, 하단 버튼 '편집하기' | `screens/route-detail.html:605-610, 708` | breadcrumb '내 여행 › 여행 동선'(현재 동선 이름 없음), 하단 버튼 '이 일정 수정하기' | qa/screens/flow-mytrip-route-detail-1440-dev.png | all |
| F414 | P0 | '이 동선으로 여행 만들기'가 결과 화면 대신 장소 선택 화면으로 이동 | https://scentrip.vercel.app/planner/river-forest → 하단 CTA | 동선을 담아 AI 맞춤 동선 결과 화면(route-result.html?open=1)으로 이동 — 여행 조건 모달이 열린 상태 | `screens/route-detail.html:470-472` | /planner?template=river-forest — "여행 동선을 만들 장소를 선택해주세요" 장소 선택 화면 (총 6개 장소) | qa/screens/flow-route-detail-cta-1440-dev.png | all |
| F422 | P0 | 구간 '길찾기'(카카오맵 길찾기 새 탭)가 페이지 내 지도 앵커로 대체 | https://scentrip.vercel.app/planner/river-forest — 이동 구간 우측 링크 | map.kakao.com/link/to/{다음 장소},{위도},{경도} 새 탭 | `screens/route-detail.html:655, screens/route-result.html (tl-link)` | '지도 보기' → #route-detail-map (같은 페이지, 1440에서는 화면에 안 보임) | qa/screens/route-detail-member-1440-dev.png | all |

## 동선 만들기 · 장소 선택

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F423 | P1 | 장소 선택 화면 푸터 누락 (센트립 소개·약관·개인정보처리방침·이메일 진입 불가) | https://scentrip.vercel.app/planner?mode=saved-places | 공통 푸터 (센트립 소개 / info.scentrip@gmail.com / 이용약관 / 개인정보처리방침) | `screens/route-create.html (footer)` | 푸터 없음 | qa/screens/route-create-1440-dev.png | all |

## 내 여행 · 내 장소

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F304 | P0 | '동선 만들기'가 모달 대신 /planner?mode=saved-places로 이동 | https://scentrip.vercel.app/dashboard — 필터 바 우측 '동선 만들기' | '동선 만들기' 모달 → 모드 선택 | `screens/my-trip.html:368-371` | 모달 없이 /planner?mode=saved-places 이동 | qa/screens/ov-route-make-mytrip-1440-dev.png | all |

## 마이페이지

| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |
|---|---|---|---|---|---|---|---|---|
| F416 | P0 | 메뉴 이동이 브라우저 기록에 남지 않아 뒤로가기로 이전 탭에 못 돌아감 | https://scentrip.vercel.app/mypage#account → 내 리뷰 → 고객센터 → 브라우저 뒤로 | 뷰마다 history.pushState → 뒤로가기 시 이전 뷰(#reviews)로 | `screens/mypage.html:1218` | 해시만 바뀌고 기록이 쌓이지 않아 뒤로가기 한 번에 마이페이지를 벗어남(이전 페이지로 이동) | qa/raw/flows-dev.json | all |
| F424 | P0 | 회원탈퇴 완료 후 로그아웃·홈 이동이 안 되고 사이트 전체가 무한 리다이렉트 | https://scentrip.vercel.app/mypage#withdraw → '탈퇴' 입력 → [회원탈퇴] → 확인 모달 [계정 삭제] (계정 B design.sadie@gmail.com 실제 탈퇴) | 탈퇴 처리 후 비회원 상태로 홈(home.html) 이동 — 이후 모든 화면 정상 이용 | `screens/mypage.html:1195-1198` | 삭제 직후 ERR_TOO_MANY_REDIRECTS 오류 화면. 남은 세션 쿠키(sb-…-auth-token) 때문에 / → /signup, /login → /signup, /signup → /login 이 반복 (예: /mypage → /signup?next=%2Fmypage → /login?next=%2Fmypage → …). 브라우저 쿠키를 직접 지우기 전까지 홈 포함 전 화면 접근 불가. (계정 데이터는 삭제됨 — 리뷰 사라짐 확인, 쿠키 삭제 후 같은 Google 계정 로그인 시 가입 화면으로 정상 이동) | qa/screens/withdraw-B-04-after-delete-1440-dev.png | all |

## 부록 A. 원본 링크 전수 대조 (1440, 정적 a[href])

상태: 일치 = 기대 경로·target 같음 / 요소없음 = 배포본에 같은 라벨 링크 없음(대부분 1단계 티켓의 문구·구성 차이 또는 원본 샘플 데이터) / 차이 = 목적지 다름

| 화면 | 라벨 | 원본 href | 기대 배포 경로 | 배포 href | target(원본/배포) | 상태 |
|---|---|---|---|---|---|---|
| home-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| home-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| home-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| home-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| home-member | 자세히 보기 | `onboarding-test.html?type=WHAN` | /taste | `/taste?result=latest` | - / - | 일치 |
| home-member | 전체 보기 | `news.html` | /news | `/explore` | - / - | 일치 |
| home-member |  | `news-detail.html?id=andong-old-wood` | /news/[slug] | `/news/[slug]` | - / - | 일치 |
| home-member | 전체 보기 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| home-member |  | `place-detail.html` | /explore/[id] | `/news/[slug]` | - / - | 일치 |
| home-member | 전체 보기 | `route.html` | /explore?tab=routes | `/explore` | - / - | 일치 |
| home-member | {지역} {컨셉} | `route-detail.html?from=home&name=%7B%EC%A7%80%EC%97%AD%7D+%7B%EC%BB%A8` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| home-member | 안동 숨은 힙플레이스 탐방 | `route-detail.html?from=home&name=%EC%95%88%EB%8F%99+%EC%88%A8%EC%9D%80` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| home-member | 거제도 자연풍경 힐링 코스 | `route-detail.html?from=home&name=%EA%B1%B0%EC%A0%9C%EB%8F%84+%EC%9E%90` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| home-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| home-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| home-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| home-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| home-guest | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| home-guest | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| home-guest | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| home-guest | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| home-guest | 취향 테스트하기 | `onboarding-test.html` | /taste | `/taste` | - / - | 일치 |
| home-guest | 전체 보기 | `news.html` | /news | `/explore` | - / - | 일치 |
| home-guest |  | `news-detail.html?id=damyang-three-greens` | /news/[slug] | `/news/[slug]` | - / - | 일치 |
| home-guest | 전체 보기 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| home-guest |  | `place-detail.html` | /explore/[id] | `/news/[slug]` | - / - | 일치 |
| home-guest | 전체 보기 | `route.html` | /explore?tab=routes | `/explore` | - / - | 일치 |
| home-guest | {지역} {컨셉} | `route-detail.html?from=home&name=%7B%EC%A7%80%EC%97%AD%7D+%7B%EC%BB%A8` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| home-guest | 안동 숨은 힙플레이스 탐방 | `route-detail.html?from=home&name=%EC%95%88%EB%8F%99+%EC%88%A8%EC%9D%80` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| home-guest | 거제도 자연풍경 힐링 코스 | `route-detail.html?from=home&name=%EA%B1%B0%EC%A0%9C%EB%8F%84+%EC%9E%90` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| home-guest | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| home-guest | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| home-guest | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| home-guest | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| news-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| news-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| news-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| news-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| news-member |  | `news-detail.html?id=andong-old-wood` | /news/[slug] | `/news/[slug]` | - / - | 일치 |
| news-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| news-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| news-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| news-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| news-detail-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| news-detail-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| news-detail-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| news-detail-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| news-detail-member | 죽녹원 | `place-detail.html` | /explore/[id] | `` | - / - | 요소없음 |
| news-detail-member | 관방제림 | `place-detail.html` | /explore/[id] | `` | - / - | 요소없음 |
| news-detail-member | 메타세쿼이아길 | `place-detail.html` | /explore/[id] | `` | - / - | 요소없음 |
| news-detail-member | 원문 보기 | `https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=4a0db7bc-c0` | https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=4a0db7bc-c0 | `` | _blank / - | 요소없음 |
| news-detail-member | 원문 보기 | `https://www.heritage.go.kr/heri/cul/culSelectDetail.do?pageNo=1_1_2_0&` | https://www.heritage.go.kr/heri/cul/culSelectDetail.do?pageNo=1_1_2_0& | `` | _blank / - | 요소없음 |
| news-detail-member |  | `news-detail.html?id=gyeongju-light-fades` | /news/[slug] | `/explore/[id]` | - / - | 일치 |
| news-detail-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| news-detail-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| news-detail-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| news-detail-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| explore-places-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| explore-places-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| explore-places-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| explore-places-member | 여행 장소 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| explore-places-member | 여행 동선 | `route.html` | /explore?tab=routes | `/explore?tab=routes` | - / - | 일치 |
| explore-places-member |  | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| explore-places-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| explore-places-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| explore-places-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| explore-places-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| explore-routes-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| explore-routes-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| explore-routes-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| explore-routes-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| explore-routes-member | 여행 장소 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| explore-routes-member | 여행 동선 | `route.html` | /explore?tab=routes | `/explore?tab=routes` | - / - | 일치 |
| explore-routes-member | 운치있는 담양 당일치기 코스 | `route-detail.html?from=explore&name=%EC%9A%B4%EC%B9%98%EC%9E%88%EB%8A%` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 안동 고택과 서원 산책 | `route-detail.html?from=explore&name=%EC%95%88%EB%8F%99+%EA%B3%A0%ED%83` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 강릉 바다 향 따라 1박 2일 | `route-detail.html?from=explore&name=%EA%B0%95%EB%A6%89+%EB%B0%94%EB%8B` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 제주 숲길 힐링 코스 | `route-detail.html?from=explore&name=%EC%A0%9C%EC%A3%BC+%EC%88%B2%EA%B8` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 경주 한옥 감성 산책 | `route-detail.html?from=explore&name=%EA%B2%BD%EC%A3%BC+%ED%95%9C%EC%98` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 전주 한옥마을 느린 여행 | `route-detail.html?from=explore&name=%EC%A0%84%EC%A3%BC+%ED%95%9C%EC%98` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 강릉 해안 드라이브 동선 | `route-detail.html?from=explore&name=%EA%B0%95%EB%A6%89+%ED%95%B4%EC%95` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 성수동 힙플레이스 탐방 | `route-detail.html?from=explore&name=%EC%84%B1%EC%88%98%EB%8F%99+%ED%9E` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 경주 황리단길 감성 산책 | `route-detail.html?from=explore&name=%EA%B2%BD%EC%A3%BC+%ED%99%A9%EB%A6` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 제주 서쪽 일몰 투어 | `route-detail.html?from=explore&name=%EC%A0%9C%EC%A3%BC+%EC%84%9C%EC%AA` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 부산 광안리 야경 코스 | `route-detail.html?from=explore&name=%EB%B6%80%EC%82%B0+%EA%B4%91%EC%95` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 전주 먹거리 투어 | `route-detail.html?from=explore&name=%EC%A0%84%EC%A3%BC+%EB%A8%B9%EA%B1` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| explore-routes-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| explore-routes-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| explore-routes-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| explore-routes-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| place-detail-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| place-detail-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| place-detail-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| place-detail-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| place-detail-member | Leaflet | `https://leafletjs.com` | https://leafletjs.com | `https://leafletjs.com` | - / - | 일치 |
| place-detail-member | 카카오맵에서 보기 | `https://map.kakao.com/link/search/%EC%A0%84%EB%82%A8%20%EC%9E%A5%ED%9D` | https://map.kakao.com/link/search/%EC%A0%84%EB%82%A8%20%EC%9E%A5%ED%9D | `` | _blank / - | 요소없음 |
| place-detail-member | 리뷰 작성하기 | `mypage.html?place=%EC%B2%9C%EA%B4%80%EC%82%B0%20%EC%96%B5%EC%83%88%20%` | /mypage#review-write | `` | - / - | 요소없음 |
| place-detail-member | 전체 리뷰 보기 | `place-reviews.html?place=%EC%B2%9C%EA%B4%80%EC%82%B0%20%EC%96%B5%EC%83` | /explore/[id]/reviews | `/explore/[id]/reviews` | - / - | 일치 |
| place-detail-member |  | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| place-detail-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| place-detail-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| place-detail-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| place-detail-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| place-reviews-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| place-reviews-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| place-reviews-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| place-reviews-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| place-reviews-member |  | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| place-reviews-member | 리뷰 작성하기 | `mypage.html?place=%EC%B2%9C%EA%B4%80%EC%82%B0+%EC%96%B5%EC%83%88+%EC%9` | /mypage#review-write | `` | - / - | 요소없음 |
| place-reviews-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| place-reviews-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| place-reviews-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| place-reviews-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| route-detail-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| route-detail-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| route-detail-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| route-detail-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| route-detail-member | 여행 동선 | `route.html` | /explore?tab=routes | `/explore?tab=routes` | - / - | 일치 |
| route-detail-member | 죽녹원 | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| route-detail-member | 길찾기 | `https://map.kakao.com/link/to/%EB%A9%94%ED%83%80%EC%84%B8%EC%BF%BC%EC%` | https://map.kakao.com/link/to/%EB%A9%94%ED%83%80%EC%84%B8%EC%BF%BC%EC% | `` | _blank / - | 요소없음 |
| route-detail-member | 메타세쿼이아길 | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| route-detail-member | 길찾기 | `https://map.kakao.com/link/to/%EC%86%8C%EC%87%84%EC%9B%90,35.2277,127.` | https://map.kakao.com/link/to/%EC%86%8C%EC%87%84%EC%9B%90,35.2277,127. | `` | _blank / - | 요소없음 |
| route-detail-member | 소쇄원 | `place-detail.html` | /explore/[id] | `` | - / - | 요소없음 |
| route-detail-member | 길찾기 | `https://map.kakao.com/link/to/%EA%B4%80%EB%B0%A9%EC%A0%9C%EB%A6%BC,35.` | https://map.kakao.com/link/to/%EA%B4%80%EB%B0%A9%EC%A0%9C%EB%A6%BC,35. | `` | _blank / - | 요소없음 |
| route-detail-member | 관방제림 | `place-detail.html` | /explore/[id] | `` | - / - | 요소없음 |
| route-detail-member | 길찾기 | `https://map.kakao.com/link/to/%EB%AA%85%EC%98%A5%ED%97%8C%20%EC%9B%90%` | https://map.kakao.com/link/to/%EB%AA%85%EC%98%A5%ED%97%8C%20%EC%9B%90% | `` | _blank / - | 요소없음 |
| route-detail-member | 명옥헌 원림 | `place-detail.html` | /explore/[id] | `` | - / - | 요소없음 |
| route-detail-member | Leaflet | `https://leafletjs.com` | https://leafletjs.com | `https://leafletjs.com` | - / - | 일치 |
| mytrip-places | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| mytrip-places | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| mytrip-places | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| mytrip-places | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mytrip-places | 내 장소 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mytrip-places | 내 동선 | `my-trip-routes.html` | /dashboard?tab=routes | `/dashboard?tab=routes` | - / - | 일치 |
| mytrip-places |  | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| mytrip-places | Leaflet | `https://leafletjs.com` | https://leafletjs.com | `https://leafletjs.com` | - / - | 일치 |
| mytrip-places | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| mytrip-places | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| mytrip-places | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| mytrip-places | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| mytrip-routes | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| mytrip-routes | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| mytrip-routes | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| mytrip-routes | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mytrip-routes | 내 장소 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mytrip-routes | 내 동선 | `my-trip-routes.html` | /dashboard?tab=routes | `/dashboard?tab=routes` | - / - | 일치 |
| mytrip-routes | 강릉 해안 드라이브 동선 | `route-detail.html?from=mytrip&name=%EA%B0%95%EB%A6%89+%ED%95%B4%EC%95%` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| mytrip-routes | 성수동 힙플레이스 탐방 | `route-detail.html?from=mytrip&name=%EC%84%B1%EC%88%98%EB%8F%99+%ED%9E%` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| mytrip-routes | 경주 황리단길 감성 산책 | `route-detail.html?from=mytrip&name=%EA%B2%BD%EC%A3%BC+%ED%99%A9%EB%A6%` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| mytrip-routes | 제주 서쪽 일몰 투어 | `route-detail.html?from=mytrip&name=%EC%A0%9C%EC%A3%BC+%EC%84%9C%EC%AA%` | /planner/[id] | `/planner/[id]` | - / - | 일치 |
| mytrip-routes | 부산 광안리 야경 코스 | `route-detail.html?from=mytrip&name=%EB%B6%80%EC%82%B0+%EA%B4%91%EC%95%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 전주 먹거리 투어 | `route-detail.html?from=mytrip&name=%EC%A0%84%EC%A3%BC+%EB%A8%B9%EA%B1%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 양양 서핑 & 카페 여행 | `route-detail.html?from=mytrip&name=%EC%96%91%EC%96%91+%EC%84%9C%ED%95%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 인천 개항장 시간 여행 | `route-detail.html?from=mytrip&name=%EC%9D%B8%EC%B2%9C+%EA%B0%9C%ED%95%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 수원 성곽길 트래킹 | `route-detail.html?from=mytrip&name=%EC%88%98%EC%9B%90+%EC%84%B1%EA%B3%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 담양 죽녹원 힐링 로드 | `route-detail.html?from=mytrip&name=%EB%8B%B4%EC%96%91+%EC%A3%BD%EB%85%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 강릉 양떼 힐링 투어 | `route-detail.html?from=mytrip&name=%EA%B0%95%EB%A6%89+%EC%96%91%EB%96%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 서울 궁궐 야간 개장 코스 | `route-detail.html?from=mytrip&name=%EC%84%9C%EC%9A%B8+%EA%B6%81%EA%B6%` | /planner/[id] | `` | - / - | 요소없음 |
| mytrip-routes | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| mytrip-routes | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| mytrip-routes | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| mytrip-routes | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| mypage-account | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| mypage-account | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| mypage-account | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| mypage-account | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mypage-account | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| mypage-account | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| mypage-account | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| mypage-account | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| mypage-support | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| mypage-support | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| mypage-support | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| mypage-support | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mypage-support | 문의하기 | `mailto:info.scentrip@gmail.com?subject=%5B%EC%84%BC%ED%8A%B8%EB%A6%BD%` | mailto:info.scentrip@gmail.com?subject=%5B%EC%84%BC%ED%8A%B8%EB%A6%BD% | `` | - / - | 요소없음 |
| mypage-support | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| mypage-support | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| mypage-support | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| mypage-support | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| about-guest | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| about-guest | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| about-guest | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| about-guest | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| about-guest | 향 취향 테스트 시작하기 | `onboarding-test.html` | /taste | `` | - / - | 요소없음 |
| about-guest | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| about-guest | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| about-guest | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| about-guest | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| about-member | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| about-member | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| about-member | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| about-member | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| about-member | 향 취향 테스트 시작하기 | `onboarding-test.html` | /taste | `` | - / - | 요소없음 |
| about-member | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| about-member | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| about-member | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| about-member | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| terms | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| terms | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| terms | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| terms | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| terms | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| terms | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| terms | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| terms | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| privacy | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| privacy | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| privacy | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| privacy | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| privacy | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| privacy | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| privacy | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| privacy | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| login | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| signup-A-01-initial | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| taste-intro-guest | 센트립 홈으로 이동 | `home.html` | / | `/` | - / - | 일치 |
| taste-B-guest-CLDR-result | 센트립 홈으로 이동 | `home.html` | / | `/` | - / - | 일치 |
| taste-A-member-first-WHAN-result | 센트립 홈으로 이동 | `home.html` | / | `/` | - / - | 일치 |
| route-create | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| route-create | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| route-create | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| route-create | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| route-create | 동선 만들기 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| route-create | Leaflet | `https://leafletjs.com` | https://leafletjs.com | `https://leafletjs.com` | - / - | 일치 |
| route-create | 센트립 소개 | `about.html` | /about | `` | - / - | 요소없음 |
| route-create | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `` | - / - | 요소없음 |
| route-create | 이용약관 | `terms.html` | /terms | `` | - / - | 요소없음 |
| route-create | 개인정보처리방침 | `privacy.html` | /privacy | `` | - / - | 요소없음 |
| route-result-ai | 센트립 홈 | `home.html` | / | `` | - / - | 요소없음 |
| route-result-ai | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| route-result-ai | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| route-result-ai | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| route-result-ai | 경포호 솔숲 | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| route-result-ai | 길찾기 | `https://map.kakao.com/link/to/%EC%95%88%EB%AA%A9%ED%95%B4%EB%B3%80,37.` | https://map.kakao.com/link/to/%EC%95%88%EB%AA%A9%ED%95%B4%EB%B3%80,37. | `` | _blank / - | 요소없음 |
| route-result-ai | 안목해변 | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| route-result-ai | Leaflet | `https://leafletjs.com` | https://leafletjs.com | `https://leafletjs.com` | - / - | 일치 |
| place-detail-guest | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| place-detail-guest | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| place-detail-guest | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| place-detail-guest | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| place-detail-guest | Leaflet | `https://leafletjs.com` | https://leafletjs.com | `https://leafletjs.com` | - / - | 일치 |
| place-detail-guest | 카카오맵에서 보기 | `https://map.kakao.com/link/search/%EC%A0%84%EB%82%A8%20%EC%9E%A5%ED%9D` | https://map.kakao.com/link/search/%EC%A0%84%EB%82%A8%20%EC%9E%A5%ED%9D | `` | _blank / - | 요소없음 |
| place-detail-guest | 리뷰 작성하기 | `mypage.html?place=%EC%B2%9C%EA%B4%80%EC%82%B0%20%EC%96%B5%EC%83%88%20%` | /mypage#review-write | `` | - / - | 요소없음 |
| place-detail-guest | 전체 리뷰 보기 | `place-reviews.html?place=%EC%B2%9C%EA%B4%80%EC%82%B0%20%EC%96%B5%EC%83` | /explore/[id]/reviews | `/explore/[id]/reviews` | - / - | 일치 |
| place-detail-guest |  | `place-detail.html` | /explore/[id] | `/explore/[id]` | - / - | 일치 |
| place-detail-guest | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| place-detail-guest | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| place-detail-guest | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| place-detail-guest | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| mypage-withdraw | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| mypage-withdraw | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| mypage-withdraw | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| mypage-withdraw | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| mypage-withdraw | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| mypage-withdraw | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| mypage-withdraw | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| mypage-withdraw | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |
| news-guest | 센트립 홈 | `home.html` | / | `/` | - / - | 일치 |
| news-guest | 소식 | `news.html` | /news | `/news` | - / - | 일치 |
| news-guest | 탐색 | `place-recommend.html` | /explore | `/explore` | - / - | 일치 |
| news-guest | 내 여행 | `my-trip.html` | /dashboard | `/dashboard` | - / - | 일치 |
| news-guest |  | `news-detail.html?id=damyang-three-greens` | /news/[slug] | `/news/[slug]` | - / - | 일치 |
| news-guest | 센트립 소개 | `about.html` | /about | `/about` | - / - | 일치 |
| news-guest | info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | mailto:info.scentrip@gmail.com | `mailto:info.scentrip@gmail.com` | - / - | 일치 |
| news-guest | 이용약관 | `terms.html` | /terms | `/terms` | - / - | 일치 |
| news-guest | 개인정보처리방침 | `privacy.html` | /privacy | `/privacy` | - / - | 일치 |

- 보정: 홈 "전체 보기" 4곳은 라벨이 같아 자동 짝이 어긋났으나 순서대로 직접 확인하면 /news · /explore · /explore?tab=routes · /explore 로 일치. 홈 "자세히 보기"는 원본 onboarding-test.html?type={내 유형}(내 결과 바로 보기) ↔ 배포 /taste?result=latest 로 같은 기능

## 부록 B. 배포본 실측 플로우 기록

| 시나리오 | 결과 |
|---|---|
| home→route-detail | `{"url": "https://scentrip.vercel.app/planner/green-rest", "crumb": "탐색 › 여행 동선", "bar": ["이 동선으로 여행 만들기"], "native": []}` |
| explore→route-detail | `{"url": "https://scentrip.vercel.app/explore?tab=routes", "crumb": null, "native": []}` |
| mytrip→route-detail(saved mine) | `{"url": "https://scentrip.vercel.app/planner/fa96e890-8824-45d4-80af-34fb326deafd", "crumb": "내 여행 › 여행 동선", "bar": ["이 일정 수정하기"], "hrefs": ["/dashboard", "/dashboard?tab=routes"], "native": []}` |
| route-detail CTA | `{"url": "https://scentrip.vercel.app/planner?template=river-forest", "text": "Scentrip\n소식\n탐색\n내 여행\n한국어\nEnglish\n日本語\n简体中文\n繁體中文\nqa검수A\n\n이전 단계로\n여행 동선을 만들 장소를 선택해주세요\n지역\n특징\n취향\n\n총 6개 장소 · 같은 시·도에서 최대 12개 선택\n\n다대포해수욕장\n\n백사장 길이 900m 폭 65~330m의 얕은 수심으로 가족단위 피서지로 유명\n\n부산 · 자연경관\n몰운대\n\n태종대·해운` |
| news-detail CTA | `{"url": "https://scentrip.vercel.app/planner?story=green-rest-guide", "text": "Scentrip\n소식\n탐색\n내 여행\n한국어\nEnglish\n日本語\n简体中文\n繁體中文\nqa검수A\n낙동강제방(강서30리벚꽃길) · 위치 확인 중\n\n정확한 위치가 확인되지 않아 이 장소를 포함한 동선은 아직 만들 수 없습니다. 장소 정보와 찜 기능은 계속 이용할 수 있어요.\n\n다른 장소 찾아보기\n장소 지정 없이 새 동선 만들기", "native": []}` |
| news-detail back link | `{"detail": "https://scentrip.vercel.app/news/green-rest-guide", "afterBack": "https://scentrip.vercel.app/news", "native": []}` |
| place-detail→reviews→back | `{"reviews": "https://scentrip.vercel.app/explore/tour_00031/reviews", "backLink": "https://scentrip.vercel.app/explore/tour_00031", "historyBack": "https://scentrip.vercel.app/explore/tour_00031/reviews", "native": []}` |
| explore place→detail→browser back | `{"detail": "https://scentrip.vercel.app/explore/tour_00168", "crumb": null, "backLinks": ["탐색", "탐색"], "afterBack": "https://scentrip.vercel.app/explore", "native": []}` |
| taste result(member) CTA | `{"cta": ["내 여행에서 추천 보기"], "href": "/dashboard", "url": "https://scentrip.vercel.app/taste?result=latest", "native": []}` |
| mypage hash nav + back | `{"afterReviews": "https://scentrip.vercel.app/mypage#reviews", "afterSupport": "https://scentrip.vercel.app/mypage#support", "afterBack": "about:blank", "native": []}` |
| mytrip empty CTA/tab links | `{"tabs": [["내 장소", "/dashboard"], ["내 동선", "/dashboard?tab=routes"]], "native": []}` |
| guest header login | `{"href": "/login", "url": "https://scentrip.vercel.app/login", "native": []}` |
| guest home 나만의 동선 만들기 | `{"url": "https://scentrip.vercel.app/login?next=%2Fplanner", "dialogs": [], "native": []}` |
| guest taste result signup CTA | `{"note": "covered by account B run: /login?next=/dashboard", "native": []}` |
| 404 links | `{"links": [["홈으로", "/"], ["여행지 탐색", "/explore"]], "native": []}` |
| place-detail kakao/osm link targets | `{"links": [["OpenStreetMap ↗", "https://www.openstreetmap.org/?mlat=35.199412&mlon=128.97434", "_blank"], ["등록된 외부 정보 ↗", "https://www.data.go.kr/data/15101578/openapi.do", "_blank"], ["이미지 출처: Wikimedia Commons · Appleysj", "https://commons.wikimedia.org/wiki/File:Daejeo_Ecological_Pa", "_blank"], ` |
| route-detail 지도 보기 | `{"error": "locator.click: Timeout 30000ms exceeded.", "url": "https://scentrip.vercel.app/planner/river-forest"}` |
| explore detail 이 장소로 동선 만들기(guest) | `{"url": "https://scentrip.vercel.app/login?next=%2Fplanner%3Fplace%3Dtour_00031", "native": []}` |
| 재검사·로그아웃 | `{"retestEntry": "Scentrip\n\nSCENTRIP TASTE\n\n당신의 여행은\n어떤 향인가요?\n\n열두 개의 여행 장면을 고르면 네 가지 감각이 만나\n나만의 향 타입과 어울리는 여행을 알려드려요.\n\n취향 테스트 시작\n\n약 1분 · 12개 질문", "retestCTA": "이런 여행을 좋아해요\n\n북스테이에서 여유로운 시간 보내기\n\n디자인 카페와 편집숍 둘러보기\n\n한적한 해변 산책하기\n\n효율적인 동선으로 여행하기\n\nqa검수A님 취향의 여행 장소를 더 만나보세요\n\n이 취향을 바탕으로 ` |

- 확인 결과 원본과 같은 흐름: 소식 상세 "← 여행 소식" → /news, 리뷰 전체 → 장소명 링크 → 상세, 404 → 홈으로 · 여행지 탐색, 로그아웃 → 비회원 홈, 탐색 → 장소 상세 → 뒤로가기 → 탐색, 내 여행 탭 링크(/dashboard · /dashboard?tab=routes), 외부 링크는 모두 새 탭
- 데이터 영향: 계정 A 재검사를 CLDR로 완료(업데이트 버튼 없음 — 프로필 유형이 바뀌었을 수 있음). 계정 B는 로그아웃됨(세션 파일 무효).

## 부록 C. 회원탈퇴 실측 (계정 B, 2026-09-16)

| 단계 | 결과 | 증거 |
|---|---|---|
| 비로그인으로 /mypage#withdraw 접근 → 로그인 | 로그인 후 /mypage#withdraw 로 복귀 (next 유지) | - |
| 확인 입력 없음 / '탈퇴하기' 입력 | [회원탈퇴] 비활성 | `qa/screens/withdraw-B-01-initial-1440-dev.png` |
| '탈퇴' 입력 | [회원탈퇴] 활성 | `qa/screens/withdraw-B-02-ready-1440-dev.png` |
| [회원탈퇴] 클릭 | 확인 모달 '계정을 영구 삭제할까요?' | `qa/screens/withdraw-B-03-confirm-modal-1440-dev.png` |
| [계정 삭제] 클릭 | ERR_TOO_MANY_REDIRECTS (login↔signup 반복) | `qa/screens/withdraw-B-04-after-delete-1440-dev.png` |
| 쿠키 삭제 후 홈 | 비회원 홈 정상 | - |
| 같은 Google 계정 재로그인 | /signup?next=%2Fdashboard (재가입 화면, 가입은 하지 않음) | `qa/screens/withdraw-B-06-relogin-1440-dev.png` |
| 계정 B 리뷰 | 장소 리뷰 목록에서 삭제됨 (리뷰 1개 = 계정 A만) | - |
