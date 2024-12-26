import React from 'react';
import '../styles/HeroSection.css'; // Import the corresponding CSS file

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Next Gig!</h1>
        <p className="hero-description">
          Browse thousands of gigs from talented professionals around the world. Start your journey today.
        </p>
        <button className="cta-button">Browse Gigs</button>
      </div>
    </section>
  );
};

export default HeroSection;
