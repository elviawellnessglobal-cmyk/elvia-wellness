import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        alert("Admin session expired. Please login again.");
        navigate("/admin/login");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Admin only");
      }

      const orders = await res.json();

      let revenue = 0;
      let pending = 0;
      let delivered = 0;
      let inTransit = 0;

      orders.forEach((order) => {
        revenue += order.totalAmount || 0;

        if (order.status === "Pending") pending++;
        if (order.status === "Delivered") delivered++;
        if (
          order.status === "Shipped" ||
          order.status === "Out for Delivery"
        ) {
          inTransit++;
        }
      });

      setStats({
        totalOrders: orders.length,
        totalRevenue: revenue,
        pending,
        delivered,
        inTransit,
      });
    } catch (err) {
      console.error("Dashboard error:", err);
      alert("Admin access denied or session expired");
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <p style={{ padding: 40 }}>Loading dashboard…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={styles.page}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.heading}>Dashboard</h1>
            <p style={styles.subheading}>Business overview</p>
          </div>

          {/* ✅ MOVED BUTTON HERE */}
          <button
            onClick={() => navigate("/admin/chats")}
            style={styles.chatBtn}
          >
            Support Chats
          </button>
        </div>

        <div style={styles.grid}>
          <Card title="Total Orders" value={stats.totalOrders} />
          <Card title="Revenue" value={`₹${stats.totalRevenue}`} />
          <Card title="Pending Orders" value={stats.pending} />
          <Card title="In Transit" value={stats.inTransit} />
          <Card title="Delivered" value={stats.delivered} />
        </div>
      </div>
    </AdminLayout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    padding: "40px",
    fontFamily: "Inter, sans-serif",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    flexWrap: "wrap",
    gap: 16,
  },

  heading: {
    fontSize: "32px",
    marginBottom: "6px",
  },

  subheading: {
    fontSize: "14px",
    color: "#666",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "26px",
    border: "1px solid #eee",
  },

  cardTitle: {
    fontSize: "13px",
    letterSpacing: "1px",
    color: "#777",
    marginBottom: "10px",
  },

  cardValue: {
    fontSize: "28px",
    fontWeight: "500",
    color: "#111",
  },

  chatBtn: {
    padding: "14px 22px",
    borderRadius: 14,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },
};
