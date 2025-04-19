# 🛍️ Shopping Mall - Frontend
온라인 쇼핑몰 프로젝트의 **프론트엔드** 파트 입니다. <br/>
실시간 상품 검색, 데이터 시각화, 장바구니, 페이지네이션, 상품 등록 등을 구현하였습니다. <br/>

## 🚀 Features
✔ **실시간 상품 검색** - 검색창에 키워드 입력시, 연관된 상품을 실시간으로 조회, 연관된 상품 검색 <br/>
✔ **성능 최적화** - Lazy Loading을 활용한 초기 렌더링 속도 향상, React Query를 통한 API 요청 결과 캐싱으로 네트워크 요청 감소<br/>
✔ **데이터 시각화** - 기간별 매출액, Top 5 상품, 신규 유저 수 등을 차트로 시각화한 대시보드 <br/>
✔ **장바구니** - 장바구니에 추가한 상품을 관리, 수량 변경 및 상품 삭제, 총 금액 조회 기능 <br/>
✔ **비로그인 상태에서 장바구니 관리** - Redux, LocalStorage를 활용해 비로그인 상태에서 장바구니 저장 및 관리 <br/>
✔ **실시간 UI 동기화** - 장바구니에 상품 추가 및 삭제 시, 네비게이션 바의 장바구니 아이콘 숫자를 즉시 동기화 <br/>
✔ **Pagination** - 상품의 갯수가 10개 이상인 경우, 페이지 단위로 상품 조회 기능 <br/>
✔ **상품 상세 페이지** - 상품에 대한 자세한 소개, 상품 별 옵션 설정, 장바구니 추가 기능 <br/>
✔ **Skeleton UI** - 상품 로딩 시 Skeleton UI를 활용해 대기 시간동안 사용자 경험 향상 <br/>
✔ **카테고리별 상품 조회** - 남성, 여성, 가방 등 카테고리별 상품 조회 기능 <br/>
✔ **반응형 UI** - 데스크탑, 테블릿, 모바일 환경을 고려한 반응형 UI <br/>
<br/>

## 🛠️ Tech Stack

- **UI** - React, MUI <br/>
- **Language** - TypeScript  <br/>
- **네비게이션** - React Router Dom  <br/>
- **전역 상태 관리** - Redux  <br/>
- **네트워크 상태 관리** - Tanstack Query  <br/>
- **스타일링** - Tailwind CSS <br/> 
- **차트 라이브러리** - Apex Chart <br/>
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

