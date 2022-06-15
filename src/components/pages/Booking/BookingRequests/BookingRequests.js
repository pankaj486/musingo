import React, { useState } from 'react'
import BookingRequest from './bookingRequest/bookingRequest'
import './BookingRequests.css'

const BookingRequests = props => {
  console.log('props: ', props.history)
  return (
    <div className="requests show-all">
      { props.requests.map(request =>
        <BookingRequest
          selected={props.selected}
          handleClick={() => props.handleClick(request.id)}
          key={request.id}
          {...request} />)
      }
    </div>
  )
}

export default BookingRequests