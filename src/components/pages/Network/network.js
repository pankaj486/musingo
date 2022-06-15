import React, { useRef, useState, Fragment } from 'react';
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import AppStore from '../../../assets/images/appStore.png';
import PlayStore from '../../../assets/images/playStore.png';
import BackgroundImage from '../../../assets/images/networkBg.jpg';
import BackgroundImage2 from '../../../assets/images/networkBg2.jpg';
import NetworkSearch from '../../network/networkSearch';
import './network.scss';
import Post from './post';
import useWindowResize from '../../../custom-hooks/useWindowResize';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import VideoUpload from '../../videoUpload/videoUpload';
import Camera from '../../../assets/images/camera.png'
import Video from '../../../assets/images/video.png'
import Picture from '../../../assets/images/picture.png'
import Folozen from './folozen';

const Network = () => {
    const [active, setActive] = useState(1)

    let { path } = useRouteMatch();
    const { dimensions } = useWindowResize();
    const width = dimensions.width;

    const style = {
        minHeight: '100vh',
        marginTop: width > 1024 ? '-3vh' : '-5vh',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        zIndex: '-1'
    }

    setInterval(() => {
        if (active === 1) {
            setActive(2);
        } else {
            setActive(1);
        }
    }, 120000);

    const fileInputRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoUpload, setVideoUpload] = useState(false);

    const handleFileUpload = (file) => {
        let blobURL = URL.createObjectURL(file);
        // onUpload(blobURL);
    }


    return (
        <div className="networkClass">

            <ReactCSSTransitionGroup
                transitionName="fadeInLong"
                transitionAppearTimeout={200}
                transitionLeaveTimeout={200}
            >
                {active === 1 &&
                    // <div  >
                    <img key="1" className="networkBg" src={BackgroundImage} style={style} />
                    // </div>
                }
                {active === 2 &&
                    <img key="2" className="networkBg" src={BackgroundImage2} style={style} />

                }
            </ReactCSSTransitionGroup>
            <div style={{ zIndex: 1000 }}>
                <Switch>
                    <Route exact path={path}>
                        <div className="defContainer post d-flex flex-column justify-content-center align-items-center mx-auto">
                            <Link to="network/search" className="btn gesuchButton defBorder text-primary font-weight-bold font-16 py-sm-3 mt-2 px-sm-5 bg-white">Gesuch aufgeben</Link>
                            <p className="text-white mt-4 pt-5 pt-sm-0 posten-title">Posten</p>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex">
                                    <button className="btn bg-white defBorder mx-2 my-4 px-4 py-2" >
                                        <img src={Camera} alt="camera" width="30px" />
                                    </button>
                                    <button className="btn bg-white defBorder mx-2 my-4 px-4 py-2" onClick={() => setVideoUpload(true)}>
                                        <img src={Video} alt="video" width="30px" />
                                    </button>
                                    <button className="btn bg-white defBorder mx-2 my-4 px-4 py-2" onClick={() => fileInputRef.current.click()}>
                                        <img src={Picture} alt="pictur" width="30px" />
                                    </button>
                                </div>
                                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={(event) => { handleFileUpload(event.target.files[0]) }} />
                            </div>
                            {!videoUpload && <Fragment>
                                <Post />
                                <Folozen />
                                <Post />
                            </Fragment>}
                            {
                                videoUpload &&
                                <div className="bg-white defBorder text-center p-4" style={{ maxWidth: '500px' }}>
                                    <VideoUpload
                                        header={'Video Upload'}
                                        text={`Lade ein video von 1 Minute hoch. Beschreibe hierbei deine Person als Musiker/in,  deine Stärken und Schwächen und deine Motivation, Musikunterricht via MUSINGOO zu geben. Gerne kannst du auch noch eine Anekdote von dir erzähelen (ist aber keine Vorraussetzung)
                    `}
                                        returnFunction={(video) => { setVideoSrc(video); setVideoUpload(false); }}
                                    />
                                </div>
                            }
                        </div>
                    </Route>
                    <Route path={`${path}/search`}>
                        <NetworkSearch />
                    </Route>
                </Switch>
                {dimensions.width > 1024 && <div className="d-flex flex-column flex-md-row py-3 px-3 justify-content-center align-items-center networkFooter">
                    <h5 className="mb-3 mb-sm-0 font-weight-bold mb-0 mr-4"> Lade die App für Livestreaming und vieles mehr</h5>
                    <div className="mt-3 mt-md-0">
                        <img className="mx-1" width="150px" height="50px" src={AppStore} alt="appstore" />
                        <img className="mx-1" width="170px" height="50px" src={PlayStore} alt="playstore" />
                    </div>
                </div>}
            </div>
        </div >
    )
}

export default Network;
