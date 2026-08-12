// src/pages/Profile.jsx

import { useAuth } from "../context/AuthContext";
import { decodeToken } from "../utils/jwt";

const Profile = () => {
  const { user, token } = useAuth();

  const decodedToken = token
    ? decodeToken(token)
    : null;

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <span className="eyebrow">ACCOUNT</span>

          <h1>My Profile</h1>

          <p>
            View your authenticated identity and JWT claims.
          </p>
        </div>

      </div>

      <div className="profile-layout">

        <div className="profile-card">

          <div className="profile-avatar">
            {user?.name?.charAt(0)}
          </div>

          <h2>{user?.name}</h2>

          <span className="profile-role">
            {user?.role}
          </span>

          <div className="profile-divider"></div>

          <div className="profile-row">
            <span>Username</span>
            <strong>{user?.username}</strong>
          </div>

          <div className="profile-row">
            <span>User ID</span>
            <strong>#{user?.id}</strong>
          </div>

          <div className="profile-row">
            <span>Role</span>
            <strong>{user?.role}</strong>
          </div>

        </div>

        <div className="token-card">

          <div className="section-title">
            <div>
              <h2>JWT Payload</h2>
              <p>
                Information decoded from your authentication token.
              </p>
            </div>

            <span className="jwt-label">
              JWT
            </span>
          </div>

          <div className="code-box">
            <pre>
{JSON.stringify(decodedToken, null, 2)}
            </pre>
          </div>

          <div className="jwt-explanation">

            <div>
              <strong>Header</strong>
              <span>Algorithm & token type</span>
            </div>

            <div>
              <strong>Payload</strong>
              <span>User claims & role</span>
            </div>

            <div>
              <strong>Signature</strong>
              <span>Token integrity</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;