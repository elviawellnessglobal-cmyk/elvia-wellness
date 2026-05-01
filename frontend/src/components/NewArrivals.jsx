/*
  NewArrivals.jsx
  ───────────────
  Drop-in homepage section for NOX + VELION.
  Place it in Home.jsx right after the marquee block.

  Usage in Home.jsx:
    import NewArrivals from "../components/NewArrivals";
    ...
    <NewArrivals navigate={navigate} addReveal={addReveal} user={user} addToCart={addToCart} setShowAuth={setShowAuth} />
*/

import { useState, useRef, useEffect } from "react";

/* ── Replace these with real Cloudinary URLs when ready ── */
const NOX_IMG =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1777185696/ChatGPT_Image_Apr_26_2026_12_11_20_PM_uecc1c.png";
const VELION_IMG =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1777636662/velion_home_xpbqlc.png";

const PRODUCTS = [
  {
    id: "nox",
    route: "/perfume/nox",
    name: "NOX",
    subtitle: "Solid Perfume Balm",
    character: "Warm · Smoky · Skin-close",
    notes: ["Rare Oud Wood", "Sandalwood", "Chinese Pepper"],
    desc: "Built around rare oud wood — deep, intimate, and made to stay close to the skin. No projection. Just presence.",
    price: "₹349",
    size: "10 g",
    gender: "Unisex",
    img: NOX_IMG,
    accent: "#c9a96e",
    accentText: "#0d0c0b",
    tag: "New",
  },
  {
    id: "velion",
    route: "/perfume/velion",
    name: "VELION",
    subtitle: "Solid Perfume Balm",
    character: "Fresh · Floral · Luminous",
    notes: ["Exotic Saffron", "Radiant Cedar", "Golden Amber"],
    desc: "An ode to radiant warmth — sheer florals lifted by amberwood and saffron. Inspired by the world's most coveted crystals.",
    price: "₹349",
    size: "10 g",
    gender: "Unisex",
    img: VELION_IMG,
    accent: "#c9a96e",
    accentText: "#1a0f0a",
    tag: "New",
  },
];

function ArrivalCard({ product, navigate, addToCart, user, setShowAuth, index, addReveal }) {
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && addReveal) addReveal(cardRef.current);
  }, []);

  function handleAdd(e) {
    e.stopPropagation();
    if (!user) { setShowAuth(true); return; }
    addToCart(product.route);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const isRight = index % 2 !== 0;

  return (
    <article
      ref={cardRef}
      style={{
        ...cardStyles.wrap,
        flexDirection: isRight ? "row-reverse" : "row",
        animationDelay: `${index * 0.15}s`,
      }}
      className="na-card"
    >
      {/* ── IMAGE ── */}
      <div style={cardStyles.imageCol}>
        {/*
          FIX: imageFrame now has explicit width + height via paddingBottom trick
          (aspect-ratio has inconsistent support in older Safari).
          The img is absolutely positioned to fill the frame, ensuring both
          cards render identical box dimensions regardless of source image size.
        */}
        <div
          style={cardStyles.imageFrame}
          className="na-img-frame"
          onClick={() => navigate(product.route)}
        >
          <img
            src={product.img}
            alt={`${product.name} ${product.subtitle} by KAEORN`}
            style={cardStyles.img}
            className="na-img"
          />
          <div style={cardStyles.imgOverlay} className="na-img-overlay" />

          {/* floating info chip */}
          <div style={{ ...cardStyles.chip, borderColor: product.accent + "55" }}>
            <span style={cardStyles.chipLabel}>{product.gender}</span>
            <span style={{ ...cardStyles.chipDot, background: product.accent }} />
            <span style={cardStyles.chipLabel}>{product.size}</span>
          </div>

          {/* new badge */}
          <div style={{ ...cardStyles.newBadge, background: product.accent, color: product.accentText }}>
            {product.tag}
          </div>
        </div>
      </div>

      {/* ── COPY ── */}
      <div style={{ ...cardStyles.copyCol, alignItems: isRight ? "flex-end" : "flex-start" }}>
        <p style={cardStyles.eyebrow}>Solid Balm · New Arrival</p>

        <h2 style={cardStyles.name}>{product.name}</h2>

        <p style={{ ...cardStyles.character, color: product.accent }}>
          {product.character}
        </p>

        <p style={{ ...cardStyles.desc, textAlign: isRight ? "right" : "left" }}>
          {product.desc}
        </p>

        {/* notes */}
        <div style={{ ...cardStyles.notes, justifyContent: isRight ? "flex-end" : "flex-start" }}>
          {product.notes.map((n) => (
            <span key={n} style={cardStyles.notePill}>
              {n}
            </span>
          ))}
        </div>

        {/* price + cta */}
        <div style={cardStyles.footer}>
          <div>
            <p style={cardStyles.priceLabel}>Balm · 10 g</p>
            <p style={cardStyles.price}>{product.price}</p>
          </div>
          <div style={cardStyles.ctaRow}>
            <button
              style={cardStyles.btnGhost}
              onClick={() => navigate(product.route)}
            >
              Discover →
            </button>
            <button
              style={{
                ...cardStyles.btnFill,
                background: added ? "#2a2520" : "#0d0c0b",
              }}
              onClick={handleAdd}
            >
              {added ? "Added ✓" : "+ Cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function NewArrivals({ navigate, addReveal, user, addToCart, setShowAuth }) {
  const sectionRef = useRef(null);

  return (
    <>
      <style>{css}</style>
      <section style={sectionStyles.section} ref={sectionRef} id="new-arrivals">

        {/* ── HEADER ── */}
        <div style={sectionStyles.header}>
          <div style={sectionStyles.headerLeft}>
            <p style={sectionStyles.eyebrow}>
              <span style={sectionStyles.eyebrowLine} />
              Just Arrived
            </p>
            <h2 style={sectionStyles.title}>
              Solid.
              <br />
              <em style={sectionStyles.titleEm}>Close.</em>
              <br />
              Yours.
            </h2>
          </div>
          <div style={sectionStyles.headerRight}>
            <p style={sectionStyles.intro}>
              Our newest format — a concentrated solid balm that melts into
              skin, not air. Two characters. One obsession with staying power.
            </p>
            <div style={sectionStyles.headerRule} />
            <p style={sectionStyles.headerMeta}>
              NOX &amp; VELION · Solid Perfume Collection · 2026
            </p>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div style={sectionStyles.cards}>
          {PRODUCTS.map((p, i) => (
            <ArrivalCard
              key={p.id}
              product={p}
              index={i}
              navigate={navigate}
              addToCart={addToCart}
              user={user}
              setShowAuth={setShowAuth}
              addReveal={addReveal}
            />
          ))}
        </div>

      </section>
    </>
  );
}

/* ── SECTION STYLES ── */
const sectionStyles = {
  section: {
    padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
    maxWidth: 1200,
    margin: "0 auto",
    fontFamily: "'DM Mono', monospace",
  },
  header: {
    display: "flex",
    gap: "clamp(2rem, 6vw, 6rem)",
    alignItems: "flex-end",
    marginBottom: "clamp(4rem, 8vw, 7rem)",
    flexWrap: "wrap",
  },
  headerLeft: { flex: "0 0 auto" },
  eyebrow: {
    fontSize: "0.6rem",
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    color: "var(--muted, #888)",
    marginBottom: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  eyebrowLine: {
    display: "inline-block",
    width: "28px",
    height: "1px",
    background: "var(--muted, #888)",
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(3.5rem, 7vw, 6rem)",
    fontWeight: 300,
    lineHeight: 0.92,
    letterSpacing: "-0.01em",
    color: "var(--ink, #0d0c0b)",
  },
  titleEm: {
    fontStyle: "italic",
    color: "#c9a96e",
  },
  headerRight: {
    flex: 1,
    minWidth: 240,
    paddingBottom: "0.5rem",
  },
  intro: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
    lineHeight: 1.85,
    color: "var(--muted, #777)",
    marginBottom: "2rem",
    maxWidth: 440,
  },
  headerRule: {
    width: "100%",
    height: "1px",
    background: "var(--border, #eee)",
    marginBottom: "1.2rem",
  },
  headerMeta: {
    fontSize: "0.58rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted, #aaa)",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(4rem, 8vw, 7rem)",
  },
};

/* ── CARD STYLES ── */
const cardStyles = {
  wrap: {
    display: "flex",
    gap: "clamp(2rem, 5vw, 5rem)",
    alignItems: "center",
    flexWrap: "wrap",
  },
  imageCol: {
    flex: "0 0 auto",
    width: "clamp(260px, 40vw, 460px)",
  },
  /*
    FIX: Use position:relative + paddingBottom to create a locked 3:4 box.
    The img is absolutely positioned to fill it entirely.
    This guarantees both cards are pixel-identical in size regardless of the
    natural dimensions or focal point of the source image.
  */
  imageFrame: {
    position: "relative",
    width: "100%",
    paddingBottom: "133.33%",   /* 4/3 = 133.33% → enforces 3:4 ratio */
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#f5f0eb", /* neutral placeholder while image loads */
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease",
    filter: "saturate(0.9) contrast(1.03)",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(13,12,11,0.45) 0%, transparent 50%)",
    opacity: 0,
    transition: "opacity 0.4s",
    zIndex: 1,
  },
  chip: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(10px)",
    border: "1px solid",
    padding: "8px 14px",
    zIndex: 2,
  },
  chipLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "9px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#444",
  },
  chipDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  newBadge: {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontFamily: "'DM Mono', monospace",
    fontSize: "8px",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "6px 12px",
    zIndex: 2,
  },
  copyCol: {
    flex: 1,
    minWidth: 260,
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--muted, #888)",
    marginBottom: "1.4rem",
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(4.5rem, 9vw, 8rem)",
    fontWeight: 300,
    lineHeight: 0.88,
    letterSpacing: "-0.02em",
    color: "var(--ink, #0d0c0b)",
    marginBottom: "1.2rem",
  },
  character: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.62rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: "1.8rem",
  },
  desc: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
    lineHeight: 1.85,
    color: "var(--muted, #666)",
    marginBottom: "2rem",
    maxWidth: 380,
  },
  notes: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "2.8rem",
    color: "rgb(201, 169, 110)",
  },
  notePill: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "8.5px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "6px 14px",
    border: "1px solid var(--border, #ddd)",
    color: "var(--ink, #333)",
  },
  footer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "1.5rem",
    paddingTop: "1.8rem",
    borderTop: "1px solid var(--border, #eee)",
    flexWrap: "wrap",
  },
  priceLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted, #aaa)",
    marginBottom: "5px",
  },
  price: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.2rem",
    fontWeight: 300,
    color: "var(--ink, #0d0c0b)",
    lineHeight: 1,
  },
  ctaRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btnGhost: {
    padding: "12px 22px",
    background: "transparent",
    color: "var(--ink, #0d0c0b)",
    border: "1px solid var(--border, #ccc)",
    fontFamily: "'DM Mono', monospace",
    fontSize: "9px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  btnFill: {
    padding: "12px 22px",
    color: "#f0ece4",
    border: "none",
    fontFamily: "'DM Mono', monospace",
    fontSize: "9px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

/* ── SCOPED CSS ── */
const css = `
  .na-card {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .na-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* FIX: corrected class selectors to match actual className props */
  .na-img-frame:hover .na-img {
    transform: scale(1.05);
    filter: saturate(1.06) contrast(1.04);
  }
  .na-img-frame:hover .na-img-overlay {
    opacity: 1;
  }

  @media (max-width: 680px) {
    .na-card { flex-direction: column !important; }
    .na-card > div:first-child { width: 100% !important; }
  }
`;