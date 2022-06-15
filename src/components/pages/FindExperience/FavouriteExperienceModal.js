import React, { Fragment, useRef } from 'react'
import Package from '../../package/Package'
import Background from '../../../assets/images/modalBackground.png'
import Model from '../../../assets/images/model.png'
import Trash from '../../../assets/images/Trash.png'
import CancelIcon from '../../../assets/images/cancel-icon.png'
import avatarPlaceholder from '../../../assets/images/placeholder/avatar.png';


import './FavouriteExperienceModal.scss'

const FavouriteExperienceModal = props => {
  const checkbox = useRef(null)
  const checkBoxes = useRef([])
  checkBoxes.current = []
  const addToCheckboxes = (element) => {
    if (element && !checkBoxes.current.includes(element)) {
      console.log('element: ', element)
      checkBoxes.current.push(element)
    }
  }
  let controls = (
    <div className="fav-experiences__edit-option fav-experiences-option">
      <span className="fav-experiences__edit" onClick={props.handleToggleEditExperience}>Bearbeiten</span>
    </div>
  )
  if (props.editExperiences) {
    controls = (
      <div className="fav-experiences__delete-option fav-experiences-option">
        <span className="fav-experiences__finished" onClick={props.handleFertigClick}>Fertig</span>
        <div className="fav-experiences__delete" onClick={props.selectedExperiencesToDelete.length ? props.handleDeleteExperience : () => { }}>
          <img src={Trash} alt="trash" />
          <span>Löschen</span>
        </div>
      </div>
    )
  }

  function getAvatar(avatar) {
    if (avatar) {
        return avatar
    }
    return avatarPlaceholder
}

  return (
    <div className={`fav-experiences-modal ${props.editExperiences ? 'editable' : ''}`} style={{ display: props.showModal ? 'block' : 'none' }}>
      <div className="close-filter-button" onClick={props.handleHideModal}>
        <img src={CancelIcon} alt="cancel" />
      </div>
      {
        (props.showModal) ? (
          <Fragment>
            <h4 className="fav-experiences__title">Meine Favoritenliste ♥</h4>
            <div className="fav-experiences__controls">
              {controls}
            </div>
            <div className="fav-experiences-list">
              {props.favourites.map((item, index) => (
                <div className="fav-experience-wrapper" key={index}>
                  <input type="checkbox"
                    style={{ display: "none" }}
                    className="fav-experience-select"
                    onClick={() => props.handleExperienceSelect(item.id)}
                    ref={addToCheckboxes}
                  />
                  <div
                    className={`fav-experience-select ${props.selectedExperiencesToDelete.includes(item.id) ? 'fav-experience-select-checked' : ''}`}
                    onClick={() => checkBoxes.current[index].click()}>
                    <img src={CancelIcon} alt="cancel" />
                  </div>
                  <div className="fav-experience"
                    onClick={() => props.handleExperienceSelect(item.id)}
                  >
                    <Package
                      isFavourite={props.favourites.some(fav => fav.id === item.id)}
                      backgroundImage={item?.banner?.image}
                      title={item.title}
                      modelImage={getAvatar(item?.owner?.avatar)}
                      price={item.base_unit_amount}
                      onClick={props.handleExperienceSelect}
                      typeFilter={'video'}
                    // favPackageClassName={'fav-experiences--package'}
                    // handleFavExperienceSelect={(event) => props.handleFavExperienceSelect(event, item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        ) : null
      }
    </div>
  )
}

export default FavouriteExperienceModal