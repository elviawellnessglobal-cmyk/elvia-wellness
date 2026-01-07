import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        ...styles.footer,
        ...(visible ? styles.footerVisible : styles.footerHidden),
      }}
    >
      <div style={styles.inner}>
        {/* BRAND */}
        <div style={styles.brand}>
          <h3 style={styles.logo}>NÆORA WELLNESS</h3>
          <p style={styles.tagline}>
            Premium skincare designed with intention.
          </p>

          {/* SOCIAL ICONS */}
          <div style={styles.socials}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* LEGAL LINKS */}
        <div style={styles.links}>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/privacy" style={styles.link}>Privacy</Link>
          <Link to="/refund" style={styles.link}>Refund</Link>
          <Link to="/shipping" style={styles.link}>Shipping</Link>
          <Link to="/terms" style={styles.link}>Terms</Link>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} NÆORA WELLNESS. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  footer: {
    borderTop: "1px solid #eee",
    background: "#fafafa",
    transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  footerHidden: {
    opacity: 0,
    transform: "translateY(40px)",
  },
  footerVisible: {
    opacity: 1,
    transform: "translateY(0)",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
  },
  brand: {
    maxWidth: "340px",
  },
  logo: {
    letterSpacing: "3px",
    fontWeight: "500",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "14px",
    color: "#666",
    lineHeight: 1.6,
    marginBottom: "18px",
  },
  socials: {
    display: "flex",
    gap: "14px",
  },
  socialIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#111",
    transition: "all 0.25s ease",
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontSize: "14px",
  },
  link: {
    color: "#555",
    transition: "all 0.2s ease",
  },
  bottom: {
    textAlign: "center",
    fontSize: "12px",
    color: "#777",
    padding: "16px 20px",
    borderTop: "1px solid #eee",
  },
};
