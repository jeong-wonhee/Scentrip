# 공유 카드 배경 사진 출처

공유 미리보기(OG) 카드 [assets/og/*.jpg](..) 의 배경으로만 쓰는 사진입니다.
전부 **Unsplash** 에서 받았고, 아래 주소를 열면 같은 파일이 그대로 내려옵니다
(`?auto=format&fit=crop&w=1600&q=80` 로 받은 것이라 파일은 1600px 폭입니다).

| 파일 | 쓰는 카드 | 원본 주소 |
|---|---|---|
| `lake-mist.jpg` | og-default — 안개 낀 호수와 침엽수림 | https://images.unsplash.com/photo-1477322524744-0eece9e79640 |
| `green-avenue.jpg` | og-home — 초록 가로수길 | https://images.unsplash.com/photo-1611657291636-c141ee8cf7ab |
| `forest-path.jpg` | og-about — 햇살 드는 숲길 | https://images.unsplash.com/photo-1609204757465-0b3656a993d8 |
| `harbor-town.jpg` | og-places — 바닷가 포구 마을 | https://images.unsplash.com/photo-1703768202246-c40573dbc218 |
| `fern-boardwalk.jpg` | og-routes — 고사리 사이 나무 데크길 | https://images.unsplash.com/photo-1758355081311-9db6cf99bbc1 |
| `window-bookshelf.jpg` | og-news — 창가 책장 | https://images.unsplash.com/photo-1533327325824-76bc4e62d560 |

og-taste 는 사진을 쓰지 않습니다 — 취향 테스트 표지(`screens/onboarding-test.html` 의 `#stage-intro`)
배경을 그대로 옮기고 방랑자 타입 캐릭터를 올렸습니다.

## 라이선스

[Unsplash License](https://unsplash.com/license) — 상업적 이용 포함 무료이고 출처 표기 의무는 없습니다.
다만 사진을 그대로 재판매하거나 Unsplash 와 경쟁하는 서비스를 만드는 용도로는 쓸 수 없습니다.
공유 카드 배경으로 쓰는 것은 허용 범위 안입니다.

**촬영자 이름은 확인하지 못했습니다.** 이미지 주소만으로는 Unsplash 사진 페이지를 특정할 수 없어
추정하지 않고 비워 두었습니다. 크레딧을 넣고 싶다면 위 주소의 사진을 unsplash.com 에서 찾아
촬영자를 확인한 뒤 이 표에 채워 주세요 (라이선스상 의무는 아닙니다).

## 주의 — 화면 안 사진은 다릅니다

`assets/place/*` · `assets/route/*` · `assets/home/inset*` · `assets/about/*` 사진들은
**출처 기록이 없습니다.** EXIF 도 지워져 있어 어디서 왔는지 알 수 없습니다.
(`screens/about.html` 의 두 장에만 Unsplash 주석이 달려 있는데, 주석에 적힌 ID 를 받아 보면
파일 내용이 달라 근거로 쓰기 어렵습니다. 저장소 스스로도 `reference/news.js` 에
"실사진은 라이선스 확인 후 교체 예정" 이라고 적어 두었습니다.)

공유 카드는 카카오톡 · 페이스북이 이미지를 가져가 캐시하고 재배포하는 **실제 공개 배포**라
출처가 확인된 사진만 쓰도록 이 폴더를 따로 두었습니다.
화면 안 사진들도 정식 오픈 전에는 출처를 확인하거나 교체해야 합니다.
