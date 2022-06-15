import React from "react";
import {
  AccountLinks,
  useStripeConnectStartCreate,
  useStripeConnectPayoutList,
} from "../../../generated/apiFetchers";
import { ConnectDashboard } from "./ConnectDashboard";
import { WithExpressDashboard } from "../../HigherOrderComponents/WithExpressDashboard/WithExpressDashboard";
import { Spinner } from "reactstrap";

export type ConnectDashboardContainerProps = {
  dashboardUrl: string | undefined;
  loading: boolean;
};

const ConnectDashboardContainer: React.FC<ConnectDashboardContainerProps> = ({
  dashboardUrl,
  loading,
}) => {
  const { mutate: startConnect } = useStripeConnectStartCreate({});

  const { data, loading: payoutLoading } = useStripeConnectPayoutList({});

  console.log(data);

  const handleConnect = () => {
    startConnect({} as AccountLinks).then((link) => {
      const newWindow = window.open(link.url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    });
  };

  return (
    <>
      {loading || payoutLoading ? (
        <Spinner>Loading</Spinner>
      ) : (
        <ConnectDashboard
          payoutMethods={data ? data : []}
          dashboardUrl={dashboardUrl}
          connect={handleConnect}
        />
      )}
    </>
  );
};

export default WithExpressDashboard(ConnectDashboardContainer);
