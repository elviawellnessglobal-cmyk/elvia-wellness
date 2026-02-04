import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.brand}>KAEORN</h2>

      <nav style={styles.nav}>
        <button
          style={styles.navBtn}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </button>

        <button
          style={styles.navBtn}
          onClick={() => navigate("/admin/orders")}
        >
          Orders
        </button>

        {/* ✅ SUPPORT CHATS */}
        <button
          style={styles.navBtn}
          onClick={() => navigate("/admin/chats")}
        >
          Support Chats
        </button>

        {/* 🖤 NEW — EMAIL ANALYTICS */}
        <button
          style={styles.navBtn}
          onClick={() => navigate("/admin/emails")}
        >
          Email Analytics
        </button>
      </nav>

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
    background: "#fff",
    borderRight: "1px solid #eee",
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  brand: {
    letterSpacing: "3px",
    fontWeight: "500",
    marginBottom: 40,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  navBtn: {
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
    padding: "8px 0",
    color: "#111",
  },

  logout: {
    border: "none",
    background: "none",
    color: "#999",
    cursor: "pointer",
    marginTop: 40,
  },
};
