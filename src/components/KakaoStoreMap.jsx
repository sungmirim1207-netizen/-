// React Kakao Maps Component with Smart Interactive Fallback Engine

function KakaoStoreMap({ stores, selectedStoreId, onSelectStore }) {
  const [kakaoKey, setKakaoKey] = React.useState(() => localStorage.getItem('KAKAO_MAP_KEY') || '');
  const [isKakaoLoaded, setIsKakaoLoaded] = React.useState(false);
  const [showKeyInput, setShowKeyInput] = React.useState(false);
  const mapContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (kakaoKey && !window.kakao) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setIsKakaoLoaded(true);
        });
      };
      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
    }
  }, [kakaoKey]);

  React.useEffect(() => {
    if (isKakaoLoaded && mapContainerRef.current && window.kakao) {
      const selectedStore = stores.find(s => s.id === selectedStoreId) || stores[0];
      const options = {
        center: new window.kakao.maps.LatLng(selectedStore.lat, selectedStore.lng),
        level: 4
      };
      const map = new window.kakao.maps.Map(mapContainerRef.current, options);

      // Add Markers
      stores.forEach(store => {
        const markerPosition = new window.kakao.maps.LatLng(store.lat, store.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map
        });

        const iwContent = `
          <div style="padding:8px 12px;font-size:12px;font-weight:bold;color:#0f172a;min-width:140px;">
            ${store.name}<br>
            <span style="color:#0284c7;font-size:11px;">잔여 ${store.availableSlots}칸 | ${store.currentTemp}℃</span>
          </div>
        `;
        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          onSelectStore(store.id);
          infowindow.open(map, marker);
        });

        if (store.id === selectedStoreId) {
          infowindow.open(map, marker);
        }
      });
    }
  }, [isKakaoLoaded, selectedStoreId, stores]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    const val = e.target.keyInput.value.trim();
    localStorage.setItem('KAKAO_MAP_KEY', val);
    setKakaoKey(val);
    setShowKeyInput(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <i data-lucide="map" className="w-5 h-5 text-sky-600"></i>
            내 주변 24시 무인 거점 매장 지도 탐색
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isKakaoLoaded ? '카카오맵(Kakao Maps API) 공식 지도 구동 중' : '스마트 인터랙티브 거점 맵 구동 중 (신촌·홍대·안암 거점)'}
          </p>
        </div>

        <button 
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg font-semibold border border-sky-200 transition-colors flex items-center gap-1.5"
        >
          <i data-lucide="key" className="w-3.5 h-3.5"></i>
          <span>카카오 API 키 설정</span>
        </button>
      </div>

      {/* Key Input Modal / Drawer */}
      {showKeyInput && (
        <form onSubmit={handleSaveKey} className="p-4 bg-sky-50 rounded-xl border border-sky-200 flex gap-2">
          <input 
            name="keyInput"
            defaultValue={kakaoKey}
            placeholder="카카오 JavaScript API 키를 입력하세요" 
            className="flex-1 p-2 bg-white rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
          />
          <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-bold hover:bg-sky-500">
            적용
          </button>
        </form>
      )}

      {/* Map Display: Kakao Map or Interactive Vector Fallback */}
      {isKakaoLoaded ? (
        <div ref={mapContainerRef} className="w-full h-72 rounded-2xl border border-slate-200 shadow-inner"></div>
      ) : (
        <div className="relative w-full h-72 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-2xl p-6 border border-slate-700 overflow-hidden text-white flex flex-col justify-between shadow-inner">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
          
          <div className="relative z-10 flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              수도권 대학가 4개 거점 24시 무인 인프라 실시간 관제 중
            </span>
            <span className="text-[11px] text-slate-400 font-mono">GPS: 37.5562° N, 126.9368° E</span>
          </div>

          {/* Interactive Store Radar Nodes */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            {stores.map(store => {
              const isSelected = store.id === selectedStoreId;
              return (
                <div
                  key={store.id}
                  onClick={() => onSelectStore(store.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border backdrop-blur-md ${
                    isSelected 
                      ? 'bg-sky-600/90 border-sky-300 shadow-lg shadow-sky-500/30 scale-105' 
                      : 'bg-slate-800/70 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-sky-200 truncate">{store.name.split(' ')[1]}</span>
                    <span className="font-mono text-cyan-300 font-bold">{store.currentTemp}℃</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>잔여 {store.availableSlots}/{store.totalSlots}칸</span>
                    <span className={`w-2 h-2 rounded-full ${store.availableSlots > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 text-center">
            거점 카드를 클릭하여 매장을 선택하면 해당 매장의 냉동 슬롯 배치도가 즉시 갱신됩니다.
          </div>
        </div>
      )}
    </div>
  );
}

window.KakaoStoreMap = KakaoStoreMap;
