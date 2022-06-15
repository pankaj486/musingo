import React, { useState, Fragment } from 'react'
import { FaFacebookF, FaTwitter, FaWhatsapp, FaFacebookMessenger, FaEnvelope, FaTumblr } from 'react-icons/fa';
import Cancel from './../../../assets/images/cancel-icon.png'
import Backdrop from '../../Backdrop/Backdrop'

import './SocialShare.css'


const SocialShare = props => {
  let [showSocialShare, toggleSocialShare] = useState(true);
  const handleModalVisibility = () => {
    toggleSocialShare(!showSocialShare)
  }
  let socialShareModalContent = (
    <div className="social-share">
      <span onClick={handleModalVisibility} className="social-share-cancel-button"><img src={Cancel} alt="cancel" /></span>
      <h3 className="teilen-heading">Teilen</h3>
      <div className="social-app-list">
        <a className="social-app" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <div className="social-app-icon-container facebook">
            <FaFacebookF/>
          </div>
          <span>Facebook</span>
        </a>
        <div className="social-app-divider"></div>
        <a className="social-app" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <div className="social-app-icon-container twitter">
            <FaTwitter/>
          </div>
          <span>Twitter</span>
        </a>
        <div className="social-app-divider"></div>
        <a className="social-app" href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          <div className="social-app-icon-container whatsapp">
            <FaWhatsapp/>
          </div>
          <span>Whatsapp</span>
        </a>
        <div className="social-app-divider"></div>
        <a className="social-app" href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer">
          <div className="social-app-icon-container messenger">
            <FaFacebookMessenger/>
          </div>
          <span>Messenger</span>
        </a>
        <div className="social-app-divider"></div>
        <a className="social-app" href="https://www.gmail.com/" target="_blank" rel="noopener noreferrer">
          <div className="social-app-icon-container email">
            <FaEnvelope/>
          </div>
          <span>E-mail Link kopieren</span>
        </a>
        <div className="social-app-divider"></div>
        <a className="social-app" href="https://www.tumblr.com/" target="_blank" rel="noopener noreferrer">
          <div className="social-app-icon-container tumblr">
            <FaTumblr/>
          </div>
          <span>Tumblr</span>
        </a>
      </div>
    </div>
  )
  return (
    <Fragment>
      <Backdrop
        showModal={showSocialShare}
        hideModal={handleModalVisibility}
      />
      {showSocialShare && socialShareModalContent}
    </Fragment>
  )
}

export default SocialShare