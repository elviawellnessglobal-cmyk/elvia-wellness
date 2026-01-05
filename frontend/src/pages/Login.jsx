import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found. Please sign up.");
      return;
    }

    if (
      (emailOrPhone === user.email || emailOrPhone === user.phone) &&
      password === user.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email or mobile number"
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <div className="auth-links">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>

      <p>
        New to ELVIA? <Link to="/signup">Create your account</Link>
      </p>
    </div>
  );
}
