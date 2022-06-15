import React, { useRef, useState, useEffect, Fragment } from "react";
import RecordButton from "../../assets/images/record.png";
import "./videoUpload.scss";
import UploadFile from "./uploadFile";
import RecordingGif from "../../assets/images/recording.gif";
import PlayVideo from "../../assets/images/playVideo.png";

import { useLocation } from "react-router-dom";
import WeiterCta from "../weiterCta/weiterCta";

const VideoUpload = ({ header, text, returnFunction }) => {
   const location = useLocation();
   const videoRef = useRef(null);
   const recordedVideoRef = useRef(null);
   const downloadRef = useRef(null);

   const [recordState, setRecordState] = useState(false);
   const [shouldStop, setShouldStop] = useState(false);
   const [mediaRecorder, setMediaRecorder] = useState(null);
   const [recordingFinished, setRecordingFinishedstate] = useState(false);
   const [fileUploaded, setFileUploaded] = useState(false);
   const [recordinStarted, setRecordingStarted] = useState(false);
   const [playVideoStarted, setPlayVideoStarted] = useState(false);

   let stopped = false;
   let timer = null;

   useEffect(() => {
      if (recordState) {
         var handleSuccess = function (stream) {
            videoRef.current.srcObject = stream;
         };
         videoRef.current.setAttribute("autoplay", "");
         videoRef.current.setAttribute("muted", "");
         videoRef.current.setAttribute("playsinline", "");

         navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

         if (navigator.mediaDevices) {
            // if navigator.mediaDevices exists, use it
            navigator.mediaDevices
               .getUserMedia({
                  audio: {
                     sampleSize: 8,
                     echoCancellation: true,
                  },
                  video: true,
               })
               .then(handleSuccess);
         } else {
            navigator
               .getUserMedia({
                  audio: {
                     sampleSize: 8,
                     echoCancellation: true,
                  },
                  video: true,
               })
               .then(handleSuccess);
         }
      }
   }, [recordState]);

   const handleVideoStop = () => {
      setShouldStop(true);
      setRecordingStarted(false);
      mediaRecorder.stop();
   };

   const handleRecordingStart = () => {
      // timer = setInterval(,100)
      setRecordingStarted(true);
      const options = { mimeType: "video/webm" };
      setMediaRecorder(new MediaRecorder(videoRef.current.srcObject, options));
   };

   const handleVideoUpload = (file) => {
      downloadRef.current.href = file;
      downloadRef.current.download = "acetest.webm";
      setFileUploaded(true);
      setRecordingFinishedstate(true);
   };

   useEffect(() => {
      if (mediaRecorder !== null) {
         const recordedChunks = [];

         mediaRecorder.addEventListener("dataavailable", function (e) {
            if (e.data.size > 0) {
               recordedChunks.push(e.data);
            }
         });

         mediaRecorder.addEventListener("stop", function () {
            downloadRef.current.href = URL.createObjectURL(
               new Blob(recordedChunks)
            );
            downloadRef.current.download = "acetest.webm";
            videoRef.current.srcObject
               .getTracks()
               .forEach((track) => track.stop());

            setRecordingFinishedstate(true);
         });

         mediaRecorder.start();
      }
   }, [mediaRecorder]);

   return location.pathname.indexOf("/profile") === -1 ? (
      <div className="d-flex justify-content-center flex-column">
         <h2 className="videoHeader">{header}</h2>
         <p>{text}</p>
         <div className="d-flex justify-content-center flex-column">
            {!recordState && !fileUploaded && (
               <Fragment>
                  <div className="d-flex">
                     <button
                        className="btn videoButton"
                        onClick={() => {
                           setRecordState(true);
                        }}
                     >
                        <img src={RecordButton} alt="record" />
                        <p className="font-weight-bold text-dark mt-2">
                           Video aufnehmen{" "}
                        </p>
                     </button>
                     <div className="d-flex flex-column align-items-center videoButton">
                        <UploadFile
                           onUpload={(file) => {
                              handleVideoUpload(file);
                           }}
                        />
                        <p className="font-weight-bold text-dark">
                           Video hochladen
                        </p>
                     </div>
                  </div>
                  <WeiterCta
                     nextStep={() => returnFunction(null)}
                     ctaText={"überspringen"}
                  />
               </Fragment>
            )}
            {recordState && !recordingFinished && (
               <div className="d-flex flex-column align-items-center">
                  <div className="videoContainer d-flex flex-column align-items-center">
                     {!recordinStarted && (
                        <div className="placeholder">
                           <button
                              className="btn btn-primary text-white mx-1"
                              onClick={() => {
                                 handleRecordingStart();
                              }}
                           >
                              Start Recording
                           </button>
                        </div>
                     )}
                     <video
                        width="700"
                        height="500"
                        ref={videoRef}
                        id="player"
                        autoPlay
                        muted="muted"
                     ></video>
                  </div>
                  <div className="d-flex mb-5 mt-3">
                     {recordinStarted && (
                        <button
                           className="btn btn-secondary font-weight-bold text-white mx-1"
                           onClick={() => {
                              handleVideoStop();
                           }}
                        >
                           Stop Recording
                        </button>
                     )}
                  </div>
               </div>
            )}
            {recordingFinished && (
               <div className="d-flex flex-column align-items-center">
                  <div className="videoPlayerContainer d-flex flex-column align-items-center justify-content-center">
                     {!playVideoStarted && (
                        <div className="playerPlaceholder">
                           <img
                              src={PlayVideo}
                              alt="playVideo"
                              className="cursor-pointer"
                              onClick={() => {
                                 setPlayVideoStarted(true);
                                 recordedVideoRef.current.play();
                              }}
                           />
                        </div>
                     )}
                     <video
                        ref={recordedVideoRef}
                        src={downloadRef.current.href}
                        controls
                     ></video>
                  </div>
                  <div className="d-flex flex-column align-items-center mb-5 mt-3">
                     <button
                        className="btn btn-link text-primary font-weight-bold"
                        onClick={() => {
                           setRecordState(false);
                           setFileUploaded(false);
                           setRecordingFinishedstate(false);
                        }}
                     >
                        {fileUploaded
                           ? "Anderes Video hochladen"
                           : "Neues Video machen"}
                     </button>
                     <button
                        className="btn btn-primary text-white agButton font-weight-bold"
                        onClick={() => {
                           returnFunction(downloadRef.current.href);
                        }}
                     >
                        Weiter
                     </button>
                  </div>
               </div>
            )}
            <a style={{ display: "none" }} ref={downloadRef}>
               Download
            </a>
         </div>
      </div>
   ) : (
      <div className="d-flex justify-content-center">
         {!recordState && !fileUploaded && (
            <Fragment>
               <button
                  className="btn videoButton"
                  onClick={() => {
                     setRecordState(true);
                  }}
               >
                  <img src={RecordButton} alt="record" />
                  <p className="font-weight-bold text-dark mt-2">
                     Video aufnehmen{" "}
                  </p>
               </button>
               <div className="d-flex flex-column align-items-center videoButton">
                  <UploadFile
                     onUpload={(file) => {
                        handleVideoUpload(file);
                     }}
                  />
                  <p className="font-weight-bold text-dark">Video hochladen</p>
               </div>
            </Fragment>
         )}
      </div>
   );
};

export default VideoUpload;
