import React from "react";

const ListButtons = ({ handleSettingPages }) => {
  return (
    <div className="buttons">
      <button
        className="switchPage"
        onClick={() => handleSettingPages("first")}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button className="switchPage" onClick={() => handleSettingPages("prev")}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button className="switchPage" onClick={() => handleSettingPages("next")}>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <button className="switchPage" onClick={() => handleSettingPages("last")}>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default ListButtons;
