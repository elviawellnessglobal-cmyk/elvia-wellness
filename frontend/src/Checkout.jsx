import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout({ product }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  async function placeOrder() {
    try {
      // BASIC VALIDATION
      if (
        !form.customerName ||
        !form.phone ||
        !form.address ||
        !form.city ||
        !form.state ||
        !form.pincode
      ) {
        alert("Please fill all required fields");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: form.customerName,
            phone: form.phone,
            email: form.email || "",
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            items: [
              {
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
              },
            ],
            totalAmount: product.price,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Order failed");
      }

      alert("Order placed successfully 🤍");
      navigate("/order-success");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Unable to place order. Please try again.");
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>

      <input placeholder="Full Name" onChange={e => setForm({ ...form, customerName: e.target.value })} />
      <input placeholder="Phone Number" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Email (optional)" onChange={e => setForm({ ...form, email: e.target.value })} />
      <textarea placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
      <input placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} />
      <input placeholder="State" onChange={e => setForm({ ...form, state: e.target.value })} />
      <input placeholder="Pincode" onChange={e => setForm({ ...form, pincode: e.target.value })} />

      <button onClick={placeOrder} style={styles.button}>
        Place Order ₹{product.price}
      </button>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    padding: "40px",
    maxWidth: "420px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "26px",
  },
  button: {
    marginTop: "16px",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },
};
