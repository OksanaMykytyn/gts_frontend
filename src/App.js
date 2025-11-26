import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/HomePage";
import RegisterPage from "./pages/register-page/RegisterPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import LoginPage from "./pages/login-page/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
