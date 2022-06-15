import './trainerView.scss';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { service } from 'src/services/AuthService/authService';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Bg from '../../assets/images/experience-bg.png';
import Dots from '../../assets/images/dots.png';
import Instructor from '../../assets/images/instructor.png';



const TrainerView = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [activeOption, setActiveOption] = useState(null);
    const [dropdownValue, setDropdownValue] = useState('');
    const onlineMembers = [1, 2, 3, 4];
    const bookings = [1, 2, 3, 4];
    // const [bookings, setBookings] = useState([]);
    const history = useHistory();


    const getTrainerList = () => {
        service.getTrainerView().then((response) => {
            // setBookings(response.data.results)
            return response
        })
    }

    

    useEffect(() => {
        getTrainerList();
    },[])

    return (
        <>
            <div className='container pt-5 mt-5'>
                <div className='row pt-5 mt-5 align-items-center justify-content-center'>
                    <div className='col-6 text-center'>
                        <div className='d-flex w-100 align-items-center justify-content-between'>
                            <p onClick={() => history.push({
                                pathname: '/dashboard',
                            })} >Dashboard</p>
                            <p onClick={() => history.push({
                                pathname: '/conversations',
                            })} >Chat</p>
                            <p onClick={() => history.push({
                                pathname: '/customerview',
                            })} >Meine Buchungen</p>
                            <p onClick={() => history.push({
                                pathname: '/trainerview',
                            })} className='font-weight-bold'>Kundenbuchungen</p>
                            <p onClick={() => history.push({
                                pathname: '/musicianview',
                            })}>Meine Inserate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 d-flex flex-column justify-content-center align-items-center font-14">
                <h2>Kunden Buchungen</h2>
                <div className="d-flex flex-column flex-md-row align-items-center mb-2 mt-4">
                    <p className="mb-0 mr-3 mb-2">Experience Art</p>
                    <a style={{ borderRadius: '20px' }} onClick={() => setActiveOption(1)} className={"defBorder settingButton px-4 py-2 mx-1 mb-2 font-12 " + (activeOption === 1 ? 'activeSettingsButton' : '')}>Unterricht</a>
                    <a style={{ borderRadius: '20px' }} onClick={() => setActiveOption(2)} className={"defBorder settingButton px-4 py-2 mx-1 mb-2 font-12 " + (activeOption === 2 ? 'activeSettingsButton' : '')}>Instruments</a>
                    <a style={{ borderRadius: '20px' }} onClick={() => setActiveOption(3)} className={"defBorder settingButton px-4 py-2 mx-1 mb-2 font-12 " + (activeOption === 3 ? 'activeSettingsButton' : '')}>Jobs</a>
                    <a style={{ borderRadius: '20px' }} onClick={() => setActiveOption(4)} className={"defBorder settingButton px-4 py-2 mx-1 mb-2 font-12 " + (activeOption === 4 ? 'activeSettingsButton' : '')}>Concerts</a>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ml-3 mb-2">
                        <DropdownToggle caret className="bg-white px-5 text-dark btn-outline-dark font-12">
                            Aktive
                        </DropdownToggle>
                        <DropdownMenu>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <table className="table-responsive-md font-12"
                    style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="px-3 pb-1 text-center">Schülerprofile</th>
                            <th className="px-3 pb-1 text-center">Schüler</th>
                            <th className="px-3 pb-1 text-center">Startdatum</th>
                            <th className="px-3 pb-1 text-center">Unterrichtsart</th>
                            <th className="px-3 pb-1 text-center">Regelmäßigkeit</th>
                            <th className="px-3 pb-1 text-center">Abonnement</th>
                            <th className="px-3 pb-1 text-center">Verdienst mtl.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(
                                (booking, index) => {
                                    return <tr>
                                        <td scope="row" className="position-relative firstTd pl-2">
                                            <div className="font-11 text-white font-weight-bold text-center px-3" style={{ position: 'absolute', top: '30%', left: '10px', lineHeight: 1.1 }}>
                                                <p className="mb-0">Learn Flamenco like a pro </p>
                                                <p className="mb-0">Gruppe C</p>
                                            </div>
                                            <img src={Bg} width="145px" height="85px" style={{ borderRadius: '13px' }} alt="" />
                                        </td>
                                        <td className="normalTd" style={{ verticalAlign: 'center' }}>
                                            <div className="d-flex flex-wrap flex-row-reverse mx-3 justify-content-center" style={{ maxWidth: '350px' }}>
                                                {
                                                    onlineMembers.map(
                                                        (member, index) => {
                                                            return <img key={index} src={Instructor} alt="instructor" style={{ zIndex: index + 1 }} className="rounded-circle onlineMember imgBorder" width="45px" height="45px" />
                                                        }
                                                    )
                                                }
                                            </div>
                                        </td>
                                        <td className="normalTd px-3 py-2 text-center mb-0">
                                            <p className="mb-0 font-14">Felix</p>
                                            <p className="mb-0 font-14">Max Test</p>
                                            <p className="mb-0 font-14">Mike test</p>
                                            <p className="mb-0 font-14">tester</p>
                                        </td>
                                        <td className="normalTd px-3 text-center mb-0 font-14">12.03.2021</td>
                                        <td className="normalTd px-3 text-center mb-0 font-14">Gruppe</td>
                                        <td className="normalTd px-3 text-center mb-0 font-14">Wöchentlich</td>
                                        <td className="normalTd px-3 text-center mb-0 font-14">Mehrere</td>
                                        <td className="normalTd text-primary px-3 text-center mb-0 font-weight-bold font-14">152€</td>
                                        <td className="normalTd lastTd">
                                            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mr-3" >
                                                <DropdownToggle className="bg-white btn-light">
                                                    <img src={Dots} width="25px" />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                }
                            )
                        }
                    </tbody>
                </table>

                <div className="d-flex mb-4">
                    <button className="mx-1 mt-2 btn btn-outline-primary">1</button>
                    <button className="mx-1 mt-2 btn btn-light border">2</button>
                    <button className="mx-1 mt-2 btn btn-light border">3</button>
                    <button className="mx-1 mt-2 btn btn-light border">4</button>
                    <button className="mx-1 mt-2 btn btn-light border">5</button>
                    <button className="mx-1 mt-2 btn btn-light border">6</button>
                </div>
            </div >
        </>

    )
}

export default TrainerView
