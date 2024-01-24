import React from "react";
import "./Banner.css";
const Banner = () => {
  return (
    <div className="new-banner">
    
      <div className="new-content">
        <h1 className="text-3xl font-bold text-black md:text-6xl">Pick Your House</h1>
        <p>
          Lets create a home you love. Refreshing a room or transforming your
          whole home?
          <br />
          Make it happen with our Home Design Stylists.
        </p>
        <div>
          <button className="new-button">
            <span></span>Get Started
          </button>
          <button className="new-button">
            <span></span>Find Your Style
          </button>
        </div>
     
      </div>
    </div>
  );
};

export default Banner;
