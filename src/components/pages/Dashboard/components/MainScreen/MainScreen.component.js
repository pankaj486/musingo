import {
  faMicrophone, faMicrophoneSlash, faPhone, faVideo, faVideoSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import AvatarImage from 'src/assets/images/instructor.png';
import ExperienceChatBox2 from "src/components/experience/experienceChatBox2";
import "./MainScreen.scss";


const initChatHistory = [
  {
    avatar: AvatarImage,
    name: 'Mike',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
    isSender: false
  },
  {
    avatar: AvatarImage,
    name: 'Ich',
    message: 'Dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
    isSender: true
  },
  {
    avatar: AvatarImage,
    name: 'Mike',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
    isSender: false
  },
  {
    avatar: AvatarImage,
    name: 'Ich',
    message: 'Dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
    isSender: true
  },
  {
    avatar: AvatarImage,
    name: 'Mike',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
    isSender: false
  },
  {
    avatar: AvatarImage,
    name: 'Ich',
    message: 'Dolor sit amet, consectetur adipiscing elit. Ut mollis, odio id aliquet euismod.',
    isSender: true
  },
]
const MainScreen = (props) => {

  const [streamState, setStreamState] = useState({
    mic: true,
    video: true,
    screen: false,
  });
  const [chatHistory, setChatHistory] = useState(initChatHistory)
  const [chatBoxInputText, setChatBoxInputText] = useState('')



  return (
    <div className="wrapper-meet">
      <div className="row" style={{marginTop:'5.25rem'}}>
        <div className="col-9">
          <div className="main-screen">
            <div className="row">
              <div className="col-7">
                <div class="video-container">
                  <video controls muted id="video-bg2">
                    <source src={'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
                  </video>
                  <h2 className="name">James Bond</h2>
                </div>
              </div>
              <div className="col-5">
                <div>
                  <div class="video-container2">
                    <video controls muted id="video-bg">
                      <source src={'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
                    </video>
                    <h2 className="name">James Bond</h2>
                  </div>
                  <div class="video-container2">
                    <video controls muted id="video-bg">
                      <source src={'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
                    </video>
                    <h2 className="name">James Bond</h2>
                  </div>
                  <div class="video-container2">
                    <video controls muted id="video-bg">
                      <source src={'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
                    </video>
                    <h2 className="name">James Bond</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="col-3">
          <ExperienceChatBox2
            onClickZumChatButton={() => console.log('Clicked Zum Chat Button')}
            chatHistory={chatHistory}
            chatBoxInput={chatBoxInputText}
            onChangeChatBoxInput={event => setChatBoxInputText(event.target.value)}
            onSubmitChatInput={event => {
              event.preventDefault()
              console.log('Submitted Chat Input Text: ', chatBoxInputText)
              setChatBoxInputText('')
            }}
            btn
          />
        </div>
        <div className="footer">
          <div className="meeting-footer">
            <div className="meeting-icon">
              <p>Post a screenshot</p>
            </div>
            <div
              className={"meeting-icons " + (!streamState.mic ? "active" : "")}
              data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
            >
              <FontAwesomeIcon
                icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
                title="Mute"
              />
            </div>
            <div
              className={"meeting-icons " + (!streamState.video ? "active" : "")}
              data-tip={streamState.video ? "Hide Video" : "Show Video"}
            >
              <FontAwesomeIcon icon={!streamState.video ? faVideoSlash : faVideo} />
            </div>
            <div
              className="meeting-icons2 active"
              data-tip="Share Screen"
              disabled={streamState.screen}
            >
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <ReactTooltip />
          </div>
        </div>
      </div>
    </div>
  );
};


export default MainScreen;
