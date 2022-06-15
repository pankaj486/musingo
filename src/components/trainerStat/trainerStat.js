import React, { useState } from 'react';
import ArtWork from '../../assets/images/artWork.png';
import Model from '../../assets/images/model.png';
import Feature from '../../assets/images/feature.png';
import './trainerStat.scss';

const TrainerStat = () => {
    const [progress, setProgress] = useState(60)
    return (
        <div className="trainerStat">
            <div className="defContainer p-5 d-flex flex-column flex-sm-row trainerStatContainer">
                <div className="flex-1 d-flex flex-column align-items-center px-5 descBox">
                    <img src={ArtWork} alt="art" width="200px" />
                    <h2 className="mt-3" style={{textAlign: 'center'}}>Dein weg zum Supertrainer</h2>
                    <p>Das sind deine bisherigen Stats</p>
                    <img className="" style={{marginTop: '90px'}}  src={Model} alt="model" />
                    <p className="text-center font-italic px-5">"Als Supertrainer habe ich Verantwortung einen hohen
                    Qualitätsanspruch und erhalte dadurch aber auch starke
                Vorteile in unserer Community“</p>
                    <div className="text-center px-5" style={{marginTop: '90px'}}>
                        <h4>Warum sollte ich Supertrainer werden?</h4>
                        <p>Al Supertrainer gehörst du zu den Top empfohlenen Trainern auf MUSINGOO</p>
                        <div className="d-flex justify-content-between my-50 trainer-stat-super-trainer" style={{ margin: '45px 0 74px 0' }}>
                            <div>
                                <img className="flex-1" src={Feature} alt="feature" />
                                <p>Höhere Buchungswahrschein lichkeit</p>
                            </div>
                            <div>
                                <img className="flex-1" src={Feature} alt="feature" />
                                <p>Das sind deine bisherigen Stats</p>
                            </div>
                            <div>
                                <img className="flex-1" src={Feature} alt="feature" />
                                <p>Das sind deine bisherigen Stats</p>
                            </div>
                        </div>
                        <h4>Deine Aufgaben</h4>
                        <p className="mt-4">Um Supertrainer zu bleiben bekommst du die Verantwortung unsere
                        Community genauso qualitativ hoch zu erhalten wie du Sie als
                        Supertrainer hoch hälst.
                        Daher sind deine Aufgaben mindestens 5 Trainer Bewerbungen pro
                        Monat durchzusehen, und zu beurteilen, ob dieser für unsere Community
                    geeignet ist</p>
                        <h4 className="" style={{marginTop: '90px'}}>Wie werde ich Supertrainer</h4>
                        <p>Versuche deine Ziele rechts in der Tabelle zu erreichen und du wirst
                    automatisch zum Supertrainer ernannt.</p>
                        <h4 className="" style={{marginTop: '90px'}}>Tipps um schnell Supertrainer zu werden</h4>
                    </div>
                </div>
                <div className="flex-1 statBox">
                    <h4 className="text-center mb-4">Dein Fortschritt</h4>
                    <div className="d-flex justify-content-between px-4">
                        <p className="mb-0">Trainer</p>
                        <p className="mb-0">Supertrainer</p>
                    </div>
                    <div className="progress mx-2 mt-2" style={{ height: '40px', borderRadius: '40px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className=" mt-5 pl-4">
                        <table style={{ width: '100%' }} className="text-center">
                            <tr className="border-bottom">
                                <td>Anforderung</td>
                                <td>Du</td>
                                <td>Ziel</td>
                                <td>Erreicht</td>
                            </tr>
                            <tr>
                                <td>Bewertung</td>
                                <td>3,5 Stars</td>
                                <td>4.8</td>
                                <td><img className="flex-1" src={Feature} alt="feature" width="30px" /></td>
                            </tr>
                            <tr>
                                <td>Antwortrate</td>
                                <td>80%</td>
                                <td>80%</td>
                                <td><img className="flex-1" src={Feature} alt="feature" width="30px" /></td>
                            </tr>
                            <tr>
                                <td>Buchungen</td>
                                <td>2</td>
                                <td>7</td>
                                <td><img className="flex-1" src={Feature} alt="feature" width="30px" /></td>
                            </tr>
                            <tr>
                                <td>Ablehnungsrate</td>
                                <td>20%</td>
                                <td>5%</td>
                                <td><img className="flex-1" src={Feature} alt="feature" width="30px" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainerStat
