import React, { Fragment, useEffect, useState } from 'react'
import Swiper from 'swiper';
import { GoPlus } from "react-icons/go";

import useWindowResize from '../../../custom-hooks/useWindowResize'

import MasterCard from './../../../assets/images/masterCard.png';
import SepaPayment from './../../../assets/images/sepa-payment.png';
import ApplePay from './../../../assets/images/apple-pay.png';
import Maestro from './../../../assets/images/maestro.png';
import Visa from './../../../assets/images/visa-payment.png';
import Klarna from './../../../assets/images/klarna-payment.png';
import Sofort from './../../../assets/images/sofort-payment.png';
import SummaryIcon from '../../../assets/images/summary-icon.png'
import LockIcon from '../../../assets/images/booking-summary-lock-icon.png'
import PlusIcon from '../../../assets/images/booking-plus-icon.png'

import { service } from 'src/services/AuthService/authService';
import { useSelector } from 'react-redux';

import './BookingSummary.scss'

const BookingSummary = (props) => {

  const [booking, setBooking] = useState([]);

  const subscriptionData = useSelector((state) => state.allapp.subscription_type)

  const paymentMethodData = useSelector((state) => state.allapp.payment_method[0].id)

  const bookingData = useSelector((state) => state.allapp.time_slot_bookings);

  const selectedLocationId = useSelector((state) => state.allapp.location_coordinates);
  console.log("bookingDATA", bookingData);

  const formatingBookingData = () => {
    const newArray = []
    bookingData.map((booking) => {
      console.log("bookingTimePeriod", booking);
      newArray.push({
        time_slot: booking.uid,
        period: booking.period === 1 || '' ? 2 : booking.period,
        start_date: booking.start_date
      })
      // console.log("newArray", newArray);
      setBooking(newArray);
    })  
  }


  useEffect(() => {
    formatingBookingData();
  }, [])

  // console.log("bookingData", booking)

  const { dimensions } = useWindowResize();
  let width = dimensions.width;
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      imageSrc: MasterCard,
      selected: true
    },
    {
      id: 2,
      imageSrc: SepaPayment,
      selected: false
    },
    {
      id: 3,
      imageSrc: '',
      selected: false
    }
  ])
  const [mySwiper, setMySwiper] = useState(null);



  async function BookinDataSubmit() {
    const body = {
      location: selectedLocationId,
      payment_method: paymentMethodData,
      subscription_type: subscriptionData,
      time_slot_bookings: booking
    }
    service.postBookingSummary(body).then((res) => {
      console.log("res", res);
    })
  }


  useEffect(() => {
    setMySwiper(new Swiper('.booking-summary__options-container', {
      breakpoints: {
        300: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3,
        },
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
  }, [])
  const handlePaymentMethodSelect = (id) => {
    if (!paymentMethods.find(paymentMethod => paymentMethod.id === id).imageSrc) {
      return;
    }
    let tempMethods = [...paymentMethods]
    let prevIndex = tempMethods.findIndex(place => place.selected)
    if (prevIndex !== -1) {
      tempMethods[prevIndex].selected = false
    }
    tempMethods.find(place => place.id === id).selected = true
    setPaymentMethods(tempMethods)
  }
  return (
    <div className="booking-summary">
      <p className="pt-sm-4 font-weight-bold booking-summary__title font-20" style={{ position: 'relative', top: '-7px' }}>Deine Zahlungsmethode</p>
      {/*<p className="booking-summary__description">Wähle eine bestehende Zahlungsmethode oder füge eine neue hinzu, um deine Buchung abzuschließen.</p>*/}
      <div className="booking-summary__options-wrapper">
        <div className="booking-summary__options-container swiper-container slider-2" id="swiper">
          <div className="booking-summary__options swiper-wrapper">
            {
              paymentMethods.map((paymentMethod, index) => {
                return (
                  <div
                    className={`swiper-slide booking-summary__option-container`}
                    key={paymentMethod.id}
                  >
                    <div
                      className={`booking-summary__option ${paymentMethod.selected ? 'booking-summary--selected' : ''}`}
                      style={{ backgroundColor: !paymentMethod.imageSrc ? '#fff' : '#fff' }}
                      onClick={() => handlePaymentMethodSelect(paymentMethod.id)}
                    >
                      {
                        paymentMethod.id === 3 ? (
                          <span style={{
                            color: '#bcbcbc',
                            fontSize: '34px',
                            lineHeight: '1',
                          }}>+</span>
                        ) : (
                          <>
                            <img src={paymentMethod.imageSrc} alt="payment-option" />
                            <span className="booking-summary__option-info">Xxxxx425</span>
                          </>
                        )}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div className="booking-summary__other-payment-methods-container">
        <div className="booking-summary__other-payment-methods">
          <img src={SepaPayment} alt="other-payment-method" className="booking-summary__other-payment-method" />
          <img src={ApplePay} alt="other-payment-method" className="booking-summary__other-payment-method" />
          <img src={Maestro} alt="other-payment-method" className="booking-summary__other-payment-method" />
          <img src={Visa} alt="other-payment-method" className="booking-summary__other-payment-method" />
          <img src={Klarna} alt="other-payment-method" className="booking-summary__other-payment-method klarna" />
          <img src={Sofort} alt="other-payment-method" className="booking-summary__other-payment-method sofort" />
        </div>
      </div>
      <div className="booking-summary__cancellation-policy-wrapper">
        <p className="font-weight-bold booking-summary__title">Stornierungsbedingungen</p>
        <div className="booking-summary__cancellation-policy">
          <p className="booking-summary__description">
            Du kannst zum Ende eines Monats kündigen. Falls dir der Unterricht nicht
            gefällt, findest du gern jederzeit wieder eine neue Experience.
          </p>
        </div>
      </div>
      <div className="booking-summary__info">
        <div className="booking-summary__info-icon-container">
          <img src={SummaryIcon} alt="summary info icon" />
        </div>
        <div>
          <p className="booking-summary__info-description">Deine Buchung gilt erst als aktiv, wenn NAME deine Anfrage
            <strong>(innerhalb von 48 Stunden) angenommen hat.</strong> Bis dahin wird dir nichts berechnet. </p>
        </div>
      </div>
      <div className="booking-cta-container">
        <button className="booking-weiter-cta btn btn-primary text-light py-2 booking-weiter-cta"
          onClick={() => BookinDataSubmit()}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '54px'
          }}>
          <img src={LockIcon} alt="lock" style={{
            width: '20px',
            height: 'auto',
            marginRight: '12px'
          }} />
          <span>Buchung anfragen</span>
        </button>
      </div>
    </div>
  )
}

export default BookingSummary
