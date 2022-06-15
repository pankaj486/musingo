import React from 'react'
import './BookingGroupSelectMapMarker.scss'

const BookingGroupSelectMapMarker = props => {
  
  return (
    <div className={`booking-location__map-marker ${props.selected ? 'booking-location__map-marker--selected' : ''}`}>
      <span className="booking-location__map-marker-option"><div className="" style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            //   border: "1px solid #bcbcbc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            transform: props.hover ? 'scale(1.2)' : ''
                        }}
                        >
                            <img className="" style={{
                                width: "32px",
                                height: "auto"
                            }} src={props.marker} alt="location" />
                        </div></span>
    </div>
  )
}

export default BookingGroupSelectMapMarker

