import React from "react";
import { Grid } from "@material-ui/core";
import { ConnectDashboard } from "../../../Payment/ConnectDashboard";
import WitdhdrawalHistory from "../../../Payment/WithdrawalHistory/WithdrawalHistory";

export const ProviderPaymentView: React.FC = () => {
  return (
    <>
      <Grid item xs={12}>
        <ConnectDashboard />
      </Grid>
      <Grid item xs={12}>
        <WitdhdrawalHistory />
      </Grid>
    </>
  );
};
