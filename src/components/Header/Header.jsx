import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth} from '../../firebase';
import {toast } from 'react-toastify';
import "./Header.css";
const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // console.log(location);
  const [profile,setProfile] = useState(false);

  useEffect(() => {
    if (location.pathname === '/profile') {
      setProfile(true);
    
    } else {
      setProfile(false);
    }
  }, [location.pathname]);

  
  const handleLogout = ()=>{

    signOut((auth)).then(()=>{
      toast.success("User Logged Out !");
    }).catch((err)=>{

      console.log(err)
    })
  }
  

 

  return (
    <>
     <div className="navbar">
      <div className="gradient"></div>
      {profile ? (
        <>
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
            
            <div className="logout-btn">
              <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
    </>
    
  )
};

export default Header;
