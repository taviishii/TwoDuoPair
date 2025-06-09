// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import VenueSearch from './components/VenueSearch';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<VenueSearch />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
