import React, {
  useState,
  Fragment,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Modal, ModalBody } from "reactstrap";
// import './filter.scss';
// import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
// import Guitar from "../../assets/images/guitar.png";
// import Piano from "../../assets/images/piano.png";
// import Drum from "../../assets/images/drum.png";
// import Mic from "../../assets/images/mic.png";
import Cancel from "../../assets/images/cancel-icon.png";
import FilterTypeModal from "../modals/FilterTypeModal/FilterTypeModal";
// import FilterCalendar from "../pages/CreateExperience/components/FilterCalendar/FilterCalendar";
import teenager from "../../assets/images/Teenager.png";
import kinder from "../../assets/images/Kinder.png";
import erwachsene from "../../assets/images/Erwachsene.png";
import einzel from "../../assets/images/Einzel.png";
import gruppe from "../../assets/images/Gruppe.png";
import modeOne from "../../assets/images/modeOne.png";
import modeTwo from "../../assets/images/modeTwo.png";
import Both from "../../assets/images/both.png";
import { FilterContext } from "../../context/filter/FilterContextProvider";
import { getConstantValue } from "typescript";
// import { DropdownItem ,DropdownMenu ,Dropdown ,DropdownToggle} from "reactstrap";

const MoreFilterComponent = ({ filterType, modal, toggle, _getExperiencesWithFilter }) => {
  const marks = {
    5: <strong>5km</strong>,
    10: <strong>10km</strong>,
  };
  const [perisValue, setPerisValue] = useState([0, 250]);
  const onSliderChange = (value) => {
    setPerisValue(value);
  };
  const filterContext = useContext(FilterContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isKidModeActive, setIsKidModeActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const filterRef = useRef(null);
  const [checkedValue, setCheckedValue] = useState(false);
  const [removeCheck, setRemoveCheck] = useState(false);
  const [checkBoxId, setCheckBoxId] = useState('');
  const [ageGroupCheckBox,setAgeGroupCheckBox] = useState('');
  // const [dropdownValue, setDropdownValue] = useState("");
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);


  useEffect(() => {
    setIsKidModeActive(filterContext.isKidActive);
  }, [filterContext]);

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

  const alter = [
    { id: 11, name: "Guitar" },
    { id: 12, name: "Xylophone" },
    { id: 13, name: "Tamburine" },
    { id: 14, name: "E-Bass" },
    { id: 15, name: "Lepatata" },
  ];

  const ageGroup = [
    { id: 11, name: "Kids" },
    { id: 9, name: "Junior" },
    { id: 10, name: "Senior" },
    { id: 12, name: "Young Adults" },
  ];

  const unterrichtsart = [
    { icon: einzel, name: "Einzel" },
    { icon: gruppe, name: "Gruppe" },
  ];

  const dropdownItems = [
    { icon: kinder, name: "Kinder" },
    { icon: teenager, name: "Teenager" },
    { icon: erwachsene, name: "Erwachsene" },
  ]

  const onClickHandle = async => {
    console.log();
    if (checkBoxId) {
      _getExperiencesWithFilter(`instrument=${checkBoxId}`);
      setTimeout(toggle(), 100);
    }
    if (ageGroupCheckBox){
      _getExperiencesWithFilter(`age_group=${ageGroupCheckBox}`);
      setTimeout(toggle(), 100);
    }
    // if(isKidModeActive) _getExperiencesWithFilter("for_kids=true")
    // if (checkBoxId) _getExperiencesWithFilter(`instrument=${checkBoxId}`)
    // setTimeout(toggle(), 100);
    //  (checkBoxId) _getExperiencesWithFilter(`age_group=${checkBoxId}`)
    // setTimeout(toggle(), 100)
  }

  console.log(checkBoxId);


  const getValue = (e) => {
    setCheckBoxId(e)
  }

  const getAgeGroupValue = (e) => {
    setAgeGroupCheckBox(e);
  }

  return (
    <div className="moreFilteContainer">
      <FilterTypeModal showModal={showModal} modalType={modalType} />
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered={true}
        size="sm"
        scrollable={true}
        className={"moreFilter"}
      >
        <div style={{ minWidth: "800px", margin: "auto", overflowY: "scroll" }}>
          <div className="close-filter-button" onClick={toggle}>
            <img src={Cancel} alt="cancel" />
          </div>
          <ModalBody className="pt-5">


            {/* {(filterType === 'Instrumente' || filterType === 'Unterricht') &&
                            <Fragment>
                                <div className="px-4">
                                    <p className="text-center font-weight-bold">Instrumente</p>
                                    <input className="form-control rounded" type="text" placeholder="z.B. Guitarre" />
                                    <div className="d-flex flex-column ml-3">
                                        <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                            <input type="checkbox" className="custom-control-input" id="gitarre" />
                                            <label className="custom-control-label" htmlFor="gitarre"><img src={Guitar} alt="guitar" width="20px" className="mr-2"/>Gitarre</label>
                                        </div>
                                        <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                            <input type="checkbox" className="custom-control-input" id="klavier" />
                                            <label className="custom-control-label" htmlFor="klavier"><img src={Piano} alt="piano" width="20px" className="mr-2"/>Klavier</label>
                                        </div>
                                        <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                            <input type="checkbox" className="custom-control-input" id="drums" />
                                            <label className="custom-control-label" htmlFor="drums"><img src={Drum} alt="drum" width="20px" className="mr-2"/>Drums</label>
                                        </div>
                                        <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                            <input type="checkbox" className="custom-control-input" id="gesang" />
                                            <label className="custom-control-label" htmlFor="gesang"><img src={Mic} alt="gesang" width="20px" className="mr-2"/>Gesang</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider my-4"></div>
                            </Fragment>} */}

            {/* {filterType === 'Instrumente' &&
                            <Fragment>
                                <div className="px-4 d-flex justify-content-center">
                                    <button className="btn btn-outline-dark filterButton">Leihen oder Kaufen</button>
                                </div>
                                <div className="divider my-4"></div>
                            </Fragment>
                        } */}

            {/* <div className="px-4">
                            <p className="text-center font-weight-bold">Entfernung</p>
                            <div className="d-flex flex-column px-2 pt-4">
                                <Slider min={5} max={10} marks={marks} defaultValue={3} trackStyle={[{ background: '#fc5d68' }]} dotStyle={{ background: '#fc5d68', border: '#fc5d68' }} handleStyle={{ background: '#fc5d68', border: '#fff' }} />
                            </div>
                        </div>
                        <div className="divider my-4"></div> */}

            {/* <div className="px-4">
                            <p className="text-center font-weight-bold">Preis</p>
                            <div className="d-flex flex-column px-2">
                                <p className="text-center">Von {perisValue[0]}€ bis {perisValue[1]}€</p>
                                <Range value={perisValue} onChange={onSliderChange} min={0} max={250} trackStyle={[{ background: '#fc5d68' }]} dotStyle={{ background: '#fc5d68', border: '#fc5d68' }} handleStyle={[{ background: '#fc5d68', border: '#fff' }, { background: '#fc5d68', border: '#fff' }]} />
                            </div>
                        </div>
                        <div className="divider my-4"></div> */}
            {/* 
                        {filterType === 'Unterricht' &&
                            <Fragment>
                                <div className="px-4">
                                    <p className="text-center font-weight-bold">Unterrichtsart</p>
                                    <input className="form-control" type="text" placeholder="z.B. Guitarre" />
                                    <div className="d-flex flex-column ml-3">
                                        {unterrichtsart.map(
                                            (options, index) => {
                                                return <div className="custom-control custom-checkbox py-2" key={index}>
                                                    <input type="checkbox" className="custom-control-input" id={options.name} />
                                                    <label className="custom-control-label" htmlFor={options.name}><img src={options.icon} alt={options.name} width="20px" className="mr-2"/>{options.name}</label>
                                                </div>
                                            }
                                        )}
                                        {/* <div className="custom-control custom-checkbox py-2">
                                            <input type="checkbox" className="custom-control-input" id="einzelunterricht" />
                                            <label className="custom-control-label" htmlFor="einzelunterricht">Einzelunterricht</label>
                                        </div>
                                        <div className="custom-control custom-checkbox py-2">
                                            <input type="checkbox" className="custom-control-input" id="gruppenunterricht" />
                                            <label className="custom-control-label" htmlFor="gruppenunterricht">Gruppenunterricht</label>
                                        </div> 
                                    </div>
                                </div>
                                <div className="divider my-4"></div>
                            </Fragment>
                        } */}

            {/* {filterType === 'Unterricht' &&
                            <Fragment>
                                <div className="px-4 d-flex justify-content-center">
                                    <button onClick={() => { setActiveFilter('terminzeiten') }} className="btn btn-outline-dark filterButton">Terminzeiten</button>
                                </div>
                                {
                                    activeFilter === 'terminzeiten' &&
                                    <div className="filterBox border px-4 terminzeiten" ref={filterRef} style={{
                                        width: '775px',
                                        height: '77vh',
                                        top: '1.2rem',
                                        position: 'fixed',
                                        left: '25%'
                                    }} >
                                        <div className="close-filter-button" onClick={() => { setActiveFilter(null) }}><img src={Cancel} alt="cancel" /></div>
                                        <div className='filter-calendar-wrapper' style={{
                                            overflowY: 'scroll',
                                            height: 'calc(100% - 45px)'
                                        }}>
                                            <FilterCalendar />
                                        </div>
                                        <button style={{ width: '200px', margin: '8px auto 0 auto' }} className="btn btn-secondary btn-block font-weight-bold mt-3 appointment-filter-cta" onClick={() => { setActiveFilter(null) }}>Fertig</button>
                                    </div>
                                }
                                <div className="divider my-4"></div>
                            </Fragment>
                        } */}

            {/* {filterType === "Unterricht" && ( */}
            <Fragment>
              <div className="px-4">
                <p className="text-center font-weight-bold">Instrument</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="z.B. Guitarre"
                />
                <div className="d-flex flex-column ml-3">
                  {alter.map((options, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox py-2"
                        key={index}
                      >
                        <Fragment>
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={options.name}

                            onClick={e => getValue(options.id)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={options.name}
                          >
                            {options.name}
                          </label>
                        </Fragment>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Fragment>
              <div className="px-4">
                <p className="text-center font-weight-bold">Age Group</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="z.B. Guitarre"
                />
                <div className="d-flex flex-column ml-3">
                  {ageGroup.map((options, index) => {
                    return (
                      <div
                        className="custom-control custom-checkbox py-2"
                        key={index}
                      >
                        <Fragment>
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={options.name}

                            onClick={e => getAgeGroupValue(options.id)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={options.name}
                          >
                            {options.name}
                          </label>
                        </Fragment>
                      </div>
                    );
                  })}
                </div>
              </div>
              </Fragment>
              <div className="divider my-4"></div>
            </Fragment>
            {/* )} */}

            {/* {filterType === 'Jobs' &&
                            <Fragment>
                                <div className="px-4 d-flex justify-content-center">
                                    <button className="btn btn-outline-dark filterButton">Dauer</button>
                                </div>
                                <div className="divider my-4"></div>
                            </Fragment>
                        } */}

            {(filterType === "Instrumente" ||
              filterType === "Jobs" ||
              filterType === "Konzerte") && (
                <div className="px-4 mb-3">
                  <p className="text-center font-weight-bold">Genre</p>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="z.B. Guitarre"
                  />
                  <div className="d-flex flex-column ml-3">
                    <div className="custom-control custom-checkbox py-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="jazz"
                      />
                      <label className="custom-control-label" htmlFor="jazz">
                        Jazz
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox py-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="soul"
                      />
                      <label className="custom-control-label" htmlFor="soul">
                        Soul
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox py-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="classic"
                      />
                      <label className="custom-control-label" htmlFor="classic">
                        Classic
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox py-2">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="classic"
                      />
                      <label className="custom-control-label" htmlFor="classic">
                        Classic
                      </label>
                    </div>
                  </div>
                </div>
              )}
            {filterType === "Unterricht" && (
              <div className="px-4 mb-3">
                <p className="text-center font-weight-bold">Buchbar als</p>
                <div className="d-flex flex-column ml-3">
                  <div className="custom-control custom-checkbox py-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      checked={() => filterContext.setFilterTypes("real")}
                    />
                    <label className="custom-control-label">
                      <img
                        src={modeOne}
                        alt="Real life Lesson"
                        width="20px"
                        className="mr-2"
                      />
                      Real life Lesson
                    </label>
                  </div>
                  <div
                    className="custom-control custom-checkbox py-2"
                    onClick={() => filterContext.setFilterTypes("video")}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      checked={isActive}
                    />
                    <label className="custom-control-label">
                      <img
                        src={modeTwo}
                        alt="Video Lesson"
                        width="20px"
                        className="mr-2"
                      />
                      Video Lesson
                    </label>
                  </div>
                </div>
              </div>
            )}


            <div className="d-flex flex-column align-items-center justify-content-center ">
              <p
                className="mb-1"
                style={{ fontSize: "12px", color: "#5e5e5e" }}
              >
                Nur für Kids
              </p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isKidModeActive}
                  onClick={handleToggleKidMode}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="d-flex justify-content-center bg-white pb-2">
              <button
                className="btn btn-secondary btn-block font-weight-bold mt-3 mb-3 "
                onClick={(e) => {
                  onClickHandle(e)
                }}
              >
                Fertig
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
};

export default MoreFilterComponent;