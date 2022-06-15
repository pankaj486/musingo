import React, { useState } from 'react';
import './sharedComponents.scss';
import Badge from '../../assets/images/badge.png';
import Advertisement from './advertisement';
import BackgroundImage from '../../assets/images/modalBackground.png'
import UpcomingEvent from './upcomingEvent';
import EventImage from '../../assets/images/experience-bg.png';
import UserImage from '../../assets/images/instructor.png';
import Community from './community';
import StatPol from './statPol';
// import BookingRequest from '../pages/Booking/BookingRequests/bookingRequest/bookingRequest';
import ParticipantImageCard from '../chat/Conversations/Conversation/ParticipantImageCard/ParticipantImageCard';
import Instructor from '../../assets/images/instructor.png';
import { useHistory } from 'react-router-dom';

export const SharedComponents = () => {

    const [progress, setProgress] = useState(100);
    const history = useHistory();

    return (
        <div className="container mt-5 pt-5">
            <div className='row pt-5 mt-5 align-items-center justify-content-center'>
                <div className='col-6 text-center'>
                    <div className='d-flex w-100 align-items-center justify-content-between'>
                        <p onClick={() => history.push({
                            pathname: '/dashboard',
                        })} className='font-weight-bold'>Dashboard</p>
                        <p onClick={() => history.push({
                            pathname: '/conversations',
                        })}>Chat</p>
                        <p onClick={() => history.push({
                            pathname: '/customerview',
                        })}>Meine Buchungen</p>
                        <p onClick={() => history.push({
                            pathname: '/trainerview',
                        })}>Kundenbuchungen</p>
                        <p onClick={() => history.push({
                            pathname: '/musicianview',
                        })}>Meine Inserate</p>
                    </div>
                </div>
            </div>
            <div className="defContainer mt-3 d-flex flex-column">
                <h2 className="text-center mb-4 py-4">Mein Dashboard</h2>
                <div className="defBorder text-center d-flex flex-column align-items-center p-5">
                    <h5>Vervollständige dein Profil</h5>
                    <p className="font-12">Dies erhöht deine Sichtbarkeit in unserer Community.</p>
                    <div className="progress mx-3 mt-2" style={{ height: '20px', width: '30vw', borderRadius: '10px' }}>
                        <div className="progress-bar bg-primary font-weight-bold" role="progressbar"
                            style={{ width: `${progress}%` }} aria-valuenow={progress}
                            aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button className="btn font-14 mt-4" style={{ border: '.2px solid black' }}>Zum Profil</button>
                </div>

                <div className="d-flex flex-column flex-sm-row mt-3">
                    <div className="defBorder text-center d-flex flex-column align-items-center flex-2 p-5 mr-1">
                        <h5>Neue Buchungsanfragen</h5>
                        <p className="font-12 pt-1">Du hast <a href='#' className="font-weight-bold"> 4 neue Buchungsanfragen</a></p>
                        <div className="d-flex">
                            <div className={`booking-request`} style={{ width: '360px', height: '82px' }}>
                                <div className="booking-request__side-content">
                                    <ParticipantImageCard image={Instructor} backgroundHeight={'82px'} />
                                </div>
                                <div className="booking-request__main-content">
                                    <div> </div>
                                    <div className="booking-request__instructor-details" style={{ paddingTop: '27px' }}>
                                        <img className="booking-requests__instructor-image" style={{ width: '40px', height: '40px' }} src={Instructor} alt={'props.title'} />
                                        <span className="booking-requests__instructor-name">Felix</span>
                                        <span className="booking-requests__price">152€</span>
                                    </div>
                                    <div className="booking-request__expires-in mb-2 ml-2"><span>Läuft ab in 2:15 h</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="defBorder text-center d-flex flex-column align-items-center flex-1 p-5 ml-1">
                        <h5>Tipps</h5>
                        <p className="font-12 mt-3">Poste Bilder und Videos deiner Experience im Feed</p>
                        <p className="font-12">Werde Supertrainer <img src={Badge} alt="alternate_image" width="30px" /> um dein Vertrauen zu verbessern</p>
                    </div>
                </div>


                {/* <div className="warnNotification mt-2">
                    <p className="mb-0">FELIX, du hast eine eigene Band oder bist Solokünstler? Dann möchten wir mit dir gerne eine kostenlose Kooperation eingehen.
                   Im Zuge der Kooperation schenken wir dir kostenlose Reichweite, eine Story zu deinem Profil und vieles mehr. Bewirb dich gerne <a href="#"> hier</a></p>
                </div> */}
                <div className="d-flex flex-column flex-sm-row">

                    <div className="d-flex flex-column flex-2">
                        {/* <div className="secondaryNotification mr-sm-2 mt-2" style={{ height: '155px' }}>
                            <h5>Neue Anfragen</h5>
                            <p className="mb-0 text-dark">Du hast 5 <a href="#">neue Buchungsanfragen!</a></p>
                        </div> */}

                        <div className="mt-5">
                            <h5>Inserate vervollständigen</h5>
                            <div className="d-flex flex-wrap mb-2">
                                <div className="mr-1 mt-1">
                                    <Advertisement size={'small'} backgroundImage={BackgroundImage} progress={60} />
                                </div>
                                <div className="mx-1 mt-1">
                                    <Advertisement size={'small'} backgroundImage={BackgroundImage} progress={80} />
                                </div>
                                <div className="mx-1 mt-1">
                                    <Advertisement size={'small'} backgroundImage={BackgroundImage} progress={100} />
                                </div>
                            </div>
                            <a href="#" className="font-weight-bold">Zu meinen Inseraten</a>
                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-between mt-5">
                            <div className="flex-2">
                                <h5>Community</h5>
                                <div style={{ maxWidth: '450px' }}>
                                    <Community tag={'Hat ein sucht TAG'} time={'Vor einer Stunde'} image={UserImage} />
                                    <div className="mt-2"></div>
                                    <Community tag={'Hat über eine Experience gepostet'} time={'Vor einer Stunde'} image={UserImage} />
                                    <div className="mt-2"></div>
                                </div>
                                <a href="#" className="font-weight-bold">Zum Feed</a>
                            </div>

                        </div>
                    </div>


                    <div className="d-flex flex-column flex-1">
                        {/* <div className="primaryNotification  ml-sm-2 mt-2" style={{ height: '155px' }}>
                            <h5>Tipp</h5>
                            <p className="mb-0 font-weight-bold text-dark">Poste Bilder und Videos deiner Experience im Feed
                    Werde Supertrainer <img src={Badge} width="30px" /> um dein Vertrauen zu verbessern</p>
                        </div> */}
                        <div className="mt-5">
                            <h5>Upcoming</h5>
                            <UpcomingEvent
                                date={'25'}
                                month={'März'}
                                time={'4:15 Uhr'}
                                title={'Grindelhof'}
                                image={EventImage}
                                imageTitle={'Learn Flamenco like a pro'}
                                groupName={'Gruppe A'}
                            />
                            <div className="mt-2"></div>
                            <UpcomingEvent
                                date={'25'}
                                month={'März'}
                                time={'4:15 Uhr'}
                                title={'Grindelhof'}
                                image={EventImage}
                                imageTitle={'Learn Flamenco like a pro'}
                                groupName={'Gruppe A'}
                            />
                            <div className="mt-2"></div>
                            <UpcomingEvent
                                date={'25'}
                                month={'März'}
                                time={'4:15 Uhr'}
                                title={'Grindelhof'}
                                image={EventImage}
                                imageTitle={'Learn Flamenco like a pro'}
                                groupName={'Gruppe A'}
                            />
                            <div className="mt-2"></div>
                            <a href="#" className="font-weight-bold">Zum Kalender</a>
                        </div>

                        <div className="mt-5" >
                            <h5>Stats und Profil</h5>
                            <div className="d-flex ">
                                <StatPol stat={'121'} label={'Buchungen'} />
                                <div className="mr-2"></div>
                                <StatPol stat={'5.0'} label={'Bewertung'} />
                                <div className="mr-2"></div>
                                <StatPol stat={'121'} label={'Buchungen'} />
                                <div className="mr-2"></div>
                                <StatPol stat={'121'} label={'Buchungen'} />
                            </div>
                            <div className="mt-2"></div>
                            <a href="#" className="font-weight-bold">Zu den Stats</a>
                        </div>
                    </div>

                </div>
                {/* <div className="d-flex mt-4 flex-column flex-sm-row justify-content-between">


                </div> */}

            </div >
        </div >
    )
}

export default SharedComponents;
