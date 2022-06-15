import React from "react";
import Groups, { GroupsProps } from "./Groups";
import { usePaginatedList } from "../../../../../custom-hooks/usePaginatedList";
import {
  PaginatedPrivateLocationList,
  PrivateLocation,
  useLocationsPrivateList,
  useTimeslotsOwnList,
} from "../../../../../generated/apiFetchers";

export type GroupsContainerProps = Omit<GroupsProps, "locations" | "timeSlots">;

export const GroupsContainer: React.FC<GroupsContainerProps> = (props) => {
  const { data: locations } = usePaginatedList<
    PrivateLocation,
    PaginatedPrivateLocationList,
    any,
    any
  >(useLocationsPrivateList, {}, 1000, false);

  const { data: timeSlots } = useTimeslotsOwnList({});

  return (
    <Groups locations={locations} timeSlots={timeSlots || []} {...props} />
  );
};
