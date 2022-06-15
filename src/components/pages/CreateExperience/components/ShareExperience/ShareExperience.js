import React from 'react'
import { FaEnvelope, FaFacebookF, FaFacebookMessenger, FaTumblr, FaTwitter, FaWhatsapp } from 'react-icons/fa/index'

import './ShareExperience.scss'

const ShareExperience = props => {
  return (
    <div className='experience-share'>
      <h1 className='share__header'>
        <span className='header--red'>Share </span>
        <span className='header--green'>your </span>
        <span className='header--orange'>experience</span>
      </h1>
      <p>
        Es dauert nur wenige Sekunden, kann für dich aber die nächste Buchung <br/>
        bedeuten. Teile deine Experience in deinem Network.
      </p>
      <div className='share__copy-link'>
        <input
          className='copy-link__input'
          type='text'
          // value='https://musingoo.de/kjahsdhlasdlasjd/max'
        />
        <div className='copy-link__cta'>
          <span>Link kopieren</span>
        </div>
      </div>
      <div className="share__platform">
        <a className="platform__link" href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer">
          <div className="platform__type messenger">
            <FaFacebookMessenger/>
          </div>
        </a>
        <a className="platform__link" href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          <div className="platform__type whatsapp">
            <FaWhatsapp/>
          </div>
        </a>
        <a className="platform__link" href="https://www.gmail.com/" target="_blank" rel="noopener noreferrer">
          <div className="platform__type email">
            <FaEnvelope/>
          </div>
        </a>
        <a className="platform__link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <div className="platform__type facebook">
            <FaFacebookF/>
          </div>
        </a>
        <a className="platform__link" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <div className="platform__type twitter">
            <FaTwitter/>
          </div>
        </a>
        <a className="platform__link" href="https://www.tumblr.com/" target="_blank" rel="noopener noreferrer">
          <div className="platform__type tumblr">
            <FaTumblr/>
          </div>
        </a>
      </div>

    </div>
  )
}

export default ShareExperience