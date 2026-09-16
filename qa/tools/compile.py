#!/usr/bin/env python3
"""findings.jsonl → qa/0N-*.md (단계별 문서)
사용: python3 qa/tools/compile.py 1   (1=텍스트, 2=스타일, 3=창 너비, 4=플로우)
"""
import json, os, sys, re
from collections import OrderedDict, Counter

ROOT = os.path.join(os.path.dirname(__file__), '..')
rows = [json.loads(l) for l in open(os.path.join(ROOT, 'raw', 'findings.jsonl'))]
step = int(sys.argv[1])
NAMES = {1: ('01-text.md', '01. 텍스트 · 기획 대조'), 2: ('02-style.md', '02. 스타일 대조'),
         3: ('03-width.md', '03. 창 너비 축소 대조'), 4: ('04-flow.md', '04. 플로우 · 연결 대조')}
fname, title = NAMES[step]
sel = [r for r in rows if r['step'] == step]
SEV_ORDER = {'P0': 0, 'P1': 1, 'P2': 2, '확인필요': 3, '원본에없음': 4, '미구현': 5, '원본확인': 6}
PAGE_ORDER = ['공통(토큰)', '공통(헤더)', '공통(푸터)', '공통(카드)', '공통(탐색 필터 바)', '공통(로그인 모달)', '공통(튜토리얼)', '공통(리뷰 카드)', '공통(리뷰 작성·수정)',
              '공통(없는 상세)', '공통(약관)', '로그인', '회원가입', '취향 테스트', '홈', '소식 목록', '소식 상세', '탐색 · 장소', '탐색 · 동선', '장소 상세', '장소 리뷰',
              '동선 상세', '동선 만들기 · 조건', '동선 만들기 · 장소 선택', '동선 만들기 · 결과', '내 여행', '내 여행 · 내 장소', '내 여행 · 내 동선', '마이페이지',
              '센트립 소개', '센트립 소개 · 취향 테스트', '이용약관', '개인정보처리방침']
porder = lambda p: PAGE_ORDER.index(p) if p in PAGE_ORDER else 99


def cell(s):
    return str(s or '').replace('|', '\\|').replace('\n', ' ')


out = [f'# {title}', '']
out.append('- 기준: 원본 `screens/*.html` (npx serve 로컬) ↔ 배포 https://scentrip.vercel.app · 1440×900 · 확인일 2026-09-16')
out.append('- 회원 화면은 신규 Google 계정 A(qa검수A · WHAN)로, 가입 전 검사 분기는 계정 B(qa검수B · CLDR)로 확인')
out.append('- 표기: **P0/P1/P2** = 개발 티켓 후보 · **확인필요** = 확인하지 못함 · **원본에없음** = 배포본에만 있음 · **원본확인** = 원본 자체 문제')
out.append('- 원본 샘플 데이터(장소명·소식 글·리뷰 등 자리표시자)와 배포 실데이터 값 차이는 제외하고, 라벨·문구 규칙·구성·형식만 대조')
top = os.path.join(ROOT, 'raw', f'appendix-{step}-top.md')
if os.path.exists(top):
    out.append(open(top).read())
out.append('')
cnt = Counter(r['sev'] for r in sel)
out.append('## 요약')
out.append('')
out.append('| 구분 | 건수 |')
out.append('|---|---|')
for k in sorted(cnt, key=lambda x: SEV_ORDER.get(x, 9)):
    out.append(f'| {k} | {cnt[k]} |')
out.append(f'| **합계** | **{len(sel)}** |')
out.append('')
pc = Counter(r['page'] for r in sel)
out.append('| 페이지 | 건수 |')
out.append('|---|---|')
for p in sorted(pc, key=porder):
    out.append(f'| {p} | {pc[p]} |')
out.append('')

groups = OrderedDict()
for r in sorted(sel, key=lambda r: (porder(r['page']), SEV_ORDER.get(r['sev'], 9), r['n'])):
    groups.setdefault(r['page'], []).append(r)
for page, items in groups.items():
    out.append(f'## {page}')
    out.append('')
    out.append('| # | 구분 | 항목 | 위치 | 기대(원본) | 근거 | 실제(배포) | 증거 | 뷰포트 |')
    out.append('|---|---|---|---|---|---|---|---|---|')
    for r in items:
        out.append(f"| F{r['n']:03d} | {r['sev']} | {cell(r['title'])} | {cell(r['where'])} | {cell(r['expected'])} | `{cell(r['src'])}` | {cell(r['actual'])} | {cell(r['shot'])} | {r.get('vp','all')} |")
    out.append('')

appendix = os.path.join(ROOT, 'raw', f'appendix-{step}.md')
if os.path.exists(appendix):
    out.append(open(appendix).read())
open(os.path.join(ROOT, fname), 'w').write('\n'.join(out))
print(fname, len(sel))
