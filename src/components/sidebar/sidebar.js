import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './sidebar.module.scss'

const Sidebar = React.memo(() => {
  let [activeId, setActiveId] = useState(0)
  let [list] = useState([
    { path: '/song-sheet', name: '歌单' },
    { path: '/ranking-list', name: '排行榜' },
    { path: '/singer', name: '歌手' }
  ])

  function select(index) {
    setActiveId(index)
  }

  return (
    <div className={style.sideInner}>
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => select(index)}
          className={`${style.item} ${
            activeId === index ? style.active : ''
            }`}
        >
          <Link to={item.path}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  )
})

export default Sidebar
