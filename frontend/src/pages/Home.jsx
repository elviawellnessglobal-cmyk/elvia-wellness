import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 120);
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

      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>ELVIA WELLNESS</p>

        <h1 style={styles.heroTitle}>
          Quiet luxury skincare,
          <br />
          crafted for modern skin.
        </h1>

        <p style={styles.heroText}>
          Thoughtfully formulated essentials designed to protect,
          nourish, and elevate your daily ritual.
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/product")}
        >
          Discover ÉCLATIS™
        </button>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section style={styles.philosophy}>
        <h2 style={styles.sectionTitle}>OUR PHILOSOPHY</h2>
        <p style={styles.sectionText}>
          At ELVIA, we believe skincare should feel effortless, refined,
          and deeply effective. No excess. No noise. Only what your skin
          truly needs.
        </p>
      </section>

      {/* PRODUCT PREVIEW */}
      <section style={styles.productPreview}>
        <h2 style={styles.sectionTitle}>THE ESSENTIAL</h2>
        <h3 style={styles.productName}>ÉCLATIS™ SPF 50+</h3>
        <p style={styles.sectionText}>
          Ultra-light, invisible sun protection crafted for everyday wear.
        </p>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/product")}
        >
          View Product
        </button>
      </section>

      {/* TRUST */}
      <section style={styles.trust}>
        <div style={styles.trustItem}>SPF 50+ Broad Spectrum</div>
        <div style={styles.trustItem}>No White Cast</div>
        <div style={styles.trustItem}>Dermatologically Tested</div>
        <div style={styles.trustItem}>Made in India</div>
      </section>
    </main>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
  },

  /* HERO with soft luxury texture */
 hero: {
  minHeight: "92vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "0 24px",
  background:
    "radial-gradient(1200px 600px at 50% -10%, #f3f3f3 0%, #ffffff 60%)",
},


  eyebrow: {
    letterSpacing: "3px",
    fontSize: "12px",
    color: "#888",
    marginBottom: "18px",
  },

  heroTitle: {
    fontSize: "44px",
    fontWeight: "500",
    lineHeight: 1.25,
    marginBottom: "24px",
    color: "#111",
  },

  heroText: {
    maxWidth: "560px",
    fontSize: "16px",
    lineHeight: 1.8,
    color: "#666",
    marginBottom: "40px",
  },

  primaryBtn: {
    padding: "16px 34px",
    borderRadius: "40px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
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

  productPreview: {
    textAlign: "center",
    padding: "120px 20px",
    background: "#fafafa",
  },

  productName: {
    fontSize: "28px",
    fontWeight: "500",
    marginBottom: "14px",
  },

  secondaryBtn: {
    marginTop: "28px",
    padding: "14px 32px",
    borderRadius: "40px",
    border: "1px solid #111",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
  },

  trust: {
    display: "flex",
    justifyContent: "center",
    gap: "28px",
    flexWrap: "wrap",
    padding: "80px 20px",
    fontSize: "14px",
    color: "#666",
  },

  trustItem: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "6px",
  },
};
