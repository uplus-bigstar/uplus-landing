/* ============================================================
   app.jsx — web shell, router, tweaks, mount
   ============================================================ */
const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "season": "조화",
  "keyColor": "#FF2E98"
}/*EDITMODE-END*/;

function WebHeader({ onHome }) {
  return (
    <header className="web-header">
      <div className="web-header__inner">
        <img className="web-header__logo" src="u-logo.png" alt="U+" style={{ cursor: "pointer" }} onClick={onHome} />
        <span className="web-header__spacer" />
        <div className="web-header__actions">
          <button className="hbtn hbtn--dark" onClick={() => window.open("https://www.lguplus.com/support/store-address", "_blank", "noopener")}>매장방문 예약</button>
          <button className="hbtn" onClick={() => window.open("https://pf.kakao.com/_XlbVX/chat", "_blank", "noopener")}>상담 예약</button>
        </div>
      </div>
    </header>
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

  const [stack, setStack] = useS([{ screen: "landing", ctx: {} }]);
  const cur = stack[stack.length - 1];
  const go = (screen, ctx = {}) => { setStack((s) => [...s, { screen, ctx }]); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const home = () => setStack([{ screen: "landing", ctx: {} }]);

  useE(() => { window.scrollTo(0, 0); }, [stack.length]);

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

  const props = { preset, go, back, ctx: cur.ctx, onOrder, onCta };
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
      <WebHeader onHome={home} />
      {cur.screen !== "landing" && <InnerBg />}
      <main className="app-main">{view}</main>
      <WebFooter />
      <div className={"toast" + (toast ? " is-on" : "")}>{toast}</div>

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
