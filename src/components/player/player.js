import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from '_axios'
import { connect } from 'react-redux'
import { getPlayStatusAction, getCurrentIndexAction } from '../../store/actionCreators'
import Progress from '../progress/progress'
import MusicTab from '../music-tab/music-tab'
import { formatTime } from '@/common/helper/utils'
import style from './player.module.scss'

class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      musicId: 0,
      currentTime: 0,
      volume: 0,
      showVolum: false
    }
    this.volumeTimer = null
    this.handleSoundEnter = this.handleSoundEnter.bind(this)
    this.handleSoundLeave = this.handleSoundLeave.bind(this)
    this.handleIconEnter = this.handleIconEnter.bind(this)
    this.handleIconLeave = this.handleIconLeave.bind(this)
  }

  render() {
    const { playList, currentIndex } = this.props
    const { currentTime, url, volume, showVolum } = this.state
    const currentMusic = playList[currentIndex] || {}
    this.getMusic(currentMusic.id) // 保证歌曲 index 切换后，能获取歌曲，后期优化
    return (
      <div className={style.play}>
        <div className={style.progressWrap}>
          <Progress
            proportion={currentTime / currentMusic.dt}
            setPoint={this.setMusicTime} />
        </div>
        <div className={style.operation}>
          <div className={style.tabWrap}>
            <MusicTab></MusicTab>
          </div>
          <div className={style.cutSong}>
            <i className="iconfont icon-xunhuan"></i>
            <i style={{ margin: '0 20px' }} className="iconfont icon-shangyishou" onClick={() => this.prev()}></i>
            <div className={style.center} onClick={() => this.toggleStatus()}>
              <i className={`iconfont ${this.iconStatus()}`}></i>
            </div>
            <i style={{ margin: '0 20px' }} className="iconfont icon-xiayishou" onClick={() => this.next()}></i>
            <div className={style.wrapToPoint}>
              <i
                className="iconfont icon-soundsize"
                onMouseEnter={this.handleIconEnter}
                onMouseLeave={this.handleIconLeave}
              ></i>
              {
                showVolum &&
                <div
                  className={style.volumeWrap}
                  onMouseEnter={this.handleSoundEnter}
                  onMouseLeave={this.handleSoundLeave}
                >
                  <Progress proportion={volume} setPoint={this.setVolume} />
                </div>
              }
            </div>
          </div>
          <div className={style.voice}>
            <span className={style.time}>{`${formatTime(currentTime)} / ${formatTime(currentMusic.dt)}`}</span>
            <i className="iconfont icon-musiclist"></i>
          </div>
          <audio ref="_audio" src={url}></audio>
        </div>
      </div>
    )
  }

  componentDidMount() {
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

  handleSoundEnter() {
    clearTimeout(this.volumeTimer)
  }

  handleSoundLeave() {
    setTimeout(() => {
      this.setState({
        showVolum: false
      })
    }, 1000)
  }

  handleIconEnter() {
    this.setState({
      showVolum: true
    })
  }

  handleIconLeave() {
    this.volumeTimer = setTimeout(() => {
      this.setState({
        showVolum: false
      })
    }, 1000)
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
      ? 'icon-iconstop'
      : 'icon-bofang'
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
