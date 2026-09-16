#!/usr/bin/env python3
"""원본 · 배포본 캡처(raw json)에서 보이는 텍스트 단위를 순서대로 뽑아 diff.
사용: python3 qa/tools/textdiff.py [id정규식] [--vp 1440]
출력: qa/raw/textdiff/{id}.txt  (- 원본에만 / + 배포본에만)
"""
import json, re, sys, difflib, os, glob

ROOT = os.path.join(os.path.dirname(__file__), '..')
args = sys.argv[1:]
vp = args[args.index('--vp') + 1] if '--vp' in args else '1440'
pat = re.compile(args[0]) if args and not args[0].startswith('--') else None
out_dir = os.path.join(ROOT, 'raw', 'textdiff')
os.makedirs(out_dir, exist_ok=True)

ATTRS = ['alt', 'placeholder', 'aria-label', 'title']
SKIP_SEL = re.compile(r'leaflet|lang-menu|menu-item|__next-route-announcer|state-switch|type-switch|#typeSwitch|#stateSwitch|#qa[A-Z]', re.I)


def units(path):
    d = json.load(open(path))
    seen_attr = set()
    out = [('title', d['title'])]
    for e in d['elements']:
        if SKIP_SEL.search(e['sel']):
            continue
        t = re.sub(r'\s+', ' ', e['text']).strip()
        if t:
            out.append(('text', t))
        for a in ATTRS:
            v = e['attrs'].get(a)
            if v and (a, v) not in seen_attr:
                seen_attr.add((a, v))
                out.append((a, v.strip()))
    # 같은 텍스트가 연달아 나오면 하나로 (래퍼 중복)
    ded = []
    for u in out:
        if not ded or ded[-1] != u:
            ded.append(u)
    return d, ded


ids = sorted({re.sub(r'-\d+-(design|dev)\.json$', '', os.path.basename(p)) for p in glob.glob(os.path.join(ROOT, 'raw', f'*-{vp}-design.json'))})
summary = []
for pid in ids:
    if pat and not pat.search(pid):
        continue
    dp, vp_ = [os.path.join(ROOT, 'raw', f'{pid}-{vp}-{s}.json') for s in ('design', 'dev')]
    if not (os.path.exists(dp) and os.path.exists(vp_)):
        continue
    dd, du = units(dp)
    vd, vu = units(vp_)
    a = [f'[{k}] {v}' for k, v in du]
    b = [f'[{k}] {v}' for k, v in vu]
    diff = list(difflib.unified_diff(a, b, 'design', 'dev', n=1, lineterm=''))
    minus = sum(1 for l in diff if l.startswith('-') and not l.startswith('---'))
    plus = sum(1 for l in diff if l.startswith('+') and not l.startswith('+++'))
    with open(os.path.join(out_dir, pid + '.txt'), 'w') as f:
        f.write(f'# {pid} @ {vp}\n# design {dd["url"]}\n# dev    {vd["url"]}\n# 원본 단위 {len(a)} / 배포 단위 {len(b)} · 원본에만 {minus} / 배포에만 {plus}\n\n')
        f.write('\n'.join(diff))
    summary.append((pid, len(a), len(b), minus, plus))

for s in summary:
    print('%-24s design %4d  dev %4d  -%4d +%4d' % s)
