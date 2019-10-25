import React from 'react'
import './sidebar.scss'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sideInner">
        <p>
          <i className="iconfont icon-music"></i>个性推荐
        </p>
        <p>
          <i className="iconfont icon-music"></i>排行榜
        </p>
        <p>
          <i className="iconfont icon-music"></i>歌手
        </p>
        <p>
          <i className="iconfont icon-music"></i>歌单
        </p>
      </div>
    )
  }
}

export default Sidebar
