import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./ViewListing.scss";
import Background from "../../../assets/images/experience-bg.png";
import Badge from "../../../assets/images/badge.png";
import Group from "../../group/Group";
import Trainer from "../../group/trainer/Trainer";
import Review from "../../group/review/Review";
import Suggesstion from "../../group/sugesstion/Suggesstion";
import useWindowResize from "../../../custom-hooks/useWindowResize";
import PriceTable from "../../priceTable/PriceTable";
import Flag from "../../../assets/images/flagGray.png";
import Erwachsene from "../../../assets/images/Erwachsene.png";
import Guitar from "../../../assets/images/guitar.png";
import Cycling from "../../../assets/images/Cycling.png";
import Einzel from "../../../assets/images/Einzel.png";
import Gruppe from "../../../assets/images/Gruppe.png";
import Anfänger from "../../../assets/images/Anfänger.png";
import Tag from "../../../assets/images/tag.png";
import ViewListingHeart from "../../../assets/images/ViewListingHeartIcon.png";
import ViewListingMapMarker from "../../../assets/images/viewListingMapMarker.png";
import ViewListingLeftChevron from "../../../assets/images/viewListingLeftChevron.png";
import ExperieceSearchBar from "../../layout/experieceSearchBar";
import experienceService from "../../../services/api/experienceService";
import avatarPlaceholder from "../../../assets/images/placeholder/avatar.png";
import Rating from "@material-ui/lab/Rating";
import Loader from "../../loader";
import ModeOne from "../../../assets/images/modeOne.png";
import ModeTwo from "../../../assets/images/modeTwo.png";
import ModeOne1 from '../../../assets/images/new/image16.png'
import ModeTwo2 from '../../../assets/images/new/image15.png'
import instrumentService from "src/services/api/instrumentService";
import { toastifyErrorMessage } from "src/components/Toastify/toastify";

const ViewListing = (props) => {
  const [experience, setExperience] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [newExperiences, setNewExperiences] = useState([]);
  const [isLocation, setLocation] = useState([]);

  const location = useLocation();


  let isMounted = true;
  const getSingleExperience = async () => {
    setLoading(true);
    const res = await experienceService.getSingle(location.state.uid);
    if (isMounted) {
      setExperience(res);
      setReviews(res.reviews);
      setLoading(false);
      setLocation(res.locations);
      // console.log("experience", res);
      // console.log("reviews", res.reviews);
    }
  }

  const getExperience = () => {
    setLoading(true)
    experienceService.getAll().then((res) => {
      if (isMounted) {
        setNewExperiences(res.results);
      }
    }).finally(() => {
      if (isMounted) {
        setLoading(false)
      }
    });
  }

  // console.log("experience",experience);


  function _getInstruments() {
    instrumentService.getAll().then((res) => {
      if (isMounted) {
        setInstruments(res.results);
      }
    });
  }


  const getAvatar = () => {
    if (experience.owner && experience.owner.avatar) {
      return experience.owner.avatar;
    }
    return avatarPlaceholder;
  };

  const getInstrumentName = () => {
    if (experience.instrument && experience.instrument.name) {
      return experience.instrument.name;
    }
    return "";
  };

  const getIcon = () => {
    if (experience.instrument && experience.instrument.icon) {
      return experience.instrument.icon;
    }
    return Guitar;
  };

  const getTrainerName = () => {
    if (
      experience.owner &&
      experience.owner.first_name &&
      experience.owner.last_name
    ) {
      return experience.owner.first_name + " " + experience.owner.last_name;
    }
    return "";
  };

  const { dimensions } = useWindowResize();
  const width = dimensions.width;
  const history = useHistory();
  const booking = () => {
    history.push("/booking", {
      width: width,
    });
  };
  let [scrollTop, setScrollState] = useState(false);
  const groupRef = useRef(null);

  
  useEffect(() => {
    const currentUser = localStorage.getItem('current_user');
    if (!currentUser) {
      history.push('/');
      toastifyErrorMessage("please login first!")
    } else {
      getSingleExperience();
      return () => { isMounted = false }
    }

  }, [location]);

  useEffect(() => {
    _getInstruments();
    return (() => { isMounted = false });
  }, [])

  useEffect(() => {
    getExperience();
    return (() => { isMounted = false });
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [width]);

  const handleScroll = () => {
    setScrollState(document.documentElement.scrollTop);
  };

  // useEffect(() => {
  //     if (width > 1024) {
  //         if (scrollTop > groupRef.current.offsetTop) {
  //             props.scrolledSection(true);
  //         } else {
  //             props.scrolledSection(false);
  //         }
  //     }
  // }, [scrollTop, width, props]);

  const getBanner = () => {
    if (experience.banner && experience.banner.image) {
      return experience.banner.image;
    }
    return Background;
  };

  const headerStyle = {
    background: `url(${getBanner()})`,
    backgroundPostion: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: width > 1024 ? "20rem" : "20rem",
    padding: "4rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    borderRadius: width <= 1024 ? "48px" : "48px",
    marginBottom: width <= 1024 ? "0" : "0",
    marginTop: width >= 1024 ? "100px" : "100px",
    width: width >= 1024 ? "80%" : "80%",
    marginLeft: width > 767 ? "auto" : "auto",
    marginRight: width > 767 ? "auto" : "auto",
  };

  const handleAddress = () => {
    history.push("/experience");
  };
  const filterPackages = () => {
    history.push("/experience");
  };

  return (
    <div>
      {loading ? (
        <Loader type={"propagate"} containerHeight={"60vh"} size={20} />
      ) : (
        <div>
          <Fragment>
            <div>
              <div className="viewlisting-mobile-header__chevron-container d-md-none d-flex">
                <img src={ViewListingLeftChevron} alt={"left"} />
              </div>
              <ExperieceSearchBar
                instruments={instruments}
                width={dimensions.width}
                onAddressChange={(address) => {
                  handleAddress(address);
                }}
                filterPackages={(type) => {
                  filterPackages(type);
                }}
              />
            </div>
          </Fragment>
          <div className="viewlisting-mobile-header__chevron-container2 d-md-block d-none">
            <img src={ViewListingLeftChevron} alt={"left"} />
          </div>
          <header style={headerStyle} className="">
            {/* <div className="viewlisting-mobile-header">
                            
                            <div className="viewlisting-mobile-header__right-content">
                                <div className="viewlisting-mobile-header__favourite">
                                    <img src={ViewListingHeart} alt="favourite" />
                                </div>
                                <div className="viewlisting-mobile-header__teilen">
                                    <span>Teilen</span>
                                </div>
                            </div>
                        </div> */}
            <div className="d-flex flex-column align-items-center pt-3">
              <figure style={{ position: "relative" }}>
                <img
                  src={getAvatar()}
                  alt="instructor"
                  className="rounded-circle imgBorder"
                  width="70px"
                  style={{ height: "auto" }}
                />
                <img
                  src={Badge}
                  alt="badge"
                  className="trianerBadge"
                  width="34px"
                />
              </figure>
              <h3 className="text-light text-center">{experience.title}</h3>
              <div className="d-flex mt-2">
                <Rating
                  name="read-only"
                  value={experience.avg_review_score}
                  readOnly
                />
              </div>
              <>
                <div className="viewlisting-favourite-container">
                  <img src={ViewListingHeart} alt="favourite" />
                </div>
                <div className="viewlisting-location-container">
                  <img src={ViewListingMapMarker} alt="marker" />
                  <span>Eppendorf</span>
                </div>
                <div className="viewlisting-share-container">
                  <span className="font-weight-bold">Teilen</span>
                </div>
              </>
            </div>
            { }
            {/*{*/}
            {/*    width > 1024 && <button className="btn btn-light headerButton">Fotos ansehen</button>*/}
            {/*}*/}
            {/*{*/}
            {/*    width < 1025 && <button className="btn btn-light headerButton"><img src={Freunden} alt="flag" width="20px" className="mr-2" />Jetzt teilen!</button>*/}
            {/*}*/}
            {/*{*/}
            {/*    width <= 1024 &&*/}
            {/*    <Fragment>*/}
            {/*        <h1 className="text-light pt-2"><span style={{ fontSize: '1.5rem' }}>ab</span>15€</h1>*/}
            {/*        <button className="btn btn-primary text-light mt-4 font-weight-bold musingoo-hero-button" onClick={booking}>Buchung anfragen</button>*/}
            {/*    </Fragment>*/}
            {/*}*/}
          </header>

          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-8 col-xl-8 pr-md-5 p-xs-3 align-items-center">
                <div className="d-flex flex-column align-items-center pt-4 px-4 px-sm-0 viewListingDetailsContainer">
                  <h4 className="text-center">Über die Experience</h4>
                  <p className="text-center mb-4">{experience.description}</p>
                  <div
                    className="d-flex"
                    style={{
                      flexDirection: "column",
                      marginTop: "20px",
                      width: width < 768 ? "100%" : "100%",
                    }}
                  >
                    <div
                      className="d-flex viewListingDetails desktop-rows"
                      style={{ display: width < 768 ? "block" : "block" }}
                    >
                      <div className="mr-2 d-flex flex-column align-items-center">
                        <img
                          src={getIcon()}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          {getInstrumentName()}
                        </p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Erwachsene}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          {experience.for_kids
                            ? "Für Kinder"
                            : "Für Erwachsene"}
                        </p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Cycling}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          Trainer unterrichtet bei <br />
                          dir zu Hause <br />
                          (auf Wunsch)
                        </p>
                      </div>
                    </div>
                    <div
                      className="d-flex viewListingDetails desktop-rows"
                      style={{ display: width < 768 ? "none" : "block" }}
                    >
                      {experience.experience_type == "PrivateLesson" ? (
                        <div className="ml-2 d-flex flex-column align-items-center">
                          <img
                            src={Einzel}
                            alt="icon"
                            width="40px"
                            height="40px"
                          />
                          <p className="text-center px-sm-5 mt-2">
                            {experience.experience_type}
                          </p>
                        </div>
                      ) : (
                        <div className="ml-2 d-flex flex-column align-items-center">
                          <img
                            src={Gruppe}
                            alt="icon"
                            width="40px"
                            height="40px"
                          />
                          <p className="text-center px-sm-5 mt-2">
                            Gruppenunterricht
                          </p>
                        </div>
                      )}
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Anfänger}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">Anfänger</p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img src={Tag} alt="icon" width="40px" height="40px" />
                        <p className="text-center px-sm-5 mt-2">
                          Abonnement <br />
                          verfügbar
                        </p>
                      </div>
                    </div>

                    <div
                      className="d-flex viewListingDetails mobile-rows"
                      style={{ display: width > 768 ? "none" : "block" }}
                    >
                      <div className="mr-2 d-flex flex-column align-items-center">
                        <img
                          src={getIcon()}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          {getInstrumentName()}
                        </p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Erwachsene}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          {experience.for_kids
                            ? "Für Kinder"
                            : "Für Erwachsene"}
                        </p>
                      </div>
                    </div>
                    <div
                      className="d-flex viewListingDetails mobile-rows"
                      style={{ display: width > 768 ? "none" : "block" }}
                    >
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Cycling}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          Trainer unterrichtet bei <br />
                          dir zu Haus (auf <br />
                          Wunsch)
                        </p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Einzel}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          Einzelunterricht
                        </p>
                      </div>
                    </div>
                    <div
                      className="d-flex viewListingDetails mobile-rows"
                      style={{ display: width > 768 ? "none" : "block" }}
                    >
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={Anfänger}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">Anfänger</p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img src={Tag} alt="icon" width="40px" height="40px" />
                        <p className="text-center px-sm-5 mt-2">
                          Abonnement <br />
                          verfügbar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center pt-4 px-4 px-sm-0 viewListingDetailsContainer">
                  <h4 className="text-center">Buchbar als</h4>
                  <div
                    className="d-flex"
                    style={{
                      flexDirection: "column",
                      marginTop: "20px",
                      width: width < 768 ? "100%" : "",
                    }}
                  >
                    <div
                      className="d-flex viewListingDetails desktop-rows"
                      style={{ display: width < 768 ? "none" : "block" }}
                    >
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={ModeOne}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          Real life experience
                        </p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={ModeTwo}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">Video Lesson</p>
                      </div>
                    </div>
                    <div
                      className="d-flex viewListingDetails mobile-rows"
                      style={{ display: width > 768 ? "none" : "block" }}
                    >
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={ModeOne}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">
                          Real life experience
                        </p>
                      </div>
                      <div className="ml-2 d-flex flex-column align-items-center">
                        <img
                          src={ModeTwo}
                          alt="icon"
                          width="40px"
                          height="40px"
                        />
                        <p className="text-center px-sm-5 mt-2">Video Lesson</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Trainer
                  name={getTrainerName()}
                  avatar={getAvatar()}
                  description={
                    "In dieser Experience geht es um Trommeln mit dem Jazz. Wir werden lernen  mehr lesen"
                  }
                  videoScr={"https://www.w3schools.com/html/mov_bbb.mp4"}
                ></Trainer>
                <Review
                  reviews={reviews}
                  lerninhalteReview={4}
                  freundlichkeitReview={5}
                  rerminfindungReview={3}
                  räumlichkeitenReview={4}
                />
              </div>
              {/* {width > 1024 && } */}
              {width > 1024 && (
                <PriceTable width={width} uid={location.state.uid} experience={experience} />
              )}
            </div>
            <div className="row" ref={groupRef}>
              <Group locations={isLocation} experience={experience}/>
              <Suggesstion width={width} experiences={newExperiences} />
            </div>
          </div>
          {width <= 1024 && (
            <div
              style={{ color: "#929292" }}
              className="mb-5 d-flex align-items-center justify-content-center text-gray"
            >
              <button className="btn pb-5 mb-5">
                <img src={Flag} alt="flag" width="20px" className="mr-2" />
                Dieses Inserat melden
              </button>
            </div>
          )}
          {width <= 1024 && scrollTop > 20 && (
            <div className="d-flex fixedButton p-4 justify-content-between align-items-center flex-wrap">
              <h2>
                <span style={{ fontSize: "1.5rem" }}>ab</span>
                {experience.base_unit_amount}€
              </h2>
              <button
                className="btn btn-primary font-weight-bold text-light py-3 px-3"
                onClick={booking}
              >
                Buchung anfragen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewListing;
