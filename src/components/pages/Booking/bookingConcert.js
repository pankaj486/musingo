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
import ModeOne from '../../../assets/images/modeOne.png'
import ModeTwo from '../../../assets/images/modeTwo.png'

const BookingConcert = (props) => {
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
    const bookingPriceTable = (
        <div
            className={`${progress === 10 ? 'col-lg-7 Concert-summary-info-container' : 'col-lg-4'} d-flex ${width < 1024 ? 'justify-content-center' : 'justify-content-end'} px-3 orderContainer`}>
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
                            </>
                        )
                    }


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
                        <div className={`row justify-content-between ${progress === 10 ? 'align-items-center booking-container-space-between' : ''}`}>
                            {(width > 1024 || (width <= 1024)) &&
                                <div
                                    className={`${progress === 10 ? 'col-lg-5' : 'col-lg-8 pb-5'} ${(progress === 10 && width > 1024) ? '' : width > 767 ? '' : 'px-4'} bookingContainer`}
                                    style={{
                                        marginBottom: progress !== 10 ? '109px' : '',
                                        paddingBottom: 0
                                    }}>
                                    <div className={`flex-column mb-4 ${width <= 1024 ? '' : 'mt-3'}`}
                                        style={{ display: ((width <= 1024 && progress === 9) || (progress === 10 && width > 1024)) ? 'none' : 'flex' }}>

                                        <div className="progress" style={{
                                            borderRadius: '1rem',
                                            order: width <= 1024 ? '1' : '2',
                                            height: width < 768 ? '28px' : ''
                                        }}>
                                            <div className="progress-bar bg-primary"
                                                style={{
                                                    width: `${(progress / 9) * 100}%`
                                                }}
                                                role="progressbar"
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    {progress === 1 &&
                                        <div className={width <= 1024 ? 'text-center' : ''}>
                                            <h1 className='category-select-title'>Anzahl der Tickets  </h1>
                                            <select class="form-select-custom" aria-label="Default select example">
                                                <option selected value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>
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
                                        progress === 2 && width > 1024 && (
                                            <BookingPayment setProgress={() => setProgress(progress + 1)} />
                                        )
                                    }
                                    {
                                        progress === 3 && width <= 1024 && (
                                            bookingPriceTable
                                        )
                                    }
                                    {
                                        (progress === 2 && width <= 1024) && (
                                            <BookingPayment setProgress={() => setProgress(progress + 1)} />
                                        )
                                    }
                                    {
                                        (progress === 3 && width > 1024) && (
                                            <BookingSummary
                                                priceTable={bookingPriceTable}
                                            />
                                        )
                                    }

                                </div>
                            }

                            {width > 1024 && bookingPriceTable}
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

export default BookingConcert;
