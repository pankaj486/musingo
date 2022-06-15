import React from 'react'

import ParticipantImageCard from './ParticipantImageCard/ParticipantImageCard'

import './Conversation.scss'

const Conversation = props => {
  let { name, image, chatHistory } = props.conversation
  let lastText = chatHistory[chatHistory.length - 1][name] || chatHistory[chatHistory.length - 1]["me"]
  // let wasLastMessageSeen = lastText
  return (
    <div className={`conversation ${!lastText.seen ? 'has-unread-text' : ''}`} onClick={props.handleActiveConversation}>
      <div className="participant-image-card-container">
        <ParticipantImageCard image={image} />
      </div>
      <div className="participant-details">
        <img className="participant-image" src={image} alt='participant' />
        <span className="participant-name">{name}</span>
          <p className={`last-text ${!lastText.seen ? 'bold' : ''}`}>{lastText.message}</p>
          <div className={`active-status ${!lastText.seen ? 'show' : ''}`}> </div>
      </div>
    </div>
  )
}

export default Conversation