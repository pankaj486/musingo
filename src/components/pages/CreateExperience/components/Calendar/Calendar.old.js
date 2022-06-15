import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  BOOKED_EVENTS,
  createEventId,
  getCommonEventIndicator,
} from "../../../../../utils/calendarUtils";
import SlotModal from "./SlotModal/SlotModal";
import WeiterCta from "../../../../weiterCta/weiterCta";
import useWindowResize from "../../../../../custom-hooks/useWindowResize";
import "./Calendar.scss";

const Calendar = (props) => {
  const calendarRef = useRef(null);
  const stickyCtaRef = useRef(null);
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
    let doesEventLastTwoDays =
      Number(moment(selectInfo.endStr).day()) !==
      Number(moment(selectInfo.startStr).day());
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
    if (
      moment(selectInfo.startStr).add(15, "minutes").format() ===
        moment(selectInfo.endStr).format() ||
      moment(selectInfo.startStr).add(30, "minutes").format() ===
        moment(selectInfo.endStr).format()
    ) {
      setEventStartTime(moment(selectInfo.startStr).format());
      setEventEndTime(moment(selectInfo.startStr).add(45, "minutes").format());
      setSingleClick(true);
    } else {
      setEventStartTime(selectInfo.startStr);
      setEventEndTime(selectInfo.endStr);
    }
    handleShowModal();
    setEventSelectInfo(selectInfo);
  };

  const handleEventClick = (clickInfo) => {
    console.log("clicked");
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
        {!(
          eventInfo.event.title === "break" ||
          eventInfo.event.extendedProps.bookedEvent
        ) ? (
          <>
            <div className="event-overlay">
              <div
                className="event-cancel"
                ref={cancelEventButtonRef}
                onClick={() => handleEventClick(eventInfo)}
              >
                <span>x</span>
              </div>
            </div>
          </>
        ) : eventInfo.event.extendedProps.bookedEvent ? (
          <>
            <div className="event-overlay--booking">
              <img
                className="booking__image"
                src={eventInfo.event.extendedProps.backgroundImage}
                alt={"background"}
              />
              <div className="booking-details">
                <b>{eventInfo.timeText.split(" - ")[0]}</b>
                <i>{eventInfo.event.title}</i>
              </div>
            </div>
          </>
        ) : null}
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <div
          className="event-drag-last-event"
          style={{
            display: `${
              eventInfo.event.classNames.includes("last-event")
                ? "block"
                : "none"
            }`,
          }}
        ></div>
        <div
          className="event-drag-first-event"
          style={{
            display: `${
              eventInfo.event.classNames.includes("first-event")
                ? "block"
                : "none"
            }`,
          }}
        ></div>
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

  const handleBreakSubmit = () => {
    //eventChange is true if handleBreakSubmit is called after last event time is edited by dragging
    handleShowModal();
    let indicator = getCommonEventIndicator();
    let calendarApi = eventSelectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    let breakTime = Number(breakDuration.hour) * 60 + Number(breakDuration.min);
    let eventStartsAt = eventSelectInfo.startStr;
    let eventEndsAt = !singleClick ? eventSelectInfo.endStr : eventEndTime;
    let eightWeeksFromNow = moment().add(7, "weeks").format();
    // let oneYearFromNow = moment().endOf('year').format()
    let oneYearFromNow = moment().add(12, "months").format();
    let nextSlotIn = weeklyFrequency ? 7 : 14;
    while (
      moment(eventStartsAt).isBefore(
        location.pathname !== "/calendar" ? eightWeeksFromNow : oneYearFromNow
      ) ||
      moment(eventEndsAt).isBefore(
        location.pathname !== "/calendar" ? eightWeeksFromNow : oneYearFromNow
      )
    ) {
      let startTime = eventStartsAt;
      while (
        // moment(startTime).add(45, 'minutes').isBefore(moment(eventEndsAt)) &&
        // moment(startTime).add(45 + Number(breakTime), 'minutes').isBefore(moment(eventEndsAt)) &&
        moment(startTime)
          .add(45 + Number(breakTime) + 44, "minutes")
          .isBefore(moment(eventEndsAt)) &&
        breakTime !== 0
      ) {
        let title = "break";
        let calendarApi = eventSelectInfo.view.calendar;
        let endTime = moment(startTime)
          .add(45 + Number(breakTime), "minutes")
          .format();
        calendarApi.unselect(); // clear date selection
        calendarApi.addEvent({
          dragScroll: false,
          id: createEventId(),
          title,
          start: moment(startTime).add(45, "minutes").format(),
          end: endTime,
          // allDay: eventSelectInfo.allDay,
          editable: false,
          drop: false,
          droppable: false,
          disableDragging: true,
          eventStartEditable: false,
          eventResizableFromStart: false,
          nextDayThreshold: "00:00:00",
          className: ["break-event"],
          extendedProps: {
            indicator,
          },
        });
        startTime = moment(endTime).format();
      }
      startTime = eventStartsAt;
      let isFirstEvent = true;
      while (
        moment(startTime).add(44, "minutes").isBefore(moment(eventEndsAt))
      ) {
        let calendarApi = eventSelectInfo.view.calendar;
        let endTime = moment(startTime).add(45, "minutes").format();
        let isLastEvent = moment(endTime)
          .add(44 + Number(breakTime), "minutes")
          .isBefore(moment(eventEndsAt));
        calendarApi.unselect(); // clear date selection
        calendarApi.addEvent({
          dragScroll: false,
          id: createEventId(),
          title: "",
          start: moment(startTime).format(),
          end: endTime,
          // allDay: eventSelectInfo.allDay,
          editable: !isLastEvent || isFirstEvent,
          eventStartEditable: isFirstEvent,
          eventResizableFromStart: isFirstEvent,
          drop: false,
          droppable: false,
          disableDragging: true,
          nextDayThreshold: "00:00:00",
          className: [
            "calendar-event",
            `${!isLastEvent && "last-event"}`,
            `${isFirstEvent && "first-event"}`,
          ],
          extendedProps: {
            indicator,
            weeklyFrequency,
            breakTime,
            lastEvent: !isLastEvent,
            firstEvent: isFirstEvent,
          },
        });
        isFirstEvent = false;
        startTime = moment(endTime).add(Number(breakTime), "minutes").format();
        // if (endTime) {
        // }
      }

      eventStartsAt = moment(eventStartsAt).add(nextSlotIn, "days").format();
      eventEndsAt = moment(eventEndsAt).add(nextSlotIn, "days").format();
    }

    setBreakDuration((prevState) => {
      return {
        hour: "",
        min: "",
      };
    });
    setWeeklyFrequency(true);
    setUpdatedEventIndicator(null);
    setSingleClick(false);
  };

  const eventChange = (eventInfo) => {
    console.log("eventInfo ", eventInfo);
    let indicator = eventInfo.oldEvent.extendedProps.indicator;
    let newEventStartTime = moment(eventInfo.event.startStr).format();
    let newEventEndTime = moment(eventInfo.event.endStr).format();
    let oldEventStartTime = moment(eventInfo.oldEvent.startStr).format();
    let oldEventEndTime = moment(eventInfo.oldEvent.endStr).format();
    let breakTime = eventInfo.oldEvent.extendedProps.breakTime;
    setWeeklyFrequency(eventInfo.oldEvent.extendedProps.weeklyFrequency);
    let isLastEvent = eventInfo.oldEvent.extendedProps.lastEvent;
    let isFirstEvent = eventInfo.oldEvent.extendedProps.firstEvent;
    let wasLastAndFirstEvent = isFirstEvent && isLastEvent;
    let wasFirstEvent = isFirstEvent;
    let prevEvents = [...currentEvents];
    if (isLastEvent) {
      currentEvents.map((event, index) => {
        if (
          event.extendedProps.indicator === indicator &&
          event.extendedProps.lastEvent
        ) {
          prevEvents[index].remove();
        }
      });
    } else if (isFirstEvent) {
      currentEvents.map((event, index) => {
        if (
          event.extendedProps.indicator === indicator &&
          event.extendedProps.firstEvent
        ) {
          prevEvents[index].remove();
        }
      });
    }

    setCurrentEvents([...prevEvents]);

    let eventStartsAt = newEventStartTime;
    let eventEndsAt = newEventEndTime;
    let eightWeeksFromNow = moment().add(7, "weeks").format();
    // let oneYearFromNow = moment().endOf('year').format()
    let oneYearFromNow = moment().add(12, "months").format();
    let nextSlotIn = weeklyFrequency ? 7 : 14;

    // let overlap = currentEvents.some(event => {
    //   return (
    //     moment(eventInfo.startStr).isBetween(moment(event.startStr), moment(event.endStr)) ||
    //     moment(eventInfo.endStr).isBetween(moment(event.startStr), moment(event.endStr)) ||
    //     moment(event.startStr).isBetween(moment(eventInfo.startStr), moment(eventInfo.endStr)) ||
    //     moment(event.endStr).isBetween(moment(eventInfo.startStr), moment(eventInfo.endStr))
    //   )
    // })
    let doesEventLastTwoDays =
      Number(moment(eventEndsAt).day()) !== Number(moment(eventStartsAt).day());
    if (doesEventLastTwoDays) {
      let id = createEventId();
      let calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
        dragScroll: false,
        id,
        start: oldEventStartTime,
        end: oldEventEndTime,
        // allDay: eventSelectInfo.allDay,
        editable: isLastEvent || isFirstEvent,
        nextDayThreshold: "00:00:00",
        className: [
          "calendar-event",
          `${isLastEvent && "last-event"}`,
          `${isFirstEvent && "first-event"}`,
        ],
        drop: false,
        droppable: false,
        disableDragging: true,
        eventStartEditable: isFirstEvent,
        eventResizableFromStart: isFirstEvent,
        extendedProps: {
          indicator,
          weeklyFrequency,
          breakTime: breakTime,
          lastEvent: isLastEvent,
          firstEvent: isFirstEvent,
        },
      });
      return;
    }
    let dragDirection = "down";
    if (
      moment(eventInfo.oldEvent.endStr).format() ===
      moment(eventInfo.event.endStr).format()
    ) {
      // if (moment(oldEventStartTime).diff(moment(newEventStartTime), 'minutes')) {
      //   return
      // }
      dragDirection = "up";
      let minDiff = moment(newEventEndTime).diff(
        moment(newEventStartTime),
        "minutes"
      );
      let timeFactor = Number(breakTime) + 45;
      console.log("min-diff: ", minDiff);
      console.log("timeFactor: ", timeFactor);
      if (minDiff < timeFactor) {
        eventStartsAt = oldEventStartTime;
        eventEndsAt = oldEventEndTime;
      } else {
        eventStartsAt = moment(newEventStartTime)
          .add((minDiff % timeFactor) + Number(breakTime), "minutes")
          .format();
      }
    }

    while (
      moment(eventStartsAt).isBefore(
        location.pathname !== "/calendar" ? eightWeeksFromNow : oneYearFromNow
      ) ||
      moment(eventEndsAt).isBefore(
        location.pathname !== "/calendar" ? eightWeeksFromNow : oneYearFromNow
      )
    ) {
      let startTime = eventStartsAt;
      while (
        // moment(startTime).add(45, 'minutes').isBefore(moment(eventEndsAt)) &&
        // moment(startTime).add(45 + Number(breakTime), 'minutes').isBefore(moment(eventEndsAt)) &&
        moment(startTime)
          .add(45 + Number(breakTime) + 44, "minutes")
          .isBefore(moment(eventEndsAt)) &&
        breakTime !== 0
      ) {
        let title = "break";
        let calendarApi = calendarRef.current.getApi();
        let endTime = moment(startTime)
          .add(45 + Number(breakTime), "minutes")
          .format();
        // calendarApi.unselect() // clear date selection
        calendarApi.addEvent({
          dragScroll: false,
          id: createEventId(),
          title,
          start: moment(startTime).add(45, "minutes").format(),
          end: endTime,
          drop: false,
          droppable: false,
          disableDragging: true,
          eventStartEditable: false,
          eventResizableFromStart: false,
          // allDay: eventSelectInfo.allDay,
          editable: false,
          nextDayThreshold: "00:00:00",
          className: ["break-event"],
          extendedProps: {
            indicator,
          },
        });
        startTime = moment(endTime).format();
      }
      startTime = eventStartsAt;
      let isFirstEvent = wasFirstEvent;
      while (
        moment(startTime).add(44, "minutes").isBefore(moment(eventEndsAt))
      ) {
        let calendarApi = calendarRef.current.getApi();
        let endTime = moment(startTime).add(45, "minutes").format();
        if (dragDirection === "up") {
          isLastEvent = wasLastAndFirstEvent
            ? moment(endTime)
                .add(44 + Number(breakTime), "minutes")
                .isBefore(moment(eventEndsAt))
            : true;
        } else {
          isLastEvent = moment(endTime)
            .add(44 + Number(breakTime), "minutes")
            .isBefore(moment(eventEndsAt));
        }

        // calendarApi.unselect() // clear date selection
        calendarApi.addEvent({
          dragScroll: false,
          id: createEventId(),
          title: "",
          start: moment(startTime).format(),
          end: endTime,
          // allDay: eventSelectInfo.allDay,
          editable: !isLastEvent || isFirstEvent,
          drop: false,
          droppable: false,
          disableDragging: true,
          eventStartEditable: isFirstEvent,
          eventResizableFromStart: isFirstEvent,
          nextDayThreshold: "00:00:00",
          className: [
            "calendar-event",
            `${!isLastEvent && "last-event"}`,
            `${isFirstEvent && "first-event"}`,
          ],
          extendedProps: {
            indicator,
            weeklyFrequency,
            breakTime: breakTime,
            lastEvent: !isLastEvent,
            firstEvent: isFirstEvent,
          },
        });
        isFirstEvent = false;
        startTime = moment(endTime).add(Number(breakTime), "minutes").format();
        // if (endTime) {
        // }
      }

      eventStartsAt = moment(eventStartsAt).add(nextSlotIn, "days").format();
      eventEndsAt = moment(eventEndsAt).add(nextSlotIn, "days").format();
    }
    setWeeklyFrequency(true);
  };
  const isCalendarHeaderSticky = () => {
    const stickyHeader = document.querySelector(
      ".fc-scrollgrid-section-sticky > td"
    );
    const navbar = document.querySelector(".navbar.fixed-top");
    const timeGridViewElement = document.querySelector(
      ".fc-timegrid.fc-timeGridWeek-view.fc-view"
    );
    if (window.innerWidth < 1024) {
      document
        .querySelector(".fc-scrollgrid-section-sticky")
        .classList.remove("fixed");
      return;
    }
    if (!timeGridViewElement || !navbar || !stickyHeader) {
      return;
    }
    if (
      timeGridViewElement.getBoundingClientRect().top -
        stickyHeader.getBoundingClientRect().height <
      navbar.getBoundingClientRect().bottom
    ) {
      document
        .querySelector(".fc-scrollgrid-section-sticky")
        .classList.add("fixed");
    } else {
      document
        .querySelector(".fc-scrollgrid-section-sticky")
        .classList.remove("fixed");
    }
  };
  const [scrollPosition, setScrollPosition] = useState(
    document.documentElement.scrollTop
  );
  useEffect(() => {
    isCalendarHeaderSticky();
    window.addEventListener("scroll", function () {
      isCalendarHeaderSticky();
    });
  }, []);

  return (
    <div
      className="calander"
      style={{
        marginTop: `${props.classesForm ? "80px" : ""}`,
        marginBottom: `${props.classesForm ? "80px" : ""}`,
      }}
    >
      <SlotModal
        weeklyFrequency={weeklyFrequency}
        handleWeeklyFrequencyChange={handleWeeklyFrequencyChange}
        showModal={showModal}
        startTime={moment(eventStartTime).format("hh:mm").toString()}
        endTime={moment(eventEndTime).format("hh:mm").toString()}
        handleShowModal={handleShowModal}
        handleStartTimeChange={handleStartTimeChange}
        handleEndTimeChange={handleEndTimeChange}
        breakDuration={breakDuration}
        handleBreakDurationChange={handleBreakDurationChange}
        handleBreakSubmit={handleBreakSubmit}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        aspectRatio={1}
        headerToolbar={{
          left: "",
          center: "title",
          right: "today,prev,next",
        }}
        buttonText={{
          today: "Heute",
        }}
        // customButtons={{
        //   customButton: {
        //     text: 'Heute',
        //     click: function(mouseEvent, htmlElement) {
        //       htmlElement.innerText = moment().format('MMMM Do YYYY')
        //     }
        //   }
        // }}
        titleFormat={{ year: "numeric", month: "long" }}
        slotDuration={"00:15:00"}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={BOOKED_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
        expandRows={true}
        // locale={'de'}
        stickyHeaderDates={true}
        unselectAuto={false}
        nextDayThreshold={"23:00:00"}
        eventOverlap={false}
        // slotEventOverlap={false}
        ref={calendarRef}
        eventRender={(event) => {}}
      />
      {props.classesForm ? (
        <div className={"classes-form-calendar-cta"}>
          <WeiterCta nextStep={props.nextStep} />
        </div>
      ) : null}
    </div>
  );
};

export default Calendar;
