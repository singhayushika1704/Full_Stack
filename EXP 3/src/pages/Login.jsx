// src/pages/Login.jsx

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);

      setLoading(false);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    }, 700);
  };

  const fillCredentials = (role) => {
    if (role === "Admin") {
      setUsername("admin");
      setPassword("admin123");
    }

    if (role === "Editor") {
      setUsername("editor");
      setPassword("editor123");
    }

    if (role === "Viewer") {
      setUsername("viewer");
      setPassword("viewer123");
    }

    setError("");
  };

  return (
    <div className="login-page">

      <div className="login-decoration">
        <div className="circle circle-one"></div>
        <div className="circle circle-two"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="login-container">

        <div className="login-brand">
          <div className="large-lock">🔐</div>

          <h1>SecureGate</h1>

          <p>
            Secure authentication with JWT
            <br />
            & Role-Based Access Control
          </p>
        </div>

        <div className="login-card">

          <div className="card-header">
            <h2>Welcome back</h2>

            <p>
              Sign in to access your secure dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span>🔑</span>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In →"}
            </button>
          </form>

          <div className="demo-section">

            <div className="demo-title">
              Demo credentials
            </div>

            <div className="demo-buttons">

              <button onClick={() => fillCredentials("Admin")}>
                <span>🛡️</span>
                Admin
              </button>

              <button onClick={() => fillCredentials("Editor")}>
                <span>✏️</span>
                Editor
              </button>

              <button onClick={() => fillCredentials("Viewer")}>
                <span>👁️</span>
                Viewer
              </button>

            </div>

            <small>
              Click a role to auto-fill credentials
            </small>

          </div>

        </div>

        <div className="security-note">
          🔒 JWT protected • Stateless authentication • RBAC enabled
        </div>

      </div>
    </div>
  );
};

export default Login;