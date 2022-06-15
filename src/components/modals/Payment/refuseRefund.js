import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import RefundRefuse from '../../../assets/images/refuse.png';
import User from '../../../assets/images/instructor.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './refuseRefund.scss'

const RefuseRefund = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [reason, setReason] = useState('')
    let modalContents = (
        <div className="booking-requests__modal px-5" style={{ borderRadius: '35px' }}>
            <img className="rounded-circle" src={User} width="50px" alt="cashRegister" style={{ position: 'absolute', top: '40px', left: '30px' }} />
            <img src={RefundRefuse} width="70px" alt="cashRegister" className="mt-5 mb-2" />
            <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Rückerstattung ablehnen</p>
            <p style={{marginBottom: '23px'}}>Bitte wähle den Grund des Ablehnend</p>
            <Dropdown isOpen={dropdownOpen} className="refuse-refund-reason-dropdown" toggle={toggle} style={{ width: '99%' }}>
                <DropdownToggle caret className="bg-white px-5 text-dark btn-outline-dark" style={{ width: '100%' }}>
                    Grund
                 </DropdownToggle>
                <DropdownMenu>
                </DropdownMenu>
            </Dropdown>
          
            <textarea onChange={(event => setReason(event.target.value))} rows="5" className="" style={{ borderRadius: '20px', width: '100%', marginBottom: 0, marginTop: '26px', outline: 0 }}></textarea>

            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className={`${reason ? '' : 'disabled'} btn-primary btn btn-block py-2 mt-4 text-white mb-2{`}>
                    Ablehnen
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

export default RefuseRefund;
