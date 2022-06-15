import React from 'react'
import AboutTheExperience from '../Booking/AboutTheExperience/AboutTheExperience';
import './cancelSub.scss';
import Cross from '../../../assets/images/cross.png';

const CancelOptions = ({ bg, model, text, group, next }) => {
    const experienceStyle = {
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '115px',
        position: 'relative',
        width: '85px',
        borderRadius: '20px'
    }
    return (
        <div className="d-flex flex-column flex-md-row ">
            <div className="d-flex flex-column align-items-center justify-content-center flex-1 px-2">
                <div style={experienceStyle} className="d-flex flex-column justify-content-center align-items-center text-white text-center">
                    <img className="mt-2" src={model} alt="model" width="30px" style={{ border: '2px solid white', borderRadius: '50%' }} />
                    <p className="mb-0 font-10 mt-2 font-weight-bold">{text}</p>
                    <p className="font-10 font-weight-bold">{group}</p>
                    <img className="cancelImg" src={Cross} alt="cross" width="35px" />
                </div>

                <p className="font-weight-bold mt-5">Deine Möglichkeiten eine Kündigung zu vermeiden</p>
                <p className="text-center">Oft liegt es nur an Details, dass wir uns für eine Veränderung entscheiden.
                Daher geben wir dir jederzeit die Möglichkeit auch alle Details an deiner
                Experience zu ändern.
                So kannst du eine Kündigung vermeiden.
            </p>
                <div className="d-flex">
                    <button className="defBorder px-4 py-1 mt-2 mr-1 bg-white">
                        Ferien einstellen
                </button>
                    <button className="defBorder px-4 py-1 mt-2 bg-white">
                        Krankheitsbedingter Ausfall
                </button>
                </div>

                <div className="d-flex">
                    <button className="defBorder px-4 py-1 mt-2 mr-1 bg-white">
                        Unterrichtstermin ändern
                </button>
                    <button className="defBorder px-4 py-1 mt-2 bg-white">
                        Instrument ändern
                </button>
                </div>

                <button className="btn text-white my-4 px-5 py-3 btn-primary">
                    Änderungsanfrage vorschlagen
            </button>
                <button className="btn btn-link text-primary" onClick={next}>Trotzdem kündigen</button>
            </div>
            <div className="flex-1 d-flex justify-content-center mx-md-5 px-md-5">
                <AboutTheExperience />
            </div>
        </div>
    )
}

export default CancelOptions
