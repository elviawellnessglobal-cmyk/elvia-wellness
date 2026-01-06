import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";

/* ---------------- CLOUDINARY IMAGES ---------------- */
const img1 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1767685044/eclatis-1_hradob.png";

const img2 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1767685188/eclatis-2_kceebo.png";

const img3 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1767685039/eclatis-3_hkfghk.png";

const img4 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1767685052/eclatis-4_qpvjrk.png";

const images = [img1, img2, img3, img4];

export default function App() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addToCart } = useCart();

  /* ---------------- SCROLL ANIMATION ---------------- */
  const productRef = useRef(null);
  const [productVisible, setProductVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProductVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (productRef.current) observer.observe(productRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- PRODUCT DATA ---------------- */
  const product = {
    id: "eclatis-spf50",
    name: "ÉCLATIS™ SPF 50+",
    price: 2499,
  };

  /* ---------------- STATE ---------------- */
  const [activeImage, setActiveImage] = useState(images[0]);
  const [authType, setAuthType] = useState(null);
  const isMobile = window.innerWidth < 768;

  /* ---------------- HANDLERS ---------------- */
  function handleAddToCart() {
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

  function handleCartClick() {
    if (!user) {
      setAuthType("login");
      return;
    }
    navigate("/cart");
  }

  return (
    <>
      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}

      {/* HEADER */}
      <header style={styles.header}>
        <h2 style={styles.logo}>ELVIA WELLNESS</h2>

        <div style={styles.headerRight}>
          <a href="https://instagram.com" target="_blank" style={styles.link}>
            Instagram
          </a>
          <a href="https://youtube.com" target="_blank" style={styles.link}>
            YouTube
          </a>

          {!user ? (
            <>
              <button style={styles.authBtn} onClick={() => setAuthType("login")}>
                Login
              </button>
              <button
                style={styles.authBtn}
                onClick={() => setAuthType("signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <button style={styles.authBtn} onClick={logout}>
              Logout
            </button>
          )}

          <span style={styles.cart} onClick={handleCartClick}>
            🛒
          </span>
        </div>
      </header>

      {/* PRODUCT SECTION */}
      <section
        ref={productRef}
        style={{
          ...styles.productSection,
          gap: isMobile ? "48px" : "80px",
          margin: isMobile ? "32px auto" : "48px auto",
          ...(productVisible ? styles.productVisible : styles.productHidden),
        }}
      >
        {/* LEFT: IMAGES */}
        <div style={styles.imageColumn}>
          <img
            src={activeImage}
            alt="ÉCLATIS™ SPF 50+"
            style={styles.mainImage}
            loading="lazy"
          />

          <div style={styles.thumbnailRow}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumbnail"
                loading="lazy"
                onClick={() => setActiveImage(img)}
                style={{
                  ...styles.thumbnail,
                  opacity: activeImage === img ? 1 : 0.55,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div style={styles.detailsColumn}>
          <p style={styles.category}>SUN PROTECTION</p>
          <h1 style={styles.productTitle}>ÉCLATIS™ SPF 50+</h1>
          <p style={styles.subtitle}>
            Ultra-light, invisible sunscreen with broad-spectrum protection.
          </p>
          <p style={styles.price}>₹2,499</p>

          <button style={styles.buyButton} onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>BENEFITS</h3>
            <ul style={styles.list}>
              <li>No white cast — suitable for all skin tones</li>
              <li>Broad-spectrum UVA & UVB protection</li>
              <li>Lightweight, non-greasy texture</li>
              <li>Helps prevent premature aging</li>
            </ul>
          </div>

          <div
            style={{
              ...styles.inlineInfo,
              gap: isMobile ? "24px" : "32px",
            }}
          >
            <div
              style={{
                ...styles.inlineBlock,
                minWidth: isMobile ? "100%" : "220px",
              }}
            >
              <h3 style={styles.sectionTitle}>HOW TO USE</h3>
              <p style={styles.text}>
                Apply two finger-lengths evenly on face and neck as the final AM
                skincare step.
              </p>
            </div>

            <div
              style={{
                ...styles.inlineBlock,
                minWidth: isMobile ? "100%" : "220px",
              }}
            >
              <h3 style={styles.sectionTitle}>WHEN TO USE</h3>
              <p style={styles.text}>
                Daily. Reapply every 2–3 hours when exposed to sunlight.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: { letterSpacing: "3px", fontWeight: "500" },
  headerRight: { display: "flex", gap: "18px", alignItems: "center" },
  link: { textDecoration: "none", color: "#111", fontSize: "14px" },
  authBtn: {
    border: "1px solid #111",
    background: "transparent",
    padding: "6px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
  },
  cart: { fontSize: "18px", cursor: "pointer" },

  productSection: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "1200px",
    padding: "0 24px",
  },
  productHidden: { opacity: 0, transform: "translateY(40px)" },
  productVisible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
  },
  imageColumn: { flex: 1, minWidth: "300px" },
  mainImage: { width: "100%", borderRadius: "18px" },
  thumbnailRow: { display: "flex", gap: "12px", marginTop: "18px" },
  thumbnail: {
    width: "72px",
    height: "72px",
    borderRadius: "12px",
    objectFit: "cover",
    cursor: "pointer",
  },
  detailsColumn: { flex: 1, minWidth: "300px" },
  category: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#888",
    marginBottom: "8px",
  },
  productTitle: { fontSize: "34px", marginBottom: "8px" },
  subtitle: { color: "#666", lineHeight: 1.6, marginBottom: "16px" },
  price: { fontSize: "22px", fontWeight: "500", marginBottom: "24px" },
  buyButton: {
    padding: "14px 28px",
    borderRadius: "40px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    marginBottom: "32px",
  },
  section: { marginBottom: "24px" },
  sectionTitle: {
    fontSize: "13px",
    letterSpacing: "1.5px",
    marginBottom: "8px",
  },
  list: { paddingLeft: "18px", lineHeight: 1.7, color: "#444" },
  inlineInfo: { display: "flex", flexWrap: "wrap" },
  inlineBlock: { flex: 1 },
  text: { lineHeight: 1.7, color: "#444" },
};
