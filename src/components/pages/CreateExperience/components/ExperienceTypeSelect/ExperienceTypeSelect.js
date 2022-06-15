import React from "react";
import ExperienceTypeSelector from "../ExperienceChoice/ExperienceTypeSelector/ExperienceTypeSelector";
import ClassesImage from "../../../../../assets/images/modalBackground.png";
import JobsImage from "../../../../../assets/images/jobs.png";
import InstrumentImage from "../../../../../assets/images/instrument-rental.png";
import ConcertImage from "../../../../../assets/images/concert.png";

import "./ExperienceTypeSelect.scss";

const ExperienceTypeSelect = (props) => {
  console.log("experience type select");
  return (
    <div className="create-experience jobs-experience-type">
      <p className="create-experience--title">Art der Job Experience</p>
      <p className="create-experience--details">
        Ist die Experience für Anfänger oder Fortgeschrittene?
      </p>
      <div className="experience-type">
        <div className="create-experience__type">
          <ExperienceTypeSelector
            className={"type--classes"}
            background={ClassesImage}
            experienceType={1}
            // link={'/createExperience/classes'}
            content={"Gigs"}
            // handleSelection={props.handleSelection}
          />
          <ExperienceTypeSelector
            className={"type--jobs"}
            background={JobsImage}
            experienceType={2}
            // link={'/createExperience/jobs'}
            content={"Produktion"}
            // handleSelection={props.handleSelection}
          />
        </div>
        <div className="create-experience__type">
          <ExperienceTypeSelector
            className={"type--instrument-rental"}
            background={InstrumentImage}
            experienceType={3}
            // link={'/createExperience/instrumentRentals'}
            // content={'Instrumente Verleih'}
            content={"Training Workshop"}
            // handleSelection={props.handleSelection}
          />
          <ExperienceTypeSelector
            className={"type--concerts"}
            background={ConcertImage}
            experienceType={4}
            // link={'/createExperience/concerts'}
            content={"Management"}
            // handleSelection={props.handleSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceTypeSelect;
