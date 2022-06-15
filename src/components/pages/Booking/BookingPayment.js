import React, { Fragment, useEffect, useState } from 'react'
import Swiper from 'swiper';
import useWindowResize from '../../../custom-hooks/useWindowResize'

import LockIcon from './../../../assets/images/lock-icon.png'
import MasterCard from './../../../assets/images/masterCard.png';
// import SepaPayment from './../../../assets/images/sepa-payment.png.png';
import SepaPayment from './../../../assets/images/sepa-payment.png';
import ApplePay from './../../../assets/images/apple-pay.png';
import Maestro from './../../../assets/images/maestro.png';
import Visa from './../../../assets/images/visa-payment.png';
import Sofort from './../../../assets/images/sofort-payment.png';
import Plus from '../../../assets/images/whitePlus.png'
import { service } from 'src/services/AuthService/authService';
import { useActions } from 'src/hooks/use-actions';
import './BookingPayment.scss'

const BookingPayment = (props) => {

  const {paymentMethodAction} = useActions();
  const { dimensions } = useWindowResize();
  let width = dimensions.width;
  const [paymentMethods, setPaymentMethods] = useState([])
  const [mySwiper, setMySwiper] = useState(null);

  useEffect(() => {
    service.getPaymentMethod().then((response) => {
      response.data.results.map((type)=>{
        const newdata = 
          {
            imageSrc: MasterCard,
            selected: false,
            id:type.id
          }
        setPaymentMethods(paymentMethods =>[...paymentMethods , newdata]);
      }) 
    });  
  }, [])
  paymentMethodAction(paymentMethods);
  
  useEffect(() => {
    setMySwiper(new Swiper('.booking-payment__options-container', {
      breakpoints: {
        300: {
          slidesPerView: 2.2,
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
  const [terms, setTerms] = useState(false)
  const handleTermsChange = () => {
    setTerms(prevTerms => !prevTerms)
  }
  return (
    <div className="booking-payment">
      <p className="pt-sm-4 font-weight-bold booking-payment__title font-20">Wähle eine <br />Zahlungsmethode</p>
      <p className="booking-payment__description">Wähle eine bestehende Zahlungsmethode oder füge eine neue hinzu, um deine Buchung abzuschließen.</p>
      <div className="booking-payment__options-wrapper">
        <div className="booking-payment__safe-payment-and-nav-container">
          <div className="booking-payment__safe-payment">
            <div className="booking-payment__safe-payment-img-container">
              <img src={LockIcon} alt="safe payment" />
            </div>
            <div className="booking-payment__safe-payment-content">
              <span>Sichere </span><span>Zahlung</span>
            </div>
          </div>
          <div className="booking-payment__options-navigation">
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
        <div className="booking-payment__options-container swiper-container slider-2" id="swiper">
          <div className="booking-payment__options swiper-wrapper">
            {
              paymentMethods.map((paymentMethod, index) => {
                return (
                  <div
                    className={`swiper-slide booking-payment__option-container`}
                    key={paymentMethod.id}
                  >
                    <div
                      className={`booking-payment__option ${paymentMethod.selected ? 'booking-payment--selected' : ''}`}
                      style={{ backgroundColor: !paymentMethod.imageSrc ? '#f2f2f2' : '#fff' }}
                      onClick={() => handlePaymentMethodSelect(paymentMethod.id)}
                    >
                      {paymentMethod.id === 1 ? (
                        <img src={Plus} alt="plus" width="50px" />
                      ) : 
                      // <>
                      //   <img src={MasterCard} alt="payment-option" />
                      //   <span className="booking-payment__option-info">Xxxxx425</span>
                      // </>
                        (
                            paymentMethod.imageSrc ? (
                              <>
                                <img src={paymentMethod.imageSrc} alt="payment-option" />
                                <span className="booking-payment__option-info">Xxxxx425</span>
                              </>
                            ) : (
                                <div className="booking-payment__option--empty"> </div>
                              )
                          )
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="booking-payment__other-payment-methods-container">
        <p className="booking-payment__payment-methods-title">Unsere Zahlungsmethoden</p>
        <div className="booking-payment__other-payment-methods">
          <img src={SepaPayment} alt="other-payment-method" className="booking-payment__other-payment-method" />
          <img src={ApplePay} alt="other-payment-method" className="booking-payment__other-payment-method" />
          <img src={Maestro} alt="other-payment-method" className="booking-payment__other-payment-method" />
          <img src={Visa} alt="other-payment-method" className="booking-payment__other-payment-method" />
          <img src={Sofort} alt="other-payment-method" className="booking-payment__other-payment-method" />
        </div>
      </div>
      {
        width < 1024 ? (
          <Fragment>
            <div className="booking-payment__terms-and-conditions custom-control custom-checkbox py-2">
              <input type="checkbox" className="custom-control-input" id="booking-payment__terms-and-condition"
                name="terms-and-conditions" checked={terms} onChange={handleTermsChange} />
              <label htmlFor="booking-payment__terms-and-condition" className="custom-control-label">Ich akzeptiere
                die <strong>allgemeinen <br />Geschäftsbedingungen</strong> und <strong>Datenschutz
                  Bestimmungen</strong></label>
            </div>
            <div className="booking-cta-container">
              <button className={`booking-weiter-cta btn btn-primary text-light py-2 booking-weiter-cta ${(!paymentMethods.some(paymentMethod => paymentMethod.selected) || !terms) ? 'booking-payment--inactive-cta' : ''}`} style={{ width: '14rem' }} onClick={paymentMethods.some(paymentMethod => paymentMethod.selected) ? props.setProgress : () => { }}>Buchung anfragen</button>
            </div>
          </Fragment>
        ) : (
          <div className="booking-cta-container">
            <button className={`booking-weiter-cta btn btn-primary text-light py-2 booking-weiter-cta ${!paymentMethods.some(paymentMethod => paymentMethod.selected) ? 'booking-payment--inactive-cta' : ''}`} style={{ width: '14rem' }} onClick={paymentMethods.some(paymentMethod => paymentMethod.selected) ? props.setProgress : () => { }}>Buchung anfragen</button>
          </div>
        )
      }
    </div>
  )
}

export default BookingPayment