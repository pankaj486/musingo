import React, { Fragment, useState } from 'react'
import Backdrop from '../../Backdrop/Backdrop'
import BookingRequests from '../../pages/Booking/BookingRequests/BookingRequests'

import './BookingRequestsList.css'

const BookingRequestsList = props => {
  let [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Felix',
      price: '152€',
      expiresIn: '2:15 h',
      title: 'Learn Flamenco',
      group: 'C'
    },
    {
      id: 2,
      name: 'Felix',
      price: '152€',
      expiresIn: '2:15 h',
      title: 'Learn Flamenco',
      group: 'C'
    },
    {
      id: 3,
      name: 'Felix',
      price: '152€',
      expiresIn: '2:15 h',
      title: 'Learn Flamenco',
      group: 'C'
    },
    {
      id: 4,
      name: 'Felix',
      price: '152€',
      expiresIn: '2:15 h',
      title: 'Learn Flamenco',
      group: 'C'
    }
  ])
  let [showModal, setModalVisibility] = useState(true)
  
  const handleModalVisibility = () => {
    setModalVisibility(!showModal)
  }
  let modalContents = (
    <div className="booking-requests__modal">
      <span className="booking-requests__close-modal" onClick={handleModalVisibility}>X</span>
      <h3 className="booking-requests__heading">Neue Buchungsanfragen</h3>
      <p className="booking-requests__count">Du hast <span>{requests.length} neue Buchungsanfragen</span></p>
      <BookingRequests requests={[...requests]} />
      <button className="booking-requests__watch-now">Jetzt ansehen</button>
    </div>
  )
  return (
    <Fragment>
      <Backdrop
        showModal={showModal}
        hideModal={handleModalVisibility}
      />
      {showModal && modalContents}
    </Fragment>
  )
}

export default BookingRequestsList