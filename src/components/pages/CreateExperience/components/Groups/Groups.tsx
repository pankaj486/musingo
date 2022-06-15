import React, { Fragment, useState } from "react";

import {
  GroupLessonCreate,
  GroupLessonGroupCreate,
  PrivateLocation,
  SubscriptionIntervalsEnum,
  TimeSlot,
} from "../../../../../generated/apiFetchers";

import "./Groups.scss";
import WeiterCta from "../../../../weiterCta/weiterCta";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { FormControlLabel, Switch } from "@material-ui/core";

export type GroupsProps = {
  locations: PrivateLocation[];
  timeSlots: TimeSlot[];
  lessonData: Partial<GroupLessonCreate>;
  onChange: (newValue: Partial<GroupLessonCreate>) => void;
  onSubmit: () => void;
};

const weekdayNames = {
  0: "Sonntag",
  1: "Montag",
  2: "Dienstag",
  3: "Mittwoch",
  4: "Donnerstag",
  5: "Freitag",
  6: "Samstag",
};

const periodNames = {
  2: "Zwei-Wöchentlich",
  4: "Wöchentlich",
};

const Groups: React.FC<GroupsProps> = ({
  locations,
  timeSlots,
  lessonData,
  onChange,
  onSubmit,
}) => {
  const emptyGroup: Partial<GroupLessonGroupCreate> = {
    subscription_types: [],
    for_kids: false,
    online: false,
    offline: true,
  };

  const [currentGroup, setCurrentGroup] = useState<
    Partial<GroupLessonGroupCreate>
  >({
    ...emptyGroup,
  });
  const [selectedGroup] = useState<number>();

  const [locationOpen, setLocationOpen] = useState(false);
  const [timeSlotWeekdayOpen, setTimeSlotWeekdayOpen] = useState(false);
  const [timeSlotTimeOpen, setTimeSlotTimeOpen] = useState(false);
  const [timeSlotPeriodicityOpen, setTimeSlotPeriodicityOpen] = useState(false);

  const [currentWeekday, setCurrentWeekday] = useState<number>();

  const groups = lessonData.groups || [];

  const validGroup = !!(
    currentGroup.title &&
    currentGroup.period &&
    currentGroup.time_slot &&
    currentGroup.location &&
    currentGroup.n_students_max &&
    currentGroup.base_unit_amount
  );

  const availableWeekDays: number[] = [
    ...new Set(timeSlots.map((slot) => new Date(slot.start_date).getDay())),
  ].sort();

  const availableTimeSlots: TimeSlot[] | undefined =
    currentWeekday !== undefined
      ? timeSlots.filter(
          (slot) => new Date(slot.start_date).getDay() === currentWeekday
        )
      : undefined;

  const availablePeriodicity: (2 | 4)[] | undefined = currentGroup.time_slot
    ? timeSlots.find((slot) => slot.uid === currentGroup.time_slot)?.period == 2
      ? [2]
      : [2, 4]
    : undefined;

  const handleSubmit = () => {
    if (groups.length > 0) {
      onSubmit();
    }
  };

  const handleUpdateAmount = (amount: number) => {
    setCurrentGroup({
      ...currentGroup,
      base_unit_amount: Math.round(amount * 100),
    });
  };

  const handleAddGroup = () => {
    if (!validGroup) return;

    if (selectedGroup !== undefined) {
      const newGroups = [...groups];
      newGroups[selectedGroup] = { ...currentGroup } as GroupLessonGroupCreate;
      onChange({
        groups: newGroups,
      });
    } else {
      const newGroups = [
        ...groups,
        { ...currentGroup } as GroupLessonGroupCreate,
      ];
      onChange({
        groups: newGroups,
      });
    }
    setCurrentWeekday(undefined);
    setCurrentGroup({ ...emptyGroup });
  };

  const handleGroupChange = (newValue: Partial<GroupLessonGroupCreate>) => {
    setCurrentGroup({
      ...currentGroup,
      ...newValue,
    });
  };

  const handleSelectWeekday = (weekday: number) => {
    if (weekday !== currentWeekday) {
      setCurrentWeekday(weekday);
      handleGroupChange({
        time_slot: undefined,
        period: undefined,
      });
    }
  };

  const handleSelectTimeSlot = (slot: TimeSlot) => {
    if (slot.uid !== currentGroup.time_slot) {
      handleGroupChange({
        time_slot: slot.uid,
        period: undefined,
      });
    }
  };

  const handleSelectPeriod = (period: 2 | 4) => {
    handleGroupChange({
      period: period,
    });
  };

  const handleToggleSubscriptionType = (type: SubscriptionIntervalsEnum) => {
    const subscriptionTypes = currentGroup?.subscription_types || [];

    if (subscriptionTypes?.includes(type)) {
      handleGroupChange({
        subscription_types: subscriptionTypes.filter((_type) => type != _type),
      });
    } else {
      handleGroupChange({
        subscription_types: [...subscriptionTypes, type],
      });
    }
  };

  return (
    <Fragment>
      <div>
        <div className="classes-form-groups">
          <div className="add-groups-section">
            <div className="add-group">
              <div className="">
                <div className="set-name--input-container">
                  <input
                    type="text"
                    placeholder="Title"
                    value={currentGroup.title || ""}
                    onChange={(event) =>
                      handleGroupChange({
                        title: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="add-group--input-container">
                  <input
                    type="number"
                    value={
                      currentGroup.base_unit_amount !== undefined
                        ? currentGroup.base_unit_amount / 100
                        : ""
                    }
                    placeholder="Price"
                    onChange={(event) =>
                      !isNaN(Number(event.target.value)) &&
                      handleUpdateAmount(Number(event.target.value))
                    }
                  />
                  <span>€</span>
                </div>
                <label>Pro Schüler und Stunde</label>
              </div>

              <Button
                className="add-group-cta"
                disabled={!validGroup}
                onClick={() => handleAddGroup()}
              >
                Add group
              </Button>
            </div>
            <div className="add-group__empty-element">
              <div></div>
            </div>
            <div className="add-group__members-per-group">
              <div className="members-per-group--input-container">
                <input
                  type="number"
                  placeholder="Min"
                  value={currentGroup.n_students_min || ""}
                  onChange={(event) =>
                    handleGroupChange({
                      n_students_min: Math.round(Number(event.target.value)),
                    })
                  }
                />
                <label>Minimum Number of Members</label>
              </div>
              <div className="members-per-group--input-container">
                <input
                  type="number"
                  placeholder="Max"
                  value={currentGroup.n_students_max || ""}
                  onChange={(event) =>
                    handleGroupChange({
                      n_students_max: Math.round(Number(event.target.value)),
                    })
                  }
                />
                <label>Maximum Number of Members</label>
              </div>

              <div className="members-per-group--input-container">
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!currentGroup.online}
                      onChange={(event) =>
                        handleGroupChange({
                          online: event.target.checked,
                          offline: !event.target.checked,
                        })
                      }
                    />
                  }
                  label="Online"
                />
              </div>
              <div className="members-per-group--input-container">
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!currentGroup.for_kids}
                      onChange={(event) =>
                        handleGroupChange({
                          for_kids: event.target.checked,
                        })
                      }
                    />
                  }
                  label="For Kids"
                />
              </div>

              <div className="location--dropdown-container">
                <ButtonGroup>
                  {([3, 6, 12] as SubscriptionIntervalsEnum[]).map((value) => (
                    <Button
                      active={currentGroup?.subscription_types?.includes(value)}
                      onClick={() => handleToggleSubscriptionType(value)}
                      key={value}
                    >
                      Alle {value} Monate
                    </Button>
                  ))}
                </ButtonGroup>
                <p>
                  <label>Subscription Types</label>
                </p>
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
                    {currentGroup.location
                      ? locations.find(
                          (loc) => loc.uid === currentGroup.location
                        )?.address
                      : "Location Auswählen"}
                  </DropdownToggle>
                  <DropdownMenu>
                    {locations.map((item, index) => {
                      return (
                        <DropdownItem
                          className="mt-2"
                          value={item.uid}
                          key={index}
                          onClick={() =>
                            handleGroupChange({ location: item.uid })
                          }
                        >
                          {item.name} - {item.address}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="appointment-time-container">
                <label>Terminzeit</label>
                <Dropdown
                  isOpen={timeSlotWeekdayOpen}
                  toggle={() => {
                    setTimeSlotWeekdayOpen((prevState) => !prevState);
                  }}
                >
                  <DropdownToggle
                    caret
                    className="bg-white px-5 text-dark btn-outline-dark"
                  >
                    {currentWeekday !== undefined
                      ? weekdayNames[currentWeekday]
                      : "Wochentag"}
                  </DropdownToggle>
                  <DropdownMenu>
                    {availableWeekDays.map((weekDay) => (
                      <DropdownItem
                        key={weekDay}
                        onClick={() => handleSelectWeekday(weekDay)}
                      >
                        {weekdayNames[weekDay]}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                {availableTimeSlots && (
                  <Dropdown
                    isOpen={timeSlotTimeOpen}
                    toggle={() => {
                      setTimeSlotTimeOpen((prevState) => !prevState);
                    }}
                  >
                    <DropdownToggle
                      caret
                      className="bg-white px-5 text-dark btn-outline-dark"
                    >
                      {currentGroup.time_slot
                        ? timeSlots.find(
                            (slot) => slot.uid !== currentGroup.time_slot
                          )?.start_time
                        : "Uhrzeit"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {availableTimeSlots.map((slot, index) => (
                        <DropdownItem
                          key={index}
                          onClick={() => handleSelectTimeSlot(slot)}
                        >
                          {slot.start_time}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )}
                {availablePeriodicity && (
                  <Dropdown
                    isOpen={timeSlotPeriodicityOpen}
                    toggle={() => {
                      setTimeSlotPeriodicityOpen((prevState) => !prevState);
                    }}
                  >
                    <DropdownToggle
                      caret
                      className="bg-white px-5 text-dark btn-outline-dark"
                    >
                      {currentGroup.period !== undefined
                        ? periodNames[currentGroup.period]
                        : "Wie häufig?"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {availablePeriodicity.map((period) => (
                        <DropdownItem
                          key={period}
                          onClick={() => handleSelectPeriod(period)}
                        >
                          {periodNames[period]}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>
          <div className="view-group-section">
            <p>
              <span>Gruppen</span>
            </p>
            <div className="group-elements">
              {groups?.map((group, index) => {
                return (
                  <div className="added-group" key={index}>
                    <span className="group-title">{group.title}</span>
                    <span className="group-members">{`${
                      group.base_unit_amount / 100
                    }€ pro Student`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={"classes-form-groups-weiter-cta-contaner"}>
        <WeiterCta nextStep={() => handleSubmit()} />
      </div>
    </Fragment>
  );
};

export default Groups;
