// Storage Service: Dual-Mode Data Layer (Firebase Firestore ↔ Local Mock)

const SEED_STORES = [
  {
    id: 'store_shinchon_01',
    name: '아이스데이 24시 신촌점',
    address: '서울 서대문구 신촌로 12 (연세대·신촌역 도보 3분)',
    type: '무인 아이스크림·냉동식품점',
    lat: 37.5562,
    lng: 126.9368,
    totalSlots: 12,
    availableSlots: 4,
    currentTemp: -19.2,
    monthlyElectricCost: 180000,
    slots: [
      { id: 'A-01', status: 'occupied', temp: -19.4, expiry: '14시간 남음', item: '냉동 피자' },
      { id: 'A-02', status: 'occupied', temp: -19.1, expiry: '6시간 남음', item: '밀키트 세트' },
      { id: 'A-03', status: 'available', temp: -19.2, expiry: '즉시 이용 가능', item: '' },
      { id: 'A-04', status: 'available', temp: -19.3, expiry: '즉시 이용 가능', item: '' },
      { id: 'B-01', status: 'occupied', temp: -19.0, expiry: '1일 남음', item: '한우 정육' },
      { id: 'B-02', status: 'occupied', temp: -18.9, expiry: '18시간 남음', item: '아이스크림' },
      { id: 'B-03', status: 'available', temp: -19.5, expiry: '즉시 이용 가능', item: '' },
      { id: 'B-04', status: 'available', temp: -19.2, expiry: '즉시 이용 가능', item: '' },
      { id: 'C-01', status: 'occupied', temp: -18.8, expiry: '2일 남음', item: '만두 세트' },
      { id: 'C-02', status: 'occupied', temp: -19.2, expiry: '8시간 남음', item: '냉동 볶음밥' },
      { id: 'C-03', status: 'occupied', temp: -19.0, expiry: '12시간 남음', item: '치킨 너겟' },
      { id: 'C-04', status: 'occupied', temp: -18.7, expiry: '4시간 남음', item: '돈까스' },
    ]
  },
  {
    id: 'store_hongdae_02',
    name: '달콤아이스 홍대입구점',
    address: '서울 마포구 와우산로 88 (홍대 정문 앞 도보 5분)',
    type: '24시 무인 스낵·빙과점',
    lat: 37.5535,
    lng: 126.9248,
    totalSlots: 8,
    availableSlots: 2,
    currentTemp: -18.8,
    monthlyElectricCost: 140000,
    slots: [
      { id: 'A-01', status: 'occupied', temp: -18.9, expiry: '16시간 남음', item: '냉동 과일' },
      { id: 'A-02', status: 'available', temp: -18.8, expiry: '즉시 이용 가능', item: '' },
      { id: 'A-03', status: 'occupied', temp: -19.1, expiry: '1일 남음', item: '아이스크림' },
      { id: 'A-04', status: 'occupied', temp: -18.7, expiry: '9시간 남음', item: '밀키트' },
      { id: 'B-01', status: 'occupied', temp: -18.8, expiry: '22시간 남음', item: '생선까스' },
      { id: 'B-02', status: 'available', temp: -18.8, expiry: '즉시 이용 가능', item: '' },
      { id: 'B-03', status: 'occupied', temp: -19.0, expiry: '14시간 남음', item: '냉동 떡볶이' },
      { id: 'B-04', status: 'occupied', temp: -18.6, expiry: '5시간 남음', item: '피자 도우' },
    ]
  },
  {
    id: 'store_anam_03',
    name: '올데이 밀키트 24 안암점',
    address: '서울 성북구 고려대로 45 (고려대 안암역 도보 4분)',
    type: '24시 스마트 밀키트 편의점',
    lat: 37.5857,
    lng: 127.0298,
    totalSlots: 16,
    availableSlots: 6,
    currentTemp: -19.8,
    monthlyElectricCost: 210000,
    slots: []
  },
  {
    id: 'store_daehakro_04',
    name: '착한마켓 대학로점',
    address: '서울 종로구 대학로 102 (혜화역 도보 7분)',
    type: '동네 중소형 스마트 마트',
    lat: 37.5824,
    lng: 127.0019,
    totalSlots: 10,
    availableSlots: 5,
    currentTemp: -18.4,
    monthlyElectricCost: 160000,
    slots: []
  }
];

class StorageService {
  constructor() {
    this.initMockData();
  }

  initMockData() {
    if (!localStorage.getItem('KIC_STORES')) {
      localStorage.setItem('KIC_STORES', JSON.stringify(SEED_STORES));
    }
  }

  async getStores() {
    if (window.firebaseManager && window.firebaseManager.isReady()) {
      try {
        const snapshot = await window.firebaseManager.db.collection('stores').get();
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (e) {
        console.warn('[StorageService] Firestore 조회 실패, 로컬 데이터 사용:', e);
      }
    }
    const data = localStorage.getItem('KIC_STORES');
    return data ? JSON.parse(data) : SEED_STORES;
  }

  async saveBooking(booking) {
    if (window.firebaseManager && window.firebaseManager.isReady()) {
      try {
        await window.firebaseManager.db.collection('bookings').doc(booking.id).set(booking);
        console.log('[StorageService] Firestore에 예약 저장 성공:', booking.id);
      } catch (e) {
        console.warn('[StorageService] Firestore 예약 저장 실패:', e);
      }
    }
    
    // Save to LocalStorage
    let bookings = [];
    try {
      const stored = localStorage.getItem('KIC_BOOKINGS');
      if (stored) bookings = JSON.parse(stored);
    } catch (e) {}
    bookings.push(booking);
    localStorage.setItem('KIC_BOOKINGS', JSON.stringify(bookings));
    localStorage.setItem('KIC_ACTIVE_BOOKING', JSON.stringify(booking));

    // Update slot occupancy in store
    this.occupySlot(booking.storeId, booking.slotId, booking.itemName);
    return booking;
  }

  occupySlot(storeId, slotId, itemName) {
    const stores = JSON.parse(localStorage.getItem('KIC_STORES') || '[]');
    const targetStore = stores.find(s => s.id === storeId);
    if (targetStore && targetStore.slots) {
      const targetSlot = targetStore.slots.find(s => s.id === slotId);
      if (targetSlot) {
        targetSlot.status = 'occupied';
        targetSlot.item = itemName;
        targetSlot.expiry = '24시간 남음';
        targetStore.availableSlots = Math.max(0, targetStore.availableSlots - 1);
        localStorage.setItem('KIC_STORES', JSON.stringify(stores));
      }
    }
  }

  getActiveBooking() {
    try {
      const saved = localStorage.getItem('KIC_ACTIVE_BOOKING');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  updateBookingStatus(status) {
    const active = this.getActiveBooking();
    if (active) {
      active.status = status;
      localStorage.setItem('KIC_ACTIVE_BOOKING', JSON.stringify(active));
    }
  }
}

window.storageService = new StorageService();
