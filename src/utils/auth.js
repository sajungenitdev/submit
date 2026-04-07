// utils/auth.js

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    console.log("Token stored:", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log(
      "Token retrieved:",
      token ? `${token.substring(0, 20)}...` : "No token",
    );
    return token;
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    console.log("Token and user data removed");
  }
};

export const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User stored:", user);
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = () => {
  const token = getToken();
  const isAuth = !!token;
  console.log("Is authenticated:", isAuth);
  return isAuth;
};

// Set both token and user at once
export const setAuthData = (token, user, rememberMe = false) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    console.log("Auth data stored successfully");
    console.log("User role:", user.role);
  }
};

// Clear all auth data
export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    console.log("All auth data cleared");
  }
};
