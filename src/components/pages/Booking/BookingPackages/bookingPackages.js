import React, { useState, useRef, useEffect, Fragment } from 'react'
import Package from '../../../package/Package';
import Background from '../../../../assets/images/modalBackground.png';
import Model from '../../../../assets/images/model.png';
import Swiper from 'swiper';

export const BookingPackages = ({ progress, setProgress }) => {
    const initialPlaces = [
        {
            lat: 59.955413,
            lng: 30.5,
            isActive: false,
            type: 'Unterricht',
            groupType: 'Group'
        },
        {
            lat: 59.955413,
            lng: 30.2,
            isActive: false,
            type: 'Unterricht',
            groupType: 'Single'
        },
        {
            lat: 59.955413,
            lng: 30.5,
            isActive: false,
            type: 'Instrumente',
            groupType: 'Group'
        },
        {
            lat: 59.955413,
            lng: 30.22,
            isActive: false,
            type: 'Instrumente',
            groupType: 'Single'
        },
        {
            lat: 60,
            lng: 30.20,
            isActive: false,
            type: 'Konzerte',
            groupType: 'Group'
        },
        {
            lat: 59.955413,
            lng: 30.21,
            isActive: false,
            type: 'Jobs',
            groupType: 'Single'
        },
        {
            lat: 59.955413,
            lng: 30.25,
            isActive: false,
            home: true,
            type: 'Jobs',
            groupType: 'Single'
        }
    ];
    let [isVerleihenActive, toggleVerleihenActive] = useState(true);
    let [isVerkaufenActive, toggleVerkaufenActive] = useState(false);
    let [places, setPlaces] = useState(initialPlaces);
    let refArray = [];
    refArray = places.map(place => {
        return React.createRef()
    });
    const myRef = useRef(refArray);
    let [mySwiper, setMySwiper] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const handleVerleihenClick = () => {
        if (isVerkaufenActive && !isVerleihenActive) {
            toggleVerkaufenActive(false)
        }
        toggleVerleihenActive(true)
    }
    const handleVerkaufenClick = () => {
        if (isVerleihenActive && !isVerkaufenActive) {
            toggleVerleihenActive(false)
        }
        toggleVerkaufenActive(true)
    }

    useEffect(() => {
        let mySwiper = new Swiper('.slider-2', {
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
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
        <Fragment>
            <div className="d-flex flex-column flex-sm-row justify-content-between">
                <div className="d-flex">
                    <button className={`btn mr-2 zuButton ${isVerleihenActive ? 'active-verleihen' : ''}`} onClick={handleVerleihenClick}>Zu verleihen</button>
                    <button className={`btn zuButton ${isVerkaufenActive ? 'active-verkaufen' : ''}`} onClick={handleVerkaufenClick}>Zu verkaufen</button>
                </div>
                <button className="btn">Mehr anzeigen</button>
            </div>
            <div className="swiper-container slider-2" id="swiper" style={{ marginTop: '20px' }}>
                <div className="swiper-wrapper">
                    {
                        places.map((item, index) => (
                            <div key={index}
                                className={"swiper-slide bookingPackage " +
                                    (index === selectedPackage ? 'activePackage' : '')}
                                onClick={() => { (index === selectedPackage) ? setSelectedPackage(null) : setSelectedPackage(index) }}>
                                <Package
                                    className="swiper-slide"
                                    key={index}
                                    backgroundImage={Background}
                                    modelImage={Model}
                                    title="Learn  traditionally"
                                    price="15"
                                    ref={myRef.current[index]}
                                    fromSwiper={true}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>

            <button className="btn btn-primary text-light mt-3 mb-2 py-2" style={{ width: '14rem' }} onClick={() => { setProgress(progress + 1) }}>
                {selectedPackage === null ? 'Überspringen und weiter' : 'Weiter'}
            </button>
        </Fragment>
    )
}


export default BookingPackages;