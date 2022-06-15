import React from "react";
import SepaImage from "../../../assets/images/sepa.png";
import MasterCard from "../../../assets/images/masterCard.png";
import Plus from "../../../assets/images/paymentPlus.png";
import WithdrawalReceipt from "../WithdrawalReceipt/WithdrawalReceipt";

const WitdhdrawalHistory = () => {
  return (
    <div>
      <h5 className="mt-5">Auszahlungsbelege</h5>
      <div className="d-flex flex-wrap justify-content-start align-items-start mt-5">
        <WithdrawalReceipt monthName={"Januar 2020"} />
        <WithdrawalReceipt monthName={"Januar 2020"} />
        <WithdrawalReceipt monthName={"Januar 2020"} />
        <WithdrawalReceipt monthName={"Januar 2020"} />
      </div>
    </div>
  );
};

export default WitdhdrawalHistory;
