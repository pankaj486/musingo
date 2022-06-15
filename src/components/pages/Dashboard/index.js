import { Grid } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UpcomingEvent from "src/components/sharedComponents/upcomingEvent";
import useWindowResize from "src/custom-hooks/useWindowResize";
import { instrumentService } from "src/services/api";
import newsFeedImg from "../../../assets/icons/image4.png";
import SetupStep1 from "../../../components/dashboard/SetupStep1";
import SetupStep2 from "../../../components/dashboard/SetupStep2";
import SetupStep3 from "../../../components/dashboard/SetupStep3";
import SetupStep4 from "../../../components/dashboard/SetupStep4";
import SetupStep5 from "../../../components/dashboard/SetupStep5";
import SetupStep6 from "../../../components/dashboard/SetupStep6";
import helpData from "../../../data/help.json";
import EventImage from '../../../assets/images/experience-bg.png';
import BackgroundImage from '../../../assets/images/modalBackground.png'


import ListingMapMarkerComponent from "../Listing/mapMarker/ListingMapMarker";
import Posts from "./components/Posts";
import "./index.scss";
import Advertisement from "src/components/sharedComponents/advertisement";
import StatPol from "src/components/sharedComponents/statPol";
import MusicianPackage from "src/components/musicianView/musicianPackage";

const Dashboard = ({
    center = {
        lat: 59.955413,
        lng: 30.5
    },
    zoom = 11,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ["Step 1", "Step 2", "Step 3"];
    const displayStep = (step) => {
        switch (step) {
            case 1:
                return (
                    <div style={{
                        height: 400
                    }}>
                        <SetupStep1
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    </div>
                );
            case 2:
                return (
                    <div style={{
                        height: 400
                    }}>
                        <SetupStep2
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    </div>
                );
            case 3:
                return (
                    <div style={{
                        height: 400
                    }}>
                        <SetupStep3
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    </div>
                );
            case 4:
                return (
                    <div style={{
                        height: 400
                    }}>
                        <SetupStep4
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    </div>
                );
            case 5:
                return (
                    <div style={{
                        height: 400
                    }}>
                        <SetupStep5
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    </div>
                );
            case 6:
                return (
                    <div style={{
                        height: 400
                    }}>
                        <SetupStep6
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    </div>
                );
            default:
        }
    };
    const handleClick = (step) => {
        let newStep = currentStep;
        if (step === "next") {
            setCurrentStep(currentStep + 1);
        }
        if (step === "prev") {
            setCurrentStep(currentStep - 1);
        }
    };

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

    console.log(helpData);
    // const { dimensions } = useWindowResize();

    const [active, setActive] = useState(1);
    const [expand, setExpand] = useState(false);
    const [addressInput, setAddressInput] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const Months = [
        { name: "January" },
        { name: "February" },
        { name: "March" },
        { name: "April" },
        { name: "May" },
        { name: "June" },
        { name: "July" },
        { name: "August" },
        { name: "September" },
        { name: "October" },
        { name: "November" },
        { name: "December" },
    ];

    const [instruments, setInstruments] = useState([]);

    function _getInstruments() {
        instrumentService.getAll().then((res) => {
            setInstruments(res.results);
        });
    }

    useEffect(() => {
        _getInstruments();
    }, []);

    const handleChange = (address) => {
        setAddressInput(address);
    };

    const history = useHistory();


    return (
        <>
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
            </div>
            <div className="container pb-5 mb-5">
                <div className="pt-5 mt-5">
                    <div className="px-5">
                        <div className="booking-wrapper">
                            {/* left content */}
                            <div className="row">
                                <div className="col-6">

                                    <div className="booking-wrapper__inner mr-5">
                                        <div className="">
                                            <h1 className="booking-wrapper__inner-heading">
                                                News in der Scene
                                            </h1>
                                            <h2 className="booking-wrapper__inner--sub-heading">
                                                Du hast{" "}
                                                <span className="booking-wrapper__inner--sub-span">
                                                    15 neue Lessons, Konzerte, Instrumente und Jobs
                                                </span>{" "}
                                                in deiner Nähe!
                                            </h2>
                                            <div style={{ borderRadius: '30px', overflow: 'hidden' }}>

                                                <div className="mt-5 mb-5" style={{ height: 300, width: '100%', overflow: 'hidden', position: 'relative', zIndex: 1, borderRadius: 25 }} >
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
                                        <Grid container>
                                            {helpData?.map((item, index) => (
                                                <Grid
                                                    key={item}
                                                    items
                                                    xl="6"
                                                    lg="6"
                                                    md="6"
                                                    sm="6"
                                                    className="pt-5"
                                                >
                                                    <div className="card-wrapper">
                                                        <div className="card-wrapper__inner">
                                                            <img
                                                                className="booking-requests__instructor-image"
                                                                style={{ width: item.width, height: item.height, marginBottom: 10 }}
                                                                src={item.helpImg}
                                                                alt={"props.title"}
                                                            />
                                                            <h1 className="card-wrapper__inner--card-header">
                                                                {item.heading}
                                                            </h1>
                                                            <p className="card-wrapper__inner--card-desc">
                                                                {item.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Grid container>
                                            <div className="mt-5 pt-4">
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
                                        </Grid>
                                        <Grid container>
                                            <div className="mt-5 pt-4">
                                                <h5>Inserate vervollständigen</h5>
                                                <div className="d-flex flex-wrap mb-2">
                                                    <div className="">
                                                        <MusicianPackage dashboard progress={'20'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                                                    </div>
                                                    <div className="">
                                                        <MusicianPackage dashboard progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                                                    </div>
                                                    <div className="">
                                                        <MusicianPackage dashboard progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                                                    </div>
                                                </div>
                                                <a href="#" className="font-weight-bold">Zu meinen Inseraten</a>
                                            </div>
                                        </Grid>
                                        <Grid container>
                                            <div className="mt-5 pt-4" >
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
                                        </Grid>
                                    </div>
                                </div>

                                <div className="col-6">
                                    {/* right content */}
                                    <div className={`d-flex flex-column align-items-center`}>

                                        <div className=" d-flex flex-column align-items-center" >
                                            {displayStep(currentStep)}
                                        </div>
                                        <div className={`news-feedback-desc `}>
                                            <div className="news-feedback-desc__img-desc">
                                                <img
                                                    className="news-feedback-desc__img-desc--img"
                                                    src={newsFeedImg}
                                                    alt="musingo news feed"
                                                />
                                                <div className="news-feedback-desc__content">
                                                    <div className="news-feedback-desc__content--wrapper">
                                                        <div className="">
                                                            <h1 className="news-feedback-desc__heading">
                                                                News in feed
                                                            </h1>
                                                            <h2 className="news-feedback-desc__sub-heading">
                                                                Felix, there are 50 new posts.
                                                            </h2>
                                                            <div className="">
                                                                <Posts />
                                                                <Posts />
                                                                <Posts />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`news-feedback-desc `}>
                                        <div className="news-feedback-desc__img-desc2">
                                            <img
                                                className="news-feedback-desc__img-desc2--img2"
                                                src={BackgroundImage}
                                                alt="musingo news feed"
                                            />
                                            <div className="news-feedback-desc__content d-flex align-items-center justify-content-center">
                                                <div className="news-feedback-desc__content--wrapper">
                                                    <div className="">
                                                        <h1 className="news-feedback-desc__heading">
                                                        Become <br></br> Musingoo <br></br> Host
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default Dashboard;
