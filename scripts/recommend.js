// scripts/recommend.js
// ============================================================
// 依赖：
//   attractions（scripts/attractions.js）
//   utils（scripts/utils.js）——请确保在 HTML 中先引入 utils.js
// 提供：
//   window.Reco.recommendForUser()
//   window.Reco.addTopNToMyTrip()
//   window.Reco.likeAttraction()
//   window.Reco.renderRecommendationList()
// ============================================================

(function () {
  // === 1. 接入 utils ===
  const Utils = window.Utils || {};
  const {
    getCurrentUserProfile,
    saveCurrentUserProfile,
    addLike
  } = Utils;

  // === 2. 工具函数 ===
  function normalize(v, min, max) {
    if (max === min) return 0.5;
    return (v - min) / (max - min);
  }

  function haversine(a, b) {
    const R = 6371; // 地球半径 km
    const toR = d => d * Math.PI / 180;
    const dLat = toR(b.lat - a.lat);
    const dLng = toR(b.lng - a.lng);
    const lat1 = toR(a.lat), lat2 = toR(b.lat);
    const x = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }

  function tagSimilarity(tagsA = [], tagsB = []) {
    const setA = new Set(tagsA), setB = new Set(tagsB);
    let inter = 0;
    for (const t of setA) if (setB.has(t)) inter++;
    const union = new Set([...setA, ...setB]).size || 1;
    return inter / union;
  }

  // === 3. 主推荐算法 ===
  /**
   * Recommend attractions for a given user profile.
   * @param {Object} userProfile 用户资料对象 {prefTags:[], liked:[], homeLocation:{lat,lng}}
   * @param {string|null|Array} cityOrAll 城市名、数组或 null
   * @param {Object|null} currentLocation {lat,lng}
   * @param {Object} options 权重配置
   */
  function recommendForUser(userProfile = {}, cityOrAll = null, currentLocation = null, options = {}) {
    const opts = Object.assign({ wTag: 0.45, wPop: 0.2, wDist: 0.25, wPref: 0.1 }, options);
    let pool = Array.isArray(cityOrAll)
      ? cityOrAll
      : (cityOrAll ? attractions.filter(a => a.city === cityOrAll) : attractions.slice());
    if (pool.length === 0) return [];

    const pops = pool.map(a => a.popularity || 0);
    const minP = Math.min(...pops), maxP = Math.max(...pops);
    const liked = Array.isArray(userProfile.liked) ? userProfile.liked : [];

    return pool.map(a => {
      const tagSim = tagSimilarity(userProfile.prefTags || [], a.tags || []);
      const popNorm = normalize(a.popularity || 0, minP, maxP);
      const dist = currentLocation
        ? haversine(currentLocation, { lat: a.lat, lng: a.lng })
        : 20;
      const distScore = 1 - Math.tanh(dist / 20);
      const prefMatch = liked.includes(a.id) ? 1 : 0;

      const score =
        opts.wTag * tagSim +
        opts.wPop * popNorm +
        opts.wDist * distScore +
        opts.wPref * prefMatch;

      return Object.assign({}, a, { score, distKm: dist });
    }).sort((x, y) => y.score - x.score);
  }

  // === 4. 加入行程 ===
  function addTopNToMyTrip(n = 5, city = null) {
    const profile = getCurrentUserProfile ? getCurrentUserProfile() : {};
    const recs = recommendForUser(profile, city, profile?.homeLocation).slice(0, n);

    const mapped = recs.map(r => ({
      id: r.id,
      name: r.name,
      city: r.city,
      lat: r.lat ?? r.latitude ?? (Array.isArray(r.coords) ? r.coords[1] : null),
      lng: r.lng ?? r.longitude ?? (Array.isArray(r.coords) ? r.coords[0] : null),
      image: r.image,
      durationMinutes: r.durationMinutes
    }));
    

    let myTrip = JSON.parse(localStorage.getItem('myTrip') || '[]');
    mapped.forEach(p => {
      if (!myTrip.some(x => x.id === p.id)) myTrip.push(p);
    });
    localStorage.setItem('myTrip', JSON.stringify(myTrip));
    return mapped;
  }

  // === 5. ❤️ 喜欢景点 ===
  function likeAttraction(id) {
    if (!addLike) {
      alert('❌ utils.js 未加载或未登录，无法添加收藏');
      return;
    }
    const result = addLike(id);
    if (!result) {
      alert('Please login first.');
      return;
    }
    alert('✅ Added to your favorites!');
  }

  // === 6. 渲染推荐列表 ===
  function renderRecommendationList(containerElement, recs) {
    if (!containerElement) return;
    containerElement.innerHTML = '';
    recs.forEach(r => {
      const div = document.createElement('div');
      div.className = 'rec-item';
      div.innerHTML = `
        <img src="${r.image || 'images/default.jpg'}" alt="${r.name}" 
             style="width:100%;height:120px;object-fit:cover;border-radius:8px;">
        <h4 style="margin:6px 0 4px 0;font-size:16px;">${r.name}</h4>
        <p style="margin:4px 0 8px 0;color:#666;font-size:14px;">
          Score: ${r.score.toFixed(2)} · Dist: ${r.distKm ? r.distKm.toFixed(1) : '—'} km
        </p>
        <div style="display:flex; gap:8px; padding-bottom:8px;">
          <button onclick="window.Reco.likeAttraction('${r.id}')" 
                  class="heart-button" 
                  style="background:#ff6b81;color:white;border:none;padding:5px 10px;border-radius:6px;cursor:pointer;">❤️ Like</button>
                  <button onclick="window.Trip.addToPlanById('${r.id}')"
                  class="heart-button"
                  style="background:#1e90ff;color:white;border:none;padding:5px 10px;border-radius:6px;cursor:pointer;">
                  + My Trip
                </button>
                
                  class="heart-button" 
                  style="background:#1e90ff;color:white;border:none;padding:5px 10px;border-radius:6px;cursor:pointer;">
                  + My Trip
          </button>
        </div>
      `;
      containerElement.appendChild(div);
    });
  }

  // === 7. 暴露到全局 ===
  window.Reco = {
    recommendForUser,
    addTopNToMyTrip,
    likeAttraction,
    renderRecommendationList
  };
})();
