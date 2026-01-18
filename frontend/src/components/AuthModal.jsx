import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ type = "login", onClose }) {
  const { login } = useAuth();
  const [mode, setMode] = useState(type);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      /* -------- SIGNUP -------- */
      if (mode === "signup") {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/auth/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              phone,
              password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Signup failed");
          setLoading(false);
          return;
        }

        setMode("login");
        setLoading(false);
        return;
      }

      /* -------- LOGIN -------- */
      const result = await login({ email, password });
      setLoading(false);

      if (result?.error) {
        setError(result.error);
        return;
      }

      onClose(); // ✅ CLOSE MODAL
    } catch (err) {
      console.error("Auth error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button style={styles.close} onClick={onClose}>
          ×
        </button>

        <h2 style={styles.title}>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === "signup" && (
            <>
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />

              <input
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={styles.input}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
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

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.submit} disabled={loading}>
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <p style={styles.switch}>
          {mode === "login" ? (
            <>
              New here?{" "}
              <span style={styles.link} onClick={() => setMode("signup")}>
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span style={styles.link} onClick={() => setMode("login")}>
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* -------- STYLES (UNCHANGED) -------- */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  box: {
    background: "#fff",
    padding: "36px",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "380px",
    position: "relative",
    textAlign: "center",
  },
  close: {
    position: "absolute",
    right: "16px",
    top: "12px",
    fontSize: "22px",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  submit: {
    padding: "14px",
    borderRadius: "40px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
  },
  switch: {
    marginTop: "18px",
    fontSize: "13px",
  },
  link: {
    cursor: "pointer",
    fontWeight: "500",
  },
};
