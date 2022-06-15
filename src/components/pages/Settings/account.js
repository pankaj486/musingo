import React, { Fragment, useState } from "react";
import "./settings.scss";
import Google from "../../../assets/images/google.svg";
import Facebook from "../../../assets/images/facebook.svg";
import Insta from "../../../assets/images/insta.svg";
import SoundCloud from "../../../assets/images/soundcloudBig.png";
import Cross from "../../../assets/images/cross.png";
import Backdrop from "../../Backdrop/Backdrop";

const Account = () => {
  let [showModal, setModalVisibility] = useState(false);

  const handleModalVisibility = () => {
    setModalVisibility(!showModal);
  };

  let modalContents = (
    <div className="booking-requests__modal">
      {/* <span className="booking-requests__close-modal" onClick={handleModalVisibility}>X</span> */}
      <img src={Cross} alt="cross" className="py-4" />
      <h5 className="mb-4">
        Deaktivierung des Accounts <br /> momentan nicht möglich
      </h5>
      <div className="mx-sm-5">
        <p>
          Da du min. eine bestehende Buchung hast oder noch eine laufende
          Buchung anbietest, ist es dir momentan nicht möglich den Account zu
          deaktivieren.
        </p>
      </div>
      <div className="mx-5 mb-5">
        <button
          className="btn-primary text-white btn btn-block py-2"
          onClick={handleModalVisibility}
        >
          Zurück
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="settings">
        <label htmlFor="email" className="font-16">
          Email
        </label>
        <input className="form-control musingoo-input" type="text" />

        <label htmlFor="Passwort" className="font-16 mt-4">
          Passwort
        </label>
        <input className="form-control musingoo-input mt-4" type="text" />
      </div>
      <div className="divider mt-5 mb-4"></div>

      <p className="font-weight-bold mb-0 font-16">Email</p>
      <p>Verifiziere deine Email, um deinen Account zu bestätigen.</p>
      <button className="btn btn-primary py-1 px-4 text-white font-12">
        Verifizieren
      </button>

      <p className="font-weight-bold mb-0 mt-4 font-16">Phone</p>
      <p>Verifiziere via Mobilnummer SMS, um deinen Account zu bestätigen.</p>
      <button className="btn btn-primary py-1 px-4 text-white font-12">
        Verifizieren
      </button>

      <p className="font-weight-bold mb-0 mt-4 font-16">Trainer werden</p>
      <p>Werde Trainer und biete selbst Musikunterricht an.</p>
      <button className="btn btn-primary py-1 px-4 text-white font-12">
        Bewerben
      </button>

      <div className="divider my-5"></div>

      <div className="d-flex flex-column">
        <button className="defBorder py-2 px-3 font-weight-bold bg-white flex-1 mb-3 d-flex justify-content-start align-items-center">
          <img className="mr-2" src={Google} width="30px" alt="google" />
          <span>Connect to Google account</span>
        </button>
        <button className="defBorder py-2 px-3 font-weight-bold bg-white flex-1 mb-3 d-flex justify-content-start align-items-center">
          <img className="mr-2" src={SoundCloud} width="40px" alt="google" />
          <span>Connect to SoundCloud account</span>
        </button>
        <button className="defBorder py-2 px-3 font-weight-bold bg-white flex-1 mb-3 d-flex justify-content-start align-items-center">
          <img className="mr-2" src={Insta} width="30px" alt="google" />
          <span>Connect to Instagram account</span>
        </button>
        <button className="defBorder py-2 px-3 font-weight-bold bg-white flex-1 mb-3 d-flex justify-content-start align-items-center">
          <img className="mr-2" src={Facebook} width="30px" alt="google" />
          <span>Connect to Facebook account</span>
        </button>
      </div>

      <p className="font-weight-bold mt-4 font-18">Account Deaktivieren</p>
      <p>
        Wenn du deinen Account deaktiverst, werden deine Daten nicht mehr im
        öffentlichen Webspace angezeigt, jedoch beibehalten. Dein Account ist
        somit jederzeit reaktivierbar. Wenn du deinen Account und alle Daten
        vollständig löschen möchtest, kannst du dies nach der Deaktivierung tun.
      </p>
      <button
        className="btn btn-primary disabled py-1 px-4 text-white font-12"
        onClick={handleModalVisibility}
      >
        Account deaktivieren
      </button>
      <p className="font-12 pt-2">Deine Daten werden vollständig gelöscht.</p>

      <Fragment>
        <Backdrop showModal={showModal} hideModal={handleModalVisibility} />
        {showModal && modalContents}
      </Fragment>
    </div>
  );
};

export default Account;
