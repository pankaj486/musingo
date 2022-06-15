import React from "react";
import Instructor from "../../assets/images/upload-file.png";
import "./SetupStep.scss";

const SetupStep2 = ({ handleClick, currentStep, steps }) => {
  return (
    <div>
      <div className="my-5 text-center">
        <div className="upload-file">
          <h1 className="upload-file__heading">Lade dein Profilfoto hoch</h1>
          <img
            style={{ width: "160px", height: "auto", cursor: "pointer" }}
            src={Instructor}
            alt=""
          />
        </div>
        <button
          onClick={() => handleClick("next")}
          className="booking-wrapper__inner-btn"
        >
          Jetzt beantworten
        </button>
      </div>
    </div>
  );
};

export default SetupStep2;
