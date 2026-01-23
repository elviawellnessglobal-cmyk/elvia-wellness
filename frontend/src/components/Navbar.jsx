import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Youtube, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [showAuth, setShowAuth] = useState(false);
  const isMobile = window.innerWidth < 768;

  /* ---------------- BACK BUTTON LOGIC ---------------- */
  const showBack =
    location.pathname !== "/" &&
    !location.pathname.startsWith("/admin");

  return (
    <>
      {/* AUTH MODAL */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <header style={styles.header}>
        {/* LEFT */}
        <div style={styles.left}>
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              style={styles.backBtn}
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <h2 style={styles.logo} onClick={() => navigate("/")}>
            KAEORN
          </h2>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          {/* SOCIALS */}
          {!isMobile ? (
            <>
              <a
                href="https://www.instagram.com/kaeornwellness/"
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@KAEORNWELLNESS"
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                YouTube
              </a>
            </>
          ) : (
            <div style={styles.mobileIcons}>
              <a
                href="https://www.instagram.com/kaeornwellness/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@KAEORNWELLNESS"
                target="_blank"
                rel="noreferrer"
              >
                <Youtube size={18} />
              </a>
            </div>
          )}

          {/* AUTH */}
          {!user ? (
            <button
              style={styles.signInBtn}
              onClick={() => setShowAuth(true)}
            >
              Sign in
            </button>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </header>
    </>
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
    padding: "14px 20px",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #eee",
    fontFamily: "Inter, sans-serif",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  backBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
  },

  logo: {
    fontSize: 15,
    letterSpacing: 3,
    fontWeight: 500,
    cursor: "pointer",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  link: {
    color: "#111",
    textDecoration: "none",
    fontSize: 13,
  },

  mobileIcons: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  signInBtn: {
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 999,
    fontSize: 13,
    cursor: "pointer",
  },
};
