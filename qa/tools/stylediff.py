#!/usr/bin/env python3
"""같은 텍스트를 가진 요소끼리 computed style 비교 (1440)
사용: python3 qa/tools/stylediff.py [id정규식] → qa/raw/stylediff/{id}.json + 요약 출력
"""
import json, os, re, sys, glob
from collections import Counter, defaultdict

ROOT = os.path.join(os.path.dirname(__file__), '..')
pat = re.compile(sys.argv[1]) if len(sys.argv) > 1 else None
os.makedirs(os.path.join(ROOT, 'raw', 'stylediff'), exist_ok=True)
PROPS = ['color', 'background-color', 'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
         'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-radius', 'box-shadow', 'border-top', 'border-bottom', 'text-align', 'white-space']
BOXY = {'button', 'a', 'input', 'select', 'textarea', 'label', 'summary'}
SKIP = re.compile(r'leaflet|lang|Language|state-switch|type-switch|tutorial-tour|__next', re.I)


def rgb(v):
    m = re.match(r'rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)', v or '')
    if not m: return v
    r, g, b = (int(float(x)) for x in m.groups()[:3]); a = m.group(4)
    hx = '#%02x%02x%02x' % (r, g, b)
    return hx if a in (None, '1') else f'{hx}/{float(a):.2f}'


def norm(prop, v):
    if prop in ('color', 'background-color'): return rgb(v)
    if prop == 'font-family': return (v or '').split(',')[0].strip().strip('"\'')
    if prop in ('border-top', 'border-bottom'):
        m = re.match(r'([\d.]+px) (\w+) (rgba?\([^)]*\))', v or '')
        if not m or m.group(1) == '0px' or m.group(2) == 'none': return 'none'
        return f'{m.group(1)} {m.group(2)} {rgb(m.group(3))}'
    if prop == 'box-shadow': return 'none' if v in ('none', '') else re.sub(r'rgba?\([^)]*\)', lambda m: rgb(m.group(0)), v)
    if prop == 'letter-spacing' or prop == 'line-height':
        return v
    return v


def text_elems(path):
    d = json.load(open(path))
    res = defaultdict(list)
    for e in d['elements']:
        t = re.sub(r'\s+', ' ', e['text']).strip()
        if not t or len(t) > 80 or SKIP.search(e['sel']) or SKIP.search(json.dumps(e['attrs'], ensure_ascii=False)): continue
        res[t].append(e)
    return d, res


def eff_bg(e, all_elems):
    return rgb(e['style']['background-color'])


summary = []
for dpath in sorted(glob.glob(os.path.join(ROOT, 'raw', '*-1440-design.json'))):
    pid = os.path.basename(dpath).replace('-1440-design.json', '')
    vpath = dpath.replace('-design.json', '-dev.json')
    if not os.path.exists(vpath) or (pat and not pat.search(pid)): continue
    _, D = text_elems(dpath); _, V = text_elems(vpath)
    diffs = []
    for t in D:
        if t not in V: continue
        for de, ve in zip(D[t], V[t]):
            row = {}
            for p in PROPS:
                if p.startswith('padding') and de['tag'] not in BOXY and ve['tag'] not in BOXY: continue
                if p in ('border-top', 'border-bottom', 'box-shadow', 'border-radius', 'background-color') and de['tag'] not in BOXY and ve['tag'] not in BOXY: continue
                a, b = norm(p, de['style'].get(p)), norm(p, ve['style'].get(p))
                if a != b: row[p] = [a, b]
            if de['tag'] in BOXY or ve['tag'] in BOXY:
                if abs(de['box'][3] - ve['box'][3]) >= 2: row['height'] = [f"{de['box'][3]}px", f"{ve['box'][3]}px"]
            if row:
                diffs.append({'text': t, 'dtag': de['tag'], 'vtag': ve['tag'], 'dsel': de['sel'][-90:], 'vsel': ve['sel'][-120:], 'diff': row})
    json.dump(diffs, open(os.path.join(ROOT, 'raw', 'stylediff', pid + '.json'), 'w'), ensure_ascii=False, indent=1)
    summary.append((pid, len([t for t in D if t in V]), len(diffs)))
for s in summary: print('%-36s matched %4d  differing %4d' % s)
