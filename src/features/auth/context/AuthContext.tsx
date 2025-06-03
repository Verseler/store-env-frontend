import { useState, type PropsWithChildren } from "react";
import type { User } from "@/features/auth/auth.types";
import { AuthContext } from "@/features/auth/hooks/useAuth";
import axios from "@/api/axiosConfig";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    return await axios
      .post("/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(!!res.data.token);
        setUser(res.data.user);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          console.error(error.message);
        }

        const serverErrors = error.response.data.errors;

        return {
          email: serverErrors.email?.[0] ?? undefined,
          password: serverErrors.password?.[0] ?? undefined,
        };
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/logout");

      if (res.status === 200) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("AuthContext.logout", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        setIsAuthenticated,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
