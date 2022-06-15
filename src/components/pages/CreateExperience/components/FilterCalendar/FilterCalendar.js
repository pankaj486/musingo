import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  createEventId,
  getEventId,
  getCommonEventIndicator,
  BOOKED_EVENTS,
} from "../../../../../utils/calendarUtils";
// import Moment from 'react-moment'

import SlotModal from "../Calendar/SlotModal/SlotModal";
import WeiterCta from "../../../../weiterCta/weiterCta";
import FormProgressBar from "../../../../formProgressBar/FormProgressBar";
import useWindowResize from "../../../../../custom-hooks/useWindowResize";
import "../Calendar/Calendar.scss";
import "./FilterCalendar.scss";

const FilterCalendar = (props) => {
  const calendarRef = useRef(null);
  const location = useLocation();
  const cancelEventButtonRef = useRef(null);
  const weekendsVisible = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [breakDuration, setBreakDuration] = useState({
    hour: "",
    min: "",
  });
  const [eventSelectInfo, setEventSelectInfo] = useState(null);
  const [weeklyFrequency, setWeeklyFrequency] = useState(true);
  const [singleClick, setSingleClick] = useState(false);
  const { dimensions } = useWindowResize();
  const width = dimensions.width;
  const handleWeeklyFrequencyChange = (frequency) => {
    if (frequency === "weekly") {
      setWeeklyFrequency(true);
    } else {
      setWeeklyFrequency(false);
    }
  };
  const [updatedEventIndicator, setUpdatedEventIndicator] = useState(null);
  const handleShowModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const handleDateSelect = (selectInfo) => {
    let overlap = currentEvents.some((event) => {
      return (
        moment(selectInfo.startStr).isBetween(
          moment(event.startStr),
          moment(event.endStr)
        ) ||
        moment(selectInfo.endStr).isBetween(
          moment(event.startStr),
          moment(event.endStr)
        ) ||
        moment(event.startStr).isBetween(
          moment(selectInfo.startStr),
          moment(selectInfo.endStr)
        ) ||
        moment(event.endStr).isBetween(
          moment(selectInfo.startStr),
          moment(selectInfo.endStr)
        )
      );
    });
    // let doesEventLastTwoDays = (moment(selectInfo.endStr).diff(moment(selectInfo.startStr), 'days'))
    let doesEventLastTwoDays =
      Number(moment(selectInfo.endStr).day()) !==
      Number(moment(selectInfo.startStr).day());
    console.log("end day: ", Number(moment(selectInfo.endStr).day()));
    console.log("start day: ", Number(moment(selectInfo.startStr).day()));
    if (overlap || doesEventLastTwoDays) {
      let id = createEventId();
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      calendarApi.addEvent({
        dragScroll: false,
        id,
        start: moment(selectInfo.startStr).format(),
        end: moment(selectInfo.endStr).format(),
        // allDay: eventSelectInfo.allDay,
        editable: false,
        drop: false,
        droppable: false,
        disableDragging: true,
        eventStartEditable: false,
        nextDayThreshold: "00:00:00",
        className: ["break-event"],
        extendedProps: {
          overlap,
          twoDaysEvent: !!doesEventLastTwoDays,
        },
      });
      return;
    }
    setEventSelectInfo(selectInfo);

    let eventEndsAt = moment(selectInfo.endStr).format();
    let minDiff = moment(selectInfo.endStr).diff(
      moment(selectInfo.startStr),
      "minutes"
    );
    let timeFactor = 45;
    if (minDiff < timeFactor) {
      eventEndsAt = moment(selectInfo.startStr).add(45, "minutes").format();
    } else {
      eventEndsAt = moment(selectInfo.endStr)
        .subtract(minDiff % timeFactor, "minutes")
        .format();
    }
    let indicator = getCommonEventIndicator();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    calendarApi.addEvent({
      id: createEventId(),
      title: "",
      start: selectInfo.startStr,
      end: eventEndsAt,
      editable: true,
      eventStartEditable: true,
      eventResizableFromStart: true,
      nextDayThreshold: "00:00:00",
      className: ["calendar-event"],
      extendedProps: {
        indicator,
        weeklyFrequency,
      },
    });
  };
  const handleEventClick = (clickInfo) => {
    if (
      clickInfo.event.title === "break" ||
      clickInfo.event.extendedProps.bookedEvent
    ) {
      return;
    }
    let prevEvents = [...currentEvents];
    currentEvents.map((event, index) => {
      if (
        event.extendedProps.indicator ===
        clickInfo.event.extendedProps.indicator
      ) {
        prevEvents[index].remove();
      }
    });

    setCurrentEvents([...prevEvents]);
    clickInfo.event.remove();
  };

  const handleEvents = (events) => {
    let index = events.findIndex(
      (event) => event.extendedProps.overlap || event.extendedProps.twoDaysEvent
    );
    if (index !== -1) {
      events[index].remove();
    }
    setCurrentEvents([...events]);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <div className="event-overlay filter-calendar-event">
          <div
            className="event-cancel"
            ref={cancelEventButtonRef}
            onClick={() => handleEventClick(eventInfo)}
          >
            <span>x</span>
          </div>
          <b>{eventInfo.timeText}</b>
          <div className="event-drag-last-event"> </div>
          <div className="event-drag-first-event"> </div>
        </div>
      </>
    );
  };

  const handleStartTimeChange = (value) => {
    setEventStartTime(value);
  };
  const handleEndTimeChange = (value) => {
    setEventEndTime(value);
  };

  const handleBreakDurationChange = (event, type) => {
    setBreakDuration((prevState) => {
      return {
        ...prevState,
        [type]: event.target.value === "" ? "0" : event.target.value,
      };
    });
  };

  const eventChange = (eventInfo) => {
    let indicator = eventInfo.oldEvent.extendedProps.indicator;
    let newEventStartTime = moment(eventInfo.event.startStr).format();
    let newEventEndTime = moment(eventInfo.event.endStr).format();
    let oldEventStartTime = moment(eventInfo.oldEvent.startStr).format();
    let oldEventEndTime = moment(eventInfo.oldEvent.endStr).format();
    let breakTime = eventInfo.oldEvent.extendedProps.breakTime;
    setWeeklyFrequency(eventInfo.oldEvent.extendedProps.weeklyFrequency);
    let isLastEvent = eventInfo.oldEvent.extendedProps.lastEvent;
    let prevEvents = [...currentEvents];
    currentEvents.map((event, index) => {
      if (event.extendedProps.indicator === indicator) {
        prevEvents[index].remove();
        console.log("removed");
      }
    });
    setCurrentEvents([...prevEvents]);
    let eventStartsAt = newEventStartTime;
    let eventEndsAt = newEventEndTime;
    let eightWeeksFromNow = moment().add(7, "weeks").format();
    let oneYearFromNow = moment().endOf("year").format();
    let nextSlotIn = weeklyFrequency ? 7 : 14;
    let doesEventLastTwoDays = moment(eventEndsAt).diff(
      moment(eventStartsAt),
      "days"
    );
    if (doesEventLastTwoDays) {
      let id = createEventId();
      let calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
        dragScroll: false,
        id,
        start: oldEventStartTime,
        end: oldEventEndTime,
        // allDay: eventSelectInfo.allDay,
        editable: true,
        nextDayThreshold: "00:00:00",
        className: ["calendar-event"],
        drop: false,
        droppable: false,
        disableDragging: true,
        eventStartEditable: true,
        eventResizableFromStart: true,
        extendedProps: {
          indicator,
          weeklyFrequency,
        },
      });
      return;
    }
    let minDiff = moment(newEventEndTime).diff(
      moment(newEventStartTime),
      "minutes"
    );
    let timeFactor = 45;
    if (
      moment(eventInfo.oldEvent.endStr).format() ===
      moment(eventInfo.event.endStr).format()
    ) {
      //drag up
      eventStartsAt = moment(newEventStartTime)
        .add(minDiff % timeFactor, "minutes")
        .format();
    } else {
      //drag down
      eventEndsAt = moment(newEventEndTime)
        .subtract(minDiff % timeFactor, "minutes")
        .format();
    }
    let calendarApi = calendarRef.current.getApi();
    calendarApi.unselect(); // clear date selection
    calendarApi.addEvent({
      id: createEventId(),
      title: "",
      start: eventStartsAt,
      end: eventEndsAt,
      editable: true,
      eventStartEditable: true,
      eventResizableFromStart: true,
      nextDayThreshold: "00:00:00",
      className: ["calendar-event"],
      extendedProps: {
        indicator,
        weeklyFrequency,
      },
    });
  };

  return (
    <div className="calander">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        aspectRatio={2}
        headerToolbar={{
          left: "",
          center: "appointmentfilterHeader",
          right: "",
        }}
        contentHeight={600}
        // buttonText={{
        //   today: 'Heute'
        // }}
        customButtons={{
          appointmentfilterHeader: {
            text: "Terminzeiten",
            click: (mouseEvent, htmlElement) => {
              console.log("hello there");
            },
          },
        }}
        titleFormat={{ year: "numeric", month: "long" }}
        slotDuration={"00:30:00"}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        // initialEvents={BOOKED_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        // eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        eventChange={(event) => {
          eventChange(event);
        }}
        eventStartEditable={true}
        eventResizableFromStart={true}
        drop={false}
        droppable={false}
        dragScroll={false}
        eventAllow={(dropInfo, draggedEvent) => {
          if (
            Number(
              moment(dropInfo.endStr).diff(moment(dropInfo.startStr), "minutes")
            ) < 45
          ) {
            return false;
          } else
            return (
              dropInfo.startStr === draggedEvent.startStr ||
              dropInfo.endStr === draggedEvent.endStr
            );
        }}
        dragRevertDuration={50}
        allDaySlot={false}
        eventColor={"#4ad9ca"}
        slotMinTime={"00:00:00"}
        slotMaxTime={"24:00:00"}
        slotLabelInterval={{ hours: 1 }}
        axisFormat={"H:mm"}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
          hour12: false,
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
          hour12: false,
        }}
        dayHeaderContent={(args) => {
          return moment(args.date).format("dddd");
        }}
        expandRows={false}
        // locale={'de'}
        stickyHeaderDates={false}
        unselectAuto={false}
        nextDayThreshold={"23:00:00"}
        eventOverlap={false}
        // slotEventOverlap={false}
        ref={calendarRef}
      />
    </div>
  );
};

export default FilterCalendar;
