import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "../components/AuthModal";

/* ── IMAGES ── */
const images = [
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1775383691/Apr_5_2026_03_37_30_PM_e7nqb0.png",
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1775383626/ChatGPT_Image_Apr_4_2026_11_07_27_AM_j4ve7n.png",
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1775280305/ChatGPT_Image_Apr_4_2026_10_54_03_AM_fjvuq2.png",
  "https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1775383877/ChatGPT_Image_Apr_5_2026_03_40_29_PM_h29chh.png",
];

const bg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1770669629/dc9fb4aaf164ae5f44160471f5eb9a7b_hmhsw6.jpg";

const NOTES = [
  {
    src: "https://res.cloudinary.com/dvmntn6vf/image/upload/v1776062935/5f639544-7bea-4d4f-8886-9844f88585a2.png",
    name: "Bergamot",
    desc: "Fresh & luminous",
  },
  {
    src: "https://res.cloudinary.com/dvmntn6vf/image/upload/v1776062958/248c4f5d-8577-44a8-8a0c-12220e091383.png",
    name: "Pink Pepper",
    desc: "Warm spicy edge",
  },
  {
    src: "https://res.cloudinary.com/dvmntn6vf/image/upload/v1776063027/e846d0e7-23c7-4be9-a243-c4fa498cb07b.png",
    name: "Sandalwood",
    desc: "Smooth skin finish",
  },
];

const REVIEWS = [
  { stars: 5, name: "Riya, Delhi", text: "Feels like a niche European perfume." },
  { stars: 5, name: "Aarav, Mumbai", text: "Very calming and classy." },
  { stars: 4, name: "Meera, Bangalore", text: "Perfect everyday luxury scent." },
  { stars: 5, name: "Nikhil, Pune", text: "Subtle, clean and quietly addictive." },
];

/* ── ACCORDION — moved outside to avoid recreation on every render ── */
function Accordion({ title, id, open, setOpen, children }) {
  const isOpen = open === id;
  return (
    <div style={styles.accordionItem}>
      <div
        style={styles.accordionHeader}
        onClick={() => setOpen(isOpen ? null : id)}
      >
        {title}
        <span>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <div style={styles.accordionContent}>{children}</div>}
    </div>
  );
}

export default function PerfumeMorningVeil() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const productRef = useRef(null);
  const [visible, setVisible] = useState(false);
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

  const originalPrice = 1499;
  const price = 1199;
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  function handleOrderNow() {
    if (!user) { setAuthType("login"); return; }
    addToCart("/perfume/morning-veil");
    navigate("/cart");
  }

  function handleAddToCartOnly() {
    if (!user) { setAuthType("login"); return; }
    addToCart("/perfume/morning-veil");
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <>
      <Helmet>
        <title>Morning Veil — Unisex Eau de Parfum | KAEORN</title>
        <meta
          name="description"
          content="Morning Veil by Kaeorn — a clean, airy unisex Eau de Parfum with notes of Bergamot, Pink Pepper, and Sandalwood. Quiet luxury, made in India."
        />
        <link rel="canonical" href="https://www.kaeorn.com/perfume/morning-veil" />
        <meta property="og:title" content="Morning Veil — Unisex Eau de Parfum | KAEORN" />
        <meta property="og:description" content="A clean, airy unisex Eau de Parfum. Notes of Bergamot, Pink Pepper & Sandalwood. ₹1,199 — Made in India." />
        <meta property="og:image" content="https://res.cloudinary.com/dvmntn6vf/image/upload/f_auto,q_auto,w_900/v1775280305/ChatGPT_Image_Apr_4_2026_10_54_03_AM_fjvuq2.png" />
        <meta property="og:url" content="https://www.kaeorn.com/perfume/morning-veil" />
        <meta property="og:type" content="product" />
      </Helmet>

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
        {/* ── GALLERY ── */}
        <div style={styles.gallery}>
          {images.map((img, i) => (
            <div key={i} style={styles.slide}>
              <img
                src={img}
                alt={`KAEORN Morning Veil Eau de Parfum — view ${i + 1}`}
                style={styles.mainImage}
              />
            </div>
          ))}
        </div>

        {/* ── DETAILS ── */}
        <div
          style={{
            ...styles.detailsColumn,
            backgroundImage: `url(${bg})`,
          }}
        >
          <div style={styles.overlay} />
          <div style={styles.inner}>

            <p style={styles.category}>UNISEX · EAU DE PARFUM</p>
            <h1 style={styles.productTitle}>MORNING VEIL</h1>
            <span style={styles.volume}>100 ml</span>

            <div style={styles.priceWrap}>
              <span style={styles.price}>₹{price}</span>
              <span style={styles.originalPrice}>₹{originalPrice}</span>
              <span style={styles.discount}>{discountPercent}% OFF</span>
            </div>

            <p style={styles.subtitle}>
              Not worn to be announced — worn to be remembered. Morning Veil
              dissolves into skin, staying close and quiet all day. Clean,
              creamy, and effortlessly composed.
            </p>

            <div style={styles.ctaRow}>
              <button style={styles.buyButton} onClick={handleOrderNow}>
                Order Now
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

            {/* ── ACCORDIONS ── */}
            <div style={styles.accordionWrap}>

              <Accordion title="DESCRIPTION" id="description" open={open} setOpen={setOpen}>
                Morning Veil opens with a clean, creamy softness that feels
                instantly refined. Rather than projecting outward, it stays
                close to the skin — creating an intimate warmth that's neither
                sweet nor sharp, just balanced. As it settles, it becomes
                something personal. A scent that adapts to your skin chemistry,
                your mood, and your day. Made for moments that don't need drama
                to feel special.
              </Accordion>

              <Accordion title="HOW IT MAKES YOU FEEL" id="feel" open={open} setOpen={setOpen}>
                Calm. Composed. Quietly confident. Morning Veil doesn't demand
                attention — it earns it. The feeling is somewhere between clean
                skin, soft linen, and the kind of stillness you carry when
                you're comfortable with yourself. Comforting without being
                heavy. Elegant without trying.
              </Accordion>

              <Accordion title="NOTES" id="notes" open={open} setOpen={setOpen}>
                <div style={styles.notesWrap}>
                  {NOTES.map((n) => (
                    <div key={n.name} style={styles.noteItem}>
                      <img src={n.src} alt={n.name} style={styles.noteImage} />
                      <div style={styles.noteTitle}>{n.name}</div>
                      <div style={styles.noteDesc}>{n.desc}</div>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion title="PERFORMANCE" id="performance" open={open} setOpen={setOpen}>
                Morning Veil is an Eau de Parfum built for quiet presence, not
                projection. On skin, it lasts 8–10 hours with a soft sillage —
                noticeable only when someone is close. The kind of scent that
                makes people lean in, not step back.
              </Accordion>

              <Accordion title="HOW TO APPLY" id="apply" open={open} setOpen={setOpen}>
                Apply to clean, moisturized skin — 2 to 4 sprays is enough.
                Pulse points work best: sides of the neck, wrists, behind the
                ears, collarbone. Don't rub after spraying. Let it settle and
                develop with your body heat for the smoothest, longest-lasting
                result.
              </Accordion>

              <Accordion title="REVIEWS" id="reviews" open={open} setOpen={setOpen}>
                <div style={styles.reviewsWrap}>
                  {REVIEWS.map((r, i) => (
                    <div key={i} style={styles.reviewItem}>
                      <div style={styles.reviewStars}>
                        {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                      </div>
                      <p style={styles.reviewText}>"{r.text}"</p>
                      <span style={styles.reviewName}>— {r.name}</span>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion title="KAEORN PHILOSOPHY" id="philosophy" open={open} setOpen={setOpen}>
                Kaeorn was built on the belief that luxury should feel
                effortless, not loud. Every fragrance is designed to enhance
                who you already are — not to make a statement, but to leave an
                impression. Quiet. Intentional. Made in India, for the world.
              </Accordion>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── STYLES ── */
const styles = {
  productSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: 90,
    maxWidth: 1200,
    margin: "75px auto",
    padding: "0 24px",
    fontFamily: "Inter, sans-serif",
  },
  hide: { opacity: 0, transform: "translateY(40px)" },
  show: { opacity: 1, transform: "translateY(0)", transition: "0.9s ease" },
  gallery: {
    flex: 1,
    minWidth: 320,
    display: "flex",
    overflowX: "auto",
    gap: 24,
    scrollSnapType: "x mandatory",
  },
  slide: { minWidth: "100%", scrollSnapAlign: "center" },
  mainImage: {
    width: "100%",
    borderRadius: 24,
    objectFit: "cover",
    boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
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
  productTitle: { fontSize: 40, fontWeight: 500, margin: "8px 0 4px" },
  volume: {
    fontSize: 11,
    color: "#9a9089",
    letterSpacing: "0.1em",
    fontFamily: "'DM Mono', monospace",
    display: "block",
    marginBottom: "16px",
  },
  priceWrap: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16 },
  price: { fontSize: 28, fontWeight: 500 },
  originalPrice: { textDecoration: "line-through", color: "#888" },
  discount: { color: "#e91e63", fontSize: 13 },
  subtitle: { fontSize: 15.5, color: "#555", lineHeight: 1.85 },
  ctaRow: { display: "flex", gap: 16, marginTop: 20 },
  buyButton: {
    padding: "16px 34px",
    borderRadius: 50,
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
  },
  addToCartBtn: {
    padding: "16px 34px",
    borderRadius: 50,
    border: "1px solid #111",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
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
    fontSize: 15,
    lineHeight: 1.9,
    color: "#555",
  },
  notesWrap: {
    display: "flex",
    justifyContent: "space-between",
    gap: 30,
    marginTop: 10,
    flexWrap: "wrap",
  },
  noteItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    minWidth: 90,
  },
  noteImage: { width: 42, height: 42, objectFit: "contain", marginBottom: 6 },
  noteTitle: { fontSize: 14, letterSpacing: 1.2, fontWeight: 500 },
  noteDesc: { fontSize: 12.5, color: "#777", fontStyle: "italic", textAlign: "center" },
  reviewsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 4,
  },
  reviewItem: {
    borderLeft: "2px solid #eee",
    paddingLeft: 14,
  },
  reviewStars: {
    color: "#c9a96e",
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14.5,
    color: "#444",
    lineHeight: 1.7,
    margin: "0 0 4px",
    fontStyle: "italic",
  },
  reviewName: {
    fontSize: 12,
    color: "#999",
    letterSpacing: 1,
  },
};