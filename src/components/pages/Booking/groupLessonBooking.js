import React, { useState, Fragment, useEffect } from 'react';
import Success from '../../../assets/images/success.png';
import BookingBackground from '../../../assets/images/bookingBackground.png'
import BookingBackgroundPriceTable from '../../../assets/images/experience-bg.png'
import useWindowResize from '../../../custom-hooks/useWindowResize';
import './booking.scss';
import PriceTable from '../../priceTable/PriceTable';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import BookingOtp from '../../bookingOtp/bookingOtp';
import Bookingpayment from './BookingPayment/bookingPayment';
import CompleteModalImage from '../../../assets/images/completeModal.gif';
import { Modal, ModalBody } from 'reactstrap';
import TrainerImage from '../../../assets/images/instructor.png'
import Checked from '../../../assets/images/check.png'
import BookingGroupSelect from './BookingGroupSelect'
import BookingSubscription from './BookingSubscription'
import BookingInstrument from './BookingInstrument'
import BookingAddress from './BookingAddress'
import BookingMobile from './BookingMobile'
import BookingMobileVerification from './BookingMobileVerification'
import BookingPayment from './BookingPayment'
import BookingSummary from './BookingSummary'
import User from '../../../assets/images/Einzel.png'
import Guitar from '../../../assets/images/guitar.png'
import Erwachsene from '../../../assets/images/Erwachsene.png'
import Anfanger from '../../../assets/images/Anfänger.png'
import Settings from '../../../assets/images/settings-booking.png'
import Cycling from '../../../assets/images/Cycling.png'
import Calendar from '../../../assets/images/termine.png'
import LockIcon from '../../../assets/images/bookingMobileLockIcon.png'

const GroupLessonBooking = (props) => {
    let [activePrice, setActivePrice] = useState(1);
    let [progress, setProgress] = useState(1);
    let [namen, setNamen] = useState(true);
    let [bookingBoxForMobile, setbookingBoxForMobile] = useState(false);
    const { dimensions } = useWindowResize();
    const width = dimensions.width;
    const [completeModal, setCompleteModal] = useState(false);

    const toggle = () => {
        setCompleteModal(prevState => !prevState);
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
    const [bookingGroupPrice, setBookingGroupPrice] = useState(null)
    const [bookingTotal, setBookingTotal] = useState(0);
    const [bookingAppointmentType, setBookingAppointmentType] = useState('');
    const [bookingDiscount, setBookingDiscount] = useState(null)
    const [lessonsAtHome, setLessonsAtHome] = useState(false)
    const [instrumentTransactionType, setInstrumentTransactionType] = useState('')
    const [instrumentSelected, setInstrumentSelected] = useState(false)
    useEffect(() => {
        setBookingTotal(
            (bookingDiscount ? (Number(bookingDiscount) * -1) : 0) +
            (bookingGroupPrice ? (bookingGroupPrice * 4) : 0) +
            (instrumentSelected ? 10 : 0)
        )
    }, [bookingAppointmentType, bookingDiscount, bookingGroupPrice, instrumentTransactionType, instrumentSelected])
    const bookingPriceTable = (
        <div className={`${progress === 9 ? 'col-lg-7 booking-summary-info-container' : 'col-lg-4'} d-flex ${width < 1024 ? 'justify-content-center' : 'justify-content-end'} px-4 orderContainer`}>
            {
                (progress === 9 && width > 1024) && (
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
                                <p className="booking-summary-info__termine-header font-weight-bold booking-summary-info__title">Termine</p>
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
            <div className={`d-flex flex-column ${width > 767 && 'border px-4'} px-2 pt-4 mb-4 bg-white orderBox ${bookingTotal === 0 ? 'pb-3' : 'pb-4'}`} style={{ borderRadius: '2rem', height: 'fit-content', boxShadow: (progress < 9 && width > 767) && "rgb(0 0 0 / 12%) 0px 6px 16px" }}>
                <img src={BookingBackgroundPriceTable} alt="bookingBackground" width="300px" style={{ margin: '0 auto', borderRadius: '24px' }} />
                <div className="px-4">
                    <h5 className="text-center pb-2 pt-4" style={{ display: width > 1024 ? 'none' : 'block' }}>Learn Djambe traditionally</h5>
                    <h4 className="text-center mb-1 mt-3">20€</h4>
                    <p className="text-center ">pro Unit a 45 Minuten</p>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Servicegebühr pro Einheit</span>
                        <span>5€</span>
                    </div>
                    {
                        bookingGroupPrice && (
                            <>
                                <div className="divider mb-2"></div>
                                <div className="d-flex justify-content-between py-2">
                                    <p className="mb-0">{bookingGroupPrice}€ Anfahrt x 4</p>
                                    <p className="mb-0">{bookingGroupPrice * 4}</p>
                                </div>
                            </>
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
                        lessonsAtHome && (
                            <div className="d-flex justify-content-between py-2">
                                <p className="mb-0">Anfahrt (Unterricht zu Hause)</p>
                                <p className="mb-0">5€</p>
                            </div>
                        )
                    }
                    {
                        instrumentSelected && (
                            <div className="d-flex justify-content-between py-2">
                                <p className="mb-0">{instrumentTransactionType === 'Leihen' ? 'Leihinstrument' : 'Instrument'}</p>
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
                        (width < 1024 && progress === 8) && (
                            <div className=""  style={{marginTop: '25px'}}>
                                <button
                                  className="btn btn-primary text-light mt-3 mb-2 py-2 booking-weiter-cta"  style={{
                                    width: '14rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                  onClick={() => { setProgress(progress + 1) }}>
                                    <img src={LockIcon} alt={"lock"} width={"16px"} height={"16px"} style={{marginRight: '8px'}}/>
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
            <div>
                <div className={`row justify-content-between ${progress === 9 ? 'align-items-center booking-container-space-between' : ''}`}>
                    {(width > 1024 || (width <= 1024)) &&
                        <div className={`${progress === 9 ? 'col-lg-5' : 'col-lg-7 pb-5'} ${(progress === 9 && width > 1024) ? 'pr-5' : width > 767 ? 'pr-5' : 'px-5'} bookingContainer`} style={{
                            marginBottom: progress !== 9 ? '109px' : '',
                            paddingBottom: 0
                        }}>
                            <div className={`flex-column mb-4 ${width <= 1024 ? '' : 'mt-3'}`} style={{ display: ((width <= 1024 && progress === 8) || (progress === 9 && width > 1024)) ? 'none' : 'flex' }}>
                                {/*<div className="d-flex justify-content-around mb-3 pt-5 pt-sm-2" style={{ order: width <= 1024 ? '2' : '1' }}>*/}
                                {/*    {(width > 1024 || (width < 1024 && progress === 1)) && <span className={"cursor-pointer " + (progress === 1 ? 'font-weight-bold' : '')} onClick={() => { setProgress(1) }}>Vorstellung</span>}*/}
                                {/*    {(width > 1024 || (width < 1024 && progress === 2)) && <span className={"cursor-pointer " + (progress === 2 ? 'font-weight-bold' : '')} onClick={() => { setProgress(2) }}>Zahlungsinfos</span>}*/}
                                {/*    {(width > 1024 || (width < 1024 && progress === 3)) && <span className={"cursor-pointer " + (progress === 3 ? 'font-weight-bold' : '')} onClick={() => { setProgress(3) }}>Fertig</span>}*/}
                                {/*</div>*/}
                                <div className="progress" style={{ borderRadius: '1rem', order: width <= 1024 ? '1' : '2', height: width < 768 ? '28px' : '' }}>
                                    <div className="progress-bar bg-primary"
                                        style={{
                                            width: `${(progress / 9) * 100}%`
                                        }}
                                        role="progressbar"
                                        aria-valuenow="75"
                                        aria-valuemin="0"
                                        aria-valuemax="100"> </div>
                                </div>
                            </div>
                            {progress === 1 &&
                                <div className={width <= 1024 ? 'text-center' : ''}>
                                    <p className="pt-sm-4 font-weight-bold" style={{ fontSize: '20px' }}>Nachricht an den/die Trainer/in</p>
                                    <p style={{ fontSize: '14px' }}>Stell dich TRAINERNAME vor. Du kannst nach Vollendung deiner Buchungsanfrage direkt mit dem TRAINERNAME chatten</p>
                                    <div className="booking-verified-trainer">
                                        <div className="booking-verified-trainer__img-container">
                                            <img className="booking-verified-trainer__img" src={TrainerImage} alt="booking-verified-trainer" />
                                        </div>
                                        <div className="booking-verified-trainer__trainer-name-container">
                                            <p className="booking-verified-container__trainer-name">Dimi</p>
                                            <div className="booking-verified-trainer__verified-logo-container">
                                                <img className="booking-verified-trainer__verified-logo" src={Checked} alt="verified logo" />
                                                <div className="booking-verified-trainer__verified-text-container">
                                                    <p className="booking-verified-trainer__verified-text">Verifizierter Trainer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control mb-2 px-3 pt-4 booking-progress-one-textarea" placeholder="Hi, ich bin" style={{ minHeight: "7rem", borderRadius: '1.5rem', textAlign: 'center' }} />
                                    <div className={' d-flex align-items-center py-2 ' + (width <= 1024 ? 'justify-content-left' : '')}>
                                        <div className="custom-control custom-checkbox py-2">
                                            <input type="checkbox" className="custom-control-input" id="mein" />
                                            <label className="custom-control-label" htmlFor="mein" onClick={() => { setNamen(!namen) }}>Für mein/e Kinder</label>
                                        </div>
                                        {!namen && <input className="rounded border px-1 py-1 text-muted ml-3" style={{ fontSize: '.8rem', width: '7rem' }} placeholder="Namen" />}
                                    </div>
                                    <div className="booking-cta-container">
                                        <button className="booking-weiter-cta btn btn-primary text-light mt-3 mb-2" style={{ width: '14rem' }} onClick={() => { setProgress(progress + 1) }}>Weiter</button>
                                        {width > 1024 && <p>Dir wird noch nichts berechnet</p>}
                                    </div>
                                </div>}

                            {/*{*/}
                            {/*    progress === 2 &&*/}
                            {/*    <div className={width <= 1024 ? 'text-center' : ''}>*/}
                            {/*        <p className="pt-sm-5 font-weight-bold">Der regelmäßige Termin dieser Experience ist:</p>*/}
                            {/*        <h2 className="mt-5">Mittwochs, 15:00 Uhr, zweiwöchentlich</h2>*/}
                            {/*        <h5 style={{ fontSize: '1.1rem' }} className="mb-5">Den ersten Starttermin vergibt TRAINERNAME, sobald die Gruppevollständig ist.</h5>*/}
                            {/*        <button className="btn btn-primary text-light mt-3 mb-2" style={{ width: '14rem' }} onClick={() => { setProgress(progress + 1) }}>Weiter</button>*/}
                            {/*        {width > 1024 && <p>Dir wird noch nichts berechnet</p>}*/}
                            {/*    </div>*/}
                            {/*}*/}

                            {
                                progress === 2 && <BookingGroupSelect
                                    setProgress={() => setProgress(progress + 1)}
                                    handleGroupPriceSelect={(val) => setBookingGroupPrice(val)}
                                />
                            }
                            {
                                progress === 3 && <BookingSubscription
                                    setProgress={() => setProgress(progress + 1)}
                                    handleBookingDiscount={(discount) => setBookingDiscount(discount)}
                                />
                            }
                            {
                                progress === 4 && <BookingInstrument
                                    setProgress={() => setProgress(progress + 1)}
                                    handleInstrumentTransactionType={(type) => setInstrumentTransactionType(type)}
                                    handleInstrumentSelect={(type) => setInstrumentSelected(type)}
                                />
                            }
                            {
                                progress === 5 && (
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
                                progress === 6 && (
                                    <BookingMobile
                                        phoneNumber={phoneNumber}
                                        updatePhoneNumber={setPhoneNumber}
                                        setProgress={() => setProgress(progress + 1)}
                                    />
                                )
                            }
                            {
                                progress === 7 && (
                                    <BookingMobileVerification setProgress={() => setProgress(progress + 1)}
                                    />
                                )
                            }
                            {
                                progress === 8 && width > 1024 && (
                                    <BookingPayment setProgress={() => setProgress(progress + 1)} />
                                )
                            }
                            {
                                progress === 8 && width <= 1024 && (
                                    bookingPriceTable
                                )
                            }
                            {
                                (progress === 9 && width <= 1024) && (
                                    <BookingPayment setProgress={() => setProgress(progress + 1)} />
                                )
                            }
                            {
                                (progress === 9 && width > 1024) && (
                                    <BookingSummary
                                        priceTable={bookingPriceTable}
                                    />
                                )
                            }
                        </div>
                    }
                    {
                        width > 1024 && bookingPriceTable
                    }

                    {/*{*/}
                    {/*    (width <= 1024 && !bookingBoxForMobile) &&*/}
                    {/*    <div className="col-12 priceTable">*/}
                    {/*        <PriceTable width={width} openBooking={setbookingBoxForMobile} class="pt-5" />*/}
                    {/*    </div>*/}
                    {/*}*/}
                </div>
            </div>
    )
}

export default GroupLessonBooking;