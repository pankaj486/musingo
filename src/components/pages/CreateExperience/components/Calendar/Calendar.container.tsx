import React, { useState } from "react";

import {
  TimeSlot,
  useTimeslotsOwnCreate,
  useTimeslotsOwnDestroy,
  useTimeslotsOwnList,
} from "../../../../../generated/apiFetchers";
import { Calendar, CalendarProps } from "./Calendar";
import { Alert } from "@material-ui/lab";
import { Modal, Snackbar, CircularProgress } from "@material-ui/core";
import { GetDataError } from "restful-react";

export type CalendarContainerProps = Pick<
  CalendarProps,
  "lessonData" | "onChange" | "onSubmit"
>;

export const CalendarContainer: React.FC<CalendarContainerProps> = ({
  lessonData,
  onChange,
  onSubmit,
}) => {
  const {
    data: timeSlots,
    refetch,
    loading: loadingList,
  } = useTimeslotsOwnList({});
  const { mutate: createTimeSlot, loading: loadingCreate } =
    useTimeslotsOwnCreate({});
  const { mutate: deleteTimeSlot, loading: loadingDestroy } =
    useTimeslotsOwnDestroy({});

  const [inProgress, setInProgress] = useState(false);

  const loading = loadingList || loadingDestroy || loadingCreate || inProgress;

  const [error, setError] = useState<string>();

  const handleError = (error: GetDataError<any>) => {
    if (error?.data?.non_field_errors) {
      setError(error.data.non_field_errors);
    } else {
      setError(error?.message);
    }
  };

  const handleInsertTimeSlots = async (
    newTimeSlots: Omit<TimeSlot, "uid">[]
  ) => {
    const createdTimeSlots: TimeSlot[] = [];

    try {
      setInProgress(true);
      for (const timeSlot of newTimeSlots) {
        try {
          const result = await createTimeSlot(timeSlot);
          createdTimeSlots.push(result);
        } catch (error) {
          handleError(error as any);
        }
      }

      await refetch();
    } finally {
      setInProgress(false);
    }
    return createdTimeSlots;
  };

  const handleDeleteTimeSlot = async (uid: string) => {
    try {
      setInProgress(true);
      try {
        await deleteTimeSlot(uid);
      } catch (error) {
        handleError(error as any);
      }

      await refetch();
    } finally {
      setInProgress(false);
    }
  };

  return (
    <>
      <Calendar
        lessonData={lessonData}
        onSubmit={onSubmit}
        onChange={onChange}
        timeSlots={timeSlots || []}
        insertTimeSlots={handleInsertTimeSlots}
        deleteTimeSlot={handleDeleteTimeSlot}
        classesForm
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(undefined)}
      >
        <Alert
          severity="warning"
          style={{ width: "100%" }}
          onClose={() => setError(undefined)}
        >
          {error}
        </Alert>
      </Snackbar>
      <Modal
        open={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress style={{ width: "10vh", height: "10vh" }} />
      </Modal>
    </>
  );
};