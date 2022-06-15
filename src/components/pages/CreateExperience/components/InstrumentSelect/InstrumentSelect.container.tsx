import React from "react";
import { usePaginatedList } from "../../../../../custom-hooks/usePaginatedList";
import {
  Instrument,
  PaginatedInstrumentList,
  useInstrumentList,
} from "../../../../../generated/apiFetchers";
import { InstrumentSelect, InstrumentSelectProps } from "./InstrumentSelect";
import { LoaderModal } from "../../../../LoaderModal/LoaderModal";

export interface InstrumentSelectContainerProps
  extends Omit<
    InstrumentSelectProps,
    "instruments" | "currentInstrument" | "onChange"
  > {
  currentInstrument: string | undefined;
  onChange: (value: string | undefined) => void;
}

export const InstrumentSelectContainer: React.FC<
  InstrumentSelectContainerProps
> = ({ currentInstrument, onChange, ...props }) => {
  const { data, loading } = usePaginatedList<
    Instrument,
    PaginatedInstrumentList,
    unknown,
    any
  >(useInstrumentList, {}, 1000, false);

  const selectedInstrument = data.find(
    (instrument) => instrument.uid === currentInstrument
  );

  const handleChange = (value: Instrument | undefined) => {
    onChange(value?.uid);
  };

  return (
    <>
      <InstrumentSelect
        instruments={data}
        currentInstrument={selectedInstrument}
        onChange={handleChange}
        {...props}
      />
      <LoaderModal open={loading} />
    </>
  );
};