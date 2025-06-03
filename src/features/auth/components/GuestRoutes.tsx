import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function GuestRoutes() {
const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="home" replace /> : <Outlet />;
}
