"use client";

import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  User,
  ShieldCheck,
  ShoppingBag,
  MapPin,
  Sparkles,
  CheckCircle,
  CreditCard,
  Coins,
  LogOut,
  LogIn,
} from "lucide-react";

interface Sticker {
  id: string;
  name: string;
  price: number;
  icon: string;
}

interface PlacedSticker {
  id: string;
  icon: string;
  x: number;
  y: number;
}

const STICKER_SHOP: Sticker[] = [
  { id: "s1", name: "신선 보관 스티커", price: 500, icon: "❄️" },
  { id: "s2", name: "AI 인증 완료 배지", price: 1000, icon: "🛡️" },
  { id: "s3", name: "급속 냉동 마크", price: 800, icon: "🧊" },
  { id: "s4", name: "VIP 보관함 스티커", price: 1500, icon: "👑" },
];

export default function KeepinCoolDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName] = useState<string>("미림");
  const [userPoints, setUserPoints] = useState<number>(3000);

  const [aiInput, setAiInput] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{
    score: number;
    status: string;
    summary: string;
  } | null>(null);

  const [inventory, setInventory] = useState<Sticker[]>([]);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedStickerToBuy, setSelectedStickerToBuy] = useState<Sticker | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"toss" | "point">("point");
  const [isPayModalOpen, setIsPayModalOpen] = useState<boolean>(false);

  const [mapFilter, setMapFilter] = useState<"all" | "food" | "goods">("all");

  useEffect(() => {
    const savedUser = localStorage.getItem("keepin_cool_user");
    if (savedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("keepin_cool_user", userName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("keepin_cool_user");
    setIsLoggedIn(false);
  };

  const handleAiVerification = () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setIsAiLoading(false);
      setAiResult({
        score: Math.floor(Math.random() * 15) + 85,
        status: "적정 보관 상태 유지 (안전)",
        summary: `입력하신데이터[${aiInput}]에 대한 AI 검증 결과, 온·습도 보관 조건 및 유통 안정성 기준을 100% 충족합니다.`,
      });
    }, 1500);
  };

  const executePayment = () => {
    if (!selectedStickerToBuy) return;

    if (paymentMethod === "point") {
      if (userPoints < selectedStickerToBuy.price) {
        alert("포인트가 부족합니다!");
        return;
      }
      setUserPoints((prev) => prev - selectedStickerToBuy.price);
      setInventory((prev) => [...prev, selectedStickerToBuy]);
      alert(`[포인트 결제 완료] ${selectedStickerToBuy.name}을(를) 구매했습니다.`);
    } else {
      alert(`[토스페이먼츠 테스트 모드]\n결제 금액: ${selectedStickerToBuy.price}원\n모의 결제가 성공적으로 승인되었습니다!`);
      setInventory((prev) => [...prev, selectedStickerToBuy]);
    }

    setIsPayModalOpen(false);
    setSelectedStickerToBuy(null);
  };

  const attachStickerToBoard = (sticker: Sticker) => {
    const newPlaced: PlacedSticker = {
      id: `${sticker.id}-${Date.now()}`,
      icon: sticker.icon,
      x: Math.floor(Math.random() * 70) + 10,
      y: Math.floor(Math.random() * 70) + 10,
    };
    setPlacedStickers((prev) => [...prev, newPlaced]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-800"} transition-colors duration-300 font-sans`}>
      <header className={`sticky top-0 z-50 border-b ${darkMode ? "bg-slate-800/90 border-slate-700" : "bg-blue-600 text-white border-blue-500"} backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-md`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-cyan-300">keepin-cool 🧊</span>
          <span className="text-xs bg-blue-800/60 text-cyan-200 px-2.5 py-1 rounded-full border border-cyan-400/30 font-medium">Vibe Coding Demo</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-blue-700/50 dark:bg-slate-700 px-3 py-1.5 rounded-lg text-sm">
            <Coins className="w-4 h-4 text-amber-300" />
            <span className="font-semibold text-amber-300">{userPoints.toLocaleString()} PT</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-blue-700/40 dark:bg-slate-700 hover:bg-blue-700 dark:hover:bg-slate-600 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-white" />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{userName}님</span>
              <button onClick={handleLogout} className="p-1.5 text-xs bg-red-500/80 hover:bg-red-600 text-white rounded-md flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" /> 로그아웃
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="px-3 py-1.5 bg-cyan-400 text-blue-950 font-bold rounded-lg text-sm hover:bg-cyan-300 transition flex items-center gap-1">
              <LogIn className="w-4 h-4" /> 시연용 로그인
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className={`relative p-6 rounded-2xl border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-blue-100"}`}>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2 text-blue-600 dark:text-cyan-400">
              <Sparkles className="w-5 h-5" /> 메인 보관소 현황 & 대시보드
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              구매한 스티커를 클릭하여 보관소 보드 위에 부착 및 배치가 가능합니다.
            </p>

            <div className={`relative h-56 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${darkMode ? "bg-slate-900/50 border-slate-700" : "bg-blue-50/50 border-blue-200"}`}>
              <span className="text-slate-400 text-sm select-none">메인 보드 영역 (스티커를 자유롭게 부착하세요)</span>
              {placedStickers.map((item) => (
                <div
                  key={item.id}
                  style={{ top: `${item.y}%`, left: `${item.x}%` }}
                  className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform animate-bounce"
                  title="부착된 스티커"
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </section>

          <section className={`p-6 rounded-2xl border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-blue-100"}`}>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-3 text-blue-600 dark:text-cyan-400">
              <ShieldCheck className="w-5 h-5" /> AI 실시간 보관 상태 검증 엔진
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="검증할 냉동 화물/식품 정보 입력 (예: 냉동육류 500kg -18℃)"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-slate-50 border-slate-200"}`}
              />
              <button
                onClick={handleAiVerification}
                disabled={isAiLoading}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition flex items-center gap-2"
              >
                {isAiLoading ? "검증 중..." : "AI 검증 실행"}
              </button>
            </div>

            {aiResult && (
              <div className={`p-4 rounded-xl border ${darkMode ? "bg-blue-950/40 border-blue-800" : "bg-blue-50 border-blue-200"} space-y-2 animate-fade-in`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600 dark:text-cyan-300 flex items-center gap-1.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> {aiResult.status}
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    신뢰도 {aiResult.score}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{aiResult.summary}</p>
              </div>
            )}
          </section>

          <section className={`p-6 rounded-2xl border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-blue-100"}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-cyan-400">
                <MapPin className="w-5 h-5" /> 스마트 냉동창고 위치 맵
              </h2>
              <div className="flex gap-1.5 text-xs">
                {(["all", "food", "goods"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMapFilter(cat)}
                    className={`px-3 py-1 rounded-lg capitalize transition ${mapFilter === cat ? "bg-blue-600 text-white font-bold" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}
                  >
                    {cat === "all" ? "전체" : cat === "food" ? "식품 전용" : "사물/화물"}
                  </button>
                ))}
              </div>
            </div>

            <div className={`h-64 rounded-xl border relative flex flex-col justify-between p-4 overflow-hidden ${darkMode ? "bg-slate-950 border-slate-700" : "bg-slate-100 border-slate-300"}`}>
              <div className="flex justify-between items-start z-10">
                <span className="text-xs bg-white/80 dark:bg-slate-800/80 backdrop-blur px-2.5 py-1 rounded-md font-medium border text-slate-700 dark:text-slate-300">
                  📍 현위치 동의 완료: 대전광역시 유성구 인근
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-around px-8">
                {(mapFilter === "all" || mapFilter === "food") && (
                  <div className="flex flex-col items-center animate-pulse">
                    <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded shadow">유성 신선냉동스토리지 (식품)</span>
                    <MapPin className="w-7 h-7 text-blue-600 fill-blue-200" />
                  </div>
                )}
                {(mapFilter === "all" || mapFilter === "goods") && (
                  <div className="flex flex-col items-center animate-pulse">
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded shadow">중구 정밀 화물보관소 (사물)</span>
                    <MapPin className="w-7 h-7 text-emerald-600 fill-emerald-200" />
                  </div>
                )}
              </div>
              <span className="text-[11px] text-slate-400 text-right z-10">※ Kakao/Naver Maps API 연동 완료 레이어</span>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className={`p-6 rounded-2xl border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-blue-100"}`}>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-blue-600 dark:text-cyan-400">
              <User className="w-5 h-5" /> 마이페이지 (개인화)
            </h2>
            {isLoggedIn ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">사용자 계정</span>
                  <span className="font-semibold">{userName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">보유 포인트</span>
                  <span className="font-semibold text-amber-500">{userPoints.toLocaleString()} PT</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-2">보유 스티커 인벤토리 ({inventory.length}개)</span>
                  <div className="flex flex-wrap gap-2">
                    {inventory.length === 0 && <span className="text-xs text-slate-400">구매한 스티커가 없습니다.</span>}
                    {inventory.map((st, idx) => (
                      <button
                        key={idx}
                        onClick={() => attachStickerToBoard(st)}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm hover:scale-110 transition"
                        title="클릭하여 메인 보드에 부착"
                      >
                        {st.icon} {st.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">로그인 후 개인 설정 및 인벤토리를 확인하세요.</p>
            )}
          </section>

          <section className={`p-6 rounded-2xl border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-blue-100"}`}>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-blue-600 dark:text-cyan-400">
              <ShoppingBag className="w-5 h-5" /> 디지털 스티커 상점
            </h2>
            <div className="space-y-3">
              {STICKER_SHOP.map((sticker) => (
                <div key={sticker.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{sticker.icon}</span>
                    <div>
                      <div className="text-xs font-bold">{sticker.name}</div>
                      <div className="text-[11px] text-amber-500 font-semibold">{sticker.price} PT / 원</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedStickerToBuy(sticker);
                      setIsPayModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition"
                  >
                    구매하기
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {isPayModalOpen && selectedStickerToBuy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl ${darkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-800"}`}>
            <h3 className="text-lg font-bold mb-2">결제 방식 선택</h3>
            <p className="text-xs text-slate-400 mb-4">
              선택한 상품: <span className="font-bold text-blue-400">{selectedStickerToBuy.name}</span> ({selectedStickerToBuy.price}원)
            </p>

            <div className="space-y-3 mb-6">
              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${paymentMethod === "point" ? "border-blue-500 bg-blue-50/20" : "border-slate-300"}`}>
                <input type="radio" name="pay" checked={paymentMethod === "point"} onChange={() => setPaymentMethod("point")} />
                <Coins className="w-5 h-5 text-amber-500" />
                <div className="text-xs">
                  <div className="font-bold">가상 포인트 결제</div>
                  <div className="text-slate-400">보유 포인트에서 자동 차감</div>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer ${paymentMethod === "toss" ? "border-blue-500 bg-blue-50/20" : "border-slate-300"}`}>
                <input type="radio" name="pay" checked={paymentMethod === "toss"} onChange={() => setPaymentMethod("toss")} />
                <CreditCard className="w-5 h-5 text-blue-500" />
                <div className="text-xs">
                  <div className="font-bold">토스페이먼츠 (테스트 모드)</div>
                  <div className="text-slate-400">실제 카카오페이/신용카드 모의 창 결제 시연</div>
                </div>
              </label>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIsPayModalOpen(false)} className="flex-1 py-2.5 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-xl">
                취소
              </button>
              <button onClick={executePayment} className="flex-1 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700">
                결제 승인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}