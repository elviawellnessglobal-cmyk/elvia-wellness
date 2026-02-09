import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";

/* ---------------- IMAGES ---------------- */
const imgFront =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769081520/ChatGPT_Image_Jan_22_2026_05_01_01_PM_nzxsqv.png";
const imgSide =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769082852/ChatGPT_Image_Jan_22_2026_05_22_45_PM_acztym.png";
const imgAngle =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083201/ChatGPT_Image_Jan_22_2026_05_29_15_PM_o5qpcx.png";
const imgDetail =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083325/ChatGPT_Image_Jan_22_2026_05_30_28_PM_marrlk.png";
const imgMood =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083469/ChatGPT_Image_Jan_22_2026_05_33_06_PM_ucfz1x.png";
const imgBox =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1769083604/ChatGPT_Image_Jan_22_2026_05_35_29_PM_sgvxbh.png";

const images = [imgAngle, imgSide, imgFront, imgDetail, imgMood, imgBox];

/* 🌸 BACKGROUND IMAGE */
const bg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1770667104/763a2a0bb343a5b614a2f890d267a37c_sqezd5.jpg";

export default function PerfumeQuietWoods() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const productRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [authType, setAuthType] = useState(null);
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState("description");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    productRef.current && obs.observe(productRef.current);
    return () => obs.disconnect();
  }, []);

  const product = {
    id: "perfume-soie-femme",
    name: "KAEORN — SOIE FEMME",
    price: 2899,
  };

  const originalPrice = 8799;
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  function handleOrderNow() {
    if (!user) {
      setAuthType("login");
      return;
    }

    addToCart({ ...product, image: activeImage, quantity: 1 });
    navigate("/cart");
  }

  function handleAddToCartOnly() {
    if (!user) {
      setAuthType("login");
      return;
    }

    addToCart({ ...product, image: activeImage, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  function Accordion({ title, id, children }) {
    const isOpen = open === id;

    return (
      <div style={styles.accordionItem}>
        <div style={styles.accordionHeader} onClick={() => setOpen(isOpen ? null : id)}>
          {title}
          <span>{isOpen ? "−" : "+"}</span>
        </div>
        {isOpen && <div style={styles.accordionContent}>{children}</div>}
      </div>
    );
  }

  return (
    <>
      {authType && <AuthModal type={authType} onClose={() => setAuthType(null)} />}

      <section
        ref={productRef}
        style={{
          ...styles.productSection,
          ...(visible ? styles.show : styles.hide),
        }}
      >
        {/* IMAGE SIDE */}
        <div style={styles.imageColumn}>
          <img src={activeImage} alt="" style={styles.mainImage} />

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
        </div>

        {/* DETAILS SIDE */}
        <div
          style={{
            ...styles.detailsColumn,
            backgroundImage: `url(${bg})`,
          }}
        >
          <div style={styles.overlay} />

          <div style={styles.inner}>
            <p style={styles.category}>WOMEN · EAU DE PARFUM</p>

            <h1 style={styles.productTitle}>SOIE FEMME</h1>

            <div style={styles.saleBadge}>RELEASE SALE</div>

            <div style={styles.priceWrap}>
              <span style={styles.price}>₹{product.price}</span>
              <span style={styles.originalPrice}>₹{originalPrice}</span>
              <span style={styles.discount}>{discountPercent}% OFF</span>
            </div>

            <p style={styles.subtitle}>
              A luminous feminine fragrance designed for elegance without effort.
              Smooth, soft and modern — crafted to feel intimate yet unforgettable.
            </p>

            <div style={styles.ctaRow}>
              <button style={styles.buyButton} onClick={handleOrderNow}>
                Buy Now
              </button>

              <button
                style={{
                  ...styles.addToCartBtn,
                  ...(added ? styles.addedBtn : {}),
                }}
                onClick={handleAddToCartOnly}
              >
                {added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>

            {/* CHANEL STYLE DROPDOWNS */}
            <div style={styles.accordionWrap}>
              <Accordion title="DESCRIPTION" id="description">
                SOIE FEMME opens with a luminous softness that instantly feels elegant and modern.
                The scent sits close to the skin, creating a refined aura rather than overwhelming
                projection. As it evolves, a gentle warmth appears — creamy, feminine and quietly
                confident. Designed for women who appreciate understated luxury, this fragrance feels
                polished, graceful and emotionally comforting. People often notice it when they come
                closer rather than across the room, making it deeply personal and intimate.
                <br /><br />
                • Smooth feminine elegance<br/>
                • Soft luxury presence<br/>
                • Designed for everyday sophistication
              </Accordion>

              <Accordion title="HOW IT MAKES YOU FEEL" id="feel">
                Wearing SOIE FEMME feels like stepping into a calm, confident version of yourself.
                The fragrance creates a soft emotional warmth — gentle yet empowering. It doesn’t try
                to dominate a space; instead, it builds an aura that feels graceful and effortless.
                Many describe it as comforting, intimate and quietly romantic.
                <br /><br />
                • Feminine confidence<br/>
                • Calm luxury energy<br/>
                • Soft romantic presence
              </Accordion>

              <Accordion title="PERFORMANCE" id="performance">
                Created with a high-concentration Eau de Parfum structure, SOIE FEMME is designed
                to last throughout the day with a smooth evolution. Expect a soft projection that
                feels premium rather than loud.
                <br /><br />
                • Longevity: up to 24 hours<br/>
                • Projection: soft luxury aura<br/>
                • Sillage: elegant feminine trail
              </Accordion>

              <Accordion title="HOW TO APPLY" id="apply">
                Apply 2–4 sprays on pulse points to allow the fragrance to develop naturally.
                Neck, wrists and collarbone are ideal areas. Avoid rubbing the perfume into the skin
                — letting it settle naturally keeps the scent smoother and more refined.
                <br /><br />
                • Neck sides<br/>
                • Behind ears<br/>
                • Wrists & collarbone
              </Accordion>

              <Accordion title="REVIEWS FROM INDIA" id="reviews">
                ★★★★★ Riya – Delhi: “Feels like an expensive designer perfume.”<br/><br/>
                ★★★★★ Aanya – Mumbai: “Very soft, elegant and feminine.”<br/><br/>
                ★★★★☆ Kavya – Bangalore: “Perfect daily luxury scent.”
              </Accordion>

              <Accordion title="KAEORN PHILOSOPHY" id="philosophy">
                KAEORN fragrances are built around quiet luxury — a philosophy where beauty is
                refined, intentional and deeply personal. Rather than loud projection, our scents
                focus on emotional presence and modern elegance.
              </Accordion>
            </div>
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
    fontFamily: "Inter, sans-serif",
  },

  hide: { opacity: 0, transform: "translateY(40px)" },
  show: { opacity: 1, transform: "translateY(0)", transition: "0.9s ease" },

  imageColumn: { flex: 1, minWidth: 320 },

  mainImage: {
    width: "100%",
    borderRadius: 24,
    boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
  },

  thumbnailRow: { display: "flex", gap: 14, marginTop: 20 },

  thumbnail: {
    width: 74,
    height: 74,
    borderRadius: 14,
    cursor: "pointer",
    objectFit: "cover",
  },

  detailsColumn: {
    flex: 1,
    minWidth: 320,
    borderRadius: 28,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.93)",
  },

  inner: { position: "relative", padding: "40px" },

  category: { fontSize: 12, letterSpacing: 2.5, color: "#888" },
  productTitle: { fontSize: 40, fontWeight: 500, marginTop: 6 },

  saleBadge: {
    marginTop: 10,
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: 999,
    background: "#111",
    color: "#fff",
    fontSize: 11,
    letterSpacing: 2,
  },

  priceWrap: { display: "flex", gap: 12, alignItems: "center" },
  price: { fontSize: 28, fontWeight: 500 },
  originalPrice: { textDecoration: "line-through", color: "#888" },
  discount: { color: "#e91e63", fontSize: 13 },

  subtitle: { fontSize: 16, color: "#555", lineHeight: 1.8 },

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
    border: "1px solid #111",
    fontSize: 15,
    cursor: "pointer",
  },

  addedBtn: { background: "#111", color: "#fff" },

  accordionWrap: { marginTop: 30, borderTop: "1px solid #eee" },

  accordionItem: { borderBottom: "1px solid #eee", padding: "22px 0" },

  accordionHeader: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: 500,
  },

  accordionContent: {
    marginTop: 16,
    fontSize: 15.5,
    lineHeight: 1.9,
    color: "#555",
  },
};
