import React, { Fragment } from "react";
import CoverImageTips from "../CoverImageTips/CoverImageTips";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./UploadedCoverImage.scss";

const UploadedCoverImage = (props) => {
  return (
    <div className="uploaded-image">
      {!props.showImageTips ? (
        <Fragment>
          <p className="uploaded-image__header">Lade ein Cover Bild hoch</p>
          <p>
            Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und
            auch die Belichtung des <br />
            Fotos stimmig ist. Schaue dir dazu auch andere Experiences an.
            Beispiele findest du
            <span className="find-tips" onClick={props.handleImageTips}>
              {" "}
              hier
            </span>
          </p>
          <div className="uploaded-image__upload">
            <img src={props.formData.image[0]} alt={"uploaded-image"} />
          </div>
          <p className="add-another-image" onClick={props.prevStep}>
            Anderes Foto hochladen
          </p>
          <WeiterCta nextStep={props.nextStep} />
        </Fragment>
      ) : (
        <CoverImageTips handleImageTips={props.handleImageTips} />
      )}
    </div>
  );
};

export default UploadedCoverImage;
