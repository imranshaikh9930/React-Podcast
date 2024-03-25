import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="all-links">
        <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
          SignUp
        </NavLink>

        <NavLink
          to="/podcast"
          className={location.pathname === "/podcast" ? "active" : ""}
        >
          Podcasts
        </NavLink>

        <NavLink
          to="/start-a-podcast"
          className={location.pathname === "/start-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </NavLink>

        <NavLink
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
