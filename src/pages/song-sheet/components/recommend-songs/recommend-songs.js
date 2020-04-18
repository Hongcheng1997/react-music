import React from 'react'
import { Link } from 'react-router-dom'
import SliderBlock from '../slider-block/slider-block'
import style from './recommend-songs.module.scss'

const RecommendSongs = React.memo(props => {
  const { data } = props
  return (
    <div className={style.RecommendSongs}>
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
})

export default RecommendSongs
