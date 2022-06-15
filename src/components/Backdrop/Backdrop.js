import React from 'react'

import './Backdrop.css'

const Backdrop = props => {
  return props.showModal && <div className="social-share-backdrop" onClick={props.hideModal}> </div>
}

export default Backdrop