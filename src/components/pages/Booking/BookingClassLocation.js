//   const [places, setPlaces] = useState([
//     // {
//     //   id: 1,
//     //   lat: 59.955413,
//     //   lng: 30.5,
//     //   isActive: false,
//     //   title: 'Unterricht zu Hause',
//     //   address: 'Grindelallee 20, 20146 Hamburg',
//     //   price: '5€/Monat',
//     //   info: 'Trainer unterrichtet bei dir zu Haus (auf Wunsch)',
//     //   isHome: true,
//     //   markerColor: '',
//     //   imageSrc: Cycling,
//     //   selected: false,
//     //   hover: false
//     // },
//     // {
//     //   id: 2,
//     //   lat: 59.955413,
//     //   lng: 30.45,
//     //   isActive: false,
//     //   title: 'Unterricht zu Hause',
//     //   address: 'Langenfelder Damm 7, 20257 Hamburg',
//     //   price: 'Free',
//     //   info: 'Trainer unterrichtet bei dir zu Haus (auf Wunsch)',
//     //   isHome: false,
//     //   markerColor: '#4ad9ca',
//     //   imageSrc: MapMarkerGreen,
//     //   selected: false,
//     //   hover: false
//     // },
//     // {
//     //   id: 3,
//     //   lat: 59.955413,
//     //   lng: 30.42,
//     //   isActive: false,
//     //   title: 'Im Proberaum',
//     //   address: 'Langenfelder Damm 93, 20257 Hamburg',
//     //   price: 'Free',
//     //   info: 'Unterricht findet im Proberaum statt',
//     //   isHome: false,
//     //   markerColor: '#fc5d68',
//     //   imageSrc: MapMarkerRed,
//     //   selected: false,
//     //   hover: false
//     // },
//     // {
//     //   id: 4,
//     //   lat: 59.955413,
//     //   lng: 30.6,
//     //   isActive: false,
//     //   title: 'Im Proberaum',
//     //   address: 'Langenfelder Damm 93, 20257 Hamburg',
//     //   price: 'Free',
//     //   info: 'Unterricht findet im Proberaum statt',
//     //   isHome: false,
//     //   markerColor: '#fc5d68',
//     //   imageSrc: MapMarkerRed,
//     //   selected: false,
//     //   hover: false
//     // },
//   ])


import React, { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import GoogleMapReact from 'google-map-react'
import Swiper from 'swiper';

import ListingMapMarkerComponent from '../Listing/mapMarker/ListingMapMarker'
import BookingLocationOption from './BookingLocationOption'
import useWindowResize from '../../../custom-hooks/useWindowResize'

import Cycling from './../../../assets/images/Cycling.png'
import MapMarkerGreen from './../../../assets/images/MapMarkerGreen.png'
import MapMarkerRed from './../../../assets/images/MapMarkerRed.png'
import './BookingClassLocation.scss'
import { experienceService } from 'src/services/api';
import { useActions } from "src/hooks/use-actions";

const BookingClassLocation = (props) => {

  const [singleExperience, setSingleExperience] = useState([]);
  const [singleLocation, setSingleLocation] = useState([]);
  const location = useLocation();

  const { dimensions } = useWindowResize();
  let width = dimensions.width;

  const [places, setPlaces] = useState([])

  const [zoomLevel] = useState(11)
  const [mySwiper, setMySwiper] = useState(null);
  const [coordinate, setCoordinate] = useState([]);

  const {locationCoordinates} = useActions();

  useEffect(() => {
    setMySwiper(new Swiper('.booking-location__options-container', {
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
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }));
  }, [])

  const getSingleExperience = async () => {
    const res = await experienceService.getSingle(location.state.uid);
    const newLocations = []
    const newArray = []
    res.locations.map((location) => {
      location['coordinates'] = {
        lat: location['coordinates']['coordinates'][1] || 0,
        lng: location['coordinates']['coordinates'][0] || 0
      }
      console.log("location", location);
      return newArray.push({
        id: location.uid,
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        title: location.name,
        address: location.address,
        price: `$${res.base_unit_amount}`,
        info: 'Trainer unterrichtet bei dir zu Haus (auf Wunsch)',
        isHome: res.at_home,
        markerColor: '#fc5d68',
        imageSrc: Cycling,
      })
    });
    setPlaces(newArray);
  }

  useEffect(() => {
    getSingleExperience();
  }, [])

  const handleLocationSelect = (id) => {
    let tempPlaces = [...places]
    let prevIndex = tempPlaces.findIndex(place => place.selected)
    if (prevIndex !== -1) {
      tempPlaces[prevIndex].selected = false
    }
    tempPlaces.find(place => place.id === id).selected = true
    if (id === 1) {
      props.handleLessonsAtHomeSelect(true)
    } else {
      props.handleLessonsAtHomeSelect(false)
    }
    toggleSelection(tempPlaces, id)
    setPlaces(tempPlaces)
  }
  const handleLocationHoverIn = (id) => {
    let tempPlaces = [...places]
    tempPlaces.find(place => place.id === id).hover = true
    setPlaces(tempPlaces)
  }
  const handleLocationHoverOut = (id) => {
    let tempPlaces = [...places]
    tempPlaces.find(place => place.id === id).hover = false
    setPlaces(tempPlaces)
  }

  const toggleSelection = (tempPlaces, id) => {
    let newLocations = tempPlaces.find((item) => item.id == id)
    locationCoordinates(newLocations.id);
  };

  return (
    <div className="booking-location">
      <p className="pt-sm-4 font-weight-bold booking-location__title--desktop">Unterrichtsort</p>
      <p className="pt-sm-4 font-weight-bold booking-location__title--mobile">WÃ¤hle deinen Unterrichtsort</p>
      <p className="booking-location__description--desktop">WÃ¤hle einen Startermin aus. Dieser Termin wird auch dein genereller Termin nach deiner gewÃ¤hlten Termin-RegelmÃ¤ÃŸigkeit.</p>
      <p className="booking-location__description--mobile">Noch kein Instrument? Leihe oder kaufe dir <br /> einfach eins zum start!</p>
      <div className="booking-location__map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4' }}
          defaultCenter={{ lat: 32.264339, lng: 75.642113 }}
          defaultZoom={zoomLevel}
          options={{
            fullscreenControl: false, zoomControl: true
          }}
        >
          {
            places.map((place, index) => {
              return (
                <ListingMapMarkerComponent
                  width={width}
                  key={place.id}
                  lat={place.lat}
                  lng={place.lng}
                  isActive={place.isActive}
                  isHome={place.isHome}
                  markerColor={place.markerColor}
                  marker={place.imageSrc}
                  bookingClassLocation={true}
                  hover={place.hover}
                />
              )
            })
          }
        </GoogleMapReact>
      </div>
      <div className="booking-location__options-wrapper">
        <div className="booking-location__options-container swiper-container slider-2" id="swiper">
          <div className="booking-location__options swiper-wrapper">
            {
              places.map(place =>
                <BookingLocationOption
                  key={place.id}
                  {...place}
                  handleLocationSelect={() => handleLocationSelect(place.id)}
                  handleHoverIn={() => handleLocationHoverIn(place.id)}
                  handleHoverOut={() => handleLocationHoverOut(place.id)}
                />
              )
            }
          </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div className="booking-cta-container">
        <button className={`booking-weiter-cta btn btn-primary text-light py-2 booking-weiter-cta ${!places.some(place => place.selected) ? 'booking-location--inactive-cta' : ''}`} style={{ width: '14rem' }} onClick={places.some(place => place.selected) ? props.setProgress : () => { }}>Weiter</button>
      </div>
    </div>
  )
}

export default BookingClassLocation