import React from "react";
import {
  useLocationsPrivateList,
  useLocationsPrivateCreate,
  PaginatedPrivateLocationList,
  PrivateLocation,
  PrivateLessonCreate,
  useLocationsPrivateDestroy
} from "../../../../../generated/apiFetchers";
import { usePaginatedList } from "../../../../../custom-hooks/usePaginatedList";
import { LessonLocationForm } from "./LessonLocationForm";

export type LessonLocationFormContainerProps = {
  onChange: (newData: Partial<PrivateLessonCreate>) => void;
  onSubmit: () => void;
};

export const LessonLocationFormContainer: React.FC<
  LessonLocationFormContainerProps
> = ({ onChange, onSubmit }) => {
  const { data: locations, reload } = usePaginatedList<
    PrivateLocation,
    PaginatedPrivateLocationList,
    unknown,
    void
  >(useLocationsPrivateList, {}, 100);
  const { mutate: createPrivateLocation } = useLocationsPrivateCreate({});


  const handleCreatePrivateLocation = async (
    location: Pick<PrivateLocation, "name" | "address">
  ) => {
    await createPrivateLocation(location as PrivateLocation);
    await reload();
  };

  //Deleting the selected location
  const {mutate: deletePrivateLocation} = useLocationsPrivateDestroy({})

  const handleDeletePrivateLocation = async (
    id: string
  ) => {
    await deletePrivateLocation(id);
    await reload();
  }

  return (
    <LessonLocationForm
      locations={locations}
      createLocation={handleCreatePrivateLocation}
      deleteLocation={handleDeletePrivateLocation}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};