#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""3단계(창 너비) 발견 사항 기록 + 매트릭스 부록 생성"""
import json, subprocess, os
ROOT = os.path.join(os.path.dirname(__file__), '..')
F = []
def add(**k): F.append(dict(step=3, **k))

add(page='공통(헤더)', sev='P2', vp='640', title='640에서 헤더 내비가 두 번째 줄로 내려감', where='전 화면 헤더 (배포 nav.travel-mobile-nav)', expected='640에서도 로고 · 소식 · 탐색 · 내 여행 · 우측 버튼이 한 줄(높이 56px) 유지', src='reference/components.css (.nav) · 캡처 home-member-640-design', actual='로고·우측만 첫 줄, 소식·탐색·내 여행은 둘째 줄(y 56~69)로 분리되어 헤더 높이 증가', shot='qa/screens/home-member-640-dev.png', fix='640까지 데스크톱 내비 한 줄 유지 (모바일 내비 전환 제거)')
add(page='탐색 · 동선', sev='P1', vp='1024', title='1024에서 동선 카드 그리드 열 수 불일치 (2열 → 3열)', where='/explore?tab=routes 동선 카드 그리드', expected='1440·1280 3열 → 1024 2열 → 640 2열', src='screens/route.html (.grid 미디어쿼리)', actual='1024에서도 3열 유지', shot='qa/screens/explore-routes-member-1024-dev.png', fix='1024 구간에서 2열로 접히게')
add(page='소식 목록', sev='P1', vp='1024', title='1024에서 소식 카드 열 수 불일치 (2열 → 3열)', where='/news 카드 목록', expected='1440 3열 → 1024 2열 → 640 2열', src='screens/news.html (.grid 미디어쿼리)', actual='1024에서 하단 카드 3열 유지 (+ 대표 글 히어로)', shot='qa/screens/news-member-1024-dev.png', fix='1024에서 2열')
add(page='소식 목록', sev='P2', vp='640', title='640에서 소식 카드가 1열로 접힘 (원본 2열)', where='/news 카드 목록', expected='640에서 2열', src='screens/news.html (.grid 미디어쿼리)', actual='640에서 1열 + 히어로 세로 적층', shot='qa/screens/news-member-640-dev.png', fix='640에서 2열 유지')
add(page='센트립 소개', sev='P1', vp='1024', title='1024에서 소개 단계 카드 열 수 불일치 (1열 → 3열)', where='/about WHY SCENTRIP 단계 카드 01·02·03', expected='1440·1280 3열 → 1024부터 1열', src='screens/about.html (미디어쿼리)', actual='1024에서도 3열, 640에서 1열', shot='qa/screens/about-guest-1024-dev.png', fix='1024 구간에서 1열로')
add(page='센트립 소개', sev='P2', vp='1024 / 640', title='창을 줄여도 소개 히어로 제목 크기가 줄지 않음', where='/about 히어로 h1', expected='1440 44px → 1024 40.96px → 640 30px', src='screens/about.html (h1 유동 크기)', actual='1440·1024·640 모두 44px', shot='qa/screens/about-guest-640-dev.png', fix='원본처럼 너비에 따라 축소')
add(page='마이페이지', sev='P1', vp='1024', title='1024에서 마이페이지 메뉴가 가로 탭으로 바뀌지 않음', where='/mypage 좌측 메뉴', expected='1440 세로 사이드 메뉴 → 1024·640 상단 가로 탭(계정 설정 · 내 리뷰 · 고객센터)', src='screens/mypage.html (nav#side 미디어쿼리)', actual='1024 세로 사이드 메뉴 유지, 640에서만 가로 탭', shot='qa/screens/mypage-account-1024-dev.png', fix='1024 구간부터 상단 가로 탭')
add(page='동선 상세', sev='P2', vp='640', title='640에서 지도가 타임라인 아래로 감 (원본은 위)', where='/planner/[id] 지도 · 타임라인', expected='640: 지도(높이 320px)가 타임라인 위', src='screens/route-detail.html (미디어쿼리)', actual='타임라인 다음 맨 아래에 지도(높이 420px)', shot='qa/screens/route-detail-member-640-dev.png', fix='640에서 지도를 위로, 높이 320px')
add(page='동선 만들기 · 결과', sev='P2', vp='640', title='640에서 결과 지도가 타임라인 아래로 감 (원본은 위)', where='/planner 결과 지도 · 타임라인', expected='640: 지도(높이 320px)가 위', src='screens/route-result.html (미디어쿼리)', actual='지도(높이 420px)가 타임라인 아래', shot='qa/screens/route-result-ai-640-dev.png', fix='640에서 지도를 위로')
add(page='동선 만들기 · 장소 선택', sev='P1', vp='1024', title='1024에서 장소 선택 화면 좌우 분할 유지 (원본은 지도 위 · 목록 아래)', where='/planner?mode=saved-places 목록 · 지도', expected='1440 좌 목록 · 우 지도 → 1024부터 지도 위, 목록 아래 한 단', src='screens/route-create.html (미디어쿼리)', actual='1024에서 좌우 분할 유지, 640에서만 지도 위', shot='qa/screens/route-create-1024-dev.png', fix='1024 구간에서 한 단으로')
add(page='탐색 · 장소', sev='P2', vp='640', title='640에서 결과 개수 위치 불일치', where='/explore 필터 바', expected="640: 정렬 세그먼트 줄 오른쪽에 '총 N개 장소' (y 228), 필터 칩은 다음 줄", src='screens/place-recommend.html (.filterbar 미디어쿼리)', actual='필터 칩 아래 별도 줄에 검색 아이콘 + 개수 (y 320)', shot='qa/screens/explore-places-member-640-dev.png', fix='개수를 정렬 줄 오른쪽으로')
add(page='장소 리뷰', sev='P2', vp='640', title='640에서 별점 요약이 세로로 쌓이지 않음', where='/explore/[id]/reviews 별점 요약', expected='640: 평균 점수 위 · 5~1점 막대 아래 (세로)', src='screens/place-reviews.html (.prv-sum 미디어쿼리)', actual='평균(좌) · 막대(우) 가로 배치 유지', shot='qa/screens/place-reviews-member-640-dev.png', fix='640에서 세로 배치')
add(page='내 여행 · 내 동선', sev='P2', vp='640', title="640에서 '동선 만들기' 버튼 위치 불일치", where='/dashboard?tab=routes 필터 바', expected='640: 필터 칩 아래 별도 줄 왼쪽 (x 32, y 314)', src='screens/my-trip-routes.html (.mt-bar 미디어쿼리)', actual='필터 칩과 같은 줄 오른쪽 끝 (x 499, y 282)', shot='qa/screens/mytrip-routes-640-dev.png', fix='640에서 버튼을 다음 줄로')
# 원본 확인 필요
add(page='홈', sev='원본확인', vp='640', title='원본 640 가로 스크롤 (동선 카드 제목 넘침)', where="screens/home.html — AI 맞춤 동선 두 번째 카드 제목 '안동 숨은 힙플레이스 탐방'", expected='가로 스크롤 없음', src='screens/home.html (.route-title)', actual='문서 폭 651px > 640px, 제목 링크가 오른쪽 밖으로 나감', shot='qa/screens/home-member-640-design.png', fix='원본 동선 카드 제목 줄바꿈/말줄임 결정 필요')
add(page='탐색 · 장소', sev='원본확인', vp='640', title='원본 640 가로 스크롤', where='screens/place-recommend.html', expected='가로 스크롤 없음', src='screens/place-recommend.html', actual='문서 폭 693px > 640px (넘치는 보이는 요소 미특정)', shot='qa/screens/explore-places-member-640-design.png', fix='원본에서 넘침 원인 확인')
add(page='동선 만들기 · 장소 선택', sev='원본확인', vp='640', title='원본 640 가로 스크롤', where='screens/route-create.html', expected='가로 스크롤 없음', src='screens/route-create.html', actual='문서 폭 687px > 640px', shot='qa/screens/route-create-640-design.png', fix='원본에서 넘침 원인 확인')
add(page='내 여행 · 내 장소', sev='원본확인', vp='640', title='원본 640 가로 스크롤', where='screens/my-trip.html', expected='가로 스크롤 없음', src='screens/my-trip.html', actual='문서 폭 687px > 640px', shot='qa/screens/mytrip-places-640-design.png', fix='원본에서 넘침 원인 확인')
add(page='내 여행 · 내 장소', sev='원본확인', vp='1024 / 640', title='원본 지도 확대 버튼(+/−)이 헤더 로고를 덮음', where='screens/my-trip.html · screens/route-create.html — 지도가 위로 오는 1024·640', expected='헤더가 지도 컨트롤 위에 보임', src='screens/my-trip.html (.mt-map) · Leaflet 컨트롤 z-index', actual='실제 창(1024×768, 640×800)에서 +/− 버튼이 로고 위에 겹침', shot='qa/screens/mytrip-places-1024-design.png', fix='원본에서 지도 z-index 조정 필요')
add(page='내 여행 · 내 장소', sev='원본확인', vp='640', title="원본 640 지도가 '내 장소 10' 제목을 가림", where='screens/my-trip.html — 640×800 실제 창', expected='지도 아래에 제목이 보임', src='screens/my-trip.html (.mt-map-canvas)', actual='제목 위치의 최상단 요소가 지도 캔버스 — 제목이 가려짐', shot='qa/screens/mytrip-places-640-design.png', fix='원본에서 지도 캔버스 높이/흐름 수정 필요')
subprocess.run(['python3', os.path.join(ROOT, 'tools', 'add.py')], input=json.dumps(F, ensure_ascii=False), text=True)

m = json.load(open(os.path.join(ROOT, 'raw', 'width-matrix.json')))
names = {'login': '로그인', 'signup-A-01-initial': '회원가입', 'taste-intro-guest': '취향 테스트 표지', 'taste-A-member-first-WHAN-q01': '취향 테스트 문항', 'taste-A-member-first-WHAN-result': '취향 테스트 결과', 'home-member': '홈(회원)', 'home-guest': '홈(비회원)', 'news-member': '소식 목록', 'news-detail-member': '소식 상세', 'explore-places-member': '탐색 · 장소(회원)', 'explore-places-guest': '탐색 · 장소(비회원)', 'explore-routes-member': '탐색 · 동선', 'place-detail-member': '장소 상세', 'place-reviews-member': '장소 리뷰', 'route-detail-member': '동선 상세', 'planner-ai-s02': '동선 만들기 · 조건(1단계)', 'route-result-ai': '동선 만들기 · 결과', 'route-create': '동선 만들기 · 장소 선택', 'mytrip-places': '내 여행 · 내 장소', 'mytrip-routes': '내 여행 · 내 동선', 'mypage-account': '마이페이지 계정', 'mypage-support': '마이페이지 고객센터', 'mypage-withdraw': '마이페이지 탈퇴', 'about-guest': '센트립 소개', 'terms': '이용약관', 'privacy': '개인정보처리방침'}
ORI = {('home-member', '640'), ('home-guest', '640'), ('explore-places-member', '640'), ('route-create', '640'), ('mytrip-places', '640'), ('mytrip-places', '1024'), ('route-create', '1024')}
DIFF = {('explore-routes-member', '1024'), ('news-member', '1024'), ('news-member', '640'), ('about-guest', '1024'), ('about-guest', '640'), ('mypage-account', '1024'), ('route-detail-member', '640'), ('route-result-ai', '640'), ('route-create', '1024'), ('explore-places-member', '640'), ('place-reviews-member', '640'), ('mytrip-routes', '640')}
out = ['## 페이지 × 뷰포트 매트릭스', '', '셀 = `원본 / 배포` · **정상** / **깨짐**(가로 스크롤·요소 잘림/겹침·넘침) · ⚠ = 둘 다 정상이지만 줄어드는 방식이 다름(아래 티켓)', '',
       '| 페이지 | 1440 | 1280 | 1024 | 640 | 스크린샷 |', '|---|---|---|---|---|---|']
for pid, v in m.items():
    row = [names[pid]]
    for vp in ('1440', '1280', '1024', '640'):
        if vp not in v: row.append('미캡처'); continue
        d = '깨짐' if (pid, vp) in ORI else '정상'
        dv = '깨짐' if v[vp].get('dev', {}).get('hscroll') else '정상'
        row.append(f"{d} / {dv}" + (' ⚠' if (pid, vp) in DIFF or vp == '640' else ''))
    row.append(f'`qa/screens/{pid}-{{1440|1280|1024|640}}-{{design|dev}}.png`')
    out.append('| ' + ' | '.join(row) + ' |')
out += ['', '- 640 열의 ⚠는 공통: 배포 헤더 내비가 둘째 줄로 내려감', '- 동선 만들기 · 조건 단계 캡처는 1440만 저장 (조건 첫 화면 planner-ai 는 4종: `qa/screens/planner-ai-{vp}-{side}.png`, 원본·배포 모두 가로 스크롤 없음)',
        '- 판정 데이터: `qa/raw/width-matrix.json` (scrollWidth · 뷰포트 밖 요소). 내 여행 지도 겹침은 실제 창(640×800, 1024×768)에서 elementFromPoint로 확인',
        '- full page 캡처 한계: 배포 결과·상세 화면의 sticky 헤더/하단 바가 페이지 중간에 찍힘(실제 창 정상), 원본 취향 결과는 스크롤 등장 애니메이션 때문에 히어로 아래가 비어 보임 — 깨짐으로 보지 않음',
        '- 배포 640 넘침 후보(탐색 동선 검색 폼, 내 동선 필터 옵션)는 닫힌 펼침 메뉴 내부 요소로, 스크린샷상 보이지 않아 깨짐 아님', '']
open(os.path.join(ROOT, 'raw', 'appendix-3-top.md'), 'w').write('\n'.join(out))
