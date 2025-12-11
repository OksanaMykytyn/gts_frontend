import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../../config";

import Background from "../background/Background";
import Header from "../header/Header";

import "./Chatbot.css";

const ChatMessage = ({ from, children }) => (
  <div className={`chat-msg ${from}`}>{children}</div>
);

const Chatbot = ({ onOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hello! Ask me to search posts, recommend topics, summarize or draft a reply.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch(`${API_URL}/chatbot/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();

      if (data.type === "search_results" || data.type === "recommendations") {
        const botText = data.results.length
          ? `I found ${data.results.length} posts:`
          : "No posts found.";
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            from: "bot",
            text: botText,
            posts: data.results,
          },
        ]);
      } else if (data.type === "summary") {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", text: data.summary },
        ]);
      } else if (data.type === "reply" || data.type === "chitchat") {
        const replyText =
          data.reply || data.summary || data.text || JSON.stringify(data);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", text: replyText },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", text: "Unknown response type." },
        ]);
      }
    } catch (err) {
      console.error("chatbot error", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          text: "Error: could not contact server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderPostList = (posts) => (
    <div className="chat-posts">
      {posts.map((p) => (
        <div key={p.id} className="chat-post-item">
          <h4>{p.title}</h4>
          <p>
            {p.content?.slice(0, 200)}
            {p.content?.length > 200 ? "..." : ""}
          </p>
          <a href={`/posts/${p.id}`}>Open post</a>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Background />
      <Header />
      <div className="chatbot">
        <div className="chatbox" ref={boxRef}>
          {messages.map((m) => (
            <div key={m.id}>
              <ChatMessage from={m.from}>
                <div>{m.text}</div>
                {m.posts && renderPostList(m.posts)}
              </ChatMessage>
            </div>
          ))}
          {loading && <div className="chat-msg bot">Thinking...</div>}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask: search posts about 'romance', recommend, summarize post #42, or draft a reply"
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
