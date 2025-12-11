import React, { useState, useEffect } from "react";

import Header from "../../components/header/Header";
import Background from "../../components/background/Background";
import "./MangaDetails.css";

import { API_URL } from "../../config";

const MangaDetailsCard = () => {
  const [mangaData, setMangaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/external/manga/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMangaData(data.data);
      })
      .catch((err) => {
        console.error("Помилка завантаження даних:", err);
        setError("Не вдалося завантажити дані манги.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container loading-state">
        <p>Завантаження даних...</p>
      </div>
    );
  }

  if (error || !mangaData) {
    return (
      <div className="container error-state">
        <p>Помилка: {error || "Дані не знайдені."}</p>
      </div>
    );
  }

  const tags = [
    ...mangaData.genres,
    ...mangaData.themes,
    ...mangaData.demographics,
  ].map((item) => item.name);

  const scoreFormatted = mangaData.score ? `${mangaData.score} / 10` : "N/A";
  const synopsisText = mangaData.synopsis.split("[")[0].trim();

  return (
    <>
      <Background />
      <Header />
      <div className="container manga">
        <div className="content-card">
          <header className="header">
            <h1 className="main-title">{mangaData.title}</h1>
            <p className="subtitle">{mangaData.title_japanese}</p>
          </header>

          <div className="details-layout">
            <aside className="aside-info">
              <img
                src={mangaData.images.jpg.large_image_url}
                alt={`Обкладинка: ${mangaData.title}`}
                className="cover-image"
              />

              <div className="metadata-box">
                <h3 className="metadata-title">Ключова Інформація</h3>
                <p className="metadata-item">
                  <span className="label">Оцінка:</span>
                  <span className="value score">{scoreFormatted}</span>
                </p>
                <p className="metadata-item">
                  <span className="label">Рейтинг:</span>
                  <span className="value rank">#{mangaData.rank}</span>
                </p>
                <p className="metadata-item">
                  <span className="label">Автор:</span>
                  <span className="value">
                    {mangaData.authors[0]?.name || "N/A"}
                  </span>
                </p>
                <p className="metadata-item">
                  <span className="label">Статус:</span>
                  <span className="value">{mangaData.status}</span>
                </p>
                <p className="metadata-item">
                  <span className="label">Опубліковано:</span>
                  <span className="value date">
                    {mangaData.published.string}
                  </span>
                </p>
              </div>
            </aside>

            <main className="main-content">
              <section className="section">
                <h3 className="section-title">Синопсис</h3>
                <p className="synopsis-text">{synopsisText}</p>
              </section>

              <section className="section tags-section">
                <h3 className="section-title">Жанри та Теми</h3>
                <div className="tags-list">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaDetailsCard;
