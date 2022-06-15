import React from 'react'

import BookingOtp from '../../bookingOtp/bookingOtp'

import './BookingMobileVerification.scss'

const BookingAddress = ({ phoneNumber, updatePhoneNumber, setProgress }) => {
  return (
    <div className="booking-mobile-verification">
      <p className="pt-sm-4 font-weight-bold booking-mobile-verification__title font-20">Du hast eine SMS erhalten</p>
      <p className="booking-mobile-verification__description">Verifiziere jetzt deinen Code, um die Buchung abzuschließen.</p>
      <BookingOtp />
      <div className="booking-cta-container">
        <button
          style={{ width: '14rem' }}
          className="booking-weiter-cta btn btn-primary text-light py-2 booking-weiter-cta"
          onClick={setProgress}>Weiter
        </button>
      </div>
    </div>
  )
}

export default BookingAddress