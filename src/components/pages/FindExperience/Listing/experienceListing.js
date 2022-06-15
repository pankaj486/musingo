import React, { useState, Fragment, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../story/addStory.scss";
import UploadFile from "../../../videoUpload/uploadFile";
import bg from "../../../../assets/images/experience-bg.png";
import plus from "../../../../assets/images/whitePlus.png";
import "./experienceListing.scss";
import { service } from "src/services/AuthService/authService";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";

const ExperienceListing = () => {

  const initialStyle = {
    background: "#a7a7a7",
    borderRadius: "0 0 20px 20px",
    backgroundPosition: "center",
  };

  const [storyHeader, setStoryHeader] = useState(initialStyle);
  const [preview, setPreview] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [coverNotUploaded, setCoverNotUploaded] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState();
  const [picture, setPicture] = useState(null);


  const fileInputRef = useRef(null);
  const coverFileInputRef = useRef(null);

  const history = useHistory();

  const singleMusicianCard = useSelector((state) => state.allapp.musician_view);
  const bannerImage = singleMusicianCard.banner !== undefined ? singleMusicianCard.banner.image : '';


  const bannerStyle = {
    background: `url(${bannerImage})`,
    borderRadius: "0 0 20px 20px",
    backgroundPosition: "center",
  };

  const handleFileUpload = (file) => {
    let binaryData = []
    binaryData.push(file);
    let blobURL = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
    setImages(blobURL);
  };

  const handlerSubmit = () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("base_unit_amount", price);
    service.updateExperienceListing(singleMusicianCard.uid, formData);
    history.push("/musicianview");
  }

  const getMusicianList = () => {
    setTitle(singleMusicianCard.title);
    setDescription(singleMusicianCard.description);
    setPrice(singleMusicianCard.base_unit_amount);
    setImages(bannerImage)
  }

  useEffect(() => {
    getMusicianList();
    // setIsLoading(!isLoading);
  }, [singleMusicianCard])


  const handleCoverUpload = (file) => {
    let blobURL = URL.createObjectURL(file);
    const changedStyle = {
      background: `url(${blobURL})`,
      borderRadius: "0 0 20px 20px",
      backgroundPosition: "top",
      backgroundSize: "cover",
      minHeight: "300px",
    };
    setStoryHeader(changedStyle);
    setCoverNotUploaded(false);
  };


  return (
    <div className="pos-relative mb-4">
      {!preview && (
        <Fragment>
          <div
            className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center cursor-pointer"
            style={coverNotUploaded ? bannerStyle : storyHeader}
            onClick={() => coverFileInputRef.current.click()}
          >
            <div className="py-5 text-center font-weight-bold text-white">
              {coverNotUploaded && (
                <Fragment>
                  {""}
                  {/* {singleMusicianCard.banner === null ? '' : singleMusicianCard.banner.image} */}
                  <h1 className="pt-4">Cover hochladen</h1>
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      handleCoverUpload(event.target.files[0]);
                    }}
                  />
                  <p>Tipps, hier klicken</p>
                </Fragment>
              )}
              {/* <UploadFile fileType={"image/*"} buttonText={'Tipps, hier klicken'} onUpload={(url) => { handleCoverUpload(url) }} /> */}
            </div>
          </div>
          <div className="container">
            <h2 className="text-center my-5">Inserat bearbeiten</h2>
            <div className="d-flex flex-column flex-md-row mt-4">
              <div className="px-4 flex-1">
                <h6>Titel</h6>
                <input
                  type="text"
                  value={title}
                  className="form-control musingoo-input exBorder px-3 pb-3 pt-3"
                  style={{ maxWidth: "400px" }}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <h6 className="mt-4">Beschreibung</h6>
                <input
                  type="text"
                  className="form-control musingoo-input exBorder px-3 pb-3 pt-3"
                  style={{ maxWidth: "400px", minHeight: "150px" }}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />

                <h6 className="mt-4">Preis</h6>
                <div className="d-flex font-12 my-2 align-items-center">
                  <input
                    type="text"
                    className="form-control musingoo-input exBorder mr-2"
                    style={{ maxWidth: "60px" }}
                  />
                  <p className="mb-0 font-24 mr-2 font-weight-bold">€</p>
                  <span>Preis pro Monat</span>
                </div>
                <div className="d-flex font-12 my-2 align-items-center">
                  <input
                    type="text"
                    className="form-control musingoo-input exBorder mr-2"
                    style={{ maxWidth: "60px" }}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                  <p className="mb-0 font-24 mr-2 font-weight-bold">€</p>
                  <span>
                    Pro Einheit/Monat <br />
                    (bei 4 Einheiten pro Monat)
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-weight-bold">Bilder</p>
                <div className="d-flex flex-wrap">
                  <div
                    className="addImage mr-2 mb-2 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <img src={plus} width="50px" />
                  </div>
                  {/* {images.map((image, index) => {
                   return (
                     <div key={index} className="otherImage mr-2 mb-2">
                       <img src={image} />
                     </div>
                   );
                 })} */}
                  <div className="otherImage mr-2 mb-2">
                    <img src={images ? images : ''} />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      handleFileUpload(event.target.files[0]);
                    }}
                  />
                </div>
                <h6 className="font-weight-bold mt-4">Verfügbarkeit</h6>
                <p>
                  Verändere deine globale Verfügbarkeit im Kalender. Diese
                  Verfügbarkeit gilt auch für andere Experiences.{" "}
                </p>
                <button className="btn btn-primary text-white px-3">
                  Zum Kalender
                </button>
              </div>
            </div>
          </div>

          <button
            style={{ position: "fixed", bottom: "20px", right: "100px" }}
            className="btn btn-primary text-white px-5 py-2"
            onClick={handlerSubmit}
          >
            Speichern
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default ExperienceListing;
