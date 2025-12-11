import React, { useState } from "react";
import Button from "../button/Button";

import like from "../../images/icons/like.svg";
import comment from "../../images/icons/comment.svg";

import { API_URL } from "../../config";

import "./Post.css";

const Post = React.memo(({ post }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mlResult, setMlResult] = useState(null);
  const [mlLoading, setMlLoading] = useState(false);

  const getSummary = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/ai/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: post.content }),
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Summary error:", error);
      alert("Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeSentiment = async () => {
    try {
      setMlLoading(true);
      const res = await fetch(`${API_URL}/ml/sentiment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: post.content }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "unknown" }));
        throw new Error(err.error || "Inference failed");
      }
      const data = await res.json();
      setMlResult(data);
    } catch (e) {
      console.error("ML error", e);
      alert("ML inference failed: " + e.message);
    } finally {
      setMlLoading(false);
    }
  };

  return (
    <div className="post">
      <div className="post-user">
        <div className="post-user-block">
          <img src={post.userImg} alt="" />
          <p>{post.user}</p>
        </div>

        <Button className="mini" text="Friend" />
      </div>

      <p className="post-tag">{post.tags}</p>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>

      <Button
        text={isLoading ? "Loading..." : "Get Summary"}
        onClick={getSummary}
        className="mini"
      />

      {summary && (
        <div className="post-summary">
          <strong className="post-content">Summary:</strong>
          <p className="post-content">{summary}</p>
        </div>
      )}

      <Button
        text={mlLoading ? "Analyzing..." : "Analyze Sentiment"}
        onClick={analyzeSentiment}
        className="mini"
      />
      {mlResult && (
        <div className="post-ml-result">
          <p className="post-content">
            <strong>Sentiment:</strong> {mlResult.label}
          </p>
          <p className="post-content">
            Probabilities — negative:{" "}
            {mlResult.probabilities.negative.toFixed(2)}, neutral:{" "}
            {mlResult.probabilities.neutral.toFixed(2)}, positive:{" "}
            {mlResult.probabilities.positive.toFixed(2)}
          </p>
        </div>
      )}

      <div className="post-statistic">
        <div className="post-like">
          <img src={like} alt="" />
          <p>{post.likes}</p>
        </div>
        <div className="post-comment">
          <img src={comment} alt="" />
          <p>{post.comments}</p>
        </div>
      </div>
    </div>
  );
});

export default Post;
