import React, { useEffect, useState } from 'react'
import Swiper from 'swiper';

import BookingSubscriptionOption from './BookingSubscriptionOption'
import SubscriptionInfoIcon from '../../../assets/images/subscription-info-icon.png'

import './BookingSubscription.scss'
import { useSelector } from 'react-redux';

const BookingSubscription = (props) => {

  const newData = useSelector((state) => state.allapp.experience);
  // console.log("newData", newData);
  // console.log("newData", newData.subscription_types);

  const [subscriptions, setSubscriptions] = useState([])

  const setsub = () => {
    setSubscriptions(newData);
  }
  // console.log("newData", newData);

  const [mySwiper, setMySwiper] = useState(null);
  useEffect(() => {
    setMySwiper(new Swiper('.booking-subscription__options-container', {
      breakpoints: {
        300: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 3,
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }));
    setsub()
  }, [])
  const handleSubscriptionSelect = (id) => {
    let tempSubscriptions = [...subscriptions]
    let prevIndex = tempSubscriptions.findIndex(subscription => subscription.selected)
    if (prevIndex !== -1) {
      tempSubscriptions[prevIndex].selected = false
      if (id !== tempSubscriptions[prevIndex].id) {
        tempSubscriptions.find(subscription => subscription.id === id).selected = true
        props.handleBookingDiscount(tempSubscriptions.find(subscription => subscription.id === id).discount)
      } else {
        props.handleBookingDiscount(null)
      }
    } else {
      tempSubscriptions.find(subscription => subscription.id === id).selected = true
      props.handleBookingDiscount(tempSubscriptions.find(subscription => subscription.id === id).discount)
    }
    // console.log("tempSubscriptions", tempSubscriptions)
    setSubscriptions(tempSubscriptions)
  }
  return (
    <div className="booking-subscription">
      <p className="pt-sm-4 font-weight-bold booking-subscription__title font-20">Du bist dir sicher?</p>
      <p className="booking-subscription__description">Du kannst deinen Preis verringern, indem du ein Abo wählst (optional). <br /> Dadurch sparst du bis zu 108€!</p>
      <p className="booking-subscription__description booking-subscription__description--bold">Ohne Abo würdest du 32€ pro Einheit zahlen.</p>
      <div className="booking-subscription__options-wrapper">
        <div className="booking-subscription__options-container swiper-container slider-2" id="swiper">
          <div className="booking-subscription__options swiper-wrapper">
            {
              subscriptions.map(subscription => {
                // console.log("subscription",subscription);
                return (
                  <BookingSubscriptionOption
                    key={subscription.id}
                    {...subscription}
                    handleSubscriptionSelect={() => handleSubscriptionSelect(subscription.id)}
                    handleBookingDiscount={props.handleBookingDiscount}
                  />
                )
              })
            }
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div className="booking-subscription__info">
        <div className="booking-subscription__info-icon-container">
          <img src={SubscriptionInfoIcon} alt="subscription info icon" />
        </div>
        <div>
          <p className="booking-subscription__info-title">So funktioniert’s</p>
          <p className="booking-subscription__info-description">Wenn du en Abo wählst (optional) zahlst du den Anteil der Service Gebühr für die
            Monate des Abo- Zeitraums einmalig. Danach zahlst du deine monatliche Rate zum
            rabattierten Preis.
          </p>
        </div>
      </div>
      <div className="booking-cta-container">
        <button
          className='btn btn-primary text-light py-2 booking-weiter-cta'
          style={{ width: '14rem' }} onClick={props.setProgress}>
          {
            subscriptions.some(subscription => subscription.selected) ? 'Mit Abo fortfahren' : 'Ohne Abo fortfahren'
          }
        </button>
      </div>
    </div>
  )
}

export default BookingSubscription
