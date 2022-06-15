import React from "react";

import {
  PrivateLessonCreate,
  SubscriptionIntervalsEnum,
} from "../../../../../generated/apiFetchers";
import SubscriptionInfo from "./SubscriptionInfo/SubscriptionInfo";
import WeiterCta from "../../../../weiterCta/weiterCta";

import "./Subscriptions.scss";

export type SubscriptionSelectProps = {
  formData: Partial<PrivateLessonCreate>;
  onChange: (newValue: Partial<PrivateLessonCreate>) => void;
  onSubmit: () => void;
};

const SubscriptionSelect: React.FC<SubscriptionSelectProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  const handleChange = (
    newValue: boolean,
    period: SubscriptionIntervalsEnum
  ) => {
    if (newValue) {
      onChange({
        subscription_types: Array.from(
          new Set(formData.subscription_types || []).add(period)
        ),
      });
    } else {
      const set = new Set(formData.subscription_types || []);
      set.delete(period);

      onChange({
        subscription_types: Array.from(set),
      });
    }
  };

  return (
    <div className="subscriptions">
      <h1 className="subscription--header">Abonnements aktivieren</h1>
      <p className="subscription--description">
        Wenn du Abonnements freischaltest, gibst du Schülern die optionale
        Möglichkeit, deinen <br />
        Unterricht für einen Zeitraum ermäßigt zu buchen und somit dir die
        Möglichkeit, Schüler <br />
        für die Zeit des Abonnements sicher gebucht zu haben.{" "}
        <span className="recommended">(empfohlen)</span>
      </p>
      <div className={"subscribe-to"}>
        <SubscriptionInfo
          months={3}
          discount={10}
          checked={
            formData.subscription_types
              ? formData.subscription_types.some((value) => value === 3)
              : false
          }
          onChange={(newValue) => handleChange(newValue, 3)}
        />
        <SubscriptionInfo
          months={6}
          discount={20}
          checked={
            formData.subscription_types
              ? formData.subscription_types.some((value) => value === 6)
              : false
          }
          onChange={(newValue) => handleChange(newValue, 6)}
        />
        <SubscriptionInfo
          months={12}
          discount={30}
          checked={
            formData.subscription_types
              ? formData.subscription_types.some((value) => value === 12)
              : false
          }
          onChange={(newValue) => handleChange(newValue, 12)}
        />
      </div>
      <WeiterCta nextStep={onSubmit} />
    </div>
  );
};

export default SubscriptionSelect;
