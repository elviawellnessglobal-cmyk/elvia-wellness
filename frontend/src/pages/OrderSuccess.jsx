import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  const orderId = `ELVIA-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>

        <h1 style={styles.heading}>Order Confirmed</h1>

        <p style={styles.subtext}>
          Thank you for choosing NÆORA Wellness.
          <br />
          Your order has been placed successfully.
        </p>

        <div style={styles.orderBox}>
          <p style={styles.label}>ORDER ID</p>
          <p style={styles.value}>{orderId}</p>
        </div>

        {address && (
          <div style={styles.addressBox}>
            <p style={styles.label}>DELIVERY ADDRESS</p>
            <p style={styles.address}>
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
        )}

        <p style={styles.note}>
          You’ll receive order updates on your registered email.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "48px 20px",
    background: "#fafafa",
  },

  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "56px 36px",
    maxWidth: "540px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 48px rgba(0,0,0,0.06)",
  },

  icon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    margin: "0 auto 28px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "500",
    marginBottom: "14px",
    letterSpacing: "0.2px",
  },

  subtext: {
    fontSize: "15px",
    color: "#666",
    lineHeight: 1.7,
    marginBottom: "36px",
  },

  orderBox: {
    marginBottom: "28px",
  },

  label: {
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#888",
    marginBottom: "6px",
  },

  value: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#111",
  },

  addressBox: {
    background: "#f7f7f7",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "28px",
    textAlign: "left",
  },

  address: {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#444",
  },

  note: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "36px",
    lineHeight: 1.6,
  },

  button: {
    width: "100%",
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
