import React from "react";
import PaymentIcon from "../../../assets/images/paymentIcon.png";
import DownloadIcon from "../../../assets/images/download.png";

const PaymentReceipt = ({ monthName }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-2">
      <img src={PaymentIcon} alt="paymentIcon" width="40px" />
      <span className="font-12 mb-0">{monthName}</span>
      <button className="btn">
        <img src={DownloadIcon} alt="download" width="60px" />
      </button>
    </div>
  );
};

export default PaymentReceipt;
