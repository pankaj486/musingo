import React from 'react'

import Model from './../../../../../assets/images/model.png'

import './Post.scss'

const Post = props => {
  return (
    <div className='trainer-post'>
      <div className='post__header'>
        <div className='header--posted-by'>
          <img src={Model} alt={'post'} />
          <span>Dimi</span>
          <div className='post-folgen'>
            <span>Folgen</span>
          </div>
        </div>
        <div className='header--post-time'><p>Vor einer <br/>Stunde</p></div>
      </div>
      <div className='post__body'>
        <p className='post-title'>{props.post.title}</p>
        <div className='post-name'>
          <span>{props.post.name}</span>
        </div>
        <div className='post-details'>
          <p>{props.post.details}</p>
        </div>
      </div>
    </div>
  )
}

export default Post