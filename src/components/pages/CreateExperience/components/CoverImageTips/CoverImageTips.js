import React, { Fragment, useState } from "react";

import Sun from "../../../../../assets/images/sun.png";
import Land from "../../../../../assets/images/land.png";
import Party from "../../../../../assets/images/party.png";

import "./CoverImageTips.scss";

const CoverImageTips = (props) => {
  let imageTipsContent = (
    <div className="image-tips">
      <span className="image-tips-close" onClick={props.handleImageTips}>
        X
      </span>
      <p className="image-tips-header">Tipps Eigenschaften zum Cover Fotos</p>
      <p className="image-tips-description">
        Das Cover Foto is sehr wichtig für die Sichtbarkeit deiner Experience.
        Versuche ein Bild bedacht auszuwählen, dass zu deiner Experience passt
        und die Menschen anspricht. Wenn du noch unerfahren mit Fotos machen
        bist, wähle am besten eine unserer Vorlagen aus. Ein eigenes Foto jedoch
        ermöglicht es dir dich von allen anderen Experiences aus abzuheben. Wenn
        die Qualität und der Inhalt zu deiner Experience passt empfehlen wir ein
        eigenes Foto hochzuladen. Hier einige Tipps.
      </p>
      <div className="image-tips--main-points">
        <div className="main-points__exposure">
          <img
            className="main-points__exposure-image"
            src={Sun}
            alt={"exposure"}
          />
          <h3>Belichtung</h3>
          <p>
            Versuche dein Foto bestmöglich auszuleuchten. Nur mit guter
            Ausleuchtung kann man Details darstellen
          </p>
        </div>
        <div className="main-points__motive">
          <img
            className="main-points__motive-image"
            src={Land}
            alt={"motive"}
          />
          <h3>Motiv</h3>
          <p>
            Versuche wenige Elemente wie 2 Personen, die Gitarre spielen
            abzubilden und mittig als Motiv zu zentrieren.
          </p>
        </div>
        <div className="main-points__content">
          <img
            className="main-points__content-image"
            src={Party}
            alt={"content"}
          />
          <h3>Inhalt</h3>
          <p>
            Schaue dir das Motiv genau an. Was soll gezeigt werden und was
            erkennt man auch deutlich vom weitem?
          </p>
        </div>
      </div>
    </div>
  );
  return <Fragment>{imageTipsContent}</Fragment>;
};

export default CoverImageTips;
