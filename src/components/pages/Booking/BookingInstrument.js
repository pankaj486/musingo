import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper';

import CloseModal from '../../../assets/images/cancel-icon.png'

import './BookingInstrument.scss'
import Package from '../../package/Package'
import Background from '../../../assets/images/experience-bg.png'
import Model from '../../../assets/images/model.png'

const BookingInstrument = (props) => {
  const [places, setPlaces] = useState([
    {
      id: 1,
      lat: 59.955413,
      lng: 30.5,
      isActive: false,
      type: 'Unterricht',
    },
    {
      id: 2,
      lat: 59.955413,
      lng: 30.2,
      isActive: false,
      type: 'Unterricht'
    },
    {
      id: 3,
      lat: 59.955413,
      lng: 30.5,
      isActive: false,
      type: 'Instrumente'
    },
    {
      id: 4,
      lat: 59.955413,
      lng: 30.22,
      isActive: false,
      type: 'Instrumente'
    },
    {
      id: 5,
      lat: 60,
      lng: 30.20,
      isActive: false,
      type: 'Konzerte'
    },
    {
      id: 6,
      lat: 59.955413,
      lng: 30.21,
      isActive: false,
      type: 'Jobs'
    },
    // {
    //   id: 7,
    //   lat: 59.955413,
    //   lng: 30.25,
    //   isActive: false,
    //   home: true,
    //   type: 'Jobs'
    // }
  ])
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [mySwiper, setMySwiper] = useState(null);
  useEffect(() => {
    setMySwiper(new Swiper('.booking-instrument__options-container', {
      breakpoints: {
        300: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 2.6,
        },
        1200: {
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
  }, [])
  let refArray = [];
  refArray = places.map(place => {
    return React.createRef()
  });
  const myRef = useRef(refArray);
  const [transactionType, setTransactionType] = useState('Leihen')
  const handleInstrumentTransactionType = () => {
    if (transactionType === 'Leihen') {
      setTransactionType('Kaufen')
    } else {
      setTransactionType('Leihen')
    }
  }
  useEffect(() => {
    console.log('useEffect: ', selectedPackage)
    if (selectedPackage !== null) {
      props.handleInstrumentSelect(true)
    }
  }, [selectedPackage])
  useEffect(() => {
    props.handleInstrumentTransactionType(transactionType)
  }, [transactionType])
  return (
    <div className={`booking-instrument ${props.showViewListing ? 'booking-instrument--show-view-listing' : ''}`}>
      <p className="pt-sm-4 font-weight-bold booking-instrument__title font-20">Instrument dazu?</p>
      <p className="booking-instrument__description">Noch kein Instrument? Leihe oder kaufe dir einfach eins zum
        start!</p>
      <div className="booking-instrument__option-select">
        <div
          className={`${transactionType === 'Leihen' ? 'booking-instrument__option-active' : ''} booking-instrument__option--lend`}
          onClick={handleInstrumentTransactionType}><span>Leihen</span></div>
        <div
          className={`${transactionType === 'Kaufen' ? 'booking-instrument__option-active' : ''} booking-instrument__option--buy`}
          onClick={handleInstrumentTransactionType}><span>Kaufen</span></div>
      </div>
      <div className="booking-instrument__options-wrapper booking-instrument-options--desktop">
        <div className="booking-instrument__options-container swiper-container slider-2" id="swiper">
          <div className="booking-instrument__options swiper-wrapper">
            {
              places.map((item, index) => (
                <div key={index} className={`swiper-slide bookingPackageTrainerExperience userProfileSlider`}
                  onClick={() => {
                    (index === selectedPackage) ? setSelectedPackage(null) : setSelectedPackage(index)
                  }}>
                  <div className={`swiper-slide swiperSlideItem ${index === selectedPackage ? 'activePackage' : ''}`}>
                    <Package
                      className={`swiper-slide`}
                      // key={item.id}
                      backgroundImage={Background}
                      modelImage={Model}
                      title="Learn Djambe traditionally"
                      price="15"
                      ref={myRef.current[index]}
                      // parent={'profile'}
                      groupType={index === 2 ? 'single' : 'single'}
                      // filterState={true}
                      type={'Instrumente'}
                    />
                  </div>
                  <Link to="/viewListing" className="booking-instrument__look-at font-16" target="_blank">Ansehen</Link>
                </div>
              ))
            }
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div className="booking-instrument__options--mobile">
        {
          places.map((item, index) => (
            <div key={index} className={`swiper-slide booking-instrument__option--mobile userProfileSlider"`}
              onClick={() => {
                (index === selectedPackage) ? setSelectedPackage(null) : setSelectedPackage(index)
              }}>
              <div className={`booking-instrument__package-container ${index === selectedPackage ? 'activePackage' : ''}`}>
                <Package
                  className={`swiper-slide`}
                  // key={item.id}
                  backgroundImage={Background}
                  modelImage={Model}
                  title="Learn Djambe traditionally"
                  price="15"
                  ref={myRef.current[index]}
                  // parent={'profile'}
                  groupType={index === 2 ? 'single' : 'group'}
                  booking={true}
                  type={'Instrumente'}

                />
              </div>
              <Link to="/viewListing" className="booking-instrument__look-at" target="_blank">Ansehen</Link>
            </div>
          ))
        }
      </div>
      <div className="booking-cta-container">
        <button
          className='btn btn-primary text-light py-2 booking-weiter-cta'
          style={{ width: '14rem' }} onClick={props.setProgress}>
          {
            selectedPackage ? 'Mit Instrument weiter' : 'Ohne Instrument weiter'
          }
        </button>
      </div>
    </div>
  )
}

export default BookingInstrument
