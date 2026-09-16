#!/usr/bin/env python3
"""원본|배포 나란히 이미지: python3 qa/tools/sbs.py <id> [vp] [--crop y0,y1] [--scale 0.5] → scratch/sbs-<id>-<vp>.png 경로 출력"""
import sys, os
from PIL import Image, ImageDraw
a = sys.argv[1:]
pid = a[0]; vp = a[1] if len(a) > 1 and not a[1].startswith('--') else '1440'
crop = [int(x) for x in a[a.index('--crop') + 1].split(',')] if '--crop' in a else None
scale = float(a[a.index('--scale') + 1]) if '--scale' in a else 0.5
root = os.path.join(os.path.dirname(__file__), '..', 'screens')
ims = []
for s in ('design', 'dev'):
    im = Image.open(os.path.join(root, f'{pid}-{vp}-{s}.png')).convert('RGB')
    if crop: im = im.crop((0, crop[0], im.width, min(crop[1], im.height)))
    ims.append(im)
h = max(i.height for i in ims); w = sum(i.width for i in ims) + 20
out = Image.new('RGB', (w, h + 30), 'white'); d = ImageDraw.Draw(out)
x = 0
for s, im in zip(('DESIGN', 'DEV'), ims):
    out.paste(im, (x, 30)); d.text((x + 8, 8), s, fill='red'); x += im.width + 20
out = out.resize((int(out.width * scale), int(out.height * scale)))
dst = os.environ.get('SBS_DIR', '/tmp') + f'/sbs-{pid}-{vp}.png'
out.save(dst); print(dst, out.size)
