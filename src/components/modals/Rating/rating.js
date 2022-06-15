import React, { useState, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import Rating from '../../../assets/images/rating.png';
import User from '../../../assets/images/instructor.png';
import backgroundImage from '../../../assets/images/experience-bg.png';
import StarRating from 'react-star-ratings';
import Evaluation from './evalution';

const RatingModal = ({ next }) => {
    let [showModal, setModalVisibility] = useState(true)

    const handleModalVisibility = () => {
        setModalVisibility(!showModal)
    }

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '150px',
        maxWidth: '100%',
        borderRadius: '30px'
    }
    const [active, setActive] = useState(0);
    const [lerninhalteRating, setLerninhalteRating] = useState(0);
    const [freundlichkeitRating, setFreundlichkeitRating] = useState(0);
    const [terminfindungRating, setTerminfindungRating] = useState(0);
    const [räumlichkeitenRating, setRäumlichkeitenRating] = useState(0);

    const changeRating = (newRating, name) => {
        if (name === 'lerninhalteRating') {
            setLerninhalteRating(newRating);
        } else if (name === 'freundlichkeitRating') {
            setFreundlichkeitRating(newRating);
        } else if (name === 'terminfindungRating') {
            setTerminfindungRating(newRating);
        } else if (name === 'räumlichkeitenRating') {
            setRäumlichkeitenRating(newRating);
        }
    }

    let modalContents = (
        <div className="booking-requests__modal " style={{ borderRadius: '35px' }}>
            <div className="p-5 p-md-0 d-flex flex-column justify-content-center align-items-center" style={style}>
                <img className="rounded-circle" src={User} width="50px" alt="cashRegister"
                    style={{ border: '4px solid white' }} />
                <p className="mb-0 text-white font-weight-bold">Learn Flamenco like a pro </p>
            </div>
            <div className="px-5 mb-2">
                <img src={Rating} width="50px" alt="cashRegister" className="mt-4 mb-2" />
                <p className="booking-requests__count font-18 mb-1 font-weight-bold mt-2">Deine Bewertung</p>
                <p>Gib xx eine Bewertung, sodass sich unsere Community stets verbessert. Sternbewertungen bleiben anonym. </p>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex align-items-center my-2">
                        <p className="mb-0 mr-3 text-left" style={{ width: '100px' }}>Lerninhalte</p>
                        <StarRating
                            rating={lerninhalteRating}
                            starRatedColor="#ffb400"
                            starHoverColor="#ffb400"
                            numberOfStars={5}
                            name='lerninhalteRating'
                            changeRating={changeRating}
                            starDimension={'1.8rem'}
                            starSpacing="2px"
                            starEmptyColor="#ededed"
                        />
                    </div>

                    <div className="d-flex align-items-center my-2">
                        <p className="mb-0 mr-3 text-left" style={{ width: '100px' }}>Freundlichkeit</p>
                        <StarRating
                            rating={freundlichkeitRating}
                            starRatedColor="orange"
                            starHoverColor="orange"
                            numberOfStars={5}
                            name='freundlichkeitRating'
                            changeRating={changeRating}
                            starDimension={'1.8rem'}
                            starSpacing="2px"
                            starEmptyColor="#ededed"
                        />
                    </div>

                    <div className="d-flex align-items-center my-2">
                        <p className="mb-0 mr-3 text-left" style={{ width: '100px' }}>Terminfindung</p>
                        <StarRating
                            rating={terminfindungRating}
                            starRatedColor="orange"
                            starHoverColor="orange"
                            numberOfStars={5}
                            name='terminfindungRating'
                            changeRating={changeRating}
                            starDimension={'1.8rem'}
                            starSpacing="2px"
                            starEmptyColor="#ededed"
                        />
                    </div>

                    <div className="d-flex align-items-center my-2">
                        <p className="mb-0 mr-3 text-left" style={{ width: '100px' }}>Räumlichkeiten</p>
                        <StarRating
                            rating={räumlichkeitenRating}
                            starRatedColor="orange"
                            starHoverColor="orange"
                            numberOfStars={5}
                            name='räumlichkeitenRating'
                            changeRating={changeRating}
                            starDimension={'1.8rem'}
                            starSpacing="2px"
                            starEmptyColor="#ededed"
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <button
                        onClick={() => { handleModalVisibility(); setActive(1) }}
                        className={"btn-primary btn btn-block py-2 mt-4 text-white mb-2 "
                            + ((lerninhalteRating !== 0 || freundlichkeitRating !== 0 || terminfindungRating !== 0 || räumlichkeitenRating !== 0) ? '' : 'disabled')
                        }>
                        Weiter
                    </button>
                </div>
            </div>
        </div>
    )


    return (
        <div>
            {active === 0 && <Fragment>
                <Backdrop
                    showModal={showModal}
                    hideModal={handleModalVisibility}
                />
                {showModal && modalContents}
            </Fragment>}
            {
                active === 1 &&
                <Evaluation />
            }
        </div>
    )
}

export default RatingModal;
