import React from 'react'

import ProgressBar  from '../../progressBar/ProgressBar'
import BackgroundImage from '../../../assets/images/experience-bg.png'
import Curve from '../../../assets/images/curve.svg'

import './Loader.scss'

const Loader = props => {
  return (
    <div className="loader">
      <div className="loader-image-container">
        <div className="background-image">
          <img src={BackgroundImage} alt="background" />
        </div>
        <img className="curve-background" src={Curve} alt="background" />
      </div>
      <div className="loader--top-content">
        <h3>Just a Sec ...</h3>
        <p>Wir bereiten alles für dich vor</p>
        <ProgressBar />
      </div>
      <div className="loader--bottom-content">
        <p>By the way: Wusstest du schon, dass du auf Musingoo auch Instrumente verkaufen kannst?</p>
      </div>
      
    </div>
  )
}

export default Loader