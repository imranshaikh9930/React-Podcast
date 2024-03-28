import React from 'react'
import "./Notfound.css";
import {NavLink} from "react-router-dom";

const Notfound = () => {

    
  return (
    <div className="not-found-container">
    <h1 className='error-code'>404</h1>
    <h2 className='error-msg'>Page Not Found</h2>
    <p className='error-msg2'>Oops! The page you are looking for might have been removed or is temporarily unavailable.</p>

    <NavLink to={"/"}>Go back to Home</NavLink>
  </div>
  )
}

export default Notfound