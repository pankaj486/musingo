import React, { useRef } from "react";

import "./SlotModal.scss";

const SlotModalOld = (props) => {
  // const startInputRef = useRef(null)
  // const EndInputRef = useRef(null)
  let content = (
    <div className="slot-modal">
      <p className="slot-modal--title">Slots</p>
      <div className="slot-modal--duration">
        <div className="duration--start-time">
          <span>Start</span>
          <input
            type="text"
            // ref={startInputRef}
            value={props.startTime}
            readOnly={true}
            // onChange={(event) => props.handleStartTimeChange(event.target.value)}
          />
        </div>
        <div className="duration--end-time">
          <span>Ende</span>
          <input
            type="text"
            value={props.endTime}
            readOnly={true}
            // onChange={(event) => props.handleEndTimeChange(event.target.value)}
          />
        </div>
      </div>
      <p className="slot-modal--break-info">Pause zwischen Slots</p>
      <div className="slot-modal--break-duration">
        <input
          placeholder="hh"
          type="text"
          value={props.breakDuration.hour}
          onChange={(event) => props.handleBreakDurationChange(event, "hour")}
        />
        <input
          placeholder="mm"
          type="text"
          value={props.breakDuration.min}
          onChange={(event) => props.handleBreakDurationChange(event, "min")}
        />
      </div>
      <div className="slot-modal--frequency">
        <div className="frequency__weekly">
          <div
            className="weekly--radio"
            onClick={() => props.handleWeeklyFrequencyChange("weekly")}
          >
            <div className={`${props.weeklyFrequency ? "selected" : ""}`}>
              {" "}
            </div>
          </div>
          <span onClick={() => props.handleWeeklyFrequencyChange("weekly")}>
            Wöchentlich
          </span>
        </div>
        <div className="frequency__biweekly">
          <div
            className="biweekly--radio"
            onClick={() => props.handleWeeklyFrequencyChange("biweekly")}
          >
            <div className={`${!props.weeklyFrequency ? "selected" : ""}`}>
              {" "}
            </div>
          </div>
          <span onClick={() => props.handleWeeklyFrequencyChange("biweekly")}>
            Alle zwei Wochen
          </span>
        </div>
      </div>
      <button onClick={props.handleBreakSubmit}>Fertig</button>
    </div>
  );
  return props.showModal ? content : null;
};

export default SlotModal;
