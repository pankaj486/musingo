import React from 'react'


import './AboutTheExperience.scss'
import BookingBackground from './../../../../assets/images/experience-bg.png'
import Instructor from './../../../../assets/images/instructor.png'

import './AboutTheExperience.scss'

const AboutTheExperience = props => {
  return (
    <div className={`booking__about-experience ${props.chat ? 'chat' : ''}`} style={{backgroundImage: `url(${BookingBackground})`}}>
      {
        props.emptyInbox && <div className="experience--empty-inbox"> </div>
      }
      <div className="about-experience-details">
        <div className="about-experience-header">
          <h2 className="about-experience-title">Learn Djambe traditionally</h2>
          <h3 className="about-experience-group">Gruppe C</h3>
        </div>
        <p className="about-experience-text">Über die Experience</p>
        <div className="about-experience-lessons">
          <div className="about-experience-lessons-top">
            <span className="about-experience-lessons-a">Einzelunterricht</span>
            <span className="about-experience-lessons-b">Gitarrenunterricht</span>
          </div>
          <div className="about-experience-lessons-bottom">
            <span className="about-experience-lessons-c">Zweiwöchentlich</span>
          </div>
        </div>
        <div className="about-experience-members">
          <span>Mitglieder</span>
          <div className="about-experience-members">
            <img src={Instructor} alt="members" imgcount="1" />
            <img src={Instructor} alt="members" imgcount="2" />
            <img src={Instructor} alt="members" imgcount="3" />
            <img src={Instructor} alt="members" imgcount="4" />
          </div>
        </div>
        <div className="about-experience-other-details">
          <p>Termin</p>
          <p>Mittwochs, 15 Uhr</p>
          <p>Ort</p>
          <p>Grindelalle 20, 20147 Hamburg</p>
        </div>
      </div>
    </div>
  )
}

export default AboutTheExperience