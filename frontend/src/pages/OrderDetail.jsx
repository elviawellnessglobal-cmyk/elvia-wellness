import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import OrderTimeline from "../components/OrderTimeline";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCart } = useCart();
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

  if (!order) {
    return <p style={{ textAlign: "center" }}>Loading order…</p>;
  }

  function handleReorder() {
    const items = order.items.map((item) => ({
      id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    setCart(items);
    navigate("/cart");
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Order Details</h2>

      <OrderTimeline status={order.status} />

      <div style={styles.card}>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₹{order.totalAmount}</p>
        <p>
          <strong>Placed on:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div style={styles.card}>
        <h3>Items</h3>
        {order.items.map((item, i) => (
          <p key={i}>
            {item.name} × {item.quantity}
          </p>
        ))}
      </div>

      <div style={styles.card}>
        <h3>Delivery Address</h3>
        <p>
          {order.address.fullName}<br />
          {order.address.street}<br />
          {order.address.city}, {order.address.state} –{" "}
          {order.address.postalCode}
        </p>
      </div>

      <button style={styles.reorderBtn} onClick={handleReorder}>
        Re-order
      </button>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 720,
    margin: "40px auto",
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  reorderBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontSize: 15,
  },
};
