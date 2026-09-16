#!/usr/bin/env python3
"""페이지 × 뷰포트 판정: 가로 스크롤, 뷰포트 밖으로 나간 보이는 요소(클립 조상 없는 것)
출력: qa/raw/width-matrix.json"""
import json, os, glob, re
ROOT = os.path.join(os.path.dirname(__file__), '..')
PAGES = ['login','signup-A-01-initial','taste-intro-guest','taste-A-member-first-WHAN-q01','taste-A-member-first-WHAN-result','home-member','home-guest','news-member','news-detail-member',
 'explore-places-member','explore-places-guest','explore-routes-member','place-detail-member','place-reviews-member','route-detail-member','planner-ai','route-result-ai','route-create',
 'mytrip-places','mytrip-routes','mypage-account','mypage-support','mypage-withdraw','about-guest','terms','privacy']
SKIP = re.compile(r'leaflet|sr-only|__next|tour|skip', re.I)
res = {}
for pid in PAGES:
    res[pid] = {}
    for vp in ('1440', '1280', '1024', '640'):
        for side in ('design', 'dev'):
            p = os.path.join(ROOT, 'raw', f'{pid}-{vp}-{side}.json')
            if not os.path.exists(p): continue
            d = json.load(open(p)); vw = d['vw']
            els = [e for e in d['elements'] if not SKIP.search(e['sel'])]
            # 클립 조상 판정: 조상 중 overflow hidden/auto/clip 이고 뷰포트 안에 있는 요소가 있으면 제외
            clip = [e for e in els if e['style']['overflow'] in ('hidden', 'auto', 'scroll', 'clip') and e['box'][0] >= -1 and e['box'][0] + e['box'][2] <= vw + 1]
            def clipped(e):
                for c in clip:
                    if c is e: continue
                    if e['sel'].startswith(c['sel'] + ' > ') or (c['sel'] in e['sel'] and len(c['sel']) < len(e['sel'])):
                        return True
                return False
            over = []
            for e in els:
                x, y, w, h = e['box']
                if w < 2 or h < 2: continue
                if (x + w > vw + 1 or x < -1) and not clipped(e) and e['style']['position'] not in ('fixed',):
                    over.append({'sel': e['sel'][-100:], 'text': e['text'][:30], 'box': e['box']})
            res[pid].setdefault(vp, {})[side] = {'vw': vw, 'scrollWidth': d['scrollWidth'], 'hscroll': d['scrollWidth'] > vw, 'overflow_count': len(over), 'overflow': over[:8]}
json.dump(res, open(os.path.join(ROOT, 'raw', 'width-matrix.json'), 'w'), ensure_ascii=False, indent=1)
print('%-34s' % 'page', *[f'{vp:>11}' for vp in ('1440', '1280', '1024', '640')])
for pid, v in res.items():
    cells = []
    for vp in ('1440', '1280', '1024', '640'):
        c = v.get(vp, {})
        f = lambda s: ('-' if s not in c else ('S' if c[s]['hscroll'] else '') + (f"o{c[s]['overflow_count']}" if c[s]['overflow_count'] else '') or 'ok')
        cells.append(f"{f('design')}/{f('dev')}")
    print('%-34s' % pid, *[f'{x:>11}' for x in cells])
