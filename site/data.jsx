/* ============================================================
   data.jsx — product + theme data (exported to window)
   Prices/specs reproduced from the attached reference cards.
   ============================================================ */

// Mobile phone products (from reference image #3)
const MOBILE_PRODUCTS = [
  {
    id: "s26ultra",
    img: "assets/phone-s26ultra.png",
    hot: true,
    tagline: "강력한 프라이버시 기능",
    name: "갤럭시 S26 Ultra",
    caps: ["256GB", "1TB"],
    capOn: 0,
    colors: ["#f2f1ee", "#5b5f74", "#aec6e0", "#2c3550"],
    tone: { body: "linear-gradient(150deg,#7d6fb0,#5a4f86)", screen: "linear-gradient(160deg,#b9a8e8,#7d63c9)" },
    plan: "데이터플랜MAX",
    rows: [
      { k: "정상가", v: "1,797,400원" },
      { k: "휴대폰할인", v: "총 -575,000원", disc: true },
      { k: "휴대폰", v: "월 54,120원" },
      { k: "통신요금", v: "월 79,750원" },
    ],
    total: "133,870원",
  },
  {
    id: "s26plus",
    img: "assets/phone-s26plus.png",
    hot: false,
    tagline: "편리한 포토 어시스트",
    name: "갤럭시 S26+",
    caps: ["256GB", "512GB"],
    capOn: 1,
    colors: ["#f2f1ee", "#5b5f74", "#aec6e0", "#23252b"],
    tone: { body: "linear-gradient(150deg,#3a3a42,#1c1c22)", screen: "linear-gradient(160deg,#5b5e6b,#2a2c34)" },
    plan: "데이터플랜MAX",
    rows: [
      { k: "정상가", v: "1,705,000원" },
      { k: "휴대폰할인", v: "총 -575,000원", disc: true },
      { k: "휴대폰", v: "월 50,030원" },
      { k: "통신요금", v: "월 79,750원" },
    ],
    total: "129,780원",
  },
  {
    id: "s26",
    img: "assets/phone-s26.png",
    hot: true,
    tagline: "혁신적인 에이전틱 AI",
    name: "갤럭시 S26",
    caps: ["256GB", "512GB"],
    capOn: 0,
    colors: ["#f2f1ee", "#5b5f74", "#aec6e0", "#23252b"],
    tone: { body: "linear-gradient(150deg,#eef0f3,#d2d6dd)", screen: "linear-gradient(160deg,#eef1f6,#cfd6e2)" },
    plan: "데이터플랜MAX",
    rows: [
      { k: "정상가", v: "1,254,000원" },
      { k: "휴대폰할인", v: "총 -575,000원", disc: true },
      { k: "휴대폰", v: "월 30,060원" },
      { k: "통신요금", v: "월 79,750원" },
    ],
    total: "109,810원",
  },
  {
    id: "iphone17e",
    img: "assets/phone-17e.png",
    hot: false,
    tagline: "기능과 실속 모두 가득",
    name: "iPhone 17e",
    caps: ["128GB", "256GB"],
    capOn: 0,
    colors: ["#f4d8df", "#f2f1ee", "#23252b"],
    tone: { body: "linear-gradient(150deg,#eef0f3,#d2d6dd)", screen: "linear-gradient(160deg,#f3e5e9,#e2c7d2)" },
    plan: "데이터플랜MAX",
    rows: [
      { k: "정상가", v: "1,602,920원" },
      { k: "휴대폰할인", v: "총 -575,000원", disc: true },
      { k: "휴대폰", v: "월 42,830원" },
      { k: "통신요금", v: "월 79,750원" },
    ],
    total: "122,580원",
  },
];

// Internet products (from reference image #4)
const INTERNET_PRODUCTS = [
  {
    id: "combo200",
    badge: { t: "최저요금", c: "teal" },
    headline: "부담 없는 요금으로 가볍게!",
    net: "200M", netUnit: "bps", netPlan: "와이파이기본\n안심 200M",
    iptvCh: "217", iptvPlan: "실속형",
    was: "월 40,700원",
    price: "월 29,730원",
    voucher: "25만원",
  },
  {
    id: "combo500",
    badge: { t: "가장인기", c: "hot" },
    headline: "가장 많은 고객이 선택!",
    net: "500M", netUnit: "bps", netPlan: "와이파이기본\n기가슬림안심 500M",
    iptvCh: "252", iptvPlan: "프리미엄",
    was: "월 51,700원",
    price: "월 26,950원",
    voucher: "35만원",
  },
  {
    id: "combo1g",
    badge: { t: "최대혜택", c: "key" },
    headline: "고사양 게임을 가장 빠르게",
    net: "1G", netUnit: "bps", netPlan: "와이파이기본\n기가안심 1G",
    iptvCh: "257", iptvPlan: "프리미엄 VOD",
    was: "월 62,700원",
    price: "월 29,700원",
    voucher: "38만원",
  },
];

// Internet selection cards (labels confirmed by user)
const INTERNET_CHOICES = [
  { id: "allinone", label: "올인원 요금제", desc: "모바일과 함께 묶어 인터넷 무료", badge: "결합 추천" },
  { id: "smart", label: "스마트 인터넷", desc: "인터넷 단독으로 합리적인 가입", badge: "단독 추천" },
];

/* season accent presets — key color stays #FF2E98, secondary shifts */
const SEASON_PRESETS = {
  "조화":   { accent: "#12305f", soft: "#eef3fb", motif: "both",
              tag: "6월 시즌 혜택",
              title: "온 국민이 하나 되는 6월",
              sub: "월드컵 시즌부터 호국보훈의 달까지, U+가 함께합니다." },
  "월드컵": { accent: "#1f8a4d", soft: "#eaf6ef", motif: "cup",
              tag: "2026 월드컵 시즌",
              title: "대한민국, 다시 하나로",
              sub: "월드컵의 함성과 함께 시작하는 U+ 6월 혜택." },
  "호국보훈": { accent: "#12305f", soft: "#eef2f8", motif: "ribbon",
              tag: "6월 호국보훈의 달",
              title: "기억합니다, 감사합니다",
              sub: "나라를 위한 마음을 기리는 U+ 6월 혜택." },
};

/* hero carousel slides — blends 월드컵 + 호국보훈 + 제품 (image #1 layout, #2 vibe) */
const HERO_SLIDES = [
  {
    id: "cup", theme: "cup",
    tag: "2026 월드컵 시즌",
    titleHtml: '<span class="hl-pink">6월</span> 유플투쁠',
    subHtml: '11시에 울리는 혜택 <b class="hl-pink">kick-off.</b>',
    date: null,
  },
  {
    id: "honor", theme: "honor",
    tag: "6월 호국보훈의 달",
    titleHtml: "국민과 함께,<br/>U+ 감사 페스티벌",
    subHtml: "나라를 위한 마음을 기리는 6월 감사 혜택",
    date: "2026. 06. 06 ~ 06. 30",
  },
  {
    id: "galaxy", theme: "galaxy",
    tag: "갤럭시 S26 시리즈",
    titleHtml: "갤럭시 사면<br/>디지털 온누리상품권 혜택",
    subHtml: "갤럭시 스마트폰에 워치 or 버즈 더블 혜택까지",
    date: null,
  },
];

Object.assign(window, {
  MOBILE_PRODUCTS,
  INTERNET_PRODUCTS,
  INTERNET_CHOICES,
  SEASON_PRESETS,
  HERO_SLIDES,
});
