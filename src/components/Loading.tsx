import React from 'react';
import './LoadingPage.css';

const Loading = () => {
  return (
    <div className="loadingContainer">
      <div className="spinner"></div>
      <p className="loadingText">Loading, please wait...</p>
    </div>
  );
};

export default Loading;