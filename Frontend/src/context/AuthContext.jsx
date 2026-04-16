import { createContext, useContext, useState, useCallback } from "react";
import { logout as logoutApi } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("wh_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Backend uses cookie-based auth (httpOnly jwtToken cookie).
  // We only store user profile data in localStorage for display.
  const signIn = useCallback((userData) => {
    localStorage.setItem("wh_user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      /* ignore */
    }
    localStorage.removeItem("wh_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
