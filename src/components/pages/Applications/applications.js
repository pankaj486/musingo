import React, { useState, useEffect } from 'react'
import Application from './application'
import ApplicationDetail from './applicationDetail';
import UserImage from '../../../assets/images/instructor.png';
import './application.scss';


const Applications = () => {
    let [requests, setRequests] = useState([
        {
            id: 1,
            name: 'Felix',
            instrumentList: ['Klavier', 'Gitarre', 'Drum', 'Song']
        },
        {
            id: 2,
            name: 'Felix2',
            instrumentList: ['Klavier', 'Gitarre']
        },
        {
            id: 3,
            name: 'Felix3',
            instrumentList: ['Klavier', 'Gitarre', 'Drum', 'Song']
        },
        {
            id: 4,
            name: 'Felix4',
            instrumentList: ['Klavier', 'Gitarre', 'Song']
        },

    ]);

    useEffect(() => {
        setSelectedApplication(requests[0])
    }, [requests])

    const [selectedApplication, setSelectedApplication] = useState(null);

    return (
        <div className="defContainer">
            <h2 className="text-center">Bewerbungen</h2>
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-start mt-5">
                <div className="d-flex flex-column mr-5">
                    {
                        requests.map((request, index) => {
                            return <div className={"cursor-pointer"} key={index} onClick={() => setSelectedApplication(request)}>
                                <Application id={request.id} selectedId={selectedApplication ? selectedApplication.id : ''} userImage={UserImage} userName={request.name} instrumentList={request.instrumentList} />
                            </div>
                        })
                    }
                </div>
                {selectedApplication && <ApplicationDetail userImage={UserImage} userName={selectedApplication.name} instrumentList={selectedApplication.instrumentList} />}
            </div>
        </div>
    )
}

export default Applications
