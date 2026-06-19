/* ============================================================
   app.jsx — web shell, router, tweaks, mount
   ============================================================ */
const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "season": "조화",
  "keyColor": "#FF2E98"
}/*EDITMODE-END*/;

function WebHeader({ onHome, onStore }) {
  return (
    <header className="web-header">
      <div className="web-header__inner">
        <div className="web-header__brand" onClick={onHome}>
          <img className="web-header__logo" src="u-logo.png" alt="U+" />
          <span className="web-header__partner">공식 인증 파트너</span>
        </div>
        <span className="web-header__spacer" />
        <div className="web-header__actions">
          <button className="hbtn hbtn--dark" onClick={onStore}>매장방문 예약</button>
          <button className="hbtn" onClick={() => window.open("https://pf.kakao.com/_XlbVX/chat", "_blank", "noopener")}>상담 예약</button>
        </div>
      </div>
    </header>
  );
}

const STORE_URL = "https://www.lguplus.com/support/store-address";
function StoreModal({ onClose }) {
  useE(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal__bar">
          <span className="modal__title">매장방문 예약 · 매장 찾기</span>
          <button className="modal__close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        <div className="modal__body modal__body--finder">
          <StoreFinder />
        </div>
      </div>
    </div>
  );
}

function EventModal({ url, title, wide, onClose }) {
  const [blocked, setBlocked] = useS(false);
  const loaded = useR(false);
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches;
  const src = (isMobile && url === "samsung-event.html") ? "samsung-event-m.html" : url;
  useE(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => { if (!loaded.current) setBlocked(true); }, 3500);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; clearTimeout(t); };
  }, []);
  return (
    <div className="modal" onClick={onClose}>
      <div className={"modal__panel " + (wide ? "modal__panel--wide" : "modal__panel--narrow")} onClick={(e) => e.stopPropagation()}>
        <div className="modal__bar">
          <span className="modal__title">{title}</span>
          <div className="modal__bar-actions">
            <a className="modal__open" href={url} target="_blank" rel="noopener">새 탭에서 열기 ↗</a>
            <button className="modal__close" onClick={onClose} aria-label="닫기">✕</button>
          </div>
        </div>
        <div className="modal__body">
          <iframe className="modal__frame" src={src} title={title}
            onLoad={() => { loaded.current = true; }} />
          {blocked && (
            <div className="modal__fallback">
              <p className="modal__fallback-t">이 페이지는 보안 정책상 팝업 안에서 열리지 않을 수 있어요.</p>
              <p className="modal__fallback-s">아래 버튼으로 페이지를 새 탭에서 열어주세요.</p>
              <a className="btn btn--key-fill" style={{ width: "auto", padding: "13px 26px" }} href={url} target="_blank" rel="noopener">새 탭에서 열기 ↗</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WebFooter() {
  return (
    <footer className="web-footer">
      <div className="web-footer__inner">
        <img src="u-logo.png" alt="U+" />
        <span>본 페이지는 시안용 예시이며, 월 요금·혜택은 부가세 포함 / 가입 조건에 따라 달라질 수 있습니다.</span>
      </div>
    </footer>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const preset = (window.SEASON_PRESETS[t.season] || window.SEASON_PRESETS["조화"]);

  const [storeOpen, setStoreOpen] = useS(false);
  const [linkModal, setLinkModal] = useS(null);
  const [stack, setStack] = useS([{ screen: "landing", ctx: {} }]);
  const cur = stack[stack.length - 1];
  const go = (screen, ctx = {}) => { setStack((s) => [...s, { screen, ctx }]); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const home = () => setStack([{ screen: "landing", ctx: {} }]);

  useE(() => { window.scrollTo(0, 0); }, [stack.length]);

  useE(() => {
    const onMsg = (e) => {
      if (e.data && e.data.uplus === "goCarrier") {
        setLinkModal(null);
        setStack((s) => [...s, { screen: "carrier", ctx: {} }]);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const [toast, setToast] = useS("");
  const toastTimer = useR(null);
  const onOrder = (label) => {
    window.open("https://pf.kakao.com/_XlbVX/chat", "_blank", "noopener");
  };
  const onCta = () => {
    const el = document.getElementById("funnel");
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  useE(() => { document.documentElement.style.setProperty("--key", t.keyColor); }, [t.keyColor]);
  useE(() => {
    document.documentElement.style.setProperty("--accent", preset.accent);
    document.documentElement.style.setProperty("--accent-soft", preset.soft);
  }, [preset]);

  const props = { preset, go, back, ctx: cur.ctx, onOrder, onCta,
    onEvent: () => setLinkModal({ url: "https://www.uplusevent.co.kr/visit?utm_source=lgupluscom", title: "U+ 6월 페스티벌 이벤트" }),
    onLink: (url, title, wide) => setLinkModal({ url, title, wide }),
    onStore: () => setStoreOpen(true) };
  let view = null;
  switch (cur.screen) {
    case "landing":        view = <LandingScreen {...props} />; break;
    case "carrier":        view = <CarrierScreen {...props} />; break;
    case "mobileProducts": view = <MobileProductsScreen {...props} />; break;
    case "netSelect":      view = <InternetSelectScreen {...props} />; break;
    case "netProducts":    view = <InternetProductsScreen {...props} />; break;
    default:               view = <LandingScreen {...props} />;
  }

  return (
    <div>
      <WebHeader onHome={home} onStore={() => setStoreOpen(true)} />
      {cur.screen !== "landing" && <InnerBg />}
      <main className="app-main">{view}</main>
      <WebFooter />
      <div className={"toast" + (toast ? " is-on" : "")}>{toast}</div>
      {storeOpen && <StoreModal onClose={() => setStoreOpen(false)} />}
      {linkModal && <EventModal url={linkModal.url} title={linkModal.title} wide={linkModal.wide} onClose={() => setLinkModal(null)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="6월 시즌 테마" />
        <TweakRadio label="포인트 강조" value={t.season}
          options={["조화", "월드컵", "호국보훈"]}
          onChange={(v) => setTweak("season", v)} />
        <TweakSection label="브랜드" />
        <TweakColor label="키 컬러" value={t.keyColor}
          options={["#FF2E98", "#E6007E", "#7A2FE0", "#0B7BD4"]}
          onChange={(v) => setTweak("keyColor", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
