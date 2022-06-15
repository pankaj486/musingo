import React from 'react';

const Community = ({ backgroundImage, user, userName, desc }) => {

    const style = {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '350px',
        maxWidth: '300px',
        borderRadius: '25px'
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center text-white mx-4 position-relative mt-4" style={style}>
            <img src={user} className="rounded-circle" width="45px" style={{ border: '2px solid white' }} alt="user" />
            <p className="font-weight-bold">{userName}</p>
            <p className="font-italic py-5">{desc}</p>
            <div className="text-white font-weight-bold" style={{ position: 'absolute', right: '30px', top: '20px' }}>
                <p className="mb-0 font-20" style={{ lineHeight: '1' }}>150€</p>
                <p className="font-12">Verdienst</p>
            </div>
        </div>
    )
}

export default Community;
