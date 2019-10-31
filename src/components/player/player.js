import React, { Component } from 'react'
import './player.scss'
import { connect } from 'react-redux'
import { setPlayStatus } from '../../store/actions'

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
          <div
            className="center"
            onClick={() => this.props.setPlayStatus(!this.props.playStatus)}
          >
            <i className={`iconfont ${this.iconStatus()}`}></i>
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

  iconStatus() {
    return this.props.playStatus
      ? 'icon-bofangqi-zanting'
      : 'icon-bofangqi-bofang'
  }
}

const mapStateToProps = state => ({
  playStatus: state.playStatus
})

const mapDispatchToProps = dispatch => ({
  setPlayStatus: status => {
    dispatch(setPlayStatus(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
