import React, { useState } from 'react';
import './customerView.scss';
import Dots from '../../assets/images/whiteDots.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CustomerPackage = ({ backgroundImage, type, text, user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '245px',
        maxWidth: '200px'
    }

    return (
        <div className="text-white p-3 mr-4 mb-4 d-flex flex-column justify-content-between align-items-center packageBox" style={style}>
            <img className="mt-2" src={user} alt="model" width="60px" style={{ border: '3px solid white', borderRadius: '50%' }} />
            <h5 className="text-center">{text}</h5>
            <p className="font-18">{type}</p>
            <div className="customPckOptions">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ml-3 mb-2 ">
                    <DropdownToggle className="btn btn-light" style={{ background: 'none', border: 'none' }}>
                        <img width="25px" src={Dots}/>
                    </DropdownToggle>
                    <DropdownMenu>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}

export default CustomerPackage;
