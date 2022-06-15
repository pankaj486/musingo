import React from "react";
import "./inputAgreementSummary.scss";
import useWindowResize from "../../custom-hooks/useWindowResize";

const InputAgreementSummary = ({ header, title, items }) => {
   const { dimensions } = useWindowResize();

   return (
      <div className="mt-5 agreementContainer">
         <p>{header}</p>
         <h2>{title}</h2>
         {items && items.map((item, index) => {
            return (
               <div
                  key={index}
                  className="d-flex flex-column justify-content-start mt-4 mb-4"
               >
                  <p className="font-weight-bold text-left mb-1">
                     {item.question}
                  </p>
                  {item.type === "video" && item.videoSrc ? (
                     <video
                        className="mb-5 pb-4"
                        width={dimensions.width > 1024 ? "400" : "300"}
                        src={item.videoSrc}
                        controls
                     ></video>
                  ) : (
                     <input
                        className="form-control musingoo-input"
                        type="text"
                        placeholder={item.answer}
                        readOnly
                        style={{
                           background: "#f2f2f2",
                           width: dimensions.width >= 1024 ? "750px" : "",
                        }}
                     />
                  )}
               </div>
            );
         })}
      </div>
   );
};

export default InputAgreementSummary;
