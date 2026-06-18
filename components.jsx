/* ============================================================
   components.jsx — web shell bits + single festive hero (window)
   ============================================================ */
const { useState: useCS, useEffect: useCE, useRef: useCR } = React;

/* ---------- icons ---------- */
const IcoBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IcoArrow = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IcoMobile = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="mobTile" x1="6" y1="6" x2="50" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#E4EEFF"/><stop offset="1" stopColor="#CFE0FB"/>
      </linearGradient>
      <linearGradient id="mobBody" x1="20" y1="13" x2="36" y2="43" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7FB4FF"/><stop offset="1" stopColor="#3D7EEA"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="46" height="46" rx="15" fill="url(#mobTile)"/>
    <rect x="20" y="13" width="16" height="30" rx="5" fill="url(#mobBody)"/>
    <rect x="25" y="16.5" width="6" height="2" rx="1" fill="#fff" opacity="0.85"/>
    <rect x="23.5" y="25" width="9" height="9" rx="2.8" fill="#fff"/>
    <path d="M26 32v-3.8c0-.42.5-.6.78-.29L28 29.4l1.22-1.49c.27-.31.78-.13.78.29V32"
      stroke="#3D7EEA" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoInternet = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="netTile" x1="6" y1="6" x2="50" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ECE9FF"/><stop offset="1" stopColor="#D9D3FB"/>
      </linearGradient>
      <linearGradient id="netScreen" x1="14" y1="12" x2="42" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9B8DF5"/><stop offset="1" stopColor="#6E5FDD"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="46" height="46" rx="15" fill="url(#netTile)"/>
    <rect x="14" y="16" width="28" height="20" rx="5.5" fill="url(#netScreen)"/>
    <rect x="25.5" y="36" width="5" height="4.5" fill="url(#netScreen)"/>
    <rect x="19.5" y="40" width="17" height="3.2" rx="1.6" fill="url(#netScreen)"/>
    <path d="M21.5 24.5c4-3.6 9-3.6 13 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24.4 27.8c2.2-1.95 5-1.95 7.2 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="28" cy="31.2" r="1.6" fill="#fff"/>
  </svg>
);
const IcoChevR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IcoSoccer = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="21" fill="#fff" stroke="#1a1a1e" strokeWidth="1.4"/>
    <path d="M24 13.5l6 4.4-2.3 7.1h-7.4L18 17.9 24 13.5z" fill="#1a1a1e"/>
    <path d="M24 13.5V7.5M30 17.9l5-2.6M27.7 25l4.5 4M20.3 25l-4.5 4M18 17.9l-5-2.6" stroke="#1a1a1e" strokeWidth="1.4" strokeLinecap="round"/>
    <g fill="#1a1a1e">
      <circle cx="24" cy="6.4" r="2.3"/><circle cx="36.2" cy="14.2" r="2.3"/>
      <circle cx="33.2" cy="30.2" r="2.3"/><circle cx="14.8" cy="30.2" r="2.3"/><circle cx="11.8" cy="14.2" r="2.3"/>
    </g>
  </svg>
);
/* small honor-ribbon nod (subtle 호국보훈 accent) */
const HonorMark = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <path d="M60 30c-7-12-30-11-30 9 0 16 22 28 30 38 8-10 30-22 30-38 0-20-23-21-30-9z" fill="#2f74c0" stroke="#12305f" strokeWidth="3" strokeLinecap="round"/>
    <path d="M48 78l-5 30 17-9 17 9-5-30" stroke="#cf2b3a" strokeWidth="5" strokeLinejoin="round" fill="#fff"/>
    <circle cx="60" cy="55" r="7" fill="#12305f"/>
  </svg>
);

/* ---------- placeholder visuals ---------- */
const PhoneMock = ({ tone, island, w }) => (
  <div className={"phone-mock" + (island ? " phone-mock--island" : "")} style={{ background: tone.body, width: w }}>
    <div style={{ position: "absolute", inset: 5, borderRadius: 13, background: tone.screen }} />
    {!island && <div className="phone-mock__cam" />}
  </div>
);
const RouterMock = () => <div className="router-mock"><b /><em /><i /></div>;
const VoucherMock = () => <div className="voucher-mock" />;

/* ---------- confetti ---------- */
const CONFETTI = [
  { l: "10%", t: "10%", c: "#ffd24d", r: -18 }, { l: "30%", t: "6%", c: "#ff8fc4", r: 24 },
  { l: "54%", t: "12%", c: "#7ec8ff", r: 10 }, { l: "74%", t: "8%", c: "#ffd24d", r: -30 },
  { l: "88%", t: "22%", c: "#ff5fae", r: 16 }, { l: "20%", t: "30%", c: "#7ec8ff", r: 30 },
  { l: "64%", t: "28%", c: "#ffd24d", r: -22 }, { l: "44%", t: "20%", c: "#ff8fc4", r: 18 },
];
const Confetti = () => (
  <div className="confetti">
    {CONFETTI.map((c, i) => (
      <span key={i} style={{ left: c.l, top: c.t, background: c.c, transform: `rotate(${c.r}deg)` }} />
    ))}
  </div>
);

/* ============================================================
   Hero — single festive banner (real 3D cutout assets)
   ============================================================ */
function Hero({ onCta }) {
  return (
    <div className="hero">
      <img className="hero__bg" src="hero-banner.png" alt="2026 세계 축구대회 & 호국보훈의 달 기념 페스티벌" />
      <div className="hero__inner">
        <div className="hero__text">
          <span className="hero__tag">U+ 6월 페스티벌</span>
          <h1 className="hero__title">
            <span className="hl-pink">세계 축구대회</span> &amp;<br />
            <span className="hl-navy">호국 보훈의 달</span> 기념 페스티벌
          </h1>
          <p className="hero__sub">온 국민이 함께하는 6월, U+가 준비한 특별 혜택을 만나보세요.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- crumb / step bar ---------- */
function CrumbBar({ onBack, step }) {
  const labels = ["상품 선택", "유형 선택", "상품 보기"];
  return (
    <div className="crumb">
      <button className="crumb__back" onClick={onBack}><IcoBack /> 이전</button>
      <span className="crumb__spacer" />
      <div className="crumb__steps">
        {labels.map((l, idx) => (
          <React.Fragment key={l}>
            {idx > 0 && <span className="crumb__line" />}
            <span className={"crumb__step" + (idx <= step ? " is-on" : "")}>
              <span className="crumb__num">{idx + 1}</span>{l}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- subtle inner-page background (월드컵 + 호국보훈) ---------- */
function InnerBg() {
  return (
    <div className="inner-bg" aria-hidden="true">
      <img className="inner-bg__img" src="inner-bg.png" alt="" />
    </div>
  );
}

/* ---------- store finder (custom, replaces external iframe) ---------- */
function StoreFinder() {
  const regions = window.STORE_REGIONS;
  const def = window.STORE_DEFAULT;
  const [sido, setSido] = useCS(def.sido);
  const guguns = Object.keys(regions[sido] || {});
  const [gugun, setGugun] = useCS(def.gugun);
  const [q, setQ] = useCS("");

  const onSido = (v) => { setSido(v); setGugun(Object.keys(regions[v])[0]); setQ(""); };
  let list = (regions[sido] && regions[sido][gugun]) || [];
  const kw = q.trim();
  if (kw) list = list.filter((s) => s.name.includes(kw) || s.addr.includes(kw));

  const mapHref = (addr) => "https://map.naver.com/v5/search/" + encodeURIComponent(addr);

  return (
    <div className="finder">
      <div className="finder__filters">
        <label className="finder__field">
          <span className="finder__label">시 / 도</span>
          <select className="finder__select" value={sido} onChange={(e) => onSido(e.target.value)}>
            {Object.keys(regions).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="finder__field">
          <span className="finder__label">시 / 군 · 구</span>
          <select className="finder__select" value={gugun} onChange={(e) => { setGugun(e.target.value); setQ(""); }}>
            {guguns.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
        <label className="finder__field finder__field--grow">
          <span className="finder__label">매장명 검색</span>
          <input className="finder__select" type="text" value={q} placeholder="매장명 또는 주소"
            onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      <div className="finder__resulthead">
        <b>{gugun}</b> · 총 <b className="finder__count">{list.length}</b>개 매장
      </div>

      <div className="finder__list">
        {list.length === 0 && (
          <div className="finder__empty">검색 결과가 없습니다. 다른 지역이나 키워드로 찾아보세요.</div>
        )}
        {list.map((s, i) => (
          <div className="storecard" key={s.name}>
            <span className="storecard__num">{i + 1}</span>
            <div className="storecard__body">
              <div className="storecard__name">{s.name} <span className="storecard__chip">직영점</span></div>
              <div className="storecard__addr">{s.addr}</div>
            </div>
            <div className="storecard__actions">
              <a className="storebtn storebtn--ghost" href={mapHref(s.addr)} target="_blank" rel="noopener">길찾기</a>
              <a className="storebtn storebtn--key" href="https://pf.kakao.com/_XlbVX/chat" target="_blank" rel="noopener">방문예약</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  IcoBack, IcoArrow, IcoMobile, IcoInternet, IcoChevR, IcoSoccer, Trophy: HonorMark,
  PhoneMock, RouterMock, VoucherMock, Hero, CrumbBar, InnerBg, StoreFinder,
});