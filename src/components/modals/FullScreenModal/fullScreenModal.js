import React, { useState } from 'react';
import './fullScreenModal.scss';

const FullScreenModal = ({ modalShow, children }) => {

    const [showModal, setShowModal] = useState(false);

    if (!modalShow) {
        return null;
    }
    return (
        <div className="d-flex justify-content-center align-items-center fullScreenModal">
            <div className="fullScreenBackDrop"></div>
            {children}
        </div>
    )

}

export default FullScreenModal
