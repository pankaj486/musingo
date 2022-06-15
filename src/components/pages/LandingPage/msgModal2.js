import React, { Fragment, useEffect, useRef, useState } from 'react';
import './inviteFriends.scss'
import Gmail from '../../../assets/images/new/gmail.png'
import Mail from '../../../assets/images/new/mail.png'
import Yahoo from '../../../assets/images/new/yahoo.png'
import Outlook from '../../../assets/images/new/outlook.png'
import Arrow from '../../../assets/images/new/arrowRe.png'
import { BsChevronLeft } from 'react-icons/bs';
import Backdrop from 'src/components/Backdrop/Backdrop';




const MsgModal2 = ({ open, onClose, onCross }) => {


    let modalContents = (
        <div className="invite-msg-modal">
            <Fragment>
                <div className="invite-friendz">
                    <BsChevronLeft onClick={onCross} className="left-arrow" />
                    <div className="container">
                        <div className="row flex-column justify-content-center align-items-center">
                            <div className="col-12">
                                <h2>Freunde einfach via Mail einladen</h2>
                                <h4>Gib einfach die Mailadressen deiner Freunde ein:  </h4>
                            </div>
                            <div className="d-flex mt-5 W-100 align-items-center justify-content-center">
                                <input className="input2" type="text" placeholder="Durchsuchen" ></input>
                                <img className="modal-img" src={Arrow} />
                            </div>
                            <p>Hochladen via: CSV,  oder .txt.</p>
                            <button className="musingoo-button2">
                                Hinzufügen
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    )

    return (
        <Fragment>
            <Backdrop
                showModal={open}
                hideModal={onClose}
            />
            {open && modalContents}
        </Fragment>
    )
}

export default MsgModal2