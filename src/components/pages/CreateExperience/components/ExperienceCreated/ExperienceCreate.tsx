import React from "react";
import Instructor from "../../../../../assets/images/instructor.png";

import "./ExperienceCreate.scss";
import {
  Banner,
  PrivateLessonCreate,
} from "../../../../../generated/apiFetchers";

export type ExperienceCreateProps = {
  formData: Partial<PrivateLessonCreate>;
  banner: Banner;
  onSubmit: () => void;
};

const ExperienceCreate: React.FC<ExperienceCreateProps> = ({
  formData,
  banner,
  onSubmit,
}) => {
  return (
    <div className="success experience-created">
      <h1 className="success__msg">
        Congrats, Deine <br /> Experience ist fertig!
      </h1>
      <div
        className="success__summary"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        <img className="summary__img" src={Instructor} alt={"summary-image"} />
        <p className="summary__title">{formData.title}</p>
        <p className="summary__rate">
          <span>ab </span>
          <span className="rate__price">{formData.base_unit_amount}€</span>
        </p>
      </div>
      <div className="success__post-online-cta" onClick={() => onSubmit()}>
        <span>Jetzt online stellen</span>
      </div>
    </div>
  );
};

export default ExperienceCreate;