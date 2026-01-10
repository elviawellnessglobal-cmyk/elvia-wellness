import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <aside style={styles.sidebar}>
      {/* BRAND */}
      <div style={styles.brand}>
        NÆORA
        <span style={styles.brandSub}>ADMIN</span>
      </div>

      {/* NAV */}
      <nav style={styles.nav}>
        <button style={styles.link} onClick={() => navigate("/admin/orders")}>
          Orders
        </button>

        <button style={styles.linkDisabled}>
          Products <span style={styles.soon}>Soon</span>
        </button>

        <button style={styles.linkDisabled}>
          Customers <span style={styles.soon}>Soon</span>
        </button>
      </nav>

      {/* FOOTER */}
      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#fff",
    borderRight: "1px solid #eee",
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "Inter, sans-serif",
  },

  brand: {
    fontSize: "20px",
    letterSpacing: "2px",
    fontWeight: "500",
  },

  brandSub: {
    display: "block",
    fontSize: "11px",
    letterSpacing: "3px",
    color: "#888",
    marginTop: "6px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "40px",
  },

  link: {
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: "15px",
    padding: "10px 0",
    cursor: "pointer",
    color: "#111",
  },

  linkDisabled: {
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: "15px",
    padding: "10px 0",
    color: "#aaa",
    cursor: "not-allowed",
  },

  soon: {
    fontSize: "11px",
    marginLeft: "6px",
    color: "#bbb",
  },

  logout: {
    border: "1px solid #111",
    background: "transparent",
    padding: "12px",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
