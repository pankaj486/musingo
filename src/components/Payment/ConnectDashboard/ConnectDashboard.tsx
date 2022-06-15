import React from "react";

import { StripeExternalAccount } from "../../../generated/apiFetchers";

import SepaImage from "../../../assets/images/sepa.png";
import MasterCard from "../../../assets/images/masterCard.png";
import Plus from "../../../assets/images/paymentPlus.png";

export type ConnectDashboardProps = {
  dashboardUrl: string | undefined;
  connect: () => void | undefined;
  payoutMethods: StripeExternalAccount[];
};

export const ConnectDashboard: React.FC<ConnectDashboardProps> = ({
  dashboardUrl,
  connect,
  payoutMethods,
}) => {
  return (
    <>
      {dashboardUrl ? (
        <>
          <h5 className="mt-5">Auszahlungsmethode</h5>
          <div className="mt-4">
            {payoutMethods.map((account, index) => (
              <a key={index} href={dashboardUrl}>
                <button className="btn paymentButton">
                  <img
                    width="80x"
                    src={
                      account.type === "bank_account" ? SepaImage : MasterCard
                    }
                    alt="sepa"
                  />
                </button>
              </a>
            ))}
            <a href={dashboardUrl}>
              <button className="btn paymentButton">
                <img width="30px" src={Plus} alt="plus" />
              </button>
            </a>
          </div>
        </>
      ) : (
        <button
          onClick={() => connect()}
          className="btn paymentButton"
          color="primary"
        >
          Connect Payout
        </button>
      )}
    </>
  );
};
