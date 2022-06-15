import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import MusingooButton from "../MusingooButton/MusingooButton";

export type PaymentMethodFormProps = {
  onCancel: () => void;
};

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.origin + "/settings/payments",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      alert("HEY");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <MusingooButton type="submit" disabled={!stripe}>
        Bestätigen
      </MusingooButton>
      <MusingooButton onClick={onCancel}>Cancel</MusingooButton>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};