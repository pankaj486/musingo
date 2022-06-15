import React from 'react'

import ProfileTrainerDetails from './ProfileTrainerDetails/ProfileTrainerDetails'
import ProfileTrainerVideo from './ProfileTrainerVideo/ProfileTrainerVideo'
import ProfileAboutTrainer from './ProfileAboutTrainer/ProfileAboutTrainer'

import './UserProfileTrainerInfo.scss'
import UserProfileEdit from '../UserProfileEdit/UserProfileEdit'

const UserProfileTrainerInfo = props => {
  return (
    <div className='user-profile__trainer-details'>
      <ProfileTrainerDetails
        bands={props.bands}
        handleChange={props.handleChange}
        editProfile={props.editProfile}
        data={props.data}
        handleSelectedBand={props.handleSelectedBand}
      />
      <ProfileAboutTrainer
        data={props.data}
        handleChange={props.handleChange}
        editProfile={props.editProfile}
      />
      <ProfileTrainerVideo
        editProfile={props.editProfile}
        video={props.video}
        handleVideoUpload={props.handleVideoUpload}
        videoUpdated={props.videoUpdated}
      />
    </div>
  )
}

export default UserProfileTrainerInfo