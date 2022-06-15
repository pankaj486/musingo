import React from 'react'

import BookingMobileInput from './BookingMobileInput'

import './BookingAddress.scss'

const BookingAddress = ({
  firstName,
  lastName,
  street, streetNumber,
  postcode,
  city,
  phoneNumber,
  updateAddress,
  updatePhoneNumber,
  setProgress
}) => {
  return (
    <div className="booking-address">
      <p className="pt-sm-4 font-weight-bold booking-address__title font-20">Deine Anschrift</p>
      <p className="booking-address__description">Dies ist für die Buchung erforderlich. Wir behandeln deine Daten
        vertraulich. <b>Mehr dazu</b></p>
      <div className="booking-address__form-container">
        <div className="booking-address__form-row">
          <input
            className="booking-address__form-input booking-address__first-name"
            type="text"
            placeholder="Vorname"
            value={firstName}
            onChange={(event) => updateAddress('firstName', event.target.value)}
          />
          <input
            className="booking-address__form-input booking-address__last-name"
            type="text"
            placeholder="Nachname"
            value={lastName}
            onChange={(event) => updateAddress('lastName', event.target.value)}
          />
        </div>
        <div className="booking-address__form-row">
          <input
            className="booking-address__form-input booking-address__street2"
            type="text"
            placeholder="Email"
            // value={street}
            // onChange={(event) => updateAddress('Email', event.target.value)}
          />
        </div>
        <div className="booking-address__form-row">
          <input
            className="booking-address__form-input booking-address__street"
            type="text"
            placeholder="Straße"
            value={street}
            onChange={(event) => updateAddress('street', event.target.value)}
          />
          <input
            className="booking-address__form-input booking-address__street-no"
            type="text"
            placeholder="Nr."
            value={streetNumber}
            onChange={(event) => updateAddress('streetNumber', event.target.value)}
          />
        </div>
        <div className="booking-address__form-row">
          <input
            className="booking-address__form-input booking-address__postcode"
            type="text"
            placeholder="PLZ"
            value={postcode}
            onChange={(event) => updateAddress('postcode', event.target.value)}
          />
          <input
            className="booking-address__form-input booking-address__city"
            type="text"
            placeholder="Stadt"
            value={city}
            onChange={(event) => updateAddress('city', event.target.value)}
          />
        </div>
      </div>
      <div className="booking-address__mobile-form">
        <p className="pt-sm-4 font-weight-bold booking-address__title">Mobilnummer</p>
        <p className="booking-address__description">Diese ist für die Abstimmung vor Ort hilfreich (Optional)</p>
        <div className="booking-address__form-row">
          <BookingMobileInput
            phoneNumber={phoneNumber}
            defaultCountry={"DE"}
            updatePhoneNumber={updatePhoneNumber}
          />
        </div>
      </div>
      <div className="booking-cta-container" style={{ textAlign: 'center' }}>
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