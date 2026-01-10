import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch("http://localhost:3000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          onClick={() => navigate(`/admin/orders/${order._id}`)}
          style={{
            padding: 20,
            marginBottom: 12,
            border: "1px solid #eee",
            borderRadius: 12,
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <strong>
            Order #{order._id?.slice(-6).toUpperCase()}
          </strong>
          <br />
          ₹{order.totalAmount} — {order.status}
        </div>
      ))}
    </div>
  );
}
