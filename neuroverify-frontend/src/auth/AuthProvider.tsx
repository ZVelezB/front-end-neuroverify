import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { attachToken } from "../api/http";
import { getMe } from "../api/auth";
import type { User } from "../api/auth";

const FAKE_AUTH = (import.meta.env.VITE_FAKE_AUTH ?? "false") === "true";

type AuthCtx = {
  user: User | null;
  token: string | null;
  setToken: (t: string | null) => void;
  setUser: (u: User | null) => void; // <-- added
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

const DEV_USER_KEY = "dev_user";   // <-- added

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = (t: string | null) => {
    if (t) localStorage.setItem("token", t);
    else localStorage.removeItem("token");
    setTokenState(t);
  };

  useEffect(() => {
    attachToken(() => token);
  }, [token]);

  useEffect(() => {
    const init = async () => {
      try {
        if (FAKE_AUTH) {
          // Load mock user from localStorage (set by Login screen)
          const raw = localStorage.getItem(DEV_USER_KEY);
          if (raw) {
            setUser(JSON.parse(raw));
            setLoading(false);
            return;
          }
          // not logged in yet in dev mode
          setUser(null);
          setLoading(false);
          return;
        }

        // Real auth path
        const me = await getMe();
        setUser(me.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(DEV_USER_KEY); // <-- clear dev user too
    window.location.href = "/login";
  };

  const value = useMemo(
    () => ({ user, token, setToken, setUser, loading, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
