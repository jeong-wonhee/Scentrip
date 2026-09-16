#!/usr/bin/env python3
"""핵심 컴포넌트 짝(원본 ↔ 배포) 일괄 비교 → qa/raw/pairs-result.json
각 항목: (페이지표기, 컴포넌트, pid, 원본 찾기, 배포 찾기, 순번)
"""
import json, os, subprocess, sys
ROOT = os.path.join(os.path.dirname(__file__), '..')
P = [
 # 공통 헤더·푸터
 ('공통(헤더)', '헤더 바', 'home-member', 'sel:nav.nav&&tag:nav', 'sel:header.sticky', 0),
 ('공통(헤더)', '로고 워드마크', 'home-member', 'sel:span.brand-name', 'sel:div.travel-topbar > a&&tag:span', 0),
 ('공통(헤더)', '내비 링크(기본)', 'home-member', 'text:소식&&sel:nav-link', 'text:소식&&sel:travel-desktop-nav', 0),
 ('공통(헤더)', '내비 링크(선택됨)', 'explore-places-member', 'text:탐색&&sel:nav-link', 'text:탐색&&sel:travel-desktop-nav', 0),
 ('공통(헤더)', '프로필 필', 'home-member', 'sel:button#profilePill', 'sel:button.account-pill', 0),
 ('공통(헤더)', '프로필 필 닉네임', 'home-member', 'sel:span.pill-name', 'sel:span.account-pill-name', 0),
 ('공통(헤더)', '비회원 로그인 버튼', 'home-guest', 'text:로그인&&sel:btn-login', 'text:로그인&&sel:account-login', 0),
 ('공통(푸터)', '푸터 영역', 'home-member', 'sel:footer.footer&&tag:footer', 'sel:footer.site-footer&&tag:footer', 0),
 ('공통(푸터)', '푸터 소개 문구', 'home-member', 'textin:나만의 취향을 찾아', 'textin:나만의 취향을 찾아', 0),
 ('공통(푸터)', '푸터 센트립 소개 링크', 'home-member', 'text:센트립 소개', 'text:센트립 소개', 0),
 ('공통(푸터)', '푸터 이메일', 'home-member', 'text:info.scentrip@gmail.com', 'text:info.scentrip@gmail.com', 0),
 ('공통(푸터)', '푸터 이용약관 링크', 'home-member', 'text:이용약관', 'text:이용약관', 0),
 ('공통(푸터)', '푸터 개인정보처리방침 링크', 'home-member', 'text:개인정보처리방침', 'text:개인정보처리방침', 0),
 # 홈
 ('홈', '취향 카드', 'home-member', 'sel:div#tasteCard', 'sel:section.home-taste-card', 0),
 ('홈', '취향 카드 eyebrow', 'home-member', 'sel:p.taste-eyebrow', 'textin:님의 여행 취향&&tag:p', 0),
 ('홈', '취향 카드 제목', 'home-member', 'sel:p#tasteTitle', 'sel:home-taste-copy&&tag:h1', 0),
 ('홈', '취향 카드 자세히 보기 버튼', 'home-member', 'sel:a#tasteLink', 'textin:자세히 보기&&tag:a', 0),
 ('홈', '소식 섹션 제목', 'home-member', 'sel:news-head-title > h2', 'textin:여행 소식&&tag:h2', 0),
 ('홈', '소식 항목 제목', 'home-member', 'sel:p.news-title', 'sel:home-news-copy&&tag:h3', 0),
 ('홈', '소식 항목 설명', 'home-member', 'sel:p.news-desc', 'sel:home-news-copy&&tag:p', 0),
 ('홈', '소식 썸네일', 'home-member', 'sel:span.news-thumb', 'sel:home-news-item&&tag:img', 0),
 ('홈', '섹션 제목', 'home-member', 'sel:p.section-title', 'textin:님 취향의 여행 장소 추천&&tag:h2', 0),
 ('홈', '섹션 전체 보기 링크', 'home-member', 'sel:a.section-more', 'text:전체 보기&&tag:a', 0),
 ('공통(카드)', '장소 카드 사진', 'home-member', 'sel:div#placeRow > a.card:nth-of-type(1) > div.card-photo', 'sel:home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > div.travel-card-photo', 0),
 ('공통(카드)', 'AI 매칭 배지', 'home-member', 'sel:#placeRow > a.card:nth-of-type(1) > div.card-photo:nth-of-type(1) > div.card-top > div.badge-wrap > span.badge&&tag:span', 'sel:article.travel-card:nth-of-type(1) > div.travel-card-photo > span.travel-badge', 0),
 ('공통(카드)', 'AI 매칭 배지 텍스트', 'home-member', 'textin:AI 매칭 88%&&tag:span', 'sel:article.travel-card:nth-of-type(1) > div.travel-card-photo > span.travel-badge', 1),
 ('공통(카드)', '장소 카드 이름', 'home-member', 'sel:#placeRow > a.card:nth-of-type(1) > div.card-body:nth-of-type(2) > p.card-name', 'sel:home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > h3', 0),
 ('공통(카드)', '장소 카드 설명', 'home-member', 'sel:#placeRow > a.card:nth-of-type(1) > div.card-body:nth-of-type(2) > p.card-desc', 'sel:home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > p', 0),
 ('공통(카드)', '장소 카드 메타', 'home-member', 'sel:#placeRow > a.card:nth-of-type(1) > div.card-body:nth-of-type(2) > div.card-meta&&tag:div', 'sel:home-places:nth-of-type(2) > article.travel-card:nth-of-type(1) > a.travel-card-copy > div.travel-card-meta&&tag:div', 0),
 ('공통(카드)', '동선 카드 사진(지도)', 'home-member', 'sel:article.route-card:nth-of-type(1) > div.route-photo&&tag:div', 'sel:routeCard:nth-of-type(1) > div.explore-module__8HEYta__routeThumbnail&&tag:div', 0),
 ('공통(카드)', '동선 카드 메타', 'home-member', 'sel:article.route-card:nth-of-type(1) > div.route-body:nth-of-type(2) > div.route-meta', 'textin:2개 장소 · 당일 · 이동 약 6분&&sel:__meta', 0),
 ('홈', 'AI 동선 배너', 'home-member', 'sel:div.ai-banner&&tag:div', 'sel:section.home-banner:nth-of-type(4) > div.grid', 0),
 ('홈', 'AI 동선 배너 제목', 'home-member', 'sel:div.ai-banner-tx > h2', 'text:센트립 AI로 나만의 여행 동선을 제작해보세요', 0),
 ('홈', 'AI 동선 배너 설명', 'home-member', 'sel:div.ai-banner-tx > p', 'textin:원하는 조건으로 커스텀', 0),
 ('홈', 'AI 동선 배너 버튼', 'home-member', 'sel:a.ai-banner-btn', 'textin:나만의 동선 만들기&&tag:a', 0),
 # 탐색
 ('탐색 · 장소', '탭(선택됨)', 'explore-places-member', 'text:여행 장소&&sel:tab', 'text:여행 장소&&sel:__tabs', 0),
 ('탐색 · 장소', '탭(기본)', 'explore-places-member', 'text:여행 동선&&sel:tab', 'text:여행 동선&&sel:__tabs', 0),
 ('탐색 · 장소', '정렬 세그먼트 컨테이너', 'explore-places-member', 'sel:div#sortSeg', 'sel:div.explore-module__8HEYta__sortGroup', 0),
 ('탐색 · 장소', '정렬 선택됨', 'explore-places-member', 'text:취향 매칭순&&tag:button', 'text:취향 매칭순', 0),
 ('탐색 · 장소', '정렬 기본', 'explore-places-member', 'text:인기순&&tag:button', 'text:인기순', 0),
 ('탐색 · 장소', '필터 칩', 'explore-places-member', 'sel:#filterChips > div.filter:nth-of-type(2) > button.chip-btn', 'sel:details.explore-module__8HEYta__filter:nth-of-type(2) > summary', 0),
 ('탐색 · 장소', '결과 개수', 'explore-places-member', 'sel:p#count', 'textin:개 장소&&sel:toolbarEnd', 0),
 ('탐색 · 장소', '카드 그리드', 'explore-places-member', 'sel:div#grid', 'sel:div.explore-module__8HEYta__placeGrid', 0),
 # 장소 상세
 ('장소 상세', '히어로 이미지', 'place-detail-member', 'sel:pd-hero&&tag:img', 'attr:전경&&tag:img', 0),
 ('장소 상세', '장소명', 'place-detail-member', 'tag:h1', 'tag:h1', 0),
 ('장소 상세', '특징 · 지역 줄', 'place-detail-member', 'sel:p.pd-desc', 'textin:부산광역시 강서구&&tag:p', 0),
 ('장소 상세', '향 태그 칩', 'place-detail-member', 'sel:span.scent-chip', 'sel:a.pd-tag:nth-of-type(1)', 0),
 ('장소 상세', '섹션 제목', 'place-detail-member', 'text:장소 소개&&tag:h2', 'text:장소 소개&&tag:h2', 0),
 ('장소 상세', '소개 본문', 'place-detail-member', 'sel:p.pd-p', 'textin:대저생태공원은 대저수문부터&&tag:p', 0),
 ('장소 상세', '정보 박스', 'place-detail-member', 'sel:section.pd-sec:nth-of-type(1) > div.pd-info&&tag:div', 'sel:section.pd-section:nth-of-type(1) > div.pd-info&&tag:div', 0),
 ('장소 상세', '저장 버튼', 'place-detail-member', 'sel:button#saveBtn', 'attr:저장한 여행에서 제거&&tag:button', 0),
 ('장소 상세', '지도', 'place-detail-member', 'sel:div#pdMap', 'sel:leaflet-container', 0),
 ('장소 상세', '리뷰 작성 버튼', 'place-detail-member', 'sel:a.pd-rv-write', 'text:내 리뷰 수정&&tag:button', 0),
 ('장소 상세', '전체 리뷰 보기 버튼', 'place-detail-member', 'text:전체 리뷰 보기&&tag:a', 'text:전체 리뷰 보기', 0),
 # 동선 상세
 ('동선 상세', '동선 제목', 'route-detail-member', 'sel:h2#rdTitle', 'sel:titleRow&&tag:h1', 0),
 ('동선 상세', '매칭 배지', 'route-detail-member', 'sel:span.match-badge', 'sel:span.route-result-module__reWCXW__match', 0),
 ('동선 상세', '여행 컨셉 칩', 'route-detail-member', 'sel:span.rr-concept', 'sel:div.route-result-module__reWCXW__concept', 0),
 ('동선 상세', '타임라인 장소 카드', 'route-detail-member', 'sel:div.tl-card&&tag:div', 'sel:article.route-result-module__reWCXW__stopCard', 0),
 ('동선 상세', '장소 번호 마커', 'route-detail-member', 'sel:span.tl-node.is-num', 'sel:span.route-result-module__reWCXW__stopMarker', 0),
 ('동선 상세', '하단 저장 바', 'route-detail-member', 'textin:마음에 드는 동선인가요&&tag:div', 'sel:div.route-result-module__reWCXW__saveBar:nth-of-type(2)&&tag:div', 0),
 ('동선 상세', '하단 CTA 버튼', 'route-detail-member', 'text:이 동선으로 여행 만들기&&tag:button', 'text:이 동선으로 여행 만들기', 0),
 # 동선 만들기
 ('동선 만들기 · 조건', '조건 카드', 'planner-ai-s02', 'sel:section.rc-card', 'sel:section.planner-wizard-module__jKgwMW__wizard', 0),
 ('동선 만들기 · 조건', '질문 제목', 'planner-ai-s02', 'sel:section.rc-q > h2', 'tag:h1', 0),
 ('동선 만들기 · 조건', '선택지 칩', 'planner-ai-s02', 'text:1박 2일&&tag:button', 'sel:label.planner-wizard-module__jKgwMW__choice:nth-of-type(2)&&tag:label', 0),
 ('동선 만들기 · 조건', '다음 버튼(비활성)', 'planner-ai-s02', 'sel:button#next', 'text:다음&&tag:button', 0),
 # 내 여행
 ('내 여행 · 내 장소', '서브 탭(선택됨)', 'mytrip-places', 'text:내 장소&&sel:subtab', 'text:내 장소&&sel:trip-tabs', 0),
 ('내 여행 · 내 장소', '페이지 제목', 'mytrip-places', 'textin:내 장소&&sel:mt-main&&tag:h1', 'sel:h1.trip-heading', 0),
 ('내 여행 · 내 장소', '동선 만들기 버튼', 'mytrip-places', 'sel:button.btn-make&&tag:button', 'sel:a.travel-primary.trip-create', 0),
 ('내 여행 · 내 장소', '지도 영역', 'mytrip-places', 'sel:div.mt-map:nth-of-type(2)&&tag:div', 'sel:div.trip-map&&tag:div', 0),
 # 로그인 · 가입 · 테스트 · 소개
 ('로그인', '타이틀', 'login', 'tag:h1', 'tag:h1', 0),
 ('로그인', '혜택 박스', 'login', 'sel:ul.auth-perks&&tag:ul', 'textin:나의 향 취향에 맞는&&tag:ul', 0),
 ('로그인', 'Google 버튼', 'login', 'sel:button#googleBtn', 'text:Google로 계속하기&&tag:button', 0),
 ('회원가입', '가입 완료하기 버튼', 'signup-A-11-all-agreed', 'sel:button#submitBtn', 'text:가입 완료하기&&tag:button', 0),
 ('회원가입', '닉네임 입력', 'signup-A-11-all-agreed', 'sel:input#nick&&tag:input', 'sel:label.block.pt-4.text-sm:nth-of-type(3) > input&&tag:input', 0),
 ('취향 테스트', '표지 제목', 'taste-intro-guest', 'tag:h1', 'tag:h1', 0),
 ('취향 테스트', '시작 버튼', 'taste-intro-guest', 'sel:button#introStart', 'textin:취향 테스트 시작&&tag:button', 0),
 ('취향 테스트', '문항 제목', 'taste-A-member-first-WHAN-q01', 'sel:#qTitle', 'tag:h1', 0),
 ('취향 테스트', '선택지 카드', 'taste-A-member-first-WHAN-q01', 'sel:button.choice', 'sel:main&&tag:button', 0),
 ('센트립 소개', '히어로 제목', 'about-guest', 'tag:h1', 'tag:h1', 0),
 ('센트립 소개', '하단 CTA 패널', 'about-guest', 'sel:div.cta-panel&&tag:div', 'sel:gradient-depth&&tag:div&&textin:아직 만나지 못한', 0),
 ('이용약관', '문서 제목', 'terms', 'tag:h1', 'tag:h1', 0),
 ('이용약관', '조 제목', 'terms', 'tag:h2', 'tag:h2', 0),
 ('마이페이지', '사이드 메뉴 항목(선택됨)', 'mypage-account', 'text:계정 설정&&sel:side-link', 'text:계정 설정&&tag:button', 0),
]
out = []
for page, comp, pid, dq, vq, n in P:
    r = subprocess.run(['python3', os.path.join(ROOT, 'tools', 'comp.py'), pid, dq, vq, '--n', f'0,{n}'], capture_output=True, text=True)
    j = [l for l in r.stdout.splitlines() if l.startswith('JSON ')]
    if not j:
        out.append({'page': page, 'comp': comp, 'pid': pid, 'error': r.stdout.strip()[:80]}); print('X', page, comp, r.stdout.strip()[:60]); continue
    d = json.loads(j[0][5:]); d.update(page=page, comp=comp, pid=pid); out.append(d)
    print('O', page, comp, len(d['diff']))
json.dump(out, open(os.path.join(ROOT, 'raw', 'pairs-result.json'), 'w'), ensure_ascii=False, indent=1)
