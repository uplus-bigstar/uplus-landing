/* ============================================================
   screens.jsx — landing, carrier, mobile products (web)
   ============================================================ */
const { useState: useScS } = React;

/* ============ 1. Landing = hero + funnel ============ */
function LandingScreen({ go, onCta, onEvent }) {
  return (
    <div>
      <Hero onCta={onCta} navTo={go} onEvent={onEvent} />
      <section id="funnel" className="section">
        <div className="container">
          <div className="step-head">
            <span className="eyebrow">STEP 1 · 상품 선택</span>
            <h2 className="step-head__q">어떤 상품에 관심이 있으신가요?</h2>
            <p className="step-head__sub">관심 상품을 고르면 나에게 딱 맞는 <span className="br-m"></span>6월 혜택을 추천해 드려요.</p>
          </div>
          <div className="choices choices--wide">
            <button className="choice" onClick={() => go("carrier")}>
              <span className="choice__arrow"><IcoArrow /></span>
              <span className="choice__ico"><IcoMobile /></span>
              <span>
                <span className="choice__label">모바일</span>
                <span className="choice__desc">휴대폰 구매 · 요금제 가입</span>
              </span>
            </button>
            <button className="choice" onClick={() => go("netSelect")}>
              <span className="choice__arrow"><IcoArrow /></span>
              <span className="choice__ico"><IcoInternet /></span>
              <span>
                <span className="choice__label">인터넷</span>
                <span className="choice__desc">인터넷 · 결합 가입</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============ 2. Mobile carrier select ============ */
function CarrierScreen({ go, back }) {
  return (
    <div>
      <CrumbBar onBack={back} step={1} />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="step-head">
            <span className="eyebrow">STEP 2 · 모바일</span>
            <h2 className="step-head__q">현재 사용 중인<span className="br-m"></span>통신사는 어디인가요?</h2>
            <p className="step-head__sub">사용 중인 통신사에 맞춰 <span className="br-m"></span>가입 방법과 추천 단말을 안내해 드려요.</p>
          </div>
          <div className="choices choices--wide">
            <button className="choice carrier" onClick={() => go("mobileProducts", { carrier: "U+" })}>
              <span className="choice__badge">그대로 쓰기</span>
              <span className="carrier__logo"><img src="u-logo.png" alt="U+" style={{ height: 34 }} /></span>
              <span>
                <span className="carrier__name">U+ 사용 중</span>
                <span className="carrier__note">기기변경 · 재약정</span>
              </span>
            </button>
            <button className="choice carrier" onClick={() => go("mobileProducts", { carrier: "타사" })}>
              <span className="choice__badge">U+로 갈아타기</span>
              <span className="carrier__logo carrier__logo--others">
                <b className="lc-skt">SK<i>telecom</i></b>
                <span className="carrier__logo-chip"><img src="kt-logo.png" alt="KT" /></span>
              </span>
              <span>
                <span className="carrier__name">타 통신사 사용 중</span>
                <span className="carrier__note">SKT · KT · 알뜰폰</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============ 3. Mobile products ============ */
function MobilePCard({ p, onOrder, onStore }) {
  const [capOn, setCapOn] = useScS(p.capOn);
  return (
    <div className="pcard">
      <div className="pcard__topbadges">{p.hot && <span className="badge badge--hot">인기</span>}</div>
      <div className="pcard__media">
        {p.img
          ? <img className="pcard__photo" src={p.img} alt={p.name} />
          : <PhoneMock tone={p.tone} island={p.island} />}
      </div>
      <div className="pcard__cap">{p.tagline}</div>
      <div className="pcard__name">{p.name}</div>
      <div className="chips">
        {p.caps.map((c, i) => (
          <button key={c} className={"chip" + (i === capOn ? " is-on" : "")} onClick={() => setCapOn(i)}>{c}</button>
        ))}
      </div>
      <div className="colors">
        {p.colors.map((c, i) => <span key={i} className="colors__dot" style={{ background: c }} />)}
      </div>
      <div className="plan-name">{p.plan}</div>
      <div className="prices">
        {p.rows.map((r, i) => (
          <div className="price-row" key={i}>
            <span className={"price-row__k" + (r.disc ? " is-disc" : "")}>{r.k}</span>
            <span className={"price-row__v" + (r.disc ? " is-disc" : "")}>{r.v}</span>
          </div>
        ))}
      </div>
      <div className="total"><span className="total__label">월</span><span className="total__v">{p.total}</span></div>
      <button className="btn btn--key-outline" onClick={() => onOrder(p.name)}>카카오톡 상담하기</button>
      <button className="btn btn--ghost pcard__storebtn" onClick={() => onStore && onStore()}>매장방문 예약하기</button>
    </div>
  );
}

function MobileProductsScreen({ ctx, back, onOrder, onStore }) {
  const carrier = ctx.carrier || "U+";
  return (
    <div>
      <CrumbBar onBack={back} step={2} />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="products-head">
            <span className="products-head__t">{carrier === "U+" ? "U+ 추천 상품" : "타사 → U+ 추천 상품"}</span>
            <span className="products-head__c">데이터플랜MAX 기준 · {MOBILE_PRODUCTS.length}개 단말</span>
          </div>
          {carrier === "타사" && (
            <div className="notice"><IcoArrow /> 번호이동 시 추가 전환지원금까지 함께 받을 수 있어요.</div>
          )}
          <div className="pgrid pgrid--4">
            {MOBILE_PRODUCTS.map((p) => <MobilePCard key={p.id} p={p} onOrder={onOrder} onStore={onStore} />)}
          </div>
          <p className="note">월 납부금액은 데이터플랜MAX, 24개월 할부 기준 예상 금액입니다. 실제 금액은 가입 조건에 따라 달라질 수 있습니다.</p>
        </div>
      </section>
    </div>
  );
}

window.LandingScreen = LandingScreen;
window.CarrierScreen = CarrierScreen;
window.MobileProductsScreen = MobileProductsScreen;
