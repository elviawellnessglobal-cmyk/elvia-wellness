import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const STATUSES = [
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
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Admin not authenticated");
        return;
      }

      const res = await fetch(
        `http://localhost:3000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load order");
      }

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError("Unable to fetch order");
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(status) {
    try {
      const token = localStorage.getItem("adminToken");

      await fetch(
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

      fetchOrder(); // refresh
    } catch (err) {
      alert("Failed to update status");
    }
  }

  async function deleteOrder() {
    if (!window.confirm("Delete this order?")) return;

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
    return <AdminLayout><p style={{ padding: 40 }}>Loading…</p></AdminLayout>;
  }

  if (error) {
    return <AdminLayout><p style={{ padding: 40 }}>{error}</p></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>

        {/* STATUS CONTROLS */}
        <div style={styles.statusBox}>
          <p><b>Current Status:</b> {order.status}</p>

          <div style={styles.statusButtons}>
            {STATUSES.map((s) => (
              <button
                key={s}
                style={{
                  ...styles.statusBtn,
                  background: order.status === s ? "#111" : "#eee",
                  color: order.status === s ? "#fff" : "#111",
                }}
                onClick={() => changeStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOMER */}
        <div style={styles.card}>
          <h3>Customer</h3>
          <p><b>Name:</b> {order.customerName}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Email:</b> {order.email}</p>
        </div>

        {/* ADDRESS — THIS WILL SHOW */}
        <div style={styles.card}>
          <h3>Delivery Address</h3>
          <p>
            {order.address}<br />
            {order.city}, {order.state} – {order.pincode}
          </p>
        </div>

        {/* ITEMS */}
        <div style={styles.card}>
          <h3>Items</h3>
          {order.items.map((item, i) => (
            <p key={i}>
              {item.name} × {item.quantity} — ₹{item.price}
            </p>
          ))}
          <h2>Total: ₹{order.totalAmount}</h2>
        </div>

        <button style={styles.deleteBtn} onClick={deleteOrder}>
          Delete Order
        </button>
      </div>
    </AdminLayout>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "24px",
  },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "20px",
  },
  statusBox: {
    background: "#f9f9f9",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "24px",
  },
  statusButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  statusBtn: {
    padding: "10px 16px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    marginTop: "32px",
    background: "#c0392b",
    color: "#fff",
    border: "none",
    padding: "14px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
