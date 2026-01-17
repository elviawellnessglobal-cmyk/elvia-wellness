import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("kaeorn_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

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

    localStorage.setItem("kaeorn_token", data.token);
    localStorage.setItem("kaeorn_user", JSON.stringify(data.user));
    setUser(data.user);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("kaeorn_token");
    localStorage.removeItem("kaeorn_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
