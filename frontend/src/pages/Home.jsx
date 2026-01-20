import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar onLogin={() => navigate("/product")} />

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
          {/* BRAND BADGE */}
          <div style={styles.brandBadge}>KAEORN</div>
          <div style={styles.brandTageline}>
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

          {/* PRODUCT CTA */}
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

        {/* ---------------- TRUST STRIP ---------------- */}
        <section style={styles.trust}>
          {[
            "SPF 50+ Broad Spectrum",
            "No White Cast",
            "Smooth Texture",
            "Made in India",
            "Daily Use Formula",
          ].map((item) => (
            <span key={item} style={styles.trustItem}>
              {item}
            </span>
          ))}
        </section>

        {/* ---------------- PHILOSOPHY ---------------- */}
        <section style={styles.philosophy}>
          <h2 style={styles.sectionTitle}>OUR PHILOSOPHY</h2>
          <p style={styles.sectionText}>
            Skincare should feel effortless, refined, and deeply effective.
            No excess. No noise. Only what your skin truly needs.
          </p>
        </section>
      </main>
    </>
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
    fontSize: "11px",
    letterSpacing: "3px",
    padding: "8px 18px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.04)",
    color: "#111",
    marginBottom: "18px",
  },

  brandTageline: {
    fontFamily: "Poppins, Inter, sans-serif",
    fontSize: "14px",
    color: "#666",
    marginBottom: "22px",
  },

  heroTitle: {
    fontSize: "clamp(32px, 5vw, 44px)",
    fontWeight: "500",
    lineHeight: 1.25,
    marginBottom: "24px",
  },

  heroText: {
    maxWidth: "560px",
    fontSize: "16px",
    lineHeight: 1.8,
    color: "#666",
    marginBottom: "44px",
  },

  productButton: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  primaryBtn: {
    padding: "16px 34px",
    borderRadius: "40px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
  },

  primaryBtnOutline: {
    padding: "16px 34px",
    borderRadius: "40px",
    background: "transparent",
    color: "#111",
    border: "1px solid #111",
    cursor: "pointer",
    fontSize: "15px",
  },

  trust: {
    display: "flex",
    justifyContent: "center",
    gap: "28px",
    flexWrap: "wrap",
    padding: "64px 20px",
    background: "#fafafa",
  },

  trustItem: {
    fontSize: "12px",
    letterSpacing: "1px",
    color: "#555",
    borderBottom: "1px solid #ddd",
    paddingBottom: "6px",
  },

  philosophy: {
    maxWidth: "800px",
    margin: "120px auto",
    textAlign: "center",
    padding: "0 20px",
  },

  sectionTitle: {
    fontSize: "13px",
    letterSpacing: "2px",
    color: "#888",
    marginBottom: "14px",
  },

  sectionText: {
    fontSize: "17px",
    lineHeight: 1.8,
    color: "#444",
  },
};
