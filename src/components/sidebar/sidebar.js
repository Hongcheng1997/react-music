import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sideInner">
        <div>
          <Link to="/discover">
            <i className="iconfont icon-music"></i>个性推荐
          </Link>
        </div>
        <div>
          <Link to="/ranking-list">
            <i className="iconfont icon-music"></i>排行榜
          </Link>
        </div>
        <div>
          <Link to="/singer">
            <i className="iconfont icon-music"></i>歌手
          </Link>
        </div>
        <div>
          <Link to="/song-sheet">
            <i className="iconfont icon-music"></i>歌单
          </Link>
        </div>
      </div>
    )
  }
}

export default Sidebar
