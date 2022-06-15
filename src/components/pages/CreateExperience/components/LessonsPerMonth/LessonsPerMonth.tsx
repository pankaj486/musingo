import React, { ChangeEvent } from "react";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./LessonsPerMonth.scss";

export type LessonsPerMonthProps = {
  units: number | undefined;
  onChange: (newData: number | undefined) => void;
  onSubmit: () => void;
};

const LessonsPerMonth: React.FC<LessonsPerMonthProps> = ({
  units,
  onChange,
  onSubmit,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value);

    onChange(isNaN(parsedValue) ? undefined : parsedValue);
  };

  return (
    <div className="lessons-per-month">
      <h1 className="lessons-per-month__header">
        Unterrichtseinheiten pro Monat
      </h1>
      <p className="lessons-per-month__details">
        Gib an, wie viele Unterrichtsstunden (je 45 Minuten) du pro Monat mit
        einem Kurs <br />
        dieser Experience geben möchtest.
      </p>
      <div className="lessons-per-month__input-container">
        <div className="lesson-input-container__empty-element" />
        <input
          className="lesson-input-container__input"
          value={units || ''}
          onChange={handleChange}
        />
        <span className="lesson-input-container__input-label">
          Einheiten pro Monat
        </span>
      </div>
      <WeiterCta nextStep={onSubmit} disabled={!units} />
    </div>
  );
};

export default LessonsPerMonth;
