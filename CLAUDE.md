# Scentrip 디자인 프로토타입 작업 공간

Scentrip은 사용자의 여행 취향을 AI로 분석해 장소·동선을 추천하는 여행 서비스. 이 폴더는 새 화면을 **HTML/CSS(+ 필요시 최소 JS)로 프로토타이핑**하는 공간이며, 완성본은 개발자에게 전달되어 Next.js로 이식된다.

- 실제 서비스: Next.js, Vercel 임시 배포
- 이 폴더의 산출물: 빌드 도구 없이 브라우저에서 바로 열리는 순수 HTML 프로토타입
- Figma 디자인시스템: https://www.figma.com/design/cssIJxw9muChFJABQrvNeM/Scentrip-Design-System
- Figma 완성 페이지(참고용): https://www.figma.com/design/HHNGYvSzJ8tjZ8diOlhkON/센트립

## 디자인 시스템 — Scent Green

- 브랜드 컬러: 세이지 그린 `Scent Green` 램프 50~950 (`--color-primary: --scent-green-600 / #3a5e4e`)
- 서브 컬러: `Scent Teal` 램프 50~950 — 단독으로 쓰기보다 `--gradient-brand`(그린→틸)의 끝점으로 등장
- 폰트: Pretendard, 자간 -3%
- 타입 스케일: Display(48/40/36) → Title(32/28) → Heading(24/20) → Body(18/16/14) → Caption(12/11), 전부 SemiBold/Medium/Regular 조합
- 스페이싱: 4px 베이스 스케일 (2~96px)
- 라운드: xs 2px ~ 3xl 32px, full은 pill 형태
- **그라디언트 5종**: `--gradient-aura`(히어로 배경 발광) `--gradient-mist`(옅은 그린 면) `--gradient-depth`(어두운 그린 CTA/푸터) `--gradient-glow`(이미지 위 하이라이트) `--gradient-brand`(그린→틸)
- **엘리베이션 5종**: `--elevation-xs ~ -xl` — 그림자 색이 검정이 아니라 그린 틴트(#1b231d)라 톤이 유지됨
- **상태 레이어**: 호버/프레스는 색을 바꾸지 말고 `--color-state-hover(-brand)` / `--color-state-pressed(-brand)` 알파를 겹칠 것. 모달 딤은 `--color-state-scrim`
- 전체 토큰은 [reference/tokens.css](reference/tokens.css)에 CSS 변수로 정리되어 있음 — **새 화면 작업 시 이 파일을 그대로 `:root`에 import해서 하드코딩 없이 var()로 사용할 것**. 원칙적으로 시맨틱 토큰(`--color-*`)만 쓰고, 프리미티브(`--scent-green-*` 등) 직접 참조는 예외적인 경우에만

## 현재 서비스 톤 (참고 스크린샷)

- [reference/home.png](reference/home.png) — 홈: 취향 기반 추천 배너 + 카드 그리드
- [reference/place-list.png](reference/place-list.png) — 탐색(장소 리스트): 필터 + AI 매칭 % 배지가 붙은 카드 그리드
- [reference/route-list.png](reference/route-list.png) — 탐색(동선 리스트): 캐러셀 + 지도 썸네일 카드
- [reference/ds-typography.png](reference/ds-typography.png), [reference/ds-spacing-radius.png](reference/ds-spacing-radius.png) — 타이포/스페이싱 문서

**현재 상태 평가**: 기존 완성 페이지는 카드 그리드 위주의 담백한 레이아웃으로, 톤 자체는 정리되어 있지만 시각적으로는 와이어프레임에 가까움. "fancy하게" 만든다는 건 이 그린 톤 + 여행/자연 무드를 살리면서 — 톤 있는 그라디언트, 정교한 그림자/깊이감, 세밀한 마이크로 인터랙션, 사진을 활용한 히어로 영역, 카드 호버 디테일 등으로 고급스러움을 더하는 방향. 브랜드 컬러(세이지 그린)와 타입 스케일은 유지하되 레이아웃/디테일 밀도를 높일 것.

## IA (Information Architecture)

전체 다이어그램: [reference/ia.png](reference/ia.png) — 로그인 후 IA · 데스크톱 기준

**메인 내비게이션**: 홈 / 소식 / 탐색 / 내 여행

- **홈** — 단일 페이지 (Home)
- **소식** — 소식 목록 → 소식 상세(아티클)
- **탐색** — 탭 허브
  - [탭] 장소 추천 → **여행장소 상세★**
  - [탭] 동선 추천 → **여행동선 상세★**
- **내 여행** — 탭 허브 (My)
  - [탭] 내 동선(마이픽)
  - [탭] 저장(찜)
  - ~~[탭] 여행 기록~~ — 만들지 않기로 결정 (2026-09-13). 내 여행은 내 장소 · 내 동선 두 탭

**우상단 유틸리티 / 진입 전**: ~~검색(→검색 결과)~~ 만들지 않기로 결정 (2026-09-13) · 저장/북마크(→내 여행·저장) · 아바타(→프로필·설정) · 온보딩(로그인·회원가입) · 온보딩(취향 설문)

- ★ = 공유 상세 페이지. 여행장소/여행동선/소식 상세는 탐색, 내 여행, 검색 등 **여러 진입점에서 공유**되므로 새 화면을 만들 때 진입 경로(어디서 왔는지)에 따라 상단 breadcrumb·뒤로가기 동작이 달라질 수 있음을 고려할 것
- 카드에는 항상 "AI 매칭 %" 배지가 붙음 — 취향 매칭이 서비스의 핵심 차별점이므로 새 화면에서도 이 개념을 이어갈 것

## 작업 방식

1. 새 화면 요청이 오면 `frontend-design` 스킬이 자동 로드되어 fancy한 방향을 제안함
2. 완성된 HTML은 `screens/` 폴더에 저장 (파일명: `화면명.html`)
3. 이미지/아이콘 등은 `assets/`에 저장
4. 필요시 `design-critique`, `accessibility-review` 스킬로 자체 검수
5. 개발자 전달 전 `design-handoff` 스킬로 스펙 정리 가능
6. 팀 리뷰가 필요하면 `figma-generate-design` 스킬로 완성 HTML을 Figma에 다시 반영 가능

## 주의

- 위 토큰과 IA는 2026-07-12 기준 스냅샷. Figma 파일이 갱신되면 `reference/tokens.css`, `reference/ia.png`도 다시 동기화해야 함
