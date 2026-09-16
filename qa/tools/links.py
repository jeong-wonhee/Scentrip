#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""원본 링크(a[href]) → 기대 배포 경로로 변환해 배포본 같은 요소(텍스트/aria-label)의 href·target과 대조
출력: qa/raw/links.json + 표 출력"""
import json, os, re, urllib.parse
ROOT = os.path.join(os.path.dirname(__file__), '..')
PAGES = ['home-member', 'home-guest', 'news-member', 'news-detail-member', 'explore-places-member', 'explore-routes-member', 'place-detail-member', 'place-reviews-member',
         'route-detail-member', 'mytrip-places', 'mytrip-routes', 'mypage-account', 'mypage-support', 'about-guest', 'about-member', 'terms', 'privacy', 'login', 'signup-A-01-initial',
         'taste-intro-guest', 'taste-B-guest-CLDR-result', 'taste-A-member-first-WHAN-result', 'route-create', 'route-result-ai', 'place-detail-guest', 'mypage-withdraw', 'news-guest']

def expect(href):
    if not href or href.startswith('#') or href.startswith('javascript'): return None
    if href.startswith('mailto:') or href.startswith('http'): return href
    u = urllib.parse.urlparse(href); f = os.path.basename(u.path); q = urllib.parse.parse_qs(u.query); h = u.fragment
    M = {'home.html': '/', 'news.html': '/news', 'place-recommend.html': '/explore', 'route.html': '/explore?tab=routes', 'my-trip.html': '/dashboard',
         'my-trip-routes.html': '/dashboard?tab=routes', 'onboarding-test.html': '/taste', 'login.html': '/login', 'signup.html': '/signup', 'about.html': '/about',
         'terms.html': '/terms', 'privacy.html': '/privacy', 'route-create.html': '/planner?mode=picked', 'route-result.html': '/planner (결과)'}
    if f in M: return M[f]
    if f == 'news-detail.html': return '/news/[slug]'
    if f == 'place-detail.html': return '/explore/[id]'
    if f == 'place-reviews.html': return '/explore/[id]/reviews'
    if f == 'route-detail.html': return '/planner/[id]'
    if f == 'route-conditions.html': return '/planner?mode=' + (q.get('mode', ['ai'])[0])
    if f == 'mypage.html': return '/mypage' + ('#' + h if h else '')
    return href

def norm_dev(href):
    if not href: return None
    href = re.sub(r'^https://scentrip\.vercel\.app', '', href)
    href = re.sub(r'^/news/[^/?#]+$', '/news/[slug]', href)
    href = re.sub(r'^/explore/[^/?#]+/reviews$', '/explore/[id]/reviews', href)
    href = re.sub(r'^/explore/tour_[^/?#]+$', '/explore/[id]', href)
    href = re.sub(r'^/planner/[^/?#]+$', '/planner/[id]', href)
    return href

def label(e):
    t = re.sub(r'\s+', ' ', e['text']).strip()
    return t or e['attrs'].get('aria-label') or ''

rows = []
for pid in PAGES:
    try:
        D = json.load(open(os.path.join(ROOT, 'raw', f'{pid}-1440-design.json')))['elements']
        V = json.load(open(os.path.join(ROOT, 'raw', f'{pid}-1440-dev.json')))['elements']
    except FileNotFoundError:
        continue
    Dl = [e for e in D if e['tag'] == 'a' and e['attrs'].get('href')]
    Vl = [e for e in V if e['tag'] in ('a',) and e['attrs'].get('href')]
    seen = set()
    for e in Dl:
        lab = label(e); exp = expect(e['attrs']['href'])
        if exp is None: continue
        key = (lab, exp)
        if key in seen: continue
        seen.add(key)
        # 짝: 같은 라벨 우선, 없으면 같은 목적지 + 비슷한 영역
        cand = [v for v in Vl if label(v) == lab] or [v for v in Vl if norm_dev(v['attrs']['href']) == exp and abs(v['box'][1] - e['box'][1]) < 200]
        v = cand[0] if cand else None
        rows.append({'pid': pid, 'label': lab[:40], 'design_href': e['attrs']['href'][:80], 'design_target': e['attrs'].get('target'), 'expected': exp,
                     'dev_href': v and norm_dev(v['attrs']['href']), 'dev_target': v and v['attrs'].get('target'), 'dev_label': v and label(v)[:40],
                     'dsel': e['sel'][-80:], 'vsel': v and v['sel'][-100:],
                     'status': 'no-element' if not v else ('ok' if norm_dev(v['attrs']['href']) == exp and (v['attrs'].get('target') == e['attrs'].get('target')) else 'diff')})
json.dump(rows, open(os.path.join(ROOT, 'raw', 'links.json'), 'w'), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(r['status'] for r in rows))
for r in rows:
    if r['status'] != 'ok':
        print(f"{r['status']:10} {r['pid']:26} {r['label']!r:32} exp={r['expected']} {r['design_target'] or ''} | dev={r['dev_href']} {r['dev_target'] or ''} ({r['dev_label']!r})")
