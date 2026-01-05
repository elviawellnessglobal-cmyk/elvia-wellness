import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load logged-in user on refresh
  useEffect(() => {
    const saved = localStorage.getItem("elvia_logged_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // SIGN UP (does NOT auto login)
  function signup({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem("elvia_users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { error: "Account already exists" };
    }

    users.push({ name, email, password });
    localStorage.setItem("elvia_users", JSON.stringify(users));

    return { success: true };
  }

  // LOGIN
  function login({ email, password }) {
    const users = JSON.parse(localStorage.getItem("elvia_users")) || [];

    const match = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!match) {
      return { error: "Invalid email or password" };
    }

    setUser(match);
    localStorage.setItem("elvia_logged_user", JSON.stringify(match));
    return { success: true };
  }

  // LOGOUT
  function logout() {
    setUser(null);
    localStorage.removeItem("elvia_logged_user");
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
