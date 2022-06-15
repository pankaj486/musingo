import React, { useState } from "react";

import useWindowResize from "../../../../../custom-hooks/useWindowResize";
import FormProgressBar from "../../../../formProgressBar/FormProgressBar";
import CategorySelect from "../CategorySelect/CategorySelect";
import ExperienceName from "../ExperienceName/ExperienceName";
import AddCoverImage from "../AddCoverImage/AddCoverImage";

import UploadedCoverImage from "../UploadedCoverImage/UploadedCoverImage";
import AddInstrumentImage from "../AddInstrumentImage/AddInstrumentImage";
import InputAgreement from "../../../../inputAgreement/inputAgreement";
import VideoUpload from "../../../../videoUpload/videoUpload";
import LessonLocation from "../LessonLocation/LessonLocationForm";
import SubscriptionSelect from "../SubscriptionSelect/SubscriptionSelect";
import Calendar from "../Calendar/Calendar";

import OfferDiscount from "../OfferDiscount/OfferDiscount";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";

import "./InstrumentsForm.scss";
import ExperienceCreate from "../ExperienceCreated/ExperienceCreate";
import ShareExperience from "../ShareExperience/ShareExperience";
import LessonWithStudent from "../LessonWithStudent/LessonWithStudent";
import LessonsPerMonth from "../LessonsPerMonth/LessonsPerMonth";
import YourPrice from "../YourPrice/YourPrice";

const InstrumentsForm = (props) => {
  const { dimensions } = useWindowResize();
  const width = dimensions.width;
  let [progress, setProgress] = useState(1);
  let [formData, setFormData] = useState({
    experienceName: "",
    image: [],
    instrumentImage: [],
    offerTwentyPercentDiscount: false,
    acceptTermsAndConditions: false,
    lessonWithStudentPossible: false,
    bonusForTravel: false,
    bonusForTravelAmount: "",
    lessonsPerMonth: "",
    yourPrice: "",
  });
  let [showProgressBar, setShowProgressBar] = useState(true);
  let steps = 11;

  const headers = ["Beschreibung", "Eigenschaften", "Konditionen"];
  let [showCoverImageTips, setShowCoverImageTips] = useState(false);

  const handleCoverImageTips = () => {
    handleShowProgressBar();
    setShowCoverImageTips((prevState) => !prevState);
  };

  const handleProgress = (value) => {
    setProgress(value);
  };

  const handleShowProgressBar = () => {
    setShowProgressBar((prevState) => !prevState);
  };

  const handleNextStep = () => {
    setProgress((prevState) => prevState + 1);
  };

  const handlePrevStep = () => {
    setProgress((prevState) => prevState - 1);
  };

  const handleInputFieldChange = (inputField, event) => {
    event.persist();
    setFormData((prevState) => {
      return {
        ...prevState,
        [inputField]: event.target.value,
      };
    });
  };

  const handleChange = (inputField, input) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [inputField]: input,
      };
    });
  };

  const handleDiscountToggle = (input) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        offerTwentyPercentDiscount: input,
      };
    });
    // handleNextStep()
  };

  const handleFileUpload = (event, input) => {
    event.persist();
    let blobURL = URL.createObjectURL(event.target.files[0]);
    setFormData((prevState) => {
      return {
        ...prevState,
        [input]: [blobURL],
      };
    });
    if (input !== "instrumentImage") {
      handleNextStep();
    }
  };

  const handleTemplateUpload = (image) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        image: [image],
      };
    });
    handleNextStep();
    !showProgressBar && handleShowProgressBar();
  };

  const renderSteps = () => {
    switch (progress) {
      case 1:
        return (
          <ExperienceName
            nextStep={handleNextStep}
            handleChange={handleInputFieldChange}
            formData={formData}
          />
        );
      case 2:
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
      case 3:
        return (
          <UploadedCoverImage
            prevStep={handlePrevStep}
            nextStep={handleNextStep}
            formData={formData}
            showImageTips={showCoverImageTips}
            handleImageTips={handleCoverImageTips}
          />
        );
      case 4:
        return (
          <AddInstrumentImage
            nextStep={handleNextStep}
            formData={formData}
            showImageTips={showCoverImageTips}
            handleImageTips={handleCoverImageTips}
            handleFileUpload={handleFileUpload}
          />
        );
      case 5:
        return (
          <div
            className="classes--experience-name mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <InputAgreement
              header={"Beschreibe deine Experience"}
              text={`Beschreibe, was deine Unterrichts Experience besonders ausmacht, was dein Unterrichtskonzept ist, deine Motivation und was man als Schüler erleben und lernen wird.`}
              inputField={true}
              inputValue={formData.motivation}
              inputFieldName={"motivation"}
              handleChange={handleChange}
              buttonText={"Weiter"}
              returnFunction={handleNextStep}
            />
          </div>
        );
      // Nicher Ei tinta tui refactor koris. ami apatoto die rakhlam evabe
      case 6:
        return (
          <YourPrice
            nextStep={handleNextStep}
            perUnitPrice={false}
            handleChange={handleChange}
            formData={formData}
            label={"pro Monat"}
          />
        );
      case 7:
        return <SubscriptionSelect nextStep={handleNextStep} />;
      case 8:
        return (
          <OfferDiscount
            formData={formData}
            nextStep={handleNextStep}
            handleChange={handleDiscountToggle}
          />
        );
      // case 9:
      //   return (
      //     <Calendar
      //       nextStep={handleNextStep}
      //     />
      //   )
      case 9:
        return (
          <TermsAndConditions
            acceptTermsAndConditions={formData.acceptTermsAndConditions}
            nextStep={handleNextStep}
            handleChange={handleChange}
            handleShowProgressBar={handleShowProgressBar}
            hasBorder={true}
          />
        );
      case 10:
        return <ExperienceCreate nextStep={handleNextStep} />;
      case 11:
        return <ShareExperience nextStep={handleNextStep} />;
      // case 12:
      //   return formData.category === 'group' ? (
      //     <TermsAndConditions
      //       acceptTermsAndConditions={formData.acceptTermsAndConditions}
      //       nextStep={handleNextStep}
      //       handleChange={handleChange}
      //       handleShowProgressBar={handleShowProgressBar}
      //     />
      //   )  : (
      //     <div className='classes--experience-name mx-auto' style={{ maxWidth: '700px' }}>
      //       <InputAgreement
      //         header={'Erfahrung der Schüler'}
      //         text={`Ist die Experience für Anfänger oder Fortgeschrittene?`}
      //         dropdownField={true}
      //         buttonText={'Weiter'}
      //         dropdownItems={['Auswählen']}
      //         returnFunction={handleNextStep}
      //       />
      //     </div>
      //   )
      // case 13:
      //   return formData.category === 'group' ? (
      //     <ExperienceCreate
      //       nextStep={handleNextStep}
      //     />
      //   ) : (
      //     <LessonsPerMonth
      //       formData={formData}
      //       nextStep={handleNextStep}
      //       handleChange={handleChange}
      //     />
      //   )
      // case 14:
      //   return formData.category === 'group' ? (
      //     <ShareExperience
      //       nextStep={handleNextStep}
      //     />
      //   ) : (
      //     <YourPrice
      //       nextStep={handleNextStep}
      //       perUnitPrice={true}
      //       handleChange={handleChange}
      //       formData={formData}
      //     />
      //   )
      // case 15:
      //   return formData.category === 'single' ? (
      //     <SubscriptionSelect
      //       nextStep={handleNextStep}
      //     />
      //   ) : null
      // case 16:
      //   return formData.category === 'single' ? (
      //     <OfferDiscount
      //       formData={formData}
      //       nextStep={handleNextStep}
      //       handleChange={handleDiscountToggle}
      //     />
      //   ) : null
      // case 17:
      //   return formData.category === 'single' ? (
      //     <TermsAndConditions
      //       acceptTermsAndConditions={formData.acceptTermsAndConditions}
      //       nextStep={handleNextStep}
      //       handleChange={handleChange}
      //       handleShowProgressBar={handleShowProgressBar}
      //       hasBorder={true}
      //     />
      //   ) : null
      // case 18:
      //   return formData.category === 'single' ? (
      //     <ExperienceCreate
      //       nextStep={handleNextStep}
      //     />
      //   ) : null
      // case 19:
      //   return formData.category === 'single' ? (
      //     <ShareExperience
      //       nextStep={handleNextStep}
      //     />
      //   ) : null
    }
  };
  return (
    <div className="classes-form">
      {showProgressBar && (
        <FormProgressBar
          headers={headers}
          width={width}
          progress={progress}
          handleProgress={handleProgress}
          progressPercentage={`${(100 / steps) * progress}%`}
        />
      )}
      {renderSteps()}
    </div>
  );
};

export default InstrumentsForm;
