import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const res = await fetch("http://127.0.0.1:3000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h1>ELVIA Admin</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={styles.input}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={login} style={styles.button}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fdfbf8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "serif",
  },
  input: {
    width: "260px",
    padding: "12px",
    marginBottom: "16px",
  },
  button: {
    background: "#111",
    color: "#fff",
    padding: "12px 40px",
    border: "none",
    cursor: "pointer",
  },
};
