import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

/* ---------------- PROVIDER ---------------- */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* -------- LOAD USER ON REFRESH -------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("kaeorn_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setAuthLoading(false);
  }, []);

  /* -------- REQUEST OTP -------- */
  async function requestOtp(email) {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to send OTP");
    }

    return true;
  }

  /* -------- VERIFY OTP & LOGIN -------- */
  async function verifyOtp(email, otp) {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/verify-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Invalid OTP");
    }

    localStorage.setItem("kaeorn_token", data.token);
    localStorage.setItem("kaeorn_user", JSON.stringify(data.user));
    setUser(data.user);

    return true;
  }

  /* -------- LOGOUT -------- */
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
        requestOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */
export function useAuth() {
  return useContext(AuthContext);
}
