import React, { useState } from "react";
import FormProgressBar from "../../../../formProgressBar/FormProgressBar";
import useWindowResize from "../../../../../custom-hooks/useWindowResize";
import ExperienceName from "../ExperienceName/ExperienceName";
import InputAgreement from "../../../../inputAgreement/inputAgreement";
import { GroupsContainer } from "../Groups/GroupsContainer";

import {
  Banner,
  GroupLessonCreate,
} from "../../../../../generated/apiFetchers";
import { InstrumentSelectContainer } from "../InstrumentSelect/InstrumentSelect.container";
import { AgeGroupSelectContainer } from "../AgeGroupSelect/AgeGroupSelect.container";
import { LessonLevelSelectContainer } from "../LessonLevelSelect/LessonLevelSelect.container";
import { UploadBannerFormContainer } from "../UploadBannerForm/UploadBannerForm.container";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import ExperienceCreate from "../ExperienceCreated/ExperienceCreate";
import ShareExperience from "../ShareExperience/ShareExperience";

export type GroupLessonFormProps = {
  onSubmit: (data: GroupLessonCreate) => Promise<void>;
};

enum GroupLessonSteps {
  SetName,
  SetDescription,
  Groups,
  UploadBannerImage,
  SelectInstrument,
  SelectAgeGroup,
  SelectExperience,
  AcceptToC,
  Complete,
  Share,
}

export const GroupLessonForm: React.FC<GroupLessonFormProps> = ({
  onSubmit,
}) => {
  const {
    dimensions: { width },
  } = useWindowResize();

  const [currentStep, setCurrentStep] = useState<GroupLessonSteps>(
    GroupLessonSteps.SetName
  );
  const [banner, setBanner] = useState<Banner>();

  const [showProgressBar] = useState(true);

  const [data, setData] = useState<Partial<GroupLessonCreate>>({});
  const headers = ["Beschreibung", "Eigenschaften", "Konditionen"];

  const handleChange = (newData: Partial<GroupLessonCreate>) => {
    setData({ ...data, ...newData });
  };

  const handleSubmit = async () => {
    await onSubmit(data as GroupLessonCreate);
    incrementStep();
  };

  const incrementStep = () => {
    if (currentStep !== GroupLessonSteps.Share) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      {showProgressBar && (
        <FormProgressBar
          headers={headers}
          width={width}
          handleProgress={() => null}
          progressPercentage={`${
            (currentStep / GroupLessonSteps.Complete) * 100
          }%`}
        />
      )}
      {currentStep === GroupLessonSteps.SetName && (
        <ExperienceName
          lessonData={data}
          onSubmit={incrementStep}
          onChange={handleChange}
        />
      )}

      {currentStep === GroupLessonSteps.SetDescription && (
        <div
          className="classes--experience-name mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <InputAgreement
            header={"Beschreibe deine Experience"}
            text={`Beschreibe, was deine Unterrichts Experience besonders ausmacht, was dein Unterrichtskonzept ist, deine Motivation und was man als Schüler erleben und lernen wird.`}
            inputField={true}
            inputValue={data.description || ""}
            inputFieldName={"motivation"}
            handleChange={(_, event) => {
              // TODO: Fix handleChange
              //@ts-ignore
              handleChange({ description: event.target.value });
            }}
            buttonText={"Weiter"}
            returnFunction={incrementStep}
          />
        </div>
      )}
      {currentStep === GroupLessonSteps.Groups && (
        <GroupsContainer
          lessonData={data}
          onSubmit={incrementStep}
          onChange={handleChange}
        />
      )}
      {currentStep === GroupLessonSteps.UploadBannerImage && (
        <UploadBannerFormContainer
          onSubmit={(newData, newBanner) => {
            handleChange(newData);
            setBanner(newBanner);
            incrementStep();
          }}
        />
      )}
      {currentStep === GroupLessonSteps.SelectInstrument && (
        <InstrumentSelectContainer
          currentInstrument={data.instrument}
          onChange={(value) =>
            handleChange({
              instrument: value,
            })
          }
          onSubmit={incrementStep}
        />
      )}
      {currentStep === GroupLessonSteps.SelectAgeGroup && (
        <AgeGroupSelectContainer
          currentAgeGroup={data.age_group}
          onChange={(value) =>
            handleChange({
              age_group: value,
            })
          }
          onSubmit={incrementStep}
        />
      )}
      {currentStep === GroupLessonSteps.SelectExperience && (
        <LessonLevelSelectContainer
          currentLessonLevel={data.lesson_level}
          onChange={(value) =>
            handleChange({
              lesson_level: value,
            })
          }
          onSubmit={incrementStep}
        />
      )}
      {currentStep === GroupLessonSteps.AcceptToC && (
        <TermsAndConditions
          formData={data}
          onChange={handleChange}
          onSubmit={incrementStep}
          hasBorder
        />
      )}

      {currentStep === GroupLessonSteps.Complete && (
        <ExperienceCreate
          formData={data}
          banner={banner as Banner}
          onSubmit={handleSubmit}
        />
      )}

      {currentStep === GroupLessonSteps.Share && (
        <ShareExperience nextStep={() => null} />
      )}
    </>
  );
};
