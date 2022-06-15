import React, { useState } from 'react'
import Bg from '../../../assets/images/coachOnboard.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './becomeCoach.scss'

const BecomeCoach = () => {

    const style = {
        background: `url(${Bg}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        minWidth: '100vw',
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div className="mt-5 d-flex flex-column align-items-end justify-content-center become-coach" style={style}>
            <div className="bg-white text-center p-5 mx-2 mx-md-5" style={{ borderRadius: '30px' }}>
                <h1 className="font-weight-bold">Werde Trainer.</h1>
                <p>Verdiene Geld mit deinen Fähigkeiten.<br />
                    Werde Teil unserer Community.</p>
                <div className="d-flex flex-column flex-md-row my-5">
                    <div className="mx-2">
                        <input type="text" style={{ border: 'none', maxWidth: '100px', borderBottom: '1px solid gray' }}></input>
                        <span className="font-24">€</span>
                        <p className="font-12 pt-2" style={{ lineHeight: '1.2' }}>Preis pro <br /> Einheit</p>
                    </div>
                    <div className="mx-2">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret className="bg-white px-5 text-dark font-18" style={{ border: 'none' }}>
                                Unterricht
                            </DropdownToggle>
                            <DropdownMenu>

                            </DropdownMenu>
                        </Dropdown>
                        <p className="font-12 pt-2" style={{ lineHeight: '1.2' }}>Art der<br /> Experience</p>
                    </div>
                    <div className="mx-2">
                        <input type="text" style={{ border: 'none', maxWidth: '100px', borderBottom: '1px solid gray' }}></input>
                        <span className="font-24">€</span>
                        <p className="font-12 pt-2" style={{ lineHeight: '1.2' }}>Monatlicher<br /> Verdienst</p>
                    </div>
                </div>
                <button className="btn btn-primary font-weight-bold text-white px-4">Jetzt starten</button>
            </div>
        </div>
    )
}

export default BecomeCoach;
