import React from 'react'
import { Link } from 'react-router-dom'
import SliderBlock from '../slider-block/slider-block'
import style from './recommend-songs.module.scss'

const RecommendSongs = props => {
  const { data } = props
  return (
    <div className={style.RecommendSongs}>
      <p className={style.songTitle}>精选歌单</p>
      <ul>
        {data.map((item, key) => (
          <Link key={key} to={`/song-sheet-details/${item.id}`}>
            <li>
              <div className={style.blockWrap}>
                <SliderBlock item={item}></SliderBlock>
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
