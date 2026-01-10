import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();

  const address =
    JSON.parse(localStorage.getItem("deliveryAddress")) || {};

  async function handlePay() {
    try {
      // SAVE ORDER TO BACKEND
      await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: address.name,
          phone: address.phone,
          email: address.email,
          address: address.address,
          landmark: address.landmark,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          items: cartItems,
          totalAmount: getCartTotal(),
          paymentStatus: "PENDING",
        }),
      });

      // CLEAR CART (OPTIONAL BUT CLEAN)
      localStorage.removeItem("deliveryAddress");

      // REDIRECT
      navigate("/order-success");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Confirm & Pay</h1>
      <p style={styles.subtext}>
        Please review your details below before completing your purchase.
      </p>

      {/* TRUST STRIP */}
      <div style={styles.trustStrip}>
        <span>🔒 Secure Checkout</span>
        <span>🚚 Free Shipping</span>
        <span>↩ Easy Returns</span>
      </div>

      {/* ADDRESS */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>DELIVERY ADDRESS</h3>
        <p style={styles.text}>
          {address.name}
          <br />
          {address.address}
          {address.landmark && `, ${address.landmark}`}
          <br />
          {address.city}, {address.state} – {address.pincode}
          <br />
          Phone: {address.phone}
        </p>
      </div>

      {/* TOTAL */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>ORDER TOTAL</h3>
        <p style={styles.total}>₹{getCartTotal()}</p>
        <p style={styles.taxNote}>
          Inclusive of all taxes. No hidden charges.
        </p>
      </div>

      {/* PAY */}
      <button style={styles.payBtn} onClick={handlePay}>
        Pay ₹{getCartTotal()}
      </button>

      {/* FOOT NOTE */}
      <p style={styles.note}>
        Payments are encrypted and processed securely.
        <br />
        Powered by Razorpay.
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
    marginBottom: "28px",
    lineHeight: 1.7,
  },

  trustStrip: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    fontSize: "12px",
    color: "#555",
    marginBottom: "28px",
    flexWrap: "wrap",
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "16px",
    padding: "22px",
    marginBottom: "24px",
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
    marginTop: "12px",
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
