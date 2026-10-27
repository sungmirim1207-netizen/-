// React Navbar Component with One-Click Role Switcher & Firebase Configuration Modal

function Navbar({ activeTab, onSelectTab, onOpenFirebaseConfig }) {
  const [isFirebaseReady, setIsFirebaseReady] = React.useState(false);

  React.useEffect(() => {
    const checkStatus = () => {
      if (window.firebaseManager) {
        setIsFirebaseReady(window.firebaseManager.isReady());
      }
    };
    checkStatus();
    const timer = setInterval(checkStatus, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Info */}
          <div 
            onClick={() => onSelectTab('guest')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl ice-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <i data-lucide="snowflake" className="w-6 h-6 animate-spin-slow"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
                  KeepIn Cool
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full badge-ice">React + Firebase</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                24시 무인점포 유휴 냉동 슬롯 활용 단기 보관 중개 플랫폼
              </p>
            </div>
          </div>

          {/* Role Switcher Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold">
            <button
              onClick={() => onSelectTab('guest')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'guest'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🚀 6단계 게스트 UX
            </button>
            <button
              onClick={() => onSelectTab('kiosk')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'kiosk'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🖥️ 현장 키오스크
            </button>
            <button
              onClick={() => onSelectTab('host')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'host'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📊 점주 B2B 대시보드
            </button>
            <button
              onClick={() => onSelectTab('framework')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'framework'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📑 4단계 과제 보고서
            </button>
            <button
              onClick={() => onSelectTab('budget')}
              className={`px-3.5 py-2 rounded-lg transition-all ${
                activeTab === 'budget'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🍽️ [참조] 예산 음식
            </button>
          </nav>

          {/* Right Status / Firebase Config Button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenFirebaseConfig}
              title="Firebase 설정 열기"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                isFirebaseReady 
                  ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isFirebaseReady ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
              <span>{isFirebaseReady ? 'Firebase Firestore 연결됨' : 'Mock 시연 모드 (즉시동작)'}</span>
              <i data-lucide="settings" className="w-3.5 h-3.5 text-slate-400 ml-1"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50 px-2 py-2 overflow-x-auto text-[11px] font-bold">
        <button onClick={() => onSelectTab('guest')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'guest' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>6단계 UX</button>
        <button onClick={() => onSelectTab('kiosk')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'kiosk' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>키오스크</button>
        <button onClick={() => onSelectTab('host')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'host' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>점주 대시보드</button>
        <button onClick={() => onSelectTab('framework')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'framework' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>4단계 보고서</button>
        <button onClick={() => onSelectTab('budget')} className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'budget' ? 'bg-amber-600 text-white' : 'text-slate-600'}`}>예산 음식</button>
      </div>
    </header>
  );
}

window.Navbar = Navbar;
