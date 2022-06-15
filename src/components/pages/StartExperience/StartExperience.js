import React, { useState } from 'react';

import Instructor from '../../../assets/images/instructor.png';
import Badge from '../../../assets/images/badge.png';
import ChatIcon from '../../../assets/images/chat-icon.png';
import DotsVertical from '../../../assets/images/dots-vertical.png';
import '../Listing/ViewListing.scss';
import Trainer from '../../group/trainer/Trainer';
import ExperienceBg from '../../../assets/images/experience-bg.png';
import GoogleMapReact from 'google-map-react';
import ListingMapMarkerComponent from '../Listing/mapMarker/ListingMapMarker';
import useWindowResize from '../../../custom-hooks/useWindowResize';
import { BsThreeDotsVertical } from "react-icons/bs";

import './StartExperience.scss';

export const StartExperience = (
    {
        center = {
            lat: 59.955413,
            lng: 30.5
        },
        zoom = 11,
    }
) => {
    const { dimensions } = useWindowResize();
    const width = dimensions.width;
    let initialPlaces = [
        {
            lat: 59.955413,
            lng: 30.5,
            isActive: false
        },
        // {
        //     lat: 59.955413,
        //     lng: 30.2,
        //     isActive: false
        // },
        // {
        //     lat: 59.955413,
        //     lng: 30.5,
        //     isActive: false
        // },
        // {
        //     lat: 59.955413,
        //     lng: 30.22,
        //     isActive: false
        // },
        // {
        //     lat: 59.955413,
        //     lng: 30.6,
        //     isActive: false
        // },
        // {
        //     lat: 59.955413,
        //     lng: 30.21,
        //     isActive: false
        // },
        {
            lat: 59.955413,
            lng: 30.25,
            isActive: false,
            home: true
        }
    ]

    let [places, setPlaces] = useState(initialPlaces);
    const onlineMembers = [1, 2, 3, 4];
    const createMapOptions = (maps) => {
        return {
            panControl: false,
            mapTypeControl: false,
            scrollwheel: false,
            disableDefaultUI: true
            // styles: map
        }
    }
    console.log('width: ', width)
    //paddingLeft: `${width > 576 ? '85px' : 0}`

    return (
        <div className="experienceContainer">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center" style={{
                paddingLeft: '50px',
                paddingRight: '30px'
            }}>
                <figure style={{ position: 'relative', width: '360px', textAlign: 'center', paddingRight: `${width > 576 ? '80px' : '0'}` }} >
                    <div style={{position: 'relative', width: '85px', height: '85px', margin: '0 auto'}}>
                        <img src={Instructor} alt="instructor" className="rounded-circle imgBorder" width="85px" height="85px" style={{ border: '5px solid #fff' }} />
                        <img src={Badge} alt="badge" className="instructorBadge" width="30px" height="30px" />
                    </div>
                </figure>
                
                <div style={{ width: '450px', minWidth: '450px', textAlign: 'center', margin: '20px 24px 0 24px'}}>
                    <h1 className="text-center text-white" style={{
                        // fontSize: width > 1024 ? '34px' : '30px'
                        fontWeight: '600'
                    }}>Learn Djambe traditionally</h1>
                    <h1 className="text-center text-white" style={{fontWeight: 'normal'}}>Class A</h1>
                </div>
        
                <div className="d-flex flex-column flex-sm-row align-items-center" style={{ width: '360px', textAlign: 'right' }}>
                    <div className="d-flex flex-row-reverse mb-2">
                        {
                            onlineMembers.map(
                              (member, index) => {
                                  return <img key={index} src={Instructor} alt="instructor" style={{ zIndex: index + 1 }} className="rounded-circle onlineMember imgBorder" width="60px" height="60px" />
                              }
                            )
                        }
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/*<button className={`btn ml-4 ${width < 1024 ? 'mr-4' : ''}`} style={{*/}
                        <button className={'btn ml-4'} style={{
                            marginRight: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#4ad9ca',
                            width: '90px',
                            height: '46px',
                            padding: 0,
                        }} ><img src={ChatIcon} alt="chat" width="30px" height="30px" /></button>
                        <div className="menu-icons">
                            {/*<div style={{*/}
                            {/*    backgroundImage: `url(${DotsVertical})`*/}
                            {/*}}> </div>*/}
                            {/*<div>*/}
                            {/*    <img src={DotsVertical} alt="menu-icons" width={'60px'} height={'60px'}/>    */}
                            {/*</div>*/}
                            <BsThreeDotsVertical />
    
                        </div>
                    </div>
                </div>
            </div>
            <div className="container start-experience-container">
                {/*<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">*/}
                {/*    <figure style={{ position: 'relative', width: '80px' }} >*/}
                {/*        <img src={Instructor} alt="instructor" className="rounded-circle imgBorder" width="85px" height="85px" />*/}
                {/*        <img src={Badge} alt="badge" className="instructorBadge" width="30px" height="30px" />*/}
                {/*    </figure>*/}
                {/*    */}
                {/*    */}
                {/*    <div className="d-flex flex-column flex-sm-row align-items-center">*/}
                {/*        <div className="d-flex flex-row-reverse mb-2">*/}
                {/*            {*/}
                {/*                onlineMembers.map(*/}
                {/*                    (member, index) => {*/}
                {/*                        return <img src={Instructor} alt="instructor" style={{ zIndex: index + 1 }} className="rounded-circle onlineMember imgBorder" width="60px" height="60px" />*/}
                {/*                    }*/}
                {/*                )*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*        <button className="btn mx-4"><img src={ChatIcon} alt="chat" width="90px" /></button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<h2 className="text-center text-white">Learn Djambe traditionally</h2>*/}
                {/*<h3 className="text-center text-white">Class A</h3>*/}

                <div className="d-flex flex-column flex-sm-row">
                    <div className="bg-white mx-1 mx-sm-4 px-5 py-5 my-3 flex-1 experienceBox">
                        <h4 className="text-center pb-2">Activity</h4>
                        <div className="d-flex justify-content-between mt-4">
                            <span className="bg-secondary alertSection" ></span>
                            <img className="rounded-circle mx-2" src={Instructor} width="25px" height="25px" alt="profile" />
                            <p className="pl-2 pr-4">Requested booking change</p>
                            <div className="text-right var">
                                <p className="mb-0">Var2</p>
                                <p>Sekunden</p>
                            </div>
                        </div>
                        <div className="divider my-2"></div>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between">
                                <div className="bg-secondary alertSection"></div>
                                <img className="rounded-circle mx-2" src={Instructor} width="25px" height="25px" alt="profile" />
                                <p className="pl-2 pr-4">Requested booking change</p>
                                <div className="text-right var">
                                    <p className="mb-0">Var2</p>
                                    <p>Sekunden</p>
                                </div>
                            </div>
                            <img src={ExperienceBg} alt="bg" className="img-fluid ml-sm-3" />

                        </div>
                        <div className="divider my-2"></div>
                        <div className="d-flex justify-content-between">
                            <div className="bg-secondary alertSection"></div>
                            <img className="rounded-circle mx-2" src={Instructor} width="25px" height="25px" alt="profile" />
                            <p className="pl-2 pr-4">Requested booking change</p>
                            <div className="text-right var">
                                <p className="mb-0">Var2</p>
                                <p>Sekunden</p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white mx-1 mx-sm-4 px-5 py-5 my-3 flex-1 experienceBox text-center">
                        <h4 className="text-center pb-2">Über die Experience</h4>
                        <p style={{marginBottom: '18px', fontSize: '14px'}}>In dieser Experience geht es ums
                        gemeinsame Trommeln. Der
                        Unterricht ist für Anfänger …
                    </p>
                        <p className="font-weight-bold mb-2"> Unterrichtstermin</p>
                        <p style={{ fontSize: '14px'}}> Mittwochs 10:30 Uhr, wöchentlich</p>

                        <p className="font-weight-bold mb-2">Unterrichtsort</p>
                        <p style={{ fontSize: '14px'}}>Grindelalle 20, 20147 Hamburg</p>
                        <div style={{ borderRadius: '20px' }}>
                            <div style={{ height: '120px', width: '100%', position: 'relative', zIndex: 1 }} >
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4' }}
                                    defaultCenter={center}
                                    defaultZoom={zoom}
                                    options={createMapOptions}>
                                    {places.map((place, index) => (
                                        <ListingMapMarkerComponent
                                            key={index}
                                            width={width}
                                            lat={place.lat}
                                            lng={place.lng}
                                            isActive={place.isActive}
                                            isHome={place.home} />
                                    ))
                                    }
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white mx-1 mx-sm-4 text-center px-5 py-5 my-3 flex-1 experienceBox">
                        <h4 className="text-center pb-2">Trainer</h4>
                        <div className="d-flex justify-content-center">
                            <figure style={{ position: 'relative' }} >
                                <img src={Instructor} alt="instructor" className="rounded-circle imgBorder" width="80px" />
                                <img src={Badge} alt="badge" className="trianerBadge" width="30px" height="30px" />
                            </figure>
                            <div>
                                <p>Dimi</p>
                                <button className="btn" style={{
                                    width: '60px',
                                    height: '40px',
                                    padding: 0,
                                    backgroundColor: '#C0C0C1',
                                    marginLeft: '8px'
                                }}><img src={ChatIcon} alt="chat" width="28px" height="28px" /></button>
                            </div>
                        </div>
                        <div className="text-center my-2">
                            <span className="badge badge-pill badge-outline-primary mr-2">Hobby Musician</span>
                            <span className="badge badge-pill badge-outline-secondary">Jazz</span>
                        </div>
                        <div className="divider my-5"></div>
                        <h4 className="text-center">Mitglieder</h4>
                        <div className="d-flex flex-row-reverse justify-content-center mb-2">
                            {
                                onlineMembers.map(
                                    (member, index) => {
                                        return <img key={index} src={Instructor} alt="instructor" style={{ zIndex: index + 1 }} className="rounded-circle onlineMember imgBorder" width="50px" height="50px" />
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
