import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from '_axios'
import { connect } from 'react-redux'
import { getPlayStatusAction, getCurrentIndexAction } from '../../store/actionCreators'
import Progress from '../progress/progress'
import style from './player.module.scss'

class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      musicId: 0,
      currentTime: 0,
      volume: 0
    }
  }

  render() {
    const { playList, currentIndex } = this.props
    const { currentTime, volume, url } = this.state
    const currentMusic = playList[currentIndex] || {}
    return (
      <div className={style.play}>
        <div className={style.cutSong}>
          <div className={style.left} onClick={() => this.prev()}>
            <i className="iconfont icon-bofangqi-xiayiji-copy"></i>
          </div>
          <div className={style.center} onClick={() => this.toggleStatus()}>
            <i className={`iconfont ${this.iconStatus()}`}></i>
          </div>
          <div className={style.right} onClick={() => this.next()}>
            <i className="iconfont icon-bofangqi-xiayiji"></i>
          </div>
        </div>
        <div className={style.progressWrap}>
          <Progress
            proportion={currentTime / currentMusic.dt}
            currentTime={currentTime}
            totalTime={currentMusic.dt}
            showTimer="true"
            setPoint={this.setMusicTime} />
        </div>
        <div className={style.voice}>
          <i className="iconfont icon-soundsize"></i>
          <div className={style.volumeWrap}>
            <Progress proportion={volume} setPoint={this.setVolume} />
          </div>
        </div>
        <audio ref="_audio" src={url}></audio>
      </div>
    )
  }

  componentDidMount() {
    const { playList, currentIndex } = this.props
    const currentMusic = playList[currentIndex] || {}
    this.getMusic(currentMusic.id)
    this._audio = ReactDOM.findDOMNode(this.refs._audio)
    this.setVolume()
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
    this._audio.addEventListener('canplay', this._audio.play)
    this._audio.addEventListener('ended', this.next.bind(this))
    this._audio.addEventListener('timeupdate', this.timeupdate.bind(this))
  }

  next() {
    if (this.props.currentIndex === this.props.playList.length - 1) {
      this.props.setCurrentIndex(0)
      return
    }
    this.props.setCurrentIndex(this.props.currentIndex + 1)
  }

  prev() {
    if (this.props.currentIndex - 1 <= 0) {
      this.props.setCurrentIndex(0)
      return
    }
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

  timeupdate() {
    this.setState({
      currentTime: this._audio.currentTime
    })
  }

  setMusicTime = (percent) => {
    this._audio.currentTime = this.props.playList[this.props.currentIndex].dt * percent
  }

  iconStatus() {
    return this.props.playStatus
      ? 'icon-bofangqi-zanting'
      : 'icon-bofangqi-bofang'
  }

  setVolume = percent => {
    if (percent !== undefined) this._audio.volume = percent
    this.setState({
      volume: this._audio.volume
    })
  }

}

const mapStateToProps = state => {
  return {
    playStatus: state.get('playStatus'),
    playList: state.get('playList').toJS(),
    currentIndex: state.get('currentIndex')
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayStatus: status => {
    dispatch(getPlayStatusAction(status))
  },
  setCurrentIndex: status => {
    dispatch(getCurrentIndexAction(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
