import React, { useState } from "react";

import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventContentArg,
  EventInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import moment from "moment";

import SlotModal, { Duration, Frequency } from "./SlotModal/SlotModal";

import "./Calendar.scss";
import {
  PeriodEnum,
  PrivateLessonCreate,
  TimeSlot,
} from "../../../../../generated/apiFetchers";
import WeiterCta from "../../../../weiterCta/weiterCta";
import MusingooButton from "src/components/MusingooButton/MusingooButton";

export type CalendarProps = {
  lessonData: Partial<PrivateLessonCreate>;
  onSubmit: () => void;
  onChange: (newData: Partial<PrivateLessonCreate>) => void;
  classesForm: boolean;
  timeSlots: TimeSlot[];
  insertTimeSlots: (
    newTimeSlots: Omit<TimeSlot, "uid">[]
  ) => Promise<TimeSlot[]>;
  deleteTimeSlot: (uid: string) => Promise<void>;
};



export const Calendar: React.FC<CalendarProps> = ({
  lessonData: { time_slots: selectedTimeSlots },
  onChange,
  onSubmit,
  classesForm,
  timeSlots,
  insertTimeSlots,
  deleteTimeSlot,
}) => {

  // console.log("selectedTimeSlots", selectedTimeSlots);

  const timeslotDuration = 45;
  const [frequency, setFrequency] = useState<Frequency>(Frequency.WEEKLY);
  const [showModal, setShowModal] = useState(false);
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [breakDuration, setBreakDuration] = useState<Duration>({
    hour: "",
    min: "",
  });
  const [eventSelectInfo, setEventSelectInfo] = useState<DateSelectArg>();

  const handleSubmit = () => {
    if (selectedTimeSlots && selectedTimeSlots.length > 0) {
      onSubmit();
    }
  };

  const handleSelectAll = () => {
    onChange({
      time_slots: timeSlots
        .filter((slot) => slot.uid)
        .map((slot) => slot.uid as string),
    });
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let overlap = timeSlots.some((event) => {
      // TODO: FIX Logic

      const startMoment = moment(event.start_date + " " + event.start_time);
      const endMoment = startMoment.clone().add(timeslotDuration, "minutes");
      return (
        moment(selectInfo.startStr).isBetween(startMoment, endMoment) ||
        moment(selectInfo.endStr).isBetween(
          startMoment,
          startMoment.add(45, "minutes")
        ) ||
        startMoment.isBetween(
          moment(selectInfo.startStr),
          moment(selectInfo.endStr)
        ) ||
        endMoment.isBetween(
          moment(selectInfo.startStr),
          moment(selectInfo.endStr)
        )
      );
    });
    const doesEventLastTwoDays =
      Number(moment(selectInfo.endStr).day()) !==
      Number(moment(selectInfo.startStr).day());

    if (overlap || doesEventLastTwoDays) {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
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
    } else {
      setEventStartTime(selectInfo.startStr);
      setEventEndTime(selectInfo.endStr);
    }
    setShowModal(!showModal);
    setEventSelectInfo(selectInfo);
  };

  const handleBreakSubmit = async () => {
    //eventChange is true if handleBreakSubmit is called after last event time is edited by dragging
    setShowModal(false);

    if (!eventSelectInfo) {
      alert("Sorry, there was an error");
      return;
    }

    const calendarApi = eventSelectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    const eventStart = moment(eventSelectInfo.startStr);
    const eventEnd = moment(eventSelectInfo.endStr);

    let newTimeSlots: Omit<TimeSlot, "uid">[] = [];

    while (true) {
      newTimeSlots = [
        // ...newTimeSlots,
        {
          start_time: `${eventStart.format("HH:mm")}`,
          start_date: `${eventStart.format("YYYY-MM-DD")}`,
          period: frequency as PeriodEnum,
        },
      ];

      if (breakDuration.hour) {
        eventStart.add(parseInt(breakDuration.hour), "hours");
      }
      if (breakDuration.min) {
        eventStart.add(parseInt(breakDuration.min), "minutes");
      }
      eventStart.add(45, "minutes");

      if (!eventStart.isBefore(eventEnd)) break;
    }

    const newSlots = await insertTimeSlots(newTimeSlots);

    onChange({
      time_slots: (selectedTimeSlots || []).concat(
        newSlots.filter((slot) => slot.uid).map((slot) => slot.uid as string)
      ),
    });

    setBreakDuration({
      hour: "",
      min: "",
    });
    setFrequency(Frequency.WEEKLY);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <div
          className="event-overlay"
          onClick={() => {
            const slot = eventInfo.event.extendedProps.slot;

            if (selectedTimeSlots?.some((uid) => uid === slot.uid)) {
              onChange({
                time_slots: selectedTimeSlots?.filter(
                  (uid) => uid !== slot.uid
                ),
              });
            } else {
              onChange({
                time_slots: (selectedTimeSlots || []).concat(slot.uid),
              });
            }
          }}
        >
          <div
            className="event-cancel"
            onClick={async (event) => {
              event.preventDefault();
              const slot = eventInfo.event.extendedProps.slot;
              onChange({
                time_slots: selectedTimeSlots?.filter(
                  (uid) => uid !== slot.uid
                ),
              });
              await deleteTimeSlot(slot.uid);
            }}
          >
            <span>X</span>
          </div>
        </div>

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
        />
        <div
          className="event-drag-first-event"
          style={{
            display: `${
              eventInfo.event.classNames.includes("first-event")
                ? "block"
                : "none"
            }`,
          }}
        />
      </>
    );
  };

  const handleChange = (events: EventApi[]) => {
    // console.log(events);
    return events
  };

  return (
    <div
      className="calandar"
      style={{
        marginTop: `${classesForm ? "80px" : ""}`,
        marginBottom: `${classesForm ? "80px" : ""}`,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Select available Time Slots</h2>
      <h6 style={{ textAlign: "center", margin: "auto", maxWidth: "800px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </h6>

      <MusingooButton
        style={{ backgroundColor: "#4ad9ca" }}
        onClick={handleSelectAll}
      >
        Select All
      </MusingooButton>

      <SlotModal
        showModal={showModal}
        frequency={frequency}
        onFrequencyChange={(newValue) => setFrequency(newValue)}
        startTime={moment(eventStartTime).format("hh:mm").toString()}
        endTime={moment(eventEndTime).format("hh:mm").toString()}
        breakDuration={breakDuration}
        onBrakeDurationChange={(newValue) => setBreakDuration(newValue)}
        onSubmit={handleBreakSubmit}
        onClose={() => {
          setShowModal(false);
          const calendarApi = eventSelectInfo?.view.calendar;
          calendarApi?.unselect(); // clear date selection
          setEventSelectInfo(undefined);
        }}
      />
      <FullCalendar
        plugins={[
          rrulePlugin,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
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
        editable
        selectable
        selectMirror
        dayMaxEvents
        weekends
        eventStartEditable
        eventResizableFromStart
        events={timeSlots.map((slot): EventInput => {
          return {
            rrule: {
              freq: "weekly",
              interval: slot.period,
              byweekday: moment(slot.start_date).isoWeekday() - 1,
              dtstart: slot.start_date + " " + slot.start_time,
            },
            duration: "0:45",
            extendedProps: {
              slot,
            },
            backgroundColor: selectedTimeSlots?.some((uid) => uid === slot.uid)
              ? "#4ad9ca"
              : "#dddddd",
          };
        })}
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventsSet={handleChange} // called after events are initialized/added/changed/removed
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
              dropInfo.startStr === draggedEvent?.startStr ||
              dropInfo.endStr === draggedEvent?.endStr
            );
        }}
        dragRevertDuration={50}
        allDaySlot={false}
        eventColor={"#4ad9ca"}
        slotMinTime={"00:00:00"}
        slotMaxTime={"24:00:00"}
        slotLabelInterval={{ hours: 1 }}
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
        stickyHeaderDates={true}
        unselectAuto={false}
        nextDayThreshold={"23:00:00"}
        eventOverlap={false}
      />

      <div className="classes-form-calendar-cta">
        <WeiterCta
          nextStep={handleSubmit}
          background={
            selectedTimeSlots && selectedTimeSlots.length > 0
              ? undefined
              : "grey"
          }
        />
      </div>
    </div>
  );
};
