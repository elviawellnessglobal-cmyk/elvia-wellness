import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* NO. 01 — THÉ NOIR MEN */
const softSkinImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769074475/ChatGPT_Image_Jan_22_2026_03_03_50_PM_kct4ad.png";

/* NO. 02 — MORNING VEIL */
const morningVeilImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1769083998/ChatGPT_Image_Jan_22_2026_05_41_58_PM_ainmkh.png";

/* NO. 03 — SOIE FEMME */
const quietWoodsImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1769081520/ChatGPT_Image_Jan_22_2026_05_01_01_PM_nzxsqv.png";

/* 🌫️ HERO BACKGROUND IMAGE (ONLY UNDER HERO AREA) */
const heroBg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1770669629/dc9fb4aaf164ae5f44160471f5eb9a7b_hmhsw6.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    document.title =
      "KAEORN WELLNESS | Quiet Luxury Skincare & Fragrance";

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content =
      "Discover KAEORN — quiet luxury skincare and fragrance crafted for modern rituals.";

    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        ...styles.page,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* ---------------- HERO ---------------- */}
      <section
        style={{
          ...styles.hero,
          minHeight: isMobile ? "88vh" : "92vh",
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* soft luxury overlay so text stays readable */}
        <div style={styles.heroOverlay} />

        <div style={styles.heroInner}>
          <div style={styles.brandBadge}>KAEORN</div>

          <div style={styles.brandTagline}>
            Because care deserves luxury
          </div>

          <h1 style={styles.heroTitle}>
            Where skincare meets the art of perfume
            <br />
            Crafted for modern skin, softly perfumed
          </h1>

          <p style={styles.heroText}>
            Thoughtfully crafted scents designed to linger softly and elevate
            your daily ritual
          </p>

          {/* 🔒 COMING SOON BUTTONS */}
          <div
            style={{
              ...styles.productButton,
              flexDirection: isMobile ? "column" : "row",
              width: isMobile ? "100%" : "auto",
              alignItems: "center",
            }}
          >
            <button
              disabled
              style={{
                ...styles.primaryBtn,
                ...styles.disabledBtn,
                width: isMobile ? "100%" : "auto",
                maxWidth: 360,
              }}
            >
              Discover Haetsal Veil™ Cream — Coming Soon
            </button>

            <button
              disabled
              style={{
                ...styles.primaryBtnOutline,
                ...styles.disabledBtnOutline,
                width: isMobile ? "100%" : "auto",
                maxWidth: 360,
              }}
            >
              Discover Haetsal Veil™ Spray — Coming Soon
            </button>
          </div>

          {/* 🖤 NEW LUXURY LINE */}
          <p style={styles.fragranceLine}>
            Freshly launched fragrance — explore now
          </p>
        </div>
      </section>

      {/* ---------------- PERFUME SECTION ---------------- */}
      <section style={styles.perfumeSection}>
        <div style={styles.perfumeIntro}>
          <p style={styles.label}>KAEORN FRAGRANCE</p>
          <h2 style={styles.perfumeTitle}>
            A quiet expression of scent
          </h2>
          <p style={styles.perfumeSubtitle}>
            Crafted to sit close to skin — intimate, understated,
            and deeply personal.
          </p>
        </div>

        <div style={styles.perfumeRow}>
          <div
            style={styles.perfumeCard}
            onClick={() => navigate("/perfume/soft-skin")}
          >
            <img src={softSkinImg} alt="" style={styles.perfumeImage} />
            <span style={styles.index}>MEN</span>
            <h4 style={styles.name}>THÉ NOIR</h4>
            <p style={styles.mood}>Woody · Aromatic · Musky</p>
          </div>

          <div
            style={{ ...styles.perfumeCard, ...styles.offset }}
            onClick={() => navigate("/perfume/morning-veil")}
          >
            <img src={morningVeilImg} alt="" style={styles.perfumeImage} />
            <span style={styles.index}>UNISEX</span>
            <h4 style={styles.name}>MORNING VEIL</h4>
            <p style={styles.mood}>Clean · Airy · Luminous</p>
          </div>

          <div
            style={styles.perfumeCard}
            onClick={() => navigate("/perfume/quiet-woods")}
          >
            <img src={quietWoodsImg} alt="" style={styles.perfumeImage} />
            <span style={styles.index}>WOMEN</span>
            <h4 style={styles.name}>SOIE FEMME</h4>
            <p style={styles.mood}>Luxury · Feminine</p>
          </div>
        </div>

        <button
          style={styles.viewAll}
          onClick={() => navigate("/perfume")}
        >
          Explore Fragrance Collection
        </button>
      </section>
    </main>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
  },

  hero: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 24px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.92), rgba(255,255,255,0.96))",
  },

  heroInner: {
    position: "relative",
    zIndex: 2,
    maxWidth: 720,
  },

  brandBadge: {
    fontSize: 11,
    letterSpacing: 3,
    padding: "8px 18px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.05)",
    marginBottom: 18,
  },

  brandTagline: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },

  heroTitle: {
    fontSize: "clamp(30px,5vw,44px)",
    fontWeight: 500,
    lineHeight: 1.25,
    marginBottom: 24,
  },

  heroText: {
    maxWidth: 560,
    fontSize: 16,
    lineHeight: 1.8,
    color: "#666",
    marginBottom: 36,
  },

  productButton: {
    display: "flex",
    gap: 16,
    marginTop: 10,
  },

  primaryBtn: {
    padding: "16px 28px",
    borderRadius: 40,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 15,
  },

  primaryBtnOutline: {
    padding: "16px 28px",
    borderRadius: 40,
    background: "transparent",
    border: "1px solid #111",
    fontSize: 15,
  },

  disabledBtn: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  disabledBtnOutline: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  fragranceLine: {
    marginTop: 26,
    fontSize: 14,
    letterSpacing: 1,
    color: "#888",
  },

  perfumeSection: {
    padding: "140px 24px",
    background:
      "radial-gradient(1000px 500px at 50% -10%, #f4f1ed 0%, #ffffff 60%)",
  },

  perfumeIntro: {
    maxWidth: 620,
    margin: "0 auto 120px",
    textAlign: "center",
  },

  label: {
    fontSize: 12,
    letterSpacing: 3,
    color: "#8a7f72",
    marginBottom: 16,
  },

  perfumeTitle: {
    fontSize: 40,
    fontWeight: 400,
    marginBottom: 24,
  },

  perfumeSubtitle: {
    fontSize: 17,
    lineHeight: 1.9,
    color: "#666",
  },

  perfumeRow: {
    maxWidth: 1200,
    margin: "0 auto 80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 80,
  },

  perfumeCard: {
    textAlign: "center",
    cursor: "pointer",
  },

  offset: {
    transform: "translateY(32px)",
  },

  perfumeImage: {
    width: "100%",
    height: 420,
    objectFit: "cover",
    borderRadius: 28,
    marginBottom: 22,
  },

  index: {
    fontSize: 12,
    letterSpacing: 2.5,
    color: "#888",
    marginBottom: 6,
  },

  name: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 6,
  },

  mood: {
    fontSize: 14,
    color: "#777",
  },

  viewAll: {
    margin: "0 auto",
    display: "block",
    padding: "16px 38px",
    borderRadius: 40,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 14,
  },
};
