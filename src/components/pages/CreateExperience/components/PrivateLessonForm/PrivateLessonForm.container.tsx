import React from "react";

import {
  PrivateLessonCreate,
  useExperiencePrivateLessonsCreate,
} from "../../../../../generated/apiFetchers";
import { PrivateLessonForm } from "./PrivateLessonForm";
import { LoaderModal } from "../../../../LoaderModal/LoaderModal";

export const PrivateLessonFormContainer = () => {
  const { mutate: createPrivateLesson, loading } =
    useExperiencePrivateLessonsCreate({});

  const handleSubmit = async (data: PrivateLessonCreate) => {
    console.log("This data is from private lesson form", data);
    await createPrivateLesson(data);
  };

  return (
    <>
      <PrivateLessonForm onSubmit={handleSubmit} />
      <LoaderModal open={loading} />
    </>
  );
};
