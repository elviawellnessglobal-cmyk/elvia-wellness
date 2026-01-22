import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* IMAGES — SAME AS HOME */
const softSkinImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769074475/ChatGPT_Image_Jan_22_2026_03_03_50_PM_kct4ad.png";

const morningVeilImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1769083998/ChatGPT_Image_Jan_22_2026_05_41_58_PM_ainmkh.png";

const quietWoodsImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1769081520/ChatGPT_Image_Jan_22_2026_05_01_01_PM_nzxsqv.png";

export default function Perfume() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    sectionRef.current && obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main style={styles.page}>
      {/* ---------- HERO ---------- */}
      <section style={styles.hero}>
        <p style={styles.label}>KAEORN FRAGRANCE</p>
        <h1 style={styles.title}>A quiet expression of scent</h1>
        <p style={styles.subtitle}>
          Crafted to sit close to skin — intimate, understated,
          and deeply personal.
        </p>
      </section>

      {/* ---------- COLLECTION ---------- */}
      <section ref={sectionRef} style={styles.collection}>
        {/* NO. 01 — THÉ NOIR MEN */}
        <div
          style={{
            ...styles.card,
            ...(visible ? styles.show(0) : styles.hide),
          }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/perfume/soft-skin")}
        >
          <div style={styles.imageWrap}>
            <img
              src={softSkinImg}
              alt="KAEORN Thé Noir Men"
              style={{
                ...styles.image,
                filter: hovered === 0 ? "grayscale(0%)" : "grayscale(100%)",
                transform: hovered === 0 ? "scale(1.03)" : "scale(1)",
              }}
            />
            <div style={styles.vignette} />
            {hovered === 0 && <div style={styles.view}>View</div>}
          </div>

          <div style={styles.cardText}>
            <span style={styles.index}>MEN</span>
            <h3 style={styles.name}>THÉ NOIR</h3>
            <p style={styles.mood}>Woody · Aromatic · Musky</p>
            <p style={styles.concentration}>Eau de Parfum</p>
          </div>
        </div>

        {/* NO. 02 — MORNING VEIL */}
        <div
          style={{
            ...styles.card,
            ...(visible ? styles.show(1) : styles.hide),
            ...(isMobile ? {} : styles.offset),
          }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/perfume/morning-veil")}
        >
          <div style={styles.imageWrap}>
            <img
              src={morningVeilImg}
              alt="KAEORN Morning Veil"
              style={{
                ...styles.image,
                filter: hovered === 1 ? "grayscale(0%)" : "grayscale(100%)",
                transform: hovered === 1 ? "scale(1.03)" : "scale(1)",
              }}
            />
            <div style={styles.vignette} />
            {hovered === 1 && <div style={styles.view}>View</div>}
          </div>

          <div style={styles.cardText}>
            <span style={styles.index}>UNISEX</span>
            <h3 style={styles.name}>MORNING VEIL</h3>
            <p style={styles.mood}>Clean · Airy · Luminous</p>
            <p style={styles.concentration}>Eau de Parfum</p>
          </div>
        </div>

        {/* NO. 03 — SOIE FEMME */}
        <div
          style={{
            ...styles.card,
            ...(visible ? styles.show(2) : styles.hide),
          }}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/perfume/quiet-woods")}
        >
          <div style={styles.imageWrap}>
            <img
              src={quietWoodsImg}
              alt="KAEORN Soie Femme"
              style={{
                ...styles.image,
                filter: hovered === 2 ? "grayscale(0%)" : "grayscale(100%)",
                transform: hovered === 2 ? "scale(1.03)" : "scale(1)",
              }}
            />
            <div style={styles.vignette} />
            {hovered === 2 && <div style={styles.view}>View</div>}
          </div>

          <div style={styles.cardText}>
            <span style={styles.index}>WOMEN</span>
            <h3 style={styles.name}>SOIE FEMME</h3>
            <p style={styles.mood}>Soft · Elegant · Feminine</p>
            <p style={styles.concentration}>Eau de Parfum</p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    paddingBottom: 160,
    background:
      "radial-gradient(1200px 600px at 50% -10%, #f4f1ed 0%, #ffffff 60%)",
  },

  hero: {
    maxWidth: 700,
    margin: "80px auto 120px", // ✅ FIXED TOP SPACE
    padding: "0 24px",
    textAlign: "center",
  },

  label: {
    fontSize: 12,
    letterSpacing: 3,
    color: "#8a7f72",
    marginBottom: 14,
  },

  title: {
    fontSize: "clamp(34px,5vw,42px)",
    fontWeight: 400,
    lineHeight: 1.25,
    marginBottom: 22,
    color: "#111",
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 1.8,
    color: "#666",
  },

  collection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 90,
  },

  hide: {
    opacity: 0,
    transform: "translateY(40px)",
  },

  show: (i) => ({
    opacity: 1,
    transform: "translateY(0)",
    transition: `all 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.18}s`,
  }),

  card: {
    cursor: "pointer",
    textAlign: "center",
  },

  offset: {
    transform: "translateY(36px)",
  },

  imageWrap: {
    position: "relative",
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 22,
  },

  image: {
    width: "100%",
    height: 480,
    objectFit: "cover",
    transition: "all 0.8s ease",
  },

  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%)",
    pointerEvents: "none",
  },

  view: {
    position: "absolute",
    bottom: 18,
    right: 18,
    background: "rgba(0,0,0,0.65)",
    color: "#fff",
    fontSize: 12,
    padding: "8px 14px",
    borderRadius: 20,
    letterSpacing: 1.2,
  },

  cardText: {
    textAlign: "center",
  },

  index: {
    fontSize: 12,
    letterSpacing: 2.5,
    color: "#888",
    display: "block",
    marginBottom: 6,
  },

  name: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 6,
    color: "#111",
  },

  mood: {
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
  },

  concentration: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: "#999",
  },
};
