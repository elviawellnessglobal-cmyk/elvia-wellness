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
        <button onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => navigate("/admin/orders")}>
          Orders
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
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  logout: {
    border: "none",
    background: "none",
    color: "#999",
    cursor: "pointer",
  },
};
