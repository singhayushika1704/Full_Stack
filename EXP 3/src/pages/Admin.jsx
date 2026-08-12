// src/pages/Admin.jsx

import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const { user } = useAuth();

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span className="eyebrow">ADMINISTRATION</span>

          <h1>Admin Control Center 🛡️</h1>

          <p>
            Manage users, permissions and system settings.
          </p>
        </div>

        <div className="admin-badge">
          ADMIN ONLY
        </div>

      </div>

      <div className="admin-grid">

        <div className="admin-card">
          <div className="admin-icon">👥</div>

          <h3>User Management</h3>

          <p>
            Create, update and manage application users.
          </p>

          <button>Manage Users →</button>
        </div>

        <div className="admin-card">
          <div className="admin-icon">🔑</div>

          <h3>Permissions</h3>

          <p>
            Configure access permissions for each role.
          </p>

          <button>Manage Permissions →</button>
        </div>

        <div className="admin-card">
          <div className="admin-icon">⚙️</div>

          <h3>System Settings</h3>

          <p>
            Configure application security settings.
          </p>

          <button>Open Settings →</button>
        </div>

        <div className="admin-card">
          <div className="admin-icon">📈</div>

          <h3>System Analytics</h3>

          <p>
            Monitor authentication and access activity.
          </p>

          <button>View Analytics →</button>
        </div>

      </div>

      <div className="admin-info">

        <div className="info-icon">✓</div>

        <div>
          <strong>Administrator Access Granted</strong>

          <p>
            Logged in as {user?.name}. Your JWT contains the
            <strong> Admin </strong>
            role claim, allowing access to protected
            administrative routes.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Admin;