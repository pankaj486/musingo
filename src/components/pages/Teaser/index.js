import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import useWindowResize from "src/custom-hooks/useWindowResize";
import { Player } from "video-react";
import video from "../../../assets/video/musingooVideo.mp4";
import video2 from "../../../assets/video/bgVideo.mov";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { PulseLoader } from "react-spinners";
import CountdownTimer from "react-component-countdown-timer";



const Teaser = ({ toggleNavBar }) => {
  const { dimensions, height } = useWindowResize();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [videoState, setVideoState] = useState(null);
  const [hasEnded, setHasEnded] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onRegister = () => {
    setLoading(true);
    if (firstName !== "" && email !== "")
      axios
        .post(
          (API_BASE_URL ?? "http://localhost:8000/api/") +
          "/add-teaser-contact/",
          {
            firstname: firstName,
            email: email,
          }
        )
        .then((response) => {
          console.log(response);
          alert("Registered Successfully!");
        })
        .catch((error) => {
          console.log(error.response);
          alert("We couldn't sign you up at the moment, try again later");
        })
        .finally(() => setLoading(false));
    else {
      setLoading(false);
      alert("Please enter a valid name or email to continue");
    }
  };

  const onEnd = () => {
    setHasEnded(true);
  }

  return (
    <div className="">
      <div className={hasEnded ? "d-none" : "d-block"}>
        <div className="parent-element-to-video">
          <video onEnded={() => onEnd()} autoPlay={true} muted ref={ref} width={'100%'} src={video}>
          </video>
        </div>
      </div>

      {hasEnded && (
        <>
          <div className="wrap-video">
            <div className="mid d-flex align-items-center flex-column">
              <h2>Coming soon!</h2>
              <div >
                <CountdownTimer
                  count={2255432}
                  showTitle
                  size={52}
                  labelSize={25}
                  color="#fff" backgroundColor="transparent"
                />
              </div>
              <h3>Register for FIRST MEMBER STATUS</h3>
              <form className="d-flex justify-content-between mt-0 mt-md-5">
                <input
                  placeholder="Dein Vorname"
                  className="input"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  placeholder="Dein Mailadresse"
                  className="input mx-5"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    onRegister();
                  }}
                >
                  {loading ? (
                    <PulseLoader color="white" size={10} />
                  ) : (
                    <>Register Me</>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="parent-element-to-video">
            <video ref={ref2} width={'100%'} autoPlay={true} loop muted controls src={video2}>
            </video>
          </div>
        </>
      )}
    </div>
  );
};

export default Teaser;
