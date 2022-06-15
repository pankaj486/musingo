import React, { Fragment, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Swiper from 'swiper';

import BookingGroupSelectMapMarker from './BookingGroupSelectMapMarker'
import BookingGroupSelectOption from './BookingGroupSelectOption'
import useWindowResize from '../../../custom-hooks/useWindowResize'

import Instructor from './../../../assets/images/instructor.png'

import './BookingGroupSelect.scss'

const BookingGroupSelect = (props) => {
  const { dimensions } = useWindowResize();
  let width = dimensions.width;
  const [places, setPlaces] = useState([
    {
      id: 1,
      lat: 59.955413,
      lng: 30.5,
      title: 'Mittwochs 12:00',
      address: 'Grindelallee 20, 20146 Hamburg',
      price: 25,
      isHome: true,
      imageSrc: Instructor,
      selected: false,
      marker: 'A',
      imageCount: 3,
    },
    {
      id: 2,
      lat: 59.955413,
      lng: 30.2,
      title: 'Dienstags 14:15',
      address: 'Langenfelder Damm 7, 20257 Hamburg',
      price: 30,
      isHome: false,
      imageSrc: Instructor,
      selected: false,
      marker: 'B',
      imageCount: 3,
    },
    {
      id: 3,
      lat: 59.955413,
      lng: 30.3,
      title: 'Dienstags 14:15',
      address: 'Langenfelder Damm 93, 20257 Hamburg',
      price: 20,
      isHome: false,
      imageSrc: Instructor,
      selected: false,
      marker: 'C',
      imageCount: 3,
    },
    {
      id: 4,
      lat: 59.955413,
      lng: 30.4,
      title: 'Dienstags 14:15',
      address: 'Langenfelder Damm 93, 20257 Hamburg',
      price: 22,
      isHome: false,
      imageSrc: Instructor,
      selected: false,
      marker: 'D',
      imageCount: 3,
    }
  ])
  const [zoomLevel] = useState(11)
  const [mySwiper, setMySwiper] = useState(null);
  useEffect(() => {
    setMySwiper(new Swiper('.booking-group-select__options-container', {
      breakpoints: {
        300: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 2.4,
        },
        1200: {
          slidesPerView: 3
        }
      },
      pagination: {
        clickable: true,
      },
      navigationShow: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }));
    console.log('bookingGroupSelect.js')
  }, [])
  const handleGroupSelect = (id) => {
    console.log('selected')
    let tempPlaces = [...places]
    let prevIndex = tempPlaces.findIndex(place => place.selected)
    if (prevIndex !== -1) {
      tempPlaces[prevIndex].selected = false
    }
    tempPlaces.find(place => place.id === id).selected = true
    setPlaces(tempPlaces)
    props.handleGroupPriceSelect(tempPlaces.find(place => place.id === id).price)
  }
  return (
    <div className="booking-group-select">
      <p className="pt-sm-4 font-weight-bold booking-group-select__title--desktop font-20">Wähle eine Gruppe</p>
      <p className="pt-sm-4 font-weight-bold booking-group-select__title--mobile font-20">Wähle deinen Gruppe</p>
      <p className="booking-group-select__description">Wähle einen Startermin aus. Dieser Termin wird auch dein genereller Termin nach deiner gewählten Termin-Regelmäßigkeit.</p>
      <div className="booking-group-select__map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4' }}
          center={places[places.length - 1]}
          defaultZoom={zoomLevel}
          options={{
            fullscreenControl: false, zoomControl: true
          }}
        >
          {
            places.map((place, index) => {
              return (
                <BookingGroupSelectMapMarker
                  width={width}
                  {...place}
                  key={place.id}
                />
              )
            })
          }
        </GoogleMapReact>
      </div>
      <div className="booking-group-select__options-wrapper">
        <div className="booking-group-select__options-container swiper-container slider-2" id="swiper">
            <div className="booking-group-select__options swiper-wrapper">
              {
                places.map(place => {
                  return (
                    <BookingGroupSelectOption
                      key={place.id}
                      {...place}
                      handleGroupSelect={() => handleGroupSelect(place.id)}
                    />
                  )
                })
              }
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div className="booking-cta-container">
        <button
          className={`btn btn-primary text-light py-2 booking-weiter-cta ${!places.some(place => place.selected) ? 'booking-group-select--inactive-cta' : ''}`}
          style={{ width: '14rem' }} onClick={places.some(place => place.selected) ? props.setProgress : () => {
        }}>Weiter
        </button>
      </div>
    </div>
  )
}

export default BookingGroupSelect
