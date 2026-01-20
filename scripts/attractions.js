// scripts/attractions.js
// ============================================================
// Global attractions data for all supported cities
// Fields: id, name, city, lat, lng, tags[], popularity, rating, durationMinutes, image
// ============================================================

const attractions = [

    // ===================== PARIS =====================
    {
      id: "paris_eiffel",
      name: "Eiffel Tower",
      city: "Paris",
      lat: 48.8584,
      lng: 2.2945,
      tags: ["landmark", "viewpoint", "romantic"],
      popularity: 9800,
      rating: 4.8,
      durationMinutes: 120,
      image: "images/bg-paris.jpg"
    },
    {
      id: "paris_louvre",
      name: "Louvre Museum",
      city: "Paris",
      lat: 48.8606,
      lng: 2.3376,
      tags: ["museum", "art", "culture"],
      popularity: 9100,
      rating: 4.7,
      durationMinutes: 180,
      image: "images/bg-paris.jpg"
    },
    {
      id: "paris_notredame",
      name: "Notre-Dame Cathedral",
      city: "Paris",
      lat: 48.852968,
      lng: 2.349902,
      tags: ["church", "architecture", "historic"],
      popularity: 8700,
      rating: 4.6,
      durationMinutes: 90,
      image: "images/bg-paris.jpg"
    },
    {
      id: "paris_champs",
      name: "Champs-Élysées",
      city: "Paris",
      lat: 48.8698,
      lng: 2.3073,
      tags: ["shopping", "street", "food"],
      popularity: 8000,
      rating: 4.5,
      durationMinutes: 60,
      image: "images/bg-paris.jpg"
    },
    {
      id: "paris_versailles",
      name: "Palace of Versailles",
      city: "Paris",
      lat: 48.8049,
      lng: 2.1204,
      tags: ["palace", "garden", "heritage"],
      popularity: 8500,
      rating: 4.8,
      durationMinutes: 180,
      image: "images/bg-paris.jpg"
    },
  
    // ===================== TOKYO =====================
    {
      id: "tokyo_shibuya",
      name: "Shibuya Crossing",
      city: "Tokyo",
      lat: 35.6595,
      lng: 139.7005,
      tags: ["city", "shopping", "nightlife"],
      popularity: 9500,
      rating: 4.7,
      durationMinutes: 60,
      image: "images/bg-tokyo.jpg"
    },
    {
      id: "tokyo_meiji",
      name: "Meiji Shrine",
      city: "Tokyo",
      lat: 35.6764,
      lng: 139.6993,
      tags: ["temple", "nature", "culture"],
      popularity: 7200,
      rating: 4.6,
      durationMinutes: 90,
      image: "images/bg-tokyo.jpg"
    },
    {
      id: "tokyo_tower",
      name: "Tokyo Tower",
      city: "Tokyo",
      lat: 35.6586,
      lng: 139.7454,
      tags: ["landmark", "viewpoint", "romantic"],
      popularity: 8300,
      rating: 4.6,
      durationMinutes: 90,
      image: "images/bg-tokyo.jpg"
    },
    {
      id: "tokyo_sensoji",
      name: "Senso-ji Temple",
      city: "Tokyo",
      lat: 35.7148,
      lng: 139.7967,
      tags: ["temple", "historic", "shopping"],
      popularity: 7800,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-tokyo.jpg"
    },
    {
      id: "tokyo_skytree",
      name: "Tokyo Skytree",
      city: "Tokyo",
      lat: 35.7101,
      lng: 139.8107,
      tags: ["tower", "viewpoint", "shopping"],
      popularity: 8900,
      rating: 4.8,
      durationMinutes: 120,
      image: "images/bg-tokyo.jpg"
    },
  
    // ===================== ROME =====================
    {
      id: "rome_colosseum",
      name: "Colosseum",
      city: "Rome",
      lat: 41.8902,
      lng: 12.4922,
      tags: ["historic", "landmark", "architecture"],
      popularity: 9400,
      rating: 4.8,
      durationMinutes: 120,
      image: "images/bg-rome.jpg"
    },
    {
      id: "rome_trevi",
      name: "Trevi Fountain",
      city: "Rome",
      lat: 41.9009,
      lng: 12.4833,
      tags: ["fountain", "romantic", "historic"],
      popularity: 8100,
      rating: 4.6,
      durationMinutes: 60,
      image: "images/bg-rome.jpg"
    },
    {
      id: "rome_pantheon",
      name: "Pantheon",
      city: "Rome",
      lat: 41.8986,
      lng: 12.4768,
      tags: ["architecture", "religious", "historic"],
      popularity: 8200,
      rating: 4.7,
      durationMinutes: 90,
      image: "images/bg-rome.jpg"
    },
    {
      id: "rome_stpeter",
      name: "St. Peter’s Basilica",
      city: "Rome",
      lat: 41.9022,
      lng: 12.4539,
      tags: ["church", "art", "heritage"],
      popularity: 9000,
      rating: 4.8,
      durationMinutes: 150,
      image: "images/bg-rome.jpg"
    },
    {
      id: "rome_forum",
      name: "Roman Forum",
      city: "Rome",
      lat: 41.8925,
      lng: 12.4853,
      tags: ["historic", "ruins", "museum"],
      popularity: 8500,
      rating: 4.6,
      durationMinutes: 120,
      image: "images/bg-rome.jpg"
    },
  
    // ===================== BEIJING =====================
    {
      id: "beijing_forbidden",
      name: "Forbidden City",
      city: "Beijing",
      lat: 39.9163,
      lng: 116.3972,
      tags: ["palace", "heritage", "museum"],
      popularity: 9400,
      rating: 4.8,
      durationMinutes: 180,
      image: "images/bg-beijing.jpg"
    },
    {
      id: "beijing_greatwall",
      name: "Great Wall of China (Badaling)",
      city: "Beijing",
      lat: 40.3560,
      lng: 116.0206,
      tags: ["historic", "mountain", "heritage"],
      popularity: 9700,
      rating: 4.9,
      durationMinutes: 240,
      image: "images/bg-beijing.jpg"
    },
    {
      id: "beijing_temple",
      name: "Temple of Heaven",
      city: "Beijing",
      lat: 39.8822,
      lng: 116.4066,
      tags: ["temple", "culture", "heritage"],
      popularity: 8000,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-beijing.jpg"
    },
    {
      id: "beijing_summer",
      name: "Summer Palace",
      city: "Beijing",
      lat: 39.9996,
      lng: 116.2755,
      tags: ["garden", "lake", "historic"],
      popularity: 8300,
      rating: 4.7,
      durationMinutes: 180,
      image: "images/bg-beijing.jpg"
    },
    {
      id: "beijing_museum",
      name: "National Museum of China",
      city: "Beijing",
      lat: 39.9041,
      lng: 116.3974,
      tags: ["museum", "history", "culture"],
      popularity: 7500,
      rating: 4.6,
      durationMinutes: 120,
      image: "images/bg-beijing.jpg"
    },
  
    // ===================== SHANGHAI =====================
    {
      id: "shanghai_bund",
      name: "The Bund",
      city: "Shanghai",
      lat: 31.2400,
      lng: 121.4900,
      tags: ["waterfront", "nightview", "architecture"],
      popularity: 9100,
      rating: 4.8,
      durationMinutes: 90,
      image: "images/bg-shanghai.jpg"
    },
    {
      id: "shanghai_pearl",
      name: "Oriental Pearl Tower",
      city: "Shanghai",
      lat: 31.2397,
      lng: 121.4998,
      tags: ["tower", "landmark", "viewpoint"],
      popularity: 8700,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-shanghai.jpg"
    },
    {
      id: "shanghai_disney",
      name: "Shanghai Disneyland",
      city: "Shanghai",
      lat: 31.1434,
      lng: 121.6580,
      tags: ["themepark", "family", "fun"],
      popularity: 9400,
      rating: 4.8,
      durationMinutes: 360,
      image: "images/bg-shanghai.jpg"
    },
    {
      id: "shanghai_yugarden",
      name: "Yu Garden",
      city: "Shanghai",
      lat: 31.2271,
      lng: 121.4929,
      tags: ["garden", "historic", "shopping"],
      popularity: 7800,
      rating: 4.6,
      durationMinutes: 90,
      image: "images/bg-shanghai.jpg"
    },
    {
      id: "shanghai_nanjing",
      name: "Nanjing Road",
      city: "Shanghai",
      lat: 31.2351,
      lng: 121.4731,
      tags: ["shopping", "street", "nightlife"],
      popularity: 8600,
      rating: 4.6,
      durationMinutes: 120,
      image: "images/bg-shanghai.jpg"
    },
  
    // ===================== XIAN =====================
    {
      id: "xian_terracotta",
      name: "Terracotta Army",
      city: "Xi’an",
      lat: 34.3853,
      lng: 109.2788,
      tags: ["historic", "museum", "heritage"],
      popularity: 9500,
      rating: 4.9,
      durationMinutes: 180,
      image: "images/bg-xian.jpg"
    },
    {
      id: "xian_pagoda",
      name: "Giant Wild Goose Pagoda",
      city: "Xi’an",
      lat: 34.2219,
      lng: 108.9699,
      tags: ["temple", "historic", "religious"],
      popularity: 8200,
      rating: 4.6,
      durationMinutes: 90,
      image: "images/bg-xian.jpg"
    },
    {
      id: "xian_everbright",
      name: "Datang Everbright City",
      city: "Xi’an",
      lat: 34.2149,
      lng: 108.9756,
      tags: ["shopping", "culture", "nightlife"],
      popularity: 7800,
      rating: 4.5,
      durationMinutes: 120,
      image: "images/bg-xian.jpg"
    },
    {
      id: "xian_wall",
      name: "Ancient City Wall",
      city: "Xi’an",
      lat: 34.2658,
      lng: 108.9500,
      tags: ["historic", "wall", "viewpoint"],
      popularity: 8500,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-xian.jpg"
    },
    {
      id: "xian_belltower",
      name: "Bell Tower of Xi’an",
      city: "Xi’an",
      lat: 34.2600,
      lng: 108.9480,
      tags: ["landmark", "culture", "historic"],
      popularity: 8300,
      rating: 4.6,
      durationMinutes: 60,
      image: "images/bg-xian.jpg"
    },
  
    // ===================== KUALA LUMPUR =====================
    {
      id: "kl_petronas",
      name: "Petronas Twin Towers",
      city: "Kuala Lumpur",
      lat: 3.1579,
      lng: 101.7123,
      tags: ["landmark", "shopping", "skyline"],
      popularity: 9250,
      rating: 4.7,
      durationMinutes: 90,
      image: "images/bg-kualalumpur.jpg"
    },
    {
      id: "kl_merdeka",
      name: "Merdeka Square",
      city: "Kuala Lumpur",
      lat: 3.1497,
      lng: 101.6932,
      tags: ["historic", "monument", "heritage"],
      popularity: 7500,
      rating: 4.5,
      durationMinutes: 60,
      image: "images/bg-kualalumpur.jpg"
    },
    {
      id: "kl_petaling",
      name: "Petaling Street",
      city: "Kuala Lumpur",
      lat: 3.1446,
      lng: 101.6980,
      tags: ["shopping", "food", "culture"],
      popularity: 8000,
      rating: 4.5,
      durationMinutes: 120,
      image: "images/bg-kualalumpur.jpg"
    },
    {
      id: "kl_batu",
      name: "Batu Caves",
      city: "Kuala Lumpur",
      lat: 3.2379,
      lng: 101.6841,
      tags: ["temple", "nature", "religious"],
      popularity: 8500,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-kualalumpur.jpg"
    },
    {
      id: "kl_bintang",
      name: "Bukit Bintang",
      city: "Kuala Lumpur",
      lat: 3.1466,
      lng: 101.7115,
      tags: ["shopping", "nightlife", "food"],
      popularity: 8700,
      rating: 4.6,
      durationMinutes: 120,
      image: "images/bg-kualalumpur.jpg"
    },
  
    // ===================== PENANG =====================
    {
      id: "penang_george",
      name: "George Town Street Art",
      city: "Penang",
      lat: 5.4164,
      lng: 100.3327,
      tags: ["art", "culture", "street"],
      popularity: 6100,
      rating: 4.5,
      durationMinutes: 90,
      image: "images/bg-penang.jpg"
    },
    {
      id: "penang_hill",
      name: "Penang Hill",
      city: "Penang",
      lat: 5.4141,
      lng: 100.2760,
      tags: ["nature", "viewpoint", "hiking"],
      popularity: 6900,
      rating: 4.6,
      durationMinutes: 150,
      image: "images/bg-penang.jpg"
    },
    {
      id: "penang_kekloksi",
      name: "Kek Lok Si Temple",
      city: "Penang",
      lat: 5.3959,
      lng: 100.2726,
      tags: ["temple", "heritage", "religious"],
      popularity: 6700,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-penang.jpg"
    },
    {
      id: "penang_mansion",
      name: "Penang Peranakan Mansion",
      city: "Penang",
      lat: 5.4193,
      lng: 100.3378,
      tags: ["museum", "heritage", "culture"],
      popularity: 6400,
      rating: 4.6,
      durationMinutes: 90,
      image: "images/bg-penang.jpg"
    },
    {
      id: "penang_gurney",
      name: "Gurney Drive",
      city: "Penang",
      lat: 5.4402,
      lng: 100.3092,
      tags: ["food", "seaside", "shopping"],
      popularity: 7000,
      rating: 4.5,
      durationMinutes: 120,
      image: "images/bg-penang.jpg"
    },
  
    // ===================== LANGKAWI =====================
    {
      id: "langkawi_skybridge",
      name: "Langkawi Sky Bridge",
      city: "Langkawi",
      lat: 6.3633,
      lng: 99.6710,
      tags: ["bridge", "nature", "viewpoint"],
      popularity: 7100,
      rating: 4.7,
      durationMinutes: 120,
      image: "images/bg-langkawi.jpg"
    },
    {
        id: "langkawi_pantai",
        name: "Pantai Cenang",
        city: "Langkawi",
        lat: 6.2928,
        lng: 99.7286,
        tags: ["beach", "relax", "food"],
        popularity: 6800,
        rating: 4.6,
        durationMinutes: 150,
        image: "images/bg-langkawi.jpg"
      },
      {
        id: "langkawi_mangrove",
        name: "Mangrove Forest (Kilim Geoforest Park)",
        city: "Langkawi",
        lat: 6.4150,
        lng: 99.8510,
        tags: ["nature", "boat", "wildlife"],
        popularity: 6500,
        rating: 4.6,
        durationMinutes: 180,
        image: "images/bg-langkawi.jpg"
      },
      {
        id: "langkawi_eagle",
        name: "Eagle Square",
        city: "Langkawi",
        lat: 6.3138,
        lng: 99.8532,
        tags: ["landmark", "photo", "waterfront"],
        popularity: 7000,
        rating: 4.7,
        durationMinutes: 60,
        image: "images/bg-langkawi.jpg"
      },
      {
        id: "langkawi_tujuh",
        name: "Telaga Tujuh Waterfalls",
        city: "Langkawi",
        lat: 6.3813,
        lng: 99.6713,
        tags: ["waterfall", "hiking", "nature"],
        popularity: 6600,
        rating: 4.5,
        durationMinutes: 120,
        image: "images/bg-langkawi.jpg"
      }
    ];
    
    // ============================================================
    // Export for use in other modules
    // ============================================================
    
    window.attractions = attractions;
    