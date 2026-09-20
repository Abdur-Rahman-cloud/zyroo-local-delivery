import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("business");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), role);

    if (role === "rider") navigate("/rider/dashboard");
    else if (role === "customer") navigate("/customer/orders");
    else navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="business">Business</option>
          <option value="rider">Rider</option>
          <option value="customer">Customer</option>
        </select>

        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}

export default Login;