import React from "react";
import PaymentReceipt from "../PaymentReceipt/PaymentReceipt";
import SepaImage from "../../../assets/images/sepa.png";
import MasterCard from "../../../assets/images/masterCard.png";
import Plus from "../../../assets/images/paymentPlus.png";

const PaymentHistory = () => {
  return (
    <div>
      <h5 className="mt-5">Zahlungsmethoden</h5>
      <div className="mt-4">
        <button className="btn paymentButton">
          <img width="80x" src={SepaImage} alt="sepa" />
        </button>
        <button className="btn paymentButton">
          <img width="70px" src={MasterCard} alt="masterCard" />
        </button>
        <button className="btn paymentButton">
          <img width="30px" src={Plus} alt="plus" />
        </button>
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

export default PaymentHistory;
