// React Budget-Based Food Recommendation Component (Budget Bite Module)

function BudgetFoodView() {
  const [budget, setBudget] = React.useState(10000);
  const [points, setPoints] = React.useState(3450);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const combos = [
    {
      id: 1,
      name: '한솥도시락 가성비 든든세트',
      items: '빅치킨마요 + 신라면 소컵 콤보',
      price: 5400,
      category: '픽업(포장) 배달비 0원',
      rating: 4.9,
      reviews: 142,
      location: '신촌 연세로점 (도보 4분)',
      tags: ['1인 가구', '초가성비', '직장인 점심'],
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: '싸다김밥 탄단지 충전 세트',
      items: '참치김밥 + 야채튀김 1개',
      price: 6000,
      category: '매장 식사 전용',
      rating: 4.8,
      reviews: 98,
      location: '이대역 3번 출구 (도보 2분)',
      tags: ['혼밥 추천', '단백질', '빠른식사'],
      img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: '홍대 카츠당 실속 정식',
      items: '수제 등심카츠 단품 + 미니 우동',
      price: 8900,
      category: '픽업(포장) 배달비 0원',
      rating: 4.9,
      reviews: 310,
      location: '홍대 걷고싶은거리 (도보 5분)',
      tags: ['대학생 베스트', '갓성비', '풍성한양'],
      img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      name: '역전우동 가성비 국물 조합',
      items: '옛날우동 + 매콤김말이 2개',
      price: 6500,
      category: '매장 식사 전용',
      rating: 4.7,
      reviews: 84,
      location: '신촌역 지하철 연계 (도보 1분)',
      tags: ['야식 추천', '따뜻한국물', '가성비'],
      img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      name: '샐러디 알뜰 헬스 팩',
      items: '멕시칸 치킨랩 + 제로 스파클링',
      price: 8900,
      category: '픽업(포장) 배달비 0원',
      rating: 4.8,
      reviews: 165,
      location: '연세대 정문 앞 (도보 3분)',
      tags: ['다이어트', '건강식', '바쁜직장인'],
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      name: '맘스터치 실속 버거 세트',
      items: '싸이버거 단품 + 김떡만 1개',
      price: 8200,
      category: '픽업(포장) 배달비 0원',
      rating: 4.9,
      reviews: 420,
      location: '서강대 후문 (도보 6분)',
      tags: ['치킨버거', '든든한한끼', '사이드조합'],
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=60'
    }
  ];

  const filtered = combos.filter(c => c.price <= budget);

  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setPoints(prev => prev + 500);
    alert('내돈내산 영수증 인증 성공! +500P 가 지급되었습니다.');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
            [참조 과제] 예산 중심형 음식 추천 플랫폼 (Budget Bite)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            배달비 0원! 내 예산에 딱 맞는<br />
            가성비 한 끼 꿀조합을 찾아보세요
          </h2>
          <p className="text-sm text-white/90">
            고배달비(3,000~5,000원) 시대! 배달망 리스크 없이 도보 픽업 & 매장 식사로 1만 원 안팎 최적 한 끼를 집단지성으로 추천합니다.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white text-orange-600 font-extrabold text-xs shadow hover:bg-orange-50 transition-all flex items-center gap-2"
            >
              <i data-lucide="receipt" className="w-4 h-4"></i>
              내돈내산 영수증 인증하고 +500P 받기
            </button>
            <div className="text-xs">
              내 보유 포인트: <strong className="font-black text-amber-200 text-sm">{points.toLocaleString()} P</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Filter */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-1/2 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">예산 한도 슬라이더 설정:</span>
            <span className="font-black text-sky-700 text-sm">{budget.toLocaleString()}원 이하</span>
          </div>
          <input 
            type="range" 
            min="5000" 
            max="15000" 
            step="500" 
            value={budget} 
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer" 
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>5,000원 (초알뜰)</span>
            <span>10,000원 (표준)</span>
            <span>15,000원 (풍성)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-500 font-normal">정렬:</span>
          <button className="px-3 py-1.5 rounded-lg bg-sky-600 text-white">가성비 순</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">거리 순</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">평점 순</button>
        </div>
      </div>

      {/* Combos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                {item.category}
              </span>
              <span className="absolute bottom-3 right-3 bg-sky-600 text-white font-extrabold text-sm px-3 py-1 rounded-full shadow-md">
                {item.price.toLocaleString()}원
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>{item.location}</span>
                  <span className="text-amber-500 font-bold">★ {item.rating} ({item.reviews})</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">{item.name}</h4>
                <p className="text-xs text-slate-600 font-medium mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  꿀조합: {item.items}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex gap-1">
                  {item.tags.map(t => (
                    <span key={t} className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-medium">#{t}</span>
                  ))}
                </div>
                <button 
                  onClick={() => alert(`[${item.name}] 픽업 경로 및 매장 길안내가 연결되었습니다 (배달비 0원)`)}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
                >
                  주문·길찾기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Receipt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <form onSubmit={handleReceiptSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <i data-lucide="receipt" className="w-5 h-5 text-orange-500"></i>
                내돈내산 조합 등록 & 영수증 인증
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">식당 명칭</label>
                <input defaultValue="싸다김밥 이대점" className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">나만의 꿀조합 메뉴 구성</label>
                <input defaultValue="참치김밥 + 야채튀김 1개" className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">실 결제 금액 (원)</label>
                <input type="number" defaultValue="6000" className="w-full p-2.5 rounded-xl border border-slate-300" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">영수증 사진 첨부</label>
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center bg-slate-50 cursor-pointer">
                  <i data-lucide="camera" className="w-6 h-6 text-slate-400 mx-auto mb-1"></i>
                  <span className="text-[11px] text-slate-500">영수증 업로드 (OCR 금액/메뉴 자동 검증)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">취소</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow">
                검증 제출 (+500P 적립)
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

window.BudgetFoodView = BudgetFoodView;
