// src/pages/Unauthorized.jsx

import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">

      <div className="unauthorized-card">

        <div className="unauthorized-icon">
          🔒
        </div>

        <span className="eyebrow">
          ACCESS DENIED
        </span>

        <h1>403</h1>

        <h2>Permission Required</h2>

        <p>
          You are authenticated, but your current role does
          not have permission to access this resource.
        </p>

        <Link to="/dashboard" className="back-btn">
          ← Back to Dashboard
        </Link>

      </div>

    </div>
  );
};

export default Unauthorized;