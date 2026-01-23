import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const email = localStorage.getItem("reset_email");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            newPassword: password,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      localStorage.removeItem("reset_email");
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleReset} style={styles.card}>
        <h2 style={styles.title}>Set new password</h2>

        <input
          type="password"
          placeholder="New password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button disabled={loading} style={styles.button}>
          {loading ? "Saving…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7f7",
    fontFamily: "Inter",
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 18,
    width: 360,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 14,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 30,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "crimson",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
};
