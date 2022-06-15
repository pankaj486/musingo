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

import "./JobsForm.scss";
import ExperienceCreate from "../ExperienceCreated/ExperienceCreate";
import ShareExperience from "../ShareExperience/ShareExperience";
import LessonWithStudent from "../LessonWithStudent/LessonWithStudent";
import LessonsPerMonth from "../LessonsPerMonth/LessonsPerMonth";
import YourPrice from "../YourPrice/YourPrice";
import ExperienceTypeSelect from "../ExperienceTypeSelect/ExperienceTypeSelect";

const JobsForm = (props) => {
  const { dimensions } = useWindowResize();
  const width = dimensions.width;
  let [progress, setProgress] = useState(1);
  let [formData, setFormData] = useState({
    experienceType: "", // 'beginner' or 'advanced'
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

  const handleInputFieldChange = (inputField, input, event) => {
    // event.persist();
    setFormData((prevState) => {
      return {
        ...prevState,
        [inputField]: input,
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
      case 7:
        return (
          <YourPrice
            nextStep={handleNextStep}
            perUnitPrice={false}
            handleChange={handleChange}
            formData={formData}
            label={"Preis"}
          />
        );
      case 8:
        return (
          <OfferDiscount
            formData={formData}
            nextStep={handleNextStep}
            handleChange={handleDiscountToggle}
          />
        );
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

export default JobsForm;
