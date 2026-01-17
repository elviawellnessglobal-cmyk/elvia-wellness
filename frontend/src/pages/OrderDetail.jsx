import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("kaeorn_token");

    fetch(`${import.meta.env.VITE_API_BASE}/api/orders/my-orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrder);
  }, [id]);

  if (!order) return <p style={{ textAlign: "center" }}>Loading order…</p>;

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h2>Order Details</h2>

      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p>
        <strong>Placed on:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <h3 style={{ marginTop: 24 }}>Items</h3>
      {order.items.map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          {item.name} × {item.quantity}
        </div>
      ))}

      <h3 style={{ marginTop: 24 }}>Delivery Address</h3>
      <p>
        {order.address.fullName}<br />
        {order.address.street}<br />
        {order.address.city}, {order.address.state} –{" "}
        {order.address.postalCode}
      </p>
    </div>
  );
}
