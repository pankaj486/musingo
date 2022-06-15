import React, { useState } from "react";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import Background from "../../assets/images/modalBackground.png";
import { service as authService } from "../../services/AuthService/authService";
import OAuth2Login from "react-simple-oauth2-login";
import "./register.scss";
import { Spinner } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from "@material-ui/core";
import Facebook from "../../assets/images/facebook.svg";
import Google from "../../assets/images/google.png";
import SoundCloud from "../../assets/images/soundcloudBig.png";
import Apple from "../../assets/images/apple.png";
import Spotify from "../../assets/images/spotify.png";
import { toastifyErrorMessage, toastifySuccessMessage } from "../Toastify/toastify";

import {
   spotifyAuthorizationUrl,
   spotifyClientId,
   facebookAuthorizationUrl,
   facebookClientId,
   googleAuthorizationUrl,
   googleClientId,
   redirectUri,
   appleAuthorizationUrl,
   appleClientId,
   API_BASE_URL,
} from "../../config";


const Span = styled('span')({
   textAlign: 'center'
})


const LoginComponent = (props) => {
   let {
      width,
      modal,
      toggleModal,
      toggleRegisterModalFromLoginModal,
      togglePasswordResetModalFromLoginModal,
   } = props;

   const [isLoading, setIsLoading] = useState(false);
   let [email, setEmail] = useState("");
   let [password, setPassword] = useState("");
   const [formError, setFormError] = useState({
      emailErr: '',
      passwordErr: '',
   });


   const toggle = (e) => {
      toggleModal(e);
   };

   const toggleRegisterModal = (e) => {
      toggleRegisterModalFromLoginModal(e);
   };

   const togglePasswordResetModal = (e) => {
      togglePasswordResetModalFromLoginModal(e);
   };


   const login = (e) => {
      setIsLoading(true);
      authService
         .login(email, password)
         .then(() => {
            toggle(e)
            toastifySuccessMessage("Login Successfully");
         })
         .catch((error) => {
            console.log(error.response)
            if(!email, !password){
               validate()
            }else{
               toastifyErrorMessage(error.response.data.detail)
            }
            setIsLoading(false);
         });
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


   const modalBackground = {
      backgroundImage: width > 1024 ? `url(${Background})` : "",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: "4rem",
   };

   const onFacebookSuccess = ({ access_token: token }) => {
      if (token)
         axios
            .post(API_BASE_URL + "/social-auth/facebook/", {
               auth_token: token,
            })
            .then((res) => {
               if (res.status === 200) {
                  console.log(res);
                  alert("facebook registered");
               }
            })
            .catch((err) => {
               console.log(err.response);
               alert(err.response.data.auth_token);
            });
   };

   const onGoogleSuccess = ({ access_token: token }) => {
      if (token)
         axios
            .post(API_BASE_URL + "/social-auth/google/", {
               auth_token: token,
            })
            .then((res) => {
               if (res.status === 200) {
                  console.log(res);
                  alert("google registered");
               }
            })
            .catch((err) => {
               console.log(err.response);
               alert(err.response.data.auth_token);
            });
   };

   const onSpotifySuccess = ({ access_token: token }) => {
      if (token)
         axios
            .post(API_BASE_URL + "/social-auth/spotify/", {
               auth_token: token,
            })
            .then((res) => {
               if (res.status === 200) {
                  console.log(res);
                  alert("spotify registered");
               }
            })
            .catch((err) => {
               alert(err.response.data.detail);
            });
   };

   const onAppleSuccess = ({ tokens }) => {
      if (tokens) alert("apple registered");
      else alert("registration failed");
   };

   return (
      <div>
         <Modal
            isOpen={modal}
            toggle={toggle}
            centered={true}
            className="register"
         >
            <ModalBody style={{ background: "none" }}>
               <div
                  style={modalBackground}
                  className="modalBackground d-flex flex-column justify-content-center text-light pad-4"
               >
                  <div className="modalText text-center login">
                     <h2 className="font-weight-bold">Log-In</h2>
                     <div className="d-flex flex-column justify-content-center text-center pt-4 pb-2 px-2 mt-5">
                        <div className="invite-freindz-modal">
                           <div className="invite-friendz mt-0">
                              <div className="right-side">
                                 <div className="w-100 d-flex align-items-center mb-3 justify-content-center">
                                    <OAuth2Login
                                       authorizationUrl={
                                          facebookAuthorizationUrl
                                       }
                                       clientId={facebookClientId}
                                       redirectUri={redirectUri}
                                       responseType="token"
                                       render={(props) => (
                                          <img
                                             onClick={props.onClick}
                                             style={{ cursor: "pointer" }}
                                             className="modal-img bg-white p-2"
                                             src={Facebook}
                                             alt="facebook"
                                             width="32px"
                                          />
                                       )}
                                       scope={"public_profile email"}
                                       onSuccess={onFacebookSuccess}
                                       onFailure={(data) => console.log(data)}
                                    />
                                    <OAuth2Login
                                       authorizationUrl={googleAuthorizationUrl}
                                       clientId={googleClientId}
                                       redirectUri={redirectUri}
                                       responseType="token"
                                       scope={
                                          "https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"
                                       }
                                       render={(props) => (
                                          <img
                                             onClick={props.onClick}
                                             style={{ cursor: "pointer" }}
                                             className="modal-img bg-white p-2"
                                             src={Google}
                                             alt="google"
                                             width="32px"
                                          />
                                       )}
                                       onSuccess={onGoogleSuccess}
                                       onFailure={(data) => console.log(data)}
                                    />
                                    <OAuth2Login
                                       authorizationUrl={appleAuthorizationUrl}
                                       clientId={appleClientId}
                                       redirectUri={
                                          API_BASE_URL + "/social-auth/apple/"
                                       }
                                       responseType="code%20id_token"
                                       extraParams={{
                                          response_mode: "form_post",
                                       }}
                                       render={(props) => (
                                          <img
                                             onClick={props.onClick}
                                             style={{ cursor: "pointer" }}
                                             className="modal-img bg-white p-2"
                                             src={Apple}
                                             alt="apple"
                                             width="32px"
                                          />
                                       )}
                                       onSuccess={onAppleSuccess}
                                       onFailure={(data) => console.log(data)}
                                       isCrossOrigin
                                    />

                                    <OAuth2Login
                                       authorizationUrl={
                                          spotifyAuthorizationUrl
                                       }
                                       clientId={spotifyClientId}
                                       redirectUri={redirectUri}
                                       responseType="token"
                                       scope={"user-read-email"}
                                       render={(props) => (
                                          <img
                                             onClick={props.onClick}
                                             style={{ cursor: "pointer" }}
                                             className="modal-img bg-white p-2"
                                             src={Spotify}
                                             alt="spotify"
                                             width="32px"
                                          />
                                       )}
                                       onSuccess={onSpotifySuccess}
                                       onFailure={(data) => console.log(data)}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="input-group mb-3">
                           <input
                              type="email"
                              className="form-control formFieldHeight"
                              placeholder="Email Adresse"
                              aria-label="Email Adresse"
                              value={email || ''}
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>
                        <span style={{ color: 'red',margin:"0px 0px", fontSize: "13px" }}>
                           {formError.emailErr}
                        </span>
                        <div className="input-group mb-3">
                           <input
                              type="password"
                              className="form-control formFieldHeight"
                              placeholder="Passwort"
                              aria-label="Passwort"
                              value={password || ''}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                        <span style={{ color: 'red', margin:"0 auto", fontSize: "13px" }}>
                           {formError.passwordErr}
                        </span>
                        {isLoading ? <Span ><Spinner /></Span> : <button
                           type="button"
                           className="btn btn-primary font-weight-bold btn-lg btn-block text-light small-font formFieldHeight"
                           onClick={login}
                        >
                           Login
                        </button>}
                        <a
                           className="text-right font-weight-bold pt-1 cursor-pointer"
                           onClick={togglePasswordResetModal}
                        >
                           Passwort vergessen?
                        </a>
                     </div>
                     <div
                        className="divider mt-3"
                        style={{ width: "200px", margin: "auto" }}
                     />
                     <p className="pt-4 mb-0">
                        Du hast noch keinen Musingoo-Account?
                     </p>
                     <button
                        className="text-primary pt-0 font-weight-bold cursor-pointer btn btn-link"
                        onClick={toggleRegisterModal}
                     >
                        Hier registrieren
                     </button>
                  </div>
               </div>
            </ModalBody>
         </Modal>
      </div>
   );
};
export default LoginComponent;
