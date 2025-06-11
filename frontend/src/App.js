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
                {/* Background Elements */}
                <div className="background-elements">
                    <div className="decorative-circles">
                        <div className="circle circle-1"></div>
                        <div className="circle circle-2"></div>
                        <div className="circle circle-3"></div>
                    </div>
                    <div className="pattern-overlay"></div>
                </div>

                {/* Main Content */}
                <main className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<VenueSearch />} />
                    </Routes>
                </main>

                {/* Corner Decorations */}
                <div className="corner-decorations">
                    <div className="corner-decoration top-left"></div>
                    <div className="corner-decoration top-right"></div>
                    <div className="corner-decoration bottom-left"></div>
                    <div className="corner-decoration bottom-right"></div>
                </div>
            </div>
        </Router>
    );
}

export default App;
