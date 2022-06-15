import React from 'react';
import FullScreenIcon from '../../assets/images/fullScreen.png';
import './MapMarkerComponent.scss';

const FullSizeController = ({ handleClick }) => {
    return (
        <div onClick={() => handleClick()} className="customMapController d-flex justify-content-center align-items-center">
            <img src={FullScreenIcon} alt="fullScreen" width="20px"/>
        </div>
    )
}

export default FullSizeController;
