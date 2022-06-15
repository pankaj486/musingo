import React from 'react'

import ParticipantImageCard from '../../../../chat/Conversations/Conversation/ParticipantImageCard/ParticipantImageCard'

import Instructor from '../../../../../assets/images/instructor.png'

import './bookingRequest.css'

const BookingRequest = props => {
  return (
    <div className={`booking-request ${props.selected === props.id ? 'selected' : ''}`} onClick={props.handleClick}>
      <div className="booking-request__side-content">
        <ParticipantImageCard image={Instructor} />
      </div>
      <div className="booking-request__main-content">
        <div> </div>
        <div className="booking-request__instructor-details">
          <img className="booking-requests__instructor-image" src={Instructor} alt={props.title}/>
          <span className="booking-requests__instructor-name">{props.name}</span>
          <span className="booking-requests__price">{props.price}</span>
        </div>
        <div className="booking-request__expires-in"><span>Läuft ab in {props.expiresIn}</span></div>
      </div>
    </div>
  )
}

export default BookingRequest