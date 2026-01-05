import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert("OTP sent (demo). You can now reset password.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Password assistance</h2>
      <p>Enter your email or mobile number</p>

      <form onSubmit={handleReset}>
        <input
          placeholder="Email or mobile number"
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
