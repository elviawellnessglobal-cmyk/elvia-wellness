export default function PageLoader() {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const styles = {
  wrap: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    zIndex: 9999,
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "1.5px solid #eee",
    borderTop: "1.5px solid #111",
    animation: "spin 0.7s linear infinite",
  },
};