import React from 'react'
import "./PostcastCard.css";
import { NavLink } from 'react-router-dom';
const PodcastCard = ({id,title,displayImage}) => {
  return (
    <NavLink to={`/podcast/${id}`}>

      <div className="podcast-card">
        <img src={displayImage} alt="displayImage" className="display-image-podcast" />
        <p className="title-podcast">{title}</p>
      </div>
    </NavLink>
  )
}

export default PodcastCard;