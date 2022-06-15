import React from "react";
import ToggleDiscountOffer from "../../../../toggleDiscountOffer/ToggleDiscountOffer";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./OfferDiscount.scss";

const OfferDiscount = (props) => {
  return (
    <div className="offer-discount">
      <h1 className="offer-discount-header">
        Damit deine Experience ins Rollen kommt
      </h1>
      <p>
        Biete einen Discount für deine ersten 3 Kunden an, um deine <br />
        Buchungswahrscheinlichkeit zu erhöhen. So bekommst du möglichst schnell
        deine <br />
        ersten Buchungen und deine Experience kommt ins Rollen.
      </p>
      <div className="toggle-offer">
        <ToggleDiscountOffer
          offerDiscount={props.formData.offerTwentyPercentDiscount}
          handleChange={props.handleChange}
        />
        <span>20% Rabatt aktiviert</span>
      </div>
      <WeiterCta
        ctaText={"Überspringen"}
        nextStep={() => props.nextStep(false)}
      />
    </div>
  );
};

export default OfferDiscount;
