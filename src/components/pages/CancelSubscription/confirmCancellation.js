import React, { Fragment, useState } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import Spinner from '../../../assets/images/spinner.gif'

const ConfirmCancellation = ({ title, desc, time, next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5">
            <img src={Spinner} alt="spinner" width="150px" />
            <p className="booking-requests__count mb-0 font-weight-bold mt-2">{title}</p>
            <p className="px-2">{desc}</p>
            <h5 className="my-4">{time}</h5>
            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className="btn-primary btn btn-block py-3 text-white mb-2">
                    Zu diesem Zeitpunkt kündigen
                    </button>
                <a href="" onClick={handleModalVisibility}>Zurück</a>
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

export default ConfirmCancellation
