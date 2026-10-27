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
