import React, { useEffect, useState } from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Spinner, Alert } from "reactstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { service as authService } from "../../services/AuthService/authService";
import {
  PrivateUser,
  useEmailVerifyCreate,
  useUserMeRetrieve,
} from "../../generated/apiFetchers";

type MatchParams = {
  token: string;
};

interface VerifyEmailProps extends RouteComponentProps<MatchParams> {}

export const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
  const { token } = props.match.params;

  let [message, setMessage] = useState("");
  let [error, setError] = useState("");

  const resolveRefetch = (data: PrivateUser) => {
    if (data.is_verified) {
      setMessage("You are verified :)");
    } else {
      verify({ token })
        .catch((reason) => {
          setError(reason.data.error);
        })
        .then(() => {
          refetch();
        });
    }
    return data;
  };

  const {
    data: user,
    loading: loadingUser,
    refetch,
  } = useUserMeRetrieve({ lazy: true, resolve: resolveRefetch });
  const { mutate: verify, loading: loadingVerify } = useEmailVerifyCreate({});

  useEffect(() => {
    if (!authService.is_logged_in()) {
      setError("Bitte erst einloggen");
    } else {
      refetch();
    }
  }, [refetch]);

  //
  // useEffect(() => {
  //     if (!authService.is_logged_in()) {
  //         return;
  //     }
  //
  //     if (!initialized) {
  //         axios({
  //             method: 'get',
  //             url: '/api/user/me/'
  //         }).then((response) => {
  //             setInitialized(true);
  //             setVerified(response.data['is_verified']);
  //             if (verified) {
  //                 setMessage("You are already verified");
  //                 setLoading(false);
  //             }
  //         }).catch((errors) => {
  //             setError(errors.response.data)
  //         });
  //     }
  // });
  //
  // useEffect(() => {
  //     if (!authService) {
  //         return;
  //     }
  //
  //     if (initialized && !triedVerify) {
  //         setTriedVerify(true);
  //         axios({
  //             method: 'POST',
  //             url: '/auth/verify/mail/',
  //             data: {
  //                 token: token
  //             }
  //         }).then((response) => {
  //             setVerified(true);
  //             setMessage(response.data);
  //             setLoading(false);
  //         }).catch((errors) => {
  //             setError(errors.response.data.non_field_errors);
  //             setLoading(false);
  //         });
  //     }
  // })

  return (
    <Container>
      <Row className="justify-content-center">
        {loadingUser ||
          loadingVerify ||
          (!user?.is_verified && !error && !message && (
            <Spinner
              style={{ width: "12rem", height: "12rem" }}
              color="primary"
            />
          ))}
        {user?.is_verified && (
          <FaCheck
            style={{ color: "var(--primary)", width: "12rem", height: "12rem" }}
          />
        )}
        {error && (
          <FaTimes
            style={{ color: "var(--danger)", width: "12rem", height: "12rem" }}
          />
        )}
      </Row>
      {message && !error && <Alert color="success"> {message} </Alert>}
      {error && <Alert color="danger"> {error} </Alert>}
    </Container>
  );
};
