import React, { useState, useRef, useEffect, Fragment } from 'react'
import Package from '../../package/Package';
import Background from '../../../assets/images/modalBackground.png';
import Model from '../../../assets/images/model.png';
import Swiper from 'swiper';
import useWindowResize from '../../../custom-hooks/useWindowResize';

import './networmModal.scss';

const NetworkSearchContent = ({ setProgress }) => {
    const { dimensions } = useWindowResize();
    const width = dimensions.width;
    const [selectedPackage, setSelectedPackage] = useState(null);
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
    let [mySwiper, setMySwiper] = useState(null);
    let [places, setPlaces] = useState(initialPlaces);

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
        <div className="defContainer text-center">
            <h5 className="text-center">Ich suche</h5>
            <input style={{
                minWidth: '200px',
                width: width >= 1024 ? '500px' : '340px',
                height: '52px',
                borderRadius: '10px'
            }} type="text" placeholder="Gitarrenunterricht" className="mx-auto text-center form-control musingoo-input networkSearchInput my-4 p-2" />
            <p className="text-center font-weight-bold font-12">Diese Experiences könnten dazu passen</p>
            <Fragment>
                <div className="swiper-container slider-2" id="swiper" style={{ marginTop: '20px', height: 'auto' }}>
                    <div className="swiper-wrapper">
                        {
                            places.map((item, index) => (
                                <div key={index}
                                    style={{
                                        // borderRadius: '4rem',
                                        maxWidth: '300px'
                                    }}
                                    className={"swiper-slide mr-3 bookingPackage "  +
                                    (index === selectedPackage ? 'activePackage' : '')}
                                     onClick={() => { (index === selectedPackage) ? setSelectedPackage(null) : setSelectedPackage(index) }}>
                                    <Package
                                        className="swiper-slide"
                                        key={index}
                                        backgroundImage={Background}
                                        modelImage={Model}
                                        title="Learn  traditionally"
                                        price="15"
                                        fromSwiper={true}
                                    // ref={myRef.current[index]} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                    {/* TODO: change style */}

                </div>
                <div className="swiper-button-next networkArrowNext"></div>
                <div className="swiper-button-prev networkArrowPrev"></div>
                <button className="btn btn-primary text-white py-2 mx-auto mt-4" onClick={setProgress}>Trotzdem Gesuch erstellen</button>
                {/* <button className="btn btn-primary text-light mt-3 mb-2" style={{ width: '14rem' }} onClick={() => { setProgress(progress + 1) }}>
                {selectedPackage === null ? 'Überspringen und weiter' : 'Weiter'}
            </button> */}
            </Fragment>
        </div>
    )
}

export default NetworkSearchContent
