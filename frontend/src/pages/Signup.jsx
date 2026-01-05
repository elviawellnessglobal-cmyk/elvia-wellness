import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TEMP: store user locally
    localStorage.setItem("user", JSON.stringify(form));

    alert("Account created successfully");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="phone" placeholder="Mobile Number" onChange={handleChange} required />
        <input name="password" placeholder="Create Password" type="password" onChange={handleChange} required />
        <input name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} required />

        <button type="submit">Create your ELVIA account</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
