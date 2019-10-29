import React from 'react'
import './play.scss'

class Play extends React.Component {
  render() {
    return (
      <div className="play">
        <div className="cutSong">
          <div className="left"><i className="iconfont icon-bofangqi-xiayiji-copy"></i></div>
          <div className="center"><i className="iconfont icon-bofangqi-bofang"></i></div>
          <div className="right"><i className="iconfont icon-bofangqi-xiayiji"></i></div>
        </div>
      </div>
    )
  }
}

export default Play
