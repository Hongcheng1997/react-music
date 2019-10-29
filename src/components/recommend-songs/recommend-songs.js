import React from 'react'
import PropTypes from 'prop-types'
import './recommend-songs.scss'

const RecommendSongs = props => {
  const { data } = props
  return (
    <div className="RecommendSongs">
      <p className="song-title">推荐歌单</p>
      <ul>
        {data.map((item, key) => (
          <li key={key}>
            <div>
              <img src={item.picUrl} alt=""></img>
            </div>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

RecommendSongs.prototype = {
  data: PropTypes.any.isRequired
}

export default RecommendSongs
