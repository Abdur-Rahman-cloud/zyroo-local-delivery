import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
  <div className="nav-container">
    <div className="logo">ZYROO</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/track">Track Delivery</Link>
    </div>
  </div>
</nav>
  );
}

export default Navbar;