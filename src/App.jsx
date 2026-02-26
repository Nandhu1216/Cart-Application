// src/App.jsx
import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="content">
            <h1>Welcome to Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="aboutus-section">
            <AboutUs />
          </div>
        </div>
      ) : (
        <div className="product-list-container visible">
          <ProductList />
        </div>
      )}
    </div>
  );
}

export default App;
