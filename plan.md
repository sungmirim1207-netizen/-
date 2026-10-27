# KeepIn Cool (킵인쿨) - React & Firebase 구현 계획서 (Implementation Plan)

## 1. 아키텍처 및 기술 스택
- **프론트엔드 프레임워크**: React 18+ (Vite 번들러)
- **스타일링**: Tailwind CSS v3, Pretendard 웹폰트, Glassmorphism 테마
- **아이콘 및 시각화**: Lucide React, Chart.js / react-chartjs-2
- **백엔드 및 데이터 계층**: 
  - Firebase v10+ (Cloud Firestore, Firebase Auth, Firebase Hosting)
  - **Dual-Mode Data Architecture**: API 키 미입력 시에도 발표/시연이 100% 완벽히 구동되는 `MockStorageService` 자동 활성화 + `.env` 입력 시 즉시 Firestore 실시간 리스너(`onSnapshot`) 연동
- **지도 연동**:
  - 카카오맵 SDK (Kakao Maps Web API) 연동 컴포넌트
  - 카카오 JavaScript 키가 없거나 로드 지연 시 자동 활성화되는 **인터랙티브 거점 맵 Fallback 엔진** 탑재 (신촌/홍대/안암 거점 마커 및 잔여 슬롯 클릭 완벽 지원)

---

## 2. 프로젝트 디렉터리 구조

```text
keepin-cool-react/
├── public/
│   ├── favicon.ico
│   └── mock/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx             # 상단 원클릭 Role Switcher 바 (게스트/호스트/키오스크/보고서)
│   │   │   ├── Toast.tsx              # 실시간 알림 토스트
│   │   │   └── Modal.tsx
│   │   ├── guest/
│   │   │   ├── GuestFlow.tsx          # 6단계 게스트 종합 컨테이너
│   │   │   ├── KakaoStoreMap.tsx      # 카카오맵 연동 및 인터랙티브 거점 맵
│   │   │   ├── SlotPicker.tsx         # 12개 냉동 슬롯 선택 및 5대 안전장치 약관 동의
│   │   │   ├── MobilePassModal.tsx    # SVG QR 코드 및 6자리 PIN 발급 모바일 패스
│   │   │   ├── SealingVerifier.tsx    # 항균 밀봉 봉투 + 영구 변색 스티커 AI 검증
│   │   │   ├── IotTelemetryView.tsx   # 실시간 온도 Chart.js 및 이상온도 보험 테스트
│   │   │   └── CheckoutReceipt.tsx    # 출고 검수 및 점주 70% 정산 영수증
│   │   ├── host/
│   │   │   ├── HostDashboard.tsx      # 점주 관리 센터 종합 뷰
│   │   │   ├── SlotMonitorGrid.tsx    # 12개 슬롯 실시간 보관 상태 관제
│   │   │   └── RevenueExpenseChart.tsx # 월 37.8만 정산 vs 18만 전기세 100% 상쇄 차트
│   │   ├── kiosk/
│   │   │   └── KioskTerminal.tsx      # 매장 현장 다크 테마 터치스크린 및 PIN 입력
│   │   └── report/
│   │       └── AcademicReport.tsx     # 과제 4단계 프레임워크 슬라이드형 기획서
│   ├── services/
│   │   ├── firebase.ts                # Firebase 클라이언트 초기화
│   │   ├── storageService.ts          # Firebase ↔ Mock 듀얼 스위처 인터페이스
│   │   └── mockData.ts                # 오프라인/무설치 시연용 초기 시드 데이터
│   ├── types/
│   │   └── index.ts                   # Store, Slot, Booking, Telemetry 타입 정의
│   ├── App.tsx                        # 뷰 전환 및 글로벌 상태 관리
│   ├── main.tsx                       # React 엔트리포인트
│   └── index.css                      # Tailwind 및 커스텀 스타일
├── .env.example                       # Firebase 및 카카오맵 키 템플릿
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 3. 단계별 상세 구현 로드맵 (Phased Execution)

### 📌 Phase 1: 기반 환경 및 공통 네비게이션 (Role Switcher)
- React + Vite + Tailwind CSS 프로젝트 구성
- 전역 상태 관리 (Active View: `guest` | `host` | `kiosk` | `report`)
- 상단 고정 네비게이션 바: 발표/심사 중 클릭 한 번으로 모든 사용자 관점 즉시 전환 가능

### 📌 Phase 2: Firebase / Mock 듀얼 데이터 계층 (`storageService.ts`)
- Cloud Firestore 컬렉션(`stores`, `slots`, `bookings`) CRUD 인터페이스 정의
- `isFirebaseConfigured()` 자동 감지 로직:
  - 설정 있음: Firestore 실시간 리스너(`onSnapshot`)로 다중 기기 실시간 동기화
  - 설정 없음: LocalStorage 및 인메모리 반응형 Mock 상태로 동작하여 **별도 설정 없이도 100% 완전 동작**

### 📌 Phase 3: 카카오맵 연동 및 게스트 1~2단계 UX
- `KakaoStoreMap.tsx`:
  - `https://dapi.kakao.com/v2/maps/sdk.js` 동적 스크립트 로드
  - 사용자 지정 카카오 JS 키가 있으면 실제 카카오맵 렌더링
  - 키가 없거나 실패 시 신촌/홍대/안암 거점의 벡터 인터랙티브 지도로 자동 전환되어 발표 차질 원천 차단
- `SlotPicker.tsx`:
  - 12개 슬롯 시각화 (예약 가능: 초록 / 보관 중: 회색 / 선택: 파랑)
  - 보관 기간(1~3일) 및 미개봉 시판 공산품 선택
  - **'리스크 0%' 5대 현실화 안전장치** 동의 체크박스 및 단위 경제성(Unit Economics) 실시간 계산

### 📌 Phase 4: QR 입출고 및 IoT 실시간 모니터링 (3~5단계 UX)
- `MobilePassModal.tsx`: SVG QR 코드 생성 및 6자리 PIN 코드 발급
- `SealingVerifier.tsx`: 항균 밀봉 봉투 및 영구 변색 온도 스티커 부착 AI 인증 시뮬레이션
- `IotTelemetryView.tsx`:
  - Chart.js 실시간 텔레메트리 (2.5초 주기 -18.5℃ ~ -19.2℃ 변동)
  - **이상 고온(-5℃) 시뮬레이션 버튼**: 클릭 시 즉시 경고창 및 현대해상 단기 특약 보험(최대 10만원 한도) 배상 절차 가동 시연

### 📌 Phase 5: 호스트 대시보드 (70% 정산) 및 현장 키오스크
- `HostDashboard.tsx`:
  - 12개 슬롯 온습도 및 보관자 현황 실시간 관제
  - **전기세 상쇄 효과 그래프**: 월 냉동고 전기세 18만 원 vs 보관료 70% 정산 수익 37.8만 원 비교 차트
  - 슬롯당 가동률 및 추가 매장 방문객 매출 지표 시각화
- `KioskTerminal.tsx`:
  - 24시 무인 매장 터치스크린 UI
  - PIN 키패드 입력 및 바코드 스캔 시 해당 슬롯 도어락 원격 오픈 시뮬레이션

### 📌 Phase 6: 과제 4단계 프레임워크 보고서 및 빌드 검증
- 교수님 제출 및 발표 평가 항목(트렌드 분석 → 기회 포착 → 비즈니스 모델 & 안전장치 & Unit Economics → 바이브 코딩 MVP)을 슬라이드 형태로 웹 내에 통합 제공
- 빌드 테스트 및 배포 준비
