import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Community from './community';
import BecomeCoach from './becomeCoach';

import Bg from '../../../assets/images/coachOnboard.png';
import Tag from '../../../assets/images/tag.png';
import Book from '../../../assets/images/book.png';
import Time from '../../../assets/images/time.png';
import Note from '../../../assets/images/note.png';
import Calc from '../../../assets/images/calc.png';
import Script from '../../../assets/images/script.png';
import Test1 from '../../../assets/images/testimoinal1.png';
import ex from '../../../assets/images/experience-bg.png';
import caret from '../../../assets/images/caret.png';
import model from '../../../assets/images/instructor.png';

import './coachOnboard.scss';

const CoachOnboard = () => {

    const testimonialStyle1 = {
        background: `url(${Test1}) no-repeat`,
        backgroundSize: 'contain',
        minHeight: '350px',
        maxWidth: '350px',
        borderRadius: '20px'
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    // const [dropdownValue, setDropdownValue] = useState('');

    const desc = 'adsasdasdasdasd asdasdadsasdadsa asdasdasdasd asd';

    return (
        <div className="coachHeader">
            <div className="d-flex flex-column-reverse flex-md-row">
                <div className="flex-1 ml-md-5 mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="font-weight-bold">Werde Trainer.</h1>
                    <p className="font-24">Verdiene Geld mit deinen Fähigkeiten.<br />Werde Teil unserer Community.</p>
                    <p className="pt-5">Was willst du anbieten?</p>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                        <DropdownToggle className="bg-white py-0 pl-0 pr-4 text-dark customDrop">
                            <div className="d-flex align-items-center">
                                <img src={ex} width="60px" height="60px" className="rounded-circle"/>
                                <p className="mb-0 mx-4">Auswählen</p>
                                <img src={caret} width="20px" height="10px"/>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu>
                        </DropdownMenu>
                    </Dropdown>
                    <button className="btn btn-primary text-white px-4 py-2 mt-5">Jetzt starten</button>
                </div>
                <div className="flex-1">
                    <img src={Bg} alt="bg" style={{width: '100%'}}/>
                </div>
            </div>



            <div className="container d-flex flex-column justify-content-center align-items-center text-center pt-5"
            style={{marginTop: '108px'}}
            >
                <h1 className="font-weight-bold mb-5"> Warum Musingoo Trainer werden?</h1>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-column align-items-center m-4">
                            <img width="50px" src={Tag} alt=""/>
                            <p className="mt-4 font-italic font-18">Verdiene zu deinen Preisen</p>
                        </div>
                        <div className="d-flex flex-column align-items-center m-4">
                            <img width="50px" src={Note} alt=""/>
                            <p className="mt-4 font-italic font-18">Manage deine Kunden easy via Chat, Kalender und vieles weitere</p>
                        </div>
                    </div>


                    <div className="d-flex flex-column">
                        <div className="d-flex flex-column align-items-center m-4">
                            <img width="50px" src={Book} alt=""/>
                            <p className="mt-4 font-italic font-18">Kunden direkt aus deiner Nähe</p>
                        </div>

                        <div className="d-flex flex-column align-items-center m-4">
                            <img width="50px" src={Calc} alt=""/>
                            <p className="mt-4 font-italic font-18">Nutze die coolste mobile App für deine Experiecnes, die du je gesehen hast</p>
                        </div>
                    </div>



                    <div className="d-flex flex-column">
                        <div className="d-flex flex-column align-items-center m-4">
                            <img width="50px" src={Time} alt=""/>
                            <p className="mt-4 font-italic font-18">Flexibel im Alltag zu deinen Terminzeiten</p>
                        </div>
                        <div className="d-flex flex-column align-items-center m-4">
                            <img width="50px" src={Script} alt=""/>
                            <p className="mt-4 font-italic font-18">Poste über deine Experiences in der größten Community von Musikern</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container d-flex flex-column flex-md-row py-5" style={{marginTop: '108px', marginBottom: '108px'}}>
                <div className="flex-1 justify-content-center align-items-center">
                    <div style={testimonialStyle1} className="mx-auto d-flex flex-column justify-content-end p-2">
                        <p className="font-18 text-white font-italic text-center">Franzi, Klavier Trainerin aus Berlin</p>
                    </div>
                </div>
                <div className="flex-1 d-flex flex-column justify-content-start align-items-center text-center">
                    <h1 className="font-italic font-72">„</h1>
                    <p className="font-italic font-24">
                        Durch Musingoo bekomme ich Schüler zeitlich flexibel bei mir in der Nähe. Superpraktisch.
                    </p>
                </div>
            </div>


            <div className="container d-flex flex-column-reverse flex-md-row py-5" style={{marginTop: '108px', marginBottom: '108px'}}>
                <div className="flex-1 d-flex flex-column justify-content-start align-items-center text-center">
                    <h1 className="font-italic font-72">„</h1>
                    <p className="font-italic font-24">
                        Durch Musingoo bekomme ich Schüler zeitlich flexibel bei mir in der Nähe. Superpraktisch.
                    </p>
                </div>
                <div className="flex-1 justify-content-center align-items-center">
                    <div style={testimonialStyle1} className="mx-auto d-flex flex-column justify-content-end p-2">
                        <p className="font-18 text-white font-italic text-center">Dimi, Gitarren Trainer aus Hamburg
                        </p>
                    </div>
                </div>
            </div>


            <div className="container py-1">
                <h1 className="font-weight-bold mb-5 text-center" style={{marginTop: '0'}}> In 3 Schritten anbieten</h1>
                <div className="d-flex flex-column flex-md-row">
                    <div className="d-flex flex-column text-center m-4">
                        <h1 className="font-weight-bold">1.</h1>
                        <p>
                            Klicke auf jetzt starten, um Mitglieder der Community zu werden und dein Profil zu erstellen. Ein persönliches und Transparentes Profil schafft Vertrauen in der Community.
                        </p>
                    </div>

                    <div className="d-flex flex-column text-center m-4">
                        <h1 className="font-weight-bold">2.</h1>
                        <p>
                            Überlege dir welche Experience du anbieten möchtest und erstelle z.B. für Musikunterricht zu deinem eigenem Preis, Ort und erstelle deine eigenen flexiblen Zeiten an denen du gebucht werden möchtest.
                        </p>
                    </div>

                    <div className="d-flex flex-column text-center m-4">
                        <h1 className="font-weight-bold">3.</h1>
                        <p>
                            Starte deine Experience - z.B. deinen Unterricht und versuche gute Bewertungen zu erhalten. Manage alles bequem in einer App, ob Gruppenchat, Terminplan oder das Posten deiner Experiences im MUSINGOO Feed, um mehr Reichweite zu erhalten.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container py-5" style={{marginTop: '108px'}}>
                <h1 className="font-weight-bold mb-5 text-center" style={{marginTop: '0'}}>Unsere Community</h1>
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                    <Community backgroundImage={ex} user={model} userName='Lisa' desc={desc} />
                    <Community backgroundImage={ex} user={model} userName='Lisa' desc={desc} />
                    <Community backgroundImage={ex} user={model} userName='Lisa' desc={desc} />

                </div>
            </div>
            <div className="pt-5 mt-5" style={{margin: '10px 0'}}/>
            <BecomeCoach />

        </div>
    )
}

export default CoachOnboard;
