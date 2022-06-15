import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import Rating from '../../../assets/images/rating.png';
import User from '../../../assets/images/instructor.png';
import backgroundImage from '../../../assets/images/experience-bg.png'

const Evaluation = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '150px',
        maxWidth: '100%',
        borderRadius: '30px',
        backgroundPosition: 'center'
    }
    const [evaluation, setEvaluation] = useState('')
    let modalContents = (
        <div className="booking-requests__modal" style={{ borderRadius: '35px' }}>
            <div className="p-5 p-md-0 d-flex flex-column justify-content-center align-items-center" style={style}>
                <img className="rounded-circle" src={User} width="50px" alt="cashRegister"
                    style={{ border: '4px solid white' }} />
                <p className="mb-0 text-white font-weight-bold">Learn Flamenco like a pro </p>
            </div>
            <div className="px-5">
                <img src={Rating} width="50px" alt="cashRegister" className="mt-5 mb-2" />
                <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Bewertungstext</p>
                <p>Schreibe, was dir besonders an der Experience gefallen hat.</p>
                <textarea rows="5" className="mt-2 text-center p-2" style={{ borderRadius: '20px', width: '100%' }} placeholder="Dein Bewertungstext" onChange={(event) => setEvaluation(event.target.value)}></textarea>
                <span className="font-12">Wird auf XX Seite veröffentlicht</span>
                <div className="mb-5">
                    <button
                        onClick={() => { handleModalVisibility(); next() }}
                        className={`${evaluation ? '' : 'disabled'} btn-primary btn btn-block py-2 mt-4 text-white mb-2`}>
                        Absenden
                    </button>
                </div>
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

export default Evaluation;
