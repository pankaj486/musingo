import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Package from '../package/Package';
import CustomerPackage from './customerPackage';
import BackgroundImage from '../../assets/images/modalBackground.png'
import Model from '../../assets/images/model.png';
import { useHistory } from 'react-router-dom';

const CustomerView = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const history = useHistory();

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
                            })} className='font-weight-bold'>Meine Buchungen</p>
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
            <div className="defContainer mt-3 d-flex flex-column justify-content-center align-items-center font-14">
                <h2>Meine Buchungen</h2>
                <div className="d-flex flex-column flex-md-row align-items-center mb-4 mt-4">
                    <p className="mb-0 mr-3 mb-2">Experience Art</p>
                    <a style={{ borderRadius: '20px' }} className="defBorder settingButton px-4 py-2 mx-1 mb-2 font-12">Unterricht</a>
                    <a style={{ borderRadius: '20px' }} className="defBorder settingButton px-4 py-2 mx-1 mb-2 font-12">Instruments</a>
                    <a style={{ borderRadius: '20px' }} className="defBorder settingButton px-4 py-2 mx-1 mb-2 font-12">Jobs</a>
                    <a style={{ borderRadius: '20px' }} className="defBorder settingButton px-4 py-2 mx-1 mb-2 font-12">Concerts</a>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ml-3 mb-2">
                        <DropdownToggle caret className="bg-white px-5 text-dark btn-outline-dark font-12">
                            Aktive
                        </DropdownToggle>
                        <DropdownMenu>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-center" style={{ maxWidth: '80vw' }}>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>
                    <CustomerPackage user={Model} type="Einzel" text="Learn Djambe traditionally" backgroundImage={BackgroundImage}></CustomerPackage>

                </div>
            </div>
        </>
    )
}

export default CustomerView;
