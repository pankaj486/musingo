import React, { useEffect } from "react";
import { useActions } from "src/hooks/use-actions";
import "./SlotModal.scss";
import {
  toastifySuccessMessage,
  toastifyErrorMessage,
} from "src/components/Toastify/toastify";

export type Duration = {
  hour: string;
  min: string;
};

export enum Frequency {
  WEEKLY = 4,
  BIWEEKLY = 2,
}

export type SlotModalProps = {
  showModal: boolean;
  startTime: string;
  endTime: string;
  breakDuration: Duration;
  frequency: Frequency;
  // eventStartTime: string | number;
  onBrakeDurationChange: (newDuration: Duration) => void;
  onFrequencyChange: (newFrequency: Frequency) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const SlotModal: React.FC<SlotModalProps> = ({
  showModal,
  startTime,
  endTime,
  breakDuration,
  frequency,
  // eventStartTime,
  onBrakeDurationChange,
  onFrequencyChange,
  onSubmit,
  onClose,
}) => {
  // console.log("startTime", startTime);

  const { editTimeSlotCalendar } = useActions();

  const handleSubmit = () => {
    if (startTime) {
      onSubmit();
      toastifySuccessMessage("Slots created successfully!");
    } else {
      toastifyErrorMessage("Something Went Wrong. Please Try Again!");
    }
  };

  useEffect(() => {
    editTimeSlotCalendar({
      startTime: startTime,
    });
  }, [startTime]);

  // console.log("startTime",)

  const handleBrakeDurationChange = (newDuration: Partial<Duration>) => {
    onBrakeDurationChange({
      ...breakDuration,
      ...newDuration,
    });
  };

  return showModal ? (
    <div className="slot-modal">
      <p className="slot-modal--title">Slots</p>
      <div className="slot-modal--duration">
        <div className="duration--start-time">
          <span>Start</span>
          <input type="text" value={startTime} readOnly={true} />
        </div>
        <div className="duration--end-time">
          <span>Ende</span>
          <input type="text" value={endTime} readOnly={true} />
        </div>
      </div>
      <p className="slot-modal--break-info">Pause zwischen Slots</p>
      <div className="slot-modal--break-duration">
        <input
          placeholder="hh"
          type="text"
          value={breakDuration.hour}
          onChange={(event) =>
            handleBrakeDurationChange({
              hour: !event.target.value ? "0" : event.target.value,
            })
          }
        />
        <input
          placeholder="mm"
          type="text"
          value={breakDuration.min}
          onChange={(event) => {
            console.log(event.target.value);
            handleBrakeDurationChange({
              min: !event.target.value ? "0" : event.target.value,
            });
          }}
        />
      </div>
      <div className="slot-modal--frequency">
        <div className="frequency__weekly">
          <div
            className="weekly--radio"
            onClick={() => onFrequencyChange(Frequency.WEEKLY)}
          >
            <div
              className={`${frequency === Frequency.WEEKLY ? "selected" : ""}`}
            >
              {" "}
            </div>
          </div>
          <span onClick={() => onFrequencyChange(Frequency.WEEKLY)}>
            Wöchentlich
          </span>
        </div>
        <div className="frequency__biweekly">
          <div
            className="biweekly--radio"
            onClick={() => onFrequencyChange(Frequency.BIWEEKLY)}
          >
            <div
              className={`${
                frequency === Frequency.BIWEEKLY ? "selected" : ""
              }`}
            >
              {" "}
            </div>
          </div>
          <span onClick={() => onFrequencyChange(Frequency.BIWEEKLY)}>
            Alle zwei Wochen
          </span>
        </div>
      </div>
      <button onClick={() => handleSubmit()}>Fertig</button>
      <button style={{ backgroundColor: "grey" }} onClick={onClose}>
        Cancel
      </button>
    </div>
  ) : null;
};

export default SlotModal;
