import React, { useState } from 'react'
import Post from './Post/Post'

import './Posts.scss'

const Posts = props => {
  const [loadMore, setLoadMore] = useState(false)
  const [posts] = useState([
    {
      id: 1,
      title: 'Suche Schlafplatz in Hamburg',
      name: 'Schlafplatz',
      details: 'Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche \n Schlafplatz in HamburgSuch'
    },
    {
      id: 2,
      title: 'Suche Schlafplatz in Hamburg',
      name: 'Schlafplatz',
      details: 'Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche \n Schlafplatz in HamburgSuch'
    },
    {
      id: 3,
      title: 'Suche Schlafplatz in Hamburg',
      name: 'Schlafplatz',
      details: 'Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche \n Schlafplatz in HamburgSuch'
    },
    {
      id: 4,
      title: 'Suche Schlafplatz in Hamburg',
      name: 'Schlafplatz',
      details: 'Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche \n Schlafplatz in HamburgSuch'
    },
    {
      id: 5,
      title: 'Suche Schlafplatz in Hamburg',
      name: 'Schlafplatz',
      details: 'Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche \n Schlafplatz in HamburgSuch'
    },
    {
      id: 6,
      title: 'Suche Schlafplatz in Hamburg',
      name: 'Schlafplatz',
      details: 'Suche Schlafplatz in HamburgSuche Schlafplatz in HamburgSuche \n Schlafplatz in HamburgSuch'
    },
  ])
  const handleLoadMore = () => {
    setLoadMore(prevState => !prevState)
  }
  return (
    <div className='posts-container'>
      <span className='posts-container__title'>Posts</span>
      <div className='posts'>
      {
        posts.map((post, index) => {
          if (!loadMore) {
            return index < 4 ? (
              <Post
                key={post.id}
                post={post}
              />
            ) : null
          }
          return (
            <Post
              key={post.id}
              post={post}
            />
          )
        })
      }
      </div>
      {
        !loadMore && <span className='posts--load-more' onClick={handleLoadMore}>Mehr laden</span>
      }
    </div>
    
  )
}

export default Posts