import React from 'react'

import Magic from './../../../../../assets/images/magic.png'
import Badge from './../../../../../assets/images/badge.png'

import './ProfileTrainerDetails.scss'

const ProfileTrainerDetails = props => {
  return (
    <div className='profile-trainer-details'>
      <div className='profile-trainer--info'>
        <img src={Magic} alt={'magic'} />
        <span>Ich bin Trainer und gebe Unterricht</span>
      </div>
      <div className='profile-trainer--info'>
        <img src={Badge} alt={'badge'} />
        <span>Supertrainer Status</span>
      </div>
      <div className='profile-trainer--info'>
        <img src={Magic} alt={'magic'} />
        <span>Spiele in Band/s @ {props.data.selectedBand}</span>
      </div>
      {
        props.editProfile ? (
          <div className={'trainer-profile-edit-select-band-section'}>
            <input className='trainer-profile-edit-band-section-input' type='text' placeholder='z.B. Vanilla Ice' />
            <div className='trainer-profile-edit-bands-container'>
              {
                props.bands.map((band, index) => {
                  return (
                    <div className='trainer-profile-edit-band' key={index} onClick={() => props.handleSelectedBand(band.id)}>
                      <img className='trainer-profile-edit-band-image' src={band.img} alt={band.name} />
                      <span className='trainer-profile-edit-band-name'>{band.name}</span>
                      <div className='trainer-profile-edit-empty-div'></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default ProfileTrainerDetails