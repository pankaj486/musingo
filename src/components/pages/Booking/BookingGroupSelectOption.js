import React from 'react'

import './BookingGroupSelectOption.scss'
import Cycling from 'src/assets/images/Cycling.png'

const BookingGroupSelectOption = ({ imageSrc, title, price, handleGroupSelect, selected, marker, imageCount, id }) => {
  return (
    <div className="booking-group-select__option-container swiper-slide" onClick={handleGroupSelect}>
      <div className={`booking-group-select__option ${selected ? 'booking-group-select--selected' : ''}`}>
        <span className="booking-group-select__pricing">{price}€ <br /> <span className="booking-group-select__price-unit--mobile">Einheit</span></span>
        <div className={`booking-group-select__marker ${selected ? 'booking-group-select__marker--selected' : ''}`}><div className="" style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          //   border: "1px solid #bcbcbc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          // transform: hover ? 'scale(1.2)' : ''
        }}
        >
          <img className="" style={{
            width: "32px",
            height: "auto"
          }} src={marker} alt="location" />
        </div></div>
        <p className="booking-group-select__title">{title} Uhr</p>
        <div className="booking-group-select__image-container">
          {
            [...Array(imageCount)].map((val, index) => {
              return <img
                className="booking-group-select__image"
                src={imageSrc}
                alt="group"
                key={index}
                style={{
                  right: (index * 10),
                  marginLeft: (index === 0) ? (imageCount * 10) : ''
                }}
                data-order={++index}
              />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default BookingGroupSelectOption