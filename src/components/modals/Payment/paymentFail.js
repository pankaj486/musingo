import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import CashRegister from '../../../assets/images/cashRegister.png';

const PaymentFail = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5" style={{borderRadius:'35px'}}>
            <img src={CashRegister} alt="cashRegister" className="mt-5 mb-2"/>
            <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Deine Zahlung hat leider nicht geklappt</p>
            <p>Versuche es erneut oder wähle eine andere
                Verbindung oder Zahlungsmethode.</p>
            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className="btn-primary btn btn-block py-2 mt-4 text-white mb-2">
                    Weiter
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

export default PaymentFail
