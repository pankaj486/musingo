import React, { Fragment, useEffect, useRef, useState } from "react";
import "./inviteFriends.scss";
import Gmail from "../../../assets/images/new/gmail.png";
import Mail from "../../../assets/images/new/mail.png";
import Yahoo from "../../../assets/images/new/yahoo.png";
import Outlook from "../../../assets/images/new/outlook.png";
import Arrow from "../../../assets/images/new/arrowRe.png";
import { BsChevronLeft } from "react-icons/bs";
import Backdrop from "src/components/Backdrop/Backdrop";
import axios from "axios";
import { BASE_URL } from "src/config";
import { PulseLoader } from "react-spinners";

const MsgModal = ({ open, onClose, onCross }) => {
   const [inviteEmails, setInviteEmails] = useState("");
   const [loading, setLoading] = useState(false);
   const [clicked, setClicked] = useState(false);

   const onSubmitInvite = () => {
      setLoading(true);
      let emailList = inviteEmails && inviteEmails.split(",");
      if (emailList)
         axios
            .post(BASE_URL + "/api/invite/email", { emails: emailList })
            .then((res) => {
               if (res.status === 200) setClicked(true);
            })
            .catch((err) => setClicked(false))
            .finally(() => setLoading(false));
      else {
         setLoading(false);
         alert("You need to enter at least one email to invite");
      }
   };
   let modalContents = (
      <div className="invite-msg-modal">
         <Fragment>
            <div className="invite-friendz">
               <BsChevronLeft onClick={onCross} className="left-arrow" />
               <div className="container">
                  <div className="row flex-column justify-content-center align-items-center">
                     <div className="col-12">
                        <h2>Freunde einfach via Mail einladen</h2>
                        <h4>
                           Gib einfach die Mailadressen deiner Freunde ein:{" "}
                        </h4>
                     </div>
                     <input
                        onChange={(e) => setInviteEmails(e.target.value)}
                        className="input"
                        type="text"
                        placeholder="Email mit Komma trennen bspw. max.mustermann@gmail.com, lisa.musterfrau@gmail.com"
                     ></input>
                     <button
                        className={
                           clicked ? "musingoo-buttoni" : "musingoo-button2"
                        }
                        onClick={onSubmitInvite}
                     >
                        {loading ? (
                           <PulseLoader size={8} color={"white"} />
                        ) : clicked ? (
                           "Hinzugefügt"
                        ) : (
                           "Hinzufügen"
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </Fragment>
      </div>
   );

   return (
      <Fragment>
         <Backdrop showModal={open} hideModal={onClose} />
         {open && modalContents}
      </Fragment>
   );
};
export default MsgModal;
