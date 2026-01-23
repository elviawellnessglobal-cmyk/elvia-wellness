import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("kaeorn_user");
    if (saved) setUser(JSON.parse(saved));
    setAuthLoading(false);
  }, []);

  function saveAuth(data) {
    localStorage.setItem("kaeorn_token", data.token);
    localStorage.setItem("kaeorn_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  async function login({ email, password }) {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    if (!res.ok) return { error: data.message };
    saveAuth(data);
    return { success: true };
  }

  async function loginWithGoogle(credential) {
    const payload = JSON.parse(atob(credential.split(".")[1]));
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/api/auth/google`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.email,
          name: payload.name,
          googleId: payload.sub,
        }),
      }
    );
    const data = await res.json();
    saveAuth(data);
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, loginWithGoogle, logout, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
