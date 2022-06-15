import React, { Fragment } from 'react'
import ProgressBar from '../../progressBar/ProgressBar'
import LessonsImage from './../../../assets/images/Lessons.jpg'
import JobsImage from './../../../assets/images/Jobs.jpg'
import ConcertsImage from './../../../assets/images/Concerts.jpg'
import InstrumentsImage from './../../../assets/images/Instruments.jpg'
import KidsImage from '../../../assets/images/Kids.jpg'
import './FilterTypeModal.scss'

const FilterTypeModal = props => {
  let title = ''
  let footer = ''
  let img = null
  switch (props.modalType) {
    case 'Unterricht':
      title = 'Lessons'
      footer = 'Lesson'
      img = LessonsImage
      break
    case 'Instrumente':
      title = 'Instruments'
      footer = 'Instrument'
      img = InstrumentsImage
      break
    case 'Jobs':
      title = 'Jobs'
      footer = 'Job'
      img = JobsImage
      break
    case 'Konzerte':
      title = 'Concerts'
      footer = 'Concert'
      img = ConcertsImage
      break
    case 'Kids':
      title = 'Kids'
      footer = 'Kid'
      img = KidsImage
      break
  }
  return (
    <div >
      {
        props.showModal ? (
          <Fragment>
            <div className="filter-type-modal-backdrop" style={{
              display: props.showModal ? 'block' : 'none',
              zIndex: '1000000'
            }}> </div>
            <div className="filter-type-modal" style={{
              display: props.showModal ? 'flex' : 'none',
              backgroundImage: `url(${img})`,
              zIndex: '1000000',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <div className="filter-type-modal-overlay"> </div>
              <div className="modal__title">
                <span>Willkommen<br />bei {title}</span>
              </div>
              <div style={{ margin: 'auto', width: '100%' }}>
                <ProgressBar width="60%" filterTypeModalType={props.modalType} />
              </div>
              <div className="modal__footer">
                <span>Lade {footer} Experiences</span>
              </div>
            </div>
          </Fragment>
        ) :
          null
      }
    </div>
  )
}

export default FilterTypeModal
