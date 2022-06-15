import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Anbieten from "../../assets/images/new/image1.png";
import Community from "../../assets/images/new/image2.png";



export type CreateProfileTypeFormProps = {
  onNext: () => void;
};

export const CreateProfileSearchForm: React.FC<CreateProfileTypeFormProps> = ({
  onNext,
}) => {

const [clicked, setClicked] = useState(0)

  return (
    <div className="d-flex flex-column  text-center p-5 dynamicHeight">
      <div>
        <h2>Woran bist du interessiert?</h2>
        {/* <p className="pt-3 pt-sm-0 px-4 px-sm-0 medium-font">
          Sag der Community, was am besten zu dir passt
        </p> */}
      </div>
      <div className="d-flex justify-content-center pt-5">
        <div className={clicked == 1 ? "regi-items-clicked" : "regi-items"} onClick={()=> setClicked(1)}>
          <AiOutlineSearch className="mt-4" color="#00e2cb" size={25} />
          <p>Finden</p>
        </div>
        <div className={clicked == 2 ? "regi-items-clicked" : "regi-items"} onClick={()=> setClicked(2)}>
          <img className="mt-4" src={Anbieten} />
          <p>Anbieten</p>
        </div>
        <div className={clicked == 3 ? "regi-items-clicked" : "regi-items"} onClick={()=> setClicked(3)}>
          <img className="mt-4" src={Community} />
          <p>Community</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          style={{ width: "100%" }}
          className="btn btn-primary musingoo-button mx-0 mt-3 mt-sm-3 small-font text-white font-weight-bold"
        >
          Fertig
        </button>
        <button
          className="pt-2 pt-sm-4 text-black-30 btn btn-link"
          onClick={() => onNext()}
        >
          Überspringen
        </button>
      </div>
    </div>
  );
};
