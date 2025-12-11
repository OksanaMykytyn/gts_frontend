import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/HomePage";
import RegisterPage from "./pages/register-page/RegisterPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import LoginPage from "./pages/login-page/LoginPage";
import Chatbot from "./components/chatbot/ChatbotPage";
import AdminAnalytics from "./pages/admin-analytics/AdminAnalytics";
import MangaDetailsCard from "./pages/manga-details/MangaDetailsCard";
import SpaceXLaunches from "./pages/space-x/SpaceXLaunches";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/space" element={<SpaceXLaunches />} />
      <Route path="/manga-details" element={<MangaDetailsCard />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
    </Routes>
  );
}

export default App;
