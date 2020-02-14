import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { getPlayStatusAction, getCurrentIndexAction } from '../../store/actionCreators'
import axios from '_axios'
import Progress from '../progress/progress'
import MusicTab from '../music-tab/music-tab'
import Volume from '../volume'
import { formatTime } from '@/common/helper/utils'
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
    const { playList, currentIndex } = this.props
    this.currentMusic = playList[currentIndex] || {}
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.setMusicTime = this.setMusicTime.bind(this)
  }

  render() {
    const { currentTime, url, volume } = this.state
    const proportion = currentTime / this.currentMusic.dt
    return (
      <div className={style.play}>
        <div className={style.progressWrap}>
          <Progress proportion={proportion} updateToProportion={this.setMusicTime} />
        </div>

        <div className={style.operation}>
          <div className={style.tabWrap}>
            <MusicTab></MusicTab>
          </div>

          <div className={style.cutSong}>
            <i className="iconfont icon-xunhuan"></i>
            <i style={{ margin: '0 20px' }} className="iconfont icon-shangyishou" onClick={this.prev}></i>
            <div className={style.center} onClick={() => this.toggleStatus()}>
              <i className={`iconfont ${this.iconStatus()}`}></i>
            </div>
            <i style={{ margin: '0 20px' }} className="iconfont icon-xiayishou" onClick={this.next}></i>
            <Volume volume={volume} setVolume={this.setVolume}></Volume>
          </div>

          <div className={style.musicListWrap}>
            <span className={style.time}>{`${formatTime(currentTime)} / ${formatTime(this.currentMusic.dt)}`}</span>
            <i className="iconfont icon-musiclist"></i>
          </div>
        </div>
        <audio ref="_audio" src={url}></audio>
      </div>
    )
  }

  componentDidMount() {
    this.getMusic(this.currentMusic.id)
    this._audio = ReactDOM.findDOMNode(this.refs._audio)
    this.setVolume()
    this.bindEvent()
  }

  componentDidUpdate() {
    const { playList, currentIndex } = this.props
    const currentId = playList[currentIndex].id
    if (this.currentMusic.id !== currentId) {
      this.getMusic(currentId)
    }
  }

  componentWillUnmount() {
    this.unBindEvent()
  }

  getMusic(id) {
    axios('/song/url', { id }).then(res => {
      if (res.code === 200) {
        this.setState({
          url: res.data[0].url,
          musicId: id
        })
        this._audio.play()
      }
    })
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

  setMusicTime(percent) {
    this._audio.currentTime = this.props.playList[this.props.currentIndex].dt * percent
  }

  iconStatus() {
    return this.props.playStatus
      ? 'icon-iconstop'
      : 'icon-bofang'
  }

  setVolume(percent) {
    if (percent !== undefined) this._audio.volume = percent.toFixed(1)
    this.setState({
      volume: this._audio.volume
    })
  }

  bindEvent() {
    this._audio.addEventListener('ended', this.next.bind(this))
    this._audio.addEventListener('timeupdate', this.timeupdate.bind(this))
  }

  unBindEvent() {
    this._audio.removeEventListener('ended', this.next.bind(this))
    this._audio.removeEventListener('timeupdate', this.timeupdate.bind(this))
  }
}

const mapStateToProps = state => {
  return {
    playStatus: state.getIn(['common', 'playStatus']),
    playList: state.getIn(['common', 'playList']).toJS(),
    currentIndex: state.getIn(['common', 'currentIndex'])
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
