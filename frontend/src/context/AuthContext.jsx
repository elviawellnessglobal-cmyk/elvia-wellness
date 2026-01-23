import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* LOAD USER */
  useEffect(() => {
    const savedUser = localStorage.getItem("kaeorn_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setAuthLoading(false);
  }, []);

  /* SEND OTP */
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
  }

  /* VERIFY OTP & LOGIN */
  async function verifyOTP(email, otp) {
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
      throw new Error(data.message || "Invalid code");
    }

    localStorage.setItem("kaeorn_token", data.token);
    localStorage.setItem("kaeorn_user", JSON.stringify(data.user));
    setUser(data.user);
  }

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
