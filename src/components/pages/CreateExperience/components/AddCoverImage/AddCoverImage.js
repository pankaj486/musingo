import React, { useRef, useState, Fragment } from "react";

import ChooseTemplates from "../ChooseTemplates/ChooseTemplates";
import CoverImageTips from "../CoverImageTips/CoverImageTips";

import TemplateUploadImg from "../../../../../assets/images/template.png";
import UploadImg from "../../../../../assets/images/upload-2.png";

import "./AddCoverImage.scss";

const AddCoverImage = (props) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const fileInputRef = useRef(null);
  const handleShowTemplates = () => {
    setShowTemplates((prevState) => !prevState);
    props.handleShowProgressBar();
  };
  return (
    <div className="add-cover-image-container">
      {props.showImageTips ? (
        <CoverImageTips handleImageTips={props.handleImageTips} />
      ) : !showTemplates ? (
        <Fragment>
          <h1 className="add-cover-image-title">Cover Bild erstellen</h1>
          <p className="add-cover-image-description">
            Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und
            auch die Belichtung des
            <br />
            Fotos stimmig ist. Schaue dir dazu auch andere Experiences an. Tipps
            findest du
            <span className="find-tips" onClick={props.handleImageTips}>
              {" "}
              hier
            </span>
          </p>
          <div className="upload-buttons">
            <div className="upload-image">
              <div
                className="buttons__image-container"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  style={{ display: "none" }}
                  onChange={(event) => props.handleFileUpload(event, "image")}
                />
                <img src={UploadImg} alt={"upload"} />
              </div>
              <span>Bild hochladen</span>
            </div>
            <div className="use-template" onClick={handleShowTemplates}>
              <div className="buttons__image-container">
                <img src={TemplateUploadImg} alt={"template"} />
              </div>
              <span>Template nutzen</span>
            </div>
          </div>
        </Fragment>
      ) : (
        <ChooseTemplates
          nextStep={props.nextStep}
          formData={props.formData}
          handleTemplateUpload={props.handleTemplateUpload}
          showTemplates={showTemplates}
          handleShowTemplates={handleShowTemplates}
        />
      )}
    </div>
  );
};

export default AddCoverImage;
