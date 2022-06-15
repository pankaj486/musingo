import React from 'react'
import CardBox from 'src/components/cardBox'
import Instructor from '../../../assets/images/instructor.png'
import './style.scss'

const ActivityBox = ({ activities }) => {
    return (
        <CardBox title={'Activity'} bodyMaxHeight={300}>
            {
                activities?.length && activities.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="d-flex justify-content-between align-items-center py-3">
                                <div className="d-flex align-items-center justify-content-start" style={{flex: 1}}>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <span className={`bg-${item?.dotColor || 'secondary'} alertSection`}></span>
                                        <img 
                                            className="rounded-circle ml-3 mr-3 mr-xl-4" 
                                            src={item.avatar} 
                                            width="40px" 
                                            height="40px" 
                                            alt="profile" 
                                        />
                                    </div>
                                    <p className="pr-3 mb-0">{item?.title}</p>
                                </div>
                                <div className="text-right var">
                                    <p className="mb-0">Var2</p>
                                    <p className="mb-0">Sekunden</p>
                                </div>
                            </div>
                            {
                                (activities?.length > index + 1) &&
                                <div className="divider"></div>
                            }
                        </div>
                    )
                })
            }
        </CardBox>
    )
} 

export default ActivityBox