import React, { Fragment } from 'react'
import './MapMarkerComponent.scss';
import UnterrichtIcon from '../../assets/images/unterrichtIcon.png';
import InstrumenteIcon from '../../assets/images/instrument.png';
import KonzerteIcon from '../../assets/images/konzerte.png';
import JobIcon from '../../assets/images/jobIcon.png';
import Love from '../../assets/images/love.png';
import Single from '../../assets/images/singleGray.png';
import Group from '../../assets/images/freunden.png';
import Favourite from '../../assets/images/FavouriteRed.png'

const MapPackage = React.forwardRef((props, ref) => {
    const {
        backgroundImage,
        modelImage,
        title,
        price,
        type,
        groupType,
        parent,
    } = props;

    const packageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        minWidth: '140px'
        // minHeight: fromMap ? 'auto' : '214px'
    }

    return (
        <div className={"bg-white d-flex"} style={{ borderRadius: '35px' }} ref={ref}>
            <div style={packageStyle} className="packageContainer py-5">
                <div className="text-center d-flex flex-column align-items-center justify-content-center p-2 p-lg-4 packageBoxText" style={{ height: '100%' }}>
                    {(type === 'Unterricht') ?
                        <img src={UnterrichtIcon} alt="UnterrichtIcon" className="smallIcon" />
                        : (type === 'Instrumente') ?
                            <img src={InstrumenteIcon} alt="InstrumenteIcon" className="smallIcon" />
                            : (type === 'Konzerte') ?
                                <img src={KonzerteIcon} alt="KonzerteIcon" className="smallIcon" />
                                : <img src={InstrumenteIcon} alt="JobIcon" className="smallIcon" style={{ display: `${parent === 'profile' ? 'none' : ''}` }} />
                    }
                    {(type === 'Unterricht') ?
                        <div className="packageImageMain">
                            <img src={modelImage} className="packageImage3" alt="modelImage" width="25px" height="25px" />
                            <img src={modelImage} className="packageImage2" alt="modelImage" width="25px" height="25px" />
                            <img src={modelImage} className="packageImage2" alt="modelImage" width="25px" height="25px" />
                            <p className='mb-0 text-white mt-2'>2 more..</p>
                        </div>
                        :
                        <img src={modelImage} className="packageImage" alt="modelImage" width="25px" height="25px" />}
                    <button className="btn btn-light rounded-circle smallLoveButton" onClick={props.handleFavExperienceSelect}>
                        <img src={props.isFavourite ? Favourite : Love} width="12px" height="14px" />
                    </button>
                    <h5 className="text-light price">{price}€</h5>
                </div>
            </div>
            <div className="textarea d-flex flex-column justify-content-center align-items-center px-4 py-2 mb-3">
                <p className="text-dark text-center font-weight-bold mb-0 pt-2 font-18">{title}</p>
                <div className="d-flex mt-3 justify-content-center">
                    {
                        [...Array(5)].map(
                            (rev, index) =>
                                <i key={index} className="fa fa-star icon-b-small pr-1" aria-hidden="true"></i>
                        )
                    }
                </div>
                {groupType && <div className="d-flex font-10 align-items-center mx-auto px-3 py-1 mt-3" style={{ border: '1px solid #d6d6d6', borderRadius: '20px' }}>
                    {groupType.toLowerCase() === 'single' && <Fragment>
                        <img src={Single} width="10px" height="10px" className="mr-1" />
                        <span>Einzel</span>
                    </Fragment>}
                    {groupType.toLowerCase() === 'group' && <Fragment>
                        <img src={Group} width="10px" height="10px" className="mr-1" />
                        <span>Gruppe</span>
                    </Fragment>}
                </div>}
            </div>
        </div>
    )
}
)

export default MapPackage;
