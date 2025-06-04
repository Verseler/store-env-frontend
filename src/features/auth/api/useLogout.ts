import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import axios from '@/api/axiosConfig';

export const useLogout = () => {
  const { setUser, setIsAuthenticated } = useAuth();
  
  const logout = async () => {
    try {
      const res = await axios.post("/logout");

      if (res.status === 200) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("AuthContext.logout", error);
    } 
  };

  return useMutation({ mutationFn: logout});
}
