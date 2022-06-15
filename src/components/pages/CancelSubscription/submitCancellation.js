import React from 'react';
import './cancelSub.scss';
import Cross from '../../../assets/images/cross.png';

const SubmitCancellation = ({ bg, model, text, group, next }) => {
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
        <div className="d-flex flex-column align-items-center justify-content-center flex-1">
            <div style={experienceStyle} className="d-flex flex-column justify-content-center align-items-center text-white text-center">
                <img className="mt-2" src={model} alt="model" width="30px" style={{ border: '2px solid white', borderRadius: '50%' }} />
                <p className="mb-0 font-12 mt-2">{text}</p>
                <p className="font-12">{group}</p>
                <img class="cancelImg" src={Cross} alt="cross" width="40px" />
            </div>

            <p className="font-weight-bold mt-3">Kündigung absenden</p>
            <p>Schreibe Trainername den Grund deiner Kündigung.</p>

            <textarea style={{ borderRadius: '15px', padding: '1rem' }} className="text-center mx-2" name="trainername" cols="50" rows="5" placeholder="Nachricht an Trainername"></textarea>


            <button onClick={next} className="btn text-white my-4 px-5 py-3 btn-primary">
                Mit Trainer Gespräch suchen</button>
            <a href="">Zurück</a>
        </div>
    )
}

export default SubmitCancellation
