import React, { Fragment, useEffect, useRef, useState } from 'react';
import Carousel from 'src/components/carousel/carousel';
import SearchModal from 'src/components/modals/SearchModal/SearchModal';
import MusingooNavbar2 from '../../layout/navbar-landing'
import MusingooNavbar from '../../layout/navbar'
import './inviteFriends.scss'
import Avatar from '../../../assets/images/model.png'
import { Modal, ModalBody } from 'reactstrap';
import Gmail from '../../../assets/images/new/gmail.png'
import Mail from '../../../assets/images/new/mail.png'
import Yahoo from '../../../assets/images/new/yahoo.png'
import Outlook from '../../../assets/images/new/outlook.png'
import Arrow from '../../../assets/images/new/arrowRe.png'
// import { AiOutlinePlus } from 'react-icons/ai';
import Backdrop from 'src/components/Backdrop/Backdrop';




const InviteFriendModalMore = ({ open, onClose }) => {

    let modalContents = (
        <div className="invite-friendz-modal2">
            <div className="invite-friendz">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12">
                            <h2>Invite your Friends</h2>
                            <h4>Push deine Reichweite ganz einfach mit deinen Freunden und Kontakten</h4>
                            <div className="w-100 d-flex align-items-center flex-column">
                                <button className="musingoo-button">
                                    Invite all
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-12 mt-5">
                            <p className="text text-center">Neue Kontakte</p>
                            <div className="left-side2">
                                <div className="field">
                                    <img className="avatar" src={Avatar} />
                                    <div className="mr-4">
                                        <h4>Firstname</h4>
                                        <h4>Lastname</h4>
                                    </div>
                                    <p className="mr-4">f******@gmail.com</p>
                                    <button className="primary-btn">
                                        Invite
                                    </button>
                                </div>
                                <div className="field">
                                    <img className="avatar" src={Avatar} />
                                    <div className="mr-4">
                                        <h4>Firstname</h4>
                                        <h4>Lastname</h4>
                                    </div>
                                    <p className="mr-4">f******@gmail.com</p>
                                    <button className="primary-btn2">
                                        Invited
                                    </button>
                                </div>
                                <div className="field">
                                    <img className="avatar" src={Avatar} />
                                    <div className="mr-4">
                                        <h4>Firstname</h4>
                                        <h4>Lastname</h4>
                                    </div>
                                    <p className="mr-4">f******@gmail.com</p>
                                    <button className="primary-btn2">
                                        Invited
                                    </button>
                                </div>
                                <div className="field">
                                    <img className="avatar" src={Avatar} />
                                    <div className="mr-4">
                                        <h4>Firstname</h4>
                                        <h4>Lastname</h4>
                                    </div>
                                    <p className="mr-4">f******@gmail.com</p>
                                    <button className="primary-btn">
                                        Invite
                                    </button>
                                </div>
                                <div className="field">
                                    <img className="avatar" src={Avatar} />
                                    <div className="mr-4">
                                        <h4>Firstname</h4>
                                        <h4>Lastname</h4>
                                    </div>
                                    <p className="mr-4">f******@gmail.com</p>
                                    <button className="primary-btn">
                                        Invite
                                    </button>
                                </div>
                                <div className="field">
                                    <img className="avatar" src={Avatar} />
                                    <div className="mr-4">
                                        <h4>Firstname</h4>
                                        <h4>Lastname</h4>
                                    </div>
                                    <p className="mr-4">f******@gmail.com</p>
                                    <button className="primary-btn">
                                        Invite
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
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

export default InviteFriendModalMore