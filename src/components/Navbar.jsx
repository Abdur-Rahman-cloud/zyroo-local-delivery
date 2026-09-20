import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          ZYROO
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/track">Track Delivery</Link>

          {user && user.role === "rider" && (
            <Link to="/rider/dashboard">My Deliveries</Link>
          )}

          {user && user.role === "customer" && (
            <Link to="/customer/orders">My Orders</Link>
          )}

          {user ? (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;