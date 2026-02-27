import { useState } from "react";

const slides = [
  {
    id: 0,
    badge: null,
    visual: "cup",
    headline: ["Every sip tells", "a story."],
    italic: "story.",
    sub: "Handcrafted coffees, artisan pastries, and a warm corner of the world — all waiting for you at Coffeecient.",
    cta: "Get Started",
    bg: "linear-gradient(160deg, #F7C5D0 0%, #fff0f3 60%)",
  },
  {
    id: 1,
    badge: "Our Menu",
    visual: "menu",
    headline: ["Crafted with", "heart & bloom."],
    italic: "heart",
    sub: "From signature espressos to oat milk lattes — every cup is made to order, exactly the way you love it.",
    cta: "Next",
    bg: "#fff",
  },
  {
    id: 2,
    badge: null,
    visual: "rewards",
    headline: ["Join Coffeecient", "Rewards ✦"],
    italic: "Rewards",
    sub: "Earn petals with every purchase. Redeem for free drinks, secret menu items, and early access to new arrivals.",
    cta: "Create Account",
    ctaSecondary: "Sign in instead",
    bg: "#2A1520",
    dark: true,
  },
];

const menuItems = [
  { emoji: "☕", name: "Espresso Classico", price: "₱199", active: true },
  { emoji: "🥛", name: "Oat Milk Latte", price: "₱299" },
  { emoji: "🍫", name: "Mocha Noir", price: "₱249" },
];

const perks = [
  { emoji: "🌸", title: "Earn Petals", desc: "1 petal per ₱10 spent", grad: "linear-gradient(135deg,#E8587A,#C23B66)", shadow: "rgba(232,88,122,0.35)" },
  { emoji: "🎁", title: "Free Drinks", desc: "Redeem 50 petals for a drink", grad: "linear-gradient(135deg,#F4A7B9,#E8587A)", shadow: "rgba(244,167,185,0.3)" },
  { emoji: "⚡", title: "Skip the Line", desc: "Order ahead, pick up in 5 min", grad: "linear-gradient(135deg,#FADADD,#F4A7B9)", shadow: "rgba(250,218,221,0.25)" },
];

/* ── Cup SVG ── */
function CupSVG() {
  return (
    <svg width="160" height="160" viewBox="0 0 180 180" fill="none" style={{ filter: "drop-shadow(0 20px 40px rgba(196,59,102,0.28))" }}>
      {["70 44 Q76 34 70 24", "90 40 Q96 28 90 18", "110 44 Q116 34 110 24"].map((d, i) => (
        <path key={i} d={d} stroke="#F4A7B9" strokeWidth="3" strokeLinecap="round" fill="none" opacity={i === 1 ? 1 : 0.7}>
          <animate attributeName="d"
            values={`${d};${d.replace(/Q\d+ \d+/, (m) => m.replace(/(\d+) /, n => `${+n - 12} `))};${d}`}
            dur={`${1.8 + i * 0.35}s`} repeatCount="indefinite" />
        </path>
      ))}
      <ellipse cx="90" cy="148" rx="65" ry="10" fill="#F4A7B9" opacity="0.4" />
      <ellipse cx="90" cy="148" rx="50" ry="7" fill="#E8587A" opacity="0.3" />
      <path d="M50 65 L60 148 H120 L130 65 Z" fill="url(#cg)" />
      <ellipse cx="90" cy="65" rx="40" ry="8" fill="#F4A7B9" />
      <ellipse cx="90" cy="65" rx="36" ry="6" fill="#C23B66" />
      <ellipse cx="90" cy="63" rx="28" ry="4" fill="#FADADD" opacity="0.9" />
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

export default function OnboardingPage({ setPage, setUser }) {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);

  const advance = (next) => {
    setExiting(true);
    setTimeout(() => { setCurrent(next); setExiting(false); }, 320);
  };

  const handleCTA = () => {
    if (current < 2) { advance(current + 1); return; }
    localStorage.setItem("coffeecient_onboarded", "1");
    setPage("register");
  };

  const handleSecondary = () => {
    localStorage.setItem("coffeecient_onboarded", "1");
    setPage("login");
  };

  const handleSkip = () => {
    localStorage.setItem("coffeecient_onboarded", "1");
    setPage("home");
  };

  const slide = slides[current];

  return (
    <div style={styles.backdrop}>
      <div style={styles.phone}>

        {/* Skip */}
        {current < 2 && (
          <button style={{ ...styles.skip, ...(current === 2 ? styles.skipDark : {}) }} onClick={handleSkip}>
            Skip
          </button>
        )}

        {/* Slide container */}
        <div style={{ ...styles.slideWrap, background: slide.bg, opacity: exiting ? 0 : 1, transform: exiting ? "translateY(16px)" : "translateY(0)", transition: "opacity 0.32s ease, transform 0.32s ease" }}>

          {/* ── SLIDE 0: Welcome ── */}
          {current === 0 && (
            <>
              <div style={styles.blob1} />
              <div style={styles.blob2} />
              <div style={styles.s0Content}>
                <div style={styles.logoMark}>☕</div>
                <span style={styles.brandName}>Coffeecient</span>
                <div style={{ margin: "36px 0 28px" }}><CupSVG /></div>
                <h1 style={styles.s0Title}>
                  Every sip tells<br />a <em style={{ color: "#E8587A", fontStyle: "italic" }}>story.</em>
                </h1>
                <p style={styles.s0Sub}>{slide.sub}</p>
              </div>
            </>
          )}

          {/* ── SLIDE 1: Menu ── */}
          {current === 1 && (
            <>
              {/* Top image area */}
              <div style={styles.s1Top}>
                <div style={styles.floatTag1}>✨ Fan Favorite</div>
                <div style={styles.floatTag2}>🔥 New Arrival</div>
                <div style={styles.menuCard}>
                  <div style={styles.mcLabel}>Today's Picks</div>
                  <div style={styles.mcTitle}>Our Menu</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {menuItems.map((item) => (
                      <div key={item.name} style={item.active ? { ...styles.mcItem, ...styles.mcItemActive } : styles.mcItem}>
                        <span>{item.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: item.active ? "#fff" : "#3b1f27" }}>{item.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: item.active ? "#fff" : "#c2566b", marginLeft: "auto" }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Bottom text */}
              <div style={styles.s1Body}>
                <span style={styles.badge}>Our Menu</span>
                <h2 style={styles.s1Title}>Crafted with <em style={{ color: "#E8587A" }}>heart</em> & bloom.</h2>
                <p style={styles.s1Sub}>{slide.sub}</p>
              </div>
            </>
          )}

          {/* ── SLIDE 2: Rewards ── */}
          {current === 2 && (
            <>
              <div style={styles.s2Top}>
                <div style={styles.circleDeco1} />
                <div style={styles.circleDeco2} />
                <h2 style={styles.s2Title}>
                  Join <span style={{ color: "#F4A7B9" }}>Coffeecient</span><br />Rewards ✦
                </h2>
                <p style={styles.s2Sub}>{slide.sub}</p>
              </div>
              <div style={styles.perks}>
                {perks.map((p) => (
                  <div key={p.title} style={styles.perkCard}>
                    <div style={{ ...styles.perkIcon, background: p.grad, boxShadow: `0 8px 20px ${p.shadow}` }}>{p.emoji}</div>
                    <div>
                      <div style={styles.perkTitle}>{p.title}</div>
                      <div style={styles.perkDesc}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom bar: dots + CTA */}
        <div style={{ ...styles.bottomBar, background: slide.dark ? "#2A1520" : "#fff", borderTop: slide.dark ? "1px solid rgba(244,167,185,0.08)" : "1px solid rgba(194,86,107,0.08)" }}>
          {/* Dots */}
          <div style={styles.dots}>
            {[0, 1, 2].map((i) => (
              <div key={i} onClick={() => i < current && advance(i)}
                style={{ ...styles.dot, ...(i === current ? styles.dotActive : {}), cursor: i < current ? "pointer" : "default" }} />
            ))}
          </div>

          {/* CTA Button */}
          <button style={slide.dark ? styles.btnWhite : styles.btnPrimary} onClick={handleCTA}>
            {current === 2 ? "Create Account" : "Continue →"}
          </button>

          {current === 2 && (
            <button style={styles.btnGhost} onClick={handleSecondary}>
              Sign in instead
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

/* ── Inline styles ── */
const styles = {
  backdrop: {
    position: "fixed", inset: 0, zIndex: 999,
    background: "linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  phone: {
    width: 390, height: 844,
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
    display: "flex", flexDirection: "column",
    boxShadow: "0 40px 100px rgba(196,59,102,0.25), 0 0 0 12px #fff, 0 0 0 14px #f0d0d8",
  },
  slideWrap: {
    flex: 1, overflow: "hidden", position: "relative",
    display: "flex", flexDirection: "column",
  },
  skip: {
    position: "absolute", top: 52, right: 20, zIndex: 50,
    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(10px)",
    border: "none", borderRadius: 20, padding: "7px 16px",
    fontSize: 13, color: "#9e6475", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  skipDark: { background: "rgba(255,255,255,0.08)", color: "#A07080" },

  // Slide 0
  blob1: { position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "#F4A7B9", filter: "blur(60px)", opacity: 0.5, top: -80, right: -60 },
  blob2: { position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "#E8587A", filter: "blur(60px)", opacity: 0.2, top: 180, left: -70 },
  s0Content: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 36px 28px" },
  logoMark: {
    width: 68, height: 68, background: "#E8587A", borderRadius: 22,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 30, boxShadow: "0 12px 32px rgba(232,88,122,0.4)",
  },
  brandName: { fontFamily: "'Playfair Display', serif", fontSize: 13, letterSpacing: 3, color: "#9e6475", textTransform: "uppercase", marginTop: 12 },
  s0Title: { fontFamily: "'Playfair Display', serif", fontSize: 40, lineHeight: 1.1, color: "#3b1f27", textAlign: "center", margin: 0 },
  s0Sub: { fontSize: 14, color: "#9e6475", textAlign: "center", lineHeight: 1.65, marginTop: 14, fontWeight: 300 },

  // Slide 1
  s1Top: {
    height: 310,
    background: "linear-gradient(135deg, #FCE4EC, #F8BBD9)",
    position: "relative", overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  floatTag1: {
    position: "absolute", top: 44, right: 24,
    background: "#E8587A", color: "#fff", fontSize: 11, fontWeight: 600,
    padding: "6px 12px", borderRadius: 20, boxShadow: "0 6px 20px rgba(232,88,122,0.4)",
  },
  floatTag2: {
    position: "absolute", bottom: 32, left: 20,
    background: "#C23B66", color: "#fff", fontSize: 11, fontWeight: 600,
    padding: "6px 12px", borderRadius: 20, boxShadow: "0 6px 20px rgba(194,59,102,0.4)",
  },
  menuCard: {
    background: "#fff", borderRadius: 20, padding: "18px 20px",
    boxShadow: "0 16px 48px rgba(196,59,102,0.18)", width: 230, position: "relative", zIndex: 1,
  },
  mcLabel: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#9e6475" },
  mcTitle: { fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#3b1f27", margin: "4px 0 10px" },
  mcItem: { display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 11, background: "#fff5f7" },
  mcItemActive: { background: "linear-gradient(135deg, #E8587A, #C23B66)" },
  s1Body: { padding: "28px 36px 24px", flex: 1, display: "flex", flexDirection: "column" },
  badge: { display: "inline-block", background: "#FFE8EE", color: "#E8587A", fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, marginBottom: 12 },
  s1Title: { fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#3b1f27", lineHeight: 1.2, margin: 0 },
  s1Sub: { fontSize: 13, color: "#9e6475", lineHeight: 1.65, marginTop: 10, fontWeight: 300 },

  // Slide 2
  s2Top: {
    padding: "60px 36px 32px",
    background: "linear-gradient(160deg, #3D1A2B 0%, #2A1520 100%)",
    position: "relative", overflow: "hidden", flexShrink: 0,
  },
  circleDeco1: { position: "absolute", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(244,167,185,0.12)", top: -100, right: -100 },
  circleDeco2: { position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(244,167,185,0.1)", top: -50, right: -50 },
  s2Title: { fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#fff", lineHeight: 1.2, position: "relative", margin: 0 },
  s2Sub: { fontSize: 13, color: "#C8899A", lineHeight: 1.65, marginTop: 10, fontWeight: 300, position: "relative" },
  perks: { padding: "22px 30px", display: "flex", flexDirection: "column", gap: 12 },
  perkCard: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(244,167,185,0.12)",
    borderRadius: 16, padding: "15px 18px", display: "flex", alignItems: "center", gap: 14,
  },
  perkIcon: { width: 44, height: 44, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 },
  perkTitle: { fontSize: 14, fontWeight: 600, color: "#fff" },
  perkDesc: { fontSize: 12, color: "#A07080", marginTop: 2 },

  // Bottom bar
  bottomBar: { padding: "16px 28px 28px", flexShrink: 0 },
  dots: { display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 },
  dot: { height: 6, width: 6, borderRadius: 3, background: "rgba(232,88,122,0.25)", transition: "width 0.4s, background 0.4s" },
  dotActive: { width: 22, background: "#E8587A" },

  btnPrimary: {
    width: "100%", padding: "16px", border: "none", borderRadius: 16,
    background: "linear-gradient(135deg, #E8587A, #C23B66)",
    color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 12px 32px rgba(232,88,122,0.35)",
  },
  btnWhite: {
    width: "100%", padding: "16px", border: "none", borderRadius: 16,
    background: "#fff", color: "#3b1f27", fontSize: 15, fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
  },
  btnGhost: {
    width: "100%", padding: "12px", background: "transparent", border: "none",
    color: "#A07080", fontSize: 13, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", marginTop: 6,
  },
};
