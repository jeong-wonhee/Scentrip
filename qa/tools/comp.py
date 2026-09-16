#!/usr/bin/env python3
"""컴포넌트 짝 비교: python3 qa/tools/comp.py <pid> "<원본 찾기>" "<배포 찾기>" [--vp 1440] [--n 0,0]
찾기: 'text:문구' | 'sel:셀렉터 조각' | 'attr:값' (여러 개면 && 로 AND)
"""
import json, os, re, sys
ROOT = os.path.join(os.path.dirname(__file__), '..')
a = sys.argv[1:]
pid, dq, vq = a[0], a[1], a[2]
vp = a[a.index('--vp') + 1] if '--vp' in a else '1440'
ni = [int(x) for x in a[a.index('--n') + 1].split(',')] if '--n' in a else [0, 0]
PROPS = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'background-color', 'background-image',
         'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-bottom', 'gap', 'border-top', 'border-bottom', 'border-radius', 'box-shadow', 'width', 'height', 'max-width', 'opacity']


def rgb(v):
    def one(m):
        r, g, b = (int(float(x)) for x in m.groups()[:3]); al = m.group(4)
        return '#%02x%02x%02x' % (r, g, b) + ('' if al in (None, '1') else f'/{float(al):.2f}')
    return re.sub(r'rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)', one, v or '')


def find(side, q, n):
    d = json.load(open(os.path.join(ROOT, 'raw', f'{pid}-{vp}-{side}.json')))
    hits = []
    for e in d['elements']:
        ok = True
        for part in q.split('&&'):
            k, _, v = part.partition(':')
            if k == 'text' and re.sub(r'\s+', ' ', e['text']).strip() != v: ok = False
            if k == 'textin' and v not in e['text']: ok = False
            if k == 'sel' and v not in e['sel']: ok = False
            if k == 'attr' and v not in json.dumps(e['attrs'], ensure_ascii=False): ok = False
            if k == 'tag' and e['tag'] != v: ok = False
        if ok: hits.append(e)
    return hits[n] if len(hits) > n else None, len(hits)


de, dn = find('design', dq, ni[0]); ve, vn = find('dev', vq, ni[1])
if not de or not ve:
    print('NOT FOUND', dn, vn); sys.exit(1)
print(f"# {pid}@{vp}  design hits={dn}  dev hits={vn}")
print(f"  D sel: …{de['sel'][-110:]}  box={de['box']}")
print(f"  V sel: …{ve['sel'][-140:]}  box={ve['box']}")
dbox, vbox = de['box'], ve['box']
res = {}
def nz(p, v, e):
    v = rgb(v)
    if p.startswith('border-') and p != 'border-radius':
        return 'none' if v.startswith('0px') or ' none ' in v else v
    if p == 'font-family': return v.split(',')[0].strip().strip('"')
    if p == 'border-radius' and re.match(r'^(9{3,}|[\d.]+e\+\d+)px$', v): return 'pill'
    if p == 'border-radius' and v.endswith('px') and float(v[:-2]) >= 999: return 'pill'
    if p == 'color' and not e['text'].strip(): return '(텍스트 없음)'
    if p in ('width', 'height'): return v
    if p == 'box-shadow' and re.fullmatch(r'(#000000/0\.00 0px 0px 0px 0px,? ?)+', v): return 'none'
    return v
for p in PROPS:
    if p in ('width', 'height'): continue
    x, y = nz(p, de['style'].get(p, ''), de), nz(p, ve['style'].get(p, ''), ve)
    if x != y:
        res[p] = [x, y]; print(f'  {p:18} {x:45} → {y}')
print(f"  {'box w×h':18} {dbox[2]}×{dbox[3]:<39} → {vbox[2]}×{vbox[3]}")
print('JSON', json.dumps({'dsel': de['sel'], 'vsel': ve['sel'], 'diff': res, 'dbox': dbox, 'vbox': vbox}, ensure_ascii=False))
