import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

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

  return (
    <footer
      ref={footerRef}
      style={{
        ...styles.footer,
        ...(visible ? styles.visible : styles.hidden),
      }}
    >
      <p style={styles.brand}>© KAEORN</p>

      <div style={styles.links}>
        {[
          ["About", "/about"],
          ["Contact", "/contact"],
          ["Privacy", "/privacy"],
          ["Terms", "/terms"],
          ["Refund", "/refund"],
          ["Shipping", "/shipping"],
        ].map(([label, link]) => (
          <a
            key={label}
            href={link}
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

      <div style={styles.socials}>
        {["Instagram", "YouTube"].map((platform) => (
          <a
            key={platform}
            href={`https://${platform.toLowerCase()}.com`}
            target="_blank"
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
    </footer>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  footer: {
    textAlign: "center",
    padding: "72px 20px",
    color: "#777",
    background: "#fafafa",
    transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
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
    letterSpacing: "2.5px",
    marginBottom: "22px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "22px",
    flexWrap: "wrap",
    marginBottom: "22px",
    fontSize: "13px",
  },
  link: {
    color: "#777",
    textDecoration: "none",
    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "26px",
    fontSize: "13px",
  },
  icon: {
    color: "#777",
    textDecoration: "none",
    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
  },
  linkHover: {
    opacity: 0.6,
    transform: "translateY(-2px)",
  },
};
