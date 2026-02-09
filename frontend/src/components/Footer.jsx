import { useEffect, useRef, useState } from "react";

/* 🌫️ BACKGROUND IMAGES */
const footerBg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1770671993/8de08499f5cb6e803e8484a529bca7b5_1_ondd0a.jpg";

const popupBg =
  "https://res.cloudinary.com/dvmntn6vf/image/upload/v1770666221/89fd7611007d023518c1f4c965a287df_o4p9oi.jpg";

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [openPopup, setOpenPopup] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const policyLinks = [
    "About",
    "Contact",
    "Privacy",
    "Terms",
    "Refund",
    "Shipping",
  ];

  return (
    <>
      {/* ---------------- POPUP CARD ---------------- */}
      {openPopup && (
        <div style={styles.popupWrapper} onClick={() => setOpenPopup(null)}>
          <div
            style={{
              ...styles.popupCard,
              backgroundImage: `url(${popupBg})`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.popupOverlay} />

            <div style={styles.popupInner}>
              <h3 style={styles.popupTitle}>ELVIA — {openPopup}</h3>

              <p style={styles.popupText}>
                ELVIA believes luxury should feel calm, refined and effortless.
                Every policy exists to support a smooth and elevated customer
                experience. From formulation to delivery, ELVIA focuses on
                thoughtful craftsmanship and quiet confidence.
                <br />
                <br />
                Orders are processed carefully, support remains respectful and
                every interaction is designed to feel premium. Thank you for
                choosing ELVIA — where modern beauty meets intentional luxury.
              </p>

              <button
                style={styles.closeBtn}
                onClick={() => setOpenPopup(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- FOOTER ---------------- */}
      <footer
        ref={footerRef}
        style={{
          ...styles.footer,
          backgroundImage: `url(${footerBg})`,
          ...(visible ? styles.visible : styles.hidden),
        }}
      >
        <div style={styles.footerOverlay} />

        <div style={styles.footerInner}>
          <p style={styles.brand}>© ELVIA</p>

          {/* LINKS */}
          <div style={styles.links}>
            {policyLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenPopup(label);
                }}
                style={{
                  ...styles.link,
                  ...(hovered === label ? styles.linkHover : {}),
                }}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* SOCIALS */}
          <div style={styles.socials}>
            {["Instagram", "YouTube"].map((platform) => (
              <a
                key={platform}
                href={`https://${platform.toLowerCase()}.com`}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...styles.icon,
                  ...(hovered === platform ? styles.linkHover : {}),
                }}
                onMouseEnter={() => setHovered(platform)}
                onMouseLeave={() => setHovered(null)}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  footer: {
    position: "relative",
    textAlign: "center",
    padding: "90px 20px",
    color: "#444",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
    fontFamily: `"Playfair Display","Inter",serif`,
  },

  footerOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.94)",
  },

  footerInner: {
    position: "relative",
    zIndex: 2,
  },

  hidden: {
    opacity: 0,
    transform: "translateY(40px)",
  },

  visible: {
    opacity: 1,
    transform: "translateY(0)",
  },

  brand: {
    fontSize: "12px",
    letterSpacing: "3px",
    marginBottom: "24px",
  },

  links: {
    display: "flex",
    justifyContent: "center",
    gap: "26px",
    flexWrap: "wrap",
    marginBottom: "26px",
    fontSize: "13px",
  },

  link: {
    color: "#444",
    textDecoration: "none",
    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
    cursor: "pointer",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "28px",
    fontSize: "13px",
  },

  icon: {
    color: "#444",
    textDecoration: "none",
    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
  },

  linkHover: {
    opacity: 0.6,
    transform: "translateY(-2px)",
  },

  /* 🌸 POPUP */
  popupWrapper: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
  },

  popupCard: {
    position: "relative",
    width: "100%",
    maxWidth: "520px",
    borderRadius: "26px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
    animation: "fadeUp 0.5s ease",
  },

  popupOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.94)",
  },

  popupInner: {
    position: "relative",
    padding: "40px",
    textAlign: "center",
  },

  popupTitle: {
    fontSize: "20px",
    marginBottom: "18px",
    letterSpacing: "1px",
  },

  popupText: {
    fontSize: "15px",
    lineHeight: "1.9",
    color: "#555",
    marginBottom: "26px",
  },

  closeBtn: {
    padding: "12px 28px",
    borderRadius: "40px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};
