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

      if (
        !address.name ||
        !address.phone ||
        !address.address ||
        !address.city ||
        !address.state ||
        !address.pincode
      ) {
        alert("Delivery address missing");
        return;
      }

      // 🔐 Get JWT if user is logged in
      const token = localStorage.getItem("kaeorn_token");

      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),

        address: {
          fullName: address.name,
          phone: address.phone,
          street: address.address,
          city: address.city,
          state: address.state,
          postalCode: address.pincode,
          country: "India",
        },

        totalAmount: getCartTotal(),
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
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
          {address.name}
          <br />
          {address.address}
          <br />
          {address.city}, {address.state} – {address.pincode}
          <br />
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
  heading: { marginBottom: 24 },
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
