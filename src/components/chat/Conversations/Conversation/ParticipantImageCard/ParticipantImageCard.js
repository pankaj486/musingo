import React from 'react'

import { useLocation } from 'react-router-dom'

import BackgroundImage from './../../../../../assets/images/experience-bg.png'

import './ParticipantImageCard.scss'

const ParticipantImageCard = props => {
  const location = useLocation()
  let backgroundImage = {
    backgroundImage: `url(${BackgroundImage})`,
    height: props.backgroundHeight ? props.backgroundHeight : 'auto'
  }
  return (
    <div className="participant-image-card" style={backgroundImage}>
      <div className="participant-learning-info">
        {
          location.pathname === '/bookingInquiries' ?
            <span className="learn pro">Learn <br />Flamenco like a<br />pro</span> :
            <span className="learn">Learn Flamenco</span>
        }
        <span className="group">Grouppe C</span>
      </div>
      <div>
        <img className="styled-participant-image" src={props.image} alt="participant" order="0" />
        <img className="styled-participant-image" src={props.image} alt="participant" order="1" />
        <img className="styled-participant-image" src={props.image} alt="participant" order="2" />
        <img className="styled-participant-image" src={props.image} alt="participant" order="3" />
      </div>
    </div>
  )
}

export default ParticipantImageCard