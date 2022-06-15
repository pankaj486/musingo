import React from "react";
import { usePaginatedList } from "../../../../../custom-hooks/usePaginatedList";
import {
  Instrument,
  LessonLevel,
  PaginatedLessonTypeList,
  useLessonLevelList,
} from "../../../../../generated/apiFetchers";
import { LessonLevelSelect, LessonLevelSelectProps } from "./LessonLevelSelect";
import { LoaderModal } from "../../../../LoaderModal/LoaderModal";

export interface AgeGroupSelectContainerProps
  extends Omit<
    LessonLevelSelectProps,
    "lessonLevels" | "currentLessonLevel" | "onChange"
  > {
  currentLessonLevel: string | undefined;
  onChange: (value: string | undefined) => void;
}

export const LessonLevelSelectContainer: React.FC<
  AgeGroupSelectContainerProps
> = ({ currentLessonLevel, onChange, ...props }) => {
  const { data, loading } = usePaginatedList<
    LessonLevel,
    PaginatedLessonTypeList,
    unknown,
    any
  >(useLessonLevelList, {}, 1000, false);

  const selectedLessonLevel = data.find(
    (lessonLevel) => lessonLevel.uid === currentLessonLevel
  );

  const handleChange = (value: Instrument | undefined) => {
    onChange(value?.uid);
  };

  return (
    <>
      <LessonLevelSelect
        lessonLevels={data}
        currentLessonLevel={selectedLessonLevel}
        onChange={handleChange}
        {...props}
      />
      <LoaderModal open={loading} />
    </>
  );
};