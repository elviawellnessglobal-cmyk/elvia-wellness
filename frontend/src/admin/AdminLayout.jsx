import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>ELVIA</h2>

        <nav style={styles.nav}>
          <Link to="/admin/products" style={styles.link}>
            Products
          </Link>
          <Link to="/admin/launch" style={styles.link}>
            Launch
          </Link>
          <Link to="/admin/orders" style={styles.link}>
            Orders
          </Link>
        </nav>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#fafafa",
    fontFamily: "Inter, sans-serif",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #eee",
    padding: "40px 20px",
  },
  logo: {
    fontSize: "22px",
    letterSpacing: "2px",
    marginBottom: "40px",
    fontWeight: 500,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#111",
    fontSize: "15px",
    opacity: 0.7,
  },
  main: {
    flex: 1,
    padding: "50px",
  },
};
