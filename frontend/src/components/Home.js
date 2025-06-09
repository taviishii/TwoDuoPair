import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: 'https://twitter.com/twoduo' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com/twoduo' },
    { name: 'Facebook', icon: 'ⓕ', url: 'https://facebook.com/twoduo' }
  ];

  return (
    <div className="home">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            Two Duo Pair
          </Link>
          <div className="nav-links">
            <Link to="/how-it-works">How it works</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/search" className="cta-button">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Meeting Spot</h1>
          <p>
            Effortlessly discover ideal meeting locations with smart, location-based suggestions. Connect with ease, wherever you are.
          </p>
          <Link to="/search" className="cta-button">Get Started</Link>
        </div>
      </div>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-content">
          <h2>How It Works</h2>
          <h3>Find the perfect meeting spot in three easy steps</h3>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l-3-3m0 0l3-3m-3 3h12" />
                </svg>
              </div>
              <h4>Enter Locations</h4>
              <p>Input the addresses or locations of both meeting participants.</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h4>Find Your Spot</h4>
              <p>Our smart algorithm suggests optimal meeting points based on travel time and convenience.</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h4>Meet Up</h4>
              <p>Choose your preferred spot and coordinate your meeting with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="section-content">
          <h2>Why Choose Two Duo Pair</h2>
          <h3>Discover the benefits of using our service</h3>

          <div className="benefits-grid">
            {[
              {
                icon: "⚡",
                title: "Save Time",
                description: "Quickly find the best meeting spot without manual searching"
              },
              {
                icon: "📍",
                title: "Optimal Locations",
                description: "Our algorithm ensures the most convenient location for all participants"
              },
              {
                icon: "🤝",
                title: "Easy Coordination",
                description: "Seamlessly coordinate meeting details with suggested locations"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your location data is kept private and secure"
              }
            ].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-content">
          <h2>Ready to find your perfect meeting spot?</h2>
          <p>Start using Two Duo Pair today and simplify your meeting arrangements.</p>
          <Link to="/search" className="cta-button">Get Started</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            {socialLinks.map(({ name, icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                {icon}
              </a>
            ))}
          </div>
          <p>© 2024 Two Duo Pair. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 