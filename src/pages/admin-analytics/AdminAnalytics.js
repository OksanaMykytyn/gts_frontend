import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { API_URL } from "../../config";
import Background from "../../components/background/Background";
import Header from "../../components/header/Header";

import "./AdminAnalytics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function AdminAnalytics() {
  const [users, setUsers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [titles, setTitles] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/analytics/users-count`)
      .then((res) => res.json())
      .then((data) => setUsers(data.count));

    fetch(`${API_URL}/analytics/posts-count`)
      .then((res) => res.json())
      .then((data) => setPosts(data.count));

    fetch(`${API_URL}/analytics/posts-by-title`)
      .then((res) => res.json())
      .then(setTitles);

    fetch(`${API_URL}/analytics/activity-by-day`)
      .then((res) => res.json())
      .then(setActivity);
  }, []);

  return (
    <>
      <Background />
      <Header />
      <div className="analytic">
        <h2>Admin Analytics Dashboard</h2>

        <h3>Total Users: {users}</h3>
        <h3>Total Posts: {posts}</h3>

        <Bar
          data={{
            labels: titles.map((t) => t.title),
            datasets: [
              {
                label: "Posts per Title",
                data: titles.map((t) => t.count),
                backgroundColor: "#00ffb2",
                borderRadius: 10,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "#00ffa3",
                  font: { size: 14 },
                },
              },
              title: {
                display: false,
              },
              tooltip: {
                titleColor: "#00ffa3",
                bodyColor: "#ffffff",
                backgroundColor: "#1a1a1a",
              },
            },
            scales: {
              y: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "#ffffff" },
              },
              x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: {
                  color: "#ffffff",
                  maxRotation: 0,
                  minRotation: 0,
                  callback: function (value, index, values) {
                    const label = this.getLabelForValue(value);
                    const maxLength = 15;
                    return label.length > maxLength
                      ? label.substring(0, maxLength) + "..."
                      : label;
                  },
                },
              },
            },
          }}
        />

        {/* <Line
          data={{
            labels: activity.map((a) => a.day),
            datasets: [
              {
                label: "User Activity",
                data: activity.map((a) => a.count),
                borderColor: "#00ffb2",
                backgroundColor: "rgba(0,255,178,0.2)",
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: { color: "white" },
              },
            },
            scales: {
              x: { ticks: { color: "white" } },
              y: { ticks: { color: "white" } },
            },
          }}
        /> */}
      </div>
    </>
  );
}
