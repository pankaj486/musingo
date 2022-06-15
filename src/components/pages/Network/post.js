import React from 'react';
import UserImage from '../../../assets/images/instructor.png';
import './network.scss'

const Post = () => {

    return (
        <div className="post d-flex flex-column justify-content-center align-items-center mb-4">
            {/* <Link to="network/search" className="btn gesuchButton defBorder text-primary font-weight-bold font-16 py-sm-3 mt-2 px-sm-5 bg-white">Gesuch aufgeben</Link> */}
            <div className="d-flex justify-content-center" style={{ maxWidth: '100%' }}>
                <div className="defBorder bg-white mt-3 postBox">
                    <div className="d-flex align-items-center pt-3 pb-2 px-3">
                        <img src={UserImage} width='30px' height="30px" className="rounded-circle" alt="user" />
                        <p className="mb-0 font-weight-bold ml-3 mr-4">Dimi</p>
                        <div className="badge badge-outline-primary px-3 py-2">Folgen</div>
                        <p className="mb-0 ml-auto text-center t">Vor einer<br />Stunde</p>
                    </div>
                    <div className="divider"></div>
                    <div className="p-4 d-flex flex-column align-items-center text-center">
                        <h5>Suche Schlafplatz in Hamburg</h5>
                        <div className="badge badge-secondary my-3 py-2 px-3 mx-auto font-10">Schlafplatz</div>
                        <p>Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche Schlafplatz in
                        HamburgSuchasdasdasdasdasdadsasdasdasd</p>
                        <div className="btn btn-primary btn-block text-white py-3">Antworten</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
