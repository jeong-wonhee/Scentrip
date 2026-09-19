#!/usr/bin/env python3
"""공유 미리보기(OG) 이미지 만들기 — assets/og/*.png (1200×630)

  python3 -m pip install Pillow
  python3 tools/make-og.py            # 폰트는 자동으로 내려받아 tools/.fonts/ 에 캐시

사진 위에 그린 스크림 + 틸 오라를 얹고 왼쪽에 로고·문구를 올린다.
색·자간은 reference/tokens.css 값을 그대로 쓴다 (자간 -3% 는 글자마다 직접 붙인다).
문구만 아래 PAGES 를 고치고 다시 돌리면 된다.
"""
import math, os, random, urllib.request
from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "og")
FONTDIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".fonts")
FONT_URL = ("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9"
            "/packages/pretendard/dist/public/static/Pretendard-%s.otf")

W, H = 1200, 630
PAD = 80
LS = -0.03                    # 자간 -3% (tokens.css --letter-spacing)

# tokens.css
GREEN_950, GREEN_900, GREEN_700 = "#121c18", "#21332c", "#2f4d40"
TEAL_200, TEAL_400 = "#b5dad3", "#60a199"

hx = lambda h: tuple(int(h[i:i+2], 16) for i in (1, 3, 5))


# ---------- 문구 ----------
# 배경 사진은 assets/og/photo/ — 전부 Unsplash 에서 받은 것이고 원본 주소는
# assets/og/photo/SOURCES.md 에 적어 두었다 (화면 안에서 쓰는 assets/place · assets/route
# 사진들은 출처 기록이 없어 공유 카드에는 쓰지 않는다).
# key: (배경 사진(None 이면 그린 그라디언트), 제목 줄들, 설명)
PAGES = {
  "og-default": ("assets/og/photo/lake-mist.jpg",
                 ["나만의 취향을 찾아 떠나는", "특별한 여행"],
                 "향 취향으로 찾는 여행 장소와 동선 추천"),
  "og-home": ("assets/og/photo/green-avenue.jpg",
              ["오늘, 내 취향에 닿는", "여행지를 만나요"],
              "AI 매칭도로 골라 주는 장소 · 동선 · 소식"),
  "og-about": ("assets/og/photo/forest-path.jpg",
               ["좋아하는 향을 따라가면,", "나에게 맞는 여행이 보입니다"],
               "센트립이 취향을 읽고 여정을 함께 그립니다"),
  "og-places": ("assets/og/photo/harbor-town.jpg",
                ["취향 매칭도로 고른", "여행 장소"],
                "지역 · 특징 · 취향으로 좁혀 보는 추천"),
  "og-routes": ("assets/og/photo/fern-boardwalk.jpg",
                ["하루가 자연스럽게", "이어지는 동선"],
                "AI가 짜 주는 일차별 코스, 그대로 내 여행으로"),
  "og-news": ("assets/og/photo/window-bookshelf.jpg",
              ["읽다 보면", "다음 여행이 그려지는 글"],
              "취향 매칭순으로 만나는 여행 이야기"),
  "og-taste": (None,
               ["당신의 여행은", "어떤 향인가요?"],
               "12개의 질문으로 찾는 16가지 향 유형"),
}
# 취향 검사 카드 오른쪽에 세워 둘 유형 — 방랑자(CHDN). 원판 없이 캐릭터 PNG 그대로
TASTE_CHAR = "CHDN"
TASTE_CHAR_H = 470        # 캐릭터 높이 (px)
TASTE_CHAR_C = (0.755, 0.52)   # 캔버스 대비 중심


# ---------- 폰트 ----------
def font(weight, size):
    os.makedirs(FONTDIR, exist_ok=True)
    p = os.path.join(FONTDIR, f"Pretendard-{weight}.otf")
    if not os.path.exists(p):
        print("  ↓ Pretendard", weight)
        urllib.request.urlretrieve(FONT_URL % weight, p)
    return ImageFont.truetype(p, size)


def text_ls(d, xy, s, f, fill, ls=LS):
    """자간을 직접 먹여 한 글자씩 그린다 (PIL 에는 letter-spacing 이 없다)"""
    x, y = xy
    for ch in s:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + f.size * ls
    return x


def width_ls(d, s, f, ls=LS):
    return sum(d.textlength(c, font=f) + f.size * ls for c in s)


# ---------- 로고 심볼 (assets/logo/scentrip-symbol-white.svg 와 같은 도형) ----------
def bezier(p0, p1, p2, p3, n=24):
    return [(
        (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t*t*p2[0] + t**3*p3[0],
        (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t*t*p2[1] + t**3*p3[1],
    ) for t in (i/n for i in range(n+1))]

PETAL = (bezier((24, 21), (15.5, 17), (16, 7.5), (24, 4.5))
         + bezier((24, 4.5), (32, 7.5), (32.5, 17), (24, 21)))

def symbol(size, petal="#ffffff", north=TEAL_200, ss=4):
    """48 그리드 꽃잎 나침반. 위쪽(북) 한 장만 틸."""
    n = size * ss
    im = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    k = n / 48
    for deg, col in ((90, petal), (180, petal), (270, petal), (0, north)):
        a = math.radians(deg)
        pts = [((math.cos(a)*(x-24) - math.sin(a)*(y-24) + 24) * k,
                (math.sin(a)*(x-24) + math.cos(a)*(y-24) + 24) * k) for x, y in PETAL]
        d.polygon(pts, fill=hx(col) + (255,))
    d.ellipse([(22*k), (22*k), (26*k), (26*k)], fill=hx(petal) + (255,))
    return im.resize((size, size), Image.LANCZOS)


# ---------- 배경 ----------
def photo_bg(path):
    im = Image.open(os.path.join(ROOT, path)).convert("RGB")
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width*s), round(im.height*s)), Image.LANCZOS)
    x, y = (im.width - W)//2, (im.height - H)//2
    im = im.crop((x, y, x+W, y+H))
    # 스크림을 얹으면 전체가 가라앉는다 — 먼저 사진을 조금 밝고 또렷하게
    im = ImageEnhance.Brightness(im).enhance(1.14)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.08)
    return im.convert("RGBA")


def cover_bg():
    """취향 테스트 표지(#stage-intro)의 배경을 그대로 옮긴 것 —
    다크 그린 세로 그라디언트 + 오로라 세 덩어리(screen) + 점 그리드 별밭 + 필름 그레인."""
    base = hx("#0a160e")
    # linear-gradient(180deg, ...) — 색과 알파를 같이 보간해 base 위에 얹는다
    STOPS = [(0.00, "#08130d", 1.00), (0.34, "#0e2016", 1.00), (0.64, "#1d3a2a", 1.00),
             (0.88, "#355945", 0.141), (1.00, "#567b65", 0.251)]
    im = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / (H - 1)
        for i in range(len(STOPS) - 1):
            if STOPS[i][0] <= t <= STOPS[i+1][0]:
                (p0, c0, a0), (p1, c1, a1) = STOPS[i], STOPS[i+1]
                k = 0 if p1 == p0 else (t - p0) / (p1 - p0)
                rgb0, rgb1 = hx(c0), hx(c1)
                col = [rgb0[j] + (rgb1[j]-rgb0[j])*k for j in range(3)]
                al = a0 + (a1-a0)*k
                break
        d.line([(0, y), (W, y)],
               fill=tuple(round(col[j]*al + base[j]*(1-al)) for j in range(3)))
    im = im.convert("RGBA")

    # 오로라 — .ib-cream / .ib-teal / .ib-green (mix-blend-mode: screen)
    screen_blob(im, 0.10*W, 0.58*H, 300, "#f3efe1", 0.14)
    screen_blob(im, 0.95*W, 0.10*H, 460, "#3a827c", 0.42)
    screen_blob(im, 0.46*W, 0.92*H, 560, "#2e6e4a", 0.55)

    # 점 그리드 별밭 — 위쪽만 (mask-image 로 아래로 갈수록 사라진다)
    dots = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dots)
    for y in range(0, H, 34):
        for x in range(0, W, 34):
            m = max(0.0, 0.85 - y/H/0.74*0.85)          # 위 .85 → 74% 지점 0
            if m <= 0: continue
            dd.ellipse([x-1, y-1, x+1, y+1], fill=hx("#eef4ee") + (round(0.5*m*0.42*255),))
    im.alpha_composite(dots)

    grain(im)
    return im


def screen_blob(im, cx, cy, r, color, alpha):
    """radial-gradient 한 덩어리를 screen 으로 합성 (CSS .intro-aurora .ib 와 같은 방식).
    새 이미지를 돌려주지 않고 받은 이미지를 그대로 고친다."""
    col = hx(color)
    px = im.load()
    x0, y0 = max(0, int(cx-r)), max(0, int(cy-r))
    x1, y1 = min(W, int(cx+r)+1), min(H, int(cy+r)+1)
    for y in range(y0, y1):
        dy2 = (y - cy) ** 2
        for x in range(x0, x1):
            t = ((x - cx) ** 2 + dy2) ** 0.5 / r
            if t >= 1: continue
            k = alpha * (1 - t) ** 1.7          # 가운데가 진하고 가장자리에서 0
            r0, g0, b0, a0 = px[x, y]
            px[x, y] = (round(r0 + (255 - (255-r0)*(255-col[0])/255 - r0) * k),
                        round(g0 + (255 - (255-g0)*(255-col[1])/255 - g0) * k),
                        round(b0 + (255 - (255-b0)*(255-col[2])/255 - b0) * k), a0)


def grain(im, strength=0.045, tile=220):
    """필름 그레인 — 220px 타일을 반복해 아주 옅게 얹는다 (.intro-grain 근사)"""
    rnd = random.Random(7)
    t = [rnd.randint(-127, 127) for _ in range(tile*tile)]
    px = im.load()
    for y in range(H):
        row = (y % tile) * tile
        for x in range(W):
            k = round(t[row + (x % tile)] * strength)
            if not k: continue
            r0, g0, b0, a0 = px[x, y]
            px[x, y] = (max(0, min(255, r0+k)), max(0, min(255, g0+k)), max(0, min(255, b0+k)), a0)


def scrim(im):
    """왼쪽을 깊은 그린으로 덮어 글씨가 읽히게 — 오른쪽은 사진을 살린다"""
    g = Image.new("RGBA", (W, H))
    d = ImageDraw.Draw(g)
    c = hx(GREEN_950)
    for x in range(W):
        t = x / (W - 1)
        a = 0.88 - 0.76 * min(1, (t / 0.80) ** 1.30)      # 0.88 → 0.12
        d.line([(x, 0), (x, H)], fill=c + (round(a * 255),))
    im.alpha_composite(g)
    # 아래쪽을 한 번 더 눌러 문구 아래가 뜨지 않게
    b = Image.new("RGBA", (W, H))
    d = ImageDraw.Draw(b)
    for y in range(H):
        t = max(0, (y - H*0.55) / (H*0.45))
        d.line([(0, y), (W, y)], fill=c + (round(0.30 * t * 255),))
    im.alpha_composite(b)
    return im


def aura(im, cx, cy, r, color=TEAL_400, alpha=0.30):
    """--gradient-aura 를 어두운 배경용으로 — 틸 발광 한 점"""
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    steps = 40
    for i in range(steps, 0, -1):
        t = i / steps
        rr = r * t
        d.ellipse([cx-rr*1.35, cy-rr, cx+rr*1.35, cy+rr],
                  fill=hx(color) + (round(alpha * 255 / steps),))
    im.alpha_composite(g.filter(ImageFilter.GaussianBlur(40)))
    return im


# ---------- 조립 ----------
def build(key, spec):
    photo, lines, sub = spec
    im = photo_bg(photo) if photo else cover_bg()
    if photo:
        im = scrim(im)
        im = aura(im, W*0.78, H*0.28, 330, alpha=0.30)
    else:
        im = aura(im, W*0.74, H*0.46, 380, alpha=0.40)
    d = ImageDraw.Draw(im)

    # 취향 검사 — 오른쪽에 유형 캐릭터 한 장 (원판 없이 PNG 그대로)
    if key == "og-taste":
        ch = Image.open(os.path.join(ROOT, "assets/character", TASTE_CHAR + ".png")).convert("RGBA")
        ch = ch.crop(ch.split()[3].point(lambda v: 255 if v > 14 else 0).getbbox())
        k = TASTE_CHAR_H / ch.height
        ch = ch.resize((round(ch.width*k), TASTE_CHAR_H), Image.LANCZOS)
        cx, cy = TASTE_CHAR_C[0]*W, TASTE_CHAR_C[1]*H
        screen_blob(im, cx, cy, 320, "#3a827c", 0.34)          # 캐릭터 뒤 은은한 틸 발광
        im.alpha_composite(ch, (round(cx - ch.width/2), round(cy - ch.height/2)))

    # 로고
    sym = symbol(54)
    im.alpha_composite(sym, (PAD, PAD - 4))
    text_ls(d, (PAD + 54 + 14, PAD + 1), "Scentrip", font("SemiBold", 38), (255, 255, 255, 255))

    # 문구 — 아래에서 쌓아 올린다
    f_h1, f_sub = font("SemiBold", 60), font("Regular", 26)
    lh = round(60 * 1.32)
    y = H - PAD - 26 - 4                      # 설명 윗줄
    text_ls(d, (PAD, y), sub, f_sub, (255, 255, 255, 205))
    y -= 22 + lh * len(lines)
    for i, ln in enumerate(lines):
        text_ls(d, (PAD, y + i*lh), ln, f_h1, (255, 255, 255, 255))

    os.makedirs(OUT, exist_ok=True)
    # 크롤러가 받아 가는 이미지라 가볍게 — 사진이 대부분이라 JPEG
    p = os.path.join(OUT, key + ".jpg")
    im.convert("RGB").save(p, quality=90, subsampling=0, optimize=True, progressive=True)
    print(f"  {key}.jpg  {os.path.getsize(p)//1024}KB")


if __name__ == "__main__":
    print("OG 이미지 생성 →", OUT)
    for k, v in PAGES.items():
        build(k, v)
