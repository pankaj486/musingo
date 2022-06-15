import React from "react";
import icon from '../../assets/icons/logo.ico';


const SetupStep6 = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="mx-auto">
      {" "}
      <div className="py-5 text-center">
        <h1 className="upload-file__heading"><img height='auto' width='30' src={icon} alt="alternate"/> Hol dir die Mobile App</h1>
        <p className="des mx-auto">Komm in den Feed! Erstelle Posts, Stories und vieles mehr und verbinde dich mit allen anderen Musiker in der weltweit.</p>
        <button
          onClick={() => handleClick("next")}
          className="booking-wrapper__inner-btn"
        >
          Erledigt
        </button>
      </div>

    </div>
  );
};

export default SetupStep6;
