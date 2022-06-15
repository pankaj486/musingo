import React from 'react'

import './ProfileAboutTrainer.scss'

const ProfileAboutTrainer = props => {
  console.log('props.about me: ', props.data)
  return (
    <div className='profile-about-trainer'>
      <span className='about-trainer__title'>Über mich</span>
      {
        !props.editProfile ?
          <p className='about-trainer__details'>{props.data.aboutMe}</p> :
          <textarea
            value={props.data.aboutMe}
            className='trainer-profile-edit-about-me'
            onChange={(event) => props.handleChange(event.target.value, 'aboutMe')}
          />
      }
    </div>
  )
}

export default ProfileAboutTrainer