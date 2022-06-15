import React, { Fragment, useState } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import './cancelSub.scss';
import Sync from '../../../assets/images/sync.png';

const SubscriptionRenewal = ({ bg, model, text, group, title, desc, next, buttonText, returnText }) => {

    const experienceStyle = {
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '120px',
        position: 'relative',
        width: '90px',
        borderRadius: '20px'
    }

    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal px-5">
            <div style={experienceStyle} className="mx-auto pt-2 my-4 d-flex flex-column justify-content-center align-items-center text-white text-center">
                <img className="mt-2" src={model} alt="model" width="30px" style={{ border: '2px solid white', borderRadius: '50%' }} />
                <p className="mb-0 font-12 mt-2">{text}</p>
                <p className="font-12">{group}</p>
                <img class="cancelImg" src={Sync} alt="cross" width="40px" />
            </div>

            <h5 className="booking-requests__count mb-0 font-weight-bold mt-2">{title}</h5>
            <p className="px-2 mt-4">{desc}</p>
            <div className="mb-5">
                <button
                    onClick={() => { handleModalVisibility(); next() }}
                    className="btn-primary btn btn-block py-3 text-white mb-2">
                    {buttonText}
                </button>
                {returnText && <a href="" onClick={handleModalVisibility}>{returnText}</a>}
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

export default SubscriptionRenewal;
