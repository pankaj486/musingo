import React, { ChangeEvent, useState } from "react";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./YourPrice.scss";
import { PrivateLessonCreate } from "../../../../../generated/apiFetchers";

export type YourPrice = {
  units: number;
  title?: string;
  label?: string;
  formData: Partial<PrivateLessonCreate>;
  onChange: (newValue: Partial<PrivateLessonCreate>) => void;
  onSubmit: () => void;
};

const YourPrice: React.FC<YourPrice> = ({
  units,
  title,
  label,
  formData,
  onChange,
  onSubmit,
}) => {
  const [monthlyPrice, setMonthlyPrice] = useState<number>();

  const handleChangeMonthlyPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(event.target.value);

    setMonthlyPrice(amount);
    onChange({
      base_unit_amount: Math.round((amount / 4) * 100) / 100,
    });
  };

  const handleChangeBaseUnitAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const amount = Math.round(Number(event.target.value) * 100) / 100;

    setMonthlyPrice(amount * units);
    onChange({
      base_unit_amount: amount,
    });
  };

  return (
    <div className="your-price">
      <h1 className="your-price__header">{title || "Dein Preis"}</h1>
      <p className="your-price__details">
        Wähle deinen Preis bedacht aus. Damit du passende Anfragen und zufridene
        Schüler <br />
        erhältst, wähle einen Preis, der zum Umfang deiner Unterrichts
        Experience und <br />
        insbesondere deines Professionsgrades passt.
      </p>
      <div className="your-price__input-container">
        <div className="price--empty-element" />
        <input
          className="price--input"
          onChange={handleChangeMonthlyPrice}
          value={monthlyPrice}
        />
        <div className="price--label-container">
          <span className="price--currency">€</span>
          <span className="price--label">{label || "Preis pro Monat"}</span>
        </div>
      </div>
      {formData.base_unit_amount && (
        <div className="your-price__input-container">
          <div className="price--empty-element" />
          <input
            className="price--input"
            onChange={handleChangeBaseUnitAmount}
            value={`${((monthlyPrice || 0) / units).toFixed(2)}`}
          />
          <div className="price--label-container">
            <span className="price--currency">€</span>
            <span className="price--label">
              Pro Einheit/Monat <br />
              (bei {units} Einheiten pro Monat)
            </span>
          </div>
        </div>
      )}
      <WeiterCta nextStep={onSubmit} disabled={!formData.base_unit_amount} />
    </div>
  );
};

export default YourPrice;