// scripts/utils.js
// 兼容普通 <script> 引入方式，挂到 window.Utils 上，修复 ensureProfileShape 问题

(function () {
  const USERNAME_KEY = "username";

  function getCurrentUsername() {
    return localStorage.getItem(USERNAME_KEY) || null;
  }

  function setCurrentUsername(u) {
    if (u) localStorage.setItem(USERNAME_KEY, u);
  }

  function getUserKey(username) {
    return "user_" + username;
  }

  function ensureProfileShape(profile = {}, username = null) {
    const base = {
      username: username || profile?.username || getCurrentUsername() || "guest",
      phone: profile?.phone || "",
      prefTags: Array.isArray(profile?.prefTags) ? profile.prefTags : [],
      liked: Array.isArray(profile?.liked) ? profile.liked : [],
      homeLocation: profile?.homeLocation || null, // {lat,lng}
      history: Array.isArray(profile?.history) ? profile.history : []
    };
    // 正确合并：base 的默认值 + 传入 profile 覆盖（如果有的话）
    return Object.assign({}, base, profile, { username: base.username });
  }

  function getCurrentUserProfile() {
    const uname = getCurrentUsername();
    if (!uname) return null;
    const raw = localStorage.getItem(getUserKey(uname));
    if (!raw) return null;
    try {
      return ensureProfileShape(JSON.parse(raw), uname);
    } catch (e) {
      console.error('Failed to parse user profile in getCurrentUserProfile:', e);
      return ensureProfileShape({}, uname);
    }
  }

  function saveCurrentUserProfile(profile) {
    if (!profile) return;
    const shaped = ensureProfileShape(profile, profile.username);
    try {
      localStorage.setItem(getUserKey(shaped.username), JSON.stringify(shaped));
    } catch (e) {
      console.error('Failed to save user profile:', e);
    }
  }

  function initUserProfileIfMissing({ username, phone }) {
    setCurrentUsername(username);
    const key = getUserKey(username);
    const exist = localStorage.getItem(key);
    if (!exist) {
      saveCurrentUserProfile({ username, phone, prefTags: [], liked: [], homeLocation: null, history: [] });
    }
    return getCurrentUserProfile();
  }

  function addLike(attractionId) {
    const p = getCurrentUserProfile();
    if (!p) return null;
    if (!p.liked.includes(attractionId)) {
      p.liked.push(attractionId);
      saveCurrentUserProfile(p);
    }
    return p;
  }

  function setPrefTags(tags) {
    const p = getCurrentUserProfile();
    if (!p) return null;
    p.prefTags = Array.isArray(tags) ? tags : [];
    saveCurrentUserProfile(p);
    return p;
  }

  function setHomeLocation(loc) {
    const p = getCurrentUserProfile();
    if (!p) return null;
    p.homeLocation = loc; // {lat,lng}
    saveCurrentUserProfile(p);
    return p;
  }

  function pushHistoryRecord(record) {
    const p = getCurrentUserProfile();
    if (!p) {
      console.warn('No current user profile to push history into. Make sure user is logged in.');
      return null;
    }
    if (!Array.isArray(p.history)) p.history = [];
    p.history.push(record);
    saveCurrentUserProfile(p);
    return p;
  }

  // 挂到 window.Utils，保持向后兼容
  window.Utils = {
    getCurrentUsername,
    setCurrentUsername,
    getUserKey,
    ensureProfileShape,
    getCurrentUserProfile,
    saveCurrentUserProfile,
    initUserProfileIfMissing,
    addLike,
    setPrefTags,
    setHomeLocation,
    pushHistoryRecord
  };
})();
