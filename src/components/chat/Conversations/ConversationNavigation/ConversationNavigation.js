import React from 'react'

import './ConversationNavigation.scss'

const ConversationNavigation = props => {
  return (
    <div className="conversation-navigation">
      <div className={`conversation-navigation--providers ${props.conversationType === 'provider' && 'selected'}`} onClick={() => props.handleConversationTypeChange('provider')}>
        <span>Anbieter</span>
      </div>
      <div className={`conversation-navigation--customers ${props.conversationType === 'customer' && 'selected'}`} onClick={() => props.handleConversationTypeChange('customer')}>
        <span>Kunde</span>
      </div>
    </div>
  )
}

export default ConversationNavigation