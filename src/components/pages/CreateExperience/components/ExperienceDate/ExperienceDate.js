import React from "react";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./ExperienceDate.scss";

const ExperienceDate = (props) => {
  return (
    <div className="concerts--experience-date">
      <h1 className="experience-date__header">Datum der Experience</h1>
      <p className="experience-date__details">
        Wann beginnt deine Konzert Experience?
      </p>
      <div className="experience-date__datum">
        <div className="datum">
          <span>Datum</span>
          <div className="datum__date-container">
            <input className="date--day" type="number" placeholder={"TT"} />
            <input className="date--month" type="number" placeholder={"MM"} />
            <input className="date--year" type="number" placeholder={"YY"} />
          </div>
        </div>
        <div className="start-end-date-container">
          <div className="start-date">
            <span>Beginn</span>
            <div className="start-date-input-container start-time">
              <input
                className="start-time__hour"
                type="number"
                placeholder={"TT"}
              />
              <div className="time-seperator">:</div>
              <input
                className="start-time__minute"
                type="number"
                placeholder={"MM"}
              />
            </div>
          </div>
          <div className="date-empty-element">
            <span></span>
            <div>-</div>
          </div>
          <div className="end-date">
            <span>Beginn</span>
            <div className="end-date-input-container end-time">
              <input
                className="end-time__hour"
                type="number"
                placeholder={"HH"}
              />
              <div className="time-seperator">:</div>
              <input
                className="end-time__minute"
                type="number"
                placeholder={"MM"}
              />
            </div>
          </div>
        </div>
      </div>
      <WeiterCta nextStep={props.nextStep} />
    </div>
  );
};

export default ExperienceDate;
