import React, { useEffect } from 'react'
import './BookingSubscriptionOption.scss'
import { useActions } from 'src/hooks/use-actions'

const BookingSubscriptionOption = ({ uid, type, discount, payment, price, handleSubscriptionSelect, selected, popular }) => {
  
  const {subscription} = useActions();

  const handleClick = () => {
    handleSubscriptionSelect();
    subscription(uid);
  }

 

  return (
    <div className="booking-subscription__option-container swiper-slide pl-md-0">
      <p className="booking-subscription__type">{type}</p>
      <div
        className={`booking-subscription__option ${selected ? 'booking-subscription--selected' : ''}`} onClick={() => handleClick()}>
        {
          popular && (
            <div className="booking-subscription--popular"><span>Beliebt</span></div>
          )
        }
        <div className="booking-subscription__option--top-content">
          <span className="booking-subscription__pricing">{price}</span>
          <span className="booking-subscription__pricing-unit">pro Einheit</span>
        </div>
        <div className="booking-subscription__option--bottom-content">
          <div className="booking-subscription__discount">
            <p className="booking-subscription__discount-value font-weight-bold px-1">{discount}% Rabatt</p>
          </div>
        </div>
        <p className="booking-subscription__one-time-payment">Einmalzahlung <br /> {payment}</p>
      </div>
    </div>
  )
}

export default BookingSubscriptionOption