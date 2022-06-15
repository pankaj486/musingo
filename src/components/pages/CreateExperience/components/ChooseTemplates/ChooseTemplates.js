import React, { Fragment, useState } from "react";

import TemplateCategory from "./TemplateCategory/TemplateCategory";
import WeiterCta from "../../../../weiterCta/weiterCta";

import BackgroundImage from "../../../../../assets/images/background.jpg";
import ConcertImage from "../../../../../assets/images/bookingBackgroundMobile.png";
import ExperienceImage from "../../../../../assets/images/experience-bg.png";
import ModalImage from "../../../../../assets/images/modalBackground.png";
import StudioImage from "../../../../../assets/images/studio.jpg";
import HeadphoneImage from "../../../../../assets/images/headphone.jpg";

import "./ChooseTemplates.scss";

const ChooseTemplates = (props) => {
  const [templateCategories, setTemplateCategories] = useState([
    {
      id: 1,
      title: "Lessons",
      show: true,
      images: [
        ExperienceImage,
        ConcertImage,
        BackgroundImage,
        HeadphoneImage,
        StudioImage,
        ModalImage,
      ],
    },
    {
      id: 2,
      title: "Instruments",
      show: false,
      images: [
        ConcertImage,
        HeadphoneImage,
        ModalImage,
        StudioImage,
        BackgroundImage,
        ExperienceImage,
      ],
    },
    {
      id: 3,
      title: "Jobs",
      show: false,
      images: [
        ModalImage,
        ConcertImage,
        StudioImage,
        HeadphoneImage,
        ExperienceImage,
        BackgroundImage,
      ],
    },
    {
      id: 4,
      title: "Concerts",
      show: false,
      images: [
        ConcertImage,
        StudioImage,
        ExperienceImage,
        ModalImage,
        HeadphoneImage,
        BackgroundImage,
      ],
    },
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const handleSelectedTemplate = (image) => {
    setSelectedTemplate(image);
  };
  const handleTemplateCategoryChange = (id) => {
    let updatedTemplateCategories = [...templateCategories];
    let prevActiveIndex = updatedTemplateCategories.findIndex(
      (category) => category.show
    );
    if (updatedTemplateCategories[prevActiveIndex].id === id) {
      return;
    }
    let newActiveIndex = updatedTemplateCategories.findIndex(
      (category) => category.id === id
    );
    updatedTemplateCategories[prevActiveIndex].show = false;
    updatedTemplateCategories[newActiveIndex].show = true;
    setTemplateCategories([...updatedTemplateCategories]);
    setSelectedTemplate("");
  };
  let activeTemplateCategory = templateCategories.find(
    (templateCategory) => templateCategory.show
  );
  let chooseTemplatesContent = (
    <div className="templates">
      <span className="templates-close" onClick={props.handleShowTemplates}>
        X
      </span>
      <p className="choose-our-templates-header">Wähle aus unseren Templates</p>
      <div className="template-categories">
        <div
          className={`template-category lessons ${
            activeTemplateCategory.id === 1 ? "active" : ""
          }`}
          onClick={() => handleTemplateCategoryChange(1)}
        >
          <span>Lessons</span>
        </div>
        <div
          className={`template-category instruments ${
            activeTemplateCategory.id === 2 ? "active" : ""
          }`}
          onClick={() => handleTemplateCategoryChange(2)}
        >
          <span>Instruments</span>
        </div>
        <div
          className={`template-category jobs ${
            activeTemplateCategory.id === 3 ? "active" : ""
          }`}
          onClick={() => handleTemplateCategoryChange(3)}
        >
          <span>Jobs</span>
        </div>
        <div
          className={`template-category concerts ${
            activeTemplateCategory.id === 4 ? "active" : ""
          }`}
          onClick={() => handleTemplateCategoryChange(4)}
        >
          <span>Concerts</span>
        </div>
      </div>
      <TemplateCategory
        {...activeTemplateCategory}
        selectedTemplate={selectedTemplate}
        handleSelectedTemplate={handleSelectedTemplate}
      />
      <WeiterCta
        nextStep={() => props.handleTemplateUpload(selectedTemplate)}
      />
    </div>
  );
  return <Fragment>{props.showTemplates && chooseTemplatesContent}</Fragment>;
};

export default ChooseTemplates;
