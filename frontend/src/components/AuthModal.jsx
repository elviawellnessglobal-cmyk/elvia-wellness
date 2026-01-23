import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const { requestOTP, verifyOTP } = useAuth();

  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  async function handleSendOTP(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await requestOTP(email);
      setStep("otp");
      startTimer();
    } catch {
      setError("Unable to send code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await verifyOTP(email, otp);
      onClose();
    } catch (err) {
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  }

  function startTimer() {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.close}>×</button>

        <h2 style={styles.title}>
          {step === "email" ? "Welcome to KAEORN" : "Enter verification code"}
        </h2>

        <p style={styles.subtitle}>
          {step === "email"
            ? "Sign in with your email — no password required."
            : `We sent a 6-digit code to ${email}`}
        </p>

        {step === "email" ? (
          <form onSubmit={handleSendOTP} style={styles.form}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button style={styles.button} disabled={loading}>
              {loading ? "Sending…" : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} style={styles.form}>
            <input
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              style={styles.otpInput}
              autoFocus
            />

            {error && <p style={styles.error}>{error}</p>}

            <button style={styles.button} disabled={loading}>
              {loading ? "Verifying…" : "Verify & Continue"}
            </button>

            <div style={styles.resend}>
              {timer > 0 ? (
                <span>Resend code in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  style={styles.resendBtn}
                >
                  Resend code
                </button>
              )}
            </div>
          </form>
        )}
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

  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 36,
    width: "100%",
    maxWidth: 380,
    textAlign: "center",
    boxShadow: "0 40px 120px rgba(0,0,0,0.15)",
    position: "relative",
    fontFamily: "Inter, sans-serif",
  },

  close: {
    position: "absolute",
    top: 14,
    right: 16,
    fontSize: 22,
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  title: {
    fontSize: 22,
    fontWeight: 500,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    lineHeight: 1.6,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  input: {
    padding: 14,
    borderRadius: 12,
    border: "1px solid #ddd",
    fontSize: 14,
  },

  otpInput: {
    padding: 16,
    borderRadius: 14,
    border: "1px solid #ddd",
    fontSize: 18,
    letterSpacing: 6,
    textAlign: "center",
  },

  button: {
    marginTop: 6,
    padding: 16,
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },

  resend: {
    marginTop: 16,
    fontSize: 13,
    color: "#777",
  },

  resendBtn: {
    background: "none",
    border: "none",
    color: "#111",
    fontWeight: 500,
    cursor: "pointer",
  },

  error: {
    color: "#c62828",
    fontSize: 13,
  },
};
