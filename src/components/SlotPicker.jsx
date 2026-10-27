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
