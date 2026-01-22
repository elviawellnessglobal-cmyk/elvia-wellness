import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* DEFAULT PERFUME IMAGE (FALLBACK) */
const perfumeImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1768897641/ChatGPT_Image_Jan_20_2026_01_54_12_PM_nkfbak.png";

/* NO. 01 — THÉ NOIR MEN */
const softSkinImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769074475/ChatGPT_Image_Jan_22_2026_03_03_50_PM_kct4ad.png";

/* NO. 02 — MORNING VEIL (UNISEX IMAGE) */
const morningVeilImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1769083998/ChatGPT_Image_Jan_22_2026_05_41_58_PM_ainmkh.png";

/* NO. 03 — SOIE FEMME */
const quietWoodsImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1769081520/ChatGPT_Image_Jan_22_2026_05_01_01_PM_nzxsqv.png";

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

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

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

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
      <section style={styles.hero}>
        <div style={styles.brandBadge}>KAEORN</div>
        <div style={styles.brandTagline}>
          Because care should feel kind
        </div>

        <h1 style={styles.heroTitle}>
          Quiet luxury skincare,
          <br />
          crafted for modern skin.
        </h1>

        <p style={styles.heroText}>
          Thoughtfully formulated essentials designed to protect,
          nourish, and elevate your daily ritual.
        </p>

        <div style={styles.productButton}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/product")}
          >
            Discover Haetsal Veil™ Cream
          </button>

          <button
            style={styles.primaryBtnOutline}
            onClick={() => navigate("/product/spray")}
          >
            Discover Haetsal Veil™ Spray
          </button>
        </div>
      </section>

      {/* ---------------- PERFUME SECTION ---------------- */}
      <section
        style={{
          ...styles.perfumeSection,
          ...(isMobile ? {} : styles.snap),
        }}
      >
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
          {/* NO. 01 — THÉ NOIR MEN */}
          <div
            style={styles.perfumeCard}
            onClick={() => navigate("/perfume/soft-skin")}
          >
            <img
              src={softSkinImg}
              alt="KAEORN Thé Noir Men perfume"
              style={styles.perfumeImage}
            />
            <span style={styles.index}>MEN</span>
            <h4 style={styles.name}>THÉ NOIR</h4>
            <p style={styles.mood}>
              Eau de Parfum
              <br />
              Woody · Aromatic · Musky
            </p>
          </div>

          {/* NO. 02 — MORNING VEIL (UNISEX) */}
          <div
            style={{ ...styles.perfumeCard, ...styles.offset }}
            onClick={() => navigate("/perfume/morning-veil")}
          >
            <img
              src={morningVeilImg}
              alt="KAEORN Morning Veil unisex perfume"
              style={styles.perfumeImage}
            />
            <span style={styles.index}>UNISEX</span>
            <h4 style={styles.name}>MORNING VEIL</h4>
            <p style={styles.mood}>
              Clean · Airy · Luminous
              <br />
              Eau de Parfum
            </p>
          </div>

          {/* NO. 03 — SOIE FEMME */}
          <div
            style={styles.perfumeCard}
            onClick={() => navigate("/perfume/quiet-woods")}
          >
            <img
              src={quietWoodsImg}
              alt="KAEORN Soie Femme perfume"
              style={styles.perfumeImage}
            />
            <span style={styles.index}>WOMEN</span>
            <h4 style={styles.name}>SOIE FEMME</h4>
            <p style={styles.mood}>
              Luxury · Women’s
              <br />
              Eau de Parfum
            </p>
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
    minHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 24px",
    background:
      "radial-gradient(1200px 600px at 50% -10%, #f2f2f2 0%, #ffffff 60%)",
  },

  brandBadge: {
    fontSize: 11,
    letterSpacing: 3,
    padding: "8px 18px",
    borderRadius: 999,
    background: "rgba(0,0,0,0.04)",
    marginBottom: 18,
  },

  brandTagline: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },

  heroTitle: {
    fontSize: "clamp(32px,5vw,44px)",
    fontWeight: 500,
    lineHeight: 1.25,
    marginBottom: 24,
  },

  heroText: {
    maxWidth: 560,
    fontSize: 16,
    lineHeight: 1.8,
    color: "#666",
    marginBottom: 44,
  },

  productButton: {
    display: "flex",
    gap: 18,
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "16px 34px",
    borderRadius: 40,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 15,
  },

  primaryBtnOutline: {
    padding: "16px 34px",
    borderRadius: 40,
    background: "transparent",
    border: "1px solid #111",
    fontSize: 15,
  },

  perfumeSection: {
    padding: "160px 24px",
    background:
      "radial-gradient(1000px 500px at 50% -10%, #f4f1ed 0%, #ffffff 60%)",
  },

  snap: {
    scrollSnapAlign: "start",
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
    display: "block",
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
