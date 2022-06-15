import React, { useRef } from 'react'
import UploadButton from '../../assets/images/upload.png';
import './videoUpload.scss';

const UploadFile = ({ onUpload, buttonText, fileType, profileEdit }) => {

    const fileInputRef = useRef(null);

    const handleFileUpload = (file) => {
        let blobURL = URL.createObjectURL(file);
        onUpload(blobURL);
    }

    return (
        <div>
            <button className="btn videoButton" onClick={() => fileInputRef.current.click()}>
                {(!buttonText && !profileEdit) && <img src={UploadButton} alt="upload" />}
                {buttonText && <span className="font-16 text-white font-weight-bold"> {buttonText}</span>}
            </button>
            <input ref={fileInputRef} type="file" accept={fileType ? fileType : "video/*"} style={{ display: 'none' }} onChange={(event) => { handleFileUpload(event.target.files[0]) }} />
        </div>
    )
}

export default UploadFile;
