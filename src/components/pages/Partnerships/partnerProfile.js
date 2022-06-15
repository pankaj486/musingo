import React from 'react'

const PartnerProfile = ({ partnerBg, partnerName, partnerMembers, partnerDetails }) => {

    const style = {
        borderRadius: '10px',
        width: '248px',
    }

    return (
        <div className="d-flex flex-column defBorder text-center m-4" style={{ maxWidth: '250px' }}>
            <div className="band-bg">
                <img src={partnerBg} alt="bg" style={style} />
            </div>
            <div className="p-4">
                <p className="font-weight-bold font-18 text-uppercase">{partnerName}</p>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        partnerMembers.map(
                            member => {
                                return <div className="d-flex flex-column justify-content-center align-items-center my-1">
                                    <img width="40px" src={member.img} className="rounded-circle m-1" alt="partnerImage" />
                                    <div className="badge badge-secondary font-10 px-2 my-2">{member.name}</div>
                                </div>
                            }
                        )
                    }
                </div>
                <p className="font-12 font-weight-bold font-italic mt-2" style={{ lineHeight: 1.2 }}>
                    {partnerDetails}
                </p>
                <button class="btn btn-block btn-secondary font-weight-bold font-14">Story ansehen</button>
            </div>
        </div>
    )
}

export default PartnerProfile
