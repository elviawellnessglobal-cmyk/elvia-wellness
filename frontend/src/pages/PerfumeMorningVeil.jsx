import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

/* ---------------- TEMP PERFUME IMAGES (REPLACE LATER) ---------------- */
const imgFront =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769084646/ChatGPT_Image_Jan_22_2026_05_53_40_PM_fxiq9d.png";
const imgSide = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769084897/ChatGPT_Image_Jan_22_2026_05_57_33_PM_omnxe9.png";
const imgAngle = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769084884/ChatGPT_Image_Jan_22_2026_05_54_05_PM_hzov1u.png";
const imgDetail = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769085158/ChatGPT_Image_Jan_22_2026_06_01_54_PM_pz0txu.png";
const imgMood = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769085354/ChatGPT_Image_Jan_22_2026_06_05_02_PM_hvhel5.png";
const imgBox = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769085557/ChatGPT_Image_Jan_22_2026_06_08_42_PM_nlsn7w.png";

const images = [
  imgFront,
  imgSide,
  imgAngle,
  imgDetail,
  imgMood,
  imgBox,
];

export default function PerfumeMorningVeil() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const productRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [authType, setAuthType] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    productRef.current && obs.observe(productRef.current);
    return () => obs.disconnect();
  }, []);

  /* -------- PRODUCT (UNISEX) -------- */
  const product = {
    id: "perfume-veil-unisex",
    name: "KAEORN — VEIL",
    price: 3499,
  };

  function handleOrderNow() {
    if (!user) {
      setAuthType("login");
      return;
    }

    addToCart({
      ...product,
      image: activeImage,
      quantity: 1,
    });

    navigate("/cart");
  }

  function handleAddToCartOnly() {
    if (!user) {
      setAuthType("login");
      return;
    }

    addToCart({
      ...product,
      image: activeImage,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <>
      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}

      {/* ---------------- PRODUCT SECTION ---------------- */}
      <section
        ref={productRef}
        style={{
          ...styles.productSection,
          ...(visible ? styles.show : styles.hide),
        }}
      >
        {/* IMAGES */}
        <div style={styles.imageColumn}>
          <img
            src={activeImage}
            alt={product.name}
            style={styles.mainImage}
          />

          <div style={styles.thumbnailRow}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setActiveImage(img)}
                style={{
                  ...styles.thumbnail,
                  opacity: activeImage === img ? 1 : 0.45,
                }}
              />
            ))}
          </div>

          {/* EDITORIAL CAPTION */}
          <div style={styles.imageNote}>
            <div style={styles.line} />
            <p style={styles.imageQuote}>
              A fragrance that blends seamlessly with skin —
              soft, intimate, quietly unforgettable.
            </p>
            <div style={styles.imageMeta}>
              <span>Unisex</span>
              <span>Eau de Parfum</span>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div style={styles.detailsColumn}>
          <p style={styles.category}>FINE FRAGRANCE · UNISEX</p>

          <h1 style={styles.productTitle}>
            KAEORN — VEIL
          </h1>

          <p style={styles.subtitle}>
            VEIL is a modern unisex fragrance designed to feel like
            a second skin. Clean, creamy, and comforting —
            it settles quietly, becoming personal to the wearer.
            Minimal, genderless, and deeply refined.
          </p>

          <p style={styles.price}>₹3,499</p>

          {/* CTA */}
          <div style={styles.ctaRow}>
            <button style={styles.buyButton} onClick={handleOrderNow}>
              Order Now
            </button>

            <div style={{ position: "relative" }}>
              <button
                style={{
                  ...styles.addToCartBtn,
                  ...(added ? styles.addedBtn : {}),
                }}
                onClick={handleAddToCartOnly}
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>

              {added && (
                <div style={styles.toast}>
                  Added to cart · Open <strong>Profile → Cart</strong>
                </div>
              )}
            </div>
          </div>

          {/* BADGES */}
          <div style={styles.badges}>
            <span>Unisex</span>
            <span>Skin-scent luxury</span>
            <span>Soft Sillage</span>
          </div>

          {/* SCENT MOOD */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Scent Mood</h4>
            <p>
              Clean · Creamy · Comforting.
              Designed for those who prefer subtle presence
              over bold projection.
            </p>
          </div>

          {/* PERFORMANCE */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Performance</h4>
            <ul style={styles.list}>
              <li>Longevity: 8–10 hours</li>
              <li>Projection: Soft, skin-close aura</li>
              <li>Sillage: Intimate and personal</li>
              <li>Concentration: Eau de Parfum</li>
            </ul>
          </div>

          {/* WHEN TO WEAR */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>When to Wear</h4>
            <p>
              Ideal for daily wear, work settings, quiet evenings,
              and personal moments. A versatile signature
              for all seasons.
            </p>
          </div>

          {/* PHILOSOPHY */}
          <div style={styles.recommendBox}>
            <p style={styles.recommendText}>
              <strong>Luxury does not announce itself.</strong>
              <br />
              It feels natural. Effortless. Personal.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  productSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: 90,
    maxWidth: 1200,
    margin: "56px auto",
    padding: "0 24px",
  },

  hide: { opacity: 0, transform: "translateY(40px)" },
  show: { opacity: 1, transform: "translateY(0)", transition: "0.9s ease" },

  imageColumn: { flex: 1, minWidth: 320 },
  mainImage: { width: "100%", borderRadius: 24 },
  thumbnailRow: { display: "flex", gap: 14, marginTop: 20 },

  thumbnail: {
    width: 74,
    height: 74,
    borderRadius: 14,
    cursor: "pointer",
    objectFit: "cover",
  },

  imageNote: {
    marginTop: 42,
    maxWidth: 420,
    color: "#555",
  },

  line: {
    width: 42,
    height: 1,
    background: "#ddd",
    marginBottom: 18,
  },

  imageQuote: {
    fontSize: 15,
    lineHeight: 1.8,
    fontStyle: "italic",
    marginBottom: 14,
    color: "#444",
  },

  imageMeta: {
    display: "flex",
    gap: 18,
    fontSize: 12.5,
    letterSpacing: 1,
    color: "#888",
  },

  detailsColumn: { flex: 1, minWidth: 320 },
  category: { fontSize: 12, letterSpacing: 2.5, color: "#888" },
  productTitle: { fontSize: 40, fontWeight: 500, marginTop: 6 },
  subtitle: { fontSize: 16, color: "#555", lineHeight: 1.8 },
  price: { fontSize: 24, margin: "26px 0" },

  ctaRow: { display: "flex", gap: 16, flexWrap: "wrap" },

  buyButton: {
    padding: "16px 34px",
    borderRadius: 50,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 15,
    cursor: "pointer",
  },

  addToCartBtn: {
    padding: "16px 34px",
    borderRadius: 50,
    background: "transparent",
    color: "#111",
    border: "1px solid #111",
    fontSize: 15,
    cursor: "pointer",
  },

  addedBtn: {
    background: "#111",
    color: "#fff",
  },

  toast: {
    position: "absolute",
    top: "110%",
    background: "#111",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 14,
    fontSize: 12.5,
    marginTop: 8,
    whiteSpace: "nowrap",
  },

  badges: {
    display: "flex",
    gap: 22,
    fontSize: 13,
    marginTop: 26,
    color: "#555",
    flexWrap: "wrap",
  },

  section: {
    marginTop: 34,
    fontSize: 15.5,
    lineHeight: 1.9,
    color: "#333",
    maxWidth: 520,
  },

  sectionTitle: {
    fontSize: 16.5,
    fontWeight: 500,
    marginBottom: 12,
  },

  list: {
    paddingLeft: 18,
    marginBottom: 14,
  },

  recommendBox: {
    marginTop: 44,
    padding: "26px 28px",
    borderRadius: 22,
    background: "rgba(0,0,0,0.03)",
    maxWidth: 520,
  },

  recommendText: {
    fontSize: 15,
    lineHeight: 1.8,
    color: "#333",
  },
};
