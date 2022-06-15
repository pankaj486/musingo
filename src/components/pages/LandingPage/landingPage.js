import React, { Fragment, useEffect, useRef, useState } from 'react';
import Carousel from 'src/components/carousel/carousel';
import SearchModal from 'src/components/modals/SearchModal/SearchModal';
import MusingooNavbar2 from '../../layout/navbar-landing'
import MusingooNavbar from '../../layout/navbar'
import './landingPage.scss'




const LandingPage = (props) => {

    const [visible, setVisible] = useState(false)

    return (
        <div>
            <div className="d-block d-md-none">
                <MusingooNavbar2 />
            </div>
            <div className="d-none d-md-block">
                <MusingooNavbar />
            </div>

            <div className="container landing-page pt-5 pt-md-0">
                <div className="row">
                    <div className="col-12 col-lg-7 p-0 p-md-3">
                        <Carousel visible={() => setVisible(true)} />
                    </div>
                    <div className="col-12 col-lg-5 right-side">
                        <h2 className="title">Your place to make music together</h2>
                        <p className="des">Join the Community! Finde Musikunterricht, Instrumente und Konzerte von geprüften Musikern in deiner Nähe.</p>
                        <div className="d-flex align-items-center justify-between mt-5">
                            <input className="input d-none d-lg-block" type="text" placeholder="Wo?" onClick={() => setVisible(true)}></input>
                            <button className="primary-btn" onClick={() => setVisible(true)}>
                                Suchen
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="bottom-side">
                            <div>
                                <p className="d-none d-lg-block text-center">Diese Künstler vertrauen uns</p>
                                <p className="big text-center">Max Grubinger</p>
                            </div>
                            <h2 className="text-center">Elis Murton</h2>
                            <h2 className="text-center">UDOLINDENBERG</h2>
                            <h4 className="text-center">Die Prinzen</h4>
                            <h4 className="d-none d-lg-block text-center">Die Ärzte</h4>
                        </div>
                    </div>

                </div>
            </div>
            <SearchModal

                showModal={visible}
                handleModalVisibility={() => setVisible(false)}
            />
        </div>
    )
}

export default LandingPage