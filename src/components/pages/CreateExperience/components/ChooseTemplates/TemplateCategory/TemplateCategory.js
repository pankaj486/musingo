import React from 'react'

import './TemplateCategory.scss'

const TemplateCategory = props => {
  return (
    <div className={`active-template ${props.title.toLowerCase()}`}>
        {
          props.images.map((image, index) => {
            return (
              <div key={index} className={`template ${props.selectedTemplate === image ? 'selected': ''}`} onClick={() => props.handleSelectedTemplate(image)}><img src={image} alt={`${props.title} ${index + 1}`}/></div>
            )
          })
        }
    </div>
  )
}

export default TemplateCategory