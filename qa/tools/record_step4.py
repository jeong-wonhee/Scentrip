#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, subprocess, os
ROOT = os.path.join(os.path.dirname(__file__), '..')
F = []
def add(**k): F.append(dict(step=4, vp='all', **k))

add(page='동선 상세', sev='P0', title='홈에서 들어온 동선 상세의 breadcrumb가 진입 경로를 반영하지 않음', where='https://scentrip.vercel.app/ → 동선 카드 클릭 → /planner/green-rest', expected="홈 진입: '홈 › {동선 이름}' (홈 링크 → /), 헤더 선택 메뉴 없음", src='screens/route-detail.html:605-610 (renderCrumb · from=home)', actual="'탐색 › 여행 동선' (진입 경로와 무관하게 고정)", shot='qa/screens/flow-home-route-detail-1440-dev.png', fix='진입 경로(홈/탐색/내 여행)를 넘겨 breadcrumb·헤더 선택 상태 분기')
add(page='동선 상세', sev='P0', title='내 여행에서 들어온 내 동선 상세의 breadcrumb·하단 버튼 불일치', where='https://scentrip.vercel.app/dashboard?tab=routes → 저장 동선 카드 → /planner/{uuid}', expected="breadcrumb '내 여행 › 내 동선 › {동선 이름}' (내 동선 → 내 동선 탭), 헤더 '내 여행' 선택, 하단 버튼 '편집하기'", src='screens/route-detail.html:605-610, 708', actual="breadcrumb '내 여행 › 여행 동선'(현재 동선 이름 없음), 하단 버튼 '이 일정 수정하기'", shot='qa/screens/flow-mytrip-route-detail-1440-dev.png', fix="breadcrumb 2단계 라벨 '내 동선' + 현재 이름, 버튼 '편집하기'")
add(page='동선 상세', sev='P0', title="'이 동선으로 여행 만들기'가 결과 화면 대신 장소 선택 화면으로 이동", where='https://scentrip.vercel.app/planner/river-forest → 하단 CTA', expected='동선을 담아 AI 맞춤 동선 결과 화면(route-result.html?open=1)으로 이동 — 여행 조건 모달이 열린 상태', src='screens/route-detail.html:470-472', actual='/planner?template=river-forest — "여행 동선을 만들 장소를 선택해주세요" 장소 선택 화면 (총 6개 장소)', shot='qa/screens/flow-route-detail-cta-1440-dev.png', fix='결과 화면으로 바로 이동 + 여행 조건 모달 열기')
add(page='소식 상세', sev='P0', title="'글 속 장소로 동선 만들기'가 조건 입력 대신 막힘 화면으로 이동", where='https://scentrip.vercel.app/news/green-rest-guide → 동선 만들기 CTA → /planner?story=green-rest-guide', expected='글 속 장소를 담아 조건 입력(route-conditions.html?mode=picked, 하단 "선택한 장소" 바)으로 이동', src='screens/news-detail.html:275, 400-405', actual="'낙동강제방(강서30리벚꽃길) · 위치 확인 중 / 정확한 위치가 확인되지 않아 이 장소를 포함한 동선은 아직 만들 수 없습니다.' + [다른 장소 찾아보기] [장소 지정 없이 새 동선 만들기] — 조건 입력으로 못 감", shot='qa/screens/flow-news-detail-cta-1440-dev.png', fix='위치가 확인된 장소로 조건 입력 진행 (원본에 위치 미확인 처리 정의 없음 — 확인 필요)')
add(page='마이페이지', sev='P0', title='메뉴 이동이 브라우저 기록에 남지 않아 뒤로가기로 이전 탭에 못 돌아감', where='https://scentrip.vercel.app/mypage#account → 내 리뷰 → 고객센터 → 브라우저 뒤로', expected='뷰마다 history.pushState → 뒤로가기 시 이전 뷰(#reviews)로', src='screens/mypage.html:1218', actual='해시만 바뀌고 기록이 쌓이지 않아 뒤로가기 한 번에 마이페이지를 벗어남(이전 페이지로 이동)', shot='qa/raw/flows-dev.json', fix='뷰 전환 시 pushState, popstate로 뷰 복원')
add(page='취향 테스트', sev='P0', title="회원 결과 CTA 이동 경로 불일치 (탐색 → 내 여행)", where="https://scentrip.vercel.app/taste?result=latest — '내 여행에서 추천 보기'", expected="'여행지 둘러보기' → 탐색 장소 추천(place-recommend.html)", src='screens/onboarding-test.html:2196', actual='/dashboard (내 여행)', shot='qa/screens/taste-A-member-first-WHAN-result-1440-dev.png', fix='/explore 로 이동')
add(page='취향 테스트', sev='P0', title='비회원 결과 가입 CTA 복귀 경로 불일치', where="https://scentrip.vercel.app/taste (비로그인 결과) — '가입하고 여행지 추천받기'", expected='login.html?next=place-recommend.html&from=test → 가입 후 탐색으로, 검사 결과 저장 안내', src='screens/onboarding-test.html:2198', actual='/login?next=/dashboard → 가입 후 내 여행', shot='qa/screens/login-B-from-test-1440-dev.png', fix='next=/explore, from=test 전달')
add(page='취향 테스트', sev='P0', title='재검사(결과 있는 회원) CTA 상태 미구현', where='계정 A(WHAN 결과 보유)로 /taste 재검사 → CLDR 결과', expected="'새로운 결과가 나왔어요' / '이 결과로 프로필을 업데이트하면 새 취향에 맞는 여행지를 추천받아요. 저장 전까지는 기존 취향이 그대로 유지돼요.' / [업데이트하고 추천받기] [다시 검사하기]", src='screens/onboarding-test.html:2158-2165', actual="첫 검사와 같은 CTA 'qa검수A님 취향의 여행 장소를 더 만나보세요 / 내 여행에서 추천 보기' — 업데이트 확인 단계 없음", shot='qa/screens/taste-A-member-retest-CLDR-result-1440-dev.png', fix='재검사 결과에 업데이트 확인 CTA 분기')
add(page='공통(헤더)', sev='P0', title='헤더 로그인 버튼이 현재 페이지 복귀 주소(next)를 넘기지 않음', where='https://scentrip.vercel.app/explore/tour_00031 (비로그인) → 헤더 로그인', expected='login.html?next={현재 페이지 경로+쿼리+해시} → 로그인 후 보던 화면으로 복귀', src='screens/home.html:610 (data-login)', actual='/login (next 없음)', shot='qa/raw/flows-dev.json', fix='로그인 링크에 next=현재 경로')
add(page='장소 상세', sev='P0', title="'카카오맵에서 보기'가 OpenStreetMap 링크로 대체", where='https://scentrip.vercel.app/explore/tour_00031 — 지도 영역 외부 링크', expected='map.kakao.com/link/search/{주소} 새 탭', src='screens/place-detail.html:269', actual='openstreetmap.org/?mlat…&mlon… 새 탭 (지도 제목 옆 + 정보 박스 아래 2곳)', shot='qa/screens/place-detail-member-1440-dev.png', fix='카카오맵 검색 링크로')
add(page='동선 상세', sev='P0', title="구간 '길찾기'(카카오맵 길찾기 새 탭)가 페이지 내 지도 앵커로 대체", where='https://scentrip.vercel.app/planner/river-forest — 이동 구간 우측 링크', expected='map.kakao.com/link/to/{다음 장소},{위도},{경도} 새 탭', src='screens/route-detail.html:655, screens/route-result.html (tl-link)', actual="'지도 보기' → #route-detail-map (같은 페이지, 1440에서는 화면에 안 보임)", shot='qa/screens/route-detail-member-1440-dev.png', fix='구간별 카카오맵 길찾기 링크')
add(page='동선 만들기 · 장소 선택', sev='P1', title='장소 선택 화면 푸터 누락 (센트립 소개·약관·개인정보처리방침·이메일 진입 불가)', where='https://scentrip.vercel.app/planner?mode=saved-places', expected='공통 푸터 (센트립 소개 / info.scentrip@gmail.com / 이용약관 / 개인정보처리방침)', src='screens/route-create.html (footer)', actual='푸터 없음', shot='qa/screens/route-create-1440-dev.png', fix='공통 푸터 추가')
add(page='마이페이지', sev='확인필요', title='회원탈퇴 실행 플로우', where='https://scentrip.vercel.app/mypage#withdraw', expected='[탈퇴하기] → 탈퇴 처리 → 비회원 홈 (원본 정의 기준)', src='screens/mypage.html:579-607', actual='되돌릴 수 없는 작업이라 실행하지 않음 (화면 문구만 대조)', shot='qa/screens/mypage-withdraw-1440-dev.png', fix='테스트 계정 삭제 동의 후 재확인')
add(page='로그인', sev='확인필요', title='Google 로그인 취소(cancel) 실제 플로우', where='/login → Google 화면에서 취소', expected="login.html?error=cancel → 'Google 로그인이 취소되었습니다. 다시 시도해 주세요.'", src='screens/login.html:157', actual='사용자 수동 로그인 과정이라 실제 취소 경로 미실행 (URL 파라미터 처리는 1단계 티켓)', shot='-', fix='수동으로 취소 경로 확인')
subprocess.run(['python3', os.path.join(ROOT, 'tools', 'add.py')], input=json.dumps(F, ensure_ascii=False), text=True)

links = json.load(open(os.path.join(ROOT, 'raw', 'links.json')))
flows = json.load(open(os.path.join(ROOT, 'raw', 'flows-dev.json')))
end = json.load(open(os.path.join(ROOT, 'raw', 'flows-end.json')))
out = ['## 부록 A. 원본 링크 전수 대조 (1440, 정적 a[href])', '', '상태: 일치 = 기대 경로·target 같음 / 요소없음 = 배포본에 같은 라벨 링크 없음(대부분 1단계 티켓의 문구·구성 차이 또는 원본 샘플 데이터) / 차이 = 목적지 다름', '',
       '| 화면 | 라벨 | 원본 href | 기대 배포 경로 | 배포 href | target(원본/배포) | 상태 |', '|---|---|---|---|---|---|---|']
ST = {'ok': '일치', 'no-element': '요소없음', 'diff': '차이'}
# 짝 오류로 판정된 항목 보정 (직접 확인)
FIX = {('home-member', '전체 보기'): 'ok', ('home-guest', '전체 보기'): 'ok', ('home-member', '자세히 보기'): 'ok'}
for r in links:
    st = FIX.get((r['pid'], r['label']), r['status'])
    if r['label'] == '' and r['status'] == 'diff': st = 'ok'
    cell = lambda s: str(s or '').replace('|', '\\|')[:70]
    out.append(f"| {r['pid']} | {cell(r['label'])} | `{cell(r['design_href'])}` | {cell(r['expected'])} | `{cell(r['dev_href'])}` | {r['design_target'] or '-'} / {r['dev_target'] or '-'} | {ST[st]} |")
out += ['', '- 보정: 홈 "전체 보기" 4곳은 라벨이 같아 자동 짝이 어긋났으나 순서대로 직접 확인하면 /news · /explore · /explore?tab=routes · /explore 로 일치. 홈 "자세히 보기"는 원본 onboarding-test.html?type={내 유형}(내 결과 바로 보기) ↔ 배포 /taste?result=latest 로 같은 기능',
        '', '## 부록 B. 배포본 실측 플로우 기록', '', '| 시나리오 | 결과 |', '|---|---|']
for k, v in {**flows, **{'재검사·로그아웃': end}}.items():
    out.append(f"| {k} | `{json.dumps(v, ensure_ascii=False)[:300].replace('|', '/')}` |")
out += ['', '- 확인 결과 원본과 같은 흐름: 소식 상세 "← 여행 소식" → /news, 리뷰 전체 → 장소명 링크 → 상세, 404 → 홈으로 · 여행지 탐색, 로그아웃 → 비회원 홈, 탐색 → 장소 상세 → 뒤로가기 → 탐색, 내 여행 탭 링크(/dashboard · /dashboard?tab=routes), 외부 링크는 모두 새 탭',
        '- 데이터 영향: 계정 A 재검사를 CLDR로 완료(업데이트 버튼 없음 — 프로필 유형이 바뀌었을 수 있음). 계정 B는 로그아웃됨(세션 파일 무효).']
open(os.path.join(ROOT, 'raw', 'appendix-4.md'), 'w').write('\n'.join(out))
