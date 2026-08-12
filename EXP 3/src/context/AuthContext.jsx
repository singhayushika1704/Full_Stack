// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  generateToken,
  decodeToken,
  isTokenExpired,
} from "../utils/jwt";

const AuthContext = createContext();

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "Alex Johnson",
  },
  {
    id: 2,
    username: "editor",
    password: "editor123",
    role: "Editor",
    name: "Sarah Williams",
  },
  {
    id: 3,
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
    name: "Michael Brown",
  },
];

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("jwt_token")
  );

  const [user, setUser] = useState(null);

  // Restore session when application loads
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");

    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      setUser(decodeToken(storedToken));
    } else {
      localStorage.removeItem("jwt_token");
      setToken(null);
      setUser(null);
    }
  }, []);

  // Login function
  const login = (username, password) => {
    const foundUser = users.find(
      (item) =>
        item.username === username &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const newToken = generateToken(foundUser);

    localStorage.setItem("jwt_token", newToken);

    setToken(newToken);
    setUser(decodeToken(newToken));

    return {
      success: true,
      message: "Login successful",
    };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("jwt_token");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated =
    token && user && !isTokenExpired(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};