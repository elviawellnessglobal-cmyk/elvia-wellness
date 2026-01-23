import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function sendOtp(e) {
    e.preventDefault();
    setLoading(true);

    await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    setStep(2);
    setLoading(false);
  }

  async function resetPassword(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      }
    );

    if (res.ok) {
      navigate("/");
    } else {
      alert("Invalid OTP or expired");
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <form
        onSubmit={step === 1 ? sendOtp : resetPassword}
        style={styles.card}
      >
        <h2>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>

        {step === 1 && (
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        )}

        {step === 2 && (
          <>
            <input
              placeholder="OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="New password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </>
        )}

        <button disabled={loading} style={styles.button}>
          {loading
            ? "Please wait…"
            : step === 1
            ? "Send OTP"
            : "Update Password"}
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
};
