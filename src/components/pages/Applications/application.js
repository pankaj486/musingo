import React, { Fragment } from 'react';
import './application.scss';
import Guitar from '../../../assets/images/guitar.png';
import Piano from '../../../assets/images/piano.png';
import Drum from '../../../assets/images/drum.png';
import Mic from '../../../assets/images/mic.png';
import './application.scss';

const Application = ({ userImage, userName, instrumentList, selectedId, id }) => {
    return (
        <div className={"d-flex align-items-center defBorder m-2 p-2 applicationBox " + (selectedId === id ? 'activeBorder' : '')}>
            <img src={userImage} alt="userImage" className="rounded-circle" width="40px" height="40px" />
            <p className="mb-0 mx-4">{userName}</p>
            <div className="d-flex flex-wrap">
                {
                    instrumentList.map(
                        instrument => {
                            return <Fragment>
                                {instrument === 'Klavier' && <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Piano} alt="piano"/>}
                                {instrument === 'Gitarre' && <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Guitar} alt="guitar"/>}
                                {instrument === 'Drum' && <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Drum} alt="drum"/>}
                                {instrument === 'Song' && <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Mic} alt="mic"/>}
                            </Fragment>
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Application;
