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
