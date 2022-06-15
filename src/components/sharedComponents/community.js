import React from 'react'

const Community = ({ tag, time, image }) => {
    return (
        <div className="d-flex align-items-center p-1 justify-content-between defBorder" style={{borderRadius:'20px'}}>
            <img className="rounded-circle" src={image} width="30px" height="30px" alt="image" />
            <p className="mb-0 ml-2 mr-5 font-12 flex-1">{tag}</p>
            <p className="mb-0 font-12 pr-2">{time}</p>
        </div>
    )
}

export default Community
