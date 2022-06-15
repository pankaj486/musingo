import React, { useRef, useState, Fragment } from 'react';
import './bookingOtp.scss';

const BookingOtp = () => {
  const refArray = Array(7).map(place => {
    return React.createRef()
  });
  
  const inputRef = useRef(refArray);
  const [otpInput, setOtpInput] = useState(Array(6).fill(''));
  
  const handleKeyUp = (e, i) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      otpInput[i] = e.target.value;
      setOtpInput([...otpInput]);
      if (i < otpInput.length - 1) {
        inputRef.current[i + 1].focus();
      }
    }
  }
  
  return (
    <div className="booking-mobile-verification__mobile-form">
      <div className="booking-mobile-verification__form-row">
        <div className="booking-mobile-verification__input-container">
        {
          otpInput.map(
            (item, index) => {
              return <Fragment key={index}>
                <textarea
                  className="booking-mobile-verification__input"
                  type="text"
                  value={otpInput[index]} ref={(ref) => inputRef.current[index] = ref}
                  maxLength="1"
                  placeholder="" aria-label="zip" aria-describedby="basic-zip"
                  style={{resize: 'none'}}
                  onChange={(e) => handleKeyUp(e, index)}>
                </textarea>
                {index === 2 &&
                <div className="px-2 d-flex justify-content-center align-items-center text-primary booking-mobile-verification__input--separator" style={{ fontWeight: 'bold' }}>-</div>}
              </Fragment>
            })
        }
        </div>
        <p className="booking-mobile-verification__description" style={{
          textAlign: 'center',
          margin: '32px 0'
        }}><b>SMS erneut senden</b></p>
      </div>
    </div>
  )
}

export default BookingOtp;