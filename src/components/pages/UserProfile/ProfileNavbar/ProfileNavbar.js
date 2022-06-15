import React, { useRef, useState } from 'react'

import Music from './../../../../assets/images/music.png'
import Magic from './../../../../assets/images/magic.png'
import Girl from './../../../../assets/images/girl.png'
import Doll from './../../../../assets/images/doll.png'
import {useExperiencePrivateLessonsList} from "src/generated/apiFetchers"


import './ProfileNavbar.scss'

const ProfileNavbar = props => {
  const profileImageRef = useRef(null)
  const [titles, setSelectedTitle] = useState([
    {
      id: 1,
      img: Girl,
      name: 'BEG',
      selected: true,
    },
    {
      id: 2,
      img: Music,
      name: 'HOB',
      selected: false,
    },
    {
      id: 3,
      img: Doll,
      name: 'STU',
      selected: false,
    },
    {
      id: 4,
      img: Magic,
      name: 'PRO',
      selected: false,
    },
  ])
  const [following, setFollowing] = useState(false);
  const { forwardRef } = props;

  const {avatarFile, handleUpload, blogFile} = props

  const {data: getCount} = useExperiencePrivateLessonsList({})

  const handleFollowCtaClick = () => {
    setFollowing(prevState => !prevState)
  }
  const handleSelectedTitle = (id) => {
    let updatedTitlesList = [...titles]
    let newSelectedIndex = updatedTitlesList.findIndex(title => title.id === id)
    let prevSelectedIndex = updatedTitlesList.findIndex(title => title.selected)
    
    updatedTitlesList[prevSelectedIndex].selected = false
    updatedTitlesList[newSelectedIndex].selected = true
    setSelectedTitle(updatedTitlesList)
    props.handleChange(updatedTitlesList[newSelectedIndex].name, 'selectedTitle')
  }
  return (
    <div className='profile__navbar' ref={forwardRef}>
      <div className='navbar__personal-info'>
        <div className={'info--instructor-container'}>
          {/* {
            (props.ImageUpdated === undefined) ?
              <img src={avatarFile ? avatarFile : blogFile} className='info--instructor'/> :
              !props.ImageUpdated ?
                <div className='info-instructor-overlay'><span>Pic</span></div> :
                <img src={avatarFile ? avatarFile : blogFile} className='info--instructor'/>
          } */}
         
          <figure
            onClick={() => profileImageRef.current?.click()}
          >
            <img
              className="info-instructor"
              src={avatarFile ? avatarFile : blogFile}
              alt="plus"
              width={"70px"}
            />
          </figure>
          <input
            type='file'
            name='file'
            ref={profileImageRef}
            style={{ display: 'none' }}
            onChange={(event) => handleUpload(event, 'profileImage')}
          />
        </div>
        <div className='info--container'>
          <span className='info__name'>Hey, ich bin Felix</span>
          {
            !props.editProfile ?
              <div className='info__title'><span>{props.data.user_type}</span></div> :
              (
                <div className='trainer-edit-title-selection'>
                  {
                    titles.map((title, index) => {
                      return (
                        <div
                          className={`trainer-edit-title-block ${title.selected ? 'active': ''}`}
                          key={index}
                          onClick={() => handleSelectedTitle(title.id)}
                        >
                          <div className='trainer-edit-title-block-img-container'>
                            <img src={title.img} alt={title.name} />
                          </div>
                          {
                              title.name.split(' ').map((name, index) => {
                                return <p key={index}>{name}</p>
                              })
                          }
                        </div>
                      )
                    })
                  }
                </div>
              )
          }
          
        </div>
      </div>
      <div className='navbar__personal-motto'>
        {
          !props.editProfile ?
            <p className='motto'>{props.data.motto}</p> :
            <textarea
              className='personal-motto-input'
              type='text' value={props.data.motto}
              onChange={(event) => props.handleChange(event.target.value, 'motto')}
            />
        }
      </div>
      <div className='navbar__trainer-info'>
        <div className='trainer-info__experiences'>
          <span className='experiences--num bold'>{getCount?.count}</span>
          <span className='experiences--title'>Experiences</span>
        </div>
        <div className='trainer-info__follower'>
          <span className='follower--num bold'>500</span>
          <span className='follower--title'>Follower</span>
        </div>
        <div className='trainer-info__subscribers'>
          <span className='subscribers--num bold'>120</span>
          <span className='subscribers--title'>Abonniert</span>
        </div>
      </div>
      <div className={`navbar__follow-cta ${following ? 'profile-following' : ''}`} onClick={handleFollowCtaClick}><span>{following ? 'Following' : 'Follow'}</span></div>
    </div>
  )
}

export default ProfileNavbar