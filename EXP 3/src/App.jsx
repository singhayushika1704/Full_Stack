// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";

const Layout = ({ children }) => {
  return (
    <div className="app">

      <Navbar />

      <main>
        {children}
      </main>

    </div>
  );
};

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          {/* Public Route */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected Dashboard */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>

                <RoleGuard allowedRoles={["Admin"]}>

                  <Layout>
                    <Admin />
                  </Layout>

                </RoleGuard>

              </ProtectedRoute>
            }
          />

          {/* Editor Route */}

          <Route
            path="/editor"
            element={
              <ProtectedRoute>

                <RoleGuard
                  allowedRoles={["Admin", "Editor"]}
                >

                  <Layout>
                    <Editor />
                  </Layout>

                </RoleGuard>

              </ProtectedRoute>
            }
          />

          {/* Profile */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>

                <Layout>
                  <Profile />
                </Layout>

              </ProtectedRoute>
            }
          />

          {/* Unauthorized */}

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          {/* Default */}

          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;