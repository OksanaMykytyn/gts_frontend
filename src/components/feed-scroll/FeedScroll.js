import React, { useRef, useState, useEffect } from "react";
import RecommendationPost from "../recommendation-post/RecommendationPost";

import "./FeedScroll.css";

const API_URL = "http://localhost:3000/posts";

const FeedScroll = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecommendations(data);
        setError(null);
      } catch (e) {
        console.error("Failed to fetch recommendations:", e);
        setError("Не вдалося завантажити пости. Перевірте сервер.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    const target = container.children[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prev = () => {
    const container = containerRef.current;
    if (!container) return;
    const currentIndex = Math.round(container.scrollTop / window.innerHeight);
    scrollToIndex(currentIndex - 1);
  };

  const next = () => {
    const container = containerRef.current;
    if (!container) return;
    const currentIndex = Math.round(container.scrollTop / window.innerHeight);
    scrollToIndex(currentIndex + 1);
  };

  if (isLoading) {
    return <div className="loading-state">Завантаження постів...</div>;
  }

  if (error) {
    return <div className="error-state">Помилка: {error}</div>;
  }

  if (recommendations.length === 0) {
    return <div className="empty-state">Постів поки що немає.</div>;
  }

  return (
    <>
      <div className="tiktok-arrows">
        <button onClick={prev} disabled={isLoading || error}>
          &uarr;
        </button>
        <button onClick={next} disabled={isLoading || error}>
          &darr;
        </button>
      </div>

      <div className="tiktok-container" ref={containerRef}>
        {recommendations.map((item) => (
          <section key={item.id} className="tiktok-section">
            <RecommendationPost data={item} />
          </section>
        ))}
      </div>
    </>
  );
};

export default FeedScroll;
