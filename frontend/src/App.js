import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Suggestions from './pages/Suggestions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/suggestions" element={<Suggestions />} />
    </Routes>
  );
}

export default App;
