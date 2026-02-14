import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h1>Payment Successful 🤍</h1>
      <p>Your order has been placed successfully.</p>

      <button
        style={styles.button}
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    padding: "14px 30px",
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};
