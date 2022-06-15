import React, { Fragment, useState } from 'react'
import Backdrop from '../../Backdrop/Backdrop'
import Application from '../../pages/Applications/application';
import UserImage from '../../../assets/images/instructor.png';

import './newApplicationList.css'

const NewApplicationsList = props => {
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

  ])
  let [showModal, setModalVisibility] = useState(true)

  const handleModalVisibility = () => {
    setModalVisibility(!showModal)
  }
  let modalContents = (
    <div className="booking-requests__modal" style={{ width: 'auto' }}>
      <span className="booking-requests__close-modal" onClick={handleModalVisibility}>X</span>
      <h3 className="booking-requests__heading ">Neue Bewerbungen</h3>
      <p className="booking-requests__count mb-0 font-weight-bold">{requests.length} Bewerbungen</p>
      <p>erwarten deine Beurteilung</p>
      <div className="mx-sm-5">
        {
          requests.map(request => {
            return <Application userImage={UserImage} userName={request.name} instrumentList={request.instrumentList} />
          })
        }
      </div>
      <p>1 weitere</p>
      <div className="mx-5 mb-5">
        <button className="btn-secondary btn btn-block py-2 font-weight-bold">Jetzt ansehen</button>
      </div>
    </div>
  )
  return (
    <Fragment>
      <Backdrop
        showModal={showModal}
        hideModal={handleModalVisibility}
      />
      {showModal && modalContents}
    </Fragment>
  )
}

export default NewApplicationsList;