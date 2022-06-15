import React from 'react'

function GroupItem({ groupName, location, members, price }) {
    return (
        <div className="border d-flex flex-column p-4 mb-2 align-items-center justify-content-center text-center" style={{ borderRadius: '1rem', height:'100%' }}>
            <h5 className="mb-0 font-weight-bold">{groupName}</h5>
            <p>{location}</p>
            <div className="d-flex flex-wrap justify-content-center">{
                members.map((member, index) =>
                    <img key={index} src={member} alt="" className="rounded m-1" width="32px" height="32px" />
                )}
            </div>
            <p className="text-primary pt-3 mb-1 text-center">Alle Member anzeigen</p>
            <h5 className="mb-0 pt-1">{price}</h5>
        </div>
    )
}

export default GroupItem;
