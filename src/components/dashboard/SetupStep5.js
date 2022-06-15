import React from "react";
import BookingMobileInput from "../pages/Booking/BookingMobileInput";

const SetupStep5 = ({ handleClick, currentStep, steps }) => {
  return (
    <div>
      {" "}
      <div className="py-5 text-center mx-auto">
        <h1 className="upload-file__heading">Verifiziere deinen Account</h1>
        <div className="my-4 mx-5">
          <BookingMobileInput
            defaultCountry={"DE"}
          />
        </div>
        <button
          onClick={() => handleClick("next")}
          className="booking-wrapper__inner-btn"
        >
          Fertig
        </button>
      </div>
    </div>
  );
};

export default SetupStep5;
