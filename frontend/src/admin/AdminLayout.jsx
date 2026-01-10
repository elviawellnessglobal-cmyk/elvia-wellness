import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.content}>{children}</main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    background: "#fafafa",
    minHeight: "100vh",
  },

  content: {
    flex: 1,
    padding: "40px",
  },
};
