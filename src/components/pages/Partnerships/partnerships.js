import React from 'react';
import PartnershipProfile from './partnerProfile';
import UserImage from '../../../assets/images/instructor.png';
import PartnerBg from '../../../assets/images/partnerBg.png';
import './partnerships.scss';

const Partnerships = () => {
    const partnerMembers = [
        { name: 'Felix', img: UserImage },
        { name: 'Mike', img: UserImage },
        { name: 'Anik', img: UserImage },
        { name: 'Anik', img: UserImage }
    ];

    const details = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged';
    return (
        <div className="container">
            <div className="defContainer d-flex flex-column justify-content-center align-items-center">
                <h5 className="mb-5">Partnerships</h5>
                <div className="d-flex justify-content-center align-items-center flex-wrap partnerBox">
                    <PartnershipProfile partnerBg={PartnerBg} partnerName={'Musingoo'} partnerMembers={partnerMembers} partnerDetails={details} />
                    <PartnershipProfile partnerBg={PartnerBg} partnerName={'Musingoo'} partnerMembers={partnerMembers} partnerDetails={details} />
                    <PartnershipProfile partnerBg={PartnerBg} partnerName={'Musingoo'} partnerMembers={partnerMembers} partnerDetails={details} />
                    <PartnershipProfile partnerBg={PartnerBg} partnerName={'Musingoo'} partnerMembers={partnerMembers} partnerDetails={details} />
                    <PartnershipProfile partnerBg={PartnerBg} partnerName={'Musingoo'} partnerMembers={partnerMembers} partnerDetails={details} />

                </div>
            </div>
        </div>
    )
}

export default Partnerships
