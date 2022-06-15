import React from 'react'

import MyImage from './../../../../../../assets/images/model.png'

import './Message.scss'

const Message = props => {
  return props.text.hasOwnProperty(props.textFrom) ? (
    <div className="message-container participant">
      <img src={props.image} alt="participant"/>
      <div className={`message ${!props.text[props.textFrom].seen ? 'unread-message': ''}`}>
        {props.text[props.textFrom].message}
      </div>
    </div>
  ) : (
    <div className="message-container me">
      <div className={`message ${!props.text["Me"].seen ? 'unread-message': ''}`}>
        {props.text["Me"].message}
      </div>
      <img src={MyImage} alt="me"/>
    </div>
  )
}

export default Message