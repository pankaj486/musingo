import React, { Fragment, useState } from "react";
import Backdrop from "../../Backdrop/Backdrop";
import "./settings.scss";

const Privacy = () => {
  let [showModal, setModalVisibility] = useState(false);

  const handleModalVisibility = () => {
    setModalVisibility(!showModal);
  };

  let [settingsShowModal, setSettingsModalVisibility] = useState(false);

  const handleSettingsModalVisibility = () => {
    setSettingsModalVisibility(!settingsShowModal);
  };

  let modalContents = (
    <div className="booking-requests__modal">
      <h5 className="mb-4 mt-5">Cockie-Einstellungen</h5>
      <div className="mx-sm-5 pb-4">
        <p className="font-weight-bold">Schutz deiner Daten</p>
        <p className="font-12" style={{ lineHeight: 1 }}>
          Wenn du eine Website besuchst, kann sie Informationen in deinem
          Browser speichern oder abrufen, meist in Form von Cookies. Diese
          Informationen beziehen sich möglicherweise auf dich, deine
          Einstellungen oder dein Gerät und werden hauptsächlich genutzt, damit
          die Website wie erwartet funktioniert. Diese Angaben identifizieren in
          der Regel nicht dich direkt, können dir aber ein personalisierteres
          Web-Erlebnis bieten. Da wir dein Recht auf Datenschutz respektieren,
          kannst du dich dafür entscheiden, einige Arten von Cookies nicht
          zuzulassen. Klicke auf die verschiedenen Rubriken, um mehr zu erfahren
          und unsere Standardeinstellungen zu ändern. Das Blockieren einiger
          Arten von Cookies kann sich jedoch auf deine Nutzererfahrung und die
          Services auswirken, die wir anbieten können.
        </p>
        <div className="d-flex justify-content-end align-items-center mb-2 mt-4">
          <p className="font-weight-bold mb-0">
            Unbedingt erforderliche Cockies
          </p>
          <a href="#" className="ml-3 font-12">
            Immer aktiv
          </a>
        </div>
        <p className="font-12" style={{ lineHeight: 1 }}>
          Diese Cookies ermöglichen es uns, die Funktionalität und individuelle
          Gestaltung zu verbessern, beispielsweise von Videos und Live-Chats.
          Sie können von uns oder von Drittanbietern festgelegt werden, deren
          Dienste wir auf unseren Seiten hinzugefügt haben. Wenn du diese
          Cookies nicht zulässt, kann es sein, dass einige oder alle dieser
          Funktionen nicht ordnungsgemäß funktionieren.
        </p>
      </div>
    </div>
  );

  let settingModalContents = (
    <div className="booking-requests__modal">
      <h5 className="mb-4 mt-5">Cockie-Einstellungen</h5>
      <div className="mx-sm-5 pb-4">
        <div className="d-flex justify-content-end align-items-center mb-2 mt-4">
          <p className="font-weight-bold mb-0">Performance und Tracking</p>
          <div className="d-flex align-items-center">
            <label className="small-switch">
              <input type="checkbox" />
              <span className="small-slider round"></span>
            </label>
            <label className="ml-2 mb-0 font-weight-bold font-12 text-primary">
              Aktiv
            </label>
          </div>
        </div>
        <p className="font-12" style={{ lineHeight: 1 }}>
          Diese Cookies ermöglichen es uns, die Funktionalität und individuelle
          Gestaltung zu verbessern, beispielsweise von Videos und Live-Chats.
          Sie können von uns oder von Drittanbietern festgelegt werden, deren
          Dienste wir auf unseren Seiten hinzugefügt haben. Wenn du diese
          Cookies nicht zulässt, kann es sein, dass einige oder alle dieser
          Funktionen nicht ordnungsgemäß funktionieren.
        </p>

        <div className="d-flex justify-content-center align-items-center mx-3 my-2">
          <p className="mb-0 font-12">Analytics</p>
          <div className="d-flex align-items-center">
            <label className="small-switch">
              <input type="checkbox" />
              <span className="small-slider round"></span>
            </label>
            <label className="ml-2 mb-0 font-weight-bold font-12 text-primary">
              Aktiv
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mx-3 my-2">
          <p className="mb-0 font-12">Mixpanel</p>
          <div className="d-flex align-items-center">
            <label className="small-switch">
              <input type="checkbox" />
              <span className="small-slider round"></span>
            </label>
            <label className="ml-2 mb-0 font-weight-bold font-12 text-primary">
              Aktiv
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mx-3 my-2">
          <p className="mb-0 font-12">Facebook</p>
          <div className="d-flex align-items-center">
            <label className="small-switch">
              <input type="checkbox" />
              <span className="small-slider round"></span>
            </label>
            <label className="ml-2 mb-0 font-weight-bold font-12 text-primary">
              Aktiv
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2 ml-3 mt-4">
          <p className="font-weight-bold mb-0">Funktionale Cockies</p>
          <div className="d-flex align-items-center">
            <label className="small-switch">
              <input type="checkbox" />
              <span className="small-slider round"></span>
            </label>
            <label className="ml-2 mb-0 font-weight-bold font-12 text-primary">
              Aktiv
            </label>
          </div>
        </div>
        <p className="font-12" style={{ lineHeight: 1 }}>
          Diese Cookies ermöglichen es uns, die Funktionalität und individuelle
          Gestaltung zu verbessern, beispielsweise von Videos und Live-Chats.
          Sie können von uns oder von Drittanbietern festgelegt werden, deren
          Dienste wir auf unseren Seiten hinzugefügt haben. Wenn du diese
          Cookies nicht zulässt, kann es sein, dass einige oder alle dieser
          Funktionen nicht ordnungsgemäß funktionieren.
        </p>

        <div className="d-flex justify-content-center align-items-center mx-3 my-2">
          <p className="mb-0 font-12">Google Accounts</p>
          <div className="d-flex align-items-center">
            <label className="small-switch">
              <input type="checkbox" />
              <span className="small-slider round"></span>
            </label>
            <label className="ml-2 mb-0 font-weight-bold font-12 text-primary">
              Aktiv
            </label>
          </div>
        </div>
        <p className="font-weight-bold mb-2 mt-4">Cockie Richtlinie</p>
        <p className="font-12" style={{ lineHeight: 1 }}>
          Zu den Cookie-Richtlinien gelangst du
          <a
            href="#"
            className="ml-1"
            onClick={() => {
              handleSettingsModalVisibility();
              handleModalVisibility();
            }}
          >
            hier
          </a>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <p className="font-weight-bold mb-0 font-18">Deine Datenkontrolle</p>
      <p>
        Wir wollen dir absolute Kontrolle deiner Privatsphäre ermöglichen. Darum
        kannst bei MUSINGOO die Datenverarbeitung für alle Punkte selbst
        bestimmen.
      </p>
      <button
        className="btn btn-primary py-2 px-4 text-white font-12"
        onClick={handleSettingsModalVisibility}
      >
        Cockies verwalten
      </button>

      <p className="font-weight-bold mb-0 font-18 mt-5">
        Echtzeit Ortungsdienste
      </p>
      <div className="custom-control custom-checkbox mb-2 mt-3 ml-2">
        <input type="checkbox" className="custom-control-input" id="location" />
        <label className="custom-control-label" for="location">
          Use real time location services to see Experiences near your current
          location
        </label>
      </div>
      <Fragment>
        <Backdrop
          showModal={settingsShowModal}
          hideModal={handleSettingsModalVisibility}
        />
        {settingsShowModal && settingModalContents}
      </Fragment>

      <Fragment>
        <Backdrop showModal={showModal} hideModal={handleModalVisibility} />
        {showModal && modalContents}
      </Fragment>
    </div>
  );
};

export default Privacy;
