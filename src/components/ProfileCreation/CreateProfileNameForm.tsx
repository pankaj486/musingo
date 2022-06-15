import React, { useState, useContext } from "react";
// import { service } from "src/services/AuthService/authService";
import { UserContext } from "./ProfileCreationWizard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "reactstrap";
// import {
//   // useUserMeProfileCreate,
//   // useUserMeProfilePartialUpdate,
//   useUserMeProfileRetrieve,
// } from "../../generated/apiFetchers";
//import { Spinner } from "reactstrap";
export type CreateProfileNameFormProps = {
  onNext: () => void;
};

export const CreateProfileNameForm: React.FC<CreateProfileNameFormProps> = ({
  onNext,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<any>(new Date());
  const [, setVal] = useContext(UserContext);
  const [formError, setFormError] = useState<any>({
    nameErr: '',
    lnameErr: '',
    birthErr: '',
  });

  // Toastify Success Notification
  toast.configure()

  const successMessage = () => {
    toast.success('User Data Registered.')
  }




  // const { data: userProfile } = useUserMeProfileRetrieve({});

  // const { mutate: createProfile, loading: loadingCreate } =
  //   useUserMeProfileCreate({});
  // const { mutate: updateProfile, loading: loadingUpdate } =
  //   useUserMeProfilePartialUpdate({});

  const validate = (firstName: any, lastName: any, birthday: any) => {
    let nameErr = "";
    let lnameErr = "";
    let birthErr = "";

    if (!firstName) {
      nameErr = 'First Name is required!'
    }
    if (!lastName) {
      lnameErr = 'Last Name is required!'
    }
    if (!birthday) {
      birthErr = 'Birth field is Required!'
    }
    if (nameErr || lnameErr || birthErr) {
      setFormError({ nameErr, lnameErr, birthErr });
    }
  }




  // const handleError = (r: unknown) => alert(r);
  const handleSubmit = () => {
    if (firstName && lastName && birthday) {
      setIsLoading(!isLoading);
      setVal({
        "firstName": firstName,
        "lastName": lastName,
        "birthday": birthday.toISOString().split('T')[0]
      });
      successMessage();
      // const value ={
      //   "firstName":firstName,
      //   "lastName":lastName,
      //   "birthday":birthday
      // }
      //     service.createProfileApi(value).then((response)=>{
      // console.log(response);
      onNext();
    } else {
      validate(firstName, lastName, birthday);
    }
    // })
  }

  // const handleSubmit = () => {
  //   if (loading) return;

  //   if (userProfile) {
  //     updateProfile({
  //       first_name: firstName || userProfile?.first_name,
  //       last_name: lastName || userProfile?.last_name,
  //       birthday: birthday || userProfile?.birthday,
  //     })
  //       .catch(handleError)
  //       .then(() => onNext());
  //   } else {
  //     if (firstName && lastName) {
  //       createProfile({
  //         first_name: firstName,
  //         last_name: lastName,
  //         birthday: birthday ? birthday : null,
  //         instruments: [],
  //         favourite_genres: [],
  //       })
  //         .catch(handleError)
  //         .then(() => onNext());
  //     }
  //   }
  // };

  return (
    // // loadingCreate || loadingUpdate ? (
    // //   <Spinner />
    // // ) : (
    <div className="d-flex flex-column  text-center p-5 dynamicHeight">
      <div>
        <h2>Wie heißt du</h2>
        <p className="pt-3 pt-sm-0 px-4 px-sm-0 medium-font">
          Musingoo ist eine Community des Vertrauens. Menschen verbinden sich,
          um gemeinsam Musik zu machen.
        </p>
      </div>

      <div>
        <div>
          <div className="musingoo-input-group">
            <input
              type="text"
              className="musingoo-input border-dark"
              placeholder="Vorname"
              aria-label="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <span style={{ color: 'red', marginLeft: -156, fontSize: "13px" }}>
            {formError.nameErr}
          </span>
        </div>
        <div>
          <div className="musingoo-input-group">
            <input
              type="text"
              className="musingoo-input border-dark"
              placeholder="Nachname"
              aria-label="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <span style={{ color: 'red', marginLeft: -156, fontSize: "13px" }}>
            {formError.lnameErr}
          </span>
        </div>
        {/* Address Field
        <div>
          <div className="musingoo-input-group">
            <input
              type="text"
              className="musingoo-input border-dark"
              placeholder="address"
              aria-label="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <span style={{ color: 'red', marginLeft: -156, fontSize: "13px" }}>
            {formError.addressErr}
          </span>
        </div> */}
        <div>
          <div className="musingoo-input-group">
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={birthday}
              onChange={(date: Date) => setBirthday(date)}
              className="musingoo-input border-dark"
              isClearable
              placeholderText="Geburtstag"
              maxDate={new Date()}
            />
          </div>
          <span style={{ color: 'red', marginLeft: -156, fontSize: "13px" }}>
            {formError.birthErr}
          </span>
        </div>
      </div>

      <div>
        {isLoading ? <Spinner /> : <button
          type="button"
          className="btn btn-secondary musingoo-button mx-0 small-font font-weight-bold w-100"
          onClick={handleSubmit}
        >
          Weiter
        </button>}
      </div>
    </div>
    // )
  );
};