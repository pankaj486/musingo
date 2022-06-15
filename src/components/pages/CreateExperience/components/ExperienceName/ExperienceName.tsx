import React from "react";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./ExperienceName.scss";
import { PrivateLessonCreate } from "../../../../../generated/apiFetchers";
import {toastifyErrorMessage} from 'src/components/Toastify/toastify';



type ExperienceName = {
  lessonData: Partial<PrivateLessonCreate>;
  onSubmit: () => void;
  onChange: (newData: Partial<PrivateLessonCreate>) => void;
};

const ExperienceName: React.FC<ExperienceName> = ({
  lessonData,
  onSubmit,
  onChange,
}) => {

  const handleSubmit = () => {
    if (lessonData.title) {
      onSubmit();
    }else{
      toastifyErrorMessage("Please fill this field.")
    }
  };

  return (
    <div className="classes--experience-name">
      <h2 className="mx-2 mx-sm-5 px-sm-5 pt-4 mb-4 agHeader">
        Wie soll deine Experience heißen?
      </h2>
      <p className="mx-2 mx-sm-5 px-sm-5">
        {
          "Versuche den Titel so aussagekräftig wie Möglich zu beschreiben. (max 34 zeichen)"
        }
      </p>

      <input
        className="form-control musingoo-input"
        style={{ borderColor: "#5e5e5e" }}
        type="text"
        value={lessonData.title || ""}
        placeholder='z.B. "Lerne Gitarre in cooler Atmosphäre"'
        onChange={(event) => onChange({ title: event.target?.value || "" })}
      />
      <WeiterCta nextStep={handleSubmit} />
    </div>
  );
};

export default ExperienceName;
