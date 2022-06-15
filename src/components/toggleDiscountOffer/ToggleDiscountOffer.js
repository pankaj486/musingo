import React, { useRef, useState } from 'react'

import './ToggleDiscountOffer.scss'

const ToggleDiscountOffer = props => {
  const checkBox = useRef(null)
  return (
    <div className='toggle-button'>
      <input
        type={'checkbox'}
        id={'toggle-checkbox'}
        checked={props.offerDiscount}
        onChange={() => props.handleChange(!props.offerDiscount)}
        ref={checkBox}
      />
      <label className={'toggle-switch'} onClick={() => checkBox.current.click()}/>
    </div>
  )
}

export default ToggleDiscountOffer