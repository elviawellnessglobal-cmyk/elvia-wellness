import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ defaultMode = "login", onClose }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState(defaultMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      const res = signup({ name, email, password });
      if (res.error) {
        setError(res.error);
      } else {
        setMode("login"); // IMPORTANT: go to login
      }
    }

    if (mode === "login") {
      const res = login({ email, password });
      if (res.error) {
        setError(res.error);
      } else {
        onClose();
      }
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button style={styles.close} onClick={onClose}>×</button>

        <h2 style={styles.title}>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === "signup" && (
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
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

          <button style={styles.submit}>
            {mode === "login" ? "Login" : "Create Account"}
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
