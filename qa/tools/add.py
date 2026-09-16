#!/usr/bin/env python3
"""발견 사항 누적: python3 qa/tools/add.py <<'J' ... J  (JSON 한 개 또는 배열)
필드: step(1~4) sev(P0|P1|P2|확인필요|원본확인|원본에없음|미구현) page title where expected src actual shot vp fix"""
import json, sys, os
p = os.path.join(os.path.dirname(__file__), '..', 'raw', 'findings.jsonl')
data = json.loads(sys.stdin.read())
data = data if isinstance(data, list) else [data]
n = sum(1 for _ in open(p)) if os.path.exists(p) else 0
with open(p, 'a') as f:
    for d in data:
        n += 1; d['n'] = n
        f.write(json.dumps(d, ensure_ascii=False) + '\n')
print('total', n)
