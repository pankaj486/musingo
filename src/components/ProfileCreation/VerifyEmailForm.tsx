import React, {  } from "react";
// import { useUserMeRetrieve } from "../../generated/apiFetchers";
import { Row } from "reactstrap";
import { FaCheck } from "react-icons/fa";

export type CreateProfileVerifyEmailProps = {
  onNext: () => void;
};

export const CreateProfileVerifyEmail: React.FC<
  CreateProfileVerifyEmailProps
> = ({ onNext }) => {
  // const { data: user, refetch } = useUserMeRetrieve({});

  // useEffect(() => {
  //   refetch();
  //   const id = setInterval(() => {
  //     if (!user?.is_verified) {
  //       refetch();
  //     }
  //   }, 10000);

  //   return () => clearInterval(id);
  // }, []);

  return (
    <div className="d-flex flex-column justify-content-center text-center p-5 dynamicHeight">
      {/* {!user?.is_verified ? (
        <>
          <Row className="justify-content-center">
            <h2 className="text-primary">
              {" "}
              We send you an email with a verification link{" "}
            </h2>
            <Spinner
              style={{ width: "12rem", height: "12rem" }}
              color="primary"
            />
          </Row>
          <button
            className="pt-2 pt-sm-4 text-black-30 btn btn-link"
            onClick={onNext}
          >
            Überspringen
          </button>
        </>
      ) : ( */}
        <>
          <Row className="justify-content-center">
            <h2>Du wurdest erfolgreich verifiziert!</h2>
            <FaCheck
              style={{
                color: "var(--primary)",
                width: "12rem",
                height: "12rem",
              }}
            />
          </Row>
          <button
            type="button"
            className="btn btn-secondary btn-block musingoo-button mx-0 mt-4 small-font font-weight-bold"
            onClick={onNext}
          >
            Weiter
          </button>
        </>
      {/* )} */}
    </div>
  );
};
