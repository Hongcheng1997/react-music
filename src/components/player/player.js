import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from '_axios'
import './player.scss'
import { connect } from 'react-redux'
import { setPlayStatus, setCurrentIndex } from '../../store/actions'

class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      musicId: 0
    }
  }

  componentDidMount() {
    this._audio = ReactDOM.findDOMNode(this.refs._audio)
    this.bindEvent()
  }

  getMusic(id) {
    if (!id || id === this.state.musicId) return
    axios('/song/url', {
      id
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          url: res.data[0].url,
          musicId: id
        })
      }
    })
  }

  bindEvent() {
    this._audio.addEventListener('canplay', () => this._audio.play())
    this._audio.addEventListener('ended', this.next)
  }

  next = () => {
    this.props.setCurrentIndex(this.props.currentIndex + 1)
  }

  prev() {
    this.props.setCurrentIndex(this.props.currentIndex - 1)
  }

  toggleStatus() {
    this.props.setPlayStatus(!this.props.playStatus)
    if (this.props.playStatus) {
      this._audio.pause()
    } else {
      this._audio.play()
    }
  }

  iconStatus() {
    return this.props.playStatus
      ? 'icon-bofangqi-zanting'
      : 'icon-bofangqi-bofang'
  }

  render() {
    const { playList, currentIndex } = this.props
    const currentMusic = playList[currentIndex] || {}
    this.getMusic(currentMusic.id)
    return (
      <div className="play">
        <div className="cutSong">
          <div className="left" onClick={() => this.prev()}>
            <i className="iconfont icon-bofangqi-xiayiji-copy"></i>
          </div>
          <div className="center" onClick={() => this.toggleStatus()}>
            <i className={`iconfont ${this.iconStatus()}`}></i>
          </div>
          <div className="right" onClick={() => this.next()}>
            <i className="iconfont icon-bofangqi-xiayiji"></i>
          </div>
        </div>
        <audio ref="_audio" src={this.state.url}></audio>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playStatus: state.playStatus,
  playList: state.playList,
  currentIndex: state.currentIndex
})

const mapDispatchToProps = dispatch => ({
  setPlayStatus: status => {
    dispatch(setPlayStatus(status))
  },
  setCurrentIndex: status => {
    dispatch(setCurrentIndex(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
