import React, { Fragment } from "react";
import { useUserMeProfileRetrieve } from "../../generated/apiFetchers";

export type CreateProfileWelcomeProps = {
  onNext: () => void;
};

export const CreateProfileWelcome: React.FC<CreateProfileWelcomeProps> = ({
  onNext,
}) => {
  const { data: userProfile, loading } = useUserMeProfileRetrieve({});

  return loading ? null : (
    <div className="d-flex flex-column justify-content-center text-center p-5 dynamicHeight">
      <Fragment>
        <h2 className="text-primary"> Herzlich Willkommen </h2>
        <h2 className="text-primary"> {userProfile?.first_name}</h2>
      </Fragment>
    </div>
  );
};
