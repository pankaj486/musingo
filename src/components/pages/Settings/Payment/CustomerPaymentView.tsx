import React from "react";
import PaymentReceipt from "../../../Payment/PaymentReceipt/PaymentReceipt";
import { PaymentMethodsContainer } from "../../../PaymentMethods/PaymentMethods.container";

export const CustomerPaymentView: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <h5 className="mt-5">Zahlungsmethoden</h5>
      <div className="mt-12">
        <PaymentMethodsContainer />
      </div>
      <h5 className="mt-5">Rechnungsbelege</h5>
      <div className="d-flex flex-wrap justify-content-start align-items-start mt-5">
        <PaymentReceipt monthName={"Januar 2020"} />
        <PaymentReceipt monthName={"Januar 2020"} />
        <PaymentReceipt monthName={"Januar 2020"} />
        <PaymentReceipt monthName={"Januar 2020"} />
      </div>
    </div>
  );
};
