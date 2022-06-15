// import React, { useState, Fragment, useRef } from "react";

// import CoverImageTips from "../CoverImageTips/CoverImageTips";

// import TemplateUploadImg from "../../../../../assets/images/template.png";
// import UploadImg from "../../../../../assets/images/upload-2.png";
// import WeiterCta from "../../../../weiterCta/weiterCta";
// import { Spinner } from "reactstrap";

// type UploadBannerFormProps = {
//   onSubmit: (file: File) => void;
//   isLoading: boolean;
// };

// export const UploadBannerForm: React.FC<UploadBannerFormProps> = ({
//   onSubmit,isLoading
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [file, setFile] = useState<File>();

//   const [showImageTips, setShowImageTips] = useState(false);
//   const [showTemplates, setShowTemplates] = useState(false);

//   const handleFileSelect = (files: FileList | null) => {
//     if (files && files.length > 0) {
//       setFile(files[0]);
//     } else {
//       setFile(undefined);
//     }
//   };

  


//   return !file ? (
//     <div className="add-cover-image-container">
//       {showImageTips ? (
//         <CoverImageTips
//           handleImageTips={() => setShowImageTips(!showImageTips)}
//         />
//       ) : !showTemplates ? (
//         <Fragment>
//           <h1 className="add-cover-image-title">Cover Bild erstellen</h1>
//           <p className="add-cover-image-description">
//             Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und
//             auch die Belichtung des
//             <br />
//             Fotos stimmig ist. Schaue dir dazu auch andere Experiences an. Tipps
//             findest du
//             <span className="find-tips" onClick={() => setShowImageTips(true)}>
//               {" "}
//               hier
//             </span>
//           </p>
//           {file && (
//             <div>
//               <img src={URL.createObjectURL(file)} />
//             </div>
//           )}
//           <div className="upload-buttons">
//             <div className="upload-image">
//               <div
//                 className="buttons__image-container"
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   name="file"
//                   style={{ display: "none" }}
//                   onChange={(event) => handleFileSelect(event.target.files)}
//                 />
//                 <img src={UploadImg} alt={"upload"} />
//               </div>
//               <span>Bild hochladen</span>
//             </div>
//             <div
//               className="use-template"
//               onClick={() => setShowTemplates(true)}
//             >
//               <div className="buttons__image-container">
//                 <img src={TemplateUploadImg} alt={"template"} />
//               </div>
//               <span>Template nutzen</span>
//             </div>
//           </div>
//         </Fragment>
//       ) : (
//         <div>
//           CHOOSE TEMPLATE PLACEHOLDER
//           <button onClick={() => setShowTemplates(false)}> Back </button>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div className="uploaded-image">
//       {!showImageTips ? (
//         <Fragment>
//           <p className="uploaded-image__header">Lade ein Cover Bild hoch</p>
//           <p>
//             Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und
//             auch die Belichtung des <br />
//             Fotos stimmig ist. Schaue dir dazu auch andere Experiences an.
//             Beispiele findest du
//             <span className="find-tips" onClick={() => setShowImageTips(true)}>
//               {" "}
//               hier
//             </span>
//           </p>
//           <div className="uploaded-image__upload">
//             <img src={URL.createObjectURL(file)} alt={"uploaded-image"} />
//           </div>
//           <p className="add-another-image" onClick={() => setFile(undefined)}>
//             Anderes Foto hochladen
//           </p>
//           {isLoading ? <Spinner /> : <WeiterCta nextStep={() => file && onSubmit(file)} />}
//         </Fragment>
//       ) : (
//         <CoverImageTips handleImageTips={() => setShowImageTips(true)} />
//       )}
//     </div>
//   );
// };


import React, { useState, Fragment, useRef } from "react";

import CoverImageTips from "../CoverImageTips/CoverImageTips";

import TemplateUploadImg from "../../../../../assets/images/template.png";
import UploadImg from "../../../../../assets/images/upload-2.png";
import WeiterCta from "../../../../weiterCta/weiterCta";

type UploadBannerFormProps = {
  onSubmit: (file: File) => void;
};

export const UploadBannerForm: React.FC<UploadBannerFormProps> = ({
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const [showImageTips, setShowImageTips] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(undefined);
    }
  };

  return !file ? (
    <div className="add-cover-image-container">
      {showImageTips ? (
        <CoverImageTips
          handleImageTips={() => setShowImageTips(!showImageTips)}
        />
      ) : !showTemplates ? (
        <Fragment>
          <h1 className="add-cover-image-title">Cover Bild erstellen</h1>
          <p className="add-cover-image-description">
            Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und
            auch die Belichtung des
            <br />
            Fotos stimmig ist. Schaue dir dazu auch andere Experiences an. Tipps
            findest du
            <span className="find-tips" onClick={() => setShowImageTips(true)}>
              {" "}
              hier
            </span>
          </p>
          {file && (
            <div>
              <img src={URL.createObjectURL(file)} />
            </div>
          )}
          <div className="upload-buttons">
            <div className="upload-image">
              <div
                className="buttons__image-container"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="file"
                  style={{ display: "none" }}
                  onChange={(event) => handleFileSelect(event.target.files)}
                />
                <img src={UploadImg} alt={"upload"} />
              </div>
              <span>Bild hochladen</span>
            </div>
            <div
              className="use-template"
              onClick={() => setShowTemplates(true)}
            >
              <div className="buttons__image-container">
                <img src={TemplateUploadImg} alt={"template"} />
              </div>
              <span>Template nutzen</span>
            </div>
          </div>
        </Fragment>
      ) : (
        <div>
          CHOOSE TEMPLATE PLACEHOLDER
          <button onClick={() => setShowTemplates(false)}> Back </button>
        </div>
      )}
    </div>
  ) : (
    <div className="uploaded-image">
      {!showImageTips ? (
        <Fragment>
          <p className="uploaded-image__header">Lade ein Cover Bild hoch</p>
          <p>
            Achte hierbei darauf, dass das Foto eine perfekte Qualität hat und
            auch die Belichtung des <br />
            Fotos stimmig ist. Schaue dir dazu auch andere Experiences an.
            Beispiele findest du
            <span className="find-tips" onClick={() => setShowImageTips(true)}>
              {" "}
              hier
            </span>
          </p>
          <div className="uploaded-image__upload">
            <img src={URL.createObjectURL(file)} alt={"uploaded-image"} />
          </div>
          <p className="add-another-image" onClick={() => setFile(undefined)}>
            Anderes Foto hochladen
          </p>
          <WeiterCta nextStep={() => file && onSubmit(file)} />
        </Fragment>
      ) : (
        <CoverImageTips handleImageTips={() => setShowImageTips(true)} />
      )}
    </div>
  );
};
