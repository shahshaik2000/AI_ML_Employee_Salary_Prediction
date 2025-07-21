import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">💼 Salary Prediction App</h1>
        <p className="home-subtitle">Use Machine Learning to predict employee salaries and get improvement suggestions from Generative AI</p>
        <button className="home-button" onClick={() => navigate('/predict')}>
          🚀 Continue
        </button>
      </div>
    </div>
  );
}

export default Home;

