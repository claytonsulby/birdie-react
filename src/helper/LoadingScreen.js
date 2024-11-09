import React from "react";
import "./LoadingScreen.css"; // Import CSS

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;