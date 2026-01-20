import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrders({ type = "active" }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("kaeorn_token");

    // 🔐 No token → redirect
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setOrders([]);
          return;
        }

        if (type === "previous") {
          setOrders(data.filter((o) => o.status === "Delivered"));
        } else {
          setOrders(data);
        }
      })
      .catch(() => {
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [type, navigate]);

  /* -------- LOADING -------- */
  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: 60 }}>
        Loading your orders…
      </p>
    );
  }

  /* -------- EMPTY -------- */
  if (orders.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: 60 }}>
        No orders found.
      </p>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>
        {type === "previous" ? "Previous Orders" : "My Orders"}
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={styles.orderCard}
          onClick={() => navigate(`/order/${order._id}`)}
        >
          <div>
            <p style={styles.status}>{order.status}</p>
            <p style={styles.date}>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div style={styles.right}>
            <p style={styles.amount}>₹{order.totalAmount}</p>
            <span style={styles.view}>View →</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 720,
    margin: "40px auto",
    padding: 20,
  },
  heading: {
    marginBottom: 30,
  },
  orderCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
    borderRadius: 16,
    border: "1px solid #eee",
    marginBottom: 16,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  status: {
    fontSize: 14,
    fontWeight: 500,
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
  right: {
    textAlign: "right",
  },
  amount: {
    fontSize: 16,
    fontWeight: 500,
  },
  view: {
    fontSize: 12,
    color: "#555",
  },
};
