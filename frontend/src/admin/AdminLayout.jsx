import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#fafafa",
  },
  main: {
    flex: 1,
  },
};
