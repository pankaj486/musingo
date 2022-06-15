import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FaChevronDown } from "react-icons/fa";

import './CancelBookingRequest.scss'
import { Link } from 'react-router-dom'

const CancelBookingRequest = props => {
  let [dropdownState, setDropdownState] = useState(false);
  let [dropdownLabel, setDropdownLabel] = useState('Grund');
  let [reason, setReason] = useState('')
  let reasons = [
    'Not interested',
    'Found Someone',
    'Too expensive'
  ]
  const handleSelectReason = (reason) => {
    setReason(reason)
    setDropdownLabel(reason)
  }
  const toggle = () => setDropdownState(prevState => !prevState)
  return (
    <div className="deny-request-container">
      <h2>Anfrage ablehnen</h2>
      <p>Schreibe NAME, warum du die Anfrage nicht annehmen kannst</p>
      {<Dropdown isOpen={dropdownState} toggle={toggle} >
        <DropdownToggle caret className="bg-white px-5 text-dark btn-outline-dark reason-dropdown">
          <span className="dropdown-label">{dropdownLabel}</span>
          <FaChevronDown/>
        </DropdownToggle>
        <DropdownMenu>
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
          pathname: "/bookingInquiries",
        }}
      >
        <span className="back-cta">Zurück</span>
      </Link>
    </div>
  )
}

export default CancelBookingRequest