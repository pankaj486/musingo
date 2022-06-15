import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Spinner } from "reactstrap";

import { CreateSetupIntent, PaymentMethod } from "../../generated/apiFetchers";

import SepaImage from "../../assets/images/sepa.png";
import MasterCard from "../../assets/images/masterCard.png";
import Plus from "../../assets/images/paymentPlus.png";
import { stripePublicSecret } from "../../config";
import { PaymentMethodForm } from "./PaymentMethodForm";

export type PaymentMethodProps = {
  paymentMethods: PaymentMethod[];
  createSetupIntent: () => Promise<CreateSetupIntent>;
  // refetch: () => Promise<unknown>;
};

const stripePromise = loadStripe(stripePublicSecret);

export const PaymentMethods: React.FC<PaymentMethodProps> = ({
  paymentMethods,
  createSetupIntent,
}) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>();

  const handleAddPaymentButton = async () => {
    setLoading(true);

    const { customer_secret } = await createSetupIntent();
    setClientSecret(customer_secret);
    setLoading(false);
  };

  // console.log("clientSecret", clientSecret);

  return (
    <>
      {!clientSecret &&
        (loading ? (
          <Spinner />
        ) : (
          <div className="mt-4">
            {paymentMethods.map((method) => {
              return (
                <button className="btn paymentButton">
                  {method.type === "sepa_debit" && (
                    <>
                      <img width="80x" src={SepaImage} alt="sepa" />
                    </>
                  )}
                  {method.type === "card" && (
                    <>
                      <img width="70px" src={MasterCard} alt="masterCard" />
                      {method.card ? method.card.last4 : "????"}
                    </>
                  )}
                </button>
              );
            })}
            <button
              className="btn paymentButton"
              onClick={handleAddPaymentButton}
            >
              <img width="30px" src={Plus} alt="plus" />
            </button>
          </div>
        ))}

      {clientSecret &&  (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentMethodForm onCancel={() => setClientSecret(undefined)} />
        </Elements>
      )}
    </>
  );
};