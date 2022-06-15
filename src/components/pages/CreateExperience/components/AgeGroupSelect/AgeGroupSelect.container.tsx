import React from "react";
import { usePaginatedList } from "../../../../../custom-hooks/usePaginatedList";
import {
  AgeGroup,
  Instrument,
  PaginatedAgeGroupList,
  useAgeGroupList,
} from "../../../../../generated/apiFetchers";
import { AgeGroupSelect, AgeGroupSelectProps } from "./AgeGroupSelect";
import { LoaderModal } from "../../../../LoaderModal/LoaderModal";

export interface AgeGroupSelectContainerProps
  extends Omit<
    AgeGroupSelectProps,
    "ageGroups" | "currentAgeGroup" | "onChange"
  > {
  currentAgeGroup: string | undefined;
  onChange: (value: string | undefined) => void;
}

export const AgeGroupSelectContainer: React.FC<
  AgeGroupSelectContainerProps
> = ({ currentAgeGroup, onChange, ...props }) => {
  const { data, loading } = usePaginatedList<
    AgeGroup,
    PaginatedAgeGroupList,
    unknown,
    any
  >(useAgeGroupList, {}, 1000, false);

  const selectedAgeGroup = data.find(
    (ageGroup) => ageGroup.uid === currentAgeGroup
  );

  const handleChange = (value: Instrument | undefined) => {
    onChange(value?.uid);
  };

  return (
    <>
      <AgeGroupSelect
        ageGroups={data}
        currentAgeGroup={selectedAgeGroup}
        onChange={handleChange}
        {...props}
      />
      <LoaderModal open={loading} />
    </>
  );
};
