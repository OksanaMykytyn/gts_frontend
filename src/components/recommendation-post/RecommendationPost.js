import React from "react";
import { useEffect } from "react";
import TitlePanel from "../title-panel/TitlePanel";
import Post from "../post/Post";

import link from "../../images/icons/link.svg";
import Button from "../button/Button";

import { API_URL } from "../../config";

import "./RecommendationPost.css";

const RecommendationPost = ({ data }) => {
  if (!data) return null;
  return (
    <div className="recommendation-post">
      {data.hasTitle && (
        <>
          <TitlePanel
            image={data.titleImage}
            title={data.title}
            tags={data.tags}
          />
          <img className="link-icon" src={link} alt="" />
        </>
      )}

      <Post post={data.post} />

      <Button text="Discuss" />
    </div>
  );
};

export default RecommendationPost;
