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
