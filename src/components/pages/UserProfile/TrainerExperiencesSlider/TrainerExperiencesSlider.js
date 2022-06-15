import React, { Fragment, useEffect, useRef, useState } from 'react'

import Background from './../../../../assets/images/experience-bg.png'
import Model from '../../../../assets/images/model.png'

import Package from '../../../package/Package'
import Swiper from 'swiper'
import './TrainerExperiencesSlider.scss'
import {useExperiencePrivateLessonsList} from "src/generated/apiFetchers";

const TrainerExperiencesSlider = props => {

  const {data: getSingleExperience} = useExperiencePrivateLessonsList({});
  console.log("getSingleExperience", getSingleExperience);

  const initialPlaces = [
    {
      lat: 59.955413,
      lng: 30.5,
      isActive: false,
      type: 'Unterricht',
    },
    {
      lat: 59.955413,
      lng: 30.2,
      isActive: false,
      type: 'Unterricht'
    },
    {
      lat: 59.955413,
      lng: 30.5,
      isActive: false,
      type: 'Instrumente'
    },
    {
      lat: 59.955413,
      lng: 30.22,
      isActive: false,
      type: 'Instrumente'
    },
    {
      lat: 60,
      lng: 30.20,
      isActive: false,
      type: 'Konzerte'
    },
    {
      lat: 59.955413,
      lng: 30.21,
      isActive: false,
      type: 'Jobs'
    },
    {
      lat: 59.955413,
      lng: 30.25,
      isActive: false,
      home: true,
      type: 'Jobs'
    }
  ];
  let [places, setPlaces] = useState(initialPlaces);
  const [selectedPackage, setSelectedPackage] = useState(null);
  let [mySwiper, setMySwiper] = useState(null);
  let refArray = [];
  refArray = places.map(place => {
    return React.createRef()
  });
  const myRef = useRef(refArray);

  useEffect(() => {
    let mySwiper = new Swiper('.slider-2', {
      breakpoints: {
        375: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
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
    });
    setMySwiper(mySwiper);
  }, []);
  return (
    <div className='trainer-experience-slider'>
      <p className='experience-slider-title'>Experiences von Felix</p>
      <div className="swiper-container slider-2" id="swiper" style={{ marginTop: '20px' }}>
        <div className="swiper-wrapper">
          {
            getSingleExperience?.results.map((experience, index) => (
              <div key={index} className={`swiper-slide bookingPackageTrainerExperience ${props.userProfile ? "userProfileSlider" : ""}
                ${index === selectedPackage ? 'activePackage' : ''}`}
                onClick={() => { (index === selectedPackage) ? setSelectedPackage(null) : setSelectedPackage(index) }}>
                <Package
                  className="swiper-slide"
                  key={index}
                  backgroundImage={experience.banner.image}
                  modelImage={Model}
                  title={experience.title}
                  price={experience.base_unit_amount}
                  ref={myRef.current[index]}
                  parent={'profile'}
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  )
}

export default TrainerExperiencesSlider