import React, { useState } from "react";
import CategorySelect, {
  LessonCategory,
} from "../CategorySelect/CategorySelect";

import "./ClassesForm.scss";
import { PrivateLessonFormContainer } from "../PrivateLessonForm/PrivateLessonForm.container";
import { GroupLessonFormContainer } from "../GroupLessonForm/GroupLessonFormContainer";

const ClassesForm: React.FC = () => {
  const [category, setCategory] = useState<LessonCategory>();

  /*
  const renderSteps = () => {
    switch (step) {
      case CreateClassesSteps.ModeSelect:
        return (
          <ModeSelect
            onSubmit={() => setStep(CreateClassesSteps.CategorySelect)}
            onChange={(newData) => setData({ ...data, ...newData })}
            lessonData={data}
          />
        );
      case CreateClassesSteps.CategorySelect:
        return (
          <CategorySelect
            nextStep={handleNextStep}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 3:
        return (
          <ExperienceName
            nextStep={handleNextStep}
            handleChange={handleInputFieldChange}
            formData={formData}
          />
        );
      case 4:
        return (
          <AddCoverImage
            nextStep={handleNextStep}
            handleShowProgressBar={handleShowProgressBar}
            showProgressBar={showProgressBar}
            handleFileUpload={handleFileUpload}
            handleTemplateUpload={handleTemplateUpload}
            formData={formData}
            showImageTips={showCoverImageTips}
            handleImageTips={handleCoverImageTips}
          />
        );
      case 5:
        return (
          <UploadedCoverImage
            prevStep={handlePrevStep}
            nextStep={handleNextStep}
            formData={formData}
            showImageTips={showCoverImageTips}
            handleImageTips={handleCoverImageTips}
          />
        );
      case 6:
        return (
          <AddInstrumentImage
            nextStep={handleNextStep}
            formData={formData}
            showImageTips={showCoverImageTips}
            handleImageTips={handleCoverImageTips}
            handleFileUpload={handleFileUpload}
          />
        );
      // Nicher Ei tinta tui refactor koris. ami apatoto die rakhlam evabe
      case 7:
        return (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <InputAgreement
              header={"Beschreibe deine Experience"}
              text={`Beschreibe, was deine Unterrichts Experience besonders ausmacht, was dein Unterrichtskonzept ist, deine Motivation und was man als Schüler erleben und lernen wird.`}
              inputField={true}
              inputText={formData.motivation}
              inputFieldName={"motivation"}
              handleChange={handleInputFieldChange}
              buttonText={"Weiter"}
              returnFunction={handleNextStep}
            />
          </div>
        );
      case 8:
        return (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <VideoUpload
              header={"Vorstellung via Video (optional)"}
              text={`Lade ein video von 5 Minuten hoch. Beschreibe hierbei deine Person als Musiker/in und so dass deine Schüler einen guten persönlichen Eindruck von dir erhalten. Halte dich generell, denn dieses Video wird auch auf deinem Profil angezeigt.`}
              returnFunction={handleNextStep}
            />
          </div>
        );
      case 9:
        return formData.category === "group" ? (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <InputAgreement
              header={"Welches Instrument"}
              text={`Welche Instrumente möchtest du unterrichten?`}
              dropdownField={true}
              buttonText={"Weiter"}
              dropdownItems={instruments}
              inputText={formData.instrument}
              inputFieldName={"instrument"}
              handleChange={handleInputFieldChange}
              returnFunction={handleNextStep}
            />
          </div>
        ) : (
          <LessonLocationForm
            formData={formData}
            handleChange={handleInputFieldChange}
            nextStep={handleNextStep}
          />
        );
      // case 9:
      //   return (
      //     <Calendar
      //       nextStep={handleNextStep}
      //     />
      //   )
      case 10:
        return formData.category === "group" ? (
          <LessonLocationForm formData={formData} nextStep={handleNextStep} />
        ) : (
          <LessonWithStudent
            nextStep={handleNextStep}
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 11:
        return formData.category === "group" ? (
          <Calendar nextStep={handleNextStep} classesForm={true} />
        ) : (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <InputAgreement
              header={"Welches Instrument"}
              text={`Welche Instrumente möchtest du unterrichten?`}
              dropdownField={true}
              buttonText={"Weiter"}
              dropdownItems={instruments}
              inputText={formData.instrument}
              inputFieldName={"instrument"}
              handleChange={handleInputFieldChange}
              returnFunction={handleNextStep}
            />
          </div>
        );
      case 12:
        return formData.category === "group" ? (
          <Groups
            nextStep={handleNextStep}
            formData={formData}
            handleChange={handleChange}
          />
        ) : (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <InputAgreement
              header={"Altersgruppe"}
              text={`Welche Instrumente möchtest du unterrichten?`}
              dropdownField={true}
              buttonText={"Weiter"}
              dropdownItems={ageGroups}
              inputText={formData.age_group}
              handleChange={handleInputFieldChange}
              returnFunction={handleNextStep}
            />
          </div>
        );
      case 13:
        return formData.category === "group" ? (
          <SubscriptionSelect nextStep={handleNextStep} />
        ) : (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <InputAgreement
              header={"Erfahrung der Schüler"}
              text={`Ist die Experience für Anfänger oder Fortgeschrittene?`}
              dropdownField={true}
              buttonText={"Weiter"}
              dropdownItems={lessonLevels}
              inputText={formData.lessonLevels}
              handleChange={handleInputFieldChange}
              returnFunction={handleNextStep}
            />
          </div>
        );
      case 14:
        return formData.category === "group" ? (
          <OfferDiscount
            formData={formData}
            nextStep={handleNextStep}
            handleChange={handleDiscountToggle}
          />
        ) : (
          <LessonsPerMonth
            formData={formData}
            nextStep={handleNextStep}
            handleChange={handleChange}
          />
        );
      case 15:
        return formData.category === "group" ? (
          <TermsAndConditions
            acceptTermsAndConditions={formData.acceptTermsAndConditions}
            nextStep={handleNextStep}
            handleChange={handleChange}
            handleShowProgressBar={handleShowProgressBar}
          />
        ) : (
          <YourPrice
            nextStep={handleNextStep}
            perUnitPrice={true}
            handleChange={handleChange}
            formData={formData}
          />
        );
      case 16:
        return formData.category === "group" ? (
          <ExperienceCreate nextStep={handleNextStep} />
        ) : (
          <SubscriptionSelect nextStep={handleNextStep} />
        );
      case 17:
        return formData.category === "group" ? (
          <ShareExperience nextStep={handleNextStep} />
        ) : (
          <OfferDiscount
            formData={formData}
            nextStep={handleNextStep}
            handleChange={handleDiscountToggle}
          />
        );
      case 18:
        return formData.category === "single" ? (
          <TermsAndConditions
            acceptTermsAndConditions={formData.acceptTermsAndConditions}
            nextStep={submitData}
            handleChange={handleChange}
            handleShowProgressBar={handleShowProgressBar}
            hasBorder={true}
          />
        ) : null;
      case 19:
        return formData.category === "single" ? (
          <ExperienceCreate nextStep={handleNextStep} />
        ) : null;
      case 20:
        return formData.category === "single" ? (
          <ShareExperience nextStep={handleNextStep} />
        ) : null;
    }


  };*/

  return (
    <div className="classes-form">
      {category === undefined ? (
        <CategorySelect onSubmit={(category) => setCategory(category)} />
      ) : (
        <>
          {category === LessonCategory.SingleLesson && (
            <PrivateLessonFormContainer />
          )}
          {category === LessonCategory.GroupLesson && (
            <GroupLessonFormContainer />
          )}
        </>
      )}
    </div>
  );
};

export default ClassesForm;
