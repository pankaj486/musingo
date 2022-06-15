import React, { Fragment, useState } from 'react'
import CancelApplication from './cancelApplication'
import Guitar from '../../../assets/images/guitar.png';
import Piano from '../../../assets/images/piano.png';
import Drum from '../../../assets/images/drum.png';
import Mic from '../../../assets/images/mic.png';
import './application.scss';

const ApplicationDetail = ({ userImage, userName, instrumentList }) => {
    const [cancelApplication, setCancelApplication] = useState(false)
    return (
        <div className="defBorder activeBorder font-14 px-5 pt-5 pb-4" style={{ borderRadius: '50px' }}>
            <div className="d-flex align-items-center">
                <img width="50px" height="50px" className="rounded-circle" src={userImage} alt="userImage" />
                <p className="mb-0 ml-4">{userName}</p>
            </div>
            <div className="applicationDesc">
                <p className="font-weight-bold mt-3 mb-1">Instrumente Unterrichten</p>
                <div className="d-flex">
                    {
                        instrumentList.map(
                            instrument => {
                                return <Fragment>
                                    {instrument === 'Klavier' && <Fragment> <span>Klavier</span> <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Piano} alt="piano"/></Fragment>}
                                    {instrument === 'Gitarre' && <Fragment> <span>Gitarre</span> <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Guitar} alt="guitar"/></Fragment>}
                                    {instrument === 'Drum' && <Fragment> <span>Drum</span> <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Drum} alt="drum"/></Fragment>}
                                    {instrument === 'Song' && <Fragment> <span>Song</span> <img width="25px" height="25px" className="mx-1 mx-sm-2" src={Mic} alt="mic"/></Fragment>}
                                </Fragment>
                            }
                        )
                    }
                </div>
                <p className="font-weight-bold mt-4 mb-1">Sonderstatus Anfrage (bitte gesondert drauf achten)</p>
                <p className="mb-0 ml-1">Für Kinder (Alter 5 16 Jahre)</p>
                <p className="ml-1">Für Kleinkinder (Alter 24 Jahre)</p>

                <p className="font-weight-bold">Sonderstatus Anfrage (bitte gesondert drauf achten)</p>
            </div>
            <div className="btn btn-block btn-primary text-white py-2 mt-4">annehmen</div>
            <p className="text-center cursor-pointer" onClick={() => setCancelApplication(true)}>ablehnen</p>
            {cancelApplication && <CancelApplication toggleModal={() => setCancelApplication(!cancelApplication)} modal={true} />}
        </div>
    )
}

export default ApplicationDetail;
