// src/pages/Dashboard.jsx

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, token } = useAuth();

  const roleDescription = {
    Admin: "Full system access and administrative privileges.",
    Editor: "Content management and editing privileges.",
    Viewer: "Read-only access to available resources.",
  };

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span className="eyebrow">
            SECURE DASHBOARD
          </span>

          <h1>
            Welcome, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p>
            Your identity has been successfully authenticated.
          </p>
        </div>

        <div className="role-badge">
          <span>●</span>
          {user?.role}
        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">🔐</div>
          <span>Authentication</span>
          <strong>Verified</strong>
          <small>JWT token active</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛡️</div>
          <span>Access Level</span>
          <strong>{user?.role}</strong>
          <small>Role-based permissions</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <span>Session</span>
          <strong>Active</strong>
          <small>Stateless architecture</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <span>Security</span>
          <strong>Protected</strong>
          <small>Route protection enabled</small>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="content-card">

          <div className="section-title">
            <div>
              <h2>Your Permissions</h2>
              <p>
                Access available according to your role.
              </p>
            </div>
          </div>

          <div className="permission-list">

            <div className="permission">
              <span className="permission-icon">📊</span>

              <div>
                <strong>Dashboard Access</strong>
                <small>View system dashboard</small>
              </div>

              <span className="allowed">Allowed</span>
            </div>

            <div className="permission">
              <span className="permission-icon">👤</span>

              <div>
                <strong>Profile Access</strong>
                <small>View personal information</small>
              </div>

              <span className="allowed">Allowed</span>
            </div>

            <div className="permission">
              <span className="permission-icon">✏️</span>

              <div>
                <strong>Content Editing</strong>
                <small>Create and modify content</small>
              </div>

              <span
                className={
                  user?.role === "Viewer"
                    ? "denied"
                    : "allowed"
                }
              >
                {user?.role === "Viewer"
                  ? "Restricted"
                  : "Allowed"}
              </span>
            </div>

            <div className="permission">
              <span className="permission-icon">⚙️</span>

              <div>
                <strong>System Administration</strong>
                <small>Manage users and settings</small>
              </div>

              <span
                className={
                  user?.role === "Admin"
                    ? "allowed"
                    : "denied"
                }
              >
                {user?.role === "Admin"
                  ? "Allowed"
                  : "Restricted"}
              </span>
            </div>

          </div>
        </div>

        <div className="content-card security-card">

          <div className="security-header">
            <span>🔒</span>

            <div>
              <h2>Authentication Status</h2>
              <p>JWT session information</p>
            </div>
          </div>

          <div className="security-status">
            <span className="status-dot"></span>

            <div>
              <strong>Authenticated</strong>
              <small>Your JWT token is valid.</small>
            </div>
          </div>

          <div className="token-preview">

            <label>JWT Token</label>

            <div>
              {token
                ? `${token.substring(0, 32)}...`
                : "No token"}
            </div>

          </div>

          <div className="architecture-note">

            <strong>Stateless Architecture</strong>

            <p>
              The server does not need to maintain a session.
              The client sends the JWT with each protected
              request.
            </p>

          </div>

        </div>

      </div>

      <div className="role-info">

        <span>💡</span>

        <div>
          <strong>{user?.role} Role</strong>

          <p>
            {roleDescription[user?.role]}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;