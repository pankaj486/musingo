import React from "react";
import ToggleButton from "../../../../../toggleButton/ToggleButton";

import "./SubscriptionInfo.scss";

export type SubscriptionInfoProps = {
  months: number;
  discount: number;
  checked: boolean;
  onChange: (newValue: boolean) => void;
};

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  months,
  discount,
  checked,
  onChange,
}) => {
  return (
    <div className="subscription-info mx-1">
      <div className={"subscription"}>
        <ToggleButton
          checked={checked}
          handleChange={(value) => onChange(value)}
        />
        <div className={"subscription-details"}>
          <div className={"subscription-period"}>
            <span>{months}</span>
            <span>Monate</span>
          </div>
          <div className={"subscription-discount"}>
            <span>- {discount}%</span>
            <span>Rabatt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
