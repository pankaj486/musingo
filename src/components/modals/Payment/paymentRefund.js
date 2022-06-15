import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import Refund from '../../../assets/images/refund.png';

const PaymentRefund = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true);
    const [amount, setAmount] = useState('');

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5" style={{ borderRadius: '35px' }}>
            <img src={Refund} width="80px" alt="cashRegister" className="mt-5 mb-2" />
            <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Rückerstattung anfragen</p>
            <p>Wähle die Summe der Rückerstattung </p>
            <div className="d-flex align-items-center justify-content-center">
                <input value={amount} onChange={e => setAmount(e.target.value)} type="text" className="font-24 font-weight-bold px-2 mr-1 text-right"
                    style={{ borderRadius: '10px', width: '35%', border: '1px solid #707070' }}
                />
                <span className="font-weight-bold font-24">€</span>
            </div>
            <div className="mb-5">
                <button
                    onClick={ amount.length ? () => { handleModalVisibility() } : () => {}}
                    className={"btn-primary btn btn-block py-2 mt-4 text-white mb-2 " + (amount !== '' ? '' : '')}
                    style={{width: '260px', height: '44px', marginLeft: 'auto', marginRight: 'auto'}}
                >
                    Summe anfragen
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

export default PaymentRefund
