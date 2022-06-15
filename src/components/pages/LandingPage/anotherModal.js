import React, { Fragment, useEffect, useRef, useState } from 'react';
import './inviteFriends.scss'
import { Modal, ModalBody } from 'reactstrap';
import Gmail from '../../../assets/images/new/gmail.png'
import Mail from '../../../assets/images/new/mail.png'
import Yahoo from '../../../assets/images/new/yahoo.png'
import Outlook from '../../../assets/images/new/outlook.png'
import Arrow from '../../../assets/images/new/arrowRe.png'
// import { AiOutlinePlus } from 'react-icons/ai';
import Backdrop from 'src/components/Backdrop/Backdrop';




const InviteModal = ({ showModal, handleModalVisibility, onClickMail, onClickArrow }) => {

    let modalContents = (
        <div className="invite-modal">
            <div className="d-flex flex-column justify-content-center text-center" >
                <Fragment>
                    <h2 className="last-modal-title"> Jetzt einladen via </h2>
                    <p className="last-modal-des">Lade deine Freunde und Kontakte ganz einfach via Mail ein.  </p>

                    <div className="d-flex align-items-center mt-3 justify-content-center">
                        <img className="modal-img" src={Gmail} />
                        <img className="modal-img" src={Outlook} />
                        <img className="modal-img" src={Yahoo} />
                        <img className="modal-img" onClick={onClickMail} src={Mail} />
                        <img className="modal-img" onClick={onClickArrow} src={Arrow} />
                    </div>
                </Fragment>
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

export default InviteModal