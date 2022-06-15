import React from 'react'

import './ProfileTrainerVideo.scss'
import UploadFile from '../../../../videoUpload/uploadFile'

const ProfileTrainerVideo = props => {
  return (!props.editProfile || props.videoUpdated) ? (
    <div className='profile-trainer-video'>
      <video width="100%" controls style={{ borderRadius: '2rem' }}>
        <source src={props.video} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  ) : (
    <div className='trainer-profile-edit-upload-video'>
      <UploadFile
        onUpload={(file) => { props.handleVideoUpload(file) }}
        buttonText={'Neues Video hochladen'}
        profileEdit={true}
  
      />
    </div>
    
  )
}

export default ProfileTrainerVideo