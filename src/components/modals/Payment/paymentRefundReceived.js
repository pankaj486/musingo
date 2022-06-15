import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import RefundReceived from '../../../assets/images/refundReceived.png';
import User from '../../../assets/images/instructor.png';

const PaymentRefundReceived = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5" style={{ borderRadius: '35px' }}>
            <img className="rounded-circle" src={User} width="60px" alt="cashRegister" style={{ position: 'absolute', top: '40px', left: '30px' }} />
            <img src={RefundReceived} width="80px" alt="cashRegister" className="mt-5 mb-2" />
            <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Anfrage Rückerstattung</p>
            <p>KUNDENNAME hat eine Rückerstattung von SUMME€ bei von dir angefragt</p>
            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className="btn-primary btn btn-block py-2 mt-4 text-white mb-2">
                    Annehmen
                    </button>
                <a href="#">Ablehnen</a>
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

export default PaymentRefundReceived
