// 원본 ↔ 배포본 페이지 · 상태 짝 (ID는 qa/00-page-map.md 기준)
// auth: member(배포본 계정 A) | guest | B(배포본 계정 B)
export const PAGES = [
  // 진입 · 온보딩
  { id: 'login', map: 'P-01', auth: 'guest', design: { url: 'login.html' }, dev: { url: '/login' } },
  { id: 'login-error-cancel', map: 'P-01b', auth: 'guest', vp: [1440], design: { url: 'login.html?error=cancel' }, dev: { url: '/login?error=cancel' } },
  { id: 'login-error-expired', map: 'P-01b', auth: 'guest', vp: [1440], design: { url: 'login.html?error=expired' }, dev: { url: '/login?error=expired' } },
  { id: 'login-error-failed', map: 'P-01b', auth: 'guest', vp: [1440], design: { url: 'login.html?error=failed' }, dev: { url: '/login?error=failed' } },
  { id: 'login-error-network', map: 'P-01b', auth: 'guest', vp: [1440], design: { url: 'login.html?error=network' }, dev: { url: '/login?error=network' } },
  { id: 'login-error-noemail', map: 'P-01b', auth: 'guest', vp: [1440], design: { url: 'login.html?error=noemail' }, dev: { url: '/login?error=noemail' } },
  { id: 'login-error-suspended', map: 'P-01b', auth: 'guest', vp: [1440], design: { url: 'login.html?error=suspended' }, dev: { url: '/login?error=suspended' } },
  { id: 'taste-intro-guest', map: 'P-03', auth: 'guest', design: { url: 'onboarding-test.html' }, dev: { url: '/taste' } },
  { id: 'taste-intro-member', map: 'P-03', design: { url: 'onboarding-test.html' }, dev: { url: '/taste' } },

  // 홈 · 소식
  { id: 'home-member', map: 'P-04', design: { url: 'home.html' }, dev: { url: '/' } },
  { id: 'home-guest', map: 'P-04a', auth: 'guest', design: { url: 'home.html' }, dev: { url: '/' } },
  { id: 'news-member', map: 'P-05', design: { url: 'news.html' }, dev: { url: '/news' } },
  { id: 'news-guest', map: 'P-05', auth: 'guest', design: { url: 'news.html' }, dev: { url: '/news' } },
  { id: 'news-detail-member', map: 'P-06', design: { url: 'news-detail.html?id=damyang-three-greens' }, dev: { url: '/news/green-rest-guide' } },
  { id: 'news-detail-guest', map: 'P-06', auth: 'guest', design: { url: 'news-detail.html?id=damyang-three-greens' }, dev: { url: '/news/green-rest-guide' } },

  // 탐색
  { id: 'explore-places-member', map: 'P-07', design: { url: 'place-recommend.html' }, dev: { url: '/explore' } },
  { id: 'explore-places-guest', map: 'P-07a', auth: 'guest', design: { url: 'place-recommend.html' }, dev: { url: '/explore' } },
  { id: 'explore-routes-member', map: 'P-08', design: { url: 'route.html' }, dev: { url: '/explore?tab=routes' } },
  { id: 'explore-routes-guest', map: 'P-08', auth: 'guest', design: { url: 'route.html' }, dev: { url: '/explore?tab=routes' } },
  { id: 'place-detail-member', map: 'P-09', design: { url: 'place-detail.html' }, dev: { url: '/explore/tour_00031' } },
  { id: 'place-detail-guest', map: 'P-09', auth: 'guest', design: { url: 'place-detail.html' }, dev: { url: '/explore/tour_00031' } },
  { id: 'place-detail-noreviews', map: 'P-09a', design: { url: 'place-detail.html?reviews=0' }, dev: { url: '/explore/tour_00031' } },
  { id: 'place-reviews-member', map: 'P-10', design: { url: 'place-reviews.html' }, dev: { url: '/explore/tour_00031/reviews' } },
  { id: 'place-reviews-guest', map: 'P-10', auth: 'guest', design: { url: 'place-reviews.html' }, dev: { url: '/explore/tour_00031/reviews' } },
  { id: 'place-reviews-empty', map: 'P-10a', design: { url: 'place-reviews.html?reviews=0' }, dev: { url: '/explore/tour_00031/reviews' } },
  { id: 'route-detail-member', map: 'P-11', design: { url: 'route-detail.html?from=explore&name=%EC%9A%B4%EC%B9%98%EC%9E%88%EB%8A%94+%EB%8B%B4%EC%96%91+%EB%8B%B9%EC%9D%BC%EC%B9%98%EA%B8%B0+%EC%BD%94%EC%8A%A4&place=%5B%EC%A3%BD%EB%85%B9%EC%9B%90%5D&desc=%EC%9D%B4%EC%84%9C%EC%97%B0%EB%8B%98%EC%9D%98+%EC%B7%A8%ED%96%A5%EC%9D%84+%EB%A7%8C%EC%A1%B1%EC%8B%9C%EC%BC%9C%EC%A4%84+%EC%9A%B4%EC%B9%98%EC%9E%88%EB%8A%94+%EB%8B%B4%EC%96%91+%EB%8B%B9%EC%9D%BC%EC%B9%98%EA%B8%B0+%EC%BD%94%EC%8A%A4&meta=5%EA%B0%9C+%EC%9E%A5%EC%86%8C+%C2%B7+%EB%8B%B9%EC%9D%BC%EC%B9%98%EA%B8%B0+%C2%B7+%EC%97%AC%EC%9C%A0%EB%A1%9C%EC%9A%B4+%EC%BD%94%EC%8A%A4&match=88&pop=1720' }, dev: { url: '/planner/river-forest' } },
  { id: 'route-detail-guest', map: 'P-11', auth: 'guest', design: { url: 'route-detail.html?from=explore&name=%EC%9A%B4%EC%B9%98%EC%9E%88%EB%8A%94+%EB%8B%B4%EC%96%91+%EB%8B%B9%EC%9D%BC%EC%B9%98%EA%B8%B0+%EC%BD%94%EC%8A%A4&place=%5B%EC%A3%BD%EB%85%B9%EC%9B%90%5D&desc=%EC%9D%B4%EC%84%9C%EC%97%B0%EB%8B%98%EC%9D%98+%EC%B7%A8%ED%96%A5%EC%9D%84+%EB%A7%8C%EC%A1%B1%EC%8B%9C%EC%BC%9C%EC%A4%84+%EC%9A%B4%EC%B9%98%EC%9E%88%EB%8A%94+%EB%8B%B4%EC%96%91+%EB%8B%B9%EC%9D%BC%EC%B9%98%EA%B8%B0+%EC%BD%94%EC%8A%A4&meta=5%EA%B0%9C+%EC%9E%A5%EC%86%8C+%C2%B7+%EB%8B%B9%EC%9D%BC%EC%B9%98%EA%B8%B0+%C2%B7+%EC%97%AC%EC%9C%A0%EB%A1%9C%EC%9A%B4+%EC%BD%94%EC%8A%A4&match=88&pop=1720' }, dev: { url: '/planner/river-forest' } },
  { id: 'route-detail-missing', map: 'P-11', design: { url: 'route-detail.html?from=explore' }, dev: { url: '/planner/not-exist-route' } },
  { id: 'news-detail-missing', map: 'P-06', design: { url: 'news-detail.html?id=not-exist' }, dev: { url: '/news/not-exist-slug' } },
  { id: 'place-detail-missing', map: 'P-09', design: null, dev: { url: '/explore/not-exist-place' } },

  // 동선 만들기
  { id: 'planner-ai', map: 'P-12', design: { url: 'route-conditions.html?mode=ai' }, dev: { url: '/planner?mode=ai' } },
  { id: 'planner-region', map: 'P-12a', design: { url: 'route-conditions.html?mode=region' }, dev: { url: '/planner?mode=region' } },
  { id: 'planner-picked', map: 'P-12b', design: { url: 'route-conditions.html?mode=picked' }, dev: { url: '/planner?mode=picked' } },
  { id: 'route-create', map: 'P-13', design: { url: 'route-create.html' }, dev: { url: '/planner?mode=saved-places' } },
  { id: 'route-result', map: 'P-14', design: { url: 'route-result.html' }, dev: null },

  // 내 여행
  { id: 'mytrip-places', map: 'P-15', design: { url: 'my-trip.html' }, dev: { url: '/dashboard' } },   // 원본은 저장 10곳 샘플 — 배포 계정 A 저장 후 재캡처
  { id: 'mytrip-routes', map: 'P-16', design: { url: 'my-trip-routes.html' }, dev: { url: '/dashboard?tab=routes' } },
  { id: 'mytrip-guest', map: 'P-15b', auth: 'guest', design: { url: 'my-trip.html' }, dev: { url: '/dashboard' } },

  // 마이페이지
  { id: 'mypage-account', map: 'P-17', design: { url: 'mypage.html#account' }, dev: { url: '/mypage#account' } },
  { id: 'mypage-reviews', map: 'P-17b', design: { url: 'mypage.html#reviews' }, dev: { url: '/mypage#reviews' } },
  { id: 'mypage-support', map: 'P-17f', design: { url: 'mypage.html#support' }, dev: { url: '/mypage#support' } },
  { id: 'mypage-withdraw', map: 'P-17g', design: { url: 'mypage.html#withdraw' }, dev: { url: '/mypage#withdraw' } },
  { id: 'mypage-guest', map: 'P-17h', auth: 'guest', design: { url: 'mypage.html' }, dev: { url: '/mypage' } },

  // 소개 · 약관
  { id: 'about-member', map: 'P-18', design: { url: 'about.html' }, dev: { url: '/about' } },
  { id: 'about-guest', map: 'P-18', auth: 'guest', design: { url: 'about.html' }, dev: { url: '/about' } },
  { id: 'terms', map: 'P-19', auth: 'guest', design: { url: 'terms.html' }, dev: { url: '/terms' } },
  { id: 'privacy', map: 'P-20', auth: 'guest', design: { url: 'privacy.html' }, dev: { url: '/privacy' } },
];
