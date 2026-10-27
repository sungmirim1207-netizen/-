// React Host (Store Manager) Dashboard Component with Revenue vs Electric Cost Chart

function HostDashboard({ store }) {
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current && window.Chart) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['1주차', '2주차', '3주차', '4주차(현재)'],
          datasets: [
            {
              label: '매장 냉동고 고정 전기세 비용 (원)',
              data: [45000, 45000, 45000, 45000],
              backgroundColor: '#94a3b8'
            },
            {
              label: 'KeepIn Cool 보관료 70% 정산 수익 (원)',
              data: [68000, 92000, 105000, 113000],
              backgroundColor: '#0284c7'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v) => `${(v / 1000).toLocaleString()}천원` }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, []);

  const totalSlots = store?.totalSlots || 12;
  const availableSlots = store?.availableSlots || 4;
  const occupiedSlots = totalSlots - availableSlots;
  const utilization = Math.round((occupiedSlots / totalSlots) * 100);

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Summary */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-2">
              점주 전용 B2B 포털
            </span>
            <h2 className="text-2xl font-black text-slate-900">[{store?.name || '아이스데이 24시 신촌점'}] 점주 관리 센터</h2>
            <p className="text-xs text-slate-500 mt-1">
              24시간 상시 가동 중인 매장 냉동고의 유휴 공간으로 매달 전기세를 100% 상쇄하고 추가 순익을 만듭니다.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">이번 달 누적 정산액 (70% 쉐어)</span>
            <div className="text-3xl font-black text-sky-700 font-mono">378,000원</div>
          </div>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500">총 냉동 슬롯</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalSlots}개</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">전용 스마트 도어락 장착</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-700">현재 보관 가동률</span>
            <div className="text-2xl font-black text-emerald-800 mt-1">{occupiedSlots}개 ({utilization}%)</div>
            <span className="text-[11px] text-emerald-600 mt-0.5 block">유휴 공간 활용 중</span>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="text-xs text-sky-700">전기세 상쇄 효과</span>
            <div className="text-2xl font-black text-sky-900 mt-1">100% 절감</div>
            <span className="text-[11px] text-sky-700 font-semibold mt-0.5 block">+198,000원 순수익 달성</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-xs text-purple-700">매장 상품 교차 구매율</span>
            <div className="text-2xl font-black text-purple-900 mt-1">+14.2%</div>
            <span className="text-[11px] text-purple-600 mt-0.5 block">보관 픽업 시 아이스크림 구매</span>
          </div>
        </div>
      </div>

      {/* Grid: Chart & 12-Slot Realtime Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Bar Chart */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">전기세 대비 보관 정산 수익 분석</h3>
              <p className="text-xs text-slate-500">기존에 고정 지출되던 냉동고 전기세를 보관 수수료로 상쇄</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">흑자 전환 완료</span>
          </div>
          <div className="h-64 w-full">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        {/* Right: Slot Realtime List */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg">12개 슬롯 실시간 관제 현황</h3>
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {(store?.slots || []).map((slot, idx) => (
              <div 
                key={slot.id} 
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  slot.status === 'occupied' 
                    ? 'bg-white border-slate-200' 
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div>
                  <span className="font-bold text-slate-900">{slot.id}호</span>
                  <span className="text-slate-500 ml-1.5">{slot.item || '예약 대기 빈 슬롯'}</span>
                </div>
                <div className="text-right font-mono">
                  <span className={`font-bold ${slot.status === 'occupied' ? 'text-sky-700' : 'text-emerald-700'}`}>
                    {slot.temp}℃
                  </span>
                  <span className="text-[10px] text-slate-400 block">{slot.expiry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

window.HostDashboard = HostDashboard;
