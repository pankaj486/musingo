import React, { useState, useRef, useEffect, Fragment } from 'react';
import BookingBackground from '../../../assets/images/bookingBackground.png'
import BookingBackgroundPriceTable from '../../../assets/images/experience-bg.png'
import TrainerImage from './../../../assets/images/instructor.png'
import Checked from './../../../assets/images/check.png'
import Cycling from './../../../assets/images/Cycling.png'
import User from './../../../assets/images/Einzel.png'
import Erwachsene from './../../../assets/images/Erwachsene.png'
import Guitar from './../../../assets/images/guitar.png'
import Anfanger from './../../../assets/images/Anfänger.png'
import Settings from './../../../assets/images/settings-booking.png'
import Calendar from './../../../assets/images/termine.png'
import LockIcon from './../../../assets/images/bookingMobileLockIcon.png'
import useWindowResize from '../../../custom-hooks/useWindowResize';
import './booking.scss';
import PriceTable from '../../priceTable/PriceTable';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody } from 'reactstrap';

import 'swiper/css/swiper.min.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import GroupLessonBooking from './groupLessonBooking';
import BookingTimePicker from './bookingTimePicker';
import CompleteModalImage from '../../../assets/images/completeModal.gif';
import BookingOtp from '../../bookingOtp/bookingOtp';
import BookingPackages from './BookingPackages/bookingPackages';
import Bookingpayment from './BookingPayment/bookingPayment';
import BookingInstrument from './BookingInstrument'
import BookingClassLocation from './BookingClassLocation'
import BookingSubscription from './BookingSubscription'
import BookingAddress from './BookingAddress'
import BookingMobile from './BookingMobile'
import BookingMobileVerification from './BookingMobileVerification'
import BookingPayment from './BookingPayment'
import BookingSummary from './BookingSummary'
import BookingTimePickerNew from './bookingTimePickerNew';
import ModeOne from '../../../assets/images/new/image16.png'
import ModeTwo from '../../../assets/images/new/image15.png'

const BookingInstrumentBuy = (props) => {
    let [activePrice, setActivePrice] = useState(1);
    let [progress, setProgress] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null)
    let [namen, setNamen] = useState(true);
    let { path } = useRouteMatch();

    const { dimensions } = useWindowResize();
    const width = dimensions.width;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const schülerList = Array(6).fill('schüler');

    let [selectedSchülerList, setSelectedSchülerList] = useState([]);

    const handleSchülerClick = (schüler, index) => {
        let updatedList = [];
        for (let i = 0; i <= index; i++) {
            updatedList.push(schüler)
        }
        setSelectedSchülerList(updatedList);
    }

    const [completeModal, setCompleteModal] = useState(false);

    const toggleCompleteModal = () => setCompleteModal(!completeModal);
    let [ich, setIch] = useState(null);
    const handleIchState = (index) => {
        if (ich === null) {
            return false;
        } else {
            if (index !== ich) {
                return true;
            }
        }
        return false;
    }
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        street: '',
        streetNumber: '',
        postcode: '',
        city: ''
    })
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleAddressChange = (input, value) => {
        setAddress(address => ({
            ...address,
            [input]: value
        }))
    }
    const initSubscriptionItems = [
        {
            id: 1,
            time: 'Kein Abo',
            discount: 0
        },
        {
            id: 2,
            time: '3 Monate',
            discount: 10
        },
        {
            id: 3,
            time: '6 Monate',
            discount: 20
        },
        {
            id: 4,
            time: '12 Monate',
            discount: 30
        },
    ]
    const [bookingTotal, setBookingTotal] = useState(0);
    const [bookingAppointmentType, setBookingAppointmentType] = useState('');
    const [bookingDiscount, setBookingDiscount] = useState(null)
    const [lessonsAtHome, setLessonsAtHome] = useState(false)
    const [instrumentTransactionType, setInstrumentTransactionType] = useState('')
    const [instrumentSelected, setInstrumentSelected] = useState(false)
    const [selectedSubscribe, setSelectedSubscribe] = useState('')
    useEffect(() => {
        setBookingTotal(
            (
                bookingAppointmentType !== '' ?
                    (bookingAppointmentType === 'Wöchentlich' ? 100 : 50) : 0
            ) +
            (bookingDiscount ? (Number(bookingDiscount) * -1) : 0) +
            (lessonsAtHome ? (5 * 4) : 0) +
            (instrumentSelected ? 10 : 0)
        )
    }, [bookingAppointmentType, bookingDiscount, lessonsAtHome, instrumentTransactionType, instrumentSelected])
    useEffect(() => {
        console.log('bookingAppointmentType: ', bookingAppointmentType)
    }, [bookingAppointmentType])
    const [transactionType, setTransactionType] = useState('Leihen')
    const handleInstrumentTransactionType = () => {
      if (transactionType === 'Leihen') {
        setTransactionType('Kaufen')
      } else {
        setTransactionType('Leihen')
      }
    }
    const bookingPriceTable = (
        <div
            className={`${progress === 10 ? 'col-lg-7 booking-summary-info-container' : 'col-lg-4'} d-flex ${width < 1024 ? 'justify-content-center' : 'justify-content-end'} px-3 orderContainer`}>
            {
                (progress === 10 && width > 1024) && (
                    <div className="booking-summary-info">
                        <p className="pt-sm-4 font-weight-bold booking-summary__title" style={{
                            marginBottom: '4px'
                        }}>Infos über deine Lesson</p>
                        <p className="font-weight-bold">Learn Djambe like a pro</p>
                        <div className="booking-summary-info__classes">
                            <p className="font-weight-bold booking-summary-info__title">Unterricht</p>
                            <div>
                                <div className="booking-summary-info__class">
                                    <img src={User} alt="user" style={{
                                        width: '20px',
                                        height: 'auto',
                                        marginRight: '5px'
                                    }} />
                                    <p className="" style={{ margin: 0 }}>Einzelunterricht</p>
                                </div>
                                <div className="booking-summary-info__class">
                                    <img src={Guitar} alt="guitar" style={{
                                        width: '20px',
                                        height: 'auto',
                                        marginRight: '5px'
                                    }} />
                                    <p className="" style={{ margin: 0 }}>Gitarre</p>
                                </div>
                            </div>
                            <div>
                                <div className="booking-summary-info__class">
                                    <img src={Erwachsene} alt="erwachsene" style={{
                                        width: '20px',
                                        height: 'auto',
                                        marginRight: '5px'
                                    }} />
                                    <p className="" style={{ margin: 0 }}>Für Erwachsene</p>
                                </div>
                                <div className="booking-summary-info__class">
                                    <img src={Anfanger} alt="anfanger" style={{
                                        width: '20px',
                                        height: 'auto',
                                        marginRight: '5px'
                                    }} />
                                    <p className="" style={{ margin: 0 }}>Anfänger</p>
                                </div>
                            </div>
                        </div>
                        <div className="booking-summary-info__trainer">
                            <p className="font-weight-bold booking-summary-info__title">Trainer</p>
                            <div className="booking-summary-info__trainer-verified">
                                <img src={TrainerImage} alt="trainer" style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    marginRight: '12px'
                                }} />
                                <div className="booking-summary-info__trainer-verified-name">
                                    <span>Dimi</span>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                        <img src={Checked} alt="checked" style={{
                                            width: '18px',
                                            height: '18px',
                                            marginRight: '5px'
                                        }} />
                                        <span>Verifizierter Trainer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="booking-summary-info__ort">
                            <div className="booking-summary-info__ort-header">
                                <p className="font-weight-bold booking-summary-info__title">Ort</p>
                                <div className="booking-summary-info__settings-container">
                                    <img src={Settings} alt="settings" />
                                </div>
                            </div>
                            <div className="booking-summary-info__trainer-verified">
                                <img src={Cycling} alt="trainer" style={{
                                    width: '36px',
                                    height: 'auto',
                                    marginRight: '5px'
                                }} />
                                <span className="">Trainer unterrichtet<br /> bei dir zu Haus</span>
                            </div>
                        </div>
                        <div className="booking-summary-info__termine">
                            <div className="booking-summary-info__termine-header">
                                <p
                                    className="booking-summary-info__termine-header font-weight-bold booking-summary-info__title">Termine</p>
                                <div className="booking-summary-info__settings-container">
                                    <img src={Settings} alt="settings" />
                                </div>
                            </div>
                            <div className="booking-summary-info__termine-content">
                                <img src={Calendar} alt="trainer" style={{
                                    width: '36px',
                                    height: 'auto',
                                    marginRight: '5px'
                                }} />
                                <span className="">Mittwochs<br /> 11:30 Uhr, <b>wöchentlich</b></span>
                            </div>
                        </div>
                    </div>
                )
            }
            <div
                className={`d-flex flex-column ${width > 767 && 'border px-4'} px-2 pt-4 mb-4 bg-white orderBox ${bookingTotal === 0 ? 'pb-3' : 'pb-4'}`}
                style={{ borderRadius: '2rem', height: 'fit-content', boxShadow: (progress < 10 && width > 767) && "rgb(0 0 0 / 12%) 0px 6px 16px" }}>
                <img src={BookingBackgroundPriceTable} alt="bookingBackground" width="300px" style={{ margin: '0 auto', borderRadius: '24px' }} />
                <div className="">
                    <h5 className="text-center pb-2 pt-4" style={{ display: width > 1024 ? 'none' : 'block' }}>Learn
                        Djambe traditionally</h5>
                    <h4 className="text-center mb-1 mt-3">20€</h4>
                    <p className="text-center ">pro Unit a 45 Minuten</p>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Servicegebühr pro Einheit</span>
                        <span>5€</span>
                    </div>
                    {/* {
                        initSubscriptionItems?.length > 0 &&
                        <div className="booking-subscribe-boxes">
                            {
                                initSubscriptionItems.map((item, index) => (
                                    <div key={index} className={`booking-subscribe-boxes__item ${selectedSubscribe.id === item.id? 'booking-subscribe-boxes__item--active': ''}`}>
                                        <input 
                                            type="radio" name="booking-subscribe" className="booking-subscribe-boxes__radio" 
                                            onChange={e => {
                                                console.log('setSelectedSubs---', item)
                                                setSelectedSubscribe(item)}}
                                        />
                                        <p className="booking-subscribe-boxes__time">{item.time}</p>
                                        <p className="booking-subscribe-boxes__charge">{`-${item.discount}%`}</p>
                                    </div>
                                ))
                            }
                        </div>
                    } */}

                    {
                        bookingAppointmentType && (
                            <>
                                <div className="d-flex justify-content-between py-2">
                                    <p className="mb-0">25€ x {bookingAppointmentType === 'Wöchentlich' ? '4' : '2'}</p>
                                    <p className="mb-0">{25 * (bookingAppointmentType === 'Wöchentlich' ? 4 : 2)}</p>
                                </div>
                            </>
                        )
                    }
                    {
                        lessonsAtHome && (
                            <div className="d-flex justify-content-between py-2">
                                <p className="mb-0">5€ Anfahrt x 4</p>
                                <p className="mb-0">20€</p>
                            </div>
                        )
                    }
                    {
                        bookingDiscount && (
                            <div className="d-flex justify-content-between py-2">
                                <p className="mb-0">- {bookingDiscount}% Abo Rabatt</p>
                                <p className="mb-0">-{bookingDiscount}€</p>
                            </div>
                        )
                    }
                    {
                        instrumentSelected && (
                            <div className="d-flex justify-content-between py-2">
                                <p
                                    className="mb-0">{instrumentTransactionType === 'Leihen' ? 'Leihinstrument' : 'Instrument'}</p>
                                <p className="mb-0">10€</p>
                            </div>
                        )
                    }
                    {
                        bookingTotal !== 0 && (
                            <>
                                <div className="divider my-2"></div>
                                <div className="d-flex justify-content-between font-weight-bold">
                                    <p className="mb-0">Summe pro Monat</p>
                                    <p className="mb-0">{bookingTotal > 0 ? bookingTotal : 0}€</p>
                                </div>
                                {/* <div className="d-flex justify-content-between">
                                    <p className="mb-0">Summe 6 Monate(Inkl. MwSt.)</p>
                                    <p className="mb-0">799.68€</p>
                                </div> */}
                            </>
                        )
                    }
                    {/* <div className="d-flex flex-column"> */}
                    {/* <div className="d-flex justify-content-between">
                            <p className="mb-0">25€ x 4</p>
                            <p className="mb-0">100€</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p className="mb-0">10€ Anfahrt x4</p>
                            <p className="mb-0">40€</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p className="mb-0">- 20% Rabatt</p>
                            <p className="mb-0">-8€</p>
                        </div> */}
                    {/* <div className="divider my-2"></div>
                        <div className="d-flex justify-content-between">
                            <p className="mb-0">Summe pro Monat</p>
                            <p className="mb-0">133,28€</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p className="mb-0">Summe 6 Monate(Inkl. MwSt.)</p>
                            <p className="mb-0">799.68€</p>
                        </div>

                    </div> */}

                    {
                        (width < 1024 && progress === 9) && (
                            <div className="" style={{ marginTop: '25px' }}>
                                <button className="btn btn-primary text-light mt-3 mb-2 py-2 booking-weiter-cta"
                                    style={{
                                        width: '14rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} onClick={() => {
                                        setProgress(progress + 1)
                                    }}>
                                    <img src={LockIcon} alt={"lock"} width={"16px"} height={"16px"} style={{ marginRight: '8px' }} />
                                    <span>Buchung anfragen</span>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
    return (
        <div className="container booking" style={{ marginTop: `${width >= 1024 ? '14vh' : '24px'}` }}>
            <Switch>
                <Route exact path={path}>
                    <div>
                        <div className={`row justify-content-between ${progress === 8 ? 'align-items-center booking-container-space-between' : ''}`}>
                            {(width > 1024 || (width <= 1024)) &&
                                <div
                                    className={`${progress === 8 ? 'col-lg-5' : 'col-lg-8 pb-5'} ${(progress === 8 && width > 1024) ? '' : width > 767 ? '' : 'px-4'} bookingContainer`}
                                    style={{
                                        marginBottom: progress !== 8 ? '109px' : '',
                                        paddingBottom: 0
                                    }}>
                                    <div className={`flex-column mb-4 ${width <= 1024 ? '' : 'mt-3'}`}
                                        style={{ display: ((width <= 1024 && progress === 7) || (progress === 8 && width > 1024)) ? 'none' : 'flex' }}>
                                        {/* <div className="d-flex justify-content-around mb-3 pt-5 pt-sm-2" style={{ order: width <= 1024 ? '2' : '1' }}> */}
                                        {/*{(width > 1024 || (width < 1024 && progress === 1)) && <span className={"cursor-pointer " + (progress === 1 ? 'font-weight-bold' : '')} onClick={() => { setProgress(1) }}>Vorstellung</span>}*/}
                                        {/*{(width > 1024 || (width < 1024 && progress === 2)) && <span className={"cursor-pointer " + (progress === 2 ? 'font-weight-bold' : '')} onClick={() => { setProgress(2) }}>Zahlungsinfos</span>}*/}
                                        {/*{(width > 1024 || (width < 1024 && progress === 3)) && <span className={"cursor-pointer " + (progress === 3 ? 'font-weight-bold' : '')} onClick={() => { setProgress(3) }}>Fertig</span>}*/}
                                        {/*</div>*/}
                                        <div className="progress" style={{
                                            borderRadius: '1rem',
                                            order: width <= 1024 ? '1' : '2',
                                            height: width < 768 ? '28px' : ''
                                        }}>
                                            <div className="progress-bar bg-primary"
                                                style={{
                                                    width: `${(progress / 7) * 100}%`
                                                }}
                                                role="progressbar"
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    {progress === 1 &&
                                        <div className={width <= 1024 ? 'text-center' : ''}>
                                            <div className="booking-instrument__option-select">
                                                <div
                                                    className={`${transactionType === 'Leihen' ? 'booking-instrument__option-active' : ''} booking-instrument__option--lend`}
                                                    onClick={handleInstrumentTransactionType}><span>Leihen</span></div>
                                                <div
                                                    className={`${transactionType === 'Kaufen' ? 'booking-instrument__option-active' : ''} booking-instrument__option--buy`}
                                                    onClick={handleInstrumentTransactionType}><span>Kaufen</span></div>
                                            </div>
                                            <h1 className='category-select-title'>Wie willst du lernen?  </h1>
                                            <h1 className='category-select-des'>Du kannst bei dieser Experience ganz normalen persönlichen Unterricht bekommen oder via Video Online lernen.</h1>
                                            <div className='category-select__categories2'>
                                                <span className="checkbox">
                                                    <span className="wrapper2" onClick={() => setSelectedCategory(2)} style={{
                                            border: selectedCategory == 2 ? '2px solid #4ad9ca' : '2px solid #d2d2d2',
                                        }}>
                                                        <img src={ModeOne} />
                                                        <span className='category-name'>Leihinstrument</span>
                                                        <span className='category-name-des'>Du zahlst eine monatliche Leihgebühr </span>
                                                    </span>
                                                </span>
                                                <span className="checkbox">
                                                    <span className="wrapper2" onClick={() => setSelectedCategory(3)} style={{
                                            border: selectedCategory == 3 ? '2px solid #4ad9ca' : '2px solid #d2d2d2',
                                        }}>
                                                        <img src={ModeTwo} />
                                                        <span className='category-name'>Kaufen</span>
                                                        <span className='category-name-des'>Du kaufst das Instrument und es gehört dir</span>
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="booking-cta-container">
                                                <button className="btn btn-primary text-light mt-3 mb-2 py-2 booking-weiter-cta"
                                                    style={{ width: '14rem' }} onClick={() => {
                                                        setProgress(progress + 1)
                                                    }}>Weiter
                                                </button>
                                                {width > 1024 && <p>Dir wird noch nichts berechnet</p>}
                                            </div>
                                        </div>}
                                    {progress === 2 &&
                                        <div className={width <= 1024 ? 'text-center' : ''}>
                                            <p className="pt-sm-4 font-weight-bold" style={{ fontSize: '20px' }}>Nachricht an
                                                den/die Trainer/in</p>
                                            <p style={{ fontSize: '14px' }}>Stell dich TRAINERNAME vor. Du kannst nach Vollendung
                                                deiner Buchungsanfrage direkt mit dem TRAINERNAME chatten</p>
                                            <div className="booking-verified-trainer">
                                                <div className="booking-verified-trainer__img-container">
                                                    <img className="booking-verified-trainer__img" src={TrainerImage}
                                                        alt="booking-verified-trainer" />
                                                </div>
                                                <div className="booking-verified-trainer__trainer-name-container">
                                                    <p className="booking-verified-container__trainer-name">Dimi</p>
                                                    <div className="booking-verified-trainer__verified-logo-container">
                                                        <img className="booking-verified-trainer__verified-logo" src={Checked}
                                                            alt="verified logo" />
                                                        <div className="booking-verified-trainer__verified-text-container">
                                                            <p className="booking-verified-trainer__verified-text">Verifizierter
                                                                Trainer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <textarea className="form-control mb-2 px-3 pt-4 booking-progress-one-textarea" placeholder="Hi, ich bin"
                                                style={{ minHeight: "7rem", borderRadius: '1.5rem', textAlign: 'center' }} />

                                            <div
                                                className={' d-flex align-items-center py-2 ' + (width <= 1024 ? 'justify-content-left' : '')}>
                                                <div className="custom-control custom-checkbox py-2">
                                                    <input type="checkbox" className="custom-control-input" id="mein" />
                                                    <label className="custom-control-label" htmlFor="mein" onClick={() => {
                                                        setNamen(!namen)
                                                    }}>Für mein/e Kinder</label>
                                                </div>
                                                {!namen && <input className="rounded border px-1 py-1 text-muted ml-3"
                                                    style={{ fontSize: '.8rem', width: '7rem' }}
                                                    placeholder="Namen" />}
                                            </div>
                                            <div className="booking-cta-container">
                                                <button className="btn btn-primary text-light mt-3 mb-2 py-2 booking-weiter-cta"
                                                    style={{ width: '14rem' }} onClick={() => {
                                                        setProgress(progress + 1)
                                                    }}>Weiter
                                                </button>
                                                {width > 1024 && <p>Dir wird noch nichts berechnet</p>}
                                            </div>


                                        </div>}
                              
                                    {
                                        progress === 3 && (
                                            <BookingAddress
                                                address={address}
                                                updateAddress={handleAddressChange}
                                                phoneNumber={phoneNumber}
                                                updatePhoneNumber={setPhoneNumber}
                                                setProgress={() => setProgress(progress + (phoneNumber ? 2 : 1))}
                                            />
                                        )
                                    }
                                    {
                                        progress === 4 && (
                                            <BookingMobile
                                                phoneNumber={phoneNumber}
                                                updatePhoneNumber={setPhoneNumber}
                                                setProgress={() => setProgress(progress + 1)}
                                            />
                                        )
                                    }
                                    {
                                        progress === 5 && (
                                            <BookingMobileVerification setProgress={() => setProgress(progress + 1)}
                                            />
                                        )
                                    }
                                    {
                                        progress === 6 && width > 1024 && (
                                            <BookingPayment setProgress={() => setProgress(progress + 1)} />
                                        )
                                    }
                                    {
                                        progress ===  7 && width <= 1024 && (
                                            bookingPriceTable
                                        )
                                    }
                                    {
                                        (progress === 6 && width <= 1024) && (
                                            <BookingPayment setProgress={() => setProgress(progress + 1)} />
                                        )
                                    }
                                    {
                                        (progress === 7 && width > 1024) && (
                                            <BookingSummary
                                                priceTable={bookingPriceTable}
                                            />
                                        )
                                    }
                                    {/*{*/}
                                    {/*    progress === 5 && */}
                                    {/*}*/}
                                    {/*{progress === 5 &&*/}
                                    {/*    <div className={width <= 1024 ? 'text-center' : ''}>*/}
                                    {/*        <p className="pt-sm-4 font-weight-bold">Verifizieren</p>*/}
                                    {/*        <p>Gib deine Mobilnummer an. Wir senden dir eine SMS mit Bestätigungscode zu.</p>*/}
                                    {/*        <PhoneInput*/}
                                    {/*            placeholder="Entrynumber"*/}
                                    {/*            international*/}
                                    {/*            value={phoneNumber}*/}
                                    {/*            defaultCountry="DE"*/}
                                    {/*            onChange={setPhoneNumber} />*/}
                                    {/*        <div>*/}
                                    {/*            <span className="pr-2">Vorwahl</span> <span>Mobilnummer</span>*/}
                                    {/*        </div>*/}
                                    {/*        <button className="btn btn-primary text-light mt-3 mb-2 py-2" style={{ width: '14rem' }} onClick={() => { setProgress(progress + 1) }}>SMS erhalten</button>*/}
                                    {/*        {width > 1024 && <p>Dir wird noch nichts berechnet</p>}*/}

                                    {/*    </div>*/}
                                    {/*}*/}

                                    {/*{*/}
                                    {/*    progress === 6 &&*/}
                                    {/*    <div className={width <= 1024 ? 'text-center' : ''}>*/}
                                    {/*        <p className="pt-sm-4 font-weight-bold">Nachricht an den/die Trainer/in</p>*/}
                                    {/*        <p>Stell dich TRAINERNAME vor. Du kannst nach Vollendung deiner Buchungsanfrage direkt mit dem TRAINERNAME chatten.</p>*/}
                                    {/*        <div className="d-flex align-items-start justify-content-center justify-content-sm-start">*/}
                                    {/*            <BookingOtp />*/}
                                    {/*        </div>*/}
                                    {/*        <p>Code eingebe</p>*/}
                                    {/*        <button className="btn btn-primary text-light mt-5 mb-2 py-2" style={{ width: '14rem' }} onClick={() => { setProgress(progress + 1) }}>SMS erhalten</button>*/}
                                    {/*        {width > 1024 && <p>Dir wird noch nichts berechnet</p>}*/}
                                    {/*    </div>*/}
                                    {/*}*/}
                                    {/*{progress === 9 &&*/}
                                    {/*    <Fragment>*/}
                                    {/*        <p className="pt-5 font-weight-bold text-center text-md-left">Wähle eine Zahlungsmethode</p>*/}
                                    {/*        <Bookingpayment fromBooking={true} />*/}
                                    {/*        <div className="d-flex flex-column align-items-center align-items-md-start">*/}
                                    {/*            <button className="btn btn-primary text-light mt-3 mb-2  px-3 py-2" onClick={() => { setProgress(progress + 1); toggleCompleteModal(!completeModal) }}>Zahlung bestätigen*/}
                                    {/*       </button>*/}
                                    {/*            <p className="font-12">Dir wird noch nichts berechnet.</p>*/}
                                    {/*        </div>*/}
                                    {/*    </Fragment>*/}
                                    {/*}*/}
                                    {/*{progress === 10 &&*/}
                                    {/*    //   className={className}*/}
                                    {/*    <Modal isOpen={completeModal} toggle={toggle} centered={true}>*/}
                                    {/*        <ModalBody className="completeModal">*/}
                                    {/*            <img src={CompleteModalImage} alt="complete" />*/}
                                    {/*        </ModalBody>*/}
                                    {/*    </Modal>*/}
                                    {/*}*/}
                                </div>
                            }

                            {width > 1024 && bookingPriceTable}
                            {/* {width > 1024 && bookingPriceTable} */}

                            {/* {(width <= 1024 && progress === 9) && bookingPriceTable} */}
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/group`}>
                    <GroupLessonBooking />
                </Route>
            </Switch>
        </div>
    )
}

export default BookingInstrumentBuy;
