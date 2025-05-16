import React, { useState } from "react";
import "../css/Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <div className="floating-leaves">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
      </div>

      <div className="main-content">
        <div className="text-content">
          <h1>SAVE EARTH</h1>
          <h1>We Love Helping You to Save Lives</h1>
          <h2>
            Plants help improve air quality by reducing carbon dioxide levels,
            increasing humidity, and lowering pollutants such as benzene and
            nitrogen.
          </h2>
          <button className="cta-button">Explore Now</button>
        </div>
        <div className="image-content">
          <img
            src="/2.png"
            alt="A green plant symbolizing environmental conservation"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
