import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

/* ---------------- PERFUME IMAGE ---------------- */
const perfumeImg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769073214/ChatGPT_Image_Jan_22_2026_02_41_53_PM_ivh4qt.png";
  const perfumeImg2 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769078862/ChatGPT_Image_Jan_22_2026_04_17_01_PM_s8dmvb.png";
const perfumeImg3 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769079115/ChatGPT_Image_Jan_22_2026_04_21_13_PM_ogrwru.png";
  const perfumeImg4 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769079569/ChatGPT_Image_Jan_22_2026_04_28_32_PM_fxa20n.png";
  const perfumeImg5 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769078862/ChatGPT_Image_Jan_22_2026_04_17_01_PM_s8dmvb.png";
const perfumeImg6 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769079990/ChatGPT_Image_Jan_22_2026_04_35_39_PM_kssram.png";

const images = [
  perfumeImg6,
  perfumeImg2,
  perfumeImg3,
  perfumeImg4,
  perfumeImg5,
  perfumeImg,
];

export default function PerfumeSoftSkin() {
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
    id: "perfume-the-noir-men",
    name: "KAEORN — THÉ NOIR MEN",
    price: 4999,
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
              A fragrance worn not to be noticed — but remembered. KAEORN — THÉ NOIR MEN
            </p>

            <div style={styles.imageMeta}>
              <span>Eau de Parfum</span>
              <span>Woody · Aromatic · Musky</span>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div style={styles.detailsColumn}>
          <p style={styles.category}>FINE FRAGRANCE · MEN</p>

          <h1 style={styles.productTitle}>
            KAEORN — THÉ NOIR MEN
          </h1>

          <p style={styles.subtitle}>
            A modern expression of masculine elegance. Crafted for the
            man who speaks softly, yet leaves a lasting impression.
            Calm, refined, and deeply magnetic — designed to sit close
            to the skin while unfolding with quiet confidence.
          </p>

          <p style={styles.price}>₹4,999</p>

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
            <span>Woody · Aromatic · Musky</span>
            <span>Men</span>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Fragrance Profile</h4>
            <p>
              Calm masculinity · Quiet luxury · Modern confidence
            </p>
            <p>
              Best for daily wear, office, evenings, date nights,
              and refined gifting.
            </p>
          </div>

         

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Performance</h4>
            <ul style={styles.list}>
              <li>Longevity: 8–10 hours</li>
              <li>Projection: Moderate (luxury, not overpowering)</li>
              <li>Sillage: Soft, elegant trail</li>
              <li>Concentration: Eau de Parfum (18–22%)</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>How to Apply</h4>
            <ul style={styles.list}>
              <li>Neck (both sides)</li>
              <li>Wrists</li>
              <li>Behind ears</li>
              <li>Collarbone</li>
            </ul>
            <p>
              <strong>Pro tip:</strong> 2–4 sprays are enough.
              Do not rub after applying — let the fragrance settle naturally.
            </p>
          </div>

          <div style={styles.recommendBox}>
            <p style={styles.recommendText}>
              <strong>Luxury does not shout.</strong>
              <br />
              It lingers.
              <br /><br />
              KAEORN creates fragrances that are intimate, refined,
              and unforgettable — designed for those who appreciate
              modern luxury in its purest form.
            </p>
          </div>
        </div>
      </section>

      <Footer />
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
    fontSize: 25,
    lineHeight: 1.8,
    fontStyle: "italic",
    marginBottom: 5,
    color: "#444",
  },

  imageMeta: {
    marginTop:20,
    display: "flex",
    gap: 18,
    fontSize: 15.5,
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
