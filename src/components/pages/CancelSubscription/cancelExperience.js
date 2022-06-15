import React, { useState } from 'react';
import './cancelSub.scss';
import Cross from '../../../assets/images/cross.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CancelExperience = ({ bg, model, text, group, next }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const experienceStyle = {
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '120px',
        position: 'relative',
        width: '90px',
        borderRadius: '20px'
    }
    return (
        <div style={{ maxWidth: '500px' }}
            className="d-flex flex-column align-items-center justify-content-center flex-1 text-center">
            <div style={experienceStyle} className="d-flex flex-column justify-content-center align-items-center text-white text-center">
                <img className="mt-2" src={model} alt="model" width="30px" style={{ border: '2px solid white', borderRadius: '50%' }} />
                <p className="mb-0 font-12 mt-2">{text}</p>
                <p className="font-12">{group}</p>
                <img class="cancelImg" src={Cross} alt="cross" width="40px" />
            </div>

            <p className="font-weight-bold mt-3">Experience kündigen</p>
            <p>Bitte wähle den Grund des Ablehnend</p>

            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mt-4">
                <DropdownToggle caret className="bg-white px-5 text-dark btn-outline-dark">
                    Trainer passt nicht zu mir
                 </DropdownToggle>
            </Dropdown>
            <p className="mt-2">Wenn es ein Problem mit einem Trainer gibt, versuche vorerst das Gespräch zu suchen,
            um eine Kündigung zu vermeiden. Falls du Bedenken hast, dass TRAINERNAME nicht in die
            Community passt, melde uns dies bitte umgehend hier.
            </p>

            <button className="btn text-white my-4 px-5 py-3 btn-primary">
                Mit Trainer Gespräch suchen</button>
            <button className="btn btn-link text-primary" onClick={next}>Trotzdem kündigen</button>
        </div>
    )
}

export default CancelExperience
