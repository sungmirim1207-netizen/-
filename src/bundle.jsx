// --- src/components/Navbar.jsx ---
// React Navbar Component with One-Click Role Switcher & Firebase Configuration Modal

function Navbar({ activeTab, onSelectTab, onOpenFirebaseConfig }) {
  const [isFirebaseReady, setIsFirebaseReady] = React.useState(false);

  React.useEffect(() => {
    const checkStatus = () => {
      if (window.firebaseManager) {
        setIsFirebaseReady(window.firebaseManager.isReady());
      }
    };
    checkStatus();
    const timer = setInterval(checkStatus, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Info */}
          <div 
            onClick={() => onSelectTab('guest')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl ice-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <i data-lucide="snowflake" className="w-6 h-6 animate-spin-slow"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
                  KeepIn Cool
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full badge-ice">React + Firebase</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                24시 무인점포 유휴 냉동 슬롯 활용 단기 보관 중개 플랫폼
              </p>
            </div>
          </div>

          {/* Role Switcher Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold">
            <button
              onClick={() => onSelectTab('guest')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'guest'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🚀 6단계 게스트 UX
            </button>
            <button
              onClick={() => onSelectTab('kiosk')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'kiosk'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🖥️ 현장 키오스크
            </button>
            <button
              onClick={() => onSelectTab('host')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'host'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📊 점주 B2B 대시보드
            </button>
            <button
              onClick={() => onSelectTab('framework')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'framework'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📑 4단계 과제 보고서
            </button>
            <button
              onClick={() => onSelectTab('budget')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'budget'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🍽️ [참조] 예산 음식
            </button>
          </nav>

          {/* Right Status / Firebase Config Button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenFirebaseConfig}
              title="Firebase 설정 열기"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                isFirebaseReady 
                  ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isFirebaseReady ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
              <span>{isFirebaseReady ? 'Firebase Firestore 연결됨' : 'Mock 시연 모드 (즉시동작)'}</span>
              <i data-lucide="settings" className="w-3.5 h-3.5 text-slate-400 ml-1"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 px-2 py-2 overflow-x-auto text-[11px] font-bold">
        <button onClick={() => onSelectTab('guest')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'guest' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>6단계 UX</button>
        <button onClick={() => onSelectTab('kiosk')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'kiosk' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>키오스크</button>
        <button onClick={() => onSelectTab('host')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'host' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>점주 대시보드</button>
        <button onClick={() => onSelectTab('framework')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'framework' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>4단계 보고서</button>
        <button onClick={() => onSelectTab('budget')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'budget' ? 'bg-amber-600 text-white' : 'text-slate-600'}`}>예산 음식</button>
      </div>
    </header>
  );
}

window.Navbar = Navbar;


// --- src/components/KakaoStoreMap.jsx ---
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


// --- src/components/SlotPicker.jsx ---
// React Freezer Slot Picker & Strict 5-Safety Guard Agreement Component

function SlotPicker({ store, selectedSlot, onSelectSlot, onConfirmReservation }) {
  const [days, setDays] = React.useState(1);
  const [category, setCategory] = React.useState('frozen-dumpling');
  const [itemName, setItemName] = React.useState('비비고 왕교자 대용량 2봉 & 콤비네이션 피자');
  const [guardsAgreed, setGuardsAgreed] = React.useState({
    contract: true,
    sticker: true,
    insurance: true
  });

  const baseRate = 3000;
  let total = baseRate * days;
  if (days === 2) total = 5500;
  if (days === 3) total = 7500;

  const insuranceFee = 300;
  const hostRevenue = Math.round(total * 0.7);
  const platformRevenue = total - hostRevenue - insuranceFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert('이용하실 냉동 슬롯을 선택해주세요!');
      return;
    }
    if (!guardsAgreed.contract || !guardsAgreed.sticker || !guardsAgreed.insurance) {
      alert('5대 현실화 안전장치 약관에 모두 동의하셔야 안전 예약이 가능합니다.');
      return;
    }

    const bookingData = {
      id: `KIC-${Date.now().toString().slice(-4)}`,
      pin: Math.floor(100000 + Math.random() * 900000).toString(),
      storeId: store.id,
      storeName: store.name,
      slotId: selectedSlot,
      itemName: itemName.trim() || '미개봉 냉동 식품',
      itemCategory: category,
      days: days,
      fee: total,
      hostShare: hostRevenue,
      platformShare: platformRevenue,
      insuranceFee: insuranceFee,
      status: 'RESERVED',
      stickerColor: 'BLUE',
      createdAt: new Date().toLocaleString(),
      expiryAt: `2026-10-${26 + days} 21:15`
    };

    onConfirmReservation(bookingData);
  };

  const slots = store?.slots || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left 7 Cols: Slot Matrix */}
      <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <i data-lucide="grid" className="w-5 h-5 text-sky-600"></i>
              [{store.name}] 12개 냉동 슬롯 배치도
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              독립 전자식 스마트락 및 초정밀 IoT 센서가 장착된 슬롯입니다.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400"></span> 가능</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-200 border border-slate-300"></span> 보관중</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500"></span> 선택됨</span>
          </div>
        </div>

        {/* Slot Grid 4x3 */}
        <div className="grid grid-cols-4 gap-3 pt-2">
          {slots.map(slot => {
            const isSelected = slot.id === selectedSlot;
            const isOccupied = slot.status === 'occupied';

            let cellClass = "slot-available";
            if (isOccupied) cellClass = "slot-occupied";
            else if (isSelected) cellClass = "slot-reserved";

            return (
              <div
                key={slot.id}
                onClick={() => !isOccupied && onSelectSlot(slot.id)}
                className={`slot-cell ${cellClass} p-3.5`}
              >
                <div className="text-xs uppercase tracking-wider mb-1 font-bold">{slot.id}</div>
                <div className="text-xs font-normal opacity-90">
                  {isOccupied ? '보관 중' : isSelected ? '선택 완료' : '예약 가능'}
                </div>
                <div className="text-[10px] mt-1 text-slate-500 font-mono">{slot.temp}℃</div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-slate-600 flex items-center gap-2">
          <i data-lucide="info" className="w-4 h-4 text-sky-600 flex-shrink-0"></i>
          <span>선택된 슬롯: <strong className="text-sky-700">{selectedSlot || '슬롯을 클릭하세요'}</strong> (영하 18℃ 급속 동결 유지 구역)</span>
        </div>
      </div>

      {/* Right 5 Cols: Reservation Detail & 5 Safety Guards */}
      <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-200 space-y-5">
        <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
          <i data-lucide="clipboard-check" class="w-5 h-5 text-sky-600"></i>
          보관 조건 및 식품 정보
        </h3>

        {/* Duration Select */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">단기 보관 기간 (최대 3일 규정)</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  days === d 
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold text-sm shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-700 font-bold text-sm hover:border-slate-300'
                }`}
              >
                {d}일 ({d * 24}시간)<br />
                <span className="text-xs font-normal text-slate-500">
                  {d === 1 ? '3,000원' : d === 2 ? '5,500원' : '7,500원'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Food Category Strict Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">보관 품목 (미개봉 시판 공산품만 허용)</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="frozen-dumpling">미개봉 냉동 만두/피자/가공식품</option>
            <option value="sealed-mealkit">미개봉 밀키트 시판 완제품</option>
            <option value="frozen-meat">미개봉 규격 냉동육 (유통기한/성분표 인쇄품)</option>
            <option value="icecream">대용량 아이스크림·빙과 완제품</option>
          </select>
          <p className="text-[11px] text-rose-600 mt-1 font-semibold flex items-center gap-1">
            <i data-lucide="alert-circle" className="w-3.5 h-3.5"></i>
            자가제조 반찬, 개봉된 음식, 생식, 의약품은 보관이 엄격히 금지됩니다.
          </p>
        </div>

        {/* Item detail input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">식품 상세 명칭</label>
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" 
          />
        </div>

        {/* 5 Safety Guards Consent */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="font-bold text-slate-800 flex items-center gap-1.5 text-xs mb-1">
            <i data-lucide="shield" className="w-4 h-4 text-emerald-600"></i>
            '리스크 0%' 5대 현실화 안전장치 필수 동의
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={guardsAgreed.contract}
              onChange={(e) => setGuardsAgreed({ ...guardsAgreed, contract: e.target.checked })}
              className="mt-0.5 rounded text-sky-600" 
            />
            <span><strong>법적 정의:</strong> '식품 위탁'이 아닌 '전용 봉인 공간 임대차' 계약에 동의합니다.</span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={guardsAgreed.sticker}
              onChange={(e) => setGuardsAgreed({ ...guardsAgreed, sticker: e.target.checked })}
              className="mt-0.5 rounded text-sky-600" 
            />
            <span><strong>책임 입증:</strong> 항균 밀봉 봉투 + 영구 변색 온도 센서 스티커 사용을 의무화합니다.</span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={guardsAgreed.insurance}
              onChange={(e) => setGuardsAgreed({ ...guardsAgreed, insurance: e.target.checked })}
              className="mt-0.5 rounded text-sky-600" 
            />
            <span><strong>손해 배상:</strong> 단기 특약 자동 보험 (최대 10만 원 보상 캡) 연동에 동의합니다.</span>
          </label>
        </div>

        {/* Unit Economics Breakdown */}
        <div className="p-4 bg-sky-50/80 rounded-xl border border-sky-200 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>최종 결제 금액</span>
            <span className="text-base font-extrabold text-sky-900">{total.toLocaleString()}원</span>
          </div>
          <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-sky-200/60 font-medium">
            <div className="flex justify-between">
              <span>↳ 점주(호스트) 수익 분배 (70%)</span>
              <span className="font-bold text-emerald-700">{hostRevenue.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>↳ 플랫폼 운영 중개 수수료 (20%)</span>
              <span className="text-slate-700">{platformRevenue.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>↳ 단기 특약 보험 및 포장재 (10%)</span>
              <span className="text-amber-700">{insuranceFee.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button 
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl ice-gradient text-white font-extrabold text-base shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <span>냉동 슬롯 즉시 예약 및 모바일 패스 발급</span>
          <i data-lucide="arrow-right" className="w-5 h-5"></i>
        </button>

      </div>

    </div>
  );
}

window.SlotPicker = SlotPicker;


// --- src/components/MobilePassModal.jsx ---
// React Mobile Pass & Store Check-in Component (Step 2)

function MobilePassModal({ booking, onCheckIn }) {
  const [isScanning, setIsScanning] = React.useState(false);

  const handleSimulateArrival = () => {
    setIsScanning(true);
    setTimeout(() => {
      onCheckIn();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border border-slate-200 text-center space-y-6 animate-in fade-in">
      <div className="w-20 h-20 mx-auto rounded-3xl ice-gradient text-white flex items-center justify-center shadow-lg">
        <i data-lucide="store" className="w-10 h-10"></i>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Step 2. 무인 매장 방문</span>
        <h3 className="text-2xl font-black text-slate-900 mt-1">[{booking.storeName}] 매장에 도착하셨나요?</h3>
        <p className="text-sm text-slate-600 mt-2">
          발급된 모바일 패스를 매장 출입문 또는 키오스크 바코드 스캐너에 태깅해주세요.
        </p>
      </div>

      {/* Mobile Pass Card */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-sm mx-auto shadow-2xl space-y-4 text-left border border-slate-700">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>KeepIn Cool 모바일 패스</span>
          <span className="font-bold text-sky-400">배정 슬롯: [{booking.slotId}호]</span>
        </div>

        {/* QR Code Graphic */}
        <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="w-44 h-44 bg-slate-50 border-4 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-800">
            <i data-lucide="qr-code" className="w-24 h-24 text-slate-900 mb-2"></i>
            <span className="text-[11px] font-mono font-bold tracking-widest text-slate-700">{booking.id}</span>
          </div>
          <div className="mt-2 text-xs font-mono text-slate-600">
            예약 PIN 번호: <strong className="text-sky-700 font-bold text-sm">{booking.pin}</strong>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 text-center">
          {isScanning ? (
            <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5 animate-pulse">
              <i data-lucide="check-circle" className="w-4 h-4"></i> 출입문 도어락 센서 인식 완료! (도어 오픈)
            </span>
          ) : (
            <span>24시 매장 도어락 5m 이내 비대면 접근 인식 대기 중</span>
          )}
        </div>
      </div>

      <button
        onClick={handleSimulateArrival}
        disabled={isScanning}
        className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
      >
        <i data-lucide="scan" className="w-4 h-4"></i>
        <span>{isScanning ? '매장 도어 개방 중...' : '[시뮬레이션] 매장 출입문 QR 스캔 및 입장하기'}</span>
      </button>
    </div>
  );
}

window.MobilePassModal = MobilePassModal;


// --- src/components/SealingVerifier.jsx ---
// React Antibacterial Bag Sealing & Permanent Temp Sticker Verification Component (Step 3)

function SealingVerifier({ booking, onVerified }) {
  const [isPhotoUploaded, setIsPhotoUploaded] = React.useState(false);

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border border-slate-200 space-y-6 animate-in fade-in">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Step 3. 무결성 포장 및 책임 입증</span>
        <h3 className="text-2xl font-black text-slate-900 mt-1">항균 밀봉 봉투 포장 & 온도 변색 스티커</h3>
        <p className="text-sm text-slate-600 mt-2">
          매장 내 비치된 전용 봉투에 식품을 넣고 <strong>'온도 감지 변색 스티커'</strong>를 부착한 뒤 인증 사진을 업로드해주세요.
        </p>
      </div>

      {/* Safety Artifacts Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
          <div className="text-sky-700 font-bold text-sm mb-1 flex items-center gap-1.5">
            <i data-lucide="package" className="w-4 h-4"></i> ① 플랫폼 전용 항균 밀봉 봉투
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            식품 등급 이중 지퍼락 밀폐 구조로 외부 오염 및 냄새 혼입을 100% 차단합니다.
          </p>
        </div>
        <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-200">
          <div className="text-cyan-800 font-bold text-sm mb-1 flex items-center gap-1.5">
            <i data-lucide="tag" className="w-4 h-4"></i> ② 영구 변색 온도 센서 스티커
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            과실 가르기 기준: 입고 전 상함 vs 보관 중 녹음을 과학적으로 판별합니다. (정상: 파란색 유지)
          </p>
        </div>
      </div>

      {/* Upload & AI Verification Area */}
      {isPhotoUploaded ? (
        <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <i data-lucide="shield-check" className="w-8 h-8"></i>
          </div>
          <h4 className="font-bold text-emerald-900 text-base">인증 사진 AI 무결성 검증 완료!</h4>
          <p className="text-xs text-emerald-700 leading-relaxed">
            ✓ 미개봉 시판 완제품 확인됨 (유통기한/성분표 표기 확인)<br />
            ✓ 플랫폼 전용 항균 밀봉 봉투 밀폐 상태 양호<br />
            ✓ 온도 감지 변색 스티커 상태: <span className="font-bold text-sky-700">정상 동결 체인 (파란색)</span>
          </p>
          <span className="inline-block px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold">
            스티커 고유 일련번호: KIC-STK-9921
          </span>
        </div>
      ) : (
        <div 
          onClick={() => setIsPhotoUploaded(true)}
          className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-3">
            <i data-lucide="camera" className="w-7 h-7"></i>
          </div>
          <h4 className="font-bold text-slate-800 text-sm mb-1">인증 사진 촬영 및 AI 무결성 판독 시뮬레이션</h4>
          <p className="text-xs text-slate-500">클릭하시면 포장 및 스티커 상태가 즉시 판독 완료됩니다.</p>
        </div>
      )}

      {/* Next Step Button */}
      <div className="flex justify-end">
        <button
          onClick={onVerified}
          disabled={!isPhotoUploaded}
          className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>슬롯 입고 진행하기</span>
          <i data-lucide="arrow-right" className="w-4 h-4"></i>
        </button>
      </div>
    </div>
  );
}

window.SealingVerifier = SealingVerifier;


// --- src/components/SlotDepositStep.jsx ---
// React Smart Slot Deposit Component (Step 4)

function SlotDepositStep({ booking, onDeposited }) {
  const [doorStatus, setDoorStatus] = React.useState('LOCKED'); // 'LOCKED' | 'OPENING' | 'OPEN' | 'CLOSED_DETECTED'

  const handleUnlockDoor = () => {
    setDoorStatus('OPEN');
    setTimeout(() => {
      setDoorStatus('CLOSED_DETECTED');
      setTimeout(() => {
        onDeposited();
      }, 1500);
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border border-slate-200 text-center space-y-6 animate-in fade-in">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-lg">
        <i data-lucide="box" className="w-10 h-10"></i>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Step 4. 슬롯 입고</span>
        <h3 className="text-2xl font-black text-slate-900 mt-1">배정된 슬롯: [{booking.slotId}호] 냉동 보관함</h3>
        <p className="text-sm text-slate-600 mt-2">
          아래 버튼을 누르면 무인 매장 냉동고의 전자식 스마트 도어락이 자동으로 해제됩니다.
        </p>
      </div>

      {/* Visual Slot Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-md mx-auto space-y-4 shadow-xl border border-slate-800">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>슬롯 센서 온도</span>
          <span className="font-mono text-cyan-400 font-bold">-19.2 ℃</span>
        </div>

        <div className="h-32 border-2 border-dashed border-sky-400/50 rounded-xl flex items-center justify-center bg-sky-950/40">
          <div className="text-center">
            <span className="text-xs font-semibold text-sky-300">슬롯 번호: {booking.slotId}</span>
            <p className="text-lg font-black text-white mt-1">{booking.itemName}</p>
          </div>
        </div>

        <div>
          {doorStatus === 'LOCKED' && (
            <span className="text-xs text-slate-400">스마트락 상태: <strong>도어 잠김 (원격 개방 대기)</strong></span>
          )}
          {doorStatus === 'OPEN' && (
            <div className="p-3 bg-sky-500/20 border border-sky-400/40 rounded-xl text-sky-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
              <i data-lucide="unlock" className="w-4 h-4"></i> 도어 개방됨! 식품을 넣고 문을 닫아주세요.
            </div>
          )}
          {doorStatus === 'CLOSED_DETECTED' && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <i data-lucide="lock" className="w-4 h-4"></i> 도어 닫힘 및 잠금 확인 완료! 초저온 냉각 개시
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleUnlockDoor}
        disabled={doorStatus !== 'LOCKED'}
        className="px-8 py-3.5 rounded-xl ice-gradient text-white font-extrabold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
      >
        <i data-lucide="unlock" className="w-4 h-4"></i>
        <span>{doorStatus === 'LOCKED' ? `[시뮬레이션] ${booking.slotId}호 스마트 도어 원격 열기` : '슬롯 보관 진행 중...'}</span>
      </button>
    </div>
  );
}

window.SlotDepositStep = SlotDepositStep;


// --- src/components/IotTelemetryView.jsx ---
// React Real-Time IoT Telemetry View Component (Step 5)

function IotTelemetryView({ booking, onProceedCheckout }) {
  const [currentTemp, setCurrentTemp] = React.useState(-19.2);
  const [isAlert, setIsAlert] = React.useState(false);
  const [history, setHistory] = React.useState([-18.9, -19.0, -19.2, -19.1, -19.4, -19.2, -19.3, -19.2]);
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  // Chart.js initialization
  React.useEffect(() => {
    if (chartRef.current && window.Chart) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['10분전', '8분전', '6분전', '5분전', '3분전', '2분전', '1분전', '현재'],
          datasets: [{
            label: '슬롯 내부 실시간 온도 (℃)',
            data: history,
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#0284c7',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              min: -25,
              max: -5,
              grid: { color: '#f1f5f9' },
              ticks: { callback: (val) => `${val}℃` }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  // Live timer fluctuation
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (isAlert) return;
      const delta = (Math.random() * 0.4 - 0.2);
      const newTemp = parseFloat((currentTemp + delta).toFixed(1));
      setCurrentTemp(newTemp);

      setHistory(prev => {
        const next = [...prev.slice(1), newTemp];
        if (chartInstanceRef.current) {
          chartInstanceRef.current.data.datasets[0].data = next;
          chartInstanceRef.current.update('none');
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [currentTemp, isAlert]);

  const toggleAnomaly = () => {
    if (!isAlert) {
      setIsAlert(true);
      setCurrentTemp(-5.4);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.datasets[0].borderColor = '#e11d48';
        chartInstanceRef.current.update();
      }
    } else {
      setIsAlert(false);
      setCurrentTemp(-19.2);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.datasets[0].borderColor = '#0284c7';
        chartInstanceRef.current.update();
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">슬롯 내부 실시간 온도</span>
            <div className={`text-2xl font-black mt-1 font-mono ${isAlert ? 'text-rose-600' : 'text-sky-700'}`}>
              {currentTemp} ℃
            </div>
            <span className={`text-[11px] font-semibold flex items-center gap-1 mt-0.5 ${isAlert ? 'text-rose-600' : 'text-emerald-600'}`}>
              <i data-lucide={isAlert ? 'alert-triangle' : 'check'} className="w-3 h-3"></i>
              {isAlert ? '이상 고온 감지!' : '최적 급속 냉동 유지 중'}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isAlert ? 'bg-rose-100 text-rose-600' : 'bg-sky-100 text-sky-600'}`}>
            <i data-lucide="thermometer-snowflake" className="w-6 h-6"></i>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">잔여 보관 시간 (단기 보관)</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">23:44:12</div>
            <span className="text-[11px] text-slate-500 font-medium">만료: {booking.expiryAt}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <i data-lucide="clock" className="w-6 h-6"></i>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">단기 특약 보험 보장</span>
            <div className="text-2xl font-black text-amber-600 mt-1">100,000원</div>
            <span className="text-[11px] text-amber-700 font-semibold">변색 스티커 손상 시 전액 배상</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <i data-lucide="shield-alert" className="w-6 h-6"></i>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <i data-lucide="activity" className="w-5 h-5 text-sky-600"></i>
              IoT 초정밀 온도 센서 실시간 텔레메트리 (2.5초 주기 갱신)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">센서 ID: IOT-TMP-9921 / 무인매장 키오스크 게이트웨이 연동</p>
          </div>

          <button 
            onClick={toggleAnomaly}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isAlert 
                ? 'bg-emerald-600 text-white' 
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            {isAlert ? '정상 온도로 복구 시뮬레이션' : '이상 고온(-5℃) 시뮬레이션 테스트'}
          </button>
        </div>

        {isAlert && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-rose-800 text-xs leading-relaxed animate-in fade-in">
            <div className="font-bold flex items-center gap-2 mb-1 text-sm text-rose-900">
              <i data-lucide="alert-triangle" className="w-5 h-5 text-rose-600"></i>
              이상 온도 감지 알림 (-5.4℃)! 300원 단기 특약 자동 보험 프로세스 가동
            </div>
            무인 매장 점주 및 플랫폼 관제 센터에 즉시 비상 알림이 전달되었습니다. 
            만약 온도 변색 스티커가 적색으로 변색되어 식품이 손상될 경우, 현대해상 단기 특약 보험을 통해 
            <strong> 최대 10만 원 한도 내 전액 배상</strong>이 보장됩니다.
          </div>
        )}

        <div className="h-64 w-full">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onProceedCheckout}
          className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
        >
          <span>보관 완료 및 출고하기</span>
          <i data-lucide="arrow-right" className="w-4 h-4"></i>
        </button>
      </div>

    </div>
  );
}

window.IotTelemetryView = IotTelemetryView;


// --- src/components/CheckoutReceipt.jsx ---
// React Checkout & Host 70% Settlement Receipt Component (Step 6)

function CheckoutReceipt({ booking, onReset }) {
  return (
    <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border border-slate-200 space-y-6 text-center animate-in fade-in">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
        <i data-lucide="check-check" className="w-10 h-10"></i>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 6. 안전 출고 및 정산 완료</span>
        <h3 className="text-2xl font-black text-slate-900 mt-1">신선 보관이 완벽하게 완료되었습니다!</h3>
        <p className="text-sm text-slate-600 mt-2">
          영구 변색 스티커 판독 결과: <strong className="text-sky-700">파란색 (콜드체인 정상 무결성 입증)</strong>
        </p>
      </div>

      {/* Receipt Breakdown Card */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs text-left">
        <div className="flex justify-between items-center font-bold text-sm text-slate-900 border-b border-slate-200 pb-3">
          <span>이용 내역 영수증</span>
          <span>{booking.createdAt}</span>
        </div>

        <div className="space-y-2 text-slate-600">
          <div className="flex justify-between">
            <span>보관 거점 매장</span>
            <span className="font-medium text-slate-900">{booking.storeName} (슬롯 {booking.slotId}호)</span>
          </div>
          <div className="flex justify-between">
            <span>보관 품목</span>
            <span className="font-medium text-slate-900">{booking.itemName}</span>
          </div>
          <div className="flex justify-between">
            <span>보관 기간</span>
            <span className="font-medium text-slate-900">{booking.days}일 ({booking.days * 24}시간)</span>
          </div>
          <div className="flex justify-between">
            <span>평균 유지 온도</span>
            <span className="font-medium text-sky-700">-19.2 ℃ (초저온 동결)</span>
          </div>
          <div className="flex justify-between">
            <span>온도 변색 스티커 판독</span>
            <span className="font-bold text-emerald-700">✓ 이상 무 (정상 파란색 유지)</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 space-y-1.5">
          <div className="flex justify-between text-slate-800 font-bold text-sm">
            <span>게스트 결제 금액</span>
            <span>{booking.fee.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-slate-500 text-[11px]">
            <span>↳ 호스트 점주 70% 즉시 정산</span>
            <span className="text-emerald-700 font-bold">+{booking.hostShare.toLocaleString()}원 자동 입금</span>
          </div>
          <div className="flex justify-between text-slate-500 text-[11px]">
            <span>↳ 플랫폼 운영 중개 수수료 (20%)</span>
            <span>+{booking.platformShare.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-slate-500 text-[11px]">
            <span>↳ 현대해상 단기 특약 보험료 (10%)</span>
            <span>+{booking.insuranceFee.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 rounded-xl ice-gradient text-white font-extrabold text-sm shadow-md hover:opacity-95 transition-all"
      >
        새로운 냉동 슬롯 예약하기
      </button>
    </div>
  );
}

window.CheckoutReceipt = CheckoutReceipt;


// --- src/components/HostDashboard.jsx ---
// React Host (Store Manager) Dashboard Component with Revenue vs Electric Cost Chart

function HostDashboard({ store }) {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current && window.Chart) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['1주차', '2주차', '3주차', '4주차(현재)'],
          datasets: [
            {
              label: '매장 냉동고 고정 전기세 비용 (원)',
              data: [45000, 45000, 45000, 45000],
              backgroundColor: '#94a3b8'
            },
            {
              label: 'KeepIn Cool 보관료 70% 정산 수익 (원)',
              data: [68000, 92000, 105000, 113000],
              backgroundColor: '#0284c7'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v) => `${(v / 1000).toLocaleString()}천원` }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, []);

  const totalSlots = store?.totalSlots || 12;
  const availableSlots = store?.availableSlots || 4;
  const occupiedSlots = totalSlots - availableSlots;
  const utilization = Math.round((occupiedSlots / totalSlots) * 100);

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Summary */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-2">
              점주 전용 B2B 포털
            </span>
            <h2 className="text-2xl font-black text-slate-900">[{store?.name || '아이스데이 24시 신촌점'}] 점주 관리 센터</h2>
            <p className="text-xs text-slate-500 mt-1">
              24시간 상시 가동 중인 매장 냉동고의 유휴 공간으로 매달 전기세를 100% 상쇄하고 추가 순익을 만듭니다.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">이번 달 누적 정산액 (70% 쉐어)</span>
            <div className="text-3xl font-black text-sky-700 font-mono">378,000원</div>
          </div>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500">총 냉동 슬롯</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalSlots}개</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">전용 스마트 도어락 장착</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-700">현재 보관 가동률</span>
            <div className="text-2xl font-black text-emerald-800 mt-1">{occupiedSlots}개 ({utilization}%)</div>
            <span className="text-[11px] text-emerald-600 mt-0.5 block">유휴 공간 활용 중</span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="text-xs text-sky-700">전기세 상쇄 효과</span>
            <div className="text-2xl font-black text-sky-900 mt-1">100% 절감</div>
            <span className="text-[11px] text-sky-700 font-semibold mt-0.5 block">+198,000원 순수익 달성</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-xs text-purple-700">매장 상품 교차 구매율</span>
            <div className="text-2xl font-black text-purple-900 mt-1">+14.2%</div>
            <span className="text-[11px] text-purple-600 mt-0.5 block">보관 픽업 시 아이스크림 구매</span>
          </div>
        </div>
      </div>

      {/* Grid: Chart & 12-Slot Realtime Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Bar Chart */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">전기세 대비 보관 정산 수익 분석</h3>
              <p className="text-xs text-slate-500">기존에 고정 지출되던 냉동고 전기세를 보관 수수료로 상쇄</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">흑자 전환 완료</span>
          </div>
          <div className="h-64 w-full">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Right: Slot Realtime List */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg">12개 슬롯 실시간 관제 현황</h3>
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {(store?.slots || []).map((slot, idx) => (
              <div 
                key={slot.id} 
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  slot.status === 'occupied' 
                    ? 'bg-white border-slate-200' 
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div>
                  <span className="font-bold text-slate-900">{slot.id}호</span>
                  <span className="text-slate-500 ml-1.5">{slot.item || '예약 대기 빈 슬롯'}</span>
                </div>
                <div className="text-right font-mono">
                  <span className={`font-bold ${slot.status === 'occupied' ? 'text-sky-700' : 'text-emerald-700'}`}>
                    {slot.temp}℃
                  </span>
                  <span className="text-[10px] text-slate-400 block">{slot.expiry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

window.HostDashboard = HostDashboard;


// --- src/components/KioskTerminal.jsx ---
// React Store Kiosk Terminal Component (B1 Solution Partner Simulation)

function KioskTerminal() {
  const [pin, setPin] = React.useState('782941');
  const [result, setResult] = React.useState(null);

  const handleKeypad = (digit) => {
    if (digit === 'clear') {
      setPin('');
    } else if (digit === 'back') {
      setPin(prev => prev.slice(0, -1));
    } else {
      if (pin.length < 6) {
        setPin(prev => prev + digit);
      }
    }
  };

  const handleSubmitPin = () => {
    if (pin.length < 4) {
      alert('예약 PIN 번호를 입력해주세요.');
      return;
    }
    setResult({
      status: 'MATCHED',
      guestName: '자취생A 님',
      slotId: 'A-03호',
      itemName: '비비고 왕교자 & 콤비네이션 피자'
    });
  };

  const handleDoorAction = (action) => {
    if (action === 'open') {
      alert('키오스크 S/W 명령: A-03호 슬롯 스마트 도어락이 열렸습니다!');
    } else {
      alert('출고 처리가 완료되었습니다.');
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl p-6 sm:p-10 border-4 border-slate-800 shadow-2xl text-white animate-in fade-in">
      
      {/* Kiosk Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center">
            <i data-lucide="snowflake" className="w-7 h-7 text-white"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-white">KeepIn Cool 현장 무인 키오스크</h2>
            <p className="text-xs text-sky-400">신촌점 매장 솔루션 파트너(B1) 연동 단말기</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            ● 시스템 정상 가동 중
          </span>
          <p className="text-xs text-slate-400 font-mono mt-1">2026-10-26 21:15</p>
        </div>
      </div>

      {/* Screen Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left: PIN Pad */}
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            예약 PIN 번호 6자리 입력
          </label>
          <div className="p-4 rounded-2xl bg-slate-900 border-2 border-sky-500/50 text-center font-mono text-3xl font-black tracking-widest text-sky-400">
            {pin.padEnd(6, '-')}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'].map(k => (
              <button
                key={k}
                onClick={() => handleKeypad(k)}
                className={`p-4 rounded-xl text-xl font-bold transition-all ${
                  k === 'clear' 
                    ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-sm' 
                    : k === 'back' 
                    ? 'bg-slate-800 hover:bg-slate-700 text-sm' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {k === 'clear' ? '초기화' : k === 'back' ? '지우기' : k}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmitPin}
            className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-500 font-black text-base shadow-lg transition-all"
          >
            예약 정보 확인 및 슬롯 열기
          </button>
        </div>

        {/* Right: Barcode & Verification Output */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-sky-400 flex items-center gap-2">
              <i data-lucide="scan-barcode" className="w-4 h-4"></i> 모바일 패스 바코드 직접 스캔
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              키오스크 하단 바코드 스캐너에 모바일 패스를 대면 PIN 입력 없이도 즉시 자동 인식됩니다.
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-800 text-center">
              <i data-lucide="scan" className="w-8 h-8 text-sky-500 mx-auto animate-pulse"></i>
              <span className="text-[11px] text-slate-500 mt-2 block">스캐너 레이저 감지 대기 중</span>
            </div>
          </div>

          {result && (
            <div className="p-6 bg-sky-900/80 text-white rounded-2xl border border-sky-400/40 text-center shadow-xl space-y-3 animate-in fade-in">
              <div className="w-12 h-12 mx-auto rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center">
                <i data-lucide="check" className="w-6 h-6"></i>
              </div>
              <h3 className="text-lg font-bold">예약 정보 확인 완료!</h3>
              <p className="text-xs text-sky-200">
                고객: {result.guestName} / 슬롯: [{result.slotId}]<br />
                보관 물품: {result.itemName}
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => handleDoorAction('open')}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 font-bold text-xs shadow-lg flex items-center gap-2"
                >
                  <i data-lucide="unlock" className="w-4 h-4"></i> 스마트 도어 열기
                </button>
                <button
                  onClick={() => handleDoorAction('complete')}
                  className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-xs"
                >
                  출고 처리 완료
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

window.KioskTerminal = KioskTerminal;


// --- src/components/AcademicReport.jsx ---
// React Academic Report Component (과제 수행 4단계 프레임워크 슬라이드 뷰어)

function AcademicReport() {
  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
              실전 비즈니스 역량 강화 팀 과제
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              B2B 기반 단기 신선·냉동 보관 플랫폼: 'KeepIn Cool' 기획 보고서
            </h2>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p><strong>과제 요건:</strong> 과제 수행 4단계 프레임워크 100% 충족</p>
            <p><strong>구현 형태:</strong> 바이브 코딩 기반 React + Tailwind + Firebase MVP</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          본 프로젝트는 1인 가구 급증 및 고물가 대용량 구매 트렌드 속에서 미니 냉장고 냉동칸 부족 문제를 해결하기 위해, 24시 무인 매장의 유휴 냉동고를 활용하는 도심형 마이크로 콜드체인 공유 플랫폼 'KeepIn Cool'을 설계하고 바이브 코딩으로 구현한 웹 프로토타입입니다.
        </p>
      </div>

      {/* 4 Steps Container */}
      <div className="space-y-8">
        
        {/* Step 1 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center text-sm">1</span>
            <h3 className="text-xl font-black text-slate-900">1. 트렌드 분석 (Trend Analysis)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="home" className="w-4 h-4 text-sky-600"></i> 1인 가구 주거 환경의 물리적 한계
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                전체 가구의 35%를 넘어선 1인 가구의 소형 원룸 미니 냉장고는 냉동칸이 10~25L에 불과하여 대용량 식자재 저장이 물리적으로 불가능합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="shopping-cart" className="w-4 h-4 text-emerald-600"></i> 고물가 시대 '대용량·가성비 구매' 확산
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                식료품 물가 급등으로 코스트코, 트레이더스, 이커머스 공동구매 등 대용량 밀키트·냉동식품 수요가 폭증했으나 보관 공간 부족으로 구매를 포기하는 Pain Point 발생.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="zap" className="w-4 h-4 text-purple-600"></i> 24시 무인 매장의 유휴 인프라 급증
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                전국 6,000+ 무인 아이스크림 및 밀키트 매장은 24시간 냉동고를 가동하여 매달 수십만 원의 고정 전기세를 부담하지만 일부 슬롯은 상시 유휴 상태입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">2</span>
            <h3 className="text-xl font-black text-slate-900">2. 기회 포착 (Unmet Needs & Pain Points)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-3 border border-slate-200 font-bold">비교 항목</th>
                  <th className="p-3 border border-slate-200 font-bold">기존 사물함 / 택배함</th>
                  <th className="p-3 border border-slate-200 font-bold">C2C 개인 간 보관</th>
                  <th className="p-3 border border-slate-200 font-bold text-sky-700 bg-sky-50">KeepIn Cool (우리 솔루션)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-bold bg-slate-50">냉동·신선 보관 기능</td>
                  <td className="p-3 text-rose-600 font-semibold">불가 (상온 전용)</td>
                  <td className="p-3 text-slate-500">개인 냉장고에 의존</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">영하 -18℃ 이하 IoT 초정밀 제어</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-50">위생 및 법적 책임</td>
                  <td className="p-3">식품 보관 불가 약관</td>
                  <td className="p-3 text-rose-600 font-semibold">위생 사고 시 분쟁 불가피</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">항균 밀봉 + 변색 스티커 + 임대차 약관</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-50">접근성 및 보관 단위</td>
                  <td className="p-3">지하철 역사 (시간 제한)</td>
                  <td className="p-3">개인 간 시간 조율 필요</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">도보 3분 24시간 무인 매장 자유 출입</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-50">손해 배상 안전망</td>
                  <td className="p-3">식품 면책</td>
                  <td className="p-3">배상 불가</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">건당 300원 단기 특약 보험 (10만원 캡)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm">3</span>
            <h3 className="text-xl font-black text-slate-900">3. 비즈니스 모델 설계 (Business Model Architecture)</h3>
          </div>

          {/* Handwritten Diagram to Vector */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-lg space-y-4">
            <h4 className="font-bold text-sm text-sky-400 flex items-center gap-2">
              <i data-lucide="git-branch" className="w-4 h-4"></i> B2B2C 생태계 다이어그램 (B1 - B2 - B3 - C1 - C2 상호 가치 교환)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-900 text-sky-300">B1 파트너</span>
                <h5 className="font-bold text-white text-sm">키오스크·매장 솔루션 기업</h5>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>키오스크 S/W 일괄 원격 연동</li>
                  <li>매장 슬롯 제어 & IoT 센서 통신</li>
                  <li>S/W 사용료 및 결제 수수료 쉐어</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-sky-950/80 border-2 border-sky-400 space-y-2 relative">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white">B2 (우리 플랫폼)</span>
                <h5 className="font-bold text-sky-300 text-base">KeepIn Cool 플랫폼</h5>
                <p className="text-slate-200">
                  ✓ 유휴 냉동 슬롯 중개<br />
                  ✓ 실시간 IoT 콜드체인 관제<br />
                  ✓ 300원 단기 특약 보험 연동<br />
                  ✓ 점주 70% 자동 정산 시스템
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900 text-emerald-300">B3 호스트</span>
                <h5 className="font-bold text-white text-sm">24시 무인매장 점주</h5>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>남는 냉동고 슬롯 공간 제공</li>
                  <li>보관료 70% 정산 (전기세 100% 상쇄)</li>
                  <li>게스트 픽업 시 매장 상품 추가 매출</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="font-bold text-amber-300">C1 (대학가·1인 가구):</span> 단기 1~2일 건당 이용료 (1일 3,000원)
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="font-bold text-cyan-300">C2 (대용량 장보기 고객):</span> 정기 장보기용 월 구독권 모델
              </div>
            </div>
          </div>

          {/* 5 Safety Guards */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <i data-lucide="shield-check" className="w-5 h-5 text-emerald-600"></i>
              리스크 0%를 만드는 '5대 현실화 안전장치'
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">① 품목 제한</span>
                <span className="text-slate-600">미개봉 시판 공산품만 허용 (자가제조 금지)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">② 책임 입증</span>
                <span className="text-slate-600">영구 변색 온도 센서 스티커로 과실 명확화</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">③ 서비스 정의</span>
                <span className="text-slate-600">'식품 위탁'이 아닌 '전용 봉인 공간 임대차'</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">④ 손해 배상</span>
                <span className="text-slate-600">건당 300원 단기 특약 보험 (최대 10만원 캡)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">⑤ 거점 선정</span>
                <span className="text-slate-600">사업자 등록된 24시 무인 매장으로 일원화</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-extrabold flex items-center justify-center text-sm">4</span>
            <h3 className="text-xl font-black text-slate-900">4. 바이브 코딩 프로토타이핑 (Vibe Coding MVP)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            프롬프트 엔지니어링과 AI 바이브 코딩 기법을 통해 실제 사용자가 접근 가능한 React + Tailwind CSS + Firebase 기반 핵심 프로세스 페이지 및 시스템을 완전히 동작 가능한 형태로 구축하였습니다.
          </p>
        </div>

      </div>

    </div>
  );
}

window.AcademicReport = AcademicReport;


// --- src/components/BudgetFoodView.jsx ---
// React Budget-Based Food Recommendation Component (Budget Bite Module)

function BudgetFoodView() {
  const [budget, setBudget] = React.useState(10000);
  const [points, setPoints] = React.useState(3450);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const combos = [
    {
      id: 1,
      name: '한솥도시락 가성비 든든세트',
      items: '빅치킨마요 + 신라면 소컵 콤보',
      price: 5400,
      category: '픽업(포장) 배달비 0원',
      rating: 4.9,
      reviews: 142,
      location: '신촌 연세로점 (도보 4분)',
      tags: ['1인 가구', '초가성비', '직장인 점심'],
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: '싸다김밥 탄단지 충전 세트',
      items: '참치김밥 + 야채튀김 1개',
      price: 6000,
      category: '매장 식사 전용',
      rating: 4.8,
      reviews: 98,
      location: '이대역 3번 출구 (도보 2분)',
      tags: ['혼밥 추천', '단백질', '빠른식사'],
      img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: '홍대 카츠당 실속 정식',
      items: '수제 등심카츠 단품 + 미니 우동',
      price: 8900,
      category: '픽업(포장) 배달비 0원',
      rating: 4.9,
      reviews: 310,
      location: '홍대 걷고싶은거리 (도보 5분)',
      tags: ['대학생 베스트', '갓성비', '풍성한양'],
      img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      name: '역전우동 가성비 국물 조합',
      items: '옛날우동 + 매콤김말이 2개',
      price: 6500,
      category: '매장 식사 전용',
      rating: 4.7,
      reviews: 84,
      location: '신촌역 지하철 연계 (도보 1분)',
      tags: ['야식 추천', '따뜻한국물', '가성비'],
      img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      name: '샐러디 알뜰 헬스 팩',
      items: '멕시칸 치킨랩 + 제로 스파클링',
      price: 8900,
      category: '픽업(포장) 배달비 0원',
      rating: 4.8,
      reviews: 165,
      location: '연세대 정문 앞 (도보 3분)',
      tags: ['다이어트', '건강식', '바쁜직장인'],
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      name: '맘스터치 실속 버거 세트',
      items: '싸이버거 단품 + 김떡만 1개',
      price: 8200,
      category: '픽업(포장) 배달비 0원',
      rating: 4.9,
      reviews: 420,
      location: '서강대 후문 (도보 6분)',
      tags: ['치킨버거', '든든한한끼', '사이드조합'],
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=60'
    }
  ];

  const filtered = combos.filter(c => c.price <= budget);

  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setPoints(prev => prev + 500);
    alert('내돈내산 영수증 인증 성공! +500P 가 지급되었습니다.');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
            [참조 과제] 예산 중심형 음식 추천 플랫폼 (Budget Bite)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            배달비 0원! 내 예산에 딱 맞는<br />
            가성비 한 끼 꿀조합을 찾아보세요
          </h2>
          <p className="text-sm text-white/90">
            고배달비(3,000~5,000원) 시대! 배달망 리스크 없이 도보 픽업 & 매장 식사로 1만 원 안팎 최적 한 끼를 집단지성으로 추천합니다.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white text-orange-600 font-extrabold text-xs shadow hover:bg-orange-50 transition-all flex items-center gap-2"
            >
              <i data-lucide="receipt" className="w-4 h-4"></i>
              내돈내산 영수증 인증하고 +500P 받기
            </button>
            <div className="text-xs">
              내 보유 포인트: <strong className="font-black text-amber-200 text-sm">{points.toLocaleString()} P</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Filter */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-1/2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">예산 한도 슬라이더 설정:</span>
            <span className="font-black text-sky-700 text-sm">{budget.toLocaleString()}원 이하</span>
          </div>
          <input 
            type="range" 
            min="5000" 
            max="15000" 
            step="500" 
            value={budget} 
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer" 
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>5,000원 (초알뜰)</span>
            <span>10,000원 (표준)</span>
            <span>15,000원 (풍성)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-500 font-normal">정렬:</span>
          <button className="px-3 py-1.5 rounded-lg bg-sky-600 text-white">가성비 순</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">거리 순</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">평점 순</button>
        </div>
      </div>

      {/* Combos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                {item.category}
              </span>
              <span className="absolute bottom-3 right-3 bg-sky-600 text-white font-extrabold text-sm px-3 py-1 rounded-full shadow-md">
                {item.price.toLocaleString()}원
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>{item.location}</span>
                  <span className="text-amber-500 font-bold">★ {item.rating} ({item.reviews})</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">{item.name}</h4>
                <p className="text-xs text-slate-600 font-medium mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  꿀조합: {item.items}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex gap-1">
                  {item.tags.map(t => (
                    <span key={t} className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-medium">#{t}</span>
                  ))}
                </div>
                <button 
                  onClick={() => alert(`[${item.name}] 픽업 경로 및 매장 길안내가 연결되었습니다 (배달비 0원)`)}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
                >
                  주문·길찾기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Receipt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <form onSubmit={handleReceiptSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <i data-lucide="receipt" className="w-5 h-5 text-orange-500"></i>
                내돈내산 조합 등록 & 영수증 인증
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">식당 명칭</label>
                <input defaultValue="싸다김밥 이대점" className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">나만의 꿀조합 메뉴 구성</label>
                <input defaultValue="참치김밥 + 야채튀김 1개" className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">실 결제 금액 (원)</label>
                <input type="number" defaultValue="6000" className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">영수증 사진 첨부</label>
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50 cursor-pointer">
                  <i data-lucide="camera" className="w-6 h-6 text-slate-400 mx-auto mb-1"></i>
                  <span className="text-[11px] text-slate-500">영수증 업로드 (OCR 금액/메뉴 자동 검증)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">취소</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow">
                검증 제출 (+500P 적립)
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

window.BudgetFoodView = BudgetFoodView;


// --- src/components/FirebaseConfigModal.jsx ---
// React Firebase Configuration Modal Component

function FirebaseConfigModal({ isOpen, onClose }) {
  const [config, setConfig] = React.useState(() => {
    return window.firebaseManager ? window.firebaseManager.loadConfig() : {};
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (window.firebaseManager) {
      window.firebaseManager.saveConfig(config);
    }
    alert('Firebase 설정이 저장되었습니다. 페이지가 리로드됩니다.');
    window.location.reload();
  };

  const handleResetMock = () => {
    if (window.firebaseManager) {
      window.firebaseManager.saveConfig({
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      });
    }
    alert('Mock 시연 모드로 초기화되었습니다.');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <i data-lucide="database" className="w-5 h-5"></i>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Firebase Cloud 연결 설정</h3>
              <p className="text-xs text-slate-500">Cloud Firestore 및 Auth 연동 관리</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>
        </div>

        <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-800 leading-relaxed">
          💡 <strong>안내:</strong> 현재 플랫폼은 <strong>Zero-Setup Mock 듀얼 모드</strong>가 활성화되어 있어 별도 설정 없이도 모든 기능(예약, IoT 텔레메트리, 정산)이 즉시 완벽 작동합니다. 실제 Firebase 프로젝트와 실시간 연동을 원하실 경우 아래 키를 입력해주세요.
        </div>

        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">apiKey</label>
            <input 
              name="apiKey" 
              value={config.apiKey || ''} 
              onChange={handleChange}
              placeholder="AIzaSy..." 
              className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">projectId</label>
              <input 
                name="projectId" 
                value={config.projectId || ''} 
                onChange={handleChange}
                placeholder="keepin-cool-demo" 
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">authDomain</label>
              <input 
                name="authDomain" 
                value={config.authDomain || ''} 
                onChange={handleChange}
                placeholder="keepin-cool.firebaseapp.com" 
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetMock}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              Mock 모드로 리셋
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                닫기
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md"
              >
                Firebase 설정 저장
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}

window.FirebaseConfigModal = FirebaseConfigModal;


// --- src/App.jsx ---
// Master React App Component for KeepIn Cool Platform

function App() {
  const [activeTab, setActiveTab] = React.useState('guest');
  const [guestStep, setGuestStep] = React.useState(1);
  const [stores, setStores] = React.useState([]);
  const [selectedStoreId, setSelectedStoreId] = React.useState('store_shinchon_01');
  const [selectedSlot, setSelectedSlot] = React.useState('A-03');
  const [activeBooking, setActiveBooking] = React.useState(() => {
    return window.storageService.getActiveBooking() || {
      id: 'KIC-8841',
      pin: '782941',
      storeId: 'store_shinchon_01',
      storeName: '아이스데이 24시 신촌점',
      slotId: 'A-03',
      itemName: '비비고 왕교자 대용량 & 콤비네이션 피자',
      itemCategory: '미개봉 냉동 만두/피자 시판 완제품',
      days: 1,
      fee: 3000,
      hostShare: 2100,
      platformShare: 600,
      insuranceFee: 300,
      status: 'RESERVED',
      stickerColor: 'BLUE',
      createdAt: '2026.10.26 21:15',
      expiryAt: '2026.10.27 21:15'
    };
  });
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = React.useState(false);

  // Load stores on mount
  React.useEffect(() => {
    async function loadData() {
      const data = await window.storageService.getStores();
      setStores(data);
    }
    loadData();
  }, []);

  // Update Lucide icons on tab/step changes
  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  const selectedStore = stores.find(s => s.id === selectedStoreId) || stores[0] || {};

  const handleConfirmReservation = async (bookingData) => {
    const saved = await window.storageService.saveBooking(bookingData);
    setActiveBooking(saved);
    setGuestStep(2);
  };

  const handleCheckIn = () => {
    window.storageService.updateBookingStatus('CHECKED_IN');
    setGuestStep(3);
  };

  const handleSealingVerified = () => {
    window.storageService.updateBookingStatus('SEALED');
    setGuestStep(4);
  };

  const handleDeposited = () => {
    window.storageService.updateBookingStatus('DEPOSITED');
    setGuestStep(5);
  };

  const handleProceedCheckout = () => {
    window.storageService.updateBookingStatus('CHECKED_OUT');
    setGuestStep(6);
  };

  const handleResetFlow = () => {
    setGuestStep(1);
    setSelectedSlot('A-03');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        onOpenFirebaseConfig={() => setIsFirebaseModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ==================================================== */}
        {/* TAB 1: 6-STEP GUEST PROTOTYPE                        */}
        {/* ==================================================== */}
        {activeTab === 'guest' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Hero Value Proposition */}
            <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
                <i data-lucide="snowflake" className="w-72 h-72 text-white"></i>
              </div>
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/30 text-sky-200 text-xs font-bold border border-sky-400/30 mb-3">
                  <i data-lucide="shield-check" className="w-3.5 h-3.5"></i> 리스크 0% 5대 현실화 안전장치 탑재
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  원룸 냉동실이 꽉 찼을 땐?<br />
                  <span className="text-sky-300">내 집 앞 24시 무인매장</span>에 신선하게 맡기세요!
                </h1>
                <p className="mt-3 text-sm sm:text-base text-sky-100/90 leading-relaxed">
                  명절 선물 세트, 코스트코 대용량 냉동식품, 자취생 이사 당일 보관까지!<br className="hidden sm:inline" />
                  도보 3분 24시간 무인 아이스크림·밀키트 매장 유휴 냉동 슬롯을 <strong>1일 3,000원</strong>에 안심 예약하세요.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                    <i data-lucide="check" className="w-4 h-4 text-emerald-400"></i> 미개봉 시판 공산품 전용
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                    <i data-lucide="thermometer-snowflake" className="w-4 h-4 text-cyan-300"></i> 영구 변색 온도 센서 스티커
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                    <i data-lucide="umbrella" className="w-4 h-4 text-amber-300"></i> 건당 300원 단기 특약 자동 보험 (10만원 캡)
                  </span>
                </div>
              </div>
            </div>

            {/* 6-Step Visual Progress Bar */}
            <div className="glass-panel rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 text-center">
                바이브 코딩 핵심 비즈니스 프로세스 (6단계 UX 시뮬레이터)
              </h3>
              
              <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4">
                <div className="step-line"></div>
                <div 
                  className="step-line-active" 
                  style={{ width: `${((guestStep - 1) / 5) * 100}%` }}
                ></div>

                {[
                  { step: 1, label: '1. 검색·예약' },
                  { step: 2, label: '2. 매장 방문' },
                  { step: 3, label: '3. 밀봉·스티커' },
                  { step: 4, label: '4. 슬롯 입고' },
                  { step: 5, label: '5. 실시간 IoT' },
                  { step: 6, label: '6. 출고·정산' }
                ].map(item => (
                  <div 
                    key={item.step}
                    onClick={() => setGuestStep(item.step)}
                    className="flex flex-col items-center cursor-pointer group relative z-10"
                  >
                    <div className={`w-9 h-9 rounded-full font-bold flex items-center justify-center transition-all ${
                      item.step === guestStep
                        ? 'bg-sky-600 text-white ring-4 ring-sky-200 z-10 scale-110 shadow'
                        : item.step < guestStep
                        ? 'bg-emerald-500 text-white z-10'
                        : 'bg-slate-200 text-slate-500 z-10'
                    }`}>
                      {item.step}
                    </div>
                    <span className={`text-xs mt-2 ${item.step === guestStep ? 'font-bold text-slate-900' : 'font-medium text-slate-500'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 1: Map & Slot Picker */}
            {guestStep === 1 && (
              <div className="space-y-6">
                <KakaoStoreMap 
                  stores={stores} 
                  selectedStoreId={selectedStoreId} 
                  onSelectStore={setSelectedStoreId} 
                />
                <SlotPicker 
                  store={selectedStore} 
                  selectedSlot={selectedSlot} 
                  onSelectSlot={setSelectedSlot} 
                  onConfirmReservation={handleConfirmReservation}
                />
              </div>
            )}

            {/* STEP 2: Mobile Pass & QR Check-in */}
            {guestStep === 2 && (
              <MobilePassModal 
                booking={activeBooking} 
                onCheckIn={handleCheckIn} 
              />
            )}

            {/* STEP 3: Sealing & Temp Sticker Verification */}
            {guestStep === 3 && (
              <SealingVerifier 
                booking={activeBooking} 
                onVerified={handleSealingVerified} 
              />
            )}

            {/* STEP 4: Smart Slot Deposit */}
            {guestStep === 4 && (
              <SlotDepositStep 
                booking={activeBooking} 
                onDeposited={handleDeposited} 
              />
            )}

            {/* STEP 5: Live IoT Telemetry */}
            {guestStep === 5 && (
              <IotTelemetryView 
                booking={activeBooking} 
                onProceedCheckout={handleProceedCheckout} 
              />
            )}

            {/* STEP 6: Checkout Receipt */}
            {guestStep === 6 && (
              <CheckoutReceipt 
                booking={activeBooking} 
                onReset={handleResetFlow} 
              />
            )}

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PHYSICAL STORE KIOSK SIMULATOR                */}
        {/* ==================================================== */}
        {activeTab === 'kiosk' && <KioskTerminal />}

        {/* ==================================================== */}
        {/* TAB 3: HOST (STORE MANAGER) DASHBOARD                */}
        {/* ==================================================== */}
        {activeTab === 'host' && <HostDashboard store={selectedStore} />}

        {/* ==================================================== */}
        {/* TAB 4: ACADEMIC 4-STEP FRAMEWORK REPORT              */}
        {/* ==================================================== */}
        {activeTab === 'framework' && <AcademicReport />}

        {/* ==================================================== */}
        {/* TAB 5: BUDGET-BASED FOOD RECOMMENDATION (BUDGET BITE)*/}
        {/* ==================================================== */}
        {activeTab === 'budget' && <BudgetFoodView />}

      </main>

      {/* Firebase Config Modal */}
      <FirebaseConfigModal 
        isOpen={isFirebaseModalOpen} 
        onClose={() => setIsFirebaseModalOpen(false)} 
      />

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-400"></span>
            <span className="font-bold text-slate-200">KeepIn Cool (킵인쿨)</span>
            <span>| B2B 기반 단기 신선·냉동 보관 플랫폼 (React + Firebase MVP)</span>
          </div>
          <p className="text-slate-500">
            2026 비즈니스 및 기술 동향 분석 팀 프로젝트 · 바이브 코딩 MVP 프로토타입 시스템
          </p>
        </div>
      </footer>

    </div>
  );
}

// Mount React Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
