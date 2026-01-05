import { useState } from "react";

export default function Checkout({ product }) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
  });

  const placeOrder = async () => {
    const res = await fetch("http://127.0.0.1:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        items: [product],
        totalAmount: product.price,
      }),
    });

    const data = await res.json();
    alert("Order placed successfully 🤍");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "420px", margin: "auto" }}>
      <h2 style={{ marginBottom: 20 }}>Checkout</h2>

      <input
        placeholder="Full Name"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={e => setForm({ ...form, customerName: e.target.value })}
      />

      <input
        placeholder="Email"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Shipping Address"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={e => setForm({ ...form, address: e.target.value })}
      />

      <button style={{ width: "100%" }} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
