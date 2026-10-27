// KeepIn Cool & Vibe Coding MVP Application Logic

// Initial Mock State
const state = {
  activeTab: 'guest',
  guestStep: 1,
  selectedStoreId: 1,
  selectedSlot: 'A-03',
  bookingDays: 1,
  selectedCategory: 'frozen-dumpling',
  insuranceAgreed: true,
  strictRuleAgreed: true,
  
  // Stores Data
  stores: [
    {
      id: 1,
      name: '아이스데이 24시 신촌점',
      address: '서울 서대문구 신촌로 12 (연세대·신촌역 도보 3분)',
      type: '무인 아이스크림·냉동식품점',
      totalSlots: 12,
      availableSlots: 4,
      currentTemp: -19.2,
      slots: [
        { id: 'A-01', status: 'occupied', temp: -19.4, expiry: '14시간 남음' },
        { id: 'A-02', status: 'occupied', temp: -19.1, expiry: '6시간 남음' },
        { id: 'A-03', status: 'available', temp: -19.2, expiry: '즉시 이용 가능' },
        { id: 'A-04', status: 'available', temp: -19.3, expiry: '즉시 이용 가능' },
        { id: 'B-01', status: 'occupied', temp: -19.0, expiry: '1일 남음' },
        { id: 'B-02', status: 'occupied', temp: -18.9, expiry: '18시간 남음' },
        { id: 'B-03', status: 'available', temp: -19.5, expiry: '즉시 이용 가능' },
        { id: 'B-04', status: 'available', temp: -19.2, expiry: '즉시 이용 가능' },
        { id: 'C-01', status: 'occupied', temp: -18.8, expiry: '2일 남음' },
        { id: 'C-02', status: 'occupied', temp: -19.2, expiry: '8시간 남음' },
        { id: 'C-03', status: 'occupied', temp: -19.0, expiry: '12시간 남음' },
        { id: 'C-04', status: 'occupied', temp: -18.7, expiry: '4시간 남음' },
      ]
    },
    {
      id: 2,
      name: '달콤아이스 홍대입구점',
      address: '서울 마포구 와우산로 88 (홍대 정문 앞 도보 5분)',
      type: '24시 무인 스낵·빙과점',
      totalSlots: 8,
      availableSlots: 2,
      currentTemp: -18.8,
      slots: [
        { id: 'A-01', status: 'occupied', temp: -18.9, expiry: '16시간 남음' },
        { id: 'A-02', status: 'available', temp: -18.8, expiry: '즉시 이용 가능' },
        { id: 'A-03', status: 'occupied', temp: -19.1, expiry: '1일 남음' },
        { id: 'A-04', status: 'occupied', temp: -18.7, expiry: '9시간 남음' },
        { id: 'B-01', status: 'occupied', temp: -18.8, expiry: '22시간 남음' },
        { id: 'B-02', status: 'available', temp: -18.8, expiry: '즉시 이용 가능' },
        { id: 'B-03', status: 'occupied', temp: -19.0, expiry: '14시간 남음' },
        { id: 'B-04', status: 'occupied', temp: -18.6, expiry: '5시간 남음' },
      ]
    },
    {
      id: 3,
      name: '올데이 밀키트 24 안암점',
      address: '서울 성북구 고려대로 45 (고려대 안암역 도보 4분)',
      type: '24시 스마트 밀키트 편의점',
      totalSlots: 16,
      availableSlots: 6,
      currentTemp: -19.8,
      slots: []
    },
    {
      id: 4,
      name: '착한마켓 대학로점',
      address: '서울 종로구 대학로 102 (혜화역 도보 7분)',
      type: '동네 중소형 스마트 마트',
      totalSlots: 10,
      availableSlots: 5,
      currentTemp: -18.4,
      slots: []
    }
  ],

  // Active Booking Simulation
  activeReservation: {
    pin: '7829-41',
    qrCode: 'KIC-2026-X8841',
    storeName: '아이스데이 24시 신촌점',
    slotId: 'A-03',
    itemName: '비비고 왕교자 대용량 & 치즈피자 2판',
    itemCategory: '미개봉 냉동 만두/피자 시판 완제품',
    depositTime: '2026-10-26 21:15',
    expiryTime: '2026-10-27 21:15 (24시간 보관)',
    tempSensorId: 'IOT-TMP-9921',
    currentTemp: -19.2,
    stickerColor: 'BLUE (정상 동결 체인)',
    fee: 3000,
    insurance: 300,
    hostShare: 2100,
    platformShare: 600,
    status: 'DEPOSITED'
  },

  // IoT Simulation
  iotTempHistory: [-18.9, -19.0, -19.2, -19.1, -19.4, -19.2, -19.3, -19.2],
  iotLabels: ['10분전', '8분전', '6분전', '5분전', '3분전', '2분전', '1분전', '현재'],
  isTempAlert: false,

  // Budget Platform Mock Data
  budgetFilter: 10000,
  userPoints: 3450,
  budgetCombos: [
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
  ]
};

// Main DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderStoreSelection();
  renderSlotGrid();
  renderPricingSummary();
  initIotChart();
  initHostRevenueChart();
  renderBudgetCombos();
  startLiveIotSimulation();
  
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Tab Switching
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.nav-tab').forEach(t => {
    if (t.getAttribute('data-tab') === tabId) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  const sections = ['guest', 'kiosk', 'host', 'framework', 'budget'];
  sections.forEach(s => {
    const el = document.getElementById(`section-${s}`);
    if (el) {
      if (s === tabId) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  if (tabId === 'host') {
    renderHostDashboard();
  }
}

// 6-Step Guest Flow Navigator
function setGuestStep(step) {
  state.guestStep = step;
  
  // Update Step Indicators
  for (let i = 1; i <= 6; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    const check = document.getElementById(`step-check-${i}`);
    if (indicator) {
      if (i === step) {
        indicator.className = 'w-9 h-9 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center ring-4 ring-sky-200 z-10 transition-all';
      } else if (i < step) {
        indicator.className = 'w-9 h-9 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center z-10 transition-all';
      } else {
        indicator.className = 'w-9 h-9 rounded-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center z-10 transition-all';
      }
    }
  }

  // Update Progress Line
  const progressLine = document.getElementById('step-progress-line');
  if (progressLine) {
    progressLine.style.width = `${((step - 1) / 5) * 100}%`;
  }

  // Show/Hide Step Content
  for (let i = 1; i <= 6; i++) {
    const content = document.getElementById(`guest-step-content-${i}`);
    if (content) {
      if (i === step) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    }
  }

  // Re-trigger icons if needed
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Step 1: Store & Slot Selection
function renderStoreSelection() {
  const storeListEl = document.getElementById('store-selection-list');
  if (!storeListEl) return;

  storeListEl.innerHTML = state.stores.map(store => `
    <div onclick="selectStore(${store.id})" class="p-4 rounded-xl border cursor-pointer transition-all ${state.selectedStoreId === store.id ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-1 ring-sky-400' : 'border-slate-200 bg-white hover:border-slate-300'}">
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-700 mb-1">${store.type}</span>
          <h4 class="font-bold text-slate-900 text-base">${store.name}</h4>
          <p class="text-xs text-slate-500 mt-1">${store.address}</p>
        </div>
        <div class="text-right">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${store.availableSlots > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
            잔여 ${store.availableSlots}/${store.totalSlots}칸
          </span>
          <div class="text-xs text-slate-600 mt-2 font-medium flex items-center justify-end gap-1">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            현재 ${store.currentTemp}℃
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function selectStore(storeId) {
  state.selectedStoreId = storeId;
  renderStoreSelection();
  renderSlotGrid();
  updateReservationStoreName();
}

function updateReservationStoreName() {
  const current = state.stores.find(s => s.id === state.selectedStoreId);
  if (current) {
    state.activeReservation.storeName = current.name;
    const storeLabel = document.getElementById('summary-store-name');
    if (storeLabel) storeLabel.innerText = current.name;
  }
}

function renderSlotGrid() {
  const gridEl = document.getElementById('freezer-slot-grid');
  if (!gridEl) return;

  const currentStore = state.stores.find(s => s.id === state.selectedStoreId);
  if (!currentStore || !currentStore.slots || currentStore.slots.length === 0) {
    gridEl.innerHTML = `
      <div class="col-span-4 p-8 text-center text-slate-400">
        해당 매장의 슬롯 현황을 불러오는 중입니다...
      </div>
    `;
    return;
  }

  gridEl.innerHTML = currentStore.slots.map(slot => {
    let statusClass = 'slot-available';
    let statusText = '예약 가능';
    let clickHandler = `onclick="selectSlot('${slot.id}')"`;

    if (slot.status === 'occupied') {
      statusClass = 'slot-occupied';
      statusText = '보관 중';
      clickHandler = '';
    } else if (slot.id === state.selectedSlot) {
      statusClass = 'slot-reserved';
      statusText = '선택됨';
    }

    return `
      <div ${clickHandler} class="slot-cell ${statusClass} p-3">
        <div class="text-xs uppercase tracking-wider mb-1">${slot.id}</div>
        <div class="text-xs font-normal opacity-90">${statusText}</div>
        <div class="text-[10px] mt-1 text-slate-500 font-mono">${slot.temp}℃</div>
      </div>
    `;
  }).join('');
}

function selectSlot(slotId) {
  state.selectedSlot = slotId;
  state.activeReservation.slotId = slotId;
  renderSlotGrid();
  renderPricingSummary();
}

function setBookingDays(days) {
  state.bookingDays = days;
  renderPricingSummary();
}

function setFoodCategory(cat, name) {
  state.selectedCategory = cat;
  state.activeReservation.itemCategory = cat;
  state.activeReservation.itemName = name;
  renderPricingSummary();
}

function renderPricingSummary() {
  const baseRate = 3000;
  let total = baseRate * state.bookingDays;
  if (state.bookingDays === 2) total = 5500;
  if (state.bookingDays === 3) total = 7500;

  const insuranceFee = 300;
  const hostRevenue = Math.round(total * 0.7);
  const platformRevenue = total - hostRevenue - insuranceFee;

  state.activeReservation.fee = total;
  state.activeReservation.hostShare = hostRevenue;
  state.activeReservation.platformShare = platformRevenue;

  const totalEl = document.getElementById('price-total-amount');
  const hostEl = document.getElementById('price-host-amount');
  const platformEl = document.getElementById('price-platform-amount');
  const insuranceEl = document.getElementById('price-insurance-amount');

  if (totalEl) totalEl.innerText = `${total.toLocaleString()}원`;
  if (hostEl) hostEl.innerText = `${hostRevenue.toLocaleString()}원 (점주 70% 정산)`;
  if (platformEl) platformEl.innerText = `${platformRevenue.toLocaleString()}원 (플랫폼 중개)`;
  if (insuranceEl) insuranceEl.innerText = `${insuranceFee.toLocaleString()}원 (자동 특약 보험)`;
}

// Complete Step 1 and proceed to Step 2
function confirmReservation() {
  const itemInput = document.getElementById('food-detail-input');
  if (itemInput && itemInput.value.trim() !== '') {
    state.activeReservation.itemName = itemInput.value.trim();
  }

  // Advance to Step 2 (Store Visit)
  setGuestStep(2);
  showToast('예약이 성공적으로 완료되었습니다! 매장 방문 QR이 발급되었습니다.');
}

// Step 2: Store Check-in Simulation
function simulateStoreArrival() {
  const checkinStatusEl = document.getElementById('checkin-progress-badge');
  if (checkinStatusEl) {
    checkinStatusEl.innerHTML = `<span class="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
      <i data-lucide="check-circle" class="w-4 h-4"></i> 매장 문 앞 감지 완료 (도어 개방)
    </span>`;
  }

  setTimeout(() => {
    setGuestStep(3);
    showToast('매장 입장이 확인되었습니다. 항균 밀봉 봉투와 온도 스티커를 준비해주세요.');
  }, 1200);
}

// Step 3: Sealing & Temperature Sticker Verification
function simulatePhotoUpload() {
  const uploadArea = document.getElementById('photo-upload-container');
  if (!uploadArea) return;

  uploadArea.innerHTML = `
    <div class="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-center">
      <div class="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
        <i data-lucide="shield-check" class="w-8 h-8"></i>
      </div>
      <h4 class="font-bold text-emerald-900 text-base mb-1">인증 사진 AI 무결성 검증 완료!</h4>
      <p class="text-xs text-emerald-700 mb-3">
        ✓ 미개봉 시판 완제품 확인됨 (유통기한/원재료 표기 식별)<br>
        ✓ 플랫폼 전용 항균 밀봉 봉투 밀폐 완료<br>
        ✓ 온도 감지 변색 스티커 상태: <span class="font-bold text-sky-700">정상 동결 체인 (파란색)</span>
      </p>
      <div class="inline-block px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold">
        변색 스티커 일련번호: KIC-STK-2026-9921
      </div>
    </div>
  `;

  document.getElementById('btn-step3-next').disabled = false;
  document.getElementById('btn-step3-next').classList.remove('opacity-50', 'cursor-not-allowed');

  if (window.lucide) lucide.createIcons();
  showToast('밀봉 및 변색 스티커 검증이 완료되었습니다.');
}

// Step 4: Slot Deposit Simulation
function unlockSlotDoor() {
  const unlockBtn = document.getElementById('btn-unlock-door');
  const doorStatus = document.getElementById('slot-door-status');

  if (unlockBtn) unlockBtn.disabled = true;
  if (doorStatus) {
    doorStatus.innerHTML = `
      <div class="p-4 bg-sky-50 border border-sky-300 rounded-xl text-center">
        <div class="text-sky-600 font-bold flex items-center justify-center gap-2 mb-1">
          <i data-lucide="unlock" class="w-5 h-5 animate-bounce"></i>
          스마트 락 해제됨! 슬롯 [${state.selectedSlot}] 도어가 열렸습니다.
        </div>
        <p class="text-xs text-slate-600">식품을 넣고 문을 닫아주세요. (센서 자동 감지 중...)</p>
      </div>
    `;
  }

  setTimeout(() => {
    if (doorStatus) {
      doorStatus.innerHTML = `
        <div class="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center">
          <div class="text-emerald-700 font-bold flex items-center justify-center gap-2 mb-1">
            <i data-lucide="lock" class="w-5 h-5"></i>
            도어 닫힘 및 잠금 확인 완료! 초저온 냉동 순환 개시 (-19.2℃)
          </div>
          <p class="text-xs text-emerald-600 font-medium">안전 보관이 시작되었습니다. 실시간 IoT 관제 화면으로 이동합니다.</p>
        </div>
      `;
    }

    setTimeout(() => {
      setGuestStep(5);
      showToast('슬롯 입고가 완료되어 실시간 IoT 관제가 시작되었습니다.');
    }, 1500);
  }, 2500);

  if (window.lucide) lucide.createIcons();
}

// Step 5: IoT Chart & Simulation
let iotChartInstance = null;

function initIotChart() {
  const ctx = document.getElementById('iotTempChart');
  if (!ctx) return;

  iotChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: state.iotLabels,
      datasets: [{
        label: '슬롯 내부 실시간 온도 (℃)',
        data: state.iotTempHistory,
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
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y.toFixed(1)} ℃ (안심 냉동)`
          }
        }
      },
      scales: {
        y: {
          min: -25,
          max: -10,
          grid: { color: '#f1f5f9' },
          ticks: {
            callback: (val) => `${val}℃`
          }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function startLiveIotSimulation() {
  setInterval(() => {
    if (state.isTempAlert) return;

    // Small realistic fluctuation around -19.2 C
    const delta = (Math.random() * 0.4 - 0.2);
    const newTemp = parseFloat((state.activeReservation.currentTemp + delta).toFixed(1));
    state.activeReservation.currentTemp = newTemp;

    const tempDisplay = document.getElementById('live-temp-value');
    if (tempDisplay) {
      tempDisplay.innerText = `${newTemp} ℃`;
    }

    if (iotChartInstance) {
      state.iotTempHistory.shift();
      state.iotTempHistory.push(newTemp);
      iotChartInstance.update('none');
    }
  }, 2500);
}

function toggleTempAnomalySimulation() {
  state.isTempAlert = !state.isTempAlert;
  const alertContainer = document.getElementById('iot-anomaly-alert');
  const tempDisplay = document.getElementById('live-temp-value');
  const btnAnomaly = document.getElementById('btn-anomaly-sim');

  if (state.isTempAlert) {
    state.activeReservation.currentTemp = -5.4;
    if (tempDisplay) tempDisplay.innerText = `-5.4 ℃ (경고)`;
    if (alertContainer) {
      alertContainer.classList.remove('hidden');
      alertContainer.innerHTML = `
        <div class="p-4 bg-rose-50 border border-rose-300 rounded-xl text-rose-800">
          <div class="flex items-center gap-2 font-bold mb-1">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-rose-600"></i>
            이상 온도 감지 알림 (-5.4℃)! 300원 단기 특약 보험 프로세스 가동
          </div>
          <p class="text-xs text-rose-700 leading-relaxed">
            무인 매장 점주 및 플랫폼 관제 센터에 즉시 긴급 출동 알림이 전송되었습니다. 
            만약 온도 변색 스티커가 적색으로 변색되어 식품이 손상될 경우, 현대해상 단기 특약 보험을 통해 
            <strong>최대 10만 원 한도 내 전액 배상</strong>이 보장됩니다.
          </p>
        </div>
      `;
    }
    if (btnAnomaly) {
      btnAnomaly.innerText = '정상 온도로 복구 시뮬레이션';
      btnAnomaly.className = 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white';
    }
  } else {
    state.activeReservation.currentTemp = -19.2;
    if (tempDisplay) tempDisplay.innerText = `-19.2 ℃`;
    if (alertContainer) alertContainer.classList.add('hidden');
    if (btnAnomaly) {
      btnAnomaly.innerText = '이상 고온(-5℃) 시뮬레이션 테스트';
      btnAnomaly.className = 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100';
    }
  }

  if (window.lucide) lucide.createIcons();
}

// Step 6: Checkout & Settlement
function processCheckout() {
  setGuestStep(6);
  showToast('물품 수령 및 출고 검수가 완료되었습니다. 호스트 정산이 진행됩니다.');
}

// Host Dashboard Logic & Chart
let hostRevenueChartInstance = null;

function renderHostDashboard() {
  const store = state.stores[0];
  document.getElementById('host-total-slots').innerText = `${store.totalSlots}개`;
  document.getElementById('host-active-slots').innerText = `${store.totalSlots - store.availableSlots}개 (가동률 67%)`;
  document.getElementById('host-month-revenue').innerText = `378,000원`;
  document.getElementById('host-profit-surplus').innerText = `+198,000원 순수익 (전기세 180,000원 상쇄 후)`;
}

function initHostRevenueChart() {
  const ctx = document.getElementById('hostRevenueChart');
  if (!ctx) return;

  hostRevenueChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1주차', '2주차', '3주차', '4주차(현재)'],
      datasets: [
        {
          label: '매장 냉동고 전기세 비용 (원)',
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
          ticks: {
            callback: (v) => `${(v / 1000).toLocaleString()}천원`
          }
        }
      }
    }
  });
}

// Kiosk Simulation Logic
function kioskEnterPin(digit) {
  const pinInput = document.getElementById('kiosk-pin-display');
  if (!pinInput) return;
  if (digit === 'clear') {
    pinInput.innerText = '------';
  } else if (digit === 'back') {
    let current = pinInput.innerText.replace(/-/g, '');
    current = current.slice(0, -1);
    pinInput.innerText = current.padEnd(6, '-');
  } else {
    let current = pinInput.innerText.replace(/-/g, '');
    if (current.length < 6) {
      current += digit;
      pinInput.innerText = current.padEnd(6, '-');
    }
  }
}

function kioskSubmitPin() {
  const pinInput = document.getElementById('kiosk-pin-display');
  const resultArea = document.getElementById('kiosk-result-area');
  if (!resultArea) return;

  resultArea.classList.remove('hidden');
  resultArea.innerHTML = `
    <div class="p-6 bg-sky-900/80 text-white rounded-2xl border border-sky-400/40 text-center shadow-xl">
      <div class="w-14 h-14 mx-auto rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center mb-3">
        <i data-lucide="check" class="w-8 h-8"></i>
      </div>
      <h3 class="text-xl font-bold mb-1">예약 정보 일치 확인!</h3>
      <p class="text-sm text-sky-200 mb-4">게스트: 자취생A 님 / 슬롯 [A-03호] 보관함</p>
      <div class="flex justify-center gap-3">
        <button onclick="kioskDoorAction('open')" class="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 font-bold text-sm shadow-lg flex items-center gap-2">
          <i data-lucide="unlock" class="w-4 h-4"></i> 슬롯 도어 열기
        </button>
        <button onclick="kioskDoorAction('complete')" class="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-sm">
          출고 완료
        </button>
      </div>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

function kioskDoorAction(action) {
  showToast(action === 'open' ? '키오스크 S/W 명령: 스마트 슬롯 도어가 열렸습니다!' : '출고 처리가 완료되었습니다.');
}

// Budget Platform Functions
function filterBudgetCombos(val) {
  state.budgetFilter = parseInt(val);
  const label = document.getElementById('budget-slider-val');
  if (label) label.innerText = `${state.budgetFilter.toLocaleString()}원 이하`;
  renderBudgetCombos();
}

function renderBudgetCombos() {
  const container = document.getElementById('budget-combo-container');
  if (!container) return;

  const filtered = state.budgetCombos.filter(c => c.price <= state.budgetFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 p-12 text-center text-slate-400">
        해당 예산 범위 내 가성비 조합이 없습니다. 슬라이더 예산을 올려보세요!
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="glass-card rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between">
      <div class="relative h-44 overflow-hidden bg-slate-100">
        <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
        <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-semibold">
          ${item.category}
        </span>
        <span class="absolute bottom-3 right-3 bg-sky-600 text-white font-extrabold text-sm px-3 py-1 rounded-full shadow-md">
          ${item.price.toLocaleString()}원
        </span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>${item.location}</span>
            <span class="text-amber-500 font-bold flex items-center gap-0.5">★ ${item.rating} (${item.reviews})</span>
          </div>
          <h4 class="font-bold text-slate-900 text-base mb-1">${item.name}</h4>
          <p class="text-xs text-slate-600 font-medium mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
            꿀조합 구성: ${item.items}
          </p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <div class="flex gap-1">
            ${item.tags.map(t => `<span class="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-medium">#${t}</span>`).join('')}
          </div>
          <button onclick="orderComboPickup('${item.name}')" class="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors">
            주문·길찾기
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openReceiptModal() {
  const modal = document.getElementById('receipt-upload-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeReceiptModal() {
  const modal = document.getElementById('receipt-upload-modal');
  if (modal) modal.classList.add('hidden');
}

function submitReceiptVerification() {
  closeReceiptModal();
  state.userPoints += 500;
  const pointEl = document.getElementById('user-points-display');
  if (pointEl) pointEl.innerText = `${state.userPoints.toLocaleString()} P`;
  showToast('내돈내산 영수증 검증 완료! 보상 포인트 500P가 적립되었습니다.');
}

function orderComboPickup(name) {
  showToast(`[${name}] 픽업 경로 및 매장 길안내가 연결되었습니다 (배달비 0원)`);
}

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all transform translate-y-2 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400"></span> ${message}`;
  toast.classList.remove('translate-y-2', 'opacity-0', 'pointer-events-none');

  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0', 'pointer-events-none');
  }, 3500);
}
