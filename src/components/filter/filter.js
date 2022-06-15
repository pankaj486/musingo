import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./filter.scss";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import african from "../../assets/images/geners/african.png";
import blues from "../../assets/images/geners/blues.png";
import choral from "../../assets/images/geners/choral.png";
import classic from "../../assets/images/geners/classic music.png";
import electronic from "../../assets/images/geners/electronic.png";
import flamenco from "../../assets/images/geners/flamenco.png";
import folk from "../../assets/images/geners/folk.png";
import funk from "../../assets/images/geners/funk.png";
import heavy from "../../assets/images/geners/heavyMetal.png";
import indian from "../../assets/images/geners/indian.png";
import indie from "../../assets/images/geners/indie.png";
import jazz from "../../assets/images/geners/jazz.png";
import pop from "../../assets/images/geners/pop.png";
import rap from "../../assets/images/geners/rap.png";
import reggae from "../../assets/images/geners/reggae.png";
import Rnb from "../../assets/images/geners/rockandband.png";
import rock from "../../assets/images/geners/rock.png";
import soul from "../../assets/images/geners/soul.png";
import leihen from "../../assets/images/Leihen.png";
import kaufen from "../../assets/images/Kaufen.png";
import einzel from "../../assets/images/Einzel.png";
import gruppe from "../../assets/images/Gruppe.png";
import erwachsene from "../../assets/images/Erwachsene.png";
import teenager from "../../assets/images/Teenager.png";
import kinder from "../../assets/images/Kinder.png";
import anfanger from "../../assets/images/Anfänger.png";
import furFortgeschrittene from "../../assets/images/Für Fortgeschrittene.png";
import instrument from "../../assets/images/instrument-rental.png";
import { FilterContext } from "../../context/filter/FilterContextProvider";
import FilterTypeModal from "../modals/FilterTypeModal/FilterTypeModal";
import Cancel from "../../assets/images/cancel-icon.png";
import instrumentService from "../../services/api/instrumentService";
import FilterCalendar from "../pages/CreateExperience/components/FilterCalendar/FilterCalendar";

const FilterComponent = ({
  filterPackages,
  filterPackagesBySecondFilter,
  showMoreFilter,
  fullSizeMap,
  filterUrl,
  instruments
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [perisValue, setPerisValue] = useState([0, 250]);
  const [distanceValue, setDistanceValue] = useState(0);
  const [filterShow, setFilterShow] = useState(false);
  const [groupType, setGroupType] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const filterContext = useContext(FilterContext);
  // const filterContext = useContext(FilterContext);
  const [filterType, setFilterType] = useState("");
  const filterRef = useRef(null);
  const [isKidModeActive, setIsKidModeActive] = useState(false);
  // const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  function _setDistance(value) {
    setDistanceValue(value);
  }

  function route_with_query(name, query = null, ...params) {
    let routeObject;
    if (query && Object.keys(query).length) {
      let queryStr = "?" + buildQueryParams(query);
      routeObject.path += queryStr;
      routeObject.absolute_path += queryStr;
    }

    return routeObject;
  }

  function buildQueryParams(query) {
    if (Object.keys(query).length) {
      return Object.keys(query)
        .map((key) => key + "=" + query[key])
        .join("&");
    }
    return null;
  }

  function _makeFilterUrl() {
    let query = {};
    let queryUrl = null;

    if (selectedInstrument) {
      query.instrument = selectedInstrument;
    }

    if (perisValue.length && perisValue[1] != 0) {
      query.price_gte = perisValue[0];
      query.price_lte = perisValue[1];
    }

    if (distanceValue && distanceValue > 0) {
      query.distance_lt = 0;
      query.distance_gt = distanceValue;
    }

    // if (!isKidModeActive) {
    //     query.for_kids = true
    // } else {
    //     query.for_kids = null
    // }

    if (query && Object.keys(query).length) {
      queryUrl = buildQueryParams(query);
    }
    // console.log("queryUrl", queryUrl);
    filterUrl(queryUrl);
  }

  // let isMounted = true;
  // function _getInstruments() {
  //   instrumentService.getAll().then((res) => {
  //     if (isMounted){
  //       setInstruments(res.results);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   _getInstruments();
  //   return (() => {isMounted = false});
  // }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // setFilterType(filterContext.filterType)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setFilterType(filterContext.filterType);
    setIsKidModeActive(filterContext.isKidActive);
  }, [filterContext]);

  useEffect(() => {
    //if selected from experience art filter
    if (!activeFilter && searchType) {
      setTimeout(function () {
        setShowModal(false);
      }, 2300);
      filterPackages(searchType);
      setFilterShow(true);
      setFilterType(searchType);
    }
  }, [activeFilter, searchType, isKidModeActive]);

  useEffect(() => {
    //if selected from experience art filter
    if (isKidModeActive) {
      setModalType("Kids");
      setShowModal(true);
      setTimeout(function () {
        setShowModal(false);
      }, 2300);
    }
    filterContext.setKidActiveState(isKidModeActive);
  }, [isKidModeActive]);

  const handleToggleKidMode = () => {
    setIsKidModeActive((prevState) => !prevState);
  };

  const onSliderChange = (value) => {
    setPerisValue(value);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setActiveFilter(null);
    }
  };

  const handleFilterSelect = (type) => {
    if (!showModal && modalType !== type) {
      setShowModal(true);
      setModalType(type);
      setTimeout(function () {
        setShowModal(false);
      }, 2300);
    }
    filterPackages(type);
    setFilterShow(true);
    setFilterType(type);
  };

  const handleNewFilterSelect = (type) => {
    setActiveFilter(null);
    setSearchType(type);
    if (!showModal && modalType !== type) {
      setShowModal(true);
      setModalType(type);
    }
  };

  const marks = {
    0: <strong>0</strong>,
    5: <strong>5km</strong>,
    10: <strong>10km</strong>,
    15: <strong>15km</strong>,
  };

  const leihenOderKaufen = [
    { icon: leihen, name: "Leihen" },
    { icon: kaufen, name: "Kaufen" },
  ];

  const geners = [
    { icon: african, name: "African" },
    { icon: blues, name: "Blues" },
    { icon: choral, name: "Choral" },
    { icon: classic, name: "Classic" },
    { icon: electronic, name: "Electronic" },
    { icon: flamenco, name: "Flamenco" },
    { icon: folk, name: "Folk" },
    { icon: funk, name: "Funk" },
    { icon: heavy, name: "Heavy" },
    { icon: indian, name: "Indian" },
    { icon: indie, name: "Indie" },
    { icon: jazz, name: "Jazz" },
    { icon: pop, name: "Pop" },
    { icon: rap, name: "Rap" },
    { icon: reggae, name: "Reggae" },
    { icon: Rnb, name: "RnB" },
    { icon: rock, name: "Rock" },
    { icon: soul, name: "Soul" },
  ];

  const unterrichtsart = [
    { icon: einzel, name: "Einzel" },
    { icon: gruppe, name: "Gruppe" },
  ];

  const alter = [
    { icon: kinder, name: "Kinder" },
    { icon: teenager, name: "Teenager" },
    { icon: erwachsene, name: "Erwachsene" },
  ];

  const erfahrung = [
    { icon: anfanger, name: "Für Anfänger" },
    { icon: furFortgeschrittene, name: "Für Fortgeschrittene" },
  ];

  const currentUser = localStorage.getItem("current_user")

  return (
    <div className="mt-sm-4" style={{ width: "100%" }}>
      <FilterTypeModal showModal={showModal} modalType={modalType} />
      {/* {
                (!filterShow) &&
                <div className="d-flex filterTypeContainer">
                    <div className="cursor-pointer d-flex mr-3 border pr-4 d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Unterricht')}>
                        <img src={UntFilter} width="55px" height="55px" className="rounded-circle img-fluid mr-3" alt="Unterricht" />
                        <p className="filterText mb-0 font-weight-bold text-dark-gray">Unterricht</p>
                    </div>
                    <div className="cursor-pointer d-flex mr-3 border pr-4 d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Instrumente')}>
                        <img src={InstrumentFilter} width="55px" height="55px" className="rounded-circle img-fluid mr-3" alt="Instrumente" />
                        <p className="filterText mb-0 font-weight-bold text-dark-gray">Instrumente</p>
                    </div>
                    <div className="cursor-pointer d-flex mr-3 border pr-4 d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Jobs')}>
                        <img src={JobsFilter} width="55px" height="55px" className="rounded-circle img-fluid mr-3" alt="Jobs" />
                        <p className="filterText mb-0 font-weight-bold text-dark-gray">Jobs</p>
                    </div>
                    <div className="cursor-pointer d-flex border pr-4 d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Konzerte')}>
                        <img src={KonFilter} width="55px" height="55px" className="rounded-circle img-fluid mr-3" alt="Konzerte" />
                        <p className="filterText mb-0 font-weight-bold text-dark-gray">Konzerte</p>
                    </div>
                </div>
            } */}

      {/* {filterShow && */}
      {currentUser ? <div className="d-flex justify-content-start align-items-center filterTypeContainer">
        {/* <div style={{ position: 'relative' }} className="mr-2">
                    <button onClick={() => { setActiveFilter('experienceArt') }} className="btn btn-outline-dark filterButton">Experience Art</button>
                    {
                        activeFilter === 'experienceArt' &&
                        <div className="filterBox border px-4 experienceArtFilter" ref={filterRef}>
                                                   <div className="close-filter-button" onClick={() => { setActiveFilter(null) }}><img src={Cancel} alt="cancel" /></div>
                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Wonach suchst du?</p>
                            <div className="d-flex flex-column justify-content-center" style={{ width: '160px', margin: '0 auto' }}>
                                <div className="d-flex  mb-3 border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleNewFilterSelect('Unterricht')}>
                                    <img src={UntFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Unterricht" />
                                    <span className="font-weight-bold text-dark-gray">Unterricht</span>
                                </div>
                                <div className="d-flex  mb-3 border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleNewFilterSelect('Instrumente')}>
                                    <img src={InstrumentFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Instrumente" />
                                    <span className="font-weight-bold text-dark-gray">Instrumente</span>
                                </div>
                                <div className="d-flex  mb-3 border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleNewFilterSelect('Jobs')}>
                                    <img src={JobsFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Jobs" />
                                    <span className="font-weight-bold text-dark-gray">Jobs</span>
                                </div>
                                <div className="d-flex border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleNewFilterSelect('Konzerte')}>
                                    <img src={KonFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Konzerte" />
                                    <span className="font-weight-bold text-dark-gray">Konzerte</span>
                                </div>
                            </div>
                        </div>
                    }
                </div> */}

        {(filterType === "Instrumente" || filterType === "Unterricht") && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("instrument");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Instrument
            </button>
            {activeFilter === "instrument" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Instrumente
                </p>
                <input
                  className="form-control rounded"
                  type="text"
                  placeholder="z.B. Guitarre"
                />
                <div
                  className="d-flex flex-column mt-2"
                  style={{
                    maxHeight: "150px",
                    minWidth: "155px",
                    overflowY: "scroll",
                  }}
                >
                  {instruments.map((instrument, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox d-flex align-items-center my-2"
                        key={index}
                      >
                        <input
                          type="radio"
                          name={instrument}
                          className="custom-control-input"
                          id={instrument.name}
                          value={instrument.id}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedInstrument(event.target.value);
                            } else {
                              setSelectedInstrument(null);
                            }
                          }}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={instrument.name}
                        >
                          {instrument.icon && (
                            <img
                              src={instrument.icon}
                              alt={instrument.name}
                              width="32px"
                              className="mr-2"
                            />
                          )}
                          {instrument.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    _makeFilterUrl();
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}

        {filterType === "Instrumente" && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("leihenoderkaufen");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Leihen oder Kaufen
            </button>
            {activeFilter === "leihenoderkaufen" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Leihen oder Kaufen
                </p>
                <div
                  className="d-flex flex-column mt-2"
                  style={{ maxHeight: "150px", minWidth: "155px" }}
                >
                  {leihenOderKaufen.map((options, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox d-flex align-items-center my-2"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={options.name}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={options.name}
                        >
                          <img
                            src={options.icon}
                            alt={options.name}
                            width="32px"
                            className="mr-2"
                          />
                          {options.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}


        <div style={{ position: "relative" }} className="mr-2">
          <button
            onClick={() => {
              setActiveFilter("preis");
            }}
            className="btn btn-outline-dark filterButton"
          >
            Preis
          </button>
          {activeFilter === "preis" && (
            <div className="filterBox border px-4" ref={filterRef}>
              <div
                className="close-filter-button"
                onClick={() => {
                  setActiveFilter(null);
                }}
              >
                <img src={Cancel} alt="cancel" />
              </div>
              <p style={{ fontWeight: "bold", marginTop: "10px" }}>Preis</p>
              <div className="d-flex flex-column px-2">
                <p className="text-center">
                  Von {perisValue[0]}€ bis {perisValue[1]}€
                </p>
                <Range
                  value={perisValue}
                  onChange={onSliderChange}
                  min={0}
                  max={250}
                  trackStyle={[{ background: "#fc5d68" }]}
                  dotStyle={{ background: "#fc5d68", border: "#fc5d68" }}
                  handleStyle={[
                    { background: "#fc5d68", border: "#fff" },
                    {
                      background: "#fc5d68",
                      border: "#fff",
                    },
                  ]}
                />
              </div>
              <button
                className="btn btn-secondary btn-block font-weight-bold mt-3"
                onClick={() => {
                  _makeFilterUrl();
                }}
              >
                Fertig
              </button>
            </div>
          )}
        </div>


        {filterType !== "Instrumente" && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("entfernung");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Entfernung
            </button>
            {activeFilter === "entfernung" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Entfernung
                </p>
                <div className="d-flex flex-column px-2 pt-4">
                  <Slider
                    min={0}
                    max={15}
                    marks={marks}
                    defaultValue={distanceValue}
                    onChange={_setDistance}
                    trackStyle={[{ background: "#fc5d68" }]}
                    dotStyle={{ background: "#fc5d68", border: "#fc5d68" }}
                    handleStyle={{ background: "#fc5d68", border: "#fff" }}
                  />
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    _makeFilterUrl();
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}

        {filterType === "Unterricht" && fullSizeMap && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("unterrichtsart");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Unterrichtsart
            </button>
            {activeFilter === "unterrichtsart" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Unterrichtsart
                </p>
                <div
                  className="d-flex flex-column mt-2"
                  style={{ maxHeight: "150px", minWidth: "155px" }}
                >
                  {unterrichtsart.map((options, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox d-flex align-items-center my-2"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={options.name}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={options.name}
                        >
                          <img
                            src={options.icon}
                            alt={options.name}
                            width="32px"
                            className="mr-2"
                          />
                          {options.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    setActiveFilter(null);
                    filterPackagesBySecondFilter("group", groupType);
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}

        {filterType === "Unterricht" && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("terminzeiten");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Terminzeiten
            </button>
            {activeFilter === "terminzeiten" && (
              <div
                className="filterBox border px-4 terminzeiten"
                ref={filterRef}
                style={{
                  width: "775px",
                  height: "77vh",
                  top: "1.2rem",
                  left: "25%",
                }}
              >
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>

                <div
                  className="filter-calendar-wrapper"
                  style={{
                    overflowY: "scroll",
                    height: "calc(100% - 45px)",
                  }}
                >
                  <FilterCalendar />
                </div>
                <button
                  style={{ width: "200px", margin: "8px auto 0 auto" }}
                  className="btn btn-secondary btn-block font-weight-bold mt-3 appointment-filter-cta"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}
        {filterType === "Unterricht" && fullSizeMap && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("alter");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Alter
            </button>
            {activeFilter === "alter" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>Alter</p>
                <div
                  className="d-flex flex-column mt-2"
                  style={{ maxHeight: "150px", minWidth: "155px" }}
                >
                  {alter.map((options, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox d-flex align-items-center my-2"
                        key={index}
                      >
                        {options.name === "Kinder" ? (
                          <Fragment>
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={options.name}
                              checked={isKidModeActive}
                              onClick={handleToggleKidMode}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={options.name}
                            >
                              <img
                                src={options.icon}
                                alt={options.name}
                                width="32px"
                                className="mr-2"
                                onClick={handleToggleKidMode}
                              />
                              {options.name}
                            </label>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={options.name}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={options.name}
                            >
                              <img
                                src={options.icon}
                                alt={options.name}
                                width="32px"
                                className="mr-2"
                              />
                              {options.name}
                            </label>
                          </Fragment>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}

        {filterType === "Unterricht" && fullSizeMap && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("erfahrung");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Erfahrung
            </button>
            {activeFilter === "erfahrung" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  Erfahrung
                </p>
                <div
                  className="d-flex flex-column mt-2"
                  style={{ maxHeight: "150px", minWidth: "155px" }}
                >
                  {erfahrung.map((options, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox d-flex align-items-center my-2"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={options.name}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={options.name}
                        >
                          <img
                            src={options.icon}
                            alt={options.name}
                            width="32px"
                            className="mr-2"
                          />
                          {options.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}

        {/*{filterType === 'Jobs' && <div style={{ position: 'relative' }} className="mr-2">*/}
        {/*    <button onClick={() => { setActiveFilter('erfahrung') }} className="btn btn-outline-dark filterButton">Dauer</button>*/}
        {/*</div>}*/}
        {/* filterType === 'Instrumente' ||  */}
        {(filterType === "Jobs" || filterType === "Konzerte") && (
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                setActiveFilter("genre");
              }}
              className="btn btn-outline-dark filterButton"
            >
              Genre
            </button>
            {activeFilter === "genre" && (
              <div className="filterBox border px-4" ref={filterRef}>
                <div
                  className="close-filter-button"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  <img src={Cancel} alt="cancel" />
                </div>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>Genre</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="z.B. Guitarre"
                />
                <div
                  className="d-flex flex-column mt-2"
                  style={{
                    maxHeight: "150px",
                    minWidth: "155px",
                    overflowY: "scroll",
                  }}
                >
                  {geners.map((genre, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox d-flex align-items-center my-2"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={genre.name}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={genre.name}
                        >
                          <img
                            src={genre.icon}
                            alt={genre.name}
                            width="32px"
                            className="mr-2"
                          />
                          {genre.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-secondary btn-block font-weight-bold mt-3"
                  onClick={() => {
                    setActiveFilter(null);
                  }}
                >
                  Fertig
                </button>
              </div>
            )}
          </div>
        )}
        {
          <div style={{ position: "relative" }} className="mr-2">
            <button
              onClick={() => {
                showMoreFilter();
              }}
              className="btn btn-outline-dark filterButton"
            >
              Mehr Filter
            </button>
          </div>
        }
        <div className="ml-auto mr-5 pr-3">
          <p className="mb-1" style={{ fontSize: "12px" }}>
            Nur für Kids
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isKidModeActive}
              onClick={handleToggleKidMode}
              onChange={() => _makeFilterUrl()}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div> : ""}
      {/* } */}
    </div>
  );
};

export default FilterComponent;
