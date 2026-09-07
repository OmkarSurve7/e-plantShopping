import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <div className="landing_content">
          <h1>🌿 Welcome To Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <div className="divider"></div>
          {!showProductList ? (
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          ) : (
            <ProductList />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
