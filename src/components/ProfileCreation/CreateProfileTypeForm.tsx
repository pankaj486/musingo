import React, { useState, useContext } from "react";
import { UserContext } from "./ProfileCreationWizard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Girl from "../../assets/images/girl.png";
import Doll from "../../assets/images/doll.png";
import Music from "../../assets/images/music.png";
import Magic from "../../assets/images/magic.png";

import {
  // useUserMeProfilePartialUpdate,
  UserTypeEnum,
} from "../../generated/apiFetchers";

export type CreateProfileTypeFormProps = {
  onNext: () => void;
};

export const CreateProfileTypeForm: React.FC<CreateProfileTypeFormProps> = ({
  onNext,
}) => {
  const [, setVal] = useContext(UserContext);
  const user = useContext(UserContext);

  const [profileType, setProfileType] = useState<UserTypeEnum | null>(null);


  const handleProfileSelect = (type: UserTypeEnum) => {
    return () => {
      setProfileType(type !== profileType ? type : null);
    };
  };

  // const { mutate: updateProfile } = useUserMeProfilePartialUpdate({});

  // Toastify Success Notification
  toast.configure()

  const successMessage = () => {
    toast.success('User Type Register')
  }
  // const handleError = (r: unknown) => alert(r);
  const handleSubmit = () => {
    // console.log(user);
    user.push(profileType)

    setVal(user)
    if (profileType)
    successMessage()
    onNext();

    // console.log('after',user)

    // updateProfile({ user_type: profileType })
    //   .catch(handleError)
    //   .then(() => onNext());
  };

  return (
    <div className="d-flex flex-column  text-center p-5 dynamicHeight">
      <div>
        <h2>Wähle wer du bist</h2>
        <p className="pt-3 pt-sm-0 px-4 px-sm-0 medium-font">
          Sag der Community, was am besten zu dir passt
        </p>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex">
          <div className="d-flex flex-column" style={{ flex: 1 }}>
            <div
              className={
                "m-1 imageOption cursor-pointer " +
                (profileType === "BEG" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("BEG")}
            >
              <img src={Girl} alt="" width="80px" />
              <p className="pt-2 mb-0 font-weight-bold">Anfänger</p>
            </div>
            <div
              className={
                "m-1 imageOption cursor-pointer " +
                (profileType === "STU" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("STU")}
            >
              <img src={Doll} alt="" width="80px" />
              <p className="pt-2 mb-0 font-weight-bold">Musikstudent</p>
            </div>
          </div>
          <div className="d-flex flex-column" style={{ flex: 1 }}>
            <div
              className={
                "m-1 imageOption cursor-pointer " +
                (profileType === "HOB" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("HOB")}
            >
              <img src={Music} alt="" width="80px" />
              <p className="pt-2 mb-0 font-weight-bold">Hobbymusiker</p>
            </div>

            <div
              className={
                "m-1 imageOption cursor-pointer " +
                (profileType === "PRO" ? "isProfileActive" : "")
              }
              onClick={handleProfileSelect("PRO")}
            >
              <img src={Magic} alt="" width="80px" />
              <p className="pt-2 mb-0 font-weight-bold">Profi</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          style={{ width: "100%" }}
          className="btn btn-secondary musingoo-button mx-0 mt-3 mt-sm-3 small-font font-weight-bold"
          onClick={() => {
            handleSubmit();
          }}
        >
          Weiter
        </button>
        <button
          className="pt-2 pt-sm-4 text-black-30 btn btn-link"
          onClick={() => onNext()}
        >
          Überspringen
        </button>
      </div>
    </div>
  );
};