window.MapRenderer = {
    drawRoute(mapId, startPoint, places, orsFeature = null) {
      const mapEl = document.getElementById(mapId);
      if (!mapEl) return;
  
      if (mapEl._leaflet_id) mapEl._leaflet_id = null;
      mapEl.innerHTML = '';
  
      const map = L.map(mapId);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      window.__lastMap = map;
      const bounds = [];
  
      // 🟢 起点
      if (startPoint) {
        const startIcon = L.divIcon({
            className: 'start-marker',
            html: `
              <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
                transform: translateY(-10px);
              ">
                <div style="
                  background:#1e90ff;
                  color:white;
                  padding:6px 10px;
                  border-radius:14px;
                  font-weight:bold;
                  font-size:13px;
                  box-shadow:0 2px 6px rgba(0,0,0,0.3);
                ">
                  🏠 Start
                </div>
                <div style="
                  width:0;
                  height:0;
                  border-left:6px solid transparent;
                  border-right:6px solid transparent;
                  border-top:8px solid #1e90ff;
                "></div>
              </div>
            `,
            iconSize: [80, 40],
            iconAnchor: [40, 40]
          });
          
  
        L.marker([startPoint.lat, startPoint.lng], { icon: startIcon })
          .addTo(map)
          .bindPopup(`Start: ${startPoint.name}`);
  
        bounds.push([startPoint.lat, startPoint.lng]);
      }
  
      // 🔵 景点编号
      places.forEach((p, i) => {
        const icon = L.divIcon({
          className: 'num-marker',
          html: `<div style="
            background:#1e90ff;
            color:white;
            border-radius:50%;
            width:26px;
            height:26px;
            line-height:26px;
            text-align:center;
            font-weight:bold;
          ">${i + 1}</div>`
        });
  
        L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(p.name);
        bounds.push([p.lat, p.lng]);
      });
  
      // 路线
      if (orsFeature) {
        L.geoJSON(orsFeature, { style: { color: '#1e90ff', weight: 5 } }).addTo(map);
      } else {
        const line = [];
        if (startPoint) line.push([startPoint.lat, startPoint.lng]);
        places.forEach(p => line.push([p.lat, p.lng]));
        L.polyline(line, { color: '#999', dashArray: '5,5' }).addTo(map);
      }
  
      map.fitBounds(bounds, { padding: [40, 40] });
      setTimeout(() => map.invalidateSize(), 0);
    }
  };
  