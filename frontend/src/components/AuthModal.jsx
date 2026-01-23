import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const { setUser, loginWithGoogle } = useAuth();

  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- SEND OTP ---------------- */
  async function sendOtp() {
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) throw new Error("Failed to send OTP");

      setStep("otp");
    } catch (err) {
      setError("Unable to send code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- VERIFY OTP ---------------- */
  async function verifyOtp() {
    if (!otp || otp.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("kaeorn_token", data.token);
      localStorage.setItem("kaeorn_user", JSON.stringify(data.user));
      setUser(data.user);
      onClose();
    } catch (err) {
      setError("Invalid or expired code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <button style={styles.close} onClick={onClose}>×</button>

        {/* ---------- STEP 1 : EMAIL ---------- */}
        {step === "email" && (
          <>
            <div style={styles.brand}>KAEORN</div>
            <h2 style={styles.title}>Welcome</h2>
            <p style={styles.subtitle}>
              Enter your email to continue
            </p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button
              style={styles.submit}
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? "Sending…" : "Continue"}
            </button>

            <div style={styles.divider}>or</div>

            {/* GOOGLE LOGIN */}
            <div
              id="google-button"
              style={styles.google}
              onClick={() =>
                window.google.accounts.id.prompt((notification) => {
                  if (notification.isNotDisplayed()) {
                    setError("Google login unavailable");
                  }
                })
              }
            >
              Continue with Google
            </div>
          </>
        )}

        {/* ---------- STEP 2 : OTP ---------- */}
        {step === "otp" && (
          <>
            <div style={styles.brand}>KAEORN</div>
            <h2 style={styles.title}>Enter your code</h2>
            <p style={styles.subtitle}>
              We sent a 6-digit code to <strong>{email}</strong>
            </p>

            <input
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              style={styles.otpInput}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button
              style={styles.submit}
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying…" : "Verify & Login"}
            </button>

            <p style={styles.resend}>
              Didn’t receive it?{" "}
              <span style={styles.link} onClick={sendOtp}>
                Resend code
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  box: {
    background: "#fff",
    padding: "42px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    position: "relative",
  },
  close: {
    position: "absolute",
    right: 16,
    top: 12,
    fontSize: 22,
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  brand: {
    letterSpacing: 3,
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 26,
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    marginBottom: 18,
  },
  otpInput: {
    width: "100%",
    padding: "18px",
    fontSize: 20,
    letterSpacing: 10,
    textAlign: "center",
    borderRadius: 14,
    border: "1px solid #ddd",
    marginBottom: 20,
  },
  submit: {
    width: "100%",
    padding: "16px",
    borderRadius: 40,
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
  divider: {
    margin: "22px 0",
    fontSize: 12,
    color: "#aaa",
  },
  google: {
    border: "1px solid #ddd",
    borderRadius: 40,
    padding: "14px",
    cursor: "pointer",
    fontSize: 14,
  },
  resend: {
    marginTop: 18,
    fontSize: 13,
    color: "#666",
  },
  link: {
    cursor: "pointer",
    fontWeight: 500,
  },
  error: {
    color: "#c62828",
    fontSize: 13,
    marginBottom: 14,
  },
};
