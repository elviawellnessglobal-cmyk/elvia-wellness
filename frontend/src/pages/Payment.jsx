import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const navigate = useNavigate();
  const { getCartTotal } = useCart();

  const address =
    JSON.parse(localStorage.getItem("deliveryAddress")) || {};

  function handlePay() {
    // Razorpay integration will come later
    navigate("/order-success");
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Confirm & Pay</h1>
      <p style={styles.subtext}>
        Please review your order and delivery details before completing
        the payment.
      </p>

      {/* ADDRESS CARD */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>DELIVERY ADDRESS</h3>
        <p style={styles.text}>
          {address.name}<br />
          {address.address}
          {address.landmark && `, ${address.landmark}`}<br />
          {address.city}, {address.state} – {address.pincode}<br />
          Phone: {address.phone}<br />
          Email: {address.email}
        </p>
      </div>

      {/* TOTAL CARD */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>ORDER TOTAL</h3>
        <p style={styles.total}>₹{getCartTotal()}</p>
        <p style={styles.taxNote}>
          Inclusive of all taxes · Free delivery
        </p>
      </div>

      {/* TRUST STRIP */}
      <div style={styles.trust}>
        <span>🔒 Secure Payment</span>
        <span>📦 Fast Dispatch</span>
        <span>↩ Easy Returns</span>
      </div>

      {/* PAY BUTTON */}
      <button style={styles.payBtn} onClick={handlePay}>
        Pay ₹{getCartTotal()}
      </button>

      {/* MICRO COPY */}
      <p style={styles.note}>
        Your payment is processed securely via Razorpay.
        <br />
        NÆORA Wellness does not store card details.
      </p>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    maxWidth: "540px",
    margin: "0 auto",
    padding: "56px 20px",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "500",
    marginBottom: "8px",
    letterSpacing: "0.2px",
  },

  subtext: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "36px",
    lineHeight: 1.7,
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "28px",
    background: "#fff",
  },

  subheading: {
    fontSize: "12px",
    letterSpacing: "2px",
    marginBottom: "12px",
    color: "#666",
  },

  text: {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#444",
  },

  total: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#111",
    marginBottom: "6px",
  },

  taxNote: {
    fontSize: "12px",
    color: "#777",
  },

  trust: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#666",
    marginBottom: "28px",
    gap: "12px",
    flexWrap: "wrap",
  },

  payBtn: {
    width: "100%",
    padding: "20px",
    borderRadius: "40px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    letterSpacing: "0.4px",
    transition: "transform 0.25s ease, opacity 0.25s ease",
  },

  note: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#777",
    textAlign: "center",
    lineHeight: 1.6,
  },
};
