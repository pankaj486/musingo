import React, { useState } from "react";
import {
  Banner,
  PrivateLessonCreate,
} from "../../../../../generated/apiFetchers";
import FormProgressBar from "../../../../formProgressBar/FormProgressBar";
import useWindowResize from "../../../../../custom-hooks/useWindowResize";
import ModeSelect from "../ModeSelect/ModeSelect";
import ExperienceName from "../ExperienceName/ExperienceName";
import { UploadBannerFormContainer } from "../UploadBannerForm/UploadBannerForm.container";
import InputAgreement from "../../../../inputAgreement/inputAgreement";
import { LessonLocationFormContainer } from "../LessonLocation/LessonLocationForm.container";
import LessonWithStudent from "../LessonWithStudent/LessonWithStudent";
import { CalendarContainer } from "../Calendar/Calendar.container";
import { EditTimeSlotsCalendarContainer } from "../EditTimeSlotsCalendar/EditTimeSlotsCalendar.container";
import { InstrumentSelectContainer } from "../InstrumentSelect/InstrumentSelect.container";
import { AgeGroupSelectContainer } from "../AgeGroupSelect/AgeGroupSelect.container";
import { LessonLevelSelectContainer } from "../LessonLevelSelect/LessonLevelSelect.container";
import LessonsPerMonth from "../LessonsPerMonth/LessonsPerMonth";
import YourPrice from "../YourPrice/YourPrice";
import SubscriptionSelect from "../SubscriptionSelect/SubscriptionSelect";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import ExperienceCreate from "../ExperienceCreated/ExperienceCreate";
import ShareExperience from "../ShareExperience/ShareExperience";

export type PrivateLessonFormProps = {
  onSubmit: (data: PrivateLessonCreate) => Promise<void>;
};

enum PrivateLessonSteps {
  SelectMode,
  SetName,
  UploadBannerImage,
  SetDescription,
  SetLocation,
  SetAtHome,
  EditTimeSlots,
  SelectTimeSlots,
  SelectInstrument,
  SelectAgeGroup,
  SelectExperience,
  SetLessonsPerMonth,
  SetPrice,
  EnableSubscriptions,
  AcceptToC,
  Complete,
  Share,
}

export const PrivateLessonForm: React.FC<PrivateLessonFormProps> = ({
  onSubmit,
}) => {
  const { dimensions } = useWindowResize();
  const [showProgressBar] = useState(true);
  const [currentStep, setCurrentStep] = useState(PrivateLessonSteps.SelectMode);

  const [data, setData] = useState<Partial<PrivateLessonCreate>>({
    subscription_types: [],
  });

  console.log("data", data)
  const [banner, setBanner] = useState<Banner>();

  const [units, setUnits] = useState<number>();

  const width = dimensions.width;
  const headers = ["Beschreibung", "Eigenschaften", "Konditionen"];

  const incrementStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleChange = (newData: Partial<PrivateLessonCreate>) => {
    setData({ ...data, ...newData });
  };

  const handleSubmit = async () => {
    await onSubmit(data as PrivateLessonCreate);
    incrementStep();
  };

  return (
    <>
      {showProgressBar && (
        <FormProgressBar
          headers={headers}
          width={width}
          handleProgress={() => null}
          progressPercentage={`${
            (currentStep / PrivateLessonSteps.Complete) * 100
          }%`}
        />
      )}
      {currentStep === PrivateLessonSteps.SelectMode && (
        <ModeSelect
          lessonData={data}
          onChange={handleChange}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.SetName && (
        <ExperienceName
          lessonData={data}
          onSubmit={incrementStep}
          onChange={handleChange}
        />
      )}
      {currentStep === PrivateLessonSteps.UploadBannerImage && (
        <UploadBannerFormContainer
          onSubmit={(newData, newBanner) => {
            handleChange(newData);
            setBanner(newBanner);
            incrementStep();
          }}
        />
      )}
      {currentStep === PrivateLessonSteps.SetDescription && (
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
      {currentStep === PrivateLessonSteps.SetLocation && (
        <LessonLocationFormContainer
          onChange={(data) => handleChange(data)}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.SetAtHome && (
        <LessonWithStudent
          data={data}
          onChange={handleChange}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.EditTimeSlots && (
        <EditTimeSlotsCalendarContainer onSubmit={incrementStep} />
      )}
      {currentStep === PrivateLessonSteps.SelectTimeSlots && (
        <CalendarContainer
          lessonData={data}
          onChange={handleChange}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.SelectInstrument && (
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
      {currentStep === PrivateLessonSteps.SelectAgeGroup && (
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
      {currentStep === PrivateLessonSteps.SelectExperience && (
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
      {currentStep === PrivateLessonSteps.SetLessonsPerMonth && (
        <LessonsPerMonth
          units={units}
          onChange={(value) => setUnits(value)}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.SetPrice && (
        <YourPrice
          formData={data}
          units={units ? units : 1}
          onChange={handleChange}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.EnableSubscriptions && (
        <SubscriptionSelect
          formData={data}
          onChange={handleChange}
          onSubmit={incrementStep}
        />
      )}
      {currentStep === PrivateLessonSteps.AcceptToC && (
        <TermsAndConditions
          formData={data}
          onChange={handleChange}
          onSubmit={incrementStep}
          hasBorder
        />
      )}
      {currentStep === PrivateLessonSteps.Complete && (
        <ExperienceCreate
          formData={data}
          banner={banner as Banner}
          onSubmit={handleSubmit}
        />
      )}
      {currentStep === PrivateLessonSteps.Share && (
        <ShareExperience nextStep={() => null} />
      )}
    </>
  );
};