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

      clearCart();
      localStorage.removeItem("deliveryAddress");
      navigate("/order-success");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Unable to place order. Please try again.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Confirm & Pay</h1>

      <div style={styles.card}>
        <h3>Delivery Address</h3>
        <p>
          {address.name}<br />
          {address.address}<br />
          {address.city}, {address.state} – {address.pincode}<br />
          Phone: {address.phone}
        </p>
      </div>

      <div style={styles.card}>
        <h3>Total</h3>
        <h2>₹{getCartTotal()}</h2>
      </div>

      <button style={styles.payBtn} onClick={handlePay}>
        Pay ₹{getCartTotal()}
      </button>
    </div>
  );
}

const styles = {
  page: { maxWidth: 520, margin: "auto", padding: 40 },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  payBtn: {
    width: "100%",
    padding: 18,
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
};
