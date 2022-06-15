import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {
  GroupLessonGroupCreate,
  PrivateLocation,
} from "../../../../../../generated/apiFetchers";

export type GroupFormProps = {
  groupData: GroupLessonGroupCreate;
  onChange: (newData: GroupLessonGroupCreate) => void;
  onSubmit: () => void;
  locations: PrivateLocation[];
};

export const GroupForm: React.FC<GroupFormProps> = ({
  groupData,
  onChange,
  onSubmit,
  locations,
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleChange = (updateValue: Partial<GroupLessonGroupCreate>) => {
    onChange({
      ...groupData,
      ...updateValue,
    });
  };

  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <div className="add-groups-section">
      <div className="add-group">
        <div className="">
          <div className="add-group--input-container">
            <input type="number" />
          </div>
          <label>
            Unterrichtseinheiten pro Monat
            <br />
            (a 45 Minuten)
          </label>
        </div>
        <div className="">
          <div className="add-group--input-container">
            <input type="number" />
            <span>€</span>
          </div>
          <label>Verdienst pro Monat</label>
        </div>
        <div className="">
          <div className="add-group--input-container">
            <input type="number" />
            <span>€</span>
          </div>
          <label>Pro Schüler und Monat</label>
        </div>
        <div className="">
          <div className="add-group--input-container">
            <input type="number" />
            <span>€</span>
          </div>
          <label>Pro Einheit und Schüler</label>
        </div>
        <div className="add-group-cta" onClick={handleSubmit}>
          <span>Add group</span>
        </div>
      </div>
      <div className="add-group__empty-element">
        <div></div>
      </div>
      <div className="add-group__members-per-group">
        <div className="members-per-group--input-container">
          <input type="number" />
          <label>
            Mitglieder pro <br />
            Gruppe
          </label>
        </div>
        <div className="location--dropdown-container">
          <label>Location</label>
          <Dropdown
            isOpen={locationOpen}
            toggle={() => {
              setLocationOpen((prevState) => !prevState);
            }}
          >
            <DropdownToggle
              caret
              className="bg-white px-5 text-dark btn-outline-dark"
            >
              {location ? location : "Auswählen"}
            </DropdownToggle>
            <DropdownMenu>
              {locations.map((item, index) => {
                return (
                  <DropdownItem
                    className="mt-2"
                    value={location}
                    key={index}
                    onClick={() => handleChange({})}
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="appointment-time-container">
          <label>Terminzeit</label>
          <div>
            <input
              placeholder={"Wochentag"}
              className={"appointment-weekday"}
            />
            <span> </span>
            <input placeholder={"HH"} className={"appointment-hour"} />
            <span>:</span>
            <input placeholder={"MM"} className={"appointment-minute"} />
          </div>
        </div>
      </div>
    </div>
  );
};
