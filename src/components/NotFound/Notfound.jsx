import React from 'react'
import "./Notfound.css";
import {NavLink} from "react-router-dom";

const Notfound = () => {

    
  return (
    <div class="not-found-container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>Oops! The page you are looking for might have been removed or is temporarily unavailable.</p>

    <NavLink to={"/"}>Go back to Home</NavLink>
  </div>
  )
}

export default Notfound