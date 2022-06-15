import React, { useState } from "react";
import OAuth2Login from "react-simple-oauth2-login";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Facebook from "../../assets/images/facebook.svg";
import Google from "../../assets/images/google.png";
import SoundCloud from "../../assets/images/soundcloudBig.png";
import Apple from "../../assets/images/apple.png";
import Spotify from "../../assets/images/spotify.png";
import Background from "../../assets/images/modalBackground.png";

import { SignUpSteps } from "./SignupModal";
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

export const MethodSelect = ({ width, onSelect, onToLogin }) => {
   const modalBackground = {
      backgroundImage: width > 1024 ? `url(${Background})` : "",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: "4rem",
   };

   const [error, setError] = useState(false);

   const history = useHistory();

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
      <div
         style={modalBackground}
         className="modalBackground d-flex flex-column text-light px-1 py-4 align-items-center"
      >
         <div className="modalText text-center justify-content-center align-items-center">
            <h2 className={width <= 1024 ? "text-dark-gray" : "pt-4"}>
               Registrieren
            </h2>

            <span
               className={
                  width <= 1024
                     ? "text-dark-gray font-weight-bold"
                     : "font-weight-bold"
               }
            >
               via
            </span>

            <div className="d-flex flex-wrap flex-column text-centers mt-2 justify-content-center mt-3">
               <div className="d-flex">
                  <OAuth2Login
                     authorizationUrl={facebookAuthorizationUrl}
                     clientId={facebookClientId}
                     redirectUri={redirectUri}
                     responseType="token"
                     render={(props) => (
                        <figure
                           className="socialBox mr-2"
                           onClick={props.onClick}
                        >
                           <img src={Facebook} alt="facebook" width="32px" />
                        </figure>
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
                        <figure
                           className="socialBox ml-2"
                           onClick={props.onClick}
                        >
                           <img src={Google} alt="google" width="34px" />
                        </figure>
                     )}
                     onSuccess={onGoogleSuccess}
                     onFailure={(data) => console.log(data)}
                  />
               </div>

               <div className="d-flex">
                  <OAuth2Login
                     authorizationUrl={appleAuthorizationUrl}
                     clientId={appleClientId}
                     redirectUri={API_BASE_URL + "/social-auth/apple/"}
                     responseType="code%20id_token"
                     extraParams={{
                        response_mode: "form_post",
                     }}
                     render={(props) => (
                        <figure
                           className="socialBox mr-2"
                           onClick={props.onClick}
                        >
                           <img src={Apple} alt="apple" width="34px" />
                        </figure>
                     )}
                     onSuccess={onAppleSuccess}
                     onFailure={(data) => console.log(data)}
                     isCrossOrigin
                  />

                  <OAuth2Login
                     authorizationUrl={spotifyAuthorizationUrl}
                     clientId={spotifyClientId}
                     redirectUri={redirectUri}
                     responseType="token"
                     scope={"user-read-email"}
                     render={(props) => (
                        <figure
                           className="socialBox ml-2"
                           onClick={props.onClick}
                        >
                           <img src={Spotify} alt="insta" width="32px" />
                        </figure>
                     )}
                     onSuccess={onSpotifySuccess}
                     onFailure={(data) => console.log(data)}
                  />
               </div>
               <button
                  type="button"
                  className="btn btn-primary mx-0 musingoo-button text-light mt-2 mb-4 small-font font-weight-bold py-2"
                  onClick={() => onSelect(SignUpSteps.Email)}
               >
                  {" "}
                  <i className="fa fa-envelope" /> Via Email
               </button>

               <div className="divider" />

               <p
                  className={
                     width <= 1024 ? "text-dark-gray mb-0 pt-3" : "mb-0 pt-2"
                  }
               >
                  Du hast schon einen Account?
               </p>

               <button
                  className="text-primary pt-0 font-weight-bold cursor-pointer btn btn-link"
                  onClick={() => onToLogin()}
               >
                  Hier einloggen
               </button>
            </div>
         </div>
      </div>
   );
};


