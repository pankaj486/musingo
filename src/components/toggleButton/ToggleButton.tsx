import React, { useState, useRef } from "react";

import "./ToggleButton.scss";

export type ToggleButtonProps = {
  checked?: boolean;
  handleChange?: (newValue: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  handleChange,
}) => {
  const [_checked, setChecked] = useState(false);
  const checkBox = useRef<HTMLInputElement>(null);
  const handleChecked = () => {
    setChecked((checked) => !checked);
  };
  return (
    <div className="toggle-button">
      <input
        type={"checkbox"}
        id={"toggle-checkbox"}
        checked={checked ? checked : _checked}
        onChange={handleChange ? () => handleChange(!checked) : handleChecked}
        ref={checkBox}
      />
      <label
        className={"toggle-switch"}
        onClick={() => checkBox.current?.click()}
      />
    </div>
  );
};

export default ToggleButton;
