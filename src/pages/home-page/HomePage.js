import React from "react";

import Background from "../../components/background/Background";
import Header from "../../components/header/Header";
import FeedScroll from "../../components/feed-scroll/FeedScroll";
const HomePage = () => {
  return (
    <>
      <Background />
      <Header />
      <FeedScroll />
    </>
  );
};

export default HomePage;
