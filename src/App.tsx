import { Route, Routes } from "react-router";
import ProtectedRoutes from "@/features/auth/components/ProtectedRoutes";
import GuestRoutes from "@/features/auth/components/GuestRoutes";
import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import GoogleLoginCallback from "@/pages/GoogleLoginCallback";

function App() {
  return (
    <Routes>
      {/* Publicly accessible */}
      <Route index element={<LandingPage />} />

      {/* Accessible by un-authenticated user (guest) but not with authenticated user */}
      <Route element={<GuestRoutes />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="auth/google" element={<GoogleLoginCallback />} />
      </Route>

      {/* Accessible by authenticated user but not with un-authenticated user */}
      <Route element={<ProtectedRoutes />}>
        <Route path="home" element={<HomePage />} />
      </Route>

      {/* Fallback Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
