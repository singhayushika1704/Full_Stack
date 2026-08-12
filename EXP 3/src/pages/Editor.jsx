// src/pages/Editor.jsx

import { useAuth } from "../context/AuthContext";

const Editor = () => {
  const { user } = useAuth();

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span className="eyebrow">CONTENT MANAGEMENT</span>

          <h1>Editor Workspace ✏️</h1>

          <p>
            Create and manage application content.
          </p>
        </div>

        <div className="role-badge editor">
          ● {user?.role}
        </div>

      </div>

      <div className="editor-banner">

        <div className="editor-banner-icon">
          ✨
        </div>

        <div>
          <h2>Ready to create something?</h2>

          <p>
            Your role has permission to create and edit
            application content.
          </p>
        </div>

        <button>
          + Create Content
        </button>

      </div>

      <div className="content-grid">

        <div className="article-card">

          <div className="article-top">
            <span className="content-label">
              ARTICLE
            </span>

            <span>⋮</span>
          </div>

          <h3>Understanding JWT Authentication</h3>

          <p>
            Learn how JSON Web Tokens provide a stateless
            authentication mechanism for modern web applications.
          </p>

          <div className="article-footer">
            <span>Updated today</span>

            <button>Edit</button>
          </div>

        </div>

        <div className="article-card">

          <div className="article-top">
            <span className="content-label">
              SECURITY
            </span>

            <span>⋮</span>
          </div>

          <h3>Role-Based Access Control</h3>

          <p>
            RBAC restricts application resources based on
            predefined user roles and permissions.
          </p>

          <div className="article-footer">
            <span>Updated yesterday</span>

            <button>Edit</button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Editor;