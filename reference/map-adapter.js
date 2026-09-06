/* ============================================================
   지도 어댑터 — 화면과 지도 SDK 사이의 얇은 층
   실서비스는 카카오맵/네이버지도 SDK로 갈 예정이라, 화면 코드가
   Leaflet API 를 직접 부르지 않게 여기서 한 겹 감싼다.
   교체할 때는 이 파일의 함수 속만 바꾸면 되고 화면은 손대지 않는다.

   화면이 지도에 요구하는 것은 넷뿐이다.
     1) 마커 찍기 · 경로선 잇기      addMarker / drawRoute
     2) 전체가 보이도록 맞추기        fitAll
     3) 마커 ↔ 카드 양방향 강조       highlight
     4) 로드 실패 시 대체 안내        create 가 false 를 반환
   ============================================================ */
const ScentMap = (() => {
  let map = null;
  const markers = {};      // key → 마커
  let line = null;

  /* 지도를 만든다. SDK 가 없으면 false 를 돌려주고, 화면은 대체 안내를 띄운다 */
  function create(el, center, zoom) {
    if (typeof L === "undefined" || !el) return false;
    map = L.map(el, { zoomControl: true, scrollWheelZoom: false, attributionControl: true })
           .setView(center, zoom || 11);
    // CARTO 타일은 API 키를 요구해 키 없이 쓸 수 있는 OSM 기본 타일을 쓴다.
    // 원색이 세서 채도는 CSS(.leaflet-tile)에서 눌러 서비스 톤에 맞춘다.
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: "&copy; OpenStreetMap",
    }).addTo(map);
    return true;
  }

  /* html 을 그대로 마커로 쓴다 — 우리 핀 모양·호버 카드를 유지하기 위해서다 */
  function addMarker(key, latlng, html, size, anchor) {
    if (!map) return null;
    const icon = L.divIcon({ html, className: "", iconSize: size || [26, 34], iconAnchor: anchor || [13, 34] });
    const m = L.marker(latlng, { icon, riseOnHover: true, keyboard: false }).addTo(map);
    markers[key] = m;
    return m;
  }

  function clearMarkers() {
    Object.values(markers).forEach((m) => map && map.removeLayer(m));
    Object.keys(markers).forEach((k) => delete markers[k]);
  }

  function el(key) {
    const m = markers[key];
    return m && m._icon ? m._icon.firstElementChild : null;
  }

  /* 노드 순서대로 경로선을 잇는다 */
  function drawRoute(points, opts) {
    if (!map) return;
    if (line) { map.removeLayer(line); line = null; }
    if (!points || points.length < 2) return;
    line = L.polyline(points, Object.assign({
      color: getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() || "#3a5e4e",
      weight: 3, opacity: .75, dashArray: "1 7", lineCap: "round",
    }, opts || {})).addTo(map);
  }

  /* 보이는 지점이 모두 들어오도록 맞춘다. 지역이 멀리 튈 수 있어 즉시 이동한다 */
  function fitAll(points, maxZoom) {
    if (!map || !points || !points.length) return;
    if (points.length === 1) { map.setView(points[0], maxZoom || 13, { animate: false }); return; }
    map.fitBounds(points, { padding: [48, 48], maxZoom: maxZoom || 12, animate: false });
  }

  /* 카드에 호버했을 때 해당 마커를 위로 올리고 강조한다 */
  function highlight(key, on) {
    const node = el(key);
    if (node) node.classList.toggle("is-on", on);
    if (markers[key]) markers[key].setZIndexOffset(on ? 1000 : 0);
  }

  /* 마커가 지도 가장자리에 있으면 호버 카드가 잘리므로 방향을 바꾼다.
     화면이 움직이므로 고정값이 아니라 호버할 때마다 계산한다. */
  function edgeFlip(key, latlng, pad) {
    const node = el(key);
    if (!node || !map) return;
    const pt = map.latLngToContainerPoint(latlng);
    const size = map.getSize();
    const p = pad || 118;
    node.classList.toggle("at-left", pt.x < p);
    node.classList.toggle("at-right", pt.x > size.x - p);
    node.classList.toggle("at-top", pt.y < 110);
  }

  const raw = () => map;   // 어댑터로 덮지 못한 경우에만 쓴다
  return { create, addMarker, clearMarkers, el, drawRoute, fitAll, highlight, edgeFlip, raw };
})();
