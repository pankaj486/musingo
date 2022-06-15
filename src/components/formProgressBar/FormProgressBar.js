import React, { useState } from "react";

import "./FormProgressBar.scss";

const FormProgressBar = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleHeaderClick = (index) => {
    setSelectedIndex(index);
    props.handleProgress(index + 1);
  };

  return (
    <div className="form-progress-bar">
      <div className="d-flex flex-column">
        <div
          className="d-flex justify-content-around mb-3 pt-5 pt-sm-2"
          style={{ order: props.width <= 1024 ? "2" : "1" }}
        >
          {/*{*/}
          {/*  props.headers.map(*/}
          {/*    (header, index) => {*/}
          {/*      return <Fragment key={index}>*/}
          {/*        {(props.width > 1024 || (props.width < 1024 && props.progress === 1)) && <span className={"cursor-pointer " + (selectedIndex === index ? 'font-weight-bold' : '')} onClick={() => { handleHeaderClick(index) }}>{header}</span>}*/}
          {/*      </Fragment>*/}
          {/*    }*/}
          {/*  )*/}
          {/*}*/}

          {/* {(props.width > 1024 || (props.width < 1024 && props.progress === 2)) && <span className={"cursor-pointer " + (props.progress === 2 ? 'font-weight-bold' : '')} onClick={() => {props.handleProgress(2) }}>{props.headers[1]}</span>} */}
          {/* {(props.width > 1024 || (props.width < 1024 && props.progress === 3)) && <span className={"cursor-pointer " + (props.progress === 3 ? 'font-weight-bold' : '')} onClick={() => {props.handleProgress(3) }}>{props.headers[2]}</span>} */}
        </div>
        <div
          className="progress"
          style={{
            marginBottom: "30px",
            borderRadius: "1rem",
            order: props.width <= 1024 ? "1" : "2",
            width: props.width >= 1024 ? "870px" : "100%",
          }}
        >
          <div
            className="progress-bar bg-primary"
            style={{
              width: props.progressPercentage,
            }}
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgressBar;
