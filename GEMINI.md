# KeepIn Cool (킵인쿨) - React & Firebase Architecture & Guidelines

## 1. 프로젝트 개요 (Overview)
- **프로젝트명**: KeepIn Cool (킵인쿨)
- **기술 스택**: **React 18, Tailwind CSS, Firebase (Cloud Firestore & Auth), Lucide, Chart.js**
- **비즈니스 정의**: 24시 무인 매장 및 동네 마트의 남는 유휴 냉동 슬롯을 활용한 미개봉 규격 식품 전용 단기(1~3일) 보관 중개 플랫폼
- **실행 환경**: 로컬 서버 `http://localhost:3000` (Python 런타임 내장 서버)

## 2. 핵심 아키텍처 및 Dual-Mode 데이터 계층
- **Dual-Mode Data Architecture**:
  - `src/firebase.js`: Firebase App, Cloud Firestore, Firebase Auth 연동 관리.
  - `src/storageService.js`: Firestore 연결 시 실시간 클라우드 DB 연동 + 미연결 시 즉시 시연 가능한 반응형 LocalStorage Mock 데이터 레이어 투명 스위칭.
  - 상단 내비게이션 바 우측 설정 버튼을 통해 Firebase 프로젝트 키를 실시간으로 입력/저장 가능.

## 3. 컴포넌트 구조 (`src/components/`)
- `Navbar.jsx`: 원클릭 Role Switcher (`게스트 6단계 UX` ↔ `현장 키오스크` ↔ `점주 B2B 대시보드` ↔ `4단계 과제 보고서` ↔ `예산 한끼`)
- `KakaoStoreMap.jsx`: 카카오맵 공식 Web SDK 연동 + API 키 미입력 시 자동 활성화되는 수도권 대학가 인터랙티브 벡터 맵 엔진 내장
- `SlotPicker.jsx`: 12개 냉동 슬롯 선택, 1~3일 기간 선택, 미개봉 공산품 엄격 규정, **5대 현실화 안전장치** 필수 동의, 단위 경제성(Unit Economics: 점주 70%, 플랫폼 20%, 보험 10%) 실시간 계산
- `MobilePassModal.jsx`: 모바일 패스 SVG QR 코드 및 6자리 PIN 발급, 매장 출입문 감지 시뮬레이션
- `SealingVerifier.jsx`: 플랫폼 전용 항균 밀봉 봉투 및 영구 변색 온도 센서 스티커(파란색) 부착 AI 무결성 검증
- `SlotDepositStep.jsx`: 스마트 슬롯 전자 도어락 원격 개방 및 문 닫힘 센서 트리거 시뮬레이션
- `IotTelemetryView.jsx`: Chart.js 기반 실시간 온도 텔레메트리 (2.5초 주기 갱신), **이상 고온(-5℃) 시뮬레이션 버튼**으로 300원 단기 특약 자동 보험(최대 10만원 한도) 프로세스 시연
- `CheckoutReceipt.jsx`: 콜드체인 무결성 확인 및 호스트 점주 70% 정산 완료 영수증
- `HostDashboard.jsx`: 12개 슬롯 관제, **전기세 18만원 대비 보관 정산 37.8만원(100% 전기세 상쇄 + 19.8만원 순익) 비교 바 차트**
- `KioskTerminal.jsx`: 24시 무인 매장 풀스크린 다크 테마 터치스크린 및 가상 PIN 키패드
- `AcademicReport.jsx`: 대학 강의 4단계 프레임워크(트렌드 분석 → 기회 포착 → 비즈니스 모델 설계 → 바이브 코딩 MVP) 슬라이드형 기획서
- `BudgetFoodView.jsx`: [참조 과제] 예산 중심형 음식 추천 플랫폼 (예산 슬라이더, 꿀조합 피드, 영수증 인증 모달)

## 4. 실행 및 배포
- **로컬 서버**: `http://localhost:3000`
- **배치 파일**: `run.bat` (더블 클릭 시 자동 서버 구동 및 브라우저 오픈)
