// React Real-Time IoT Telemetry View Component (Step 5)

function IotTelemetryView({ booking, onProceedCheckout }) {
  const [currentTemp, setCurrentTemp] = React.useState(-19.2);
  const [isAlert, setIsAlert] = React.useState(false);
  const [history, setHistory] = React.useState([-18.9, -19.0, -19.2, -19.1, -19.4, -19.2, -19.3, -19.2]);
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  // Chart.js initialization
  React.useEffect(() => {
    if (chartRef.current && window.Chart) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['10분전', '8분전', '6분전', '5분전', '3분전', '2분전', '1분전', '현재'],
          datasets: [{
            label: '슬롯 내부 실시간 온도 (℃)',
            data: history,
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
            legend: { display: false }
          },
          scales: {
            y: {
              min: -25,
              max: -5,
              grid: { color: '#f1f5f9' },
              ticks: { callback: (val) => `${val}℃` }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  // Live timer fluctuation
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (isAlert) return;
      const delta = (Math.random() * 0.4 - 0.2);
      const newTemp = parseFloat((currentTemp + delta).toFixed(1));
      setCurrentTemp(newTemp);

      setHistory(prev => {
        const next = [...prev.slice(1), newTemp];
        if (chartInstanceRef.current) {
          chartInstanceRef.current.data.datasets[0].data = next;
          chartInstanceRef.current.update('none');
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [currentTemp, isAlert]);

  const toggleAnomaly = () => {
    if (!isAlert) {
      setIsAlert(true);
      setCurrentTemp(-5.4);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.datasets[0].borderColor = '#e11d48';
        chartInstanceRef.current.update();
      }
    } else {
      setIsAlert(false);
      setCurrentTemp(-19.2);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.data.datasets[0].borderColor = '#0284c7';
        chartInstanceRef.current.update();
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">슬롯 내부 실시간 온도</span>
            <div className={`text-2xl font-black mt-1 font-mono ${isAlert ? 'text-rose-600' : 'text-sky-700'}`}>
              {currentTemp} ℃
            </div>
            <span className={`text-[11px] font-semibold flex items-center gap-1 mt-0.5 ${isAlert ? 'text-rose-600' : 'text-emerald-600'}`}>
              <i data-lucide={isAlert ? 'alert-triangle' : 'check'} className="w-3 h-3"></i>
              {isAlert ? '이상 고온 감지!' : '최적 급속 냉동 유지 중'}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isAlert ? 'bg-rose-100 text-rose-600' : 'bg-sky-100 text-sky-600'}`}>
            <i data-lucide="thermometer-snowflake" className="w-6 h-6"></i>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">잔여 보관 시간 (단기 보관)</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">23:44:12</div>
            <span className="text-[11px] text-slate-500 font-medium">만료: {booking.expiryAt}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <i data-lucide="clock" className="w-6 h-6"></i>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">단기 특약 보험 보장</span>
            <div className="text-2xl font-black text-amber-600 mt-1">100,000원</div>
            <span className="text-[11px] text-amber-700 font-semibold">변색 스티커 손상 시 전액 배상</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <i data-lucide="shield-alert" className="w-6 h-6"></i>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <i data-lucide="activity" className="w-5 h-5 text-sky-600"></i>
              IoT 초정밀 온도 센서 실시간 텔레메트리 (2.5초 주기 갱신)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">센서 ID: IOT-TMP-9921 / 무인매장 키오스크 게이트웨이 연동</p>
          </div>

          <button 
            onClick={toggleAnomaly}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isAlert 
                ? 'bg-emerald-600 text-white' 
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            {isAlert ? '정상 온도로 복구 시뮬레이션' : '이상 고온(-5℃) 시뮬레이션 테스트'}
          </button>
        </div>

        {isAlert && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-rose-800 text-xs leading-relaxed animate-in fade-in">
            <div className="font-bold flex items-center gap-2 mb-1 text-sm text-rose-900">
              <i data-lucide="alert-triangle" className="w-5 h-5 text-rose-600"></i>
              이상 온도 감지 알림 (-5.4℃)! 300원 단기 특약 자동 보험 프로세스 가동
            </div>
            무인 매장 점주 및 플랫폼 관제 센터에 즉시 비상 알림이 전달되었습니다. 
            만약 온도 변색 스티커가 적색으로 변색되어 식품이 손상될 경우, 현대해상 단기 특약 보험을 통해 
            <strong> 최대 10만 원 한도 내 전액 배상</strong>이 보장됩니다.
          </div>
        )}

        <div className="h-64 w-full">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onProceedCheckout}
          className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
        >
          <span>보관 완료 및 출고하기</span>
          <i data-lucide="arrow-right" className="w-4 h-4"></i>
        </button>
      </div>

    </div>
  );
}

window.IotTelemetryView = IotTelemetryView;
