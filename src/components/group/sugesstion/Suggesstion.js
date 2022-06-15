import React, { useEffect, useState } from 'react'
import Package from '../../package/Package'
import Model from '../../../assets/images/model.png';
import Background from '../../../assets/images/modalBackground.png';
import { experienceService } from 'src/services/api';
import avatarPlaceholder from '../../../assets/images/placeholder/avatar.png';


const Suggesstion = ({ width, experiences }) => {

    // const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(false);

    function getAvatar(avatar) {
        if (avatar) {
            return avatar
        }
        return avatarPlaceholder
    }

    const getBanner = (experience) => {
        if (experience.banner && experience.banner.image) {
            return experience.banner.image
        }
        return Background
    }


    const getGroupType = (experience) => {
        if (experience.resourcetype == "PrivateLesson") {
            return 'single'
        }
        return 'group'
    }

    // console.log('experiences',experiences);
    return (
        <div style={{
            marginBottom: width <= 1024 ? '1rem' : '0',
            marginTop: width <= 1024 ? '4rem' : '0',
        }}>
            <h4 className="text-center mb-4">Vorschläge für dich</h4>
            <div className="row px-4 px-sm-0">
                {
                    experiences && experiences.length > 0 &&
                    experiences.slice(0, 6).map((experience, index) => {

                        return <div key={index} className="col-md-3 col-6 py-2 " style={{
                            paddingLeft: width < 768 && '11px',
                            paddingRight: width < 768 && '11px',
                        }}>

                            <Package
                                id={experience.uid}
                                backgroundImage={getBanner(experience)}
                                modelImage={getAvatar(experience.owner.avatar)}
                                title={experience.title}
                                price={experience.base_unit_amount}
                                groupType={getGroupType(experience)}
                                // filterState={fitlerState}
                                typeFilter={'video'}
                            />
                        </div>
                    })}
            </div>
            <p className="text-center mt-4 font-weight-bold"><a href="/" className="text-primary">Mehr laden</a></p>
        </div>
    )
}

export default Suggesstion
