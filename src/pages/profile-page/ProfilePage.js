import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../../components/background/Background";
import Header from "../../components/header/Header";

import "./ProfilePage.css";

import defaultImage from "../../images/img/image.png";
import Button from "../../components/button/Button";

import { API_URL } from "../../config";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const createAuthHeader = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const upgrade = async () => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const res = await fetch(`${API_URL}/api/stripe/create-session`, {
      method: "POST",
      headers: createAuthHeader(token),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Payment session creation failed:", data.message);
    }
    window.location.href = data.url;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAuthToken();

      if (!token) {
        navigate("/login");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/users/profile`, {
          method: "GET",
          headers: createAuthHeader(token),
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await res.json();

        setProfile(data);
      } catch (error) {
        console.error("Помилка завантаження профілю:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (isLoading) {
    return (
      <>
        <Background />
        <Header />
        <section className="main-info-about-profile">
          <h1>Завантаження...</h1>
        </section>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Background />
        <Header />
        <section className="main-info-about-profile">
          <h1>Помилка завантаження даних</h1>
          <p>Спробуйте увійти знову.</p>
        </section>
      </>
    );
  }
  return (
    <>
      <Background />
      <Header />
      <section className="main-info-about-profile">
        <img src={profile.photo || defaultImage} alt={profile.name} />
        <h1>{profile.name}</h1>
        <p>{profile.email}</p>
        <Button onClick={upgrade} text="Upgrade to Premium" />
      </section>
    </>
  );
};

export default ProfilePage;
