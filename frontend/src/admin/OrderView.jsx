import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function OrderView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load order");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/admin/orders");
      });
  }, [id, navigate]);

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading order…</p>;
  }

  if (!order) {
    return <p style={{ padding: "40px" }}>Order not found</p>;
  }

  /* =========================================================
     LOCKED ADMIN VIEW NORMALIZATION
     ========================================================= */

  // 🔒 SINGLE SOURCE OF TRUTH
  const customerEmail = order.customerEmail || "N/A";

  const customerName =
    order.address && typeof order.address === "object"
      ? order.address.name
      : order.user?.name || "—";

  const customerPhone =
    order.address && typeof order.address === "object"
      ? order.address.phone
      : "—";

  const addressText =
    typeof order.address === "string"
      ? order.address
      : [
          order.address?.addressLine,
          order.address?.street,
          order.address?.city,
          order.address?.state,
          order.address?.pincode,
          order.address?.country,
        ]
          .filter(Boolean)
          .join(", ") || "—";

  return (
    <div style={styles.layout}>
      <Sidebar />

      <main style={styles.main}>
        <button style={styles.back} onClick={() => navigate(-1)}>
          ← Back to Orders
        </button>

        <h1 style={styles.heading}>
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>

        {/* CUSTOMER */}
        <div style={styles.card}>
          <h3 style={styles.label}>CUSTOMER</h3>
          <p><b>Name:</b> {customerName}</p>
          <p><b>Phone:</b> {customerPhone}</p>
          <p><b>Email:</b> {customerEmail}</p>
        </div>

        {/* ADDRESS */}
        <div style={styles.card}>
          <h3 style={styles.label}>DELIVERY ADDRESS</h3>
          <p>{addressText}</p>
        </div>

        {/* ITEMS */}
        <div style={styles.card}>
          <h3 style={styles.label}>ITEMS</h3>
          {order.items?.map((item, i) => (
            <p key={i}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>

        {/* TOTAL */}
        <div style={styles.card}>
          <h3 style={styles.label}>TOTAL</h3>
          <p style={styles.total}>₹{order.totalAmount}</p>
        </div>
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#fafafa",
    fontFamily: "Inter, sans-serif",
  },

  main: {
    flex: 1,
    padding: "48px",
  },

  back: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "20px",
    color: "#555",
  },

  heading: {
    fontSize: "30px",
    marginBottom: "32px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid #eee",
  },

  label: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#777",
    marginBottom: "12px",
  },

  total: {
    fontSize: "22px",
    fontWeight: "500",
  },
};
