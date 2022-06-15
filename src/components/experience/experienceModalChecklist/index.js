import React from 'react'
import './style.scss'

const ExperienceModalChecklist = ({
    onClickSubmitBtn
}) => {
    const listItems = [
        {
            title: 'Kommunikation',
            description: 'Wir haben einen Gruppenchat für dich entwickelt, um den Unterricht ganz easy mit deinen Schülern zu koordinieren.',
        },
        {
            title: 'Pünktlichkeit',
            description: 'Sorge dafür, dass jeder Unterrichtstermin pünktlich stattfindet.',
        },
        {
            title: 'Dein Regelmäßiger Termin',
            description: 'Beachte dass dein Regelmäßiger Termin am korrekten Tag und Urzeit stattfindet.',
        },
        {
            title: 'Termine nachholen',
            description: 'Falls ein Termin ausfällt, hole diesen immer regelmäßig nach.',
        },
    ]
    return (
        <div className="experienceModalChecklist">
            <div className="experienceModalChecklistHeader">
                <h2 className="experienceModalChecklistHeaderTitle">{'Deine Checkliste zum Start'}</h2>
            </div>
            <div className="experienceModalChecklistBody">
                {
                    listItems?.length > 0 && 
                    <div className="row">
                        {
                            listItems.map((item, index) => (
                                <div className="col-12 col-sm-6" key={index}>
                                    <div className="experienceModalChecklistItem">
                                        {
                                            item?.title &&
                                            <h5 className="experienceModalChecklistItemTitle">
                                                {item?.title}
                                            </h5>
                                        }
                                        {
                                            item?.description && 
                                            <p className="experienceModalChecklistItemDesc">
                                                {item?.description}
                                            </p>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>

            <div className="experienceModalChecklistFooter px-4">
                <p className="text-center mb-4">
                    <span>{'Weitere Fragen findest du hier '}</span>
                    <a href="" className="font-weight-bold">{'Guide'}</a>
                </p>
                <button 
                    className="btn btn-primary experienceModalChecklistFooterBtn"
                    onClick={onClickSubmitBtn}
                >
                    {`Okay let’s go`}
                </button>
            </div>

        </div>
    )
}

export default ExperienceModalChecklist