import React from "react";

import ExperienceTypeSelector from "./ExperienceTypeSelector/ExperienceTypeSelector";

import { ExperienceType } from "../../models/ExperienceType";
import "./ExperienceChoice.scss";

import ClassesImage from "../../../../../assets/images/modalBackground.png";
import JobsImage from "../../../../../assets/images/jobs.png";
import InstrumentImage from "../../../../../assets/images/instrument-rental.png";
import ConcertImage from "../../../../../assets/images/concert.png";

export type ExperienceChoiceProps = {
  onSelect: (type: ExperienceType) => void;
};

const ExperienceChoice: React.FC<ExperienceChoiceProps> = ({ onSelect }) => {
  return (
    <div className="create-experience">
      <p className="create-experience--title">
        Welche Art Experience möchtest du <br /> erstellen?
      </p>
      <div className="experience-type">
        <div className="create-experience__type">
          <ExperienceTypeSelector
            className={"type--classes"}
            background={ClassesImage}
            onSelect={() => onSelect(ExperienceType.Lesson)}
          >
            Unterricht
          </ExperienceTypeSelector>
          <ExperienceTypeSelector
            className={"type--jobs"}
            background={JobsImage}
            onSelect={() => onSelect(ExperienceType.Job)}
          >
            Jobs
          </ExperienceTypeSelector>
        </div>
        <div className="create-experience__type">
          <ExperienceTypeSelector
            className={"type--instrument-rental"}
            background={InstrumentImage}
            onSelect={() => onSelect(ExperienceType.Instrument)}
          >
            Instrumente
          </ExperienceTypeSelector>
          <ExperienceTypeSelector
            className={"type--concerts"}
            background={ConcertImage}
            onSelect={() => onSelect(ExperienceType.Concert)}
          >
            Konzerte
          </ExperienceTypeSelector>
        </div>
      </div>
    </div>
  );
};

export default ExperienceChoice;
