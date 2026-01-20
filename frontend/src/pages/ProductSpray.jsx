import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";
import ProfileMenu from "../components/ProfileMenu";
import { Instagram, Youtube } from "lucide-react";

/* ---------------- CLOUDINARY IMAGES (TEMP) ---------------- */
const img1 =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1768909795/ChatGPT_Image_Jan_20_2026_05_18_57_PM_vezq3m.png";
const img2 ="https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1768910313/ChatGPT_Image_Jan_19_2026_10_47_40_PM_lrcqbq.png";
const img3 = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1768910953/ChatGPT_Image_Jan_20_2026_05_37_32_PM_krakt8.png";
const img4 = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1768910513/ChatGPT_Image_Jan_20_2026_05_30_21_PM_caczgp.png";
const img5 = "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_800/v1768911211/ChatGPT_Image_Jan_20_2026_05_40_17_PM_pnnszr.png";


const images = [img1, img2, img3, img4, img5];

export default function ProductSpray() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  /* ---------------- RESPONSIVE ---------------- */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- SCROLL ANIMATION ---------------- */
  const productRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    productRef.current && obs.observe(productRef.current);
    return () => obs.disconnect();
  }, []);

  /* ---------------- PRODUCT DATA ---------------- */
  const product = {
    id: "haetsal-veil-spray-spf50", // UNIQUE ID (important)
    name: "Haetsal Veil™ Spray SPF 50+ PA++++",
    price: 2699,
  };

  /* ---------------- STATE ---------------- */
  const [activeImage, setActiveImage] = useState(images[0]);
  const [authType, setAuthType] = useState(null);

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

      {/* ---------------- HEADER ---------------- */}
      <header style={styles.header}>
        <h2 style={styles.logo} onClick={() => navigate("/")}>
          KAEORN
        </h2>

        <div style={styles.headerRight}>
          {!isMobile ? (
            <>
              <a
                href="https://www.instagram.com/elviawellness/"
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@ElviaWellness"
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                YouTube
              </a>
            </>
          ) : (
            <>
              <Instagram size={18} />
              <Youtube size={18} />
            </>
          )}

          {!user ? (
            <>
              <button
                style={styles.authBtn}
                onClick={() => setAuthType("login")}
              >
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
            <ProfileMenu />
          )}

          <span style={styles.cart} onClick={handleCartClick}>
            🛒
          </span>
        </div>
      </header>

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
          <img src={activeImage} alt={product.name} style={styles.mainImage} />

          <div style={styles.thumbnailRow}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                style={{
                  ...styles.thumbnail,
                  opacity: activeImage === img ? 1 : 0.45,
                }}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div style={styles.detailsColumn}>
          <p style={styles.category}>SUN PROTECTION</p>

          <h1 style={styles.productTitle}>
            Haetsal Veil™ Spray SPF 50+ PA++++
          </h1>

          <p style={styles.koreanName}>햇살베일™ 선스프레이</p>

          <p style={styles.subtitle}>
            A fine, ultra-light sunscreen mist designed for effortless
            reapplication — anytime, anywhere.
          </p>

          <p style={styles.price}>₹2,699</p>

          <button style={styles.buyButton} onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* BADGES */}
          <div style={styles.badges}>
            <span>No White Cast</span>
            <span>On-the-Go Friendly</span>
            <span>Daily Wear</span>
          </div>

          {/* HOW TO USE */}
          <div style={styles.quickUse}>
            <h4 style={styles.quickUseTitle}>How to Use</h4>
            <p>
              Hold the spray 10–15 cm away and mist evenly over face and neck
              as the final step of your morning routine.
            </p>
            <p>
              Reapply every 2–3 hours, especially after sweating or outdoor
              exposure.
            </p>
          </div>

          {/* BENEFITS */}
          <div style={styles.benefits}>
            <h4 style={styles.benefitsTitle}>Why You’ll Love It</h4>
            <ul style={styles.benefitsList}>
              <li>SPF 50+ PA++++ broad-spectrum protection</li>
              <li>Ultra-fine mist — no heavy or greasy feel</li>
              <li>Perfect for reapplication over makeup</li>
              <li>Zero white cast on all skin tones</li>
              <li>Ideal for humid and tropical climates</li>
              <li>Non-comedogenic and breathable</li>
            </ul>
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
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 22px",
    maxWidth: 1200,
    margin: "0 auto",
    zIndex: 10,
  },
  logo: { letterSpacing: 3, cursor: "pointer", fontWeight: 500 },
  headerRight: { display: "flex", gap: 18, alignItems: "center" },
  link: { color: "#111", textDecoration: "none", fontSize: 14 },
  authBtn: {
    border: "1px solid #111",
    background: "transparent",
    padding: "6px 16px",
    borderRadius: 22,
    cursor: "pointer",
  },
  cart: { cursor: "pointer" },

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

  detailsColumn: { flex: 1, minWidth: 320 },
  category: { fontSize: 12, letterSpacing: 2.5, color: "#888" },
  productTitle: { fontSize: 40, fontWeight: 500, marginTop: 6 },
  koreanName: { fontSize: 16, color: "#777", marginBottom: 18 },
  subtitle: { fontSize: 16, color: "#555", lineHeight: 1.8 },
  price: { fontSize: 24, margin: "26px 0" },

  buyButton: {
    padding: "16px 34px",
    borderRadius: 50,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 15,
    cursor: "pointer",
  },

  badges: {
    display: "flex",
    gap: 22,
    fontSize: 13,
    marginTop: 26,
    color: "#555",
    flexWrap: "wrap",
  },

  quickUse: {
    marginTop: 34,
    fontSize: 15.5,
    lineHeight: 1.9,
    color: "#333",
    maxWidth: 460,
  },
  quickUseTitle: {
    fontSize: 16.5,
    fontWeight: 500,
    marginBottom: 12,
  },

  benefits: {
    marginTop: 34,
    maxWidth: 460,
  },
  benefitsTitle: {
    fontSize: 16.5,
    fontWeight: 500,
    marginBottom: 14,
  },
  benefitsList: {
    fontSize: 14.5,
    lineHeight: 1.9,
    color: "#444",
    paddingLeft: 18,
  },
};
