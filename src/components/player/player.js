import React, { Component } from 'react'
import './player.scss'
import { connect } from 'react-redux'
import { setNum } from '../../store/actions'

class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="play">
        <div className="cutSong">
          <div className="left">
            <i className="iconfont icon-bofangqi-xiayiji-copy"></i>
          </div>
          <div className="center">
            <i className="iconfont icon-bofangqi-bofang"></i>
          </div>
          <div className="right">
            <i className="iconfont icon-bofangqi-xiayiji"></i>
          </div>
        </div>
        <audio
          ref="_audio"
          src="http://m7.music.126.net/20191031153417/b74385bc92b868a78a2e8c9830948c1c/ymusic/5258/075f/065b/e24cfdda6a05bc4d9000117767b958ae.mp3"
        ></audio>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  num: state.num
})

const mapDispatchToProps = dispatch => ({
  setNum: status => {
    dispatch(setNum(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
