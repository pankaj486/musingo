import React from 'react'

import Message from './Message/Message'

import './ChatHistory.scss'

const ChatHistory = props => {
  let { chatHistory } = props.chatHistory
  return (
    <div className="chat-history">
      <div className="chat-history--messages">
      {
        chatHistory.map((chat, index) => {
          return <Message
            key={index}
            text={chat}
            image={props.chatHistory.image}
            textFrom={props.chatHistory.name}
          />
        })
      }
      </div>
      <textarea onChange={props.handleChange}/>
      <button className="send-message">Senden</button>
    </div>
  )
}

export default ChatHistory