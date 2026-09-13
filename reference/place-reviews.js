/* ============================================================
   Scentrip — 장소별 리뷰 샘플 (천관산 억새 언덕)
   place-detail.html 은 앞의 3개, place-reviews.html 은 전체를 쓴다.
   앞의 3개는 장소 상세에 원래 있던 리뷰 그대로 (내 리뷰 1 + 다른 사용자 2).
   TODO(개발): 장소 id 로 리뷰 목록 API — 정렬(추천·최신) · 별점 · 사진 필터 · 페이지, 도움돼요는 계정 기준
   ============================================================ */
const PLACE_REVIEWS = (() => {
  const base = [
    { id: "rv1", name: "이서연", type: "WHAN", typeName: "감성가 타입", visit: "26.08.20", rating: 5, mine: true, helpful: 12,
      text: "조용하고 따뜻한 분위기가 좋았어요. 우디한 향이 은은하게 퍼져서 오래 머물고 싶은 공간이었습니다. 해 질 녘 억새밭은 꼭 보세요.",
      photos: ["../assets/route/g1.jpg", "../assets/route/g3.jpg", "../assets/place/frame9.jpg"], date: "2026.08.21" },
    { id: "rv2", name: "예주", type: "CLAR", typeName: "연출가 타입", visit: "26.08.15", rating: 4, mine: false, helpful: 31,
      text: "바람에 억새가 흔들리는 소리가 좋았어요. 사진 찍기 정말 좋은 곳! 서늘한 공기가 상쾌했습니다.",
      photos: ["../assets/route/g3.jpg", "../assets/route/big.jpg", "../assets/route/g1.jpg"], date: "2026.08.16" },
    { id: "rv3", name: "봉주림", type: "WLAN", typeName: "낭만가 타입", visit: "26.08.02", rating: 4, mine: false, helpful: 18,
      text: "이른 아침에 방문했는데 사람이 적어 고요하게 산책하기 좋았어요. 마른 풀 향이 은은하게 퍼집니다.",
      photos: ["../assets/route/big.jpg", "../assets/route/g1.jpg", "../assets/route/g3.jpg"], date: "2026.08.03" },
  ];
  const NAMES = ["김하늘", "소금빵", "정원", "여름산책", "윤슬", "민트초코", "걷는사람", "달리", "오후네시", "한결", "보리", "무화과"];
  const TYPES = [["WHAN", "감성가 타입"], ["CLAR", "연출가 타입"], ["WLAN", "낭만가 타입"]];
  const BODIES = [
    "바람이 불 때마다 억새가 파도처럼 눕는 게 장관이에요. 마른 풀 향이 은은하게 따라와요.",
    "주차장에서 20분 정도 오르면 억새 능선이 나와요. 운동화는 꼭 신고 가세요.",
    "해 질 녘에 갔는데 금빛으로 물드는 억새가 정말 예뻤어요. 사진보다 실제가 훨씬 좋아요.",
    "생각보다 바람이 세서 겉옷을 챙기길 잘했어요. 정상 쪽은 꽤 서늘해요.",
    "사람이 적은 평일 오전이 제일 좋았어요. 흙냄새와 풀 향이 또렷하게 느껴져요.",
    "정상 쪽 전망이 탁 트여서 멀리 바다까지 보여요. 걷다 보면 사진 찍기 좋은 자리가 계속 나와요. 억새 사이로 난 길이 좁아서 사람이 많을 땐 조금 기다려야 했지만, 그만큼 조용한 시간이 소중하게 느껴졌어요.",
    "길이 조금 가팔라서 아이와 함께 가기엔 힘들 수 있어요. 중간에 쉬어갈 벤치가 있어요.",
    "가을 초입이라 억새가 아직 덜 폈지만 그래도 충분히 좋았어요. 한 달 뒤에 다시 오려고요.",
    "비 온 다음 날 갔더니 흙 향이 진하게 올라왔어요. 대신 길이 미끄러우니 조심하세요.",
    "입장료가 저렴하고 관리가 잘 되어 있어요. 입구 화장실도 깨끗했어요.",
    "노을 시간에 맞추려면 일몰 한 시간 전에는 출발하세요. 내려올 때 어두워지니 휴대폰 불빛을 챙기면 좋아요.",
    "향 취향 테스트 결과대로 추천받았는데 제 취향에 딱 맞았어요. 마른 나무와 풀 향을 좋아하면 강력 추천해요.",
  ];
  const PHOTOS = ["../assets/route/g1.jpg", "../assets/route/g2.jpg", "../assets/route/g3.jpg", "../assets/route/g4.jpg", "../assets/route/big.jpg", "../assets/place/frame9.jpg", "../assets/place/frame10.jpg"];
  const RATINGS = [5, 4, 5, 3, 4, 5, 4, 2, 5, 4, 5, 4, 3, 5, 4, 4, 5, 1, 4, 5, 3];
  const HELPFUL = [9, 4, 22, 0, 7, 15, 3, 1, 11, 6, 2, 8, 0, 5, 13, 1, 4, 0, 2, 6, 1];
  const pad = (n) => String(n).padStart(2, "0");
  const out = base.slice();
  let d = new Date(2026, 7, 1);   // 2026-08-01 부터 거슬러 올라간다
  RATINGS.forEach((rating, i) => {
    d = new Date(d.getTime() - (2 + (i % 4)) * 86400000);
    const visit = new Date(d.getTime() - 86400000);
    const t = TYPES[i % TYPES.length];
    const nPhotos = i % 3 === 0 ? 0 : (i % 3 === 1 ? 1 : 3);
    out.push({
      id: "rv" + (i + 4), name: NAMES[i % NAMES.length], type: t[0], typeName: t[1],
      visit: `${String(visit.getFullYear()).slice(2)}.${pad(visit.getMonth() + 1)}.${pad(visit.getDate())}`,
      rating, mine: false, helpful: HELPFUL[i],
      text: BODIES[i % BODIES.length],
      photos: Array.from({ length: nPhotos }, (_, k) => PHOTOS[(i + k) % PHOTOS.length]),
      date: `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`,
    });
  });
  return out;
})();
