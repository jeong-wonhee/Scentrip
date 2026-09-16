#!/usr/bin/env python3
"""캡처에서 텍스트/속성으로 요소 찾기: python3 qa/tools/sel.py <id> <문구> [dev|design] [--vp 1440] [--style prop,prop]"""
import json, sys, os
a = sys.argv[1:]
pid, q = a[0], a[1]
side = a[2] if len(a) > 2 and not a[2].startswith('--') else 'dev'
vp = a[a.index('--vp') + 1] if '--vp' in a else '1440'
props = a[a.index('--style') + 1].split(',') if '--style' in a else []
d = json.load(open(os.path.join(os.path.dirname(__file__), '..', 'raw', f'{pid}-{vp}-{side}.json')))
for e in d['elements']:
    hay = e['text'] + ' ' + ' '.join(str(v) for v in e['attrs'].values())
    if q in hay:
        print(e['sel'][-160:], '|', e['tag'], '|', e['text'][:60], '|', e['attrs'], '|', e['box'])
        if props: print('   ', {p: e['style'][p] for p in props})
