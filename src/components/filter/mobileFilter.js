import React, { useState, Fragment, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './filter.scss';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Guitar from '../../assets/images/guitar.png';
import Piano from '../../assets/images/piano.png';
import Drum from '../../assets/images/drum.png';
import Mic from '../../assets/images/mic.png';
import Cancel from '../../assets/images/cancel-icon.png'
import './filter.scss';
import FilterTypeModal from '../modals/FilterTypeModal/FilterTypeModal';
import UntFilter from '../../assets/images/uncertFilter.png'
import InstrumentFilter from '../../assets/images/instrumentFilter.png'
import JobsFilter from '../../assets/images/jobsFilter.png'
import KonFilter from '../../assets/images/konFilter.png'
import teenager from '../../assets/images/Teenager.png'
import kinder from '../../assets/images/Kinder.png'
import erwachsene from '../../assets/images/Erwachsene.png'
import einzel from '../../assets/images/Einzel.png'
import modeOne from '../../assets/images/modeOne.png'
import modeTwo from '../../assets/images/modeTwo.png'
import Both from '../../assets/images/both.png'

const MobileFilterComponent = ({ propFilterType, modal, toggle }) => {
    const marks = {
        5: <strong>5km</strong>,
        10: <strong>10km</strong>
    };
    const [perisValue, setPerisValue] = useState([0, 250]);
    const onSliderChange = (value) => {
        setPerisValue(value);
    }

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [isKidModeActive, setIsKidModeActive] = useState(false);

    const [availableDays, setAvailableDays] = useState([
        {
            day: 'Monday',
            selected: false,
            shorthand: 'M'
        },
        {
            day: 'Tuesday',
            selected: false,
            shorthand: 'D'
        }, {
            day: 'Wednesday',
            selected: false,
            shorthand: 'M'
        }, {
            day: 'Thursday',
            selected: false,
            shorthand: 'D'
        },
        {
            day: 'Friday',
            selected: false,
            shorthand: 'F'
        },
        {
            day: 'Saturday',
            selected: false,
            shorthand: 'S'
        },
        {
            day: 'Sunday',
            selected: false,
            shorthand: 'S'
        }
    ])

    const alter = [
        { icon: kinder, name: 'Kinder' },
        { icon: teenager, name: 'Teenager' },
        { icon: erwachsene, name: 'Erwachsene' },
    ];

    const handleSelectAvailableDays = (day) => {
        const prevAvailableDaysList = [...availableDays]
        const updatedAvailableDaysList = prevAvailableDaysList.map(availableDay => {
            if (availableDay.day === day) {
                availableDay.selected = !availableDay.selected
            }
            return availableDay
        })
        setAvailableDays(updatedAvailableDaysList)
    }

    useEffect(() => {
        //if selected from experience art filter
        if (isKidModeActive) {
            setModalType('Kids')
            setShowModal(true)
            setTimeout(function () {
                setShowModal(false)
            }, 2300)
        }
    }, [isKidModeActive]);

    const handleToggleKidMode = () => {
        setIsKidModeActive(prevState => !prevState)
    }


    useEffect(() => {
        setFilterType(propFilterType)
    }, [propFilterType]);

    const [filterType, setFilterType] = useState('');

    // const [defaultFilterType, setdefaultFilterType] = useState('');

    const handleFilterSelect = (type) => {
        setFilterType(type);
    }

    const handleNewFilterSelect = (type) => {
        // setActiveFilter(null)
        // setSearchType(type)
        // if (!showModal && modalType !== type) {
        //     setShowModal(true)
        //     setModalType(type)
        // }
    }
    return (
        <>
            <FilterTypeModal
                showModal={showModal}
                modalType={modalType}
            />
            <Modal isOpen={modal} toggle={toggle} centered={true} modalClassName={"filterModal " + ((filterType === '') ? 'midHeight' : '')}>
                <div className="close-filter-button" onClick={toggle}><img src={Cancel} alt="cancel" /></div>
                <ModalBody className="d-flex">
                    {/* {(filterType === '') &&
                        <div className="d-flex flex-column justify-content-center ">
                            <div className="d-flex  mb-4 border pr-4 d-flex align-items-center filterOption cursor-pointer">
                                <img src={UntFilter} width="50px" height="50px" className="rounded-circle mr-3" alt="Unterricht" />
                                <span className="font-weight-bold text-dark-gray" onClick={() => handleFilterSelect('Unterricht')}>Unterricht</span>
                            </div>
                            <div className="d-flex  mb-4 border pr-4 d-flex align-items-center filterOption cursor-pointer">
                                <img src={InstrumentFilter} width="50px" height="50px" className="rounded-circle mr-3" alt="Instrumente" />
                                <span className="font-weight-bold text-dark-gray" onClick={() => handleFilterSelect('Instrumente')}>Instrumente</span>
                            </div>
                            <div className="d-flex  mb-4 border pr-4 d-flex align-items-center filterOption cursor-pointer">
                                <img src={JobsFilter} width="50px" height="50px" className="rounded-circle mr-3" alt="Jobs" />
                                <span className="font-weight-bold text-dark-gray" onClick={() => handleFilterSelect('Jobs')}>Jobs</span>
                            </div>
                            <div className="d-flex border pr-4 d-flex align-items-center filterOption cursor-pointer">
                                <img src={KonFilter} width="50px" height="50px" className="rounded-circle mr-3" alt="Konzerte" />
                                <span className="font-weight-bold text-dark-gray" onClick={() => handleFilterSelect('Konzerte')}>Konzerte</span>
                            </div>
                        </div>} */}

                    {(filterType !== '') &&
                        <div className="d-flex flex-column">
                            <div className="px-4 pt-4 content">
                                {/* <div className="px-4 d-flex flex-column justify-content-center">
                                <p className="text-center font-weight-bold">Experience Art</p>

                                <div className="d-flex flex-column justify-content-center" style={{ width: '160px', margin: '0 auto' }}>
                                    <div className="d-flex  mb-3 border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Unterricht')}>
                                        <img src={UntFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Unterricht" />
                                        <span className="font-weight-bold text-dark-gray">Unterricht</span>
                                    </div>
                                    <div className="d-flex  mb-3 border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Instrumente')}>
                                        <img src={InstrumentFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Instrumente" />
                                        <span className="font-weight-bold text-dark-gray">Instrumente</span>
                                    </div>
                                    <div className="d-flex  mb-3 border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Jobs')}>
                                        <img src={JobsFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Jobs" />
                                        <span className="font-weight-bold text-dark-gray">Jobs</span>
                                    </div>
                                    <div className="d-flex border d-flex align-items-center filterOption cursor-pointer" onClick={() => handleFilterSelect('Konzerte')}>
                                        <img src={KonFilter} width="38px" height="38px" className="rounded-circle mr-3" alt="Konzerte" />
                                        <span className="font-weight-bold text-dark-gray">Konzerte</span>
                                    </div>
                                </div>
                            </div>
                            <div className="divider my-5"></div> */}

                                {(filterType === 'Instrumente' || filterType === 'Unterricht') &&
                                    <Fragment>
                                        <div className="px-4">
                                            <p className="text-center font-weight-bold">Instrumente</p>
                                            <input className="form-control rounded" type="text" placeholder="z.B. Guitarre" />
                                            <div className="d-flex flex-column ml-3">
                                                <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                                    <input type="checkbox" className="custom-control-input" id="gitarre" />
                                                    <label className="custom-control-label" htmlFor="gitarre"><img src={Guitar} alt="guitar" width="20px" className="mr-2" />Gitarre</label>
                                                </div>
                                                <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                                    <input type="checkbox" className="custom-control-input" id="klavier" />
                                                    <label className="custom-control-label" htmlFor="klavier"><img src={Piano} alt="piano" width="20px" className="mr-2" />Klavier</label>
                                                </div>
                                                <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                                    <input type="checkbox" className="custom-control-input" id="drums" />
                                                    <label className="custom-control-label" htmlFor="drums"><img src={Drum} alt="drum" width="20px" className="mr-2" />Drums</label>
                                                </div>
                                                <div className="custom-control custom-checkbox d-flex align-items-center py-2">
                                                    <input type="checkbox" className="custom-control-input" id="gesang" />
                                                    <label className="custom-control-label" htmlFor="gesang"><img src={Mic} alt="gesang" width="20px" className="mr-2" />Gesang</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider my-5"></div>
                                    </Fragment>}

                                {filterType === 'Instrumente' &&
                                    <Fragment>
                                        <div className="px-4 d-flex justify-content-center">
                                            <button className="btn btn-outline-dark filterButton">Leihen oder Kaufen</button>
                                        </div>
                                        <div className="divider my-5"></div>
                                    </Fragment>
                                }

                                <div className="px-4">
                                    <p className="text-center font-weight-bold">Entfernung</p>
                                    <div className="d-flex flex-column px-2 pt-4">
                                        <Slider min={5} max={10} marks={marks} defaultValue={3} trackStyle={[{ background: '#fc5d68' }]} dotStyle={{ background: '#fc5d68', border: '#fc5d68' }} handleStyle={{ background: '#fc5d68', border: '#fff' }} />
                                    </div>
                                </div>
                                <div className="divider my-5"></div>

                                <div className="px-4">
                                    <p className="text-center font-weight-bold">Preis</p>
                                    <div className="d-flex flex-column px-2">
                                        <p className="text-center">Von {perisValue[0]}€ bis {perisValue[1]}€</p>
                                        <Range value={perisValue} onChange={onSliderChange} min={0} max={250} trackStyle={[{ background: '#fc5d68' }]} dotStyle={{ background: '#fc5d68', border: '#fc5d68' }} handleStyle={[{ background: '#fc5d68', border: '#fff' }, { background: '#fc5d68', border: '#fff' }]} />
                                    </div>
                                </div>
                                <div className="divider my-5"></div>

                                {filterType === 'Unterricht' &&
                                    <Fragment>
                                        <div className="px-4">
                                            <p className="text-center font-weight-bold">Unterrichtsart</p>
                                            <input className="form-control" type="text" placeholder="z.B. Guitarre" />
                                            <div className="d-flex flex-column ml-3">
                                                <div className="custom-control custom-checkbox py-2">
                                                    <input type="checkbox" className="custom-control-input" id="einzelunterricht" />
                                                    <label className="custom-control-label" htmlFor="einzelunterricht">Einzelunterricht</label>
                                                </div>
                                                <div className="custom-control custom-checkbox py-2">
                                                    <input type="checkbox" className="custom-control-input" id="gruppenunterricht" />
                                                    <label className="custom-control-label" htmlFor="gruppenunterricht">Gruppenunterricht</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider my-5"></div>
                                    </Fragment>
                                }

                                {filterType === 'Unterricht' &&
                                    <Fragment>
                                        <div className="px-4 d-flex justify-content-center flex-column">
                                            <p className="text-center font-weight-bold">Verfügbare Tage</p>
                                            <div className="available-days d-flex flex-row justify-content-between">
                                                {
                                                    availableDays.map(availableDay => {
                                                        return (
                                                            <div className='available-day' key={availableDay.day}>
                                                                <div className="available-day__heading">{availableDay.shorthand}</div>
                                                                <div className={`available-day__checkbox ${availableDay.selected ? 'selected' : ''}`} onClick={() => handleSelectAvailableDays(availableDay.day)}></div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="divider my-5"></div>
                                    </Fragment>
                                }

                                {filterType === 'Unterricht' &&
                                    <Fragment>
                                        <div className="px-4 pb-5">
                                            <p className="text-center font-weight-bold">Alter</p>
                                            <input className="form-control" type="text" placeholder="z.B. Guitarre" />
                                            <div className="d-flex flex-column ml-3"></div>
                                            {alter.map(
                                                (options, index) => {
                                                    return <div className="custom-control custom-checkbox py-2" key={index}>
                                                        {
                                                            options.name === 'Kinder' ? (
                                                                <Fragment>
                                                                    <input type="checkbox" className="custom-control-input" id={options.name} checked={isKidModeActive} onClick={handleToggleKidMode} />
                                                                    <label className="custom-control-label" htmlFor={options.name}><img src={options.icon} alt={options.name} width="20px" className="mr-2" onClick={handleToggleKidMode} />{options.name}</label>
                                                                </Fragment>
                                                            ) : (
                                                                <Fragment>
                                                                    <input type="checkbox" className="custom-control-input" id={options.name} />
                                                                    <label className="custom-control-label" htmlFor={options.name}><img src={options.icon} alt={options.name} width="20px" className="mr-2" />{options.name}</label>
                                                                </Fragment>
                                                            )
                                                        }


                                                    </div>

                                                }
                                            )}
                                        </div>

                                    </Fragment>
                                }

                                {filterType === 'Jobs' &&
                                    <Fragment>
                                        <div className="px-4 d-flex justify-content-center">
                                            <button className="btn btn-outline-dark filterButton">Dauer</button>
                                        </div>
                                        <div className="divider my-5"></div>
                                    </Fragment>
                                }

                                {(filterType === 'Instrumente' || filterType === 'Jobs' || filterType === 'Konzerte') &&
                                    <div className="px-4 mb-3">
                                        <p className="text-center font-weight-bold">Genre</p>
                                        <input className="form-control" type="text" placeholder="z.B. Guitarre" />
                                        <div className="d-flex flex-column ml-3">
                                            <div className="custom-control custom-checkbox py-2">
                                                <input type="checkbox" className="custom-control-input" id="jazz" />
                                                <label className="custom-control-label" htmlFor="jazz">Jazz</label>
                                            </div>
                                            <div className="custom-control custom-checkbox py-2">
                                                <input type="checkbox" className="custom-control-input" id="soul" />
                                                <label className="custom-control-label" htmlFor="soul">Soul</label>
                                            </div>
                                            <div className="custom-control custom-checkbox py-2">
                                                <input type="checkbox" className="custom-control-input" id="classic" />
                                                <label className="custom-control-label" htmlFor="classic">Classic</label>
                                            </div>
                                            <div className="custom-control custom-checkbox py-2">
                                                <input type="checkbox" className="custom-control-input" id="classic" />
                                                <label className="custom-control-label" htmlFor="classic">Classic</label>
                                            </div>
                                        </div>
                                    </div>}

                                {filterType === 'Unterricht' &&
                                    <>
                                        <div className="divider my-5"></div>
                                        <div className="px-4 mb-3">
                                            <p className="text-center font-weight-bold">Buchbar als</p>
                                            <div className="d-flex flex-column ml-3">
                                                <div className="custom-control custom-checkbox py-2">
                                                    <input type="checkbox" className="custom-control-input" />
                                                    <label className="custom-control-label" ><img src={modeOne} alt='Real life Lesson' width="20px" className="mr-2" />Real life Lesson</label>
                                                </div>
                                                <div className="custom-control custom-checkbox py-2" >
                                                    <input type="checkbox" className="custom-control-input" />
                                                    <label className="custom-control-label" ><img src={modeTwo} alt='Video Lesson' width="20px" className="mr-2" />Video Lesson</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider my-5"></div>
                                    </>

                                }

                                <div className="d-flex flex-column align-items-center justify-content-center mb-5 pb-5">
                                    <p className="mb-1" style={{ fontSize: '12px' }}>Nur für Kids</p>
                                    <label className="switch">
                                        <input type="checkbox" checked={isKidModeActive} onChange={handleToggleKidMode} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center bg-white pb-2" style={{ position: 'absolute', bottom: '0', width: '100%', left: 0 }}>
                                <button className="btn btn-secondary font-weight-bold mt-3 mb-3 filterFixedButton" onClick={e => { setTimeout(toggle(), 100); }}>Fertig</button>
                            </div>
                        </div>
                    }
                </ModalBody>
            </Modal >
        </>
    );
}

export default MobileFilterComponent;
