// src/components/Navbar.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">🔐</div>

        <div>
          <h2>SecureGate</h2>
          <span>JWT Access Control</span>
        </div>
      </div>

      <nav>
        <Link
          className={location.pathname === "/dashboard" ? "active" : ""}
          to="/dashboard"
        >
          Dashboard
        </Link>

        {user?.role === "Admin" && (
          <Link
            className={location.pathname === "/admin" ? "active" : ""}
            to="/admin"
          >
            Admin
          </Link>
        )}

        {(user?.role === "Admin" || user?.role === "Editor") && (
          <Link
            className={location.pathname === "/editor" ? "active" : ""}
            to="/editor"
          >
            Editor
          </Link>
        )}

        <Link
          className={location.pathname === "/profile" ? "active" : ""}
          to="/profile"
        >
          Profile
        </Link>
      </nav>

      <div className="nav-user">
        <div className="avatar">
          {user?.name?.charAt(0)}
        </div>

        <div className="user-info">
          <strong>{user?.name}</strong>
          <span>{user?.role}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;