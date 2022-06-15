import { GroupForm, GroupFormProps } from "./GroupForm";
import React from "react";
import { usePaginatedList } from "../../../../../../custom-hooks/usePaginatedList";
import {
  PaginatedPrivateLocationList,
  PrivateLocation,
  useLocationsPrivateList,
} from "../../../../../../generated/apiFetchers";

export type GroupFormContainerProps = Omit<GroupFormProps, "locations">;

export const GroupFormContainer: React.FC<GroupFormContainerProps> = (
  props
) => {
  const { data: locations } = usePaginatedList<
    PrivateLocation,
    PaginatedPrivateLocationList,
    any,
    any
  >(useLocationsPrivateList, {}, 1000, true);

  return <GroupForm locations={locations ?? []} {...props} />;
};
