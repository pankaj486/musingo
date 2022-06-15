import React from "react";

import "./weiterCta.scss";

const WeiterCtaOld = (props) => {
  return (
    <div
      className="weiter-cta"
      onClick={props.nextStep}
      style={{ backgroundColor: props.background }}
    >
      <span>{props.ctaText || "Weiter"}</span>
    </div>
  );
};

export default WeiterCtaOld;
