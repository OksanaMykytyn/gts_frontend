import React, { useState, useEffect } from "react";
import "./SpaceXLaunches.css";
import Header from "../../components/header/Header";
import Background from "../../components/background/Background";
import { API_URL } from "../../config";
const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/external/launches`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLaunches(data.launchesPast);
      })
      .catch((err) => {
        console.error("Помилка завантаження GraphQL даних:", err);
        setError("Не вдалося завантажити дані про запуски SpaceX.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container loading-state">
        <p>Завантаження даних про запуски...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container error-state">
        <p>Помилка: {error}</p>
      </div>
    );
  }

  if (launches.length === 0) {
    return (
      <div className="container loading-state">
        <p>Не знайдено жодних запусків.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Background />
      <div className="container space-x">
        <div className="content-card">
          <header className="header">
            <h1 className="main-title">🚀 Останні Запуски SpaceX (GraphQL)</h1>
            <p className="subtitle">
              Дані отримано через бекенд із GraphQL API
            </p>
          </header>

          <div className="launches-list">
            {launches.map((launch, index) => (
              <div key={index} className="launch-item">
                <h3 className="launch-mission">{launch.mission_name}</h3>
                <div className="launch-details">
                  <p>
                    <span className="label">Дата:</span>
                    {new Date(launch.launch_date_local).toLocaleString()}
                  </p>
                  <p>
                    <span className="label">Місце:</span>
                    {launch.launch_site?.site_name_long ||
                      "Дані про місце відсутні"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceXLaunches;
