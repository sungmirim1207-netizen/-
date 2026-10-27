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
