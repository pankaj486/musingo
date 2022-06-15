import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import backgroundImage from '../../../assets/images/kidsModalBg.png';
import './kids.scss';
import ProgressBar from '../../progressBar/ProgressBar';

const KidsModal = ({ next }) => {

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        // position: 'relative'
    }


    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal kidsModal px-5" style={style}>
            <div className="text-white py-5">
                <h1 className="mb-4">Willkommen <br />bei Kids</h1>
                <ProgressBar />
                <p className="font-weight-bold mt-4">Lade Kids Experiences</p>
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

export default KidsModal
