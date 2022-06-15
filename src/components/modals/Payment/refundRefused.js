import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import RefuseRefund from '../../../assets/images/refuse.png';
import User from '../../../assets/images/instructor.png';

const RefundRefused = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5" style={{ borderRadius: '35px' }}>
            <img className="rounded-circle" src={User} width="60px" alt="cashRegister" style={{ position: 'absolute', top: '40px', left: '30px' }} />
            <img src={RefuseRefund} width="80px" alt="cashRegister" className="mt-5 mb-2" />
            <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Rückerstattung abgelehnt</p>
            <p>Leider hat NAME deine Rückerstattungsanfrage abgelehnt. Vielleicht auch aus Versehen. Kläre dies einfach im Chat mit NAME. Falls es dennoch ein Problem geben sollte, wende dich an unseren Support, dann helfen wir gern.</p>
            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className="btn-primary btn btn-block py-2 mt-4 text-white mb-2">
                    Zum chat
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

export default RefundRefused
