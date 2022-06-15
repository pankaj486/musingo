import React, { useState, Fragment } from "react";

import ExperienceChoice from "../ExperienceChoice/ExperienceChoice";

import "./CreateMoreExperienceModal.scss";
import Backdrop from "../../../../Backdrop/Backdrop";
const CreateMoreExperienceModal = (props) => {
  let [selectedExperience, setSelectedExperience] = useState(null);
  let [showCreateExperienceModal, setShowCreateExperienceModal] =
    useState(true);
  const handleModalVisibility = () => {
    setShowCreateExperienceModal((prevState) => !prevState);
  };
  /*
   * id: 1 => classes
   * id: 2 => jobs
   * id: 3 => instrument rentals
   * id: 4 => concerts
   */

  const handleSelectedExperience = (selection) => {
    setSelectedExperience(selection);
  };
  return (
    <Fragment>
      <Backdrop
        showModal={showCreateExperienceModal}
        hideModal={handleModalVisibility}
      />
      {showCreateExperienceModal && (
        <div className="create-more-experience-modal">
          <h1 className="experience-modal__header">
            Erstelle weitere Experiences
          </h1>
          <p className="experience-modal__detail">
            Du willst <b>Unterricht</b> geben oder hast ein <b>Instrument</b>{" "}
            <br />
            rumstehen, dass du verleihen/verkaufen und zu Geld <br />
            machen kannst, möchtest dich für einen <b>Job</b> anbieten <br />
            oder ein <b>Konzert</b> veranstalten.
          </p>
          <ExperienceChoice handleSelection={handleSelectedExperience} />
          <div className="experience-modal__create-more-cta">
            <span>Jetzt weitere Inserate erstellen</span>
          </div>
          <div className="experience-modal__create-later">
            <span onClick={handleModalVisibility}>Danke, Nicht jetzt</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CreateMoreExperienceModal;
