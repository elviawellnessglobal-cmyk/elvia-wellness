import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* ---------- LOAD USER ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("kaeorn_user");
    if (saved) setUser(JSON.parse(saved));
    setAuthLoading(false);
  }, []);

  /* ---------- SEND OTP ---------- */
  async function requestOTP(email) {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      throw new Error("Unable to send code");
    }

    return true;
  }

  /* ---------- VERIFY OTP & LOGIN ---------- */
  async function verifyOTP(email, otp) {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          password: "otp-login", // dummy (required by backend)
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Invalid or expired code");
    }

    // backend does not return token here → generate login token manually
    const loginRes = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "otp-login" }),
      }
    );

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      throw new Error("Login failed after OTP");
    }

    localStorage.setItem("kaeorn_token", loginData.token);
    localStorage.setItem("kaeorn_user", JSON.stringify(loginData.user));
    setUser(loginData.user);

    return true;
  }

  /* ---------- LOGOUT ---------- */
  function logout() {
    localStorage.removeItem("kaeorn_token");
    localStorage.removeItem("kaeorn_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        requestOTP,
        verifyOTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
