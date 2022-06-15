import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "reactstrap";
import { service } from "src/services/AuthService/authService";

import { useUserMeCreate } from "../../generated/apiFetchers";
import { toastifyErrorMessage, toastifySuccessMessage } from "../Toastify/toastify";

export type SignUpFormProps = {
  onContinue: () => void;
};

export const EmailSignUpForm: React.FC<SignUpFormProps> = ({ onContinue }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const [formError, setFormError] = useState<any>({
    emailErr: '',
    passwordErr: '',
  });

  const { mutate: createUser } = useUserMeCreate({});


  const handleSignUp = () => {
    const user: any = { email, password, };
    if (email && password) {
      try {
        createUser(user).then((result) => {
          service.login(email, password).then((token:any) => {
            localStorage.setItem("token", token.jwt_access);
            setLoading(false)
            toastifySuccessMessage("Successfully signed up")
            onContinue();
          });
          setLoading(false)
        });
      }catch(error){
        setLoading(false);
        toastifyErrorMessage(error)
      }
    }else{
      validate();
    }
  };

const validate = () => {
    let emailErr = "";
    let passwordErr = "";

    if (!email) {
      emailErr = 'Email is required'
    }
    if (!password) {
      passwordErr = 'Password is required'
    }
    if (emailErr || passwordErr) {
      setFormError({ emailErr, passwordErr });
    }
  }

  return (
    <div className="d-flex flex-column text-center p-5 text-dark-gray dynamicHeight">
      <div>
        <h2>Account erstellen</h2>
        <p className="pt-3 pt-sm-0 medium-font">
          Erstelle deinen Account einfach via E-Mail und sicherem Passwort
        </p>
      </div>
      <div>
        <div className="musingoo-input-group mt-4">
          <input
            type="email"
            className="border-dark musingoo-input"
            placeholder="Email Adresse"
            aria-label="Email Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: 'red', marginLeft: -183, fontSize: "13px" }}>
            {formError.emailErr}
            {formError.fieldReq}
          </span>
        </div>
        <div className="musingoo-input-group ">
          <input
            type="Password"
            className="border-dark musingoo-input"
            placeholder="Passwort"
            aria-label="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: 'red', marginLeft: -156, fontSize: "13px" }}>
            {formError.passwordErr}
            {formError.fieldReq}
          </span>
        </div>
      </div>
      {loading ? <Spinner /> :
        <button
          type="button"
          className="btn btn-secondary musingoo-button mx-0 small-font mt-xs-5 font-weight-bold"
          onClick={handleSignUp}
        >
          Weiter
        </button>
      }
    </div>
  )
};