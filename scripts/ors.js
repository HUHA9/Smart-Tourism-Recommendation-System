// scripts/ors.js
// Wrapper for OpenRouteService Directions API with distance + duration
// Usage: const route = await ORS.getRoute([[lng,lat],[lng,lat]], 'driving-car');

const ORS = {
  ORS_API_KEY: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjFhMDg5Y2JmYjBmZjQwMGFhYjgyOTYxYzVmYWIwMWY3IiwiaCI6Im11cm11cjY0In0=',  
  async getRoute(coordsArray, profile = 'driving-car') {
    if (profile === 'driving') profile = 'driving-car';
    if (profile === 'walking') profile = 'foot-walking';
    if (profile === 'cycling') profile = 'cycling-regular';
    
    if (!this.ORS_API_KEY) {
      throw new Error('ORS key missing. Please set ORS.ORS_API_KEY');
    }

    const url = `https://api.openrouteservice.org/v2/directions/${profile}/geojson`;
    const body = { coordinates: coordsArray };

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.ORS_API_KEY
      },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error('ORS request failed: ' + txt);
    }

    const data = await resp.json();
    const feature = data.features?.[0];
    if (!feature) return null;

    const summary = feature.properties?.summary;
    const distanceM = summary?.distance ?? 0;
    const durationS = summary?.duration ?? 0;

    return {
      feature,                 // 原始路线 GeoJSON，用于在地图上画线
      distanceKm: (distanceM / 1000).toFixed(2),  // 公里
      durationText: this._formatDuration(durationS) // 格式化后的人类可读时间
    };
  },

  // helper to format seconds → "X小时 Y分钟"
  _formatDuration(seconds) {
    seconds = Math.round(seconds);
  
    if (seconds < 60) return `${seconds} seconds`;
  
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} minutes`;
  
    const hours = Math.floor(mins / 60);
    const rem = mins % 60;
    return `${hours} hours ${rem} minutes`;
  }  
};

window.ORS = ORS;
