import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Save address for payment page
    localStorage.setItem("deliveryAddress", JSON.stringify(form));

    navigate("/checkout/payment");
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Delivery Address</h1>
      <p style={styles.subtext}>
        Please enter the address where you’d like your order delivered.
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="address"
          placeholder="House / Flat / Street Address"
          value={form.address}
          onChange={handleChange}
          required
          rows={3}
          style={styles.textarea}
        />

        <input
          name="landmark"
          placeholder="Landmark (optional)"
          value={form.landmark}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    maxWidth: "560px",
    margin: "0 auto",
    padding: "56px 20px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "500",
    marginBottom: "10px",
    letterSpacing: "0.2px",
  },

  subtext: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "36px",
    lineHeight: 1.7,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  input: {
    padding: "15px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.25s ease, box-shadow 0.25s ease",
  },

  textarea: {
    padding: "15px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "none",
    outline: "none",
    transition: "border 0.25s ease, box-shadow 0.25s ease",
  },

  button: {
    marginTop: "32px",
    padding: "18px",
    borderRadius: "40px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "0.4px",
    transition: "transform 0.25s ease, opacity 0.25s ease",
  },
};
