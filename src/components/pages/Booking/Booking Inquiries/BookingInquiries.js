import React, { useState, Fragment } from 'react'
import { Switch, Route, useLocation, } from "react-router-dom";

import BookingRequests from '../BookingRequests/BookingRequests'
import BookingDetails from './Booking Details/BookingDetails'
import AboutTheExperience from '../AboutTheExperience/AboutTheExperience'
import CancelBookingRequest from '../CancelBookingRequest/CancelBookingRequest'

import './BookingInquiries.css'


const BookingInquiries = props => {
  let location = useLocation()
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
  let [requestDetails, setRequestDetails] = useState([
    {
      id: 1,
      requestId: 1,
      name: 'Felix',
      rating: 4,
      startedAt: '12.03.2010',
      merit: '95€',
      regularity: 'Wöchentlic',
      subscription: '7 Monate',
      comments: 'Hi Dimi, würde mich freuen, in deiner\n' +
        'Experience. mitzumachen.. mitzumachen.\n' +
        'mitzumachen. mitzumachen..'
    },
    {
      id: 2,
      requestId: 2,
      name: 'Felix',
      rating: 3,
      startedAt: '12.03.2011',
      merit: '75€',
      regularity: 'Wöchentlic',
      subscription: '6 Monate',
      comments: 'Hi Dimi, würde mich freuen, in deiner\n' +
        'Experience. mitzumachen.. mitzumachen.\n' +
        'mitzumachen. mitzumachen..'
    },
    {
      id: 3,
      requestId: 3,
      name: 'Felix',
      rating: 4.5,
      startedAt: '12.03.2012',
      merit: '65€',
      regularity: 'Wöchentlic',
      subscription: '3 Monate',
      comments: 'Hi Dimi, würde mich freuen, in deiner\n' +
        'Experience. mitzumachen.. mitzumachen.\n' +
        'mitzumachen. mitzumachen..'
    },
    {
      id: 4,
      requestId: 4,
      name: 'Felix',
      rating: 2,
      startedAt: '12.03.2013',
      merit: '105€',
      regularity: 'Wöchentlic',
      subscription: '12 Monate',
      comments: 'Hi Dimi, würde mich freuen, in deiner\n' +
        'Experience. mitzumachen.. mitzumachen.\n' +
        'mitzumachen. mitzumachen..'
    }
  ])
  let [requestId, setRequestId] = useState(requests[0].id)
  // let [cancelRequest, setCancelRequest] = useState(false)
  // const handleCancelRequest = () => {
  //   setCancelRequest(true)
  // }
  const handleDeleteRequest = (id) => {
    console.log('delete')
  }
  const handleClick = (id) => {
    setRequestId(id)
  }
  return (
    <div className="booking-inquiries-wrapper">
      <h1 className={`inquiries-title ${location.pathname !== '/bookingInquiries' && 'hide'}`} >Buchungsanfragen</h1>
      <div className="booking-inquiries-container">
        <Switch>
          <Route path="/bookingInquiries">
              <div className="booking-inquiries__requests">
                <BookingRequests
                  handleClick={handleClick}
                  requests={[...requests]}
                  selected={requestId}/>
              </div>
              <div className="booking-inquiries__request-details">
                <BookingDetails
                  requestId={requestId}
                  // handleDeclineBookingRequest={handleDeclineBookingRequest}
                  clickedRequestDetails={{ ...requestDetails.find(request => request.id === requestId) }}
                  // cancelRequest={cancelRequest}
                  // handleCancelRequest={handleCancelRequest}
                />
              </div>
          </Route>
          <Route path="/cancelBookingRequest">
            <div className="booking-inquiries-cancel-request">
              <CancelBookingRequest requestId={requestId} handleDeleteRequest={() => handleDeleteRequest(requestId)} />
            </div>
          </Route>
        </Switch>
        <div className="booking-inquiries__experience">
          <AboutTheExperience/>
        </div>
      </div>

    </div>
  )
}

export default BookingInquiries