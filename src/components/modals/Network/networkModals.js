import React from 'react'
import { Modal, ModalBody } from 'reactstrap';
import { useState, useEffect } from 'react';
import NetworkSearchContent from './networkSearchContent';
import ApplicationForm from './applicationForm';
import Reply from './reply';
import Existing from './existing';
import './networmModal.scss';
import NetworkBook from './networkBook';
import FullScreenModal from '../FullScreenModal/fullScreenModal';
import ClearIcon from '../../../assets/images/cancel-icon.png';

const NetworkModals = () => {

    const [modal, setModal] = useState(false);
    const [progress, setprogress] = useState(0);
    const networkBook1Text = 'Hi, ich gerne biete ich das an. Schau mal hier. Dort kannst du einfach buchen.';
    const networkBook2Text = 'Hi XX, ich gerne biete ich das an. Schau mal hier. Dort kannst du einfach buchen.';

    useEffect(() => {
        setModal(true);
    }, []);

    return (
        <FullScreenModal modalShow={modal}>
            <div className="d-flex flex-column justify-content-center networkModal">
                <button onClick={()=>setModal(false)} className="btn clearButton"><img src={ClearIcon} alt="clearIcon" height="32px" width="32px"/></button>
                {progress === 0 && <NetworkSearchContent setProgress={() => { setprogress(progress + 1) }} />}
                {progress === 1 && <ApplicationForm setProgress={() => { setprogress(progress + 1) }} />}
                {progress === 2 && <Reply setProgress={() => { setprogress(progress + 1) }} />}
                {progress === 3 && <Existing setProgress={() => { setprogress(progress + 1) }} />}
                {progress === 4 && <NetworkBook text={networkBook1Text} setProgress={() => { setprogress(progress + 1) }} />}
                {progress === 5 && <NetworkBook text={networkBook2Text} setProgress={() => { setModal(false) }} />}
            </div>
        </FullScreenModal>
    )
}

export default NetworkModals;
