/* ============================================================
   screens2.jsx — internet select + internet products (web)
   ============================================================ */

/* ============ 4. Internet select ============ */
function InternetSelectScreen({ go, back }) {
  return (
    <div>
      <CrumbBar onBack={back} step={1} />
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="step-head">
            <span className="eyebrow">STEP 2 · 인터넷</span>
            <h2 className="step-head__q">어떤 방식으로 가입할까요?</h2>
            <p className="step-head__sub">추천 유형을 고르면 딱 맞는 인터넷 상품을 보여드려요. U+ 신규·타사 전환 모두 가능합니다.</p>
          </div>
          <div className="choices choices--wide">
            {INTERNET_CHOICES.map((c) => (
              <button key={c.id} className="choice" onClick={() => go("netProducts", { kind: c.id })}>
                <span className="choice__arrow"><IcoArrow /></span>
                <span className="choice__badge">{c.badge}</span>
                <span>
                  <span className="choice__label">{c.label}</span>
                  <span className="choice__desc">{c.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============ 5. Internet products ============ */
function InternetCard({ p, onOrder, onStore }) {
  return (
    <div className="icard">
      <div className="pcard__topbadges" style={{ flexWrap: "wrap", gap: 6 }}>
        <span className={"badge badge--" + p.badge.c}>{p.badge.t}</span>
        <span className="badge badge--blue">{p.net + " + IPTV " + p.iptvCh + "채널"}</span>
      </div>
      <span className="icard__plan">{p.netPlan.replace("\n", " ") + " + IPTV " + p.iptvPlan}</span>
      <h3 className="icard__head">{p.headline}</h3>

      <p className="icard__disc-label">월 이용요금 (3년 약정) → 총 납부금액 ↓</p>
      <div className="icard__price">
        <b>{p.price}</b><span className="tri">◀</span><s>{p.was}</s>
      </div>

      <button className="btn btn--key-outline" onClick={() => onOrder("카카오톡 상담하기")}>카카오톡 상담하기</button>
      <button className="btn btn--ghost pcard__storebtn" onClick={() => onStore && onStore()}>매장방문 예약하기</button>

      <div className="benefit-row">
        <div className="benefit-row__k">혜택정보<small>(택1)</small></div>
        <div className="benefit-row__v">
          <VoucherMock />
          <div className="benefit-cap benefit-cap--hl"><b>상품권 {p.voucher}</b>증정</div>
        </div>
      </div>
      <div className="benefit-row">
        <div className="benefit-row__k">IPTV<span>(기본제공)</span></div>
        <div className="benefit-row__v">
          <div className="iptv-mock">{p.iptvCh}</div>
          <div className="benefit-cap"><b>{p.iptvPlan}</b>{p.iptvCh}채널</div>
        </div>
      </div>
      <div className="benefit-row">
        <div className="benefit-row__k">제공기기<span>(기본제공)</span></div>
        <div className="benefit-row__v">
          <RouterMock />
          <div className="benefit-cap"><b>WiFi 공유기</b></div>
        </div>
      </div>
    </div>
  );
}

function InternetProductsScreen({ ctx, back, onOrder, onStore }) {
  const choice = (INTERNET_CHOICES.find((c) => c.id === ctx.kind) || INTERNET_CHOICES[0]);
  return (
    <div>
      <CrumbBar onBack={back} step={2} />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="products-head">
            <span className="products-head__t">{choice.label} 추천 상품</span>
            <span className="products-head__c">온라인 단독 할인 · {INTERNET_PRODUCTS.length}개 상품</span>
          </div>
          <div className="pgrid pgrid--3">
            {INTERNET_PRODUCTS.map((p) => <InternetCard key={p.id} p={p} onOrder={onOrder} onStore={onStore} />)}
          </div>
          <p className="note">부가세 포함 금액이며, 혜택의 원정액은 3년 약정 기준, 상품의 이용요금은 이용기간 기준입니다.</p>
        </div>
      </section>
    </div>
  );
}

window.InternetSelectScreen = InternetSelectScreen;
window.InternetProductsScreen = InternetProductsScreen;
