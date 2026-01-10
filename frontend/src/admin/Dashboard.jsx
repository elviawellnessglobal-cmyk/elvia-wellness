import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "http://localhost:3000/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setStats(data);
    }

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <p style={{ padding: "40px" }}>Loading dashboard…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 style={styles.heading}>Dashboard</h1>

      <div style={styles.grid}>
        <KPI
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
        />
        <KPI
          title="Total Orders"
          value={stats.totalOrders}
        />
        <KPI
          title="Pending Orders"
          value={stats.pendingOrders}
        />
      </div>
    </AdminLayout>
  );
}

/* ---------------- KPI CARD ---------------- */

function KPI({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  heading: {
    fontSize: "32px",
    fontWeight: "500",
    marginBottom: "32px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    border: "1px solid #eee",
  },

  label: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#777",
    marginBottom: "8px",
  },

  value: {
    fontSize: "28px",
    fontWeight: "500",
  },
};
