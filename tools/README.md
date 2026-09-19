# tools — 이미지 뽑는 스크립트

프로토타입 화면은 빌드 도구 없이 브라우저에서 바로 열립니다. 여기 있는 것은 화면이 아니라
**이미지 에셋을 다시 뽑을 때만** 쓰는 스크립트입니다. 이미지가 이미 저장소에 들어 있으니
평소에는 돌릴 일이 없고, 원본 캐릭터나 공유 카드 문구가 바뀔 때만 쓰면 됩니다.

```bash
python3 -m pip install Pillow
```

| 스크립트 | 만드는 것 | 대조 문서 |
|---|---|---|
| `make-avatars.py` | `assets/character/avatar/*.png` — 16유형 필터 아바타 16장 (160×160 투명 PNG) | [reference/type-avatars.html](../reference/type-avatars.html) |
| `make-og.py` | `assets/og/*.jpg` — 공유 미리보기 카드 7장 (1200×630 JPEG) | [reference/og-share.html](../reference/og-share.html) |

- `make-og.py` 는 Pretendard OTF 를 처음 한 번 `tools/.fonts/` 로 내려받습니다(커밋하지 않습니다).
  문구만 바꿀 때는 파일 안 `PAGES` 를 고치고 다시 돌리면 됩니다.
- `make-avatars.py` 는 원본 캐릭터 그림을 받침·소품까지 그대로 쓰고 프레이밍(여백 털기 · 가운데 정렬)만
  합니다. 예외로 큐레이터 · 개척자 · 낭만가 · 미학가 · 노마드 다섯만 소품을 지우고 새만 남기는데,
  지우는 영역은 파일 안 `ERASE` 에 정규화 좌표로 적혀 있습니다 — 원본 그림이 바뀌면 이 다섯만 다시 잡으면 됩니다.
  `PAD_MORE` 는 원판이 꽉 차 보이는 유형(큐레이터 · 사색가 · 개척자 · 낭만가 · 몽상가)의 여백을 10% → 16% 로
  늘리는 값이고, `ZOOM` 은 미학가처럼 세로로 긴 그림을 맞춰 넣는 대신 키워서 담는 배율입니다
  (원판 밖으로 나가는 부분은 그림을 고치지 않고 원판이 잘라 냅니다).
