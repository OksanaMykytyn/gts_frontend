import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../button/Button";

import logo from "../../images/icons/logo.svg";
import menu from "../../images/icons/menu_gts.svg";
import closeMenu from "../../images/icons/close_menu.svg";

import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/status", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else if (res.status === 401) {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Помилка перевірки статусу сесії:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionStatus();
  }, []);

  const openAside = () => setIsOpen(true);
  const closeAside = () => setIsOpen(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const buttonText = isAuthenticated ? "Me" : "Login";

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-logo">
            <img
              src={menu}
              alt="menu"
              onClick={openAside}
              className="menu-btn"
            />
            <img src={logo} alt="logo" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Forum</Link>
              </li>
              <li>
                <Link to="/admin/analytics">Statistic</Link>
              </li>
              <li>
                <Link to="/chatbot">Chatbot</Link>
              </li>
            </ul>
          </nav>
          <Button text={buttonText} onClick={handleAuthClick} />
        </div>
      </header>

      <aside className={`aside ${isOpen ? "open" : ""}`}>
        <div className="aside-logo">
          <img src={logo} alt="" />
          <img
            src={closeMenu}
            alt="close"
            onClick={closeAside}
            className="close-btn"
          />
        </div>
        <nav>
          <ul>
            <li onClick={closeAside}>
              <Link to="/">Forum</Link>
            </li>
            <li onClick={closeAside}>
              <Link to="/admin/analytics">Statistic</Link>
            </li>
            <li onClick={closeAside}>
              <Link to="/chatbot">Chatbot</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;
