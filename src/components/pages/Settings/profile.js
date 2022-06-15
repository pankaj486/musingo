import React, { Fragment, useState, useEffect, useRef } from "react";
import "./settings.scss";
import SettingPlusIcon from "../../../assets/images/settingPlus.png";
import Girl from "../../../assets/images/girl.png";
import Doll from "../../../assets/images/doll.png";
import Music from "../../../assets/images/music.png";
import Magic from "../../../assets/images/magic.png";
import { Link } from "react-router-dom";
import { service } from "src/services/AuthService/authService";
import { Spinner } from "reactstrap";
import { useContext } from "react";
import { UserContext } from "src/components/ProfileCreation/ProfileCreationWizard";
import { API_BASE_URL } from "src/config";
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { toastifyErrorMessage, toastifySuccessMessage } from "src/components/Toastify/toastify";
import { useUserMeProfileRetrieve, useUserMeProfilePartialUpdate } from "src/generated/apiFetchers"



const Profile = () => {

  const fileInputRef = useRef(null);

  const [avatarFile, setAvatarFile] = useState(undefined);
  const [blogFile, setblogFile] = useState(null);
  const [image, setImage] = useState(null);

  const [profileType, setProfileType] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [about, setAbout] = useState();
  const [loading, setLoading] = useState(true);

  const { data: getUserProfile } = useUserMeProfileRetrieve({});
  const { mutate: updateUserProfile } = useUserMeProfilePartialUpdate({})


  useEffect(() => {
    setFirstName(getUserProfile?.first_name)
    setLastName(getUserProfile?.last_name)
    setAbout(getUserProfile?.about)
    setAvatarFile(getUserProfile?.avatar)
    setProfileType(getUserProfile?.user_type)
    setLoading(false)
  }, [getUserProfile])


  async function formSubmit() {
    // console.log("About", about);
    // setLoading(true);
    let formData = new FormData();
    if (formData) {
      if (image) {
        formData.append("avatar", avatarFile ? avatarFile : image);
      }
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("about", about);
      if (profileType) {
        formData.append("user_type", profileType);
      }
      updateUserProfile(formData);
      toastifySuccessMessage("form submitted")
    } else {
      toastifyErrorMessage("Not Valid Form")
    }


  }


  const handleProfileSelect = (type) => {
    return () => {
      setProfileType(type !== profileType ? type : null);
    };
  };


  function handleUpload(event) {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(null);
      var binaryData = [];
      setImage(event.target.files[0]);
      binaryData.push(event.target.files[0]);
      setblogFile(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })))
    }
  }


  return (

    <Fragment>
      {/* {loading ?
        <Spinner />
        :  */}
      <>
        <h5>Profil</h5>
        <div className="settings pt-4">
          <label htmlFor="Vorname">Vorname</label>
          <input
            type="text"
            name="Vorname"
            value={firstName || ''}
            onChange={e => setFirstName(e.target.value)}
            className="form-control musingoo-input mb-2"
          />

          <label htmlFor="Künstlername" className="mb-2">
            Künstlername
          </label>
          <input
            type="text"
            name="künstlername"
            value={lastName || ''}
            onChange={e => setLastName(e.target.value)}
            className="form-control musingoo-input mb-2"
          />

          <label htmlFor="">Profile Pic</label>

          <img
            onClick={() => fileInputRef.current?.click()}
            src={avatarFile ? avatarFile : blogFile ? "this is text": ''}
            style={{ cursor: "pointer", borderRadius: "50%", height: "70px" }}
            alt={"avatar"}
            width={"70px"}
          />

          <input
            type="file"
            ref={fileInputRef}
            accept={"image/*"}
            style={{ display: "none" }}
            onChange={handleUpload}
          />

          <label htmlFor="ÜberMich">Über mich</label>
          <textarea
            name="ÜberMich"
            id=""
            cols="2"
            rows="4"
            className="form-control musingoo-input"
            value={about === null ? '' : about}
            onChange={e => setAbout(e.target.value)}
          ></textarea>

          <label htmlFor="" className="mt-4">
            Ich bin
          </label>
          <div className="d-flex flex-column flex-md-row mt-4">

            <button
              className={
                "btn imageButton mb-2" +
                (profileType === "BEG" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("BEG")}
            >
              <img src={Girl} alt="" width="80px" />
              <p className="mb-0">Anfänger</p>
            </button>
            <button
              className={
                "btn imageButton mb-2" +
                (profileType === "STU" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("STU")}
            >
              <img src={Doll} alt="" width="80px" />
              <p className="mb-0">Musikstudent</p>
            </button>

            <button
              className={
                "btn imageButton mb-2" +
                (profileType === "HOB" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("HOB")}
            >
              <img src={Music} alt="" width="80px" />
              <p className="mb-0">Hobbymusiker</p>
            </button>

            <button
              className={
                "btn imageButton mb-2" +
                (profileType === "PRO" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("PRO")}
            >
              <img src={Magic} alt="" width="80px" />
              <p className="mb-0">Profi</p>
            </button>
          </div>

          {loading ? <Spinner /> : <button onClick={() => formSubmit()} className="btn btn-primary px-4 py-2 text-white mb-2 speichernButton">
            Speichern
          </button>}
        </div>
      </>
      {/* } */}
    </Fragment>
  );
};

export default Profile;