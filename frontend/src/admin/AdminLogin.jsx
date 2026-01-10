import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN HERE
      localStorage.setItem("adminToken", data.token);

      // ✅ Redirect to admin orders
      navigate("/admin/orders");
    } catch (err) {
      setError("Server error. Try again.");
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h1 style={styles.heading}>Admin Login</h1>
        <p style={styles.subtext}>NÆORA Admin Panel</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button style={styles.button}>Login</button>
      </form>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fafafa",
    fontFamily: "Inter, sans-serif",
  },

  card: {
    width: "360px",
    background: "#fff",
    padding: "36px",
    borderRadius: "18px",
    border: "1px solid #eee",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "500",
    marginBottom: "6px",
  },

  subtext: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "28px",
  },

  error: {
    color: "#c0392b",
    fontSize: "13px",
    marginBottom: "12px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "40px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },
};
