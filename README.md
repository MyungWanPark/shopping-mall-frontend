# 🛍️ Shopping Mall - Frontend
온라인 쇼핑몰 프로젝트의 **프론트엔드** 파트 입니다. <br/>
실시간 상품 검색, 데이터 시각화, 장바구니, 페이지네이션, 상품 등록 등을 구현하였습니다. <br/>

## 🛠️ Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **UI Library**: MUI
- **Routing**: React Router Dom
- **State Management**: Redux
- **Network State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS
- **Charting**: ApexCharts
- **Deployment**: Netlify
<br/>
  
## 🚀 Key Features

### 🛍️ 상품 조회 및 생성
- **상품 목록 & 상세 페이지** – 상품 소개, 옵션 선택, 장바구니 추가  
- **상품 등록 UI** – 새로운 상품을 등록할 수 있는 관리자용 UI 구현
- **카테고리별 상품 조회** – 남성, 여성, 가방 등 카테고리별 필터링 지원  
- **실시간 상품 검색** – 키워드 입력 시 관련 상품을 실시간으로 필터링  

### 🛒 장바구니 기능
- **실시간 UI 동기화** – 장바구니 변경 시 네비게이션 바의 아이콘 숫자를 즉시 업데이트
- **비회원 장바구니 지원** – Redux와 LocalStorage를 활용해 로그인 없이도 장바구니 사용 가능  

### 📊 관리자 대시보드 & 시각화
- **매출 및 통계 시각화** – 기간별 매출, Top 5 인기 상품, 신규 유저 수 등 데이터 시각화  
- **ApexChart 기반 차트 구성**

### ⚡ 성능 & 사용자 경험 개선
- **Lazy Loading** – 초기 렌더링 속도를 개선하기 위해 코드 분할 적용  
- **React Query 캐싱** – 중복 네트워크 요청 방지 및 빠른 데이터 조회
- **Pagination** – 많은 양의 상품 데이터를 페이지 단위로 분할해 클라이언트 렌더링 속도 개선 및 서버/부하 감소  
- **Skeleton UI** – 로딩 시간 동안 사용자 피로감을 줄이기 위한 Skeleton 화면 제공  
- **반응형 UI** – 데스크탑, 태블릿, 모바일 환경에 최적화된 반응형 레이아웃  
<br/>

## 🔗 Related Repositories
- 🔙 **[Backend Repository](https://github.com/MyungWanPark/shopping-mall-backend)**
- 🏠 **[Main Repository (Full Documentation)](https://github.com/MyungWanPark/Online-Shopping-Mall)**
<br/>

## 💻 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MyungWanPark/shopping-mall-frontend.git
```

### 2️⃣ Install dependencies
```bash
cd shopping-mall-frontend
npm install
```

### 3️⃣ Run the application(개발 환경, .env 파일 필요)

```bash
npm run start
```
개발 모드 환경: http://localhost:3000 

