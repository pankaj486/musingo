import React from 'react'
import Badge from '../../../assets/images/badge.png';
import '../../pages/Listing/ViewListing.scss';

const Trainer = ({name, description, videoScr, avatar, badge}) => {
    return (
        <div className="px-4 px-sm-0" style={{marginBottom: '60px'}}>
            <div className="pr-md-5 py-xs-3 px-xs-2 d-flex flex-column align-items-center">
                <h4 className="text-center mt-4">Über TRAINERNAME</h4>
                <div className="d-flex align-items-end mt-4">
                    <figure style={{position: 'relative'}}>
                        <img src={avatar} alt="instructor" className="rounded-circle mx-4" width="80px"/>
                        <img src={badge ? badge :Badge} alt="badge" className="trianerIntroBadge" width="35px"/>
                    </figure>
                    <div className="d-flex flex-column ml-2">
                        <p className="mb-1 font-weight-bold">{name}</p>
                        <p className="text-primary border-primary rounded-pill px-2 font-weight-bold viewlisting-hobbymusiker"
                           style={{border: '2px solid #4ad9ca'}}>Hobbymusiker</p>
                    </div>
                </div>
                {description && <p className="text-center pt-4">{description}</p>}
                {videoScr &&
                <video width="100%" controls style={{borderRadius: '2rem'}}>
                    <source src={videoScr} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                </video>
                }
            </div>
        </div>
    )
}

export default Trainer
