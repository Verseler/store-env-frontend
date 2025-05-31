import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
