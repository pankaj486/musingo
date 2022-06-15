import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FaChevronDown } from "react-icons/fa";
import { Modal, ModalBody } from 'reactstrap';
import './application.scss'
import { Link } from 'react-router-dom'

const CancelApplication = ({modal, toggleModal}) => {
    let [dropdownState, setDropdownState] = useState(false);
    let [dropdownLabel, setDropdownLabel] = useState('Grund');
    let [reason, setReason] = useState('');
    // const [modal, setModal] = useState(false)
    let reasons = [
        'Not interested',
        'Found Someone',
        'Too expensive'
    ]
    const handleSelectReason = (reason) => {
        setReason(reason)
        setDropdownLabel(reason)
    }
    const toggle = () => setDropdownState(prevState => !prevState);

    return (
        <div className="deny-request-container">
            <Modal isOpen={modal} toggle={toggleModal} centered={true} className="register" >
                <ModalBody className='otherModal d-flex pt-5 flex-column' style={{borderRadius: '4rem'}}>
                    <h2>Bewerbung ablehnen</h2>
                    <p className="text-center px-4 pt-2">Schreibe, warum du die Bewerbung nicht annehmen kannst</p>
                    {<Dropdown isOpen={dropdownState} toggle={toggle} style={{width:'100%'}} className="d-flex justify-content-center">
                        <DropdownToggle caret className="bg-white px-5 text-dark btn-outline-dark reason-dropdown">
                            <span className="dropdown-label">{dropdownLabel}</span>
                            <FaChevronDown />
                        </DropdownToggle>
                        <DropdownMenu style={{width:'100%'}}>
                            {
                                reasons.map((reason, index) => {
                                    return <DropdownItem key={index} onClick={() => handleSelectReason(reason)}>{reason}</DropdownItem>
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>}
                    <textarea className="deny-request-comments" />
                    <button className="deny-request-cta">Ablehnen</button>
                    <Link
                        to={{
                            pathname: "/applications",
                        }}>
                        <p className="back-cta mb-4">Zurück</p>
                    </Link>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CancelApplication