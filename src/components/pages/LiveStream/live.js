import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './live.scss'
import avatar1 from '../../../assets/images/model.png'
import avatar2 from '../../../assets/images/instructor.png'
import avatar3 from '../../../assets/images/image2.png'
import window from '../../../assets/images/new/box.png'


const LiveStream = (props) => {
    const [experience, setExperience] = useState([]);

    return (
        <div className='container pt-2'>
            <div className='row'>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-3 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
                <div className='col-md-6 col-lg-6 col-xl-4'>
                    <div className='singleStream'>
                        <div className='block'>
                            <div>
                                <div className='d-flex dotBlock'>
                                    <div className='dot'></div>
                                    <p>jetzt live</p>
                                </div>
                                <div className='avatarBlock'>
                                    <img className='img' src={avatar1} />
                                    <img className='img img-right' src={avatar2} />
                                    <img className='img img-right' src={avatar3} />
                                </div>
                            </div>

                            <div className='right-box'>
                                <img src={window} />
                                <p>Learn guitar with great people</p>
                            </div>
                        </div>
                        <button className='btn'>
                            Ansehen
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LiveStream
