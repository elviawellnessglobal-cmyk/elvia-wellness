import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

/* ---------------- TEMP PERFUME IMAGES ---------------- */
const imgFront =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769081520/ChatGPT_Image_Jan_22_2026_05_01_01_PM_nzxsqv.png";
const imgSide = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769082852/ChatGPT_Image_Jan_22_2026_05_22_45_PM_acztym.png";
const imgAngle = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083201/ChatGPT_Image_Jan_22_2026_05_29_15_PM_o5qpcx.png";
const imgDetail = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083325/ChatGPT_Image_Jan_22_2026_05_30_28_PM_marrlk.png";
const imgMood = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083469/ChatGPT_Image_Jan_22_2026_05_33_06_PM_ucfz1x.png";
const imgBox = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083604/ChatGPT_Image_Jan_22_2026_05_35_29_PM_sgvxbh.png";

const images = [
  imgAngle,
  imgSide,
  imgFront,
  imgDetail,
  imgMood,
  imgBox,
];

export default function PerfumeQuietWoods() {
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

  const product = {
    id: "perfume-quiet-woods",
    name: "KAEORN — QUIET WOODS",
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
              Stillness. Depth. A presence that feels grounded and calm.
            </p>
            <div style={styles.imageMeta}>
              <span>Eau de Parfum</span>
              <span>Woody · Musky</span>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div style={styles.detailsColumn}>
          <p style={styles.category}>FINE FRAGRANCE</p>

          <h1 style={styles.productTitle}>
            KAEORN — QUIET WOODS
          </h1>

          <p style={styles.subtitle}>
            A calm, grounding fragrance inspired by still forests and warm air.
            Quiet Woods is soft yet assured — a modern woody scent designed to
            feel intimate, composed, and deeply reassuring.
          </p>

          <p style={styles.price}>₹3,499</p>

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

          <div style={styles.badges}>
            <span>Eau de Parfum</span>
            <span>Woody</span>
            <span>Calm Sillage</span>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Scent Mood</h4>
            <p>
              Grounded · Quietly confident · Warm and reassuring.
              Designed for those who prefer presence over projection.
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Performance</h4>
            <ul style={styles.list}>
              <li>Longevity: 7–9 hours</li>
              <li>Projection: Soft to moderate</li>
              <li>Sillage: Intimate, close to skin</li>
              <li>Concentration: Eau de Parfum</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>When to Wear</h4>
            <p>
              Ideal for daily wear, office settings, evening moments,
              and cooler seasons. A versatile signature for modern life.
            </p>
          </div>

          <div style={styles.recommendBox}>
            <p style={styles.recommendText}>
              <strong>Luxury does not demand attention.</strong>
              <br />
              It settles in quietly — and stays.
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
