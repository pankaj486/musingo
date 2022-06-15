import React, { useState } from "react";
import {
  EditTimeSlotsCalendar,
  EditTimeSlotsCalendarProps,
} from "./EditTimeSlotsCalendar";
import {
  TimeSlot,
  useTimeslotsOwnCreate,
  useTimeslotsOwnList,
  useTimeslotsOwnDestroy,
} from "../../../../../generated/apiFetchers";
import { Snackbar, Modal, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export type EditTimeSlotsCalendarContainerProps = Pick<
  EditTimeSlotsCalendarProps,
  "onSubmit"
>;

export const EditTimeSlotsCalendarContainer: React.FC<
  EditTimeSlotsCalendarContainerProps
> = ({ onSubmit }) => {
  const {
    data: timeSlots,
    refetch,
    loading: loadingList,
  } = useTimeslotsOwnList({});
  const { mutate: createTimeSlot, loading: loadingCreate } =
    useTimeslotsOwnCreate({});
  const { mutate: deleteTimeSlot, loading: loadingDestroy } =
    useTimeslotsOwnDestroy({});

  const loading = loadingList || loadingDestroy || loadingCreate;

  const [error, setError] = useState<string>();

  const handleError = (error: any) => {
    if (error?.data?.non_field_errors) {
      setError(error.data.non_field_errors);
    } else {
      setError(error?.message);
    }
  };

  const handleInsertTimeSlots = async (
    newTimeSlots: Omit<TimeSlot, "uid">[]
  ) => {
    for (const timeSlot of newTimeSlots) {
      try {
        await createTimeSlot(timeSlot);
      } catch (error) {
        handleError(error);
      }
    }
    await refetch();
  };

  const handleDeleteTimeSlot = async (uid: string) => {
    try {
      await deleteTimeSlot(uid);
    } catch (error) {
      handleError(error);
    }

    await refetch();
  };

  return (
    <>
      <EditTimeSlotsCalendar
        timeSlots={timeSlots || []}
        insertTimeSlots={handleInsertTimeSlots}
        deleteTimeSlot={handleDeleteTimeSlot}
        classesForm
        onSubmit={onSubmit}
        // onClick={sendUserRes}
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
