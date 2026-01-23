import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const { loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email → otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOtp(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      setError("Unable to send code");
      setLoading(false);
      return;
    }

    setStep("otp");
    setLoading(false);
  }

  async function verifyOtp(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          password: otp, // temp pass for auto-login
        }),
      }
    );

    if (!res.ok) {
      setError("Invalid or expired code");
      setLoading(false);
      return;
    }

    window.location.reload(); // auto-login via JWT
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.close}>×</button>

        <p style={styles.brand}>KAEORN</p>
        <h2 style={styles.title}>
          {step === "email" ? "Welcome back" : "Enter your code"}
        </h2>
        <p style={styles.subtitle}>
          {step === "email"
            ? "Sign in to continue your ritual"
            : "We sent a 6-digit code to your email"}
        </p>

        <form onSubmit={step === "email" ? sendOtp : verifyOtp}>
          {step === "email" && (
            <input
              type="email"
              placeholder="Email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          )}

          {step === "otp" && (
            <input
              placeholder="••••••"
              value={otp}
              required
              onChange={(e) => setOtp(e.target.value)}
              style={{
                ...styles.input,
                letterSpacing: 6,
                textAlign: "center",
                fontSize: 18,
              }}
            />
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button disabled={loading} style={styles.primaryBtn}>
            {loading
              ? "Please wait…"
              : step === "email"
              ? "Continue"
              : "Verify & Login"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span />
          <small>or</small>
          <span />
        </div>

        {/* Google Login */}
        <button
          onClick={() => window.google?.accounts.id.prompt()}
          style={styles.googleBtn}
        >
          Continue with Google
        </button>

        <p style={styles.note}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

/* ---------------- LUXURY STYLES ---------------- */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },

  card: {
    background: "#fff",
    padding: "44px",
    borderRadius: 24,
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
    position: "relative",
  },

  close: {
    position: "absolute",
    right: 20,
    top: 14,
    fontSize: 26,
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#999",
  },

  brand: {
    fontSize: 12,
    letterSpacing: 4,
    marginBottom: 18,
    color: "#888",
  },

  title: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 32,
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: 14,
    border: "1px solid #e5e5e5",
    marginBottom: 16,
    fontSize: 15,
    outline: "none",
  },

  primaryBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: 999,
    background: "#111",
    color: "#fff",
    border: "none",
    fontSize: 15,
    cursor: "pointer",
    marginTop: 6,
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "26px 0",
    color: "#aaa",
  },

  googleBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "#fafafa",
    cursor: "pointer",
    fontSize: 14,
  },

  note: {
    fontSize: 12,
    color: "#999",
    marginTop: 22,
  },

  error: {
    fontSize: 13,
    color: "#c62828",
    marginBottom: 12,
  },
};
