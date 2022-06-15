import React from 'react';


const UpcomingEvent = ({ date, month, time, title, image, imageTitle, groupName }) => {

    const style = {
        background: `url(${image}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '55px',
        maxWidth: '70px',
        fontSize: '10px',
        lineHeight: '1',
        borderRadius: '10px'
    }

    return (
        <div className="d-flex justify-content-between defBorder p-2 align-items-center flex-wrap">
            <div className="text-center mx-3">
                <h4 className="mb-0">{date}</h4>
                <p className="mb-0 font-12">{month}</p>
            </div>
            <p className="mx-4 mb-0 font-14">{time}</p>
            <p className="mx-4 mb-0 font-14">{title}</p>
            <div style={style} className=" ml-2 p-1 d-flex justify-content-center align-items-center flex-column">
                <p className="mb-0 font-weight-bold text-white text-center">{imageTitle}</p>
                <p className="mb-0 font-weight-bold text-white text-center">{groupName}</p>
            </div>
        </div>
    )
}

export default UpcomingEvent;
