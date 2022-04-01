import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="background">
      <Link to="/home" className="videogame-btn">
        Videogames App
      </Link>
    </div>
  );
};

export default LandingPage;
