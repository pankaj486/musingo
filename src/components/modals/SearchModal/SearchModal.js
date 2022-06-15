import React, { Fragment, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { AiOutlineDown } from 'react-icons/ai';
import Backdrop from '../../Backdrop/Backdrop'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import Autocomplete from "react-google-autocomplete";


import './SearchModal.scss'

const SearchModal = ({ showModal, handleModalVisibility }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);


  let modalContents = (
    <div className="search-modal">
      <h3 className="search-modal-heading helvetica">Beginne deine Suche</h3>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-between pt-0 pt-lg-5">
        <input className="input mt-4 mt-lg-0 helvetica" type="text" placeholder="Stadtteil oder PLZ"></input>
        {/* <Autocomplete
          apiKey="AIzaSyBDjXt0wsh9QrwGxz_WeAKdjuwEmrZ9fe4"
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        /> */}
        <Dropdown className="dropdown mt-4 mt-lg-0" isOpen={dropdownOpen} toggle={toggle} >
          <DropdownToggle className="bg-white helvetica px-5 text-dark btn-outline-dark">
            Unterricht
            <AiOutlineDown className="arrow" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="mt-2 helvetica">Instrumente</DropdownItem>
            <DropdownItem className="mt-2 helvetica">Konzerte</DropdownItem>
            <DropdownItem className="mt-2 helvetica">Jobs</DropdownItem>

          </DropdownMenu>
        </Dropdown>
        <button className="primary-btn helvetica mt-5 mt-lg-0">
          Suchen
        </button>
      </div>
    </div>

  )

  return (
    <Fragment>
      <Backdrop
        showModal={showModal}
        hideModal={handleModalVisibility}
      />
      {showModal && modalContents}
    </Fragment>
  )
}

export default SearchModal
