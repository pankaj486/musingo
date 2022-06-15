import React, { Fragment, forwardRef } from 'react'
import './Package.scss';
import UnterrichtIcon from '../../assets/images/unterrichtIcon.png';
import InstrumenteIcon from '../../assets/images/mapIconInstrument.png';
import InstrumenteFilterIcon from '../../assets/images/instrument.png';
import KonzerteIcon from '../../assets/images/konzerte.png';
import JobIcon from '../../assets/images/jobIcon.png';
import Love from '../../assets/images/love.png';
import Favourite from '../../assets/images/FavouriteRed.png';
import Single from '../../assets/images/singleGray.png';
import Group from '../../assets/images/freunden.png';
import useWindowResize from '../../custom-hooks/useWindowResize'
import Rating from '@material-ui/lab/Rating';
import UiTooltip from '../tooltip';
import video from '../../assets/images/video.png'
import cal from '../../assets/images/new/cal.png'
import leihen from '../../assets/images/new/leihen.png'
import kufen from '../../assets/images/new/kufen.png'

const Package = forwardRef((props, ref) => {
    const {
        backgroundImage,
        modelImage,
        title,
        price,
        type,
        fromMap,
        groupType,
        parent,
        fromSwiper,
        filterState,
        booking,
        typeFilter,
        iconSize,
        avgReviewScore
    } = props;

    const packageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        // minHeight: fromMap ? 'auto' : '214px'
    }
    const { dimensions } = useWindowResize();
    const width = dimensions.width;
    return (
        <div className={`packageBorder ${props.favPackageClassName ? props.favPackageClassName : ''} ${fromSwiper ? 'fromSwiper' : ''}`} ref={ref} style={{
            borderTop: width <= 767 && '0'
        }}>
            <div onClick={props.onClickPackage} style={packageStyle} className="packageContainer">
                <div className="text-center d-flex flex-column align-items-center justify-content-center p-2 p-lg-4 packageBoxText" style={{ height: '100%' }}>
                    <p className={`text-center text-white font-weight-bold mb-0 ${booking === true ? 'font-14' : 'font-20'}`}>
                        {title}
                    </p>
                    <Fragment>{
                        filterState ?
                            <>
                                {typeFilter == 'video' ?
                                    <div className={"icons " + (fromMap ? 'smallIcon' : '')} style={{ display: `${parent === 'profile' ? 'none' : ''}` }}>
                                        <img src={InstrumenteFilterIcon} alt="InstrumenteFilterIcon" />
                                        <img className='img2' src={video} />
                                    </div>
                                    :
                                    <img src={InstrumenteFilterIcon} className={iconSize ? "icon2" : 'icon' + (fromMap ? 'smallIcon' : '')} style={{ display: `${parent === 'profile' ? 'none' : ''}` }} alt="InstrumenteFilterIcon" />
                                }
                            </>
                            : (type === 'Unterricht') ?
                                <UiTooltip title={'Unterricht'}>
                                    <img src={UnterrichtIcon} alt="UnterrichtIcon" className={iconSize ? "icon2" : 'icon' + (fromMap ? 'smallIcon' : '')} />
                                </UiTooltip>
                                : (type === 'Instrumente') ?
                                    <UiTooltip title={'Instrumente'}>
                                        <img src={InstrumenteIcon} alt="InstrumenteIcon" className={iconSize ? "icon2" : 'icon' + (fromMap ? 'smallIcon' : '')} />
                                    </UiTooltip>
                                    : (type === 'Konzerte') ?
                                        <UiTooltip title={'Konzerte'}>
                                            <img src={KonzerteIcon} alt="KonzerteIcon" className={iconSize ? "icon2" : 'icon' + (fromMap ? 'smallIcon' : '')} />
                                        </UiTooltip>
                                        : <UiTooltip title={'Job'}>
                                            <img src={JobIcon} alt="JobIcon" className={iconSize ? "icon2" : 'icon' + (fromMap ? 'smallIcon' : '')} style={{ display: `${parent === 'profile' ? 'none' : ''}` }} />
                                        </UiTooltip>

                    }
                    </Fragment>
                    {(type === 'Unterricht') ?
                        <>
                            <div className="packageImageMain">
                                <img src={modelImage} className="packageImage3" alt="modelImage" width="30px" height="30px" />
                                <img src={modelImage} className="packageImage2" alt="modelImage" width="30px" height="30px" />
                                <img src={modelImage} className="packageImage2" alt="modelImage" width="30px" height="30px" />
                                <img src={modelImage} className="packageImage2" alt="modelImage" width="30px" height="30px" />
                            </div>
                        </>
                        :
                        <img src={modelImage} className="packageImage" alt="modelImage" width={iconSize ? "30px" : "40px"} height={iconSize ? "30px" : "40px"} />}
                    <button className="btn btn-light rounded-circle loveButton"
                        onClick={props.handleFavExperienceSelect}>
                        <img className='heart' src={props.isFavourite ? Favourite : Love} width="16px" height="16px" />
                    </button>
                    <h4 className={iconSize ? "font-18 text-light price2" : "" + "text-light price"}>{price}€</h4>
                </div>
            </div>
            <div onClick={props.onClickPackage} className="textarea d-flex flex-column justify-content-center align-items-center p-3 mb-3">

                <div className="d-flex justify-content-center" style={{
                    marginTop: width <= 767 ? '10px' : '1rem'
                }}>
                    {
                        <Rating size={iconSize ? "small" : "large"} name="read-only" value={avgReviewScore} readOnly />
                    }
                </div>
                {
                    type === 'Konzerte' ?

                        <div className='concert'>
                            <img src={cal} />
                            <div>
                                <p>monday</p>
                                <p>12.03.22</p>
                            </div>
                        </div>
                        : type === 'Instrumente' ?

                            <div className='instru'>
                                <div className='mr-4 d-flex align-items-center flex-column'>
                                    <img src={leihen} />
                                    <p>Leihen</p>
                                </div>
                                <div className='d-flex align-items-center flex-column'>
                                    <img src={kufen} />
                                    <p>Kaufen</p>
                                </div>
                            </div>

                            :

                            typeFilter == 'video' ? <div className='d-flex'>
                                {groupType && <div className="d-flex flex-column font-10 align-items-center mx-auto px-3 py-1" style={{
                                    marginTop: width <= 767 ? '14px' : '1.5rem'
                                }}>
                                    {groupType.toLowerCase() === 'single' && <Fragment>
                                        <img src={Single} width={iconSize ? "20px" : "20px"} height={iconSize ? "20px" : "20px"} className="mr-1" />
                                        <span>Einzel</span>
                                    </Fragment>}
                                    {groupType.toLowerCase() === 'group' && <Fragment>
                                        <img src={Group} width={iconSize ? "20px" : "20px"} height={iconSize ? "20px" : "20px"} className="mr-1" />
                                        <span>Gruppe</span>
                                    </Fragment>}
                                </div>}
                                <div className="d-flex flex-column font-10 align-items-center mx-auto px-3 py-1" style={{
                                    marginTop: width <= 767 ? '14px' : '1.5rem'
                                }}>
                                    <Fragment>
                                        <img src={video} width={iconSize ? "20px" : "20px"} height={iconSize ? "20px" : "20px"} className="" />
                                        <span>Video</span>
                                    </Fragment>
                                </div>
                            </div>
                                :
                                <div>
                                    {groupType && <div className="d-flex font-10 align-items-center mx-auto px-3 py-1" style={{
                                        marginTop: width <= 767 ? '14px' : '1.5rem'
                                    }}>
                                        {groupType.toLowerCase() === 'single' && <Fragment>
                                            <img src={Single} width="30px" height="30px" className="mr-1" />
                                            <span style={{
                                                fontSize: '20px'
                                            }}>Einzel</span>
                                        </Fragment>}
                                        {groupType.toLowerCase() === 'group' && <Fragment>
                                            <img src={Group} width="30px" height="30px" className="mr-1" />
                                            <span style={{
                                                fontSize: '20px'
                                            }}>Gruppe</span>
                                        </Fragment>}
                                    </div>}
                                </div>
                }
            </div>
        </div>
    )
}
)

export default Package;
