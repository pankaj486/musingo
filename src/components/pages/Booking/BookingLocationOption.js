import React from 'react'
import './BookingLocationOption.scss'

const BookingLocationOption = ({imageSrc, title, info, price, handleLocationSelect, selected, handleHoverIn, handleHoverOut}) => {
  return (
    <div className="booking-location__option-container swiper-slide" onClick={handleLocationSelect}>
      <div className={`booking-location__option ${selected ? 'booking-location--selected' : ''}`} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
        <span className="booking-location__pricing">{price}</span>
        <img className="booking-location__image" src={imageSrc} alt="location" />
        <p className="booking-location__title">{title}</p>
        <p className="booking-location__info">{info}</p>
      </div>
    </div>
  )
}

export default BookingLocationOption