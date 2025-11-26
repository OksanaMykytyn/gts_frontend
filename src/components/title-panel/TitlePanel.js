import React from "react";

import "./TitlePanel.css";

const TitlePanel = ({ image, title, tags }) => {
  return (
    <div className="title-panel">
      <img src={image} alt="" />
      <div className="title-panel-text">
        <h2>{title}</h2>
        <p>{tags}</p>
      </div>
    </div>
  );
};

export default TitlePanel;
