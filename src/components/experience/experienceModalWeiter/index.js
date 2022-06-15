import React from "react";
import ExperienceTypeSelector from "src/components/pages/CreateExperience/components/ExperienceChoice/ExperienceTypeSelector/ExperienceTypeSelector";

import ClassesImage from "src/assets/images/modalBackground.png";
import JobsImage from "src/assets/images/jobs.png";
import InstrumentImage from "src/assets/images/instrument-rental.png";
import ConcertImage from "src/assets/images/concert.png";

import "src/components/pages/CreateExperience/components/ExperienceChoice/ExperienceChoice.tsx";
import "./style.scss";

const ExperienceModalWeiter = ({
  handleSelection,
  title,
  description,
  onClickSubmitBtn,
  onClickClose,
  submitBtnText,
  closeBtnText,
}) => {
  return (
    <div className="create-experience">
      {title && <p className="create-experience--title">{title}</p>}
      {description && (
        <p className="create-experience--description">{description}</p>
      )}
      <div className="experience-type">
        <div className="create-experience__type">
          <ExperienceTypeSelector
            className={"type--classes"}
            background={ClassesImage}
            experienceType={1}
            link={"/createExperience/classes"}
            content={"Unterricht"}
            handleSelection={handleSelection}
          />
          <ExperienceTypeSelector
            className={"type--jobs"}
            background={JobsImage}
            experienceType={2}
            link={"/createExperience/jobs"}
            content={"Jobs"}
            handleSelection={handleSelection}
          />
        </div>
        <div className="create-experience__type">
          <ExperienceTypeSelector
            className={"type--instrument-rental"}
            background={InstrumentImage}
            experienceType={3}
            link={"/createExperience/instruments"}
            // content={'Instrumente Verleih'}
            content={"Instrumente"}
            handleSelection={handleSelection}
          />
          <ExperienceTypeSelector
            className={"type--concerts"}
            background={ConcertImage}
            experienceType={4}
            link={"/createExperience/concerts"}
            content={"Konzerte"}
            handleSelection={handleSelection}
          />
        </div>
      </div>
      <div className="experienceModalSlotFooter mt-2">
        <button
          className="btn btn-primary experienceModalSlotFooterBtn"
          onClick={onClickSubmitBtn}
        >
          {submitBtnText}
        </button>
        <p onClick={onClickClose} className={"startExperiencModalWeiterClose"}>
          {closeBtnText}
        </p>
      </div>
    </div>
  );
};
export default ExperienceModalWeiter;
