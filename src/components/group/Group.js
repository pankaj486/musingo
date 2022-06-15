import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import GroupItem from './group-item/GroupItem';
import model from '../../assets/images/model.png';
import ListingMapMarkerComponent from '../pages/Listing/mapMarker/ListingMapMarker';
import BookingGroupSelectMapMarker from '../pages/Booking/BookingGroupSelectMapMarker';
import BookingGroupSelectOption from '../pages/Booking/BookingGroupSelectOption';
import useWindowResize from 'src/custom-hooks/useWindowResize';
import Swiper from 'swiper';
import Instructor from '../../assets/images/instructor.png'
import { BiCycling } from 'react-icons/bi';
import Cycling from 'src/assets/images/Cycling.png'
// import Cycling from './../../../assets/images/Cycling.png'


const Group = (
    props

) => {

    const { locations, experience } = props
    const [experienceType, setExperienceType] = useState("Group");

    console.log("exjlfkj", experienceType)

    // console.log("locations", locations);
    const [places, setPlaces] = useState([]);

    const getLocation = async () => {
        const newArray = []
        locations.map((location) => {
            location['coordinates'] = {
                lat: location['coordinates']['coordinates'][1] || 0,
                lng: location['coordinates']['coordinates'][0] || 0
            }
            return newArray.push({
                id: location.uid,
                lat: location.coordinates.lat,
                lng: location.coordinates.lng,
                title: location.name,
                address: location.address,
                price: `$${experience.base_unit_amount}`,
                info: 'Trainer unterrichtet bei dir zu Haus (auf Wunsch)',
                isHome: experience.at_home,
                markerColor: '#fc5d68',
                marker: Cycling,
                imageSrc: Cycling,
            })
        });
        setPlaces(newArray);
        setExperienceType("Single")
    }

    useEffect(() => {
        getLocation();
    }, [locations])

    const groups = [
        { name: 'Gruppe A', location: '4/5 Mitglieder', price: '15€', members: [model, model, model], lat: 59.955413, lng: 30.21 },
        { name: 'Gruppe B', location: '4/5 Mitglieder', price: '15€', members: [model, model, model], lat: 59.955413, lng: 30.25 },
        { name: 'Gruppe C', location: '4/5 Mitglieder', price: '15€', members: [model, model, model], lat: 59.955413, lng: 30.22 },
        { name: 'Gruppe D', location: '4/5 Mitglieder', price: '15€', members: [model, model, model], lat: 59.955413, lng: 30.5 }
    ]

    // const map = MapStyle();
    const createMapOptions = (maps) => {
        return {
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            disableDefaultUI: true
            // styles: map
        }
    }

    const { dimensions } = useWindowResize();
    let width = dimensions.width;

    const onGroupSelect = (index) => {
        let hoveredPlace = places.filter(place => {
            if (place.lat === groups[index].lat && place.lng === groups[index].lng) {
                return true;
            }
            return false;
        })[0];

        hoveredPlace.isActive = hoveredPlace.isActive ? false : true;
        places = [...places];
        setPlaces(places);
    }

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
        // console.log('bookingGroupSelect.js')
    }, [])
    const handleGroupSelect = (id) => {
        // console.log('selected')
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
        <div className="px-4 px-sm-0 col-md-12" style={{ marginBottom: '60px' }}>
            {experienceType === "Group" ? <>
            <div style={{ height: '40vh', width: '100%', position: 'relative', zIndex: 1 }} className="mb-5">
                <h4 className="text-center my-4 pt-5">Gruppen</h4>
                {/* <h4 className="text-center my-4 pt-5">Locations</h4> */}
                <div style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '340px',
                    width: '100%'
                }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4' }}
                        center={places[places.length - 1]}
                        // defaultCenter={{ lat: 32.264339, lng: 75.642113 }}
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
            </> : <>
            <div className="mb-5">
                {/* <h4 className="text-center my-4 pt-5">Gruppen</h4> */}
                <h4 className="text-center my-4 pt-5">Locations</h4>
                <div style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '340px',
                    width: '100%'
                }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4' }}
                        center={places[places.length - 1]}
                        // defaultCenter={{ lat: 32.264339, lng: 75.642113 }}
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
            </div>        
            </>}

        </div>
    )
}

export default Group;
