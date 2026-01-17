import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Profile Icon */}
      <div
        onClick={() => setOpen(!open)}
        style={styles.avatar}
        title="Account"
      >
        👤
      </div>

      {open && (
        <div style={styles.menu}>
          <button
            style={styles.item}
            onClick={() => {
              navigate("/my-orders");
              setOpen(false);
            }}
          >
            My Orders
          </button>

          <button
            style={styles.item}
            onClick={() => {
              navigate("/my-orders");
              setOpen(false);
            }}
          >
            Previous Orders
          </button>

          <div style={styles.divider} />

          <button
            style={{ ...styles.item, color: "#b00020" }}
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "1px solid #111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 16,
  },
  menu: {
    position: "absolute",
    right: 0,
    top: "120%",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    minWidth: 180,
    padding: "8px 0",
    zIndex: 100,
  },
  item: {
    width: "100%",
    padding: "10px 16px",
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: 13,
    cursor: "pointer",
  },
  divider: {
    height: 1,
    background: "#eee",
    margin: "6px 0",
  },
};
