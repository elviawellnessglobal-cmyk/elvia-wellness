import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

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

  /* -------- LOGIN -------- */
  async function login({ email, password }) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const text = await res.text(); // ⚠️ IMPORTANT
        return { error: text || "Login failed" };
      }

      const data = await res.json();

      localStorage.setItem("kaeorn_token", data.token);
      localStorage.setItem("kaeorn_user", JSON.stringify(data.user));

      setUser(data.user); // ✅ REQUIRED

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { error: "Network error. Please try again." };
    }
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
        login,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
