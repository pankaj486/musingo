import React from "react";
import { Button } from "reactstrap";

import { PrivateLessonCreate } from "../../../../../generated/apiFetchers";

import "./ModeSelect.scss";

import ModeOne from "../../../../../assets/images/modeOne.png";
import ModeTwo from "../../../../../assets/images/modeTwo.png";

type ModeSelectProps = {
  lessonData: Partial<PrivateLessonCreate>;
  onSubmit: () => void;
  onChange: (newData: Partial<PrivateLessonCreate>) => void;
};

const ModeSelect: React.FC<ModeSelectProps> = ({
  lessonData,
  onSubmit,
  onChange,
}) => {
  const handleSubmit = () => {
    if (lessonData.online || lessonData.offline) {
      onSubmit();
    }
  };

  return (
    <div className="classes--category-select">
      <h1 className="category-select-title">Wie willst du unterrichten </h1>
      <h1 className="category-select-des">
        <span>Tipp:</span> aktiviere beide, um deine Buchungswahrscheinlichkeit
        zu erhöhen{" "}
      </h1>
      <div className="category-select__categories">
        <span className="checkbox">
          <input
            type="checkbox"
            onChange={() => onChange({ offline: !lessonData.offline })}
            checked={!!lessonData.offline}
          />
          <span className="wrapperCheck" />
          <span
            className="wrapper"
            style={{
              border: lessonData.offline
                ? "1px solid #4ad9ca"
                : "1px solid #bcbcbc",
            }}
            onClick={() => onChange({ offline: !lessonData.offline, online: false })}
          >
            <img src={ModeOne} />
            <span className="category-name">Real Life</span>
            <span className="category-name-des">
              Unterricht findet persönlich statt
            </span>
          </span>
        </span>
        <span className="checkbox">
          <input
            type="checkbox"
            onChange={() => onChange({ online: !lessonData.online })}
            checked={!!lessonData.online}
          />
          <span className="wrapperCheck" />
          <span
            className="wrapper"
            style={{
              border: lessonData.online
                ? "1px solid #4ad9ca"
                : "1px solid #bcbcbc",
            }}
            onClick={() => onChange({ online: !lessonData.online, offline: false })}
          >
            <img src={ModeTwo} />
            <span className="category-name">Video</span>
            <span className="category-name-des">
              Unterricht findet via Video statt
            </span>
          </span>
        </span>
      </div>
      <Button onClick={handleSubmit}>Weiter</Button>
    </div>
  );
};

export default ModeSelect;
