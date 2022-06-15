import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import BackgroundImage from "./../../../assets/images/experience-bg.png";
import Instructor from "./../../../assets/images/instructor.png";

import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import UserProfileTrainerInfo from "./UserProfileTrainerInfo/UserProfileTrainerInfo";
import TrainerExperiencesSlider from "./TrainerExperiencesSlider/TrainerExperiencesSlider";
import Posts from "./Posts/Posts";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";
import { useUserMeProfileRetrieve } from "src/generated/apiFetchers";

import "./UserProfile.scss";

const UserProfile = (props) => {
  const location = useLocation();
  const navbarRef = useRef(null);
  const [coverImage, setCoverImage] = useState(BackgroundImage);
  const [coverImageUpdated, setCoverImageUpdated] = useState(false);
  const [video, setVideo] = useState(
    "https://www.w3schools.com/html/mov_bbb.mp4"
  );
  const [videoUpdated, setVideoUpdated] = useState(false);
  const [profileImage, setProfileImage] = useState(Instructor);
  // const [avatarFile, setAvatarFile] = useState(null);
  const [profileImageUpdated, setProfileImageUpdated] = useState(false);
  const [firstName, setFirstName] = useState();
  const [avatarFile, setAvatarFile] = useState();
  const [profileType, setProfileType] = useState();
  const [about, setAbout] = useState();
  const [data, setData] = useState({
    user_type: profileType,
    motto: "Go your life with soul. Feel music.",
    aboutMe: about,
    selectedBand: "Guns N' Roses",
    avatar: avatarFile,
  });
  // console.log("profileType", profileType);
  // console.log("myData",data.selectedTitle);
  // console.log("userProfileAbout", about)

  const { data: getUserProfile } = useUserMeProfileRetrieve({});

  useEffect(() => {
    if (firstName) {
      setData({
        ...data,
        user_type: profileType,
        aboutMe: about,
        avatar: avatarFile,

      });
    }
  }, [about, profileType, avatarFile]);

  const [bands, setBands] = useState([
    {
      id: 1,
      name: "Guns N' Roses",
      img: BackgroundImage,
      selected: true,
    },
    {
      id: 2,
      name: "Beatles",
      img: BackgroundImage,
      selected: false,
    },
    {
      id: 3,
      name: "Coldplay",
      img: BackgroundImage,
      selected: false,
    },
    {
      id: 4,
      name: "Metallica",
      img: BackgroundImage,
      selected: false,
    },
    {
      id: 5,
      name: "Parcels",
      img: BackgroundImage,
      selected: false,
    },
    {
      id: 6,
      name: "AC/DC",
      img: BackgroundImage,
      selected: false,
    },
  ]);

  useEffect(() => {
    setFirstName(getUserProfile?.first_name);
    setAvatarFile(getUserProfile?.avatar);
    setAbout(getUserProfile?.about);
    setProfileType(getUserProfile?.user_type)
    console.log("userResponse", getUserProfile);
  }, [getUserProfile]);



  const handleSelectedBand = (id) => {
    let updatedBandsList = [...bands];
    let prevIndex = updatedBandsList.findIndex((band) => band.selected);
    let newIndex = updatedBandsList.findIndex((band) => band.id === id);
    updatedBandsList[prevIndex].selected = false;
    updatedBandsList[newIndex].selected = true;
    setBands(updatedBandsList);
    handleChange(updatedBandsList[newIndex].name, "selectedBand");
  };
  const [editProfile, setEditProfile] = useState(false);
  const [image, setImage] = useState(null);

  // console.log("myimage", image);

  const handleImageUpload = (event, input) => {
    event.persist();
    // if (event.target.files && event.target.files[0]) {
    //   setAvatarFile(null);
    //   var binaryData = [];
    //   setImage(event.target.files[0]);
    //   binaryData.push(event.target.files[0]);
    //   setblogFile(window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" })))
    // }
    // if (input === 'coverImage') {
    //   setCoverImage(blobURL)
    //   setCoverImageUpdated(true)
    // }
    // if (input === 'profileImage') {
    //   setProfileImage(blobURL)
    //   setProfileImageUpdated(true)
    // }
  };

  const handleChange = (input, inputField) => {
    setData((prevState) => {
      return {
        ...prevState,
        [inputField]: input,
      };
    });
  };
  const handleVideoUpload = (file) => {
    setVideo(file);
    setVideoUpdated(true);
  };
  const handleEditProfile = () => {
    setEditProfile((prevState) => !prevState);
  };
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.innerWidth < 1024) {
        navbarRef.current.classList.remove("fixed");
        return;
      }
      let doc = document.documentElement;
      let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (
        (location.pathname.indexOf("/trainer") && top > 500) ||
        (location.pathname.indexOf("/visitor") && top > 460)
      ) {
        navbarRef.current.classList.add("fixed");
      } else {
        navbarRef.current.classList.remove("fixed");
      }
    });
  }, []);
  return !editProfile ? (
    <div className="user-profile">
      <div
        className="user-profile__image"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        {" "}
      </div>

      <div className="user-profile__edit" onClick={handleEditProfile}>
        Bearbeiten
      </div>

      <ProfileNavbar forwardRef={navbarRef} avatarFile={avatarFile} data={data} />
      <div className="user-profile__content">
        <UserProfileTrainerInfo
          data={data}
          handleChange={handleChange}
          bands={bands}
          handleSelectedBand={handleSelectedBand}
          video={video}
        />
        {location.pathname.indexOf("trainer") !== -1 && (
          <div className="user-profile__cooperation">
            <p>
              FELIX, du hast eine eigene Band oder bist Solokünstler? Dann
              möchten wir mit dir gerne eine kostenlose Kooperation eingehen. Im
              Zuge der Kooperation schenken wir dir kostenlose Reichweite, eine
              Story zu deinem Profil und vieles mehr. Bewirb dich gerne dazu{" "}
              <span className="cooperation__cta">hier</span>.
            </p>
          </div>
        )}
        <TrainerExperiencesSlider userProfile={true} />
        <Posts />
      </div>
    </div>
  ) : (
    <UserProfileEdit
      avatarFile={avatarFile}
      image={image}
      coverImage={coverImage}
      coverImageUpdated={coverImageUpdated}
      profileImage={profileImage}
      profileImageUpdated={profileImageUpdated}
      handleImageUpload={handleImageUpload}
      // handleUpload={handleUpload}
      editProfile={editProfile}
      handleEditProfile={handleEditProfile}
      data={data}
      handleChange={handleChange}
      bands={bands}
      handleSelectedBand={handleSelectedBand}
      forwardRef={navbarRef}
      video={video}
      handleVideoUpload={handleVideoUpload}
      videoUpdated={videoUpdated}
    />
  );
};

export default UserProfile;
