import { useEffect, useState } from "react";

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/admin/analytics`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div style={styles.loading}>Loading analytics...</div>;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>KAEORN Payment Analytics</h1>

      <div style={styles.grid}>
        <Card title="Total Orders" value={data.totalOrders} />
        <Card title="Paid Orders" value={data.paidOrders} />
        <Card title="Total Revenue" value={`₹${data.totalRevenue}`} />
        <Card title="Today's Revenue" value={`₹${data.todayRevenue}`} />
      </div>

      <h2 style={styles.subheading}>Monthly Revenue</h2>

      <div style={styles.monthly}>
        {data.monthlySales.map((m) => (
          <div key={m._id} style={styles.monthCard}>
            <strong>Month {m._id}</strong>
            <span>₹{m.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  page: {
    padding: 40,
    fontFamily: "Inter, sans-serif",
  },
  heading: {
    marginBottom: 30,
  },
  subheading: {
    marginTop: 40,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    background: "#111",
    color: "#fff",
  },
  monthly: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  },
  monthCard: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 12,
  },
  loading: {
    padding: 40,
  },
};
