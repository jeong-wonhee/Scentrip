#!/usr/bin/env python3
"""
qa/*.md 의 '근거' 줄 번호를 현재 파일 기준으로 다시 맞춘다.

왜 필요한가
  QA 리포트(05d8256)를 쓴 뒤 OG 메타·파비콘 커밋이 20개 화면의 <head> 에 20여 줄씩 넣어서,
  리포트가 적어 둔 `screens/*.html:줄번호` 가 통째로 밀렸다.

어떻게 맞추는가
  기대 문구로 찾는 대신, QA 시점 파일과 현재 파일을 difflib 로 붙여 '옛 줄 → 새 줄' 지도를 만든다.
  문구가 그대로인 줄은 지도에서 1:1 로 이어지므로, 그 줄이 어디로 갔는지만 따라가면 된다.

판정
  ok       옛 줄과 새 줄의 내용이 '완전히 같다' → 확실
  moved    내용은 같고 번호만 바뀜 (위와 같은 경우. ok 안에 포함)
  changed  그 줄 자체가 수정돼서 내용이 다르다 → 번호는 근처로 옮기되 '확인 필요' 로 보고
  lost     그 줄이 사라졌다 → 건드리지 않고 '확인 필요' 로 보고

쓰는 법
  python3 qa/tools/reanchor-refs.py            # 미리보기만 (파일 안 고침)
  python3 qa/tools/reanchor-refs.py --apply    # 실제로 고침
"""
import re, sys, os, glob, json, hashlib, difflib, subprocess, collections

BASE = "05d8256"                       # QA 리포트를 쓴 커밋
SKIP_TICKETS = {f"F{n}" for n in range(275, 285)} | {"F289"}   # 닉네임 티켓 11건은 손으로 이미 맞춤
REF = re.compile(r'`([A-Za-z0-9_./-]+\.(?:html|css|js|py|mjs)):([0-9][0-9,\s-]*)`')
APPLY = "--apply" in sys.argv
STAMP = "qa/tools/.reanchor-stamp.json"

def docs_hash():
    h = {}
    for md in sorted(glob.glob("qa/*.md")):
        h[md] = hashlib.sha256(open(md, "rb").read()).hexdigest()
    return h

def guard():
    """두 번 돌리면 이미 새 번호가 된 참조를 '옛 번호'로 오해해 엉뚱한 데로 옮긴다 — 그걸 막는다."""
    if not os.path.exists(STAMP): return
    st = json.load(open(STAMP, encoding="utf-8"))
    if st.get("base") == BASE and st.get("docs") == docs_hash():
        print(f"이미 {BASE} 기준으로 맞춰 둔 문서입니다. 그대로 다시 돌리면 번호가 어긋납니다.\n"
              f"화면 파일이 또 밀렸다면, 위 BASE 를 '지금 참조가 맞던 마지막 커밋'으로 바꾼 뒤 돌리세요.")
        sys.exit(1)

def resolve(path):
    """`home.html:303` 처럼 screens/ 가 빠진 표기를 실제 파일로 이어 준다"""
    import os
    return path if os.path.exists(path) else (f"screens/{path}" if os.path.exists(f"screens/{path}") else path)

def old_text(path):
    try:
        return subprocess.run(["git", "show", f"{BASE}:{path}"], capture_output=True, text=True,
                              check=True).stdout.split("\n")
    except subprocess.CalledProcessError:
        return None

_cache = {}
def linemap(path):
    """옛 줄번호(1-base) → (새 줄번호, 판정)"""
    if path in _cache: return _cache[path]
    real = resolve(path)
    old = old_text(real)
    try:
        new = open(real, encoding="utf-8").read().split("\n")
    except OSError:
        new = None
    if old is None or new is None:
        _cache[path] = None
        return None
    m = {}
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1): m[i1 + k + 1] = (j1 + k + 1, "ok")
        elif tag == "replace":
            for k in range(i2 - i1):
                m[i1 + k + 1] = (min(j1 + k, j2 - 1) + 1, "changed")
        elif tag == "delete":
            for k in range(i2 - i1): m[i1 + k + 1] = (j1 + 1, "lost")
    _cache[path] = (m, old, new)
    return _cache[path]

stats = collections.Counter()
review = []

def remap(path, spec, where):
    got = linemap(path)
    if got is None:
        stats["파일없음"] += 1
        review.append((where, path, spec, "QA 시점 또는 현재 파일을 못 찾음"))
        return spec
    m, old, new = got
    out, worst = [], "ok"
    for part in [p.strip() for p in spec.split(",")]:
        open_end = part.endswith("-")
        nums = [n for n in part.rstrip("-").split("-") if n]
        moved = []
        for n in nums:
            n = int(n)
            if n not in m:
                stats["범위밖"] += 1
                review.append((where, path, part, f"{n}줄은 QA 시점 파일 범위 밖"))
                moved.append(str(n)); worst = "확인필요"
                continue
            j, kind = m[n]
            moved.append(str(j))
            if kind != "ok":
                worst = "확인필요"
                review.append((where, path, part,
                               f"{n}→{j} · 그 줄이 그 뒤로 {'수정됨' if kind=='changed' else '삭제됨'}"
                               f" (옛: {old[n-1].strip()[:60]})"))
        out.append("-".join(moved) + ("-" if open_end else ""))
    stats[worst] += 1
    return ", ".join(out)

def ticket_of(md, line, block):
    if md.endswith("01-text.md"):
        mm = re.match(r"\| (F\d+) \|", line)
        return mm.group(1) if mm else None
    mm = re.search(r"상세: `qa/01-text\.md` (F\d+)", block)
    return mm.group(1) if mm else None

if APPLY: guard()

changed_files = 0
for md in sorted(glob.glob("qa/*.md")):
    src = open(md, encoding="utf-8").read()
    lines = src.split("\n")
    # QA-REPORT 는 티켓이 '### [SCT-xxx]' 블록이라 F번호가 블록 끝에 있다 — 줄마다 소속 블록을 미리 구해 둔다
    blocks, cur = [], ""
    if not md.endswith("01-text.md"):
        idx = [i for i, l in enumerate(lines) if l.startswith("### ")] + [len(lines)]
        owner = {}
        for a, b in zip(idx, idx[1:]):
            blk = "\n".join(lines[a:b])
            for i in range(a, b): owner[i] = blk
        blocks = owner
    for i, l in enumerate(lines):
        if not REF.search(l): continue
        blk = blocks.get(i, "") if blocks else ""
        t = ticket_of(md, l, blk)
        if t in SKIP_TICKETS:
            stats["건너뜀(닉네임)"] += 1
            continue
        lines[i] = REF.sub(lambda mm: f"`{mm.group(1)}:{remap(mm.group(1), mm.group(2), f'{md} {t or i+1}')}`", l)
    out = "\n".join(lines)
    if out != src:
        changed_files += 1
        if APPLY: open(md, "w", encoding="utf-8").write(out)

if APPLY:
    json.dump({"base": BASE, "docs": docs_hash()}, open(STAMP, "w", encoding="utf-8"), indent=1)

print(f"{'적용' if APPLY else '미리보기'} — 바뀐 문서 {changed_files}개")
for k, v in stats.most_common(): print(f"  {k:14s} {v}")
if review:
    print(f"\n확인 필요 {len(review)}건")
    for where, path, spec, why in review[:40]:
        print(f"  [{where}] {path}:{spec} — {why}")
    if len(review) > 40: print(f"  … 외 {len(review)-40}건")
