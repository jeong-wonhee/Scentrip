#!/usr/bin/env python3
"""위치 기반 요소 짝짓기 + computed style 차이 (1440)
원본 요소마다 배포본에서 같은 종류(텍스트/박스)이고 박스가 가장 많이 겹치는(IoU≥0.55) 요소를 짝으로 본다.
텍스트가 같으면 우선. 결과는 원본 클래스(컴포넌트)별로 묶어 qa/raw/posdiff/{pid}.json
사용: python3 qa/tools/posdiff.py [id정규식]
"""
import json, os, re, sys, glob
from collections import defaultdict

ROOT = os.path.join(os.path.dirname(__file__), '..')
pat = re.compile(sys.argv[1]) if len(sys.argv) > 1 else None
OUT = os.path.join(ROOT, 'raw', 'posdiff'); os.makedirs(OUT, exist_ok=True)
TEXT_PROPS = ['font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'font-family']
BOX_PROPS = ['background-color', 'background-image', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'gap',
             'border-top', 'border-bottom', 'border-radius', 'box-shadow']
SKIP = re.compile(r'leaflet|lang|state-switch|type-switch|tutorial-tour|__next|sr-only', re.I)


def rgb(v):
    def one(m):
        r, g, b = (int(float(x)) for x in m.groups()[:3]); al = m.group(4)
        return '#%02x%02x%02x' % (r, g, b) + ('' if al in (None, '1') else f'/{float(al):.2f}')
    v = re.sub(r'rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)', one, v or '')
    v = re.sub(r'oklab\(0\.99999\d* [-\d.e]+ [-\d.e]+ / ([\d.]+)\)', lambda m: f'#ffffff/{float(m.group(1)):.2f}', v)
    return v


def nz(p, v):
    v = rgb(v)
    if p.startswith('border-') and p != 'border-radius':
        return 'none' if v.startswith('0px') or ' none ' in v else v
    if p == 'font-family': return v.split(',')[0].strip().strip('"')
    if p == 'border-radius':
        m = re.match(r'^([\d.]+(?:e\+\d+)?)px$', v)
        if m and float(m.group(1)) >= 999: return 'pill'
    if p == 'box-shadow' and re.fullmatch(r'(#000000/0\.00 0px 0px 0px 0px,? ?)+', v): return 'none'
    if p == 'background-color' and v in ('#000000/0.00',): return 'transparent'
    if p == 'line-height' and v == 'normal': return 'normal'
    return v


def comp_name(e):
    last = e['sel'].split(' > ')[-1]
    cls = re.findall(r'\.([\w-]+)', last)
    idm = re.search(r'#([\w-]+)', last)
    return e['tag'] + ('#' + idm.group(1) if idm else '') + ('.' + '.'.join(cls[:2]) if cls else '')


def iou(a, b):
    ax, ay, aw, ah = a; bx, by, bw, bh = b
    ix = max(0, min(ax + aw, bx + bw) - max(ax, bx)); iy = max(0, min(ay + ah, by + bh) - max(ay, by))
    inter = ix * iy; u = aw * ah + bw * bh - inter
    return inter / u if u else 0


def load(path):
    d = json.load(open(path))
    return [e for e in d['elements'] if not SKIP.search(e['sel']) and e['box'][2] >= 4 and e['box'][3] >= 4]


for dpath in sorted(glob.glob(os.path.join(ROOT, 'raw', '*-1440-design.json'))):
    pid = os.path.basename(dpath)[:-len('-1440-design.json')]
    vpath = dpath.replace('-design.json', '-dev.json')
    if not os.path.exists(vpath) or (pat and not pat.search(pid)): continue
    D, V = load(dpath), load(vpath)
    used = set(); pairs = []
    for de in D:
        dt = re.sub(r'\s+', ' ', de['text']).strip()
        cands = []
        for i, ve in enumerate(V):
            if i in used: continue
            vt = re.sub(r'\s+', ' ', ve['text']).strip()
            if bool(dt) != bool(vt): continue
            s = iou(de['box'], ve['box'])
            if dt and dt == vt: s += 0.5
            if s >= 0.55: cands.append((s, i))
        if not cands: continue
        s, i = max(cands); used.add(i); pairs.append((de, V[i], round(s, 2)))
    groups = defaultdict(list)
    for de, ve, s in pairs:
        diff = {}
        props = (TEXT_PROPS if de['text'].strip() else []) + (BOX_PROPS if de['tag'] in ('button', 'a', 'input', 'select', 'textarea', 'section', 'article', 'div', 'span', 'nav', 'header', 'footer', 'aside', 'label', 'summary', 'li', 'ul', 'form', 'dialog') else [])
        for p in props:
            a, b = nz(p, de['style'].get(p, '')), nz(p, ve['style'].get(p, ''))
            if a != b: diff[p] = [a, b]
        for k, idx in (('width', 2), ('height', 3)):
            if abs(de['box'][idx] - ve['box'][idx]) >= 2: diff[k] = [f"{de['box'][idx]}px", f"{ve['box'][idx]}px"]
        if diff:
            groups[comp_name(de)].append({'text': de['text'][:40], 'dsel': de['sel'][-120:], 'vsel': ve['sel'][-160:], 'score': s, 'dbox': de['box'], 'vbox': ve['box'], 'diff': diff})
    json.dump(groups, open(os.path.join(OUT, pid + '.json'), 'w'), ensure_ascii=False, indent=1)
    print('%-36s pairs %4d  differing comps %3d' % (pid, len(pairs), len(groups)))
