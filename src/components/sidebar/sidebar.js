import React from 'react'
import { Link } from 'react-router-dom'
import style from './sidebar.module.scss'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      activeId: 0
    }
  }

  render() {
    const list = [
      { path: '/discover', name: '个性推荐' },
      { path: '/ranking-list', name: '排行榜' },
      { path: '/singer', name: '歌手' },
      { path: '/song-sheet', name: '歌单' }
    ]
    const { activeId } = this.state
    return (
      <div className={style.sideInner}>
        {list.map((item, index) => (
          <div
            className={`${style.item} ${activeId === index ? style.active : ''}`}
            onClick={() => this.select(index)}
          >
            <Link to={item.path}>
              <i className="iconfont icon-music"></i>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    )
  }

  select(index) {
    this.setState({
      activeId: index
    })
  }
}

export default Sidebar
