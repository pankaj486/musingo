import React from "react";
import WithdrwalIcon from "../../../assets/images/withdrawalIcon.png";
import DownloadIcon from "../../../assets/images/download.png";

const WithdrawalReceipt = ({ monthName }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-2">
      <img src={WithdrwalIcon} alt="WithdrwalIcon" width="40px" />
      <span className="font-12 mb-0">{monthName}</span>
      <button className="btn">
        <img src={DownloadIcon} alt="download" width="60px" />
      </button>
    </div>
  );
};

export default WithdrawalReceipt;
