#!/usr/bin/env python3
"""16유형 필터용 아바타 만들기 — assets/character/avatar/*.png (160×160)

  python3 -m pip install Pillow
  python3 tools/make-avatars.py

원본 캐릭터 그림(assets/character/{코드}.png)을 받침·소품까지 그대로 쓰고,
프레이밍만 한다 — 알파 바운딩 박스로 빈 여백을 털어내고 정사각 캔버스 가운데에
같은 여백으로 앉힌다. 전신 그림을 확대해 얼굴 근처를 자르던 방식(캐릭터마다 얼굴 위치가
달라 받침이 어정쩡하게 잘렸다) 대신 그림 전체가 원판 안에 들어온다.

예외로 다섯 유형(아래 ERASE)만 소품을 지우고 새만 남긴다 — 소품이 새보다 커서
작은 원판에서 새가 안 보이던 유형들이다. 미학가(ZOOM)는 그림을 고치는 대신 키워서 담고,
원판 밖으로 나가는 다리·꼬리 깃은 원판이 잘라 낸다.
결과 대조는 reference/type-avatars.html.
"""
import os
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "character")
OUT = os.path.join(SRC, "avatar")
SIZE = 160          # 출력 한 변 (필터 36px 기준 4.4배 — 80px까지 @2x)
PAD  = 0.10         # 캔버스 대비 여백 — 원판(원형)에 잘려 나가는 가장자리를 줄이는 몫도 겸한다
# 원판을 꽉 채워 답답해 보이는 유형만 여백을 더 준다 (새 한 마리가 통째로 들어오는 그림들)
PAD_MORE = {"WHAR": 0.16, "WHDR": 0.16, "WHDN": 0.16, "WLAN": 0.16, "CHAN": 0.16}
EDGE = 14           # 이보다 옅은 가장자리는 여백으로 본다 (바운딩 박스가 헐거워지지 않게)

ACCENT = {
  "WHAN": "#a66c3a", "WHAR": "#a88124", "WHDN": "#895143", "WHDR": "#5e2c26",
  "WLAN": "#57723b", "WLAR": "#dbb976", "WLDN": "#93a343", "WLDR": "#c6b495",
  "CHAN": "#306a7e", "CHAR": "#6b4ca9", "CHDN": "#589375", "CHDR": "#2d3b58",
  "CLAN": "#6cb946", "CLAR": "#e78940", "CLDN": "#3d85b8", "CLDR": "#9fc9db",
}

# 소품을 지우는 다섯 유형만 — 코드 → 지울 사각형들 (x0, y0, x1, y1 정규화)
# 나머지 열한 유형은 원본 그대로 쓴다.
ERASE = {
  "WHAR": [(0, .60, 1, 1), (0, 0, .32, 1)],   # 큐레이터 — 찻주전자 · 올라오는 김
  "WHDN": [(0, .52, 1, 1)],                   # 개척자 — 배낭
  "WLAN": [(0, .47, 1, 1)],                   # 낭만가 — 바구니
  "CHAR": [(0, .55, .42, 1)],                 # 미학가 — 도자기 (몸통 왼쪽이 안 깎이게 딱 도자기만)
  "CLDN": [(0, .42, 1, 1)],                   # 노마드 — 등대 · 바다
}

# 그림 전체를 넣으면 몸통이 너무 작아지는 유형만, 맞춰 넣는 대신 키워서 담는다.
# 원판 밖으로 나가는 부분(다리 끝 · 꼬리 깃)은 그림을 고치지 않고 원판이 잘라 낸다.
# 코드 → (맞춤 크기 대비 배율, 원판 한가운데에 놓을 그림 속 지점 x, y 정규화)
ZOOM = {
  "CHAR": (1.70, .40, .29),   # 미학가 — 학. 머리 위로 여백을 두고, 다리 끝은 원판이 자른다
}

hex2rgb = lambda h: tuple(int(h[i:i+2], 16) for i in (1, 3, 5))

os.makedirs(OUT, exist_ok=True)
print("유형 아바타 생성 →", OUT)
for code, accent in ACCENT.items():
    im = Image.open(os.path.join(SRC, code + ".png")).convert("RGBA")

    a = im.split()[3]
    if code in ERASE:
        W, H = im.size
        px = a.load()
        for (x0, y0, x1, y1) in ERASE[code]:
            for yy in range(int(y0*H), int(y1*H)):
                for xx in range(int(x0*W), int(x1*W)):
                    px[xx, yy] = 0
        im.putalpha(a)

    # 그림이 실제로 그려진 만큼만 — 원본의 빈 여백은 캐릭터마다 달라서 그대로 두면 크기가 들쭉날쭉하다
    box = a.point(lambda v: 255 if v > EDGE else 0).getbbox()
    sub = im.crop(box)

    inner = int(SIZE * (1 - PAD_MORE.get(code, PAD) * 2))
    s = min(inner / sub.width, inner / sub.height)
    zoom, fx, fy = ZOOM.get(code, (1.0, .50, .50))
    s *= zoom
    sub = sub.resize((max(1, round(sub.width*s)), max(1, round(sub.height*s))), Image.LANCZOS)

    # 기본은 가운데 정렬. ZOOM 이 있으면 지정한 지점을 원판 한가운데에 놓고
    # 캔버스 밖으로 나간 부분은 그대로 잘린다 (원형 마스크가 다시 한 번 잘라 준다)
    x = round(SIZE/2 - sub.width * fx)
    y = round(SIZE/2 - sub.height * fy)
    # 옅은 캐릭터(백조·구름·갈매기)가 밝은 원판에서 사라지지 않게 액센트 그림자를 깐다
    sh = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    tint = Image.new("RGBA", sub.size, tuple(int(c*.45) for c in hex2rgb(accent)) + (255,))
    tint.putalpha(sub.split()[3].point(lambda v: int(v*.40)))
    sh.alpha_composite(tint, (x, y + 4))
    sh = sh.filter(ImageFilter.GaussianBlur(SIZE/26))

    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    canvas.alpha_composite(sh)
    canvas.alpha_composite(sub, (x, y))
    p = os.path.join(OUT, code + ".png")
    canvas.save(p, optimize=True)
    print(f"  {code}.png  {os.path.getsize(p)//1024}KB  crop={box}")
