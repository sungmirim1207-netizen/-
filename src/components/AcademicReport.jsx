// React Academic Report Component (과제 수행 4단계 프레임워크 슬라이드 뷰어)

function AcademicReport() {
  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
              실전 비즈니스 역량 강화 팀 과제
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              B2B 기반 단기 신선·냉동 보관 플랫폼: 'KeepIn Cool' 기획 보고서
            </h2>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p><strong>과제 요건:</strong> 과제 수행 4단계 프레임워크 100% 충족</p>
            <p><strong>구현 형태:</strong> 바이브 코딩 기반 React + Tailwind + Firebase MVP</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          본 프로젝트는 1인 가구 급증 및 고물가 대용량 구매 트렌드 속에서 미니 냉장고 냉동칸 부족 문제를 해결하기 위해, 24시 무인 매장의 유휴 냉동고를 활용하는 도심형 마이크로 콜드체인 공유 플랫폼 'KeepIn Cool'을 설계하고 바이브 코딩으로 구현한 웹 프로토타입입니다.
        </p>
      </div>

      {/* 4 Steps Container */}
      <div className="space-y-8">
        
        {/* Step 1 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-extrabold flex items-center justify-center text-sm">1</span>
            <h3 className="text-xl font-black text-slate-900">1. 트렌드 분석 (Trend Analysis)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="home" className="w-4 h-4 text-sky-600"></i> 1인 가구 주거 환경의 물리적 한계
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                전체 가구의 35%를 넘어선 1인 가구의 소형 원룸 미니 냉장고는 냉동칸이 10~25L에 불과하여 대용량 식자재 저장이 물리적으로 불가능합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="shopping-cart" className="w-4 h-4 text-emerald-600"></i> 고물가 시대 '대용량·가성비 구매' 확산
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                식료품 물가 급등으로 코스트코, 트레이더스, 이커머스 공동구매 등 대용량 밀키트·냉동식품 수요가 폭증했으나 보관 공간 부족으로 구매를 포기하는 Pain Point 발생.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <i data-lucide="zap" className="w-4 h-4 text-purple-600"></i> 24시 무인 매장의 유휴 인프라 급증
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                전국 6,000+ 무인 아이스크림 및 밀키트 매장은 24시간 냉동고를 가동하여 매달 수십만 원의 고정 전기세를 부담하지만 일부 슬롯은 상시 유휴 상태입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm">2</span>
            <h3 className="text-xl font-black text-slate-900">2. 기회 포착 (Unmet Needs & Pain Points)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-3 border border-slate-200 font-bold">비교 항목</th>
                  <th className="p-3 border border-slate-200 font-bold">기존 사물함 / 택배함</th>
                  <th className="p-3 border border-slate-200 font-bold">C2C 개인 간 보관</th>
                  <th className="p-3 border border-slate-200 font-bold text-sky-700 bg-sky-50">KeepIn Cool (우리 솔루션)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-bold bg-slate-50">냉동·신선 보관 기능</td>
                  <td className="p-3 text-rose-600 font-semibold">불가 (상온 전용)</td>
                  <td className="p-3 text-slate-500">개인 냉장고에 의존</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">영하 -18℃ 이하 IoT 초정밀 제어</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-50">위생 및 법적 책임</td>
                  <td className="p-3">식품 보관 불가 약관</td>
                  <td className="p-3 text-rose-600 font-semibold">위생 사고 시 분쟁 불가피</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">항균 밀봉 + 변색 스티커 + 임대차 약관</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-50">접근성 및 보관 단위</td>
                  <td className="p-3">지하철 역사 (시간 제한)</td>
                  <td className="p-3">개인 간 시간 조율 필요</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">도보 3분 24시간 무인 매장 자유 출입</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-50">손해 배상 안전망</td>
                  <td className="p-3">식품 면책</td>
                  <td className="p-3">배상 불가</td>
                  <td className="p-3 font-bold text-emerald-700 bg-sky-50/50">건당 300원 단기 특약 보험 (10만원 캡)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm">3</span>
            <h3 className="text-xl font-black text-slate-900">3. 비즈니스 모델 설계 (Business Model Architecture)</h3>
          </div>

          {/* Handwritten Diagram to Vector */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-lg space-y-4">
            <h4 className="font-bold text-sm text-sky-400 flex items-center gap-2">
              <i data-lucide="git-branch" className="w-4 h-4"></i> B2B2C 생태계 다이어그램 (B1 - B2 - B3 - C1 - C2 상호 가치 교환)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-900 text-sky-300">B1 파트너</span>
                <h5 className="font-bold text-white text-sm">키오스크·매장 솔루션 기업</h5>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>키오스크 S/W 일괄 원격 연동</li>
                  <li>매장 슬롯 제어 & IoT 센서 통신</li>
                  <li>S/W 사용료 및 결제 수수료 쉐어</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-sky-950/80 border-2 border-sky-400 space-y-2 relative">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white">B2 (우리 플랫폼)</span>
                <h5 className="font-bold text-sky-300 text-base">KeepIn Cool 플랫폼</h5>
                <p className="text-slate-200">
                  ✓ 유휴 냉동 슬롯 중개<br />
                  ✓ 실시간 IoT 콜드체인 관제<br />
                  ✓ 300원 단기 특약 보험 연동<br />
                  ✓ 점주 70% 자동 정산 시스템
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900 text-emerald-300">B3 호스트</span>
                <h5 className="font-bold text-white text-sm">24시 무인매장 점주</h5>
                <ul className="text-slate-300 space-y-1 list-disc list-inside">
                  <li>남는 냉동고 슬롯 공간 제공</li>
                  <li>보관료 70% 정산 (전기세 100% 상쇄)</li>
                  <li>게스트 픽업 시 매장 상품 추가 매출</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="font-bold text-amber-300">C1 (대학가·1인 가구):</span> 단기 1~2일 건당 이용료 (1일 3,000원)
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="font-bold text-cyan-300">C2 (대용량 장보기 고객):</span> 정기 장보기용 월 구독권 모델
              </div>
            </div>
          </div>

          {/* 5 Safety Guards */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <i data-lucide="shield-check" className="w-5 h-5 text-emerald-600"></i>
              리스크 0%를 만드는 '5대 현실화 안전장치'
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">① 품목 제한</span>
                <span className="text-slate-600">미개봉 시판 공산품만 허용 (자가제조 금지)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">② 책임 입증</span>
                <span className="text-slate-600">영구 변색 온도 센서 스티커로 과실 명확화</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">③ 서비스 정의</span>
                <span className="text-slate-600">'식품 위탁'이 아닌 '전용 봉인 공간 임대차'</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">④ 손해 배상</span>
                <span className="text-slate-600">건당 300원 단기 특약 보험 (최대 10만원 캡)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">⑤ 거점 선정</span>
                <span className="text-slate-600">사업자 등록된 24시 무인 매장으로 일원화</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="glass-card rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-extrabold flex items-center justify-center text-sm">4</span>
            <h3 className="text-xl font-black text-slate-900">4. 바이브 코딩 프로토타이핑 (Vibe Coding MVP)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            프롬프트 엔지니어링과 AI 바이브 코딩 기법을 통해 실제 사용자가 접근 가능한 React + Tailwind CSS + Firebase 기반 핵심 프로세스 페이지 및 시스템을 완전히 동작 가능한 형태로 구축하였습니다.
          </p>
        </div>

      </div>

    </div>
  );
}

window.AcademicReport = AcademicReport;
