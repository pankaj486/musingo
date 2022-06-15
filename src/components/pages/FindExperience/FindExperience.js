import "./FindExperience.scss";
import "swiper/css/swiper.min.css";
import React, {Fragment,useContext,useEffect,useRef,useState,} from "react";
import { FilterContext } from "../../../context/filter/FilterContextProvider";
import { useHistory, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import Package from "../../package/Package";
import Background from "../../../assets/images/modalBackground.png";
import avatarPlaceholder from "../../../assets/images/placeholder/avatar.png";
import experiencePlaceholder from "src/assets/images/new/experience-placeholder.png";
import instrumentService from "src/services/api/instrumentService";
import GoogleMapReact from "google-map-react";
import FilterComponent from "../../filter/filter";
import MoreFilterComponent from "../../filter/moreFilter";
import MobileFilterComponent from "../../filter/mobileFilter";
import useWindowResize from "../../../custom-hooks/useWindowResize";
import GridIcon from "../../../assets/images/gridIcon.png";
import FilterIcon from "../../../assets/images/filter.png";
import CloseMap from "../../../assets/images/closeMap.png";
import Swiper from "swiper";
import MapMarkerComponent from "../../mapMarker/MapMarkerComponent";
import Gpscontroller from "../../mapMarker/gpsController";
import FullSizeController from "../../mapMarker/fullSizeController";
import FavouriteExperienceModal from "./FavouriteExperienceModal";
import ExperieceSearchBar from "../../layout/experieceSearchBar";
import experienceService from "../../../services/api/experienceService";
import LiveStream from "../LiveStream/live";
import Search from "../../../assets/images/searchOutline.png";
import Liste from "../../../assets/images/Liste.png";
import Group from "../../../assets/images/groupGray.png";
import Loader from "../../loader";

const FindExperience = (props) => {

  const {handleHeartButton} = props

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [fullSizeMap, setFullSizeMap] = useState(false);
  const [address, setAddress] = useState("");
  const [active, setActiveState] = useState(1);
  const [filterShow, setFilterShow] = useState(false);
  const [isKidModeActive, setIsKidModeActive] = useState(false);
  const [fitlerState, setFilterState] = useState(true);
  const [editExperiences, setEditExperiences] = useState(false);
  const [selectedExperiencesToDelete, setSelectedExperiencesToDelete] = useState([]);

  const history = useHistory();

  const filterContext = useContext(FilterContext);


  let isMounted = true;
  function _getExperiences() {
    setLoading(true);
    experienceService
      .getAll()
      .then((res) => {
        if (isMounted) {
          setExperiences(res.results);
          setLocations(res.results);
        }
      })
      .finally(() => setLoading(false));
  }

  function _getExperiencesWithFilter(url) {
    setLoading(true);
    experienceService
      .getAllWithFilter("?" + url)
      .then((res) => {
        setExperiences(res.results);
        setLocations(res.results);
      })
      .finally(() => setLoading(false));
  }

  function _getInstruments() {
    instrumentService.getAll().then((res) => {
      if (isMounted) {
        setInstruments(res.results);
      }
    });
  }

  useEffect(() => {
    _getInstruments();
    return (() => { isMounted = false });
  }, [])
 

  function setLocations(data) {
    let locations = [];

    if (data.length) {
      data.map((experience, index) => {
        // if (experience.locations.length) {
        if (experience.locations) {
          experience.locations.map((place, i) => {
            let item = {
              id: index,
              lat: place.coordinates.coordinates[1],
              lng: place.coordinates.coordinates[0],
              isActive: true,
              type: place.coordinates.type,
              groupType:
                experience.experience_type === "PrivateLesson"
                  ? "Single"
                  : "Group",
            };
            locations.push(item);
          });
        }
      });
    }
    setPlaces(locations);
    if (locations.length) {
      setCenter({
        lat: locations[0].lat,
        lng: locations[0].lng,
      });
    }
  }

  useEffect(() => {
    _getExperiences();
    return (() => { isMounted = false })
  }, []);

  function getAvatar(avatar) {
    if (avatar) {
      return avatar;
    }
    return avatarPlaceholder;
  }

  const GetLocation = () => {
    let location = useLocation();
    return location;
  };
  const getGroupType = (experience) => {
    if (experience.resourcetype == "PrivateLesson") {
      return "single";
    }
    return "group";
  };

  const initialPlaces = [
    {
      id: 1,
      lat: 59.955413,
      lng: 30.417458,
      isActive: false,
      type: "Unterricht",
      groupType: "Group",
    },
    {
      id: 2,
      lat: 59.955413,
      lng: 30.2,
      isActive: false,
      type: "Unterricht",
      groupType: "Single",
    },
    {
      id: 3,
      lat: 59.955413,
      lng: 30.5,
      isActive: false,
      type: "Instrumente",
      groupType: "Group",
    },
    {
      id: 4,
      lat: 59.955413,
      lng: 30.22,
      isActive: false,
      type: "Instrumente",
      groupType: "Single",
    },
    {
      id: 5,
      lat: 60,
      lng: 30.2,
      isActive: false,
      type: "Konzerte",
      groupType: "Group",
    },
    {
      id: 6,
      lat: 59.955413,
      lng: 30.21,
      isActive: false,
      type: "Jobs",
      groupType: "Single",
    },
    // {
    //     id: 7,
    //     lat: 59.955413,
    //     lng: 30.25,
    //     isActive: false,
    //     home: true,
    //     groupType: 'Single'
    // }
  ];

  const [center, setCenter] = useState({});
  const zoom = 10;
  
  const createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      zoomControl: true,
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_BOTTOM,
      },
      disableDefaultUI: true,
      draggable: dimensions.width <= 1024 ? false : true,
    };
  };
  let [places, setPlaces] = useState([]);

  let refArray = [];
  refArray = places.map((place) => {
    return React.createRef();
  });

  const { dimensions } = useWindowResize();
  let prevIndex = 0;
  let [mySwiper, setMySwiper] = useState(null);

  useEffect(() => {
    if (active === 2) {
      let mySwiper = new Swiper(".swiper-container", {
        spaceBetween: 20,
        loop: true,
        slidesPerView: "2",
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      setMySwiper(mySwiper);
      let sliderHeight = document.getElementById("swiper").offsetHeight;

      const screenHeight = document.documentElement.clientHeight;
      console.log(`${screenHeight - sliderHeight}px`);
      document.getElementById("map").style.height = `${screenHeight - sliderHeight
        }px`;
    }
  }, [active, dimensions]);

  const myRef = useRef(refArray);
  const mapRef = useRef(null);

  // const scrollToRef = (ref) => window.scrollTo(0, ref.current.getBoundingClientRect().top - '12rem')

  const executeScroll = (hoverdPlace) => {
    myRef.current[prevIndex].current.style.boxShadow = "none";
    myRef.current[prevIndex].current.style.transform = "scale(1)";

    const index = places.findIndex((place) => {
      if (place.lat === hoverdPlace.lat && place.lng === hoverdPlace.lng) {
        return true;
      }
      return false;
    });
    prevIndex = index;
    myRef.current[index].current.style.transform = "scale(1.1)";
    myRef.current[index].current.style.boxShadow =
      "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)";
    // scrollToRef(myRef.current[index]);
  };

  const resetPackage = () => {
    // myRef.current[prevIndex].current.style.boxShadow = 'none';
    // myRef.current[prevIndex].current.style.transform = 'scale(1)';
  };

  const onHover = (place) => {
    // executeScroll(place);
  };

  const onPlaceSelect = (index) => {
    const placesWithHover = places.map((place, i) => {
      if (index === i) {
        place.isActive = true;
      } else {
        place.isActive = false;
      }
      return place;
    });
    places = [...placesWithHover];
    setPlaces(places);
  };

  const resetPlaces = () => {
    const placesWithHover = places.map((place, i) => {
      place.isActive = false;
      return place;
    });
    places = [...placesWithHover];
    setPlaces(places);
  };

  const handlePackageClick = (uid) => {
    history.push({
      pathname: "/viewListing",
      state: { uid: uid },
    });
  };

  
  const filterPackages = (type) => {
    console.log("zxcvbnm,.0", type);
    setPlaces(initialPlaces.filter((place) => place.type === type));
    setFilterState(true);
    filterContext.setFilterType(type);
  };

  const filterPackagesBySecondFilter = (type, criteria) => {
    if (type === "group") {
      setPlaces(
        places.filter((place) => place.groupType.toLowerCase() === criteria)
      );
    }
  };

  const setUserLocation = (map) => {
    console.log(map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // map.setCenter(latlng);
        // clearInterval(animationInterval);
        // secondChild.style['background-position'] = '-144px 0';
      });
    } else {
      alert("You need to allow location");
    }
  };

  const toggleFullSize = () => {
    setFullSizeMap(!fullSizeMap);
  };

  const trackMyLocation = (map, maps) => {
    const centerControlDiv = document.createElement("div");
    ReactDOM.render(
      <Gpscontroller handleClick={() => setUserLocation(map)} />,
      centerControlDiv
    );

    map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
  };

  const fullSizeController = (map, maps) => {
    const centerControlDiv = document.createElement("div");
    ReactDOM.render(
      <FullSizeController
        fullSizeMap={fullSizeMap}
        handleClick={() => toggleFullSize()}
      />,
      centerControlDiv
    );
    map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
  };
  const handleHideModal = () => {
    if (props.showFavExperienceModal) {
      setSelectedExperiencesToDelete([]);
    }
    if (editExperiences) {
      setEditExperiences((prevState) => !prevState);
    }
    props.handleShowFavExperienceModal();
  };
  const handleFertigClick = () => {
    if (props.showFavExperienceModal) {
      setSelectedExperiencesToDelete([]);
    }
    if (editExperiences) {
      setEditExperiences((prevState) => !prevState);
    }
  };
  const handleToggleEditExperience = () => {
    setEditExperiences((prevState) => !prevState);
  };
  const handleExperienceSelect = (id) => {
    if (!selectedExperiencesToDelete.includes(id)) {
      setSelectedExperiencesToDelete((prevState) => [...prevState, id]);
    } else {
      const selectedIds = [...selectedExperiencesToDelete];
      selectedIds.splice(
        selectedIds.findIndex((selectedId) => selectedId === id),
        1
      );
      setSelectedExperiencesToDelete([...selectedIds]);
    }
  };
  const handleDeleteExperience = () => {
    const currentExperiences = [...favExperiences];
    selectedExperiencesToDelete.map((selectedId) => {
      currentExperiences.splice(
        currentExperiences.findIndex((current) => current.id === selectedId),
        1
      );
    });
    setFavExperiences([...currentExperiences]);
    if (props.showFavExperienceModal) {
      setSelectedExperiencesToDelete([]);
    }
    if (editExperiences) {
      setEditExperiences((prevState) => !prevState);
    }
  };
  const [favExperiences, setFavExperiences] = useState([]);


  const handleFavExperienceSelect = (event, uid) => {
    // TODO HeartButton
    // handleHeartButton();
    // event.stopPropagation();
    if (favExperiences.find((fav) => fav.uid === uid)) {
      //remove
      const newData = favExperiences.splice(
        favExperiences.findIndex((selected) => selected.uid === uid),
        1
      );
      setFavExperiences(newData);
    } else {
      const favourite = experiences.find((exp) => exp.uid === uid);
      setFavExperiences((prevState) => [...prevState, favourite]);
    }
  };

  const handleAddress = (addressObj) => {
    setAddress(addressObj.address);
    setCenter({ lat: addressObj.lat, lng: addressObj.lng });
  };

  const getBanner = (experience) => {
    if (experience.banner && experience.banner.image) {
      return experience.banner.image;
    }
    return Background;
  };

  // useEffect(() => {
  //   console.log("ex", experiences);
  //   console.log("places", places);
  // }, []);

  return (
    <div>
      {loading ? (
        <Loader type={"propagate"} containerHeight={"60vh"} size={20} />
      ) : (
        <div style={{ width: "100%" }} className="d-flex flex-column">
          <FavouriteExperienceModal
            showModal={props.showFavExperienceModal}
            handleShowModal={props.handleShowFavExperienceModal}
            handleHideModal={handleHideModal}
            favourites={favExperiences}
            editExperiences={editExperiences}
            handleToggleEditExperience={handleToggleEditExperience}
            selectedExperiencesToDelete={selectedExperiencesToDelete}
            handleExperienceSelect={handleExperienceSelect}
            handleDeleteExperience={handleDeleteExperience}
            handleFavExperienceSelect={handleFavExperienceSelect}
            handleFertigClick={handleFertigClick}
          />
          {dimensions.width > 1024 && GetLocation().pathname === "/experience" && (
            <Fragment>
              <div style={{ visibility: filterShow ? "hidden" : "visible" }}>
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
          )}
          {dimensions.width <= 1024 && (
            <MobileFilterComponent
              modal={filterShow}
              toggle={() => setFilterShow(!filterShow)}
              propFilterType={filterContext.filterType}
            />
          )}
          {dimensions.width <= 1024 && (
            <div
              className={
                "d-flex flex-column justify-content-center align-items-center places " +
                (active === 1 ? "pb-3" : "")
              }
            >
              <div
                style={{
                  position: active === 2 ? "absolute" : "",
                  top: active === 2 ? "10px" : "",
                }}
              >
                <div className="mt-5 bottomSearchbar pt-2 d-flex">
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
                <div className="d-flex justify-content-center align-items-center filterBoxContainer ">
                  {/* className={(active === 2 ? 'text-grey-light ' : 'text-primary ') + "font-weight-bold mr-1 bg-white"} */}
                  {fitlerState && (
                    <div
                      className="firstButton"
                      onClick={() => {
                        setFilterShow(!filterShow);
                      }}
                    >
                      <img src={FilterIcon} alt="filter" width="20px" />
                    </div>
                  )}
                  <div
                    className={
                      "text-primary font-weight-bold bg-white" +
                      (!fitlerState ? "ml-1" : "")
                    }
                    style={{ paddingLeft: fitlerState ? "10px" : "0px" }}
                    onClick={() => {
                      setActiveState(active === 1 ? 2 : 1);
                      props.toggleNavBar();
                    }}
                  >
                    {active === 1 && (
                      <i
                        className="fa fa-map-marker mt-1"
                        style={{ fontSize: "25px" }}
                        aria-hidden="true"
                      ></i>
                    )}
                    {active === 2 && (
                      <img src={GridIcon} alt="gridIcon" width="25px" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PackageSection */}
          {(dimensions.width > 1024 ||
            (dimensions.width <= 1024 && active === 1)) && (
              <div
                className={
                  "pt-1 p-3 pt-5 mr-sm-5 ml-sm-5 pb-sm-0 packages mb-5 mb-md-0" +
                  (fullSizeMap ? "fullSizeFilter pt-sm-0" : "pt-sm-5")
                }
                style={{
                  top:
                    fullSizeMap && address !== ""
                      ? "96px"
                      : fullSizeMap && address === ""
                        ? "90px"
                        : "",
                  width: dimensions.width <= 1024 || fullSizeMap ? "" : "54vw",
                }}
              >
                {address && <h4 className="pt-4">{address}</h4>}

                {fitlerState && dimensions.width > 1024 && (
                  <FilterComponent
                    instruments={instruments}
                    // isMainKidModeActive={isKidModeActive}
                    // setMainIsKidModeActive={setIsKidModeActive}
                    filterUrl={(url) => _getExperiencesWithFilter(url)}
                    filterPackagesBySecondFilter={(type, criteria) =>
                      filterPackagesBySecondFilter(type, criteria)
                    }
                    filterPackages={(type) => {
                      filterPackages(type);
                    }}
                    showMoreFilter={() => {
                      setFilterShow(true);
                    }}
                    fullSizeMap={fullSizeMap}
                  />
                )}
                {dimensions.width > 1024 && (
                  <MoreFilterComponent
                    modal={filterShow}
                    _getExperiencesWithFilter={_getExperiencesWithFilter}
                    toggle={() => setFilterShow(!filterShow)}
                    filterType={filterContext.filterType}
                    isMainKidModeActive={isKidModeActive}
                    setMainIsKidModeActive={setIsKidModeActive}
                  />
                )}
                <div
                  className="row"
                  style={{ display: fullSizeMap ? "none" : "flex" }}
                >
                  {filterContext.filterType == "live" ? null : experiences &&
                    experiences.length > 0 ? (
                    experiences.map(
                      (experience, index) => (
                        // console.log("place", experience),
                        (
                          <div
                            className="col-lg-4 col-6 px-2 py-2 mx-0 my-2 cursor-pointer"
                            onMouseEnter={() => onPlaceSelect(index)}
                            onMouseLeave={() => resetPlaces()}
                            key={index}
                            style={{ height: "100%" }} //maxWidth: '250px'
                          >
                            <Package
                              id={experience.uid}
                              handleFavExperienceSelect={(event) =>
                                handleFavExperienceSelect(event, experience.uid)
                              }
                              isFavourite={favExperiences.some(
                                (fav) => fav.id === experience.uid
                              )}
                              backgroundImage={getBanner(experience)}
                              modelImage={getAvatar(experience.owner.avatar)}
                              title={experience.title}
                              price={experience.base_unit_amount}
                              ref={myRef.current[index]}
                              type={filterContext.filterType}
                              groupType={getGroupType(experience)}
                              filterState={fitlerState}
                              typeFilter={"video"}
                              onClickPackage={() =>
                                handlePackageClick(experience.uid)
                              }
                            />
                          </div>
                        )
                      )
                    )
                  ) : (
                    <div className="experiencePlaceholder">
                      <div className="experiencePlaceholderHeader">
                        <img
                          src={experiencePlaceholder}
                          className="experiencePlaceholderImg"
                        />
                      </div>
                      <div className="experiencePlaceholderBody">
                        <p className="experiencePlaceholderDesc">
                          Leider gibt es kein Ergebnis, aber wir haben{" "}
                          <span className="experiencePlaceholderDescStrong">
                            eine Lösung für dich entwickelt:
                          </span>
                        </p>
                        <p className="experiencePlaceholderDesc">
                          Erstelle einfach im{" "}
                          <a href="#" className="experiencePlaceholderDescLink">
                            Feed
                          </a>{" "}
                          einen{" "}
                          <span className="experiencePlaceholderDescStrong">
                            “Ich Suche” Post
                          </span>{" "}
                          und der richtige Musiker wird sich zeitnah mit dir in
                          Verbindung setzen.
                        </p>
                        <button
                          className="btn btn-primary experiencePlaceholderButton mt-4"
                          onClick={() => console.log("Clicked Button")}
                        >
                          {"Jetzt im Feed posten"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          {filterContext.filterType == "live" ? <LiveStream /> : null}

          {/* MapSection */}
          {filterContext.filterType == "live"
            ? null
            : (dimensions.width > 1024 ||
              (dimensions.width <= 1024 && active === 2)) && (
              <div
                className="map"
                ref={mapRef}
                id="map"
                style={{
                  width:
                    fullSizeMap || dimensions.width < 1024 ? "100vw" : "42vw",
                  top:
                    fullSizeMap && fitlerState && address !== ""
                      ? "130px"
                      : fullSizeMap && fitlerState && address === ""
                        ? "103px"
                        : fullSizeMap && !fitlerState && address !== ""
                          ? "70px"
                          : 0,
                }}
              >
                {fullSizeMap && (
                  <div
                    className="closeMapIcon bg-white p-2"
                    onClick={() => toggleFullSize()}
                  >
                    <img alt="closeMap" src={CloseMap} width="30px" />
                  </div>
                )}
                <GoogleMapReact
                  onGoogleApiLoaded={({ map, maps }) => {
                    trackMyLocation(map, maps);
                    if (dimensions.width > 1024) {
                      fullSizeController(map, maps);
                    }
                  }}
                  bootstrapURLKeys={{
                    key: "AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9p4",
                  }}
                  center={center}
                  defaultZoom={zoom}
                  options={createMapOptions}
                >
                  <MapMarkerComponent
                    isHome={true}
                    lat={center.lat}
                    lng={center.lng}
                    dimensions={dimensions}
                  ></MapMarkerComponent>
                  {experiences.length > 0 &&
                    places.length > 0 &&
                    places.map((place, index) => (
                      <MapMarkerComponent
                        handleFavExperienceSelect={(event) =>
                          handleFavExperienceSelect(event, place.id)
                        }
                        isFavourite={favExperiences.some(
                          (fav) => fav.id === place.id
                        )}
                        key={index}
                        places={places}
                        lat={place.lat}
                        lng={place.lng}
                        experience={{
                          title: experiences[place.id].title,
                          backgroundImage: getBanner(experiences[place.id]),
                          modelImage: getAvatar(
                            experiences[place.id].owner.avatar
                          ),
                          price: experiences[place.id].base_unit_amount,
                          type: experiences[place.id].type,
                          groupType: getGroupType(experiences[place.id]),
                        }}
                        onHover={onHover}
                        onHoverOutside={resetPackage}
                        dimensions={dimensions}
                        isActive={place.isActive}
                        fitlerState={fitlerState}
                        avgReviewScore={place.avg_review_score}
                      />
                    ))}
                </GoogleMapReact>
              </div>
            )}
          {dimensions.width <= 1024 && active === 2 && (
            <div
              className="swiper-container pacakgeShadow mb-4"
              id="swiper"
              style={{ paddingTop: "20px" }}
            >
              <div className="swiper-wrapper">
                {places.map((item, index) => (
                  <div
                    key={index}
                    className="swiper-slide"
                    onTouchEnd={() => {
                      onPlaceSelect(mySwiper.realIndex);
                    }}
                    onTouchCancel={() => {
                      onPlaceSelect(index);
                    }}
                    style={{ maxWidth: "158px" }}
                  >
                    <Package
                      // className="swiper-slide"
                      key={index}
                      backgroundImage={getBanner(experiences[item.id])}
                      modelImage={getAvatar(experiences[item.id].owner.avatar)}
                      title={experiences[item.id].title}
                      price={experiences[item.id].base_unit_amount}
                      fromSwiper={true}
                      typeFilter={"video"}
                      groupType={"group"}
                      iconSize={true}
                      ref={myRef.current[item.id]}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {dimensions.width <= 1024 && active === 1 && (
            <div className="row py-3 bg-white underBar">
              <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                <img src={Search} alt="" width="30px" />
                <p className="font-12 mb-0">Entdecken</p>
              </div>
              <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                <img src={Group} alt="" width="30px" />
                <p className="font-12 mb-0"> Zum Feed</p>
              </div>
              <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                <img src={Liste} alt="" width="30px" />
                <p className="font-12 mb-0">Merkliste</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindExperience;
