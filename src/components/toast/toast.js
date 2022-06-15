import React, { useState, useEffect, Fragment } from 'react';
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import ModelIcon from '../../assets/images/model.png';
import CloseIcon from '../../assets/images/toastClose.png';
import './toast.scss';

const ToastComponent = (props) => {
    const { buttonLabel } = props;
    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 5000);
    }, [])

    return (
        <div className="toast-container">
            <Toast isOpen={show} className="ml-auto mr-4">
                <ToastBody className="d-flex align-items-center justify-content-between py-0" style={{ position: 'relative' }}>
                    <div className="d-flex pr-3 py-3">
                        <img src={ModelIcon} alt="toastImage" width="40px" />
                    </div>
                    <div className="d-flex flex-column pr-3 py-3">
                        <p className="font-weight-bold mb-0">Community:</p>
                        <p className="mb-0">Lisa folgt dir jetzt asds asda</p>
                    </div>
                    <div className="d-flex flex-column pr-3 py-3">
                        <p className="mb-0">Vor 2</p>
                        <p className="mb-0">Sekunden</p>
                    </div>
                    <div className="toastBorder"></div>
                    <div className="px-2 py-3 cursor-pointer" onClick={toggle}>
                        <img width="20px" src={CloseIcon} alt="toastClose" />
                    </div>
                </ToastBody>
            </Toast>
            <Button color="primary" onClick={toggle} style={{ marginTop: '100px' }}>Toast</Button>

        </div>
    );
}

export default ToastComponent;
