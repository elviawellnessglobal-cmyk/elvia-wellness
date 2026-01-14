import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Youtube, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onLogin }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = window.innerWidth < 768;

  return (
    <header style={styles.header}>
      {/* BRAND */}
      <h2 style={styles.logo} onClick={() => navigate("/")}>
       KAEORN
      </h2>

      {/* RIGHT */}
      <div style={styles.right}>
        {/* SOCIALS */}
        <a
          href="https://www.instagram.com/elviawellness/"
          target="_blank"
          style={styles.icon}
        >
          <Instagram size={18} />
        </a>

        <a
          href="https://www.youtube.com/@ElviaWellness"
          target="_blank"
          style={styles.icon}
        >
          <Youtube size={18} />
        </a>

        {/* CART */}
        <span
          style={styles.icon}
          onClick={() => (user ? navigate("/cart") : onLogin())}
        >
          <ShoppingBag size={18} />
        </span>

        {/* AUTH (DESKTOP ONLY) */}
        {!isMobile && (
          <>
            {!user ? (
              <button style={styles.authBtn} onClick={onLogin}>
                Login
              </button>
            ) : (
              <button style={styles.authBtn} onClick={logout}>
                Logout
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
    borderBottom: "1px solid #eee",
  },

  logo: {
    fontSize: "16px",
    letterSpacing: "3px",
    fontWeight: "500",
    cursor: "pointer",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  icon: {
    cursor: "pointer",
    color: "#111",
    display: "flex",
    alignItems: "center",
  },

  authBtn: {
    border: "1px solid #111",
    background: "transparent",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    cursor: "pointer",
  },
};
