import React from 'react';
import GPSIcon from '../../assets/images/gps.png';
import './MapMarkerComponent.scss';

const Gpscontroller = ({ handleClick }) => {
    return (
        <div onClick={() => handleClick()} className="customMapController d-flex justify-content-center align-items-center">
            <img src={GPSIcon} alt="mylocation" width="20px"/>
        </div>
    )
}

export default Gpscontroller;
