import React, { useRef } from "react";
import { FaCheck } from "react-icons/all";
import ToggleButton from "../../../../toggleButton/ToggleButton";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./LessonWithStudent.scss";
import { PrivateLessonCreate } from "../../../../../generated/apiFetchers";


export type LessonWithStudentProps = {
  data: Partial<PrivateLessonCreate>;
  onChange: (newData: Partial<PrivateLessonCreate>) => void;
  onSubmit: () => void;
};

const LessonWithStudent: React.FC<LessonWithStudentProps> = ({
  data,
  onChange,
  onSubmit,
}) => {
  const check = useRef(null);

  const handleChange = (at_home: boolean) => {
    onChange({
      at_home: at_home,
    });
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="with-student">
      <h1 className="with-student__header">Unterricht beim Schüler möglich?</h1>
      <p className="with-student__details">
        Dies kann die Buchungswarscheinlichkeit sowie Zufriedenheit deiner
        Schüler stark erhöhen.
      </p>
      <div className="with-student__toggle">
        <input
          type={"checkbox"}
          checked={data.at_home || false}
          ref={check}
          onChange={() => handleChange(!data.at_home)}
        />
        <div
          className="with-student__toggle--checkbox"
          onClick={() => handleChange(!data.at_home)}
        >
          {data.at_home ? <FaCheck /> : null}
        </div>
        <span
          className="with-student__toggle--text"
          onClick={() => handleChange(!data.at_home)}
        >
          Unterricht beim Schüler möglich{" "}
          <span id="toggle-text__bold">(empfohlen)</span>
        </span>
      </div>
      {null && (
        <div className="with-student__travel-bonus">
          <div className="with-student__travel-bonus-toggle-section">
            <div className="with-student__travel-bonus-toggle">
              <ToggleButton handleChange={() => null} checked={true} />
            </div>
            <span>Bonus für Anfahrt</span>
          </div>
          <div className="with-student__travel-bonus-amount-section">
            <input
              className="with-student__travel-bonus-input"
              onChange={(event) => null}
            />
            <div className="with-student__travel-bonus-input-label">
              <span className="with-student__travel-bonus-input-currency">
                €{" "}
              </span>
              <span>pro Einheit</span>
            </div>
          </div>
        </div>
      )}
      <WeiterCta nextStep={handleSubmit} />
    </div>
  );
};

export default LessonWithStudent;
