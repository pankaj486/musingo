import React from 'react'

import './EmptyConversationTemplate.scss'


const EmptyConversationTemplate = props => {
  return (
    <div className="empty-conversation">
      <div className="empty-conversation--layout">
        <div className="empty-field-text"> </div>
        <div className="empty-field-image spacing"> </div>
      </div>
      <div className="empty-conversation--layout second">
        <div className="empty-field-image"> </div>
        <div className="empty-field-text spacing"> </div>
      </div>
      <div className="empty-conversation--layout">
        <div className="empty-field-text"> </div>
        <div className="empty-field-image spacing"> </div>
      </div>
      
    </div>
  )
}

export default EmptyConversationTemplate