import React, { useEffect, useState } from 'react';
import './musicianView.scss';
import MusicianPackage from './musicianPackage';
import BackgroundImage from '../../assets/images/modalBackground.png'
import { useHistory } from 'react-router-dom';
import { service } from 'src/services/AuthService/authService';
import { Spinner } from "reactstrap";


const MusicianView = () => {

    const [musicianList, setMusicianList] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        service.getMusicianViewList().then((response) => {
            setMusicianList(response.data.results);
            setLoading(!loading);
        })
    }, [])

    const handleRedirection = () => {
        history.push('/createExperience');
    }

    return (
        <>
            <div className='container pt-5 mt-5'>
                <div className='row pt-5 mt-5 align-items-center justify-content-center'>
                    <div className='col-6 text-center'>
                        <div className='d-flex w-100 align-items-center justify-content-between'>
                            <p onClick={() => history.push({
                                pathname: '/dashboard',
                            })} >Dashboard</p>
                            <p onClick={() => history.push({
                                pathname: '/conversations',
                            })} >Chat</p>
                            <p onClick={() => history.push({
                                pathname: '/customerview',
                            })}>Meine Buchungen</p>
                            <p onClick={() => history.push({
                                pathname: '/trainerview',
                            })}>Kundenbuchungen</p>
                            <p onClick={() => history.push({
                                pathname: '/musicianview',
                            })} className='font-weight-bold'>Meine Inserate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-column ">
                <div className="defContainer mt-3">
                    <div>
                        <h2 className="text-center mt-4">Meine Inserate</h2>
                        <p className="font-weight-bold mb-0 mt-5">Unterricht Experiences</p>
                        <hr />
                        <div className="d-flex justify-content-center flex-wrap">
                            {loading ?
                                <>
                                    {musicianList.length > 0 ? (
                                        <>
                                            {musicianList.map((item, index) => {
                                                return <MusicianPackage cardId={item.uid} key={index} progress={'100'}
                                                    backgroundImage={item.banner === null ? BackgroundImage : item.banner.image}
                                                    text={item.title} />
                                            })}
                                        </>
                                    ) : (
                                        <>
                                            <span style={{ color: "red" }}>No Experience Found !</span>
                                            <button
                                                onClick={handleRedirection}
                                                className="btn btn-block btn-primary text-white mb-2 packButton">
                                                Create Experience
                                            </button>
                                        </>
                                    )
                                    }

                                </> : <Spinner />}
                        </div>

                    </div>
                    <div>
                        <p className="font-weight-bold  mb-0 mt-5">Instrument Experiences</p>
                        <hr />
                        <div className="d-flex justify-content-center flex-wrap">
                            <MusicianPackage progress={'20'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                            <MusicianPackage progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                            <MusicianPackage progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                        </div>
                    </div>
                    <div>
                        <p className="font-weight-bold  mb-0 mt-5">Job Experiences</p>
                        <hr />
                        <div className="d-flex justify-content-center flex-wrap">
                            <MusicianPackage progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                            <MusicianPackage progress={'70'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                            <MusicianPackage progress={'20'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                        </div>
                    </div>
                    <div>
                        <p className="font-weight-bold  mb-0 mt-5">Concert Experiences</p>
                        <hr />
                        <div className="d-flex flex-wrap justify-content-center">
                            <MusicianPackage progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                            <MusicianPackage progress={'100'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                            <MusicianPackage progress={'30'} backgroundImage={BackgroundImage} text={'Learn Djambe traditionally'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MusicianView;
