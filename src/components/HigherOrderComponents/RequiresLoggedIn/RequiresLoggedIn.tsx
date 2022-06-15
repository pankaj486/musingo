import React from "react";
import Error404Page from "src/components/pages/404";
import { useLoginState } from "../../../custom-hooks/useLoginState";

export const RequiresLoggedIn = <T,>(Base: React.FC<T>) => {
  const Wrapped: React.FC<T> = (props) => {
    const currentUser = useLoginState();

    return currentUser ? <Base {...props} /> : <Error404Page />;
  };

  return Wrapped;
};
