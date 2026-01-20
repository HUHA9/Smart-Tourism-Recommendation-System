window.Trip = window.Trip || {};
const Trip = window.Trip;

console.log('✅ tripEngine.js loaded');
if (!window.ORS) {
  console.warn('⚠️ ORS not loaded');
}

// ========== 添加到 MyTrip ==========
function addToPlan(place) {
  let arr = JSON.parse(localStorage.getItem('myTrip') || '[]');
  if (!arr.some(p => p.id === place.id)) {
    arr.push(place);
    localStorage.setItem('myTrip', JSON.stringify(arr));
    alert('Added to My Trip');
  } else {
    alert('Already in My Trip');
  }
}

Trip.addToPlanById = function (id) {
  const place = window.attractions.find(a => a.id === id);
  if (!place) return;

  let myTrip = JSON.parse(localStorage.getItem('myTrip') || '[]');
  if (!myTrip.some(p => p.id === place.id)) {
    myTrip.push(place);
    localStorage.setItem('myTrip', JSON.stringify(myTrip));
  }
};

// ========== 距离算法 ==========
function haversine(a, b) {
  const R = 6371;
  const toR = d => d * Math.PI / 180;
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng);
  const lat1 = toR(a.lat), lat2 = toR(b.lat);
  const x = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
//交通推荐方式
function recommendTransport(distanceKm) {
  if (distanceKm < 2) return 'walking';
  if (distanceKm < 8) return 'cycling';
  return 'driving';
}
// ===== 交通费用估算模型 =====
function estimateTransportCost(distanceKm, mode) {
    const rates = {
      walking: 0,
      cycling: 0.3,   // RM per km
      driving: 2.0    // RM per km
    };
    return +(distanceKm * (rates[mode] || 0)).toFixed(2);
  }
  // ===== 景点评分（距离 + 费用）=====
function scorePlace(place, origin) {
    const distanceKm = haversine(origin, place);
    const transport = recommendTransport(distanceKm);
    const cost = estimateTransportCost(distanceKm, transport);
  
    // 多因素评分（权重可在 report 中解释）
    const score =
      0.5 * (1 / (distanceKm + 0.1)) +
      0.5 * (1 / (cost + 0.1));
  
    return {
      ...place,
      __score: score
    };
  }
  // ===== 严格最短距离 =====
  function exactShortestPath(points, startPoint = null, returnToStart = false) {
    const perms = permute(points);
    let bestRoute = null;
    let bestDist = Infinity;
  
    for (const perm of perms) {
      let route = [];
  
      if (startPoint) route.push(startPoint);
      route = route.concat(perm);
      if (returnToStart && startPoint) route.push(startPoint);
  
      let d = totalDistance(route);
      if (d < bestDist) {
        bestDist = d;
        bestRoute = route;
      }
    }
  
    return bestRoute;
  }
  //全排列
  function permute(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of permute(rest)) {
        result.push([arr[i], ...p]);
      }
    }
    return result;
  }
  
function splitIntoDays(places, days) {
  const result = Array.from({ length: days }, () => []);
  for (let i = 0; i < places.length; i++) {
    result[i % days].push(places[i]);
  }
  return result;
}
function splitIntoDaysByDistance(places, days) {
  if (places.length <= days) {
    return places.map(p => [p]);
  }

  // 1️⃣ 全局按地理距离排序（最近邻）
  const ordered = optimizeOrder(places);

  // 2️⃣ 计算每天大致几个点
  const perDay = Math.ceil(ordered.length / days);

  const result = [];
  for (let d = 0; d < days; d++) {
    const daySlice = ordered.slice(d * perDay, (d + 1) * perDay);
    if (daySlice.length > 0) {
      result.push(daySlice);
    }
  }

  return result;
}
function haversineKm(a, b) {
  const R = 6371; // 地球半径 km
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}
//跨国路线
function haversineKm(a, b) {
    const R = 6371; // 地球半径 km
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
  
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) ** 2;
  
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  
// ========== 路线优化 ==========
function nearestNeighbor(points, startIdx = 0) {
  const n = points.length, used = Array(n).fill(false), route = [];
  let cur = startIdx;
  route.push(cur);
  used[cur] = true;

  for (let k = 1; k < n; k++) {
    let best = -1, bestD = 1e9;
    for (let i = 0; i < n; i++)
      if (!used[i]) {
        const d = haversine(points[cur], points[i]);
        if (d < bestD) { bestD = d; best = i; }
      }
    route.push(best);
    used[best] = true;
    cur = best;
  }
  return route;
}

function twoOpt(points, route) {
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < route.length - 2; i++) {
      for (let k = i + 1; k < route.length - 1; k++) {
        const a = points[route[i - 1]];
        const b = points[route[i]];
        const c = points[route[k]];
        const d = points[route[k + 1]];

        const oldDist = haversine(a, b) + haversine(c, d);
        const newDist = haversine(a, c) + haversine(b, d);

        if (newDist < oldDist) {
          const seg = route.slice(i, k + 1).reverse();
          route.splice(i, k - i + 1, ...seg);
          improved = true;
        }
      }
    }
  }
  return route;
}

function optimizeOrder(points) {
    if (points.length <= 2) return points;
  
    const origin = points[0];
  
    // ① 给每个点打分（考虑距离 + 交通费用）
    const scoredPoints = points.map(p => scorePlace(p, origin));
  
    // ② 按综合评分排序（高分优先）
    scoredPoints.sort((a, b) => b.__score - a.__score);
  
    // ③ 再用你原有的距离算法做微调优化
    const order = nearestNeighbor(scoredPoints, 0);
    const optimized = twoOpt(scoredPoints, order).map(i => scoredPoints[i]);
  
    // ④ 清理内部字段
    return optimized.map(p => {
      const { __score, ...clean } = p;
      return clean;
    });
  }
  

function renderLeafletMap(containerId, dayPlaces, orsRoute = null) {
  if (!dayPlaces || dayPlaces.length === 0) return null;

  const mapEl = document.getElementById(containerId);
  if (!mapEl) return null;

  // ✅ 关键：清除 Leaflet 旧状态（否则白屏）
  if (mapEl._leaflet_id) {
    mapEl._leaflet_id = null;
  }

  mapEl.innerHTML = "";
  mapEl.style.height = "320px";

  const map = L.map(containerId, {
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  // 用 attractions 里的真实坐标
  const placesWithCoords = dayPlaces
    .map(p => window.attractions.find(a => a.id === p.id))
    .filter(Boolean);

  if (placesWithCoords.length === 0) return null;

  const latlngs = [];

// markers 一定要留
placesWithCoords.forEach((p, i) => {
  const ll = [p.lat, p.lng];
  latlngs.push(ll);
  L.marker(ll).addTo(map).bindPopup(`${i + 1}. ${p.name}`);
});

// ✅ 如果有 ORS 路线，用真实道路
if (orsRoute && orsRoute.feature) {
  const geo = L.geoJSON(orsRoute.feature, {
    style: {
      color: '#1e90ff',
      weight: 5
    }
  }).addTo(map);

  map.fitBounds(geo.getBounds(), { padding: [40, 40] });

} else {
  // ❌ 没 ORS 才用直线（兜底）
  const line = L.polyline(latlngs, {
    color: '#999',
    dashArray: '5,5'
  }).addTo(map);

  map.fitBounds(line.getBounds(), { padding: [40, 40] });
}

  // ✅ 强制 Leaflet 重新计算尺寸
  setTimeout(() => {
    map.invalidateSize(true);
  }, 0);

  return map;
}

function totalDistance(points) {
  let s = 0;
  for (let i = 0; i < points.length - 1; i++) {
    s += haversine(points[i], points[i + 1]);
  }
  return s;
}
function estimateTime(distanceKm, transport) {
  const speeds = {
    'driving-car': 40,   // km/h
    'foot-walking': 5,
    'cycling-regular': 15
  };

  const speed = speeds[transport] || 40;
  const hours = distanceKm / speed;
  return Math.round(hours * 60); // minutes
}

// ========== 生成行程 ==========
Trip.generateItinerary = async function (options = {}) {
  const startType = document.getElementById('startType')?.value;
const startSelect = document.getElementById('startLocation');
const returnToStart = document.getElementById('returnToStart')?.checked;

let startPoint = null;

if (startSelect && startSelect.selectedOptions.length > 0) {
  const opt = startSelect.selectedOptions[0];
  startPoint = {
    name: opt.textContent,
    lat: parseFloat(opt.dataset.lat),
    lng: parseFloat(opt.dataset.lng),
    type: startType
  };
}

  const days = options.days ||
    parseInt(document.getElementById('numDays')?.value) || 1;

  const transport =
    options.transport ||
    document.getElementById('transportMode')?.value ||
    'driving-car';

  let places = JSON.parse(localStorage.getItem('myTrip') || '[]');
  places = places.map(p => {
    // ✅ 如果坐标已经是有效的，就直接用
    if (p.lat && p.lng && p.lat !== 0 && p.lng !== 0) {
      return p;
    }
  
    // 🔍 否则，从 attractions 里找完整版本
      const full =
  window.attractions.find(a => a.id === p.id) ||
  window.attractions.find(a => a.name === p.name);
  
    if (!full) {
      console.warn('❌ Cannot resolve coords for:', p.name);
      return p;
    }
  
    return full;
  });
  

// 🔧 修复：确保每个 place 都有真实 lat / lng（从 attractions 对齐）
places = places.map(p => {
  if (typeof p.lat === 'number' && typeof p.lng === 'number') {
    return p;
  }
  const full = window.attractions.find(a => a.id === p.id || a.name === p.name);
  return full || p;
});

  const dayArrays = splitIntoDaysByDistance(places, days);
  const container = document.getElementById('itinerary');
  container.innerHTML = '';

  const resultSummary = { days: [], totalDistance: 0, totalTime: 0, totalCost: 0, transport };

  for (let i = 0; i < dayArrays.length; i++) {
  const raw = dayArrays[i];
  let optimized;

if (raw.length <= 8) {
  optimized = exactShortestPath(
    raw,
    startPoint,
    returnToStart
  ).filter(p => p !== startPoint);
} else {
  // 点太多再退回 heuristic（性能保护）
  optimized = optimizeOrder(raw);
}

  const firstPlace = optimized[0];

if (returnToStart && startPoint) {
  optimized = [...optimized, startPoint];
}


   let dayCost = 0;
   let orsRoute = null;

   if (window.ORS && optimized.length >= 1 && startPoint) {
  try {
    // ① 构造 ORS 坐标数组：起点 + 景点
    let coords = [
      [startPoint.lng, startPoint.lat],
      ...optimized.map(p => [p.lng, p.lat])
    ];

    // ② 如果勾选“Return to start each day”，加回起点
    if (returnToStart) {
      coords.push([startPoint.lng, startPoint.lat]);
    }

    // ③ 调用 ORS
    orsRoute = await ORS.getRoute(coords, transport);

  } catch (e) {
    console.warn('ORS route failed, fallback to straight line', e);
  }
}


  const dayDiv = document.createElement('div');
  dayDiv.className = 'day-card';
  dayDiv.innerHTML = `
    <h3>Day ${i + 1} · ${optimized.length} places</h3>
    <div id="map_day_${i}" style="height:320px;margin-bottom:10px;"></div>
    <ul id="places_day_${i}"></ul>
  `;
  container.appendChild(dayDiv);

 MapRenderer.drawRoute(
  `map_day_${i}`,
  startPoint,
  optimized,
  orsRoute?.feature
);


  const ul = document.getElementById(`places_day_${i}`);
  optimized.forEach((p, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${idx + 1}. ${p.name}</strong> (${p.city})`;
    ul.appendChild(li);
  });

  // ===== 相邻景点 ORS 距离 & 时间 =====
const legs = [];
// ===== Start → First Place (NEW) =====
if (startPoint && firstPlace) {
  try {
    const route = await ORS.getRoute(
      [
        [startPoint.lng, startPoint.lat],
        [firstPlace.lng, firstPlace.lat]
      ],
      transport
    );

    const recommendedTransport = recommendTransport(route.distanceKm);
    const cost = estimateTransportCost(route.distanceKm, recommendedTransport);

    const distanceKm = Number(route.distanceKm);
    const durationSec = route.feature?.properties?.summary?.duration || 0;
    
    legs.push({
      from: `Start (${startPoint.name})`,
      to: firstPlace.name,
      distance: distanceKm.toFixed(2),
      time: `${Math.round(durationSec / 60)} min`,
      transport: recommendedTransport,
      cost: cost
    });
    
    // 累加到统计
    dayCost += cost;
    resultSummary.totalDistance += distanceKm;
    resultSummary.totalTime += durationSec;
    resultSummary.totalCost += cost;


  } catch (err) {
    console.warn('ORS failed: Start → First Place', err);
  }
}


for (let j = 0; j < optimized.length - 1; j++) {
    const from = optimized[j];
    const to = optimized[j + 1];
  

    const straightDistance = haversineKm(from, to);

// ===== 跨城市 / 跨国家：不用 ORS =====
if (straightDistance > 300) {   // 300km 作为 inter-city 阈值
  const transport = 'flight / train';

  const timeHours = Math.max(1, Math.round(straightDistance / 600)); 
  const cost = straightDistance * 0.25; // 简单估算（RM）

  legs.push({
    from: from.name,
    to: to.name,
    distance: straightDistance.toFixed(0),
    time: `${timeHours} h`,
    transport,
    cost
  });

  resultSummary.totalCost += cost;
  resultSummary.totalDistance += straightDistance;
  resultSummary.totalTime += timeHours * 3600;

  continue; // ⭐ 非常重要：跳过 ORS
}

    try {
      const route = await ORS.getRoute(
        [
          [from.lng, from.lat],
          [to.lng, to.lat]
        ],
        transport
      );
  
      // ① 先决定交通方式
      const recommendedTransport = recommendTransport(route.distanceKm);
  
      // ② 再计算 cost（现在 cost 才存在）
      const cost = estimateTransportCost(route.distanceKm, recommendedTransport);
  
      // ③ 累加到总费用
      resultSummary.totalCost += cost;
  
      // ④ 存到 legs
      legs.push({
        from: from.name,
        to: to.name,
        distance: route.distanceKm,
        time: route.durationText,
        transport: recommendedTransport,
        cost: cost
      });
      dayCost += cost;

    } catch (err) {
      console.warn('ORS failed:', from.name, '→', to.name, err);
    }
  }
  
  if (orsRoute) {
    resultSummary.totalDistance += parseFloat(orsRoute.distanceKm);
    resultSummary.totalTime += orsRoute.feature.properties.summary.duration;
  
    resultSummary.days.push({
      day: i + 1,
      places: optimized,
      legs,
      dayCost: dayCost
    });
  }
  
}

  container.insertAdjacentHTML('beforeend', `
    <div class="itinerary-summary">
      <h3>Summary</h3>
      <p>
      Total distance: ${resultSummary.totalDistance.toFixed(2)} km ·
      Total time: ${Math.round(resultSummary.totalTime / 60)} min ·
      Mode: ${resultSummary.transport} ·  
      Cost: RM ${resultSummary.totalCost.toFixed(2)}

    </p>
    </div>
  `);


  // ===== 更新下面的 Summary（相邻景点） =====
const bottomSummary = document.querySelector('.summary-box .summary-content');

if (bottomSummary) {
  bottomSummary.innerHTML = '';

 resultSummary.days.forEach(day => {
    day.legs.forEach(leg => {
      bottomSummary.innerHTML += `
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:14px;
          font-size:15px;
        ">
          <div style="max-width:75%">
            <strong>${leg.from} → ${leg.to}</strong><br>
            Distance: ${leg.distance} km ·
            Time: ${leg.time} ·
            Transport: ${leg.transport}
          </div>
  
          <div style="
            white-space:nowrap;
          ">
            Cost: RM ${leg.cost.toFixed(2)}
          </div>
        </div>
      `;
    });
  });  
}
bottomSummary.innerHTML += `
  <div style="
    margin-top:20px;
    text-align:right;
    font-size:16px;
  ">
    Total transport cost: RM ${resultSummary.totalCost.toFixed(2)}
  </div>
`;

window.__debugResultSummary = resultSummary;

  saveSimplifiedHistory(places, resultSummary);
};

  // ========== 历史 ==========
function saveSimplifiedHistory(places, resultSummary) {
    let hist = JSON.parse(localStorage.getItem("travelHistory") || "[]");
    hist.unshift({
      tripId: Date.now(),
      simpleRoute: places.map(p => p.name).join(" → "),
      date: new Date().toLocaleDateString(),
      summary: resultSummary
    });
    localStorage.setItem("travelHistory", JSON.stringify(hist));
    console.log("✅ Simplified history saved");
  }
  
