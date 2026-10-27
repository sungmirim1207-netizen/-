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
