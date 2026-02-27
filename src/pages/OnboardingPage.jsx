import { useState } from "react";

const menuItems = [
  { emoji: "☕", name: "Espresso Classico", price: "₱199", active: true },
  { emoji: "🥛", name: "Oat Milk Latte",   price: "₱299" },
  { emoji: "🍫", name: "Mocha Noir",        price: "₱249" },
];

const perks = [
  { emoji: "🌸", title: "Earn Petals",   desc: "1 petal per ₱10 spent on any order",    grad: "linear-gradient(135deg,#E8587A,#C23B66)", shadow: "rgba(232,88,122,0.35)" },
  { emoji: "🎁", title: "Free Drinks",   desc: "Redeem 50 petals for your favourite drink", grad: "linear-gradient(135deg,#F4A7B9,#E8587A)", shadow: "rgba(244,167,185,0.3)" },
  { emoji: "⚡", title: "Skip the Line", desc: "Order ahead and pick up in 5 minutes",  grad: "linear-gradient(135deg,#FADADD,#F4A7B9)", shadow: "rgba(250,218,221,0.25)" },
];

function CupSVG() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none"
      style={{ filter: "drop-shadow(0 24px 48px rgba(196,59,102,0.28))", maxWidth: "100%" }}>
      {["M70 44 Q76 34 70 24", "M90 40 Q96 28 90 18", "M110 44 Q116 34 110 24"].map((d, i) => (
        <path key={i} d={d} stroke="#F4A7B9" strokeWidth="3" strokeLinecap="round" fill="none" opacity={i === 1 ? 1 : 0.7}>
          <animate attributeName="d"
            values={`${d};${d.replace("Q", "Q").replace(/Q(\d+)/, (_, n) => `Q${+n - 12}`)};${d}`}
            dur={`${1.8 + i * 0.35}s`} repeatCount="indefinite" />
        </path>
      ))}
      <ellipse cx="90" cy="148" rx="65" ry="10" fill="#F4A7B9" opacity="0.4" />
      <ellipse cx="90" cy="148" rx="50" ry="7"  fill="#E8587A" opacity="0.3" />
      <path d="M50 65 L60 148 H120 L130 65 Z" fill="url(#cg)" />
      <ellipse cx="90" cy="65" rx="40" ry="8"  fill="#F4A7B9" />
      <ellipse cx="90" cy="65" rx="36" ry="6"  fill="#C23B66" />
      <ellipse cx="90" cy="63" rx="28" ry="4"  fill="#FADADD" opacity="0.9" />
      <path d="M84 61 Q87 57 90 61 Q93 57 96 61 L90 67 Z" fill="#E8587A" />
      <path d="M130 85 Q152 85 152 110 Q152 135 130 135" stroke="#F4A7B9" strokeWidth="8" fill="none" strokeLinecap="round" />
      <defs>
        <linearGradient id="cg" x1="50" y1="65" x2="130" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8C9D4" />
          <stop offset="100%" stopColor="#E8587A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function OnboardingPage({ setPage }) {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);

  const advance = (next) => {
    setExiting(true);
    setTimeout(() => { setCurrent(next); setExiting(false); }, 300);
  };

  const handleCTA = () => {
    if (current < 2) { advance(current + 1); return; }
    setPage("register");
  };

  const isDark = current === 2;

  const slideStyle = {
    position: "absolute", inset: 0,
    opacity: exiting ? 0 : 1,
    transform: exiting ? "translateY(20px)" : "translateY(0)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    display: "flex", flexDirection: "column",
    overflowY: "auto",
  };

  return (
    <>
      {/* Inject responsive CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;600&display=swap');

        .ob-wrap {
          position: fixed; inset: 0; z-index: 999;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── Slide 0 ── */
        .ob-s0 {
          background: linear-gradient(160deg, #F7C5D0 0%, #fff0f3 60%);
        }
        .ob-s0-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          padding: 80px 48px 32px;
          flex: 1;
        }
        .ob-logo { width: 72px; height: 72px; background: #E8587A; border-radius: 22px; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 12px 32px rgba(232,88,122,0.4); }
        .ob-brand { font-family: 'Playfair Display', serif; font-size: 13px; letter-spacing: 3px; color: #9e6475; text-transform: uppercase; margin-top: 12px; }
        .ob-cup { margin: 40px 0 32px; }
        .ob-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4rem); line-height: 1.1; color: #3b1f27; margin: 0; }
        .ob-h1 em { color: #E8587A; font-style: italic; }
        .ob-sub { font-size: clamp(0.9rem, 1.5vw, 1.05rem); color: #9e6475; line-height: 1.7; margin-top: 18px; max-width: 500px; font-weight: 300; }

        /* ── Slide 1 ── */
        .ob-s1 { background: #fff; }
        .ob-s1-top {
          background: linear-gradient(135deg, #FCE4EC, #F8BBD9);
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          min-height: 340px; flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .ob-s1-top { min-height: 400px; }
        }
        .ob-float { position: absolute; color: #fff; font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 20px; }
        .ob-float-1 { background: #E8587A; top: 40px; right: 8%; box-shadow: 0 6px 20px rgba(232,88,122,0.4); }
        .ob-float-2 { background: #C23B66; bottom: 32px; left: 8%; box-shadow: 0 6px 20px rgba(194,59,102,0.4); }
        .ob-menu-card {
          background: #fff; border-radius: 20px; padding: 20px 24px;
          box-shadow: 0 16px 48px rgba(196,59,102,0.2);
          width: min(260px, 80%); position: relative; z-index: 1;
        }
        .ob-mc-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #9e6475; }
        .ob-mc-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #3b1f27; margin: 4px 0 12px; }
        .ob-mc-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: #fff5f7; margin-bottom: 8px; }
        .ob-mc-item:last-child { margin-bottom: 0; }
        .ob-mc-item.active { background: linear-gradient(135deg, #E8587A, #C23B66); }
        .ob-s1-body { padding: clamp(24px, 4vw, 48px); flex: 1; display: flex; flex-direction: column; }
        .ob-badge { display: inline-block; background: #FFE8EE; color: #E8587A; font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; margin-bottom: 14px; }
        .ob-h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); color: #3b1f27; line-height: 1.15; margin: 0; }
        .ob-h2 em { color: #E8587A; font-style: italic; }
        .ob-body-sub { font-size: clamp(0.85rem, 1.4vw, 1rem); color: #9e6475; line-height: 1.7; margin-top: 12px; font-weight: 300; max-width: 520px; }

        /* ── Slide 2 ── */
        .ob-s2 { background: #2A1520; }
        .ob-s2-top {
          background: linear-gradient(160deg, #3D1A2B, #2A1520);
          padding: clamp(60px, 10vw, 100px) clamp(28px, 6vw, 80px) 40px;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .ob-circle { position: absolute; border-radius: 50%; border: 1px solid rgba(244,167,185,0.12); }
        .ob-circle-1 { width: 400px; height: 400px; top: -160px; right: -120px; }
        .ob-circle-2 { width: 260px; height: 260px; top: -80px; right: -60px; }
        .ob-h2-dark { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); color: #fff; line-height: 1.15; margin: 0; position: relative; }
        .ob-h2-dark span { color: #F4A7B9; }
        .ob-s2-sub { font-size: clamp(0.85rem, 1.4vw, 1rem); color: #C8899A; line-height: 1.7; margin-top: 14px; font-weight: 300; position: relative; max-width: 520px; }
        .ob-perks { padding: clamp(20px, 3vw, 36px) clamp(28px, 6vw, 80px); display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .ob-perk-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(244,167,185,0.12); border-radius: 18px; padding: 18px 22px; display: flex; align-items: center; gap: 18px; }
        .ob-perk-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .ob-perk-title { font-size: 15px; font-weight: 600; color: #fff; }
        .ob-perk-desc  { font-size: 13px; color: #A07080; margin-top: 3px; }

        /* ── Bottom Bar ── */
        .ob-bottom {
          padding: clamp(16px, 2.5vw, 28px) clamp(28px, 6vw, 80px) clamp(24px, 4vw, 40px);
          flex-shrink: 0;
        }
        .ob-bottom-light { background: #fff; border-top: 1px solid rgba(194,86,107,0.08); }
        .ob-bottom-dark  { background: #2A1520; border-top: 1px solid rgba(244,167,185,0.08); }
        .ob-dots { display: flex; gap: 7px; justify-content: center; margin-bottom: 18px; }
        .ob-dot { height: 6px; width: 6px; border-radius: 3px; background: rgba(232,88,122,0.25); transition: width 0.4s, background 0.4s; cursor: default; }
        .ob-dot.active { width: 24px; background: #E8587A; }
        .ob-dot.past { cursor: pointer; }
        .ob-btn-primary {
          width: 100%; padding: 17px; border: none; border-radius: 16px;
          background: linear-gradient(135deg, #E8587A, #C23B66);
          color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 12px 32px rgba(232,88,122,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .ob-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(232,88,122,0.45); }
        .ob-btn-white {
          width: 100%; padding: 17px; border: none; border-radius: 16px;
          background: #fff; color: #3b1f27; font-size: 1rem; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 8px 28px rgba(0,0,0,0.2);
          transition: transform 0.15s;
        }
        .ob-btn-white:hover { transform: translateY(-2px); }
        .ob-btn-ghost {
          width: 100%; padding: 13px; background: transparent; border: none;
          color: #A07080; font-size: 0.88rem; cursor: pointer;
          font-family: 'DM Sans', sans-serif; margin-top: 8px;
        }
        .ob-btn-ghost:hover { color: #F4A7B9; }

        /* ── Skip ── */
        .ob-skip {
          position: fixed; top: 28px; right: 28px; z-index: 1000;
          background: rgba(255,255,255,0.75); backdrop-filter: blur(12px);
          border: none; border-radius: 20px; padding: 8px 18px;
          font-size: 13px; color: #9e6475; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, color 0.2s;
        }
        .ob-skip.dark { background: rgba(255,255,255,0.08); color: #A07080; }
        .ob-skip:hover { background: rgba(255,255,255,0.95); }

        /* ── Blobs (slide 0) ── */
        .ob-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .ob-blob-1 { width: 40vw; height: 40vw; max-width: 360px; max-height: 360px; background: #F4A7B9; opacity: 0.5; top: -10%; right: -8%; }
        .ob-blob-2 { width: 28vw; height: 28vw; max-width: 240px; max-height: 240px; background: #E8587A; opacity: 0.18; top: 35%; left: -8%; }

        /* ── Two-column layout on large screens for slides 0 & 1 ── */
        @media (min-width: 900px) {
          .ob-s0-inner {
            flex-direction: row; text-align: left; align-items: center;
            justify-content: center; gap: 80px;
            padding: 0 10%;
          }
          .ob-s0-left  { display: flex; flex-direction: column; align-items: flex-start; }
          .ob-s0-right { flex-shrink: 0; }
          .ob-sub { text-align: left; }

          .ob-s1 { flex-direction: row; }
          .ob-s1-top {
            width: 45%; min-height: 100vh !important; flex: none;
            border-radius: 0;
          }
          .ob-s1-body { justify-content: center; padding: 80px 8%; }

          .ob-s2 { flex-direction: row; }
          .ob-s2-top {
            width: 45%; min-height: 100vh !important; flex: none;
            display: flex; flex-direction: column; justify-content: center;
            padding: 80px 8%;
          }
          .ob-perks { justify-content: center; padding: 80px 8%; }
        }
      `}</style>

      <div className="ob-wrap">
        {/* Skip button */}
        {current < 2 && (
          <button className={`ob-skip${isDark ? " dark" : ""}`} onClick={() => setPage("home")}>
            Skip
          </button>
        )}

        {/* ── Slide 0: Welcome ── */}
        {current === 0 && (
          <div className="ob-s0" style={slideStyle}>
            <div className="ob-blob ob-blob-1" />
            <div className="ob-blob ob-blob-2" />
            <div className="ob-s0-inner" style={{ flex: 1 }}>
              <div className="ob-s0-left">
                <div className="ob-logo">☕</div>
                <span className="ob-brand">Coffeecient</span>
                <h1 className="ob-h1" style={{ marginTop: 28 }}>
                  Every sip<br />tells a <em>story.</em>
                </h1>
                <p className="ob-sub">
                  Handcrafted coffees, artisan pastries, and a warm corner of the world — all waiting for you at Coffeecient.
                </p>
              </div>
              <div className="ob-s0-right ob-cup">
                <CupSVG />
              </div>
            </div>
            <div className={`ob-bottom ob-bottom-light`}>
              <div className="ob-dots">
                {[0,1,2].map(i => <div key={i} className={`ob-dot${i === current ? " active" : i < current ? " past" : ""}`} onClick={() => i < current && advance(i)} />)}
              </div>
              <button className="ob-btn-primary" onClick={handleCTA}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Slide 1: Menu ── */}
        {current === 1 && (
          <div className="ob-s1" style={slideStyle}>
            <div className="ob-s1-top">
              <div className="ob-float ob-float-1">✨ Fan Favorite</div>
              <div className="ob-float ob-float-2">🔥 New Arrival</div>
              <div className="ob-menu-card">
                <div className="ob-mc-label">Today's Picks</div>
                <div className="ob-mc-title">Our Menu</div>
                {menuItems.map(item => (
                  <div key={item.name} className={`ob-mc-item${item.active ? " active" : ""}`}>
                    <span>{item.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: item.active ? "#fff" : "#3b1f27" }}>{item.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: item.active ? "#fff" : "#c2566b", marginLeft: "auto" }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ob-s1-body">
              <span className="ob-badge">Our Menu</span>
              <h2 className="ob-h2">Crafted with <em>heart</em> & bloom.</h2>
              <p className="ob-body-sub">From signature espressos to oat milk lattes — every cup is made to order, exactly the way you love it.</p>
            </div>
            <div className="ob-bottom ob-bottom-light">
              <div className="ob-dots">
                {[0,1,2].map(i => <div key={i} className={`ob-dot${i === current ? " active" : i < current ? " past" : ""}`} onClick={() => i < current && advance(i)} />)}
              </div>
              <button className="ob-btn-primary" onClick={handleCTA}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── Slide 2: Rewards ── */}
        {current === 2 && (
          <div className="ob-s2" style={slideStyle}>
            <div className="ob-s2-top">
              <div className="ob-circle ob-circle-1" />
              <div className="ob-circle ob-circle-2" />
              <h2 className="ob-h2-dark">Join <span>Coffeecient</span><br />Rewards ✦</h2>
              <p className="ob-s2-sub">Earn petals with every purchase. Redeem for free drinks, secret menu items, and early access to new arrivals.</p>
            </div>
            <div className="ob-perks">
              {perks.map(p => (
                <div key={p.title} className="ob-perk-card">
                  <div className="ob-perk-icon" style={{ background: p.grad, boxShadow: `0 8px 20px ${p.shadow}` }}>{p.emoji}</div>
                  <div>
                    <div className="ob-perk-title">{p.title}</div>
                    <div className="ob-perk-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ob-bottom ob-bottom-dark">
              <div className="ob-dots">
                {[0,1,2].map(i => <div key={i} className={`ob-dot${i === current ? " active" : i < current ? " past" : ""}`} onClick={() => i < current && advance(i)} />)}
              </div>
              <button className="ob-btn-white" onClick={handleCTA}>Create Account</button>
              <button className="ob-btn-ghost" onClick={() => setPage("login")}>Sign in instead</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
