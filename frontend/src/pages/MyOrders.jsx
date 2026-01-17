import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrders({ type = "active" }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("kaeorn_token");

    fetch(`${import.meta.env.VITE_API_BASE}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (type === "previous") {
          setOrders(data.filter((o) => o.status === "Delivered"));
        } else {
          setOrders(data);
        }
      });
  }, [type]);

  if (orders.length === 0) {
    return <p style={{ textAlign: "center" }}>No orders found.</p>;
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h2>{type === "previous" ? "Previous Orders" : "My Orders"}</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          onClick={() => navigate(`/order/${order._id}`)}
          style={{
            border: "1px solid #eee",
            borderRadius: 14,
            padding: 20,
            marginTop: 20,
            cursor: "pointer",
          }}
        >
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
