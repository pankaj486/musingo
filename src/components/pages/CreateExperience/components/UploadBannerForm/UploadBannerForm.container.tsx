import React from "react";
import {
  Banner,
  PrivateLessonCreate,
  useExperienceBannerCreate,
} from "../../../../../generated/apiFetchers";
import { UploadBannerForm } from "./UploadBannerForm";

export type UploadBannerFormContainerProps = {
  onSubmit: (newData: Partial<PrivateLessonCreate>, newBanner: Banner) => void;
};

export const UploadBannerFormContainer: React.FC<
  UploadBannerFormContainerProps
> = ({ onSubmit }) => {
  const { mutate } = useExperienceBannerCreate({});

  const handleSubmit = async (file: File) => {
    const data = new FormData();
    data.set("image", file);

    const results = await mutate(data as any);

    onSubmit({ banner: results.uid }, results);
  };

  return <UploadBannerForm onSubmit={handleSubmit} />;
};