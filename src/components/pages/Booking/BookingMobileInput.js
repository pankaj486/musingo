import React from 'react'
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css';
import './BookingMobileInput.scss'

const BookingMobileInput = ({phoneNumber, defaultCountry, updatePhoneNumber}) => {
  return (
    <div className="booking__phone-input-container">
      <PhoneInput
        placeholder=""
        international
        value={phoneNumber}
        defaultCountry={defaultCountry}
        onChange={updatePhoneNumber}
      />
    </div>
  )
}

export default BookingMobileInput