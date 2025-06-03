import { createContext, useContext } from "react";
import type { LoginForm, User } from '@/features/auth/auth.types';

export type AuthContextProps = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void | Partial<LoginForm>>;
  logout: () => Promise<void>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};