import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";


export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login({ email, password });

    setLoading(false);

    if (result?.error) {
      alert(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div style={{ marginTop: 18 }}>
  <GoogleLoginButton />
</div>


        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        
      </form>

      <div className="auth-links">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>

      <p>
        New to KAEORN? <Link to="/signup">Create your account</Link>
      </p>
    </div>
    
  );
}

