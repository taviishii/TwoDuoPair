import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenueSearch from './VenueSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <h1>Two Duo Pair</h1>
        </nav>
        
        <Routes>
          <Route path="/" element={<VenueSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
