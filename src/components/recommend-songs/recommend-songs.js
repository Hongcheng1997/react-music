import React from 'react'
import './recommend-songs.scss'

const RecommendSongs = props => {
  return (
    <div className="RecommendSongs">
      <p className="song-title">推荐歌单</p>
      <ul>
        {props.data.map(item => (
          <li>
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

export default RecommendSongs
