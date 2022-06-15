import React from 'react'
import './style.scss'

const ExperienceModalSlot = ({
    slots,
    onClickSubmitBtn,
    handleChange,
}) => {
    return (
        <div className="experienceModalSlot">
            <div className="experienceModalSlotHeader">
                <h3 className="experienceModalSlotHeaderTitle">{'Wähle deinen Starttermin'}</h3>
                <p className="experienceModalSlotHeaderDesc">
                    {'Dies wird dein erster Unterrichtstermin, an dem dein Unterricht beginnen wird. Dein Unterricht läuft mit diesem Termin regelmäßig weiter.'}
                </p>
            </div>
            <div className="experienceModalSlotBody">
                {
                    slots?.length > 0 && 
                    <div className="row">
                        {
                            slots.map((item, index) => (
                                <div className="col-12 col-md-4" key={index}>
                                    <div className="experienceModalSlotItem">
                                        <input 
                                            className="experienceModalSlotItemRadio"
                                            value={item}
                                            type="radio"
                                            name="slot"
                                            onChange={e => handleChange(e, item)}
                                        />
                                        <div className="experienceModalSlotItemInner">
                                            <div className="experienceModalSlotItemHeader">
                                                {
                                                    item?.date &&
                                                    <h5 className="experienceModalSlotItemTitle">{item?.date}</h5>
                                                }
                                                {
                                                    item?.time &&
                                                    <p className="experienceModalSlotItemText">{item?.time}</p>
                                                }
                                            </div>
                                            <div className="experienceModalSlotItemBody">
                                                {
                                                    item?.duration &&
                                                    <p className="experienceModalSlotItemText">({item?.duration})</p>
                                                }
                                                <p className="experienceModalSlotItemText">{'Regelmäßiger'}</p>
                                                <p className="experienceModalSlotItemText">{'Termin'}</p>                         
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="experienceModalSlotFooter">
                <button 
                    className="btn btn-primary experienceModalSlotFooterBtn"
                    onClick={onClickSubmitBtn}
                >
                    {'Weiter'}
                </button>
            </div>
        </div>
    )
}

export default ExperienceModalSlot