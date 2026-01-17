import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("kaeorn_token");

    fetch(`${import.meta.env.VITE_API_BASE}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} style={{ marginBottom: "24px" }}>
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
