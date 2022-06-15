import React from 'react'
import UserImage from '../../../assets/images/instructor.png';
import SearchedExperience from '../../network/SearchedExperience';
import ConcertBG from '../../../assets/images/concertBg.png'
import IndoorConcertBG from '../../../assets/images/IndoorConcert.jpg'
import Liste from '../../../assets/images/Liste.png'
import './network.scss';

const style = {
    borderRadius: '10px 10px 10px 10px'
}

const backgroundStyle = {
    backgroundImage: `url(${IndoorConcertBG})`,
    backgroundSize: 'contain',
    borderRadius: '20px'
}

const Folozen = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mb-4" style={{ width: '100%', maxWidth: '500px' }}>
            {/* <Link to="network/search" className="btn gesuchButton defBorder text-primary font-weight-bold font-16 py-sm-3 mt-2 px-sm-5 bg-white">Gesuch aufgeben</Link> */}
            {/* <div className="d-flex justify-content-center"> */}
            <div className="defBorder bg-white mt-3" style={{ width: '100%' }}>
                <div className="d-flex align-items-center pt-3 pb-2 px-3">
                    <img src={UserImage} width='30px' height="30px" className="rounded-circle" alt="user" />
                    <p className="mb-0 font-weight-bold ml-3 mr-4">Dimi</p>
                    <div className="badge badge-outline-primary px-3 py-2 ml-auto">Folgen</div>
                    <p className="mb-0 ml-3 text-center font-12">Vor einer<br />Stunde</p>
                </div>
                {/* <div className="divider"></div> */}
                <div className="p-4 d-flex flex-column text-center m-2" style={backgroundStyle}>
                    <div className="d-flex align-items-center defBorder mb-2 bg-white ml-auto" style={{ maxWidth: '200px' }}>
                        <img style={style} src={ConcertBG} width="70px" height="50px" alt="text" />
                        <p className="font-12 mb-0 ml-3 pr-3 text-left">Learn Flamenco like a pro experiences</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                        <div className="participant-image-card d-flex justify-content-end align-items-start">
                            <div>
                                <img className="styled-participant-image ml-0 netFolImage" src={UserImage} alt="participant" order="0" />
                                <img className="styled-participant-image netFolImage" src={UserImage} alt="participant" order="1" />
                                <img className="styled-participant-image netFolImage" src={UserImage} alt="participant" order="2" />
                                <img className="styled-participant-image netFolImage" src={UserImage} alt="participant" order="3" />
                            </div>
                        </div>
                        <button className="btn bg-white d-flex align-items-center justify-content-center rounded-circle p-0" style={{ width: '25px', height: '25px' }}>
                            <img src={Liste} width="14px" alt="liste" />
                        </button>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Folozen
