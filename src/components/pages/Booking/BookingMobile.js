import React from 'react'

import BookingMobileInput from './BookingMobileInput'

import './BookingMobile.scss'

const BookingAddress = ({ phoneNumber, updatePhoneNumber, setProgress }) => {
  return (
    <div className="booking-mobile">
      <p className="pt-sm-4 font-weight-bold booking-mobile__title font-20">Verifizieren</p>
      <p className="booking-mobile__description">Gib deine Mobilnummer an. Wir senden dir eine SMS mit Bestätigungscode zu.</p>
      <div className="booking-mobile__mobile-form">
        <div className="booking-mobile__form-row">
          <BookingMobileInput
            phoneNumber={phoneNumber}
            defaultCountry={"DE"}
            updatePhoneNumber={updatePhoneNumber}
          />
        </div>
      </div>
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