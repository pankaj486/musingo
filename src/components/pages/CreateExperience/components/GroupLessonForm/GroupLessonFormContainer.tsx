import React from "react";
import { GroupLessonForm } from "./GroupLessonForm";
import {
  GroupLessonCreate,
  useExperienceGroupLessonsCreate,
} from "../../../../../generated/apiFetchers";
import { LoaderModal } from "../../../../LoaderModal/LoaderModal";

export const GroupLessonFormContainer: React.FC = () => {
  const { mutate: createGroupLesson, loading } =
    useExperienceGroupLessonsCreate({});

  const handleSubmit = async (data: GroupLessonCreate) => {
    await createGroupLesson(data);
  };

  return (
    <>
      <GroupLessonForm onSubmit={handleSubmit} />
      <LoaderModal open={loading} />
    </>
  );
};
