import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import OAuth2Login from "react-simple-oauth2-login";
import Carousel from "src/components/carousel/carousel";
import SearchModal from "src/components/modals/SearchModal/SearchModal";
import MusingooNavbar2 from "../../layout/navbar-landing";
import MusingooNavbar from "../../layout/navbar";
import "./inviteFriends.scss";
import Avatar from "../../../assets/images/model.png";
import { Modal, ModalBody } from "reactstrap";
import Gmail from "../../../assets/images/new/gmail.png";
import Mail from "../../../assets/images/new/mail.png";
import Yahoo from "../../../assets/images/new/yahoo.png";
import Outlook from "../../../assets/images/new/outlook.png";
import Arrow from "../../../assets/images/new/arrowRe.png";
import { AiOutlinePlus } from "react-icons/ai";
import Backdrop from "src/components/Backdrop/Backdrop";
import InviteModal from "./anotherModal";
import MsgModal from "./msgModal";
import MsgModal2 from "./msgModal2";
import { PulseLoader } from "react-spinners";

import {
  googleOtherContactsServer,
  googleContactsServer,
  googleAuthorizationUrl,
  googleClientId,
  redirectUri,
  serverUrl,
  API_BASE_URL,
  BASE_URL,
  outlookAuthorizationUrl,
  outlookClientId,
  outlookContactsServer,
} from "../../../config";

const InviteComponent = ({ name, email, inviteToggle }) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    inviteToggle ? setClicked(true) : setClicked(false);
  }, [inviteToggle]);

  const sendInviteEmail = () => {
    setLoading(true);
    axios
      .post(API_BASE_URL + "/api/invite/email", { emails: [email] })
      .then((res) => {
        if (res.status === 200) setClicked(true);
      })
      .catch((err) => setClicked(false))
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      <div className="w-100 field justify-content-between pr-4">
        <div className="d-flex flex-row align-items-center">
          <div className="mr-2 mr-lg-5">
            <span>{name}</span>
          </div>
          <div className="mr-2 mr-lg-5">
            <p className="mailadd mb-0">{email}</p>
          </div>
        </div>
        <button
          onClick={sendInviteEmail}
          className={clicked ? "primary-btn" : "primary-btn2"}
        >
          {loading ? (
            <PulseLoader size={6} color={"white"} />
          ) : clicked ? (
            "Invited"
          ) : (
            "Invite"
          )}
        </button>
      </div>
    </Fragment>
  );
};

const InviteFriendModal = ({ onClickAdd, onClickMail, onClickArrow }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [syncedContacts, setSyncedContacts] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleM, setIsVisibleM] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisibleMsg, setIsVisibleMsg] = useState(false);
  const [isVisibleMsg2, setIsVisibleMsg2] = useState(false);

  const [inviteAllClicked, setInviteAllClicked] = useState(false);

  const handleInviteAll = () => {
    setLoading(true);
    axios
      .post(BASE_URL + "/api/invite/email", { emails: syncedContacts })
      .then((res) => {
        if (res.status === 200) setInviteAllClicked(true);
      })
      .catch((err) => setInviteAllClicked(false))
      .finally(() => setLoading(false));
  };

  const onGoogleSuccess = ({ access_token: token }) => {
    if (token)
      axios
        .get(googleOtherContactsServer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          let resultEmails = [];
          res.data.otherContacts.map((contact) => {
            if (contact.hasOwnProperty("names"))
              // setSyncedContacts((prevState) => [
              //    ...prevState,
              //    {
              //       name: contact.names[0].displayName,
              //       email: contact.emailAddresses[0].value,
              //    },
              // ]);
              resultEmails.push({
                name: contact.names[0].displayName,
                email: contact.emailAddresses[0].value,
              });
          });
          setSyncedContacts(resultEmails);
        })
        .catch((err) => console.log(err.response));
  };

  const onOutlookSuccess = ({ access_token: token }) => {
    if (token)
      axios
        .get(outlookContactsServer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          let resultEmails = [];
          res.data?.value.length !== 0
            ? res.data.value.map((contact) => {
                if (contact.emailAddresses.length !== 0)
                  //   setSyncedContacts((prevState) => [
                  //      ...prevState,
                  //      {
                  //         name: contact.displayName,
                  //         email: contact.emailAddresses[0].address,
                  //      },
                  //   ]);
                  resultEmails.push({
                    name: contact.displayName,
                    email: contact.emailAddresses[0].address,
                  });
              })
            : alert("Found no contacts on Outlook");
          setSyncedContacts(resultEmails);
        })
        .catch((err) => console.log(err.response));
  };

  const onYahooSuccess = ({ code }) => {
    console.log(code);
    fetch(`${serverUrl}/yahoo/get-token`, {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.access_token;
      })
      .then((token) =>
        fetch(googleContactsServer, {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then(setSyncedContacts)
      .catch(setError);
  };

  return (
    <Fragment>
      <div className="invite-friendz-modal">
        <div className="invite-friendz">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 px-4 mx-4 mb-3">
                <h2>Invite your Friends</h2>
                <h4>
                  Push your audience with your own Friends and contact lists
                </h4>
              </div>
              {syncedContacts.length !== 0 && (
                <div className="col-12 col-md-9 col-lg-6 order-2 order-lg-1">
                  <div className="d-flex flex-column-reverse flex-lg-column">
                    <div className="left-side mt-3 mt-lg-0">
                      <p className="text text-left ml-4">
                        {syncedContacts.length} Kontakte mit E-Mail-Adressen
                        gefunden
                      </p>
                      <div className="d-flex flex-column align-items-start ml-4">
                        {syncedContacts.map((contact) => (
                          <InviteComponent
                            name={contact.name}
                            email={contact.email}
                            inviteToggle={inviteAllClicked}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleInviteAll}
                      className={
                        inviteAllClicked
                          ? "ml-4 musingoo-buttoni"
                          : "ml-4 musingoo-button"
                      }
                    >
                      {loading ? (
                        <PulseLoader size={8} color={"white"} />
                      ) : inviteAllClicked ? (
                        "Invited"
                      ) : (
                        "Invite all"
                      )}
                    </button>
                  </div>
                </div>
              )}
              <div className="col-9 col-sm-12 col-md-12 col-lg-6 order-1 order-lg-2">
                <div className="right-side d-flex align-items-center">
                  <button
                    onClick={() => setIsVisible2(true)}
                    className="musingoo-button-right"
                  >
                    <AiOutlinePlus /> Add Friends
                  </button>
                  <div className="w-100 d-flex align-items-center mt-3 justify-content-center">
                    <OAuth2Login
                      authorizationUrl={googleAuthorizationUrl}
                      clientId={googleClientId}
                      redirectUri={redirectUri}
                      responseType="token"
                      scope={
                        "https://www.googleapis.com/auth/contacts.other.readonly%20https://www.googleapis.com/auth/contacts.readonly"
                      }
                      render={(props) => (
                        <img
                          style={{ cursor: "pointer" }}
                          className="modal-img"
                          src={Gmail}
                          onClick={props.onClick}
                        />
                      )}
                      onSuccess={onGoogleSuccess}
                      onFailure={(data) => console.log(data)}
                    />
                    <OAuth2Login
                      authorizationUrl={outlookAuthorizationUrl}
                      clientId={outlookClientId}
                      redirectUri={redirectUri}
                      responseType="token"
                      scope={"contacts.read"}
                      render={(props) => (
                        <img
                          style={{ cursor: "pointer" }}
                          className="modal-img"
                          src={Outlook}
                          onClick={props.onClick}
                        />
                      )}
                      onSuccess={onOutlookSuccess}
                      onFailure={(data) => console.log(data)}
                    />

                    {/* <img className="modal-img" src={Yahoo} /> */}
                    <img
                      className="modal-img"
                      src={Mail}
                      onClick={() => setIsVisibleMsg2(true)}
                    />
                    <img
                      className="modal-img"
                      src={Arrow}
                      onClick={() => setIsVisibleMsg(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InviteModal
        onClickArrow={() => setIsVisibleMsg2(true)}
        onClickMail={() => setIsVisibleMsg(true)}
        showModal={isVisible2}
        handleModalVisibility={() => setIsVisible2(false)}
      />
      <MsgModal
        open={isVisibleMsg}
        onCross={() => setIsVisibleMsg(false)}
        onClose={() => setIsVisibleMsg(!isVisibleMsg)}
      />
      <MsgModal2
        open={isVisibleMsg2}
        onCross={() => setIsVisibleMsg2(false)}
        onClose={() => setIsVisibleMsg2(!isVisibleMsg2)}
      />
    </Fragment>
  );
};

export default InviteFriendModal;
