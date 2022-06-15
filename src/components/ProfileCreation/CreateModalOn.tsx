import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export type CreateModalOn = {
  onNext: () => void;
};

export const CreateModalOn: React.FC<CreateModalOn> = ({ onNext }) => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center text-center modal-regi dynamicHeight">
        <Fragment>
          <h2 className="last-modal-title">
            {" "}
            Reichweite erhöhen? Freunde einladen{" "}
          </h2>
          <p className="last-modal-des">
            Lade deine Freunde ein sich mit dir auf Musingoo zu connecten.
            Dadurch bekommst du mehr Reichweite und Follower.{" "}
          </p>
          <h4 className="last-modal-subtitle"> Kontakte einladen via </h4>
          <Link
            to={{
              pathname: "/inviteFriendModal",
            }}
            className="cursor-pointer helvetica"
          >
            <div className="sync-block" onClick={onNext}>
              <h3>Sync.</h3>
              <h3>Friends</h3>
            </div>
          </Link>

          <p className="Überspringen">Überspringen</p>

          {/* <div className="d-flex align-items-center mt-3 justify-content-center">
                        <img className="modal-img" src={Gmail} />
                        <img className="modal-img" src={Outlook} />
                        <img className="modal-img" src={Yahoo} />
                        <img className="modal-img" onClick={() => setIsVisible(true)} src={Mail} />
                    </div> */}
        </Fragment>
      </div>
    </>
  );
};
