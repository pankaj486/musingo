import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';

const ConfirmPayment = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5" style={{ borderRadius: '35px', minWidth: '450px' }}>
            <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2 pt-5">Bestätige deine Zahlungsinfo</p>
            <p>Bitte nimm dir einen kurzen Moment, um deine Zahlungsinfo zu bestätigen. Dies dauert nur wenige Sekunden.</p>
            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className="btn-primary btn btn-block py-2 mt-4 text-white mb-2">
                    Jetzt bestätigen
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

export default ConfirmPayment
