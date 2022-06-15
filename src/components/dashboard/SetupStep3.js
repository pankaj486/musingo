import React from "react";
import Gmail from "../../assets/images/new/gmail.png";
import Mail from "../../assets/images/new/mail.png";
import Outlook from "../../assets/images/new/outlook.png";
import Arrow from "../../assets/images/new/arrowRe.png";
import { AiOutlinePlus } from "react-icons/ai";


const SetupStep3 = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="py-5 text-center d-flex align-items-center flex-column">
      <h1 className="upload-file__heading">Lade deine Freunde ein</h1>

      <button
        onClick={() => handleClick("next")}
        className="musingoo-button-right"
      >
        <AiOutlinePlus /> Add Friends
      </button>
      <div className="d-flex align-items-center mt-4">
        <img
          className="modal-img"
          src={Gmail}
        />
        <img
          className="modal-img"
          src={Outlook}
        />
        <img
          className="modal-img"
          src={Mail}
        />
        <img
          className="modal-img"
          src={Arrow}
        />
      </div>
    </div>
  );
};

export default SetupStep3;
