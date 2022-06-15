import React, { useEffect, useState, useRef, Fragment } from 'react';
import desktopHome from '../../assets/images/desktopHome.png';
import mobileHome from '../../assets/images/mobileHome.png';
import UnterrichtIcon from '../../assets/images/unterrichtIcon.png';
import InstrumenteIcon from '../../assets/images/mapIconInstrument.png';
import KonzerteIcon from '../../assets/images/konzerte.png';
import JobIcon from '../../assets/images/jobIcon.png';
import Background from '../../assets/images/modalBackground.png';
import Model from '../../assets/images/model.png';
import './MapMarkerComponent.scss';
import useOutsideAlerter from '../../custom-hooks/useOutSideClickAlerter';
import MapPackage from './MapPackage';
import InstrumenteFilterIcon from '../../assets/images/instrument.png';
import Package from "../package/Package";
import video from '../../assets/images/video.png'
import avatarPlaceholder from "../../assets/images/placeholder/avatar.png";


const MapMarkerComponent = (props) => {

    const mapPackageRef = useRef(null);
    useOutsideAlerter(mapPackageRef);

    let hoverClass = '';
    const width = props.dimensions.width;
    let activeClass = '';
    const { fitlerState } = props;

    useEffect(() => {
        document.addEventListener("mouseout", handleHoverOutside);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mouseout", handleHoverOutside);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleHoverOutside = () => {
        if (!props.isHome) {
            props.onHoverOutside();
        }
    }

    const handleClickOutside = (event) => {
        if (event.target.closest('.mapPackage')) {
            return
        }
        setClickedState(false);
    }
    if (props.$hover && width > 1024) {
        hoverClass = props.$hover ? 'mapIcon' : '';
        if (!props.isHome) {
            props.onHover({ lat: props.lat, lng: props.lng });
        }
    }

    // styles for marker
    activeClass = props.isActive ? 'zommed-size' : 'normal-size';
    const filteredStyle = { minWidth: '70px', borderRadius: '20px', padding: '2px', height: '45px' }
    const borderClass = fitlerState ? 'border ' : ' ';
    const hoverCondtionClass = width > 1024 ? `${hoverClass} + ${activeClass}` : `${activeClass}`;

    const [clickedState, setClickedState] = useState(false)
    useEffect(() => {
        
    }, [clickedState])

    return (
        <div style={{ position: 'relative' }}>
            <div className="mapPackage">
                {clickedState && <MapPackage
                    handleFavExperienceSelect={props.handleFavExperienceSelect}
                    isFavourite={props.isFavourite}
                    backgroundImage={props.experience.backgroundImage}
                    modelImage={props.experience.modelImage}
                    title={props.experience.title}
                    price={props.experience.price}
                    fromMap={true}
                    ref={mapPackageRef}
                    filterState={fitlerState}
                    type={props.experience.type}
                    groupType={props.experience.groupType}
                />}
            </div>
            <div
                onClick={() => setClickedState(!clickedState)}
                className={"d-flex bg-white iconPackage " + borderClass + hoverCondtionClass}
                style={fitlerState ? filteredStyle : null}>
                {
                    !props.isHome && <Fragment>{
                        fitlerState ?
                            <>
                                <img width="25px" height="25px" className={'mapImageIcon bg-white rounded-circle ' + (fitlerState ? 'mr-1 ml-1 mt-2' : 'icon')} src={InstrumenteFilterIcon} alt="UnterrichtIcon" />
                                <img src={video} width={"20px"} height={"20px"} className="videoIcon mt-2" />
                            </>
                            :
                            (props.type === 'Unterricht') ?
                                <img width="30px" height="30px" className={'mapImageIcon bg-white rounded-circle ' + (fitlerState ? 'mr-1 ml-1' : 'icon')} src={UnterrichtIcon} alt="UnterrichtIcon" />
                                : (props.type === 'Instrumente') ?
                                    <img width="30px" height="30px" className={'mapImageIcon bg-white rounded-circle ' + (fitlerState ? 'mr-1 ml-1' : 'icon')} src={InstrumenteIcon} alt="InstrumenteIcon" />
                                    : (props.type === 'Konzerte') ?
                                        <img width="30px" height="30px" className={'mapImageIcon bg-white rounded-circle ' + (fitlerState ? 'mr-1 ml-1' : 'icon')} src={KonzerteIcon} alt="KonzerteIcon" />
                                        : <img width="30px" height="30px" className={'mapImageIcon bg-white rounded-circle ' + (fitlerState ? 'mr-1 ml-1' : 'icon')} src={JobIcon} alt="JobIcon" />
                    }
                    </Fragment>
                }
                {fitlerState &&
                    <>
                        <p style={{ zIndex: '1000', paddingLeft: '60px' }} className="mb-0 d-flex align-items-center font-weight-bold ml-auto mr-3 mt-1 font-14">10€</p>
                    </>
                }
            </div>

            {
                (width > 1024 && props.isHome) &&
                <img src={desktopHome} alt="home" width="45px" className={`${hoverClass} + ${activeClass}`} />
            }
            {
                (width <= 1024 && props.isHome) &&
                <img src={mobileHome} alt="home" width="45px" className={`${hoverClass} + ${activeClass}`} />
            }

        </div>)
}

export default MapMarkerComponent;