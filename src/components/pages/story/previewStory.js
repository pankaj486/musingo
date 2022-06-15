import React, { useState, Fragment } from 'react';
import './addStory.scss';
import Backdrop from '../../Backdrop/Backdrop';

const PreviewStory = ({ url, bandName, persons, story }) => {

    const storyHeader = {
        background: `url(${url})`,
        borderRadius: '0 0 20px 20px',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        minHeight: '300px'
    }
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    let modalContents = (
        <div className="booking-requests__modal p-4" style={{ width: 'auto' }}>
            <span className="booking-requests__close-modal" onClick={handleModalVisibility}>X</span>
            <h4>Success story in Prüfung</h4>
            <p className="mt-4">Deine/Eure Success Story ist nun in Prüfung. Unser Team schaut nun darüber
                 damit alles perfekt aussieht Ihr erhaltet eine Bestätigung, sobald eure Anzeige online ist.</p>
        </div>
    )

    return (
        <div className="pos-relative mb-4">
            <div className="mt-5 pt-5 d-flex flex-column" style={storyHeader}>
                <div className="align-self-end justify-self-end mr-md-5 my-4">
                    <button className="btn btn-outline-secondary px-5 py-2 font-weight-bold">
                        Folgen
                    </button>
                </div>
            </div>
            <div className="container">
                <p className="font-weight-bold font-18 text-center my-5 text-uppercase">{bandName}</p>
                <div className="d-flex justify-content-center align-items-center">
                    {
                        persons.map(
                            (person, index) => {
                                return <div className="d-flex flex-column align-items-center">
                                    <img className="rounded-circle mx-1" src={person.image} alt="addPic" width="60px" />
                                    <div className="badge badge-secondary font-10 px-2 my-2 mx-1 py-1">{person.name}</div>
                                </div>
                            }
                        )}
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center mx-auto mt-4" style={{ maxWidth: '700px' }}>
                    <p className="font-weight-bold font-18">Die Story</p>
                    <p className="font-italic font-14">{story}</p>

                </div>
            </div>
            <Fragment>
                <Backdrop
                    showModal={showModal}
                    hideModal={handleModalVisibility}
                />
                {showModal && modalContents}
            </Fragment>
        </div>
    )
}

export default PreviewStory;
