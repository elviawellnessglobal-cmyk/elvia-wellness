import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const STATUS_FLOW = [
  "Pending",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `http://localhost:3000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      alert("Failed to load order");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status) {
    if (updating) return;

    try {
      setUpdating(true);
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `http://localhost:3000/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      setOrder(data);
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  async function deleteOrder() {
    if (!window.confirm("Delete this order permanently?")) return;

    const token = localStorage.getItem("adminToken");

    await fetch(`http://localhost:3000/api/orders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate("/admin/orders");
  }

  if (loading) {
    return (
      <AdminLayout>
        <p style={{ padding: 40 }}>Loading order…</p>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <p style={{ padding: 40 }}>Order not found</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Order #{order._id?.slice(-6).toUpperCase()}
        </h1>

        {/* STATUS CONTROL */}
        <div style={styles.statusCard}>
          <p style={styles.statusText}>
            Current Status: <b>{order.status}</b>
          </p>

          <div style={styles.statusButtons}>
            {STATUS_FLOW.map((s) => (
              <button
                key={s}
                disabled={order.status === s || updating}
                onClick={() => updateStatus(s)}
                style={{
                  ...styles.statusBtn,
                  ...(order.status === s
                    ? styles.statusActive
                    : {}),
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOMER */}
        <div style={styles.card}>
          <h3 style={styles.subheading}>Customer</h3>
          <p><b>Name:</b> {order.customerName || "-"}</p>
          <p><b>Phone:</b> {order.phone || "-"}</p>
          <p><b>Email:</b> {order.email || "-"}</p>
        </div>

        {/* ADDRESS */}
        <div style={styles.card}>
          <h3 style={styles.subheading}>Delivery Address</h3>
          <p>
            {order.address || "-"}<br />
            {order.city || "-"}, {order.state || "-"} –{" "}
            {order.pincode || "-"}
          </p>
        </div>

        {/* ITEMS */}
        <div style={styles.card}>
          <h3 style={styles.subheading}>Items</h3>

          {order.items?.map((item, i) => (
            <div key={i} style={styles.itemRow}>
              <span>{item.name}</span>
              <span>
                {item.quantity} × ₹{item.price}
              </span>
            </div>
          ))}

          <h2 style={styles.total}>
            Total ₹{order.totalAmount}
          </h2>
        </div>

        {/* DELETE */}
        <button
          onClick={deleteOrder}
          style={styles.deleteBtn}
        >
          Delete Order
        </button>
      </div>
    </AdminLayout>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    maxWidth: "900px",
    padding: "40px",
  },

  heading: {
    fontSize: "30px",
    marginBottom: "28px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid #eee",
  },

  subheading: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#777",
    marginBottom: "12px",
  },

  statusCard: {
    background: "#111",
    color: "#fff",
    borderRadius: "18px",
    padding: "28px",
    marginBottom: "32px",
  },

  statusText: {
    fontSize: "16px",
    marginBottom: "16px",
  },

  statusButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  statusBtn: {
    padding: "12px 20px",
    borderRadius: "30px",
    border: "1px solid #fff",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },

  statusActive: {
    background: "#fff",
    color: "#111",
    fontWeight: "500",
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
  },

  total: {
    marginTop: "16px",
    fontSize: "22px",
  },

  deleteBtn: {
    marginTop: "32px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
    cursor: "pointer",
  },
};
