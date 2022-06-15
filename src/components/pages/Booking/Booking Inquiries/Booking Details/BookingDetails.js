import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';

import Instructor from './../../../../../assets/images/instructor.png'
import useWindowResize from '../../../../../custom-hooks/useWindowResize';
import './BookingDetails.css'

const BookingDetails = props => {
  const { dimensions } = useWindowResize();
  const width = dimensions.width;
  const handleDeclineBookingRequest = () => {
    // <Redirect to={{
    //   pathname: '/cancelBookingRequest',
    //   state: { id: props.clickedRequestDetails.id }
    // }}
    // />
  }
  return (
    <Fragment>
      <div className="booking-details__header">
        <img src={Instructor} alt="instructor-image"/>
        <div className="booking-details__header-details">
          <span className="booking-details__header-name">{props.clickedRequestDetails.name}</span>
          <StarRatings
            rating={props.clickedRequestDetails.rating}
            starRatedColor="orange"
            numberOfStars={5}
            name='rating'
            isSelectable={false}
            starDimension={width > 1150 ? '22px' : '16px'}
            starSpacing="2px"
          />
          <span className="booking-details__header-member-since">Mitglied seit 2012</span>
        </div>
      </div>
      <div className="booking-details__content">
        <div className="booking-details__content-top">
          <div className="booking-details__content-left">
            <div className="content-left__started-at">
              <p className="content-left__started-at-date value">{props.clickedRequestDetails.startedAt}</p>
              <p className="content-left__started-at-label label">Starttermin</p>
            </div>
            <div className="content-left__weekly">
              <p className="content-left__weekly-hour value">{props.clickedRequestDetails.regularity}</p>
              <p className="value">h</p>
              <p className="content-left__weekly-hour-label label">Regelmäßigkeit</p>
            </div>
          </div>
          <div className="booking-details__content-right">
            <div className="content-left__merit">
              <p className="content-left__merit-amount value">{props.clickedRequestDetails.merit}</p>
              <p className="content-left__merit-label label">Verdienst</p>
            </div>
            <div className="content-left__subscription">
              <p className="content-left__subscription-duration value">{props.clickedRequestDetails.subscription}</p>
              <p className="content-left__weekly-hour-label label">Abonnement</p>
            </div>
          </div>
        </div>
        <div className="booking-details__content-bottom">
          <p className="booking-details__comments">{props.clickedRequestDetails.comments}</p>
        </div>
      </div>
      <button className="booking-accept-cta">Annehmen</button>
      <Link
        to={{
          pathname: "/cancelBookingRequest",
          state: { fromBooking: true }
        }}
      >
        <span className="booking-cancel-cta" >Ablehnen</span>
      </Link>
    </Fragment>
  )
}

export default BookingDetails