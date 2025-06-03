import axios from "@/api/axiosConfig";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function GoogleLoginCallback() {
  const location = useLocation();
  const { setIsAuthenticated, setUser } = useAuth();

  useEffect(() => {
    const loginWithGoogle = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");

      if (!code) {
        console.error("No code found in query params");
        return;
      }

      try {
        await axios.get(`/auth/google/callback?code=${code}`).then((res) => {
          localStorage.setItem("token", res.data.token);
          setIsAuthenticated(!!res.data.token);
          setUser(res.data.user);
        });
      } catch (error) {
        console.error("Google login failed", error);
      }
    };

    loginWithGoogle();
  }, [location, setIsAuthenticated, setUser]);

  return <div>Logging you in...</div>;
}
