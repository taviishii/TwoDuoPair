import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const socialLinks = [
    { name: 'Twitter', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Z" />
      </svg>
    ), url: 'https://twitter.com/twoduo' },
    { name: 'Instagram', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Z" />
      </svg>
    ), url: 'https://instagram.com/twoduo' },
    { name: 'Facebook', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
      </svg>
    ), url: 'https://facebook.com/twoduo' }
  ];

  return (
    <div className="home">
      <nav className="home-nav">
        <div className="nav-content">
          <Link to="/" className="nav-logo">Two Duo Pair</Link>
          <div className="nav-links">
            <Link to="/search" className="cta-button">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h1>Meet halfway, connect fully</h1>
          <p>
            Find matches based on proximity and shared interests, then meet at a venue that's convenient for both of you.
          </p>
          <Link to="/search" className="cta-button">Get Started</Link>
        </div>
      </div>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-content">
          <h2>How It Works</h2>
          <h3>Find your perfect meeting spot in three easy steps</h3>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB71vh_JuTNxU0m9M2euNHYB-HAGH2P4nHZLbF8QSGcFHKPlNiB1ntGw8YKQnIYLAkxXIrXEw9zSjfVRsNrnZio3d__EELvemv3x5C8EXKPqwv1C3PyCECxIVitgU7oRGl3AnDG3E6BuudD4t3Y11t0yWWPUjNB1hoKpYjnWDgAKOEhL6710e_szWNTsOCLSbcYCDRq7PnqydqbQRs8cX1M5rJo7YD79pjrlJC4qSDvVrNR5Eph4lDbmZ-Z9ruZiQdSJPmwIo98eiw")' }} />
              <h4>Enter Locations</h4>
              <p>Input the addresses or locations of both meeting participants.</p>
            </div>

            <div className="step">
              <div className="step-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtudddK06GP7k9_71DYBtZyC0Sl-ZOQu6-YklyL0tExf8i4D0V_mEd2L2IJxNXLLJB4IvFHnCH94MkaJ9D08zOqijoriqWPBnMNs27JmrHkrrEaw33eWVdFV5_WGVaUaP4HeEOCTDEuEtxAsT3OIba0jcUisx1SNOWJ6Pn0lpilAspwcGgQYn1BZ9HE4wsKB-lZO9btARV-CELrd91RTnT_ZYnMDRxsoJTKz2UK20meZ-bbbZG9LXiUe6jQwaSAQTjG2-Buzz0mf4")' }} />
              <h4>Find Your Spot</h4>
              <p>Our smart algorithm suggests optimal meeting points based on travel time and convenience.</p>
            </div>

            <div className="step">
              <div className="step-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmXsE-FxFI7Jvphx_xZrtFbYJA7h7DkEXQpkwL-GRt98N5bNT85IFp7nwXaWNzKyvcFOtJDECk_1mMkthu7DP_YQWYsSebu0faSTjeSvKSRpC_fm3hc_Is15nZc9HldPQmbGcQXx_mqNKuLcLpC0-9dyWV_q7bEyjZMlRN89VNurWorb5dNXbRGLPiRw4bvgua0M33XQPIdNc-ZK8UvPHRYwA7AIlBKVV6E-iXLlLHghJc71LqTFy-6fLNRFWj4_5BK2wWA7_wkRg")' }} />
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
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="social-links">
            {socialLinks.map(({ name, icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="social-icon"
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