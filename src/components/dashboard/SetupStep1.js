import React from "react";
import ParticipantImageCard from "../chat/Conversations/Conversation/ParticipantImageCard/ParticipantImageCard";
import Instructor from "../../assets/images/instructor.png";
const SetupStep1 = ({ handleClick, currentStep, steps }) => {
  return (
    <div>
      <h2 className="booking-wrapper__inner--sub-heading text-center">
        Du hast{" "}
        <span className="booking-wrapper__inner--sub-span">
          4 neue Buchungsanfragen
        </span>{" "}
      </h2>
      <div className="text-center d-flex flex-column align-items-center flex-2 p-5 mr-1">
        <div className="d-flex">
          <div
            className={`booking-request`}
            style={{ width: "320px", height: "82px" }}
          >
            <div className="booking-request__side-content">
              <ParticipantImageCard
                image={Instructor}
                backgroundHeight={"82px"}
              />
            </div>
            <div className="booking-request__main-content">
              <div> </div>
              <div
                className="booking-request__instructor-details"
                style={{ paddingTop: "27px" }}
              >
                <img
                  className="booking-requests__instructor-image"
                  style={{ width: "40px", height: "40px" }}
                  src={Instructor}
                  alt={"props.title"}
                />
                <span className="booking-requests__instructor-name">Felix</span>
                <span className="booking-requests__price">152€</span>
              </div>
              <div className="booking-request__expires-in mb-2 ml-2">
                <span>Läuft ab in 2:15 h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 text-center">
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

export default SetupStep1;
