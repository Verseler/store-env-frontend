import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axiosConfig';

type LoginResponse = {
  url: string | null;
}

export const useGoogleLogin = () => {

  return useQuery({
    queryKey: ['google-login'],
    queryFn: loginWithGoogle
  });
}

async function loginWithGoogle() {
  return await axios
    .get<LoginResponse>("/auth/google")
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => console.error("loginWithGoogle", error));
}
