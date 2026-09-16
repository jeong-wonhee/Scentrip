#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""findings.jsonl → qa/QA-REPORT.md (Notion 붙여넣기용)"""
import json, os, re
from collections import Counter, OrderedDict
ROOT = os.path.join(os.path.dirname(__file__), '..')
rows = [json.loads(l) for l in open(os.path.join(ROOT, 'raw', 'findings.jsonl'))]

# 심각도 규칙 정렬: 속성 문구(aria-label·title 속성) 불일치도 텍스트 오류 → P0
for r in rows:
    if r['sev'] in ('P1', 'P2') and r['step'] == 1 and re.search(r'aria-label|title 누락|title 불일치|로고 링크', r['title']):
        r['sev'] = 'P0'

import importlib.util
spec = importlib.util.spec_from_file_location('c', os.path.join(ROOT, 'tools', 'compile.py'))
PAGE_ORDER = ['공통(토큰)', '공통(헤더)', '공통(푸터)', '공통(카드)', '공통(탐색 필터 바)', '공통(로그인 모달)', '공통(튜토리얼)', '공통(리뷰 카드)', '공통(리뷰 작성·수정)',
              '공통(없는 상세)', '공통(약관)', '로그인', '회원가입', '취향 테스트', '홈', '소식 목록', '소식 상세', '탐색 · 장소', '탐색 · 동선', '장소 상세', '장소 리뷰',
              '동선 상세', '동선 만들기 · 조건', '동선 만들기 · 장소 선택', '동선 만들기 · 결과', '내 여행', '내 여행 · 내 장소', '내 여행 · 내 동선', '마이페이지',
              '센트립 소개', '센트립 소개 · 취향 테스트', '이용약관', '개인정보처리방침']
porder = lambda p: PAGE_ORDER.index(p) if p in PAGE_ORDER else 99
STEP = {1: '01-text', 2: '02-style', 3: '03-width', 4: '04-flow'}
tickets = [r for r in rows if r['sev'] in ('P0', 'P1', 'P2')]
tickets.sort(key=lambda r: ({'P0': 0, 'P1': 1, 'P2': 2}[r['sev']], porder(r['page']), r['step'], r['n']))
for i, r in enumerate(tickets, 1): r['sct'] = f'SCT-{i:03d}'
sct_of = {r['n']: r['sct'] for r in tickets}

def src_fmt(s):
    s = s or ''
    return f'`{s}`' if re.search(r'\.(html|js|css|md)', s) else s

out = ['# Scentrip 디자인 QA 리포트 — 원본 프로토타입 ↔ 배포본', '',
       '- 원본(기준): 이 레포 `screens/*.html` (npx serve 로컬 렌더) · 배포(검수 대상): https://scentrip.vercel.app',
       '- 검수일: 2026-09-16 · 브라우저: Playwright Chromium · 뷰포트 1440×900 / 1280×800 / 1024×768 / 640×800',
       '- 회원 화면: 신규 Google 계정 A(qa검수A, 검사 없이 가입) · B(qa검수B, 비회원 검사 후 가입)로 확인',
       '- 단계별 상세: `qa/00-page-map.md` · `qa/01-text.md` · `qa/02-style.md` · `qa/03-width.md` · `qa/04-flow.md` / 스크린샷 `qa/screens/` / 원시 데이터 `qa/raw/`',
       '- 원본 샘플 데이터(장소명·소식 글·리뷰 내용 등 자리표시자)와 배포 실데이터의 값 차이는 제외 — 라벨·문구 규칙·구성·형식·스타일·동작만 대조', '']
out.append('## 요약'); out.append('')
sc = Counter(r['sev'] for r in tickets)
out += ['### 심각도별', '', '| 심각도 | 기준 | 건수 |', '|---|---|---|',
        f"| P0 | 페이지 미구현 · 기획/플로우 미반영 · 텍스트 오류 · 1280 이상 레이아웃 깨짐 | {sc['P0']} |",
        f"| P1 | 컬러·크기·아이콘·폰트 등 눈에 띄는 디자인 차이 · 1024 깨짐/접힘 차이 | {sc['P1']} |",
        f"| P2 | 미세 간격·여백·라운드 차이 · 640에서만 차이 | {sc['P2']} |",
        f"| **티켓 합계** | | **{len(tickets)}** |", '']
others = Counter(r['sev'] for r in rows if r['sev'] not in ('P0', 'P1', 'P2'))
out += ['| 티켓 외 기록 | 건수 |', '|---|---|', f"| 원본에 없는데 배포본에 있음 | {others.get('원본에없음', 0)} |", f"| 원본 확인 필요 | {others.get('원본확인', 0)} |", f"| 확인필요(검수 미완) | {others.get('확인필요', 0)} |", '']
out += ['### 페이지별', '', '| 페이지 | P0 | P1 | P2 | 합계 |', '|---|---|---|---|---|']
pages = sorted({r['page'] for r in tickets}, key=porder)
for p in pages:
    c = Counter(r['sev'] for r in tickets if r['page'] == p)
    out.append(f"| {p} | {c['P0']} | {c['P1']} | {c['P2']} | {sum(c.values())} |")
out.append('')
out += ['### 핵심 요약', '',
        '1. **텍스트 전반 불일치** — 전 화면 document title이 "Scentrip"으로 고정, 로그인·테스트 표지·소개·약관·마이페이지 문구가 원본과 다른 카피로 구현됨. 취향 테스트 12문항 중 9문항 선택지 순서가 뒤바뀌고 16유형 결과 요약·프로필·행동 패턴·향 피라미드가 모두 다름',
        '2. **기획/플로우 미반영** — 가입 완료 화면 없음, 동선 만들기 모달 대신 위저드 내 모드 선택 + `?mode=` 무시, 동선 상세 진입 경로별 breadcrumb 미분기, 결과 화면 삭제 확인·출발 설정 모달 없음, 비회원 게이트 대신 로그인 리다이렉트, **회원탈퇴 직후 사이트 전체 무한 리다이렉트**, 소식 목록 정렬·지역 필터·개수 없음',
        '3. **AI 매칭 배지 라벨** — 서비스 핵심 개념인 "AI 매칭 %"가 "취향 유사도 %"/"유사도 %"로 바뀌었고 일부 카드(로컬 장소·소식)에는 배지 자체가 없음',
        '4. **토큰 미준수** — 전역 자간 -3% 미적용, Phosphor → Lucide 아이콘, 토큰 밖 색·검정 그림자·라운드 사용',
        '5. **창 축소 동작** — 1024에서 동선 그리드·소식·소개 카드 열 수, 마이페이지 메뉴 방향, 장소 선택 분할이 원본과 다르게 접힘. 640에서 헤더 내비가 둘째 줄로 내려감', '']

cur = None
for r in tickets:
    if r['sev'] != cur:
        cur = r['sev']; out.append(f'## 티켓 — {cur}'); out.append('')
    tag = ' [확인필요]' if '확인필요' in r['title'] else ''
    out.append(f"### [{r['sct']}] {r['sev']} | {r['page']} | {r['title']}{tag}")
    out.append(f"- 위치: {r['where']}")
    out.append(f"- 기대(디자인): {r['expected']} — 근거 {src_fmt(r['src'])}")
    out.append(f"- 실제(배포): {r['actual']} — 증거 `{r['shot']}`")
    out.append(f"- 뷰포트: {r.get('vp', 'all')}")
    out.append(f"- 수정 가이드: {r['fix']}")
    out.append(f"- 상세: `qa/{STEP[r['step']]}.md` F{r['n']:03d}")
    out.append('')

out.append('## 미구현 / 기획 미반영 항목'); out.append('')
out.append('| 티켓 | 페이지 | 항목 |'); out.append('|---|---|---|')
KW = re.compile(r'미구현|누락|없이|대신|무시|반영하지|반영되지|이동|모달|리다이렉트|기록에 남지|막힘')
for r in tickets:
    if r['sev'] == 'P0' and (r['step'] == 4 or KW.search(r['title'])) and not re.search(r'문구|라벨|aria|띄어쓰기|title', r['title']):
        out.append(f"| {r['sct']} | {r['page']} | {r['title']} |")
out.append('')

out.append('## 원본에 없는데 배포본에 있는 항목'); out.append('')
out.append('> 개발 티켓이 아니라, 원본에 반영할지 배포본에서 뺄지 결정이 필요한 목록'); out.append('')
out.append('| # | 페이지 | 항목 | 위치 | 배포본 내용 | 증거 |'); out.append('|---|---|---|---|---|---|')
for r in sorted([r for r in rows if r['sev'] == '원본에없음'], key=lambda r: (porder(r['page']), r['n'])):
    out.append(f"| F{r['n']:03d} | {r['page']} | {r['title']} | {r['where']} | {r['actual']} | `{r['shot']}` |")
out.append('')

out.append('## 원본 확인 필요'); out.append('')
out.append('> 원본 자체에 문제가 있어 보이는 부분 — 개발 티켓으로 만들지 않음'); out.append('')
out.append('| # | 페이지 | 뷰포트 | 현상 | 근거 | 스크린샷 |'); out.append('|---|---|---|---|---|---|')
for r in sorted([r for r in rows if r['sev'] == '원본확인'], key=lambda r: (porder(r['page']), r['n'])):
    out.append(f"| F{r['n']:03d} | {r['page']} | {r.get('vp', 'all')} | {r['title']} — {r['actual']} | {src_fmt(r['src'])} | `{r['shot']}` |")
extra = ["| — | 동선 만들기 · 조건 | all | 기간 질문 '며칠동안'이 띄어쓰기 규범('며칠 동안')과 다름 — 배포본은 규범대로 씀. 원본 기준으로 티켓 SCT에 포함했으나 원본 수정 여부 결정 필요 | `screens/route-conditions.html:229` | `qa/screens/planner-ai-s02-1440-design.png` |",
         "| — | 내 여행 · 내 장소 | all | 원본에 '찜 0개' 빈 상태 정의 없음(필터 결과 0건 빈 상태만) — 배포본은 자체 문구 사용 | `screens/my-trip.html:374-377` | `qa/screens/mytrip-A-02-empty-after-tour-1440-dev.png` |",
         "| — | 장소 상세 | all | 운영시간·입장료 값이 없을 때 대체 문구 원본 미정의 | `screens/place-detail.html:246-247` | `qa/screens/place-detail-member-1440-dev.png` |"]
out += extra; out.append('')

out.append('## 확인필요 (검수 미완)'); out.append('')
out.append('| # | 페이지 | 항목 | 사유 |'); out.append('|---|---|---|---|')
for r in sorted([r for r in rows if r['sev'] == '확인필요'], key=lambda r: (porder(r['page']), r['n'])):
    out.append(f"| F{r['n']:03d} | {r['page']} | {r['title']} | {r['actual']} |")
out += ['', '## 검수 중 배포 데이터 변경 기록', '',
        '- 계정 A(qa검수A): 장소 찜 4곳(tour_00031~34), 탐색 동선 찜 1건, AI 동선 저장 1건, 리뷰 1건(tour_00031), 재검사 1회(CLDR 응답 — 업데이트 확인 단계가 없어 프로필 유형이 바뀌었을 수 있음). 스크립트 오류로 언어 설정이 잠시 English로 저장됐다가 한국어로 복구',
        '- 계정 B(qa검수B · design.sadie@gmail.com): 리뷰 1건 작성 → 사용자 동의로 실제 회원탈퇴(리뷰 삭제 확인). 탈퇴 후 재로그인해 가입 화면 진입까지만 확인하고 재가입은 하지 않음',
        '- 계정 A는 탈퇴하지 않음']
open(os.path.join(ROOT, 'QA-REPORT.md'), 'w').write('\n'.join(out))
print('tickets', len(tickets), dict(sc), 'others', dict(others))
