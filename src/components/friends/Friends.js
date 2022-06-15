import React, { Fragment, useState } from 'react'

import Friend from './Friend/Friend'
import './Friends.scss'

const Friends = props => {
  let [friends, setFriendsState] = useState([
    {
      id: 1,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll
    },
    {
      id: 2,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll
    },
    {
      id: 3,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll

    },
    {
      id: 4,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll

    },
    {
      id: 5,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll

    },
    {
      id: 6,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll

    },
    {
      id: 7,
      name: 'Felix Kettner',
      email: 'felix@kjahsfjh.de',
      isSelected: !!props.selectAll
    }
  ])
  let [allSelected, changeAllSelected] = useState(false)
  const handleSelectAll = () => {
    if (!allSelected) {
      let updatedFriendsList = [...friends]
      updatedFriendsList.map(friend => {
        friend.isSelected = true
      })
      setFriendsState(updatedFriendsList)
      changeAllSelected(true)
    }
  }

  const selectHandler = id => {
    let updatedFriendsList = [...friends]
    let index = updatedFriendsList.findIndex(friend => {
      return friend.id === id
    })
    updatedFriendsList[index].isSelected = !updatedFriendsList[index].isSelected
    setFriendsState(updatedFriendsList)
    !updatedFriendsList[index].isSelected && changeAllSelected(false)
  }

  return (
    <Fragment>
      <p className="select-all-friends" onClick={handleSelectAll}>Alle markieren</p>
      <div className="friends-list">
        {
          friends.length &&
          friends.map(
            friend =>
              <Friend
                key={friend.id}
                {...friend}
                selectHandler={() => {
                  selectHandler(friend.id)
                }}
              />
          )
        }
      </div>
    </Fragment>
  )
}

export default Friends