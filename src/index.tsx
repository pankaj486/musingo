import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RestfulProvider } from "restful-react";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/theme/base.scss";
import { useLoginState } from "./custom-hooks/useLoginState";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { store } from './state/store';
import { Provider } from 'react-redux';
import { BASE_URL } from "./config";

const AppWithApi = () => {
  const baseUrl = BASE_URL || "";

  const currentUser = useLoginState();

  const [error, setError] = useState<string>();

  return (
    <Provider store={store}>
      <RestfulProvider
        base={baseUrl}
        requestOptions={() => {
          if (!currentUser) {
            return {};
          } else {
            return {
              headers: { Authorization: `Bearer ${currentUser.jwt_access}` },
            };
          }
        }}
        onError={(err) => {
          setError(err.message);
        }}
      >
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(undefined)}
        >
          <Alert
            onClose={() => setError(undefined)}
            severity="error"
            style={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        <App />
      </RestfulProvider>
    </Provider>
  );
};

ReactDOM.render(<AppWithApi />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
