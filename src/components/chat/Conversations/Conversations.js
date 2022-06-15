import React, { Fragment } from 'react'
import Conversation from './Conversation/Conversation'
import ConversationNavigation from './ConversationNavigation/ConversationNavigation'

import './Conversations.scss'

const Conversations = props => {
  const { conversations } = props.conversations
  return (
    <div className="conversations">
      <ConversationNavigation
        handleConversationTypeChange={props.handleConversationTypeChange}
        conversationType={props.conversationType}
      />
      <div className="conversations-list">
        {
          props.activeConversation !== null ?
          props.conversations.map(conversation => {
            if (props.conversationType === conversation.type) {
              return <Conversation
                conversation={conversation}
                handleActiveConversation={() => props.handleActiveConversation(conversation.id)}
                key={conversation.id}
              />
            }
          }) : (
              <div className="empty-inbox-message">
                <p>
                  Du hast keine
                  Konversationen in deiner
                  Inbox
                </p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Conversations