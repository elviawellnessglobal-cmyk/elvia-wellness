import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function OrderView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`http://localhost:3000/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(setOrder)
      .catch(() => navigate("/admin/orders"));
  }, [id, navigate]);

  if (!order) {
    return <p style={{ padding: "40px" }}>Loading order…</p>;
  }

  return (
    <div style={styles.layout}>
      <Sidebar />

      <main style={styles.main}>
        <button style={styles.back} onClick={() => navigate(-1)}>
          ← Back to Orders
        </button>

        <h1 style={styles.heading}>
          Order #{order._id.slice(-6)}
        </h1>

        <div style={styles.card}>
          <h3>CUSTOMER</h3>
          <p>{order.address.name}</p>
          <p>{order.address.phone}</p>
        </div>

        <div style={styles.card}>
          <h3>DELIVERY ADDRESS</h3>
          <p>
            {order.address.address},{" "}
            {order.address.city},{" "}
            {order.address.state} – {order.address.pincode}
          </p>
        </div>

        <div style={styles.card}>
          <h3>ITEMS</h3>
          {order.items.map((item, i) => (
            <p key={i}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>

        <div style={styles.card}>
          <h3>TOTAL</h3>
          <p style={styles.total}>₹{order.total}</p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#fafafa",
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
  total: {
    fontSize: "22px",
    fontWeight: "500",
  },
};
