import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axiosClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cw_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/api/users/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("cw_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (payload) => {
    localStorage.setItem("cw_token", payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("cw_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
