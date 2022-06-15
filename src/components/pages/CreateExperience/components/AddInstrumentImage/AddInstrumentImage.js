import React, { useRef, Fragment } from "react";

import { GoPlus } from "react-icons/go";

import BackgroundImage from "../../../../../assets/images/experience-bg.png";
import StudioImage from "../../../../../assets/images/studio.jpg";

import WeiterCta from "../../../../weiterCta/weiterCta";

import "./AddInstrumentImage.scss";

const AddInstrumentImage = (props) => {
  const fileInputRef = useRef(null);
  console.log("formdata: ", props.formData);
  return (
    <div className="add-instrument-image">
      <h1 className="add-instrument-image-header">
        Füge Fotos des Instrumentes hinzu
      </h1>
      <p>
        Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und auch
        die Belichtung des <br />
        Fotos stimmig ist. Schaue dir dazu auch andere Experiences an. Beispiele
        findest du
        <span className="find-tips" onClick={props.handleImageTips}>
          {" "}
          hier
        </span>
      </p>
      <div className="instrument-images mb-2">
        <div
          className="add-new-image"
          onClick={() => fileInputRef.current.click()}
        >
          {props.formData.instrumentImage.length ? (
            <img
              height="150px"
              width="260px"
              className="instrument-image-item"
              src={props.formData.instrumentImage[0]}
              alt={"instrument"}
            />
          ) : (
            <Fragment>
              <input
                type="file"
                name="file"
                ref={fileInputRef}
                onChange={(event) =>
                  props.handleFileUpload(event, "instrumentImage")
                }
              />
              <GoPlus />
            </Fragment>
          )}
        </div>
        <div>
          <img
            height="150px"
            width="260px"
            className="instrument-image-item"
            src={BackgroundImage}
            alt={"instrument"}
          />
        </div>
        <div>
          <img
            height="150px"
            width="260px"
            className="instrument-image-item"
            src={StudioImage}
            alt={"instrument"}
          />
        </div>
      </div>
      <WeiterCta
        nextStep={
          props.formData.instrumentImage.length ? props.nextStep : () => {}
        }
        background={
          !props.formData.instrumentImage.length ? "rgb(214, 213, 213)" : ""
        }
      />
    </div>
  );
};

export default AddInstrumentImage;
