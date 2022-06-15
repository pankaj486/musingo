import React, { useState, useRef, useEffect } from 'react'
import { GoPlus } from 'react-icons/go/index'

import ProfileNavbar from '../ProfileNavbar/ProfileNavbar'
import UserProfileTrainerInfo from '../UserProfileTrainerInfo/UserProfileTrainerInfo'
import Posts from '../Posts/Posts'
import axios from 'axios'
import { API_BASE_URL } from 'src/config';

import './UserProfileEdit.scss'
import { service } from 'src/services/AuthService/authService'
import {useUserMeProfilePartialUpdate, useUserMeProfileRetrieve} from "src/generated/apiFetchers"

const UserProfileEdit = props => {

  const [image, setImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  // const [about, setAbout] = useState();
  const [profileType, setProfileType] = useState(null);
  const [blogFile, setblogFile] = useState(null);
  const [ImageUpdated, setImageUpdated] = useState(false);

  const {mutate: updateUserProfile} = useUserMeProfilePartialUpdate({});


  // console.log("newData", props.data);
  // console.log("myAvatarAbout", about);

  const { selectedTitle, aboutMe } = props.data;
  // console.log("Abodljf", aboutMe);

  async function formSubmit() {
    let formData = new FormData();
    if (image) {
      formData.append("avatar", avatarFile ? avatarFile : image);
    }
    if (selectedTitle) {
      formData.append("user_type", selectedTitle);
    }
    formData.append("about", aboutMe);
    // service.updateProfileApi(formData).then((res) => {
    //   console.log("res", res);
    // })
    await updateUserProfile(formData);
  }

  const {data: getUserProfile} = useUserMeProfileRetrieve({});
  console.log("getUserProfile", getUserProfile);


  useEffect(() => {
    setAvatarFile(getUserProfile?.about);
    setProfileType(getUserProfile?.user_type);
  }, [getUserProfile])

  function handleUpload(event, input) {
    if (input === 'profileImage') {
      if (event.target.files && event.target.files[0]) {
        setAvatarFile(null);
        var binaryData = [];
        setImage(event.target.files[0]);
        binaryData.push(event.target.files[0]);
        setblogFile(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })))
        setImageUpdated(true)
      }
    }
  }


  const coverImageRef = useRef(null);
  return (
    <div className='user-profile edit-user-profile'>
      <div
        className='user-profile__image'
        style={{
          backgroundColor: `${!props.coverImageUpdated && '#d2d1d1'}`,
          backgroundImage: `url(${props.coverImageUpdated && props.coverImage})`,
          marginBottom: '30px'
        }}
        onClick={() => coverImageRef.current.click()}
      >
        <span className="upload-cover-image-text">Cover ändern</span>
        <input
          type='file'
          name='file'
          ref={coverImageRef}
          style={{ display: 'none' }}
          onChange={(event) => props.handleImageUpload(event, "coverImage")}
        />
      </div>
      <ProfileNavbar
        ImageUpdated={ImageUpdated}
        avatarFile={avatarFile}
        blogFile={blogFile}
        handleUpload={handleUpload}
        profileImage={props.profileImage}
        profileImageUpdated={props.profileImageUpdated}
        handleImageUpload={props.handleImageUpload}
        editProfile={props.editProfile}
        handleSelectedTitle={props.handleSelectedTitle}
        handleChange={props.handleChange}
        data={props.data}
        forwardRef={props.forwardRef}
      />
      <div className='user-profile__content'>
        <UserProfileTrainerInfo
          data={props.data}
          handleChange={props.handleChange}
          editProfile={props.editProfile}
          bands={props.bands}
          handleSelectedBand={props.handleSelectedBand}
          video={props.video}
          handleVideoUpload={props.handleVideoUpload}
          videoUpdated={props.videoUpdated}
        />
        <div className='trainer-profile-edit-submit-cta' onClick={() => formSubmit()}>
          <span>Speichern</span>
        </div>
      </div>
    </div>
  )
}

export default UserProfileEdit