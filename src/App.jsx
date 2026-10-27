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
