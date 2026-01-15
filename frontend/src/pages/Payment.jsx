import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const address =
    JSON.parse(localStorage.getItem("deliveryAddress")) || {};

  async function handlePay() {
    try {
      if (!cartItems || cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      if (!address.name || !address.phone || !address.address) {
        alert("Delivery address missing");
        return;
      }

      const orderPayload = {
        customerName: address.name,
        phone: address.phone,
        email: address.email || "",
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        items: cartItems,
        totalAmount: getCartTotal(),
      };

      // ✅ FIXED FETCH (THIS WAS THE BUG)
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Order creation failed");
      }

      // ✅ SUCCESS
      clearCart();
      localStorage.removeItem("deliveryAddress");
      navigate("/order-success");
    } catch (err) {
      console.error("Payment error:", err);
      alert(
        "Unable to place order.\nPlease ensure backend is running and try again."
      );
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Confirm & Pay</h1>
      <p style={styles.subtext}>
        Review your order before completing payment.
      </p>

      {/* ADDRESS */}
      <div style={styles.card}>
        <h3 style={styles.subheading}>DELIVERY ADDRESS</h3>
        <p style={styles.text}>
          {address.name}
          <br />
          {address.address}
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
        <p style={styles.noteSmall}>Inclusive of all taxes</p>
      </div>

      <button style={styles.payBtn} onClick={handlePay}>
        Pay ₹{getCartTotal()}
      </button>

      <p style={styles.note}>
        Secure payments · No card details stored
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
    fontFamily: "Inter, sans-serif",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  subtext: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "32px",
    lineHeight: 1.7,
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
  },
  noteSmall: {
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
    marginTop: "12px",
  },
  note: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#777",
    textAlign: "center",
  },
};
