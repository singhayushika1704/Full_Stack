// src/utils/jwt.js

// Convert an object to Base64URL
const base64UrlEncode = (object) => {
  const jsonString = JSON.stringify(object);

  return btoa(jsonString)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

// Decode Base64URL
const base64UrlDecode = (data) => {
  try {
    const base64 = data
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const jsonString = atob(base64);

    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
};

// Generate a mock JWT
export const generateToken = (user) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  // Mock signature for educational demonstration
  const signature = btoa(
    `${encodedHeader}.${encodedPayload}.secure-demo-signature`
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Decode JWT payload
export const decodeToken = (token) => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    return base64UrlDecode(parts[1]);
  } catch (error) {
    return null;
  }
};

// Check whether token is expired
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);

  if (!decoded || !decoded.exp) {
    return true;
  }

  return decoded.exp * 1000 < Date.now();
};