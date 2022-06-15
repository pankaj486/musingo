import React, { useState } from 'react'

import './Friend.css'

const Friend = props => {
  return (
    <div className="friend">
      <div className="friend__image-container"></div>
      <div className="friend__info">
        <p className="friend__name">{props.name}</p>
        <p className="friend__email">{props.email}</p>
      </div>
      <div className="friend-select" onClick={props.selectHandler}>
        {props.isSelected && <span className="is-selected"> </span>}
      </div>
    </div>
  )
}

export default Friend