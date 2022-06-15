import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Anbieten from "../../assets/images/new/image1.png";
import Community from "../../assets/images/new/image2.png";

const SetupStep4 = ({ handleClick, currentStep, steps }) => {

  const [clicked, setClicked] = useState(0)

  return (
    <div>
      {" "}
      <div className="py-5 text-center mx-auto">
        <h1 className="upload-file__heading">Woran bist du interessiert?</h1>
        <div className="d-flex justify-content-center pt-5">
        <div className={clicked == 1 ? "regi-items-clicked" : "regi-items"} onClick={()=> {setClicked(1); handleClick("next")}}>
          <AiOutlineSearch className="mt-4" color="#00e2cb" size={25} />
          <p>Finden</p>
        </div>
        <div className={clicked == 2 ? "regi-items-clicked" : "regi-items"} onClick={()=> {setClicked(2); handleClick("next")}}>
          <img className="mt-4" src={Anbieten} />
          <p>Anbieten</p>
        </div>
        <div className={clicked == 3 ? "regi-items-clicked" : "regi-items"} onClick={()=> {setClicked(3); handleClick("next")}}>
          <img className="mt-4" src={Community} />
          <p>Community</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SetupStep4;
