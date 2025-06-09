// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VenueSearch from './components/VenueSearch';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VenueSearch />} />
            </Routes>
        </Router>
    );
}

export default App;
