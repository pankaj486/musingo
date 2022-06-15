import React, { useEffect, useState } from "react";

import { useStripeConnectRetrieve } from "../../../generated/apiFetchers";

export interface WithExpressInjectedData {
  dashboardUrl: string | undefined;
  loading: boolean;
}

export const WithExpressDashboard = <P extends WithExpressInjectedData>(
  Component: React.FC<WithExpressInjectedData>,
  timeout: number = 1000
) => {
  const WrappedComponent: React.FC<Omit<P, "dashboardUrl" | "loading">> = (
    props
  ) => {
    const {
      data: dashboardData,
      loading,
      refetch,
    } = useStripeConnectRetrieve({});

    const [intervalId, setIntervalId] = useState<number>();
    const [initialLoading, setInitialLoading] = useState(loading);

    useEffect(() => {
      if (!dashboardData?.dashboard_url) {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setIntervalId(
          setInterval(async () => {
            await refetch();
          }, timeout) as unknown as number
        );
      } else {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setIntervalId(undefined);
      }
    }, [refetch, dashboardData]);

    useEffect(() => {
      if (!loading) {
        setInitialLoading(false);
      }
    }, [loading]);

    return (
      <>
        <Component
          dashboardUrl={dashboardData?.dashboard_url}
          loading={initialLoading}
          {...props}
        />
      </>
    );
  };

  return WrappedComponent;
};
