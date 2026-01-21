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

  const [authType, setAuthType] = useState(null);
  const isMobile = window.innerWidth < 768;

  /* ---------------- BACK BUTTON LOGIC ---------------- */
  const showBack =
    location.pathname !== "/" &&
    !location.pathname.startsWith("/admin");

  return (
    <>
      {/* AUTH MODAL */}
      {authType && (
        <AuthModal type={authType} onClose={() => setAuthType(null)} />
      )}

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

          {/* AUTH */}
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
    padding: "18px 24px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
    borderBottom: "1px solid #eee",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
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

  link: {
    color: "#111",
    textDecoration: "none",
    fontSize: "14px",
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
