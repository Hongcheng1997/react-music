import React from 'react'
import style from './recommend-songs.module.scss'
import { Link } from 'react-router-dom'


const RecommendSongs = props => {
  const { data } = props
  return (
    <div className={style.RecommendSongs}>
      <p className={style.songTitle}>推荐歌单</p>
      <ul>
        {data.map((item, key) => (
          <Link key={key} to={`/song-sheet-details/${item.id}`}>
            <li>
              <div>
                <img src={item.picUrl} alt=""></img>
              </div>
              <p>{item.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default RecommendSongs
