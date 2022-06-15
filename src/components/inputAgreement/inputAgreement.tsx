import React, { Fragment, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./inputAgreement.scss";

type DropdownItemType = {
  name: string;
  id: string;
};

export type InputAgreementProps = {
  header?: string;
  text?: string;
  welcomeText?: string;
  buttonText?: string;
  inputField?: boolean;
  inputFieldName: string;
  inputValue?: any;
  inputPlaceholder?: string;
  handleChange?: (
    fieldName: string,
    event: React.MouseEvent | React.ChangeEvent<HTMLInputElement>
  ) => void;
  getDropdownvalue?: any;
  dropdownField?: boolean;
  dropdownItems?: DropdownItemType[];
  returnFunction?: () => void;
};

export const InputAgreement: React.FC<InputAgreementProps> = ({
  header,
  text,
  welcomeText,
  buttonText,
  inputField,
  inputFieldName,
  inputValue,
  inputPlaceholder,
  handleChange,
  dropdownField,
  dropdownItems,
  returnFunction,
  getDropdownvalue,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownValue, setDropdownValue] = useState("");

  const handleDropdownValue = (
    item: DropdownItemType,
    event: React.MouseEvent<HTMLElement, MouseEvent>


  ) => {
    setDropdownValue(item.name);
    // @ts-ignore

    event.target.value = item.id;
    if (handleChange) {
      handleChange(inputFieldName, event);
    }
    getDropdownvalue(inputFieldName, item)

  };

  return (
    <Fragment>
      <h2 className="mx-2 mx-sm-5 px-sm-5 pt-4 mb-4 agHeader">{header}</h2>
      {welcomeText && <p className="mb-0">{welcomeText}</p>}
      <p className="mx-2 mx-sm-5 px-sm-5">{text}</p>
      {inputField && (
        <input
          className="form-control musingoo-input"
          style={{ borderColor: "#5e5e5e" }}
          type="text"
          value={inputValue}
          required
          placeholder={inputPlaceholder}
          onChange={(event) => handleChange?.(inputFieldName, event)}
        />
      )}
      {dropdownField && (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle
            caret
            className="bg-white px-5 text-dark btn-outline-dark"
          >
            {dropdownValue ? dropdownValue : "Select"}
          </DropdownToggle>
          <DropdownMenu>
            {dropdownItems &&
              dropdownItems.map((item, index) => {
                return (
                  <DropdownItem
                    className="mt-2"
                    value={dropdownValue}
                    key={index}
                    onClick={(event) => {
                      handleDropdownValue(item, event);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                );
              })}
          </DropdownMenu>
        </Dropdown>
      )}
      {buttonText && (
        <div className="agButtonContainer">
          <button
            className="agButton btn btn-primary text-white mt-4"
            onClick={returnFunction}
          >
            {buttonText}
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default InputAgreement;
