import { useCallback, useState } from "react";
import { registerUser, loginUser } from "../api/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const data = await registerUser(payload);

      const result = data?.user ?? data ?? null;
      setUser(result);

      return result;
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to register");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(payload);

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      const result = data?.user ?? data ?? null;
      setUser(result);

      return result;
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to login");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };
}