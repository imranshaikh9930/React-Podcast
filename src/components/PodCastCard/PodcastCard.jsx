import React from 'react'
import "./PostcastCard.css";
import { NavLink } from 'react-router-dom';
import { FaCirclePlay } from "react-icons/fa6";
const PodcastCard = ({id,title,displayImage,createdBy}) => {
  return (
    <NavLink to={`/podcast/${id}`}>

      <div className="podcast-card">
        <img src={displayImage} alt="displayImage" className="display-image-podcast" />
        <div className='info'>
        <div>
        <p className="title-podcast">{title}</p>
        {/* <p className='createdBy-podcast'>CreatedBy: {createdBy} </p> */}

        </div>
        <FaCirclePlay style={{color:"var(--white)",padding:"1rem"}} />
        
        </div>
      
        
      </div>
    </NavLink>
  )
}

export default PodcastCard;