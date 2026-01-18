import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const navigate = useNavigate();
  const token = localStorage.getItem("kaeorn_token");

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [manual, setManual] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  /* -------- LOAD SAVED ADDRESSES -------- */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data || []);
        const def = data?.find((a) => a.isDefault);
        if (def) setSelected(def);
        if (!data || data.length === 0) setManual(true);
      })
      .catch(() => setManual(true));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function continueWithSaved() {
    if (!selected) {
      alert("Please select an address");
      return;
    }

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify({
        name: selected.fullName,
        phone: selected.phone,
        email: "",
        address: selected.street,
        city: selected.city,
        state: selected.state,
        pincode: selected.postalCode,
      })
    );

    navigate("/checkout/payment");
  }

  function continueManual(e) {
    e.preventDefault();
    localStorage.setItem("deliveryAddress", JSON.stringify(form));
    navigate("/checkout/payment");
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Delivery Address</h1>
      <p style={styles.subtext}>
        Please select or enter the address where you’d like your order delivered.
      </p>

      {/* TRUST STRIP */}
      <div style={styles.trust}>
        <span>🔒 Secure Checkout</span>
        <span>📦 Discreet Packaging</span>
        <span>↩ Easy Returns</span>
      </div>

      {/* SAVED ADDRESSES */}
      {!manual && addresses.length > 0 && (
        <>
          <h3 style={styles.section}>Saved Addresses</h3>

          {addresses.map((a, i) => (
            <div
              key={i}
              onClick={() => setSelected(a)}
              style={{
                ...styles.addressCard,
                border:
                  selected === a
                    ? "2px solid #111"
                    : "1px solid #eee",
              }}
            >
              <p><b>{a.fullName}</b></p>
              <p>{a.street}</p>
              <p>
                {a.city}, {a.state} – {a.postalCode}
              </p>
              <p>{a.phone}</p>
            </div>
          ))}

          <button style={styles.button} onClick={continueWithSaved}>
            Continue to Payment
          </button>

          <p
            style={styles.link}
            onClick={() => setManual(true)}
          >
            + Add new address
          </p>
        </>
      )}

      {/* MANUAL FORM (YOUR ORIGINAL, CLEANED) */}
      {manual && (
        <form style={styles.form} onSubmit={continueManual}>
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

          <p style={styles.helperText}>
            We’ll use this address only for order delivery and updates.
          </p>

          <button type="submit" style={styles.button}>
            Continue to Payment
          </button>
        </form>
      )}
    </div>
  );
}

/* ---------------- STYLES (KEPT LUXURY) ---------------- */

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
  },
  subtext: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
    lineHeight: 1.7,
  },
  trust: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#666",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "12px",
  },
  section: {
    fontSize: "14px",
    marginBottom: "12px",
  },
  addressCard: {
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px",
    cursor: "pointer",
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
  },
  textarea: {
    padding: "15px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "none",
  },
  helperText: {
    fontSize: "12px",
    color: "#777",
    marginTop: "-6px",
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
  },
  link: {
    marginTop: 20,
    fontSize: 13,
    color: "#111",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
