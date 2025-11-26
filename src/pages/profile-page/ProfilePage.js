import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Background from "../../components/background/Background";
import Header from "../../components/header/Header";

import "./ProfilePage.css";

import defaultImage from "../../images/img/image.png";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/profile", {
          method: "GET",
          credentials: "include",
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
      </section>
    </>
  );
};

export default ProfilePage;
