import React from "react";
import Button from "../button/Button";

import like from "../../images/icons/like.svg";
import comment from "../../images/icons/comment.svg";

import "./Post.css";

const Post = ({ post }) => {
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
};

export default Post;
