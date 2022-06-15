import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import useWindowResize from 'src/custom-hooks/useWindowResize';
import CardBox from 'src/components/cardBox';
import ListingMapMarkerComponent from 'src/components/pages/Listing/mapMarker/ListingMapMarker';
import './style.scss';


const ExperienceBox = ({ description, timingLabel, timingValue, screenWidth }) => {

    const initialPlaces = [
        {
            lat: 59.955413,
            lng: 30.5,
            isActive: false
        },
        {
            lat: 59.955413,
            lng: 30.25,
            isActive: false,
            home: true
        }
    ]
    const mapDefaultCenter = {
        lat: 59.955413,
        lng: 30.5
    }
    const mapDefaultZoom = 11

    const bootstrapURLKeys = { 
        key: 'AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4' 
    }

    const [places, setPlaces] = useState(initialPlaces)

    const createMapOptions = (maps) => {
        return {
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            disableDefaultUI: true
            // styles: map
        }
    }
    return (
        <CardBox title={'Experience'}>
            <div className="experienceCardBox">
                {
                    description &&
                    <p style={{marginBottom: '18px', fontSize: '14px', textAlign: 'center'}}>
                        { description }
                    </p>
                }
                {
                    (timingLabel || timingValue) &&
                    <>
                        <p className="font-weight-bold mb-2">{timingLabel}</p>
                        <p style={{ fontSize: '14px'}}>{timingValue}</p>
                    </>

                }
                
                <div style={{ borderRadius: '20px', border: '1px solid #d6d5d5', overflow: 'hidden', marginTop: '30px'}}>
                    <div className="experienceCardBoxMapWrap" >
                        <GoogleMapReact
                            bootstrapURLKeys={bootstrapURLKeys}
                            defaultCenter={mapDefaultCenter}
                            defaultZoom={mapDefaultZoom}
                            options={createMapOptions}>
                            {
                                places.map((place, index) => (
                                    <ListingMapMarkerComponent
                                        key={index}
                                        width={screenWidth}
                                        lat={place.lat}
                                        lng={place.lng}
                                        isActive={place.isActive}
                                        isHome={place.home} 
                                    />
                                ))
                            }
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </CardBox>
    )
}

export default ExperienceBox