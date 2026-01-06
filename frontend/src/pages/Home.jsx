import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 120);
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
        {/* HERO */}
        <section style={styles.hero}>
          {/* BRAND BADGE */}
          <div style={styles.brandBadge}>ELVIA WELLNESS</div>

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

        {/* PHILOSOPHY */}
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
  page: { fontFamily: "Inter, sans-serif" },

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
    marginBottom: "26px",
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
    marginBottom: "40px",
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
