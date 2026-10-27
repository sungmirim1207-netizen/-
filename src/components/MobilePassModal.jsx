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
