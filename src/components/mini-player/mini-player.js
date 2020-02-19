import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { getPlayStatusAction, getCurrentIndexAction, getTimeToLyricAction, getMusicUrl, getLyric } from '../../store/actionCreators'
import Progress from '../progress/progress'
import MusicTab from '../music-tab/music-tab'
import Volume from '../volume'
import { Drawer } from 'antd';
import { formatTime } from '@/common/helper/utils'
import style from './mini-player.module.scss'

const LISTLOOP = 1
const SINGLELOOP = 2
const RANDOM = 3

class MiniPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      volume: 1,
      showDrawer: false,
      playMode: LISTLOOP
    }
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.handleDrawer = this.handleDrawer.bind(this)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.setAudioTime = this.setAudioTime.bind(this)
    this.playModeIcon = this.playModeIcon.bind(this)
    this.handleMode = this.handleMode.bind(this)
  }

  render() {
    const { currentTime, volume, showDrawer } = this.state
    const { musicUrl, playList, currentMusic, showPlayer } = this.props
    const proportion = currentTime / currentMusic.dt
    return (
      <div className={style.play} id="play">
        <div className={style.progressWrap}>
          <Progress proportion={proportion} updateToProportion={this.setAudioTime} />
        </div>

        <div className={style.operation}>
          <div className={style.tabWrap}>
            {currentMusic.id && !showPlayer && <MusicTab handlePlay={this.props.handlePlay}></MusicTab>}
          </div>

          <div className={style.cutSong}>
            <div>
              {this.playModeIcon()}
            </div>
            <i className={`iconfont icon-shangyishou ${style.shangyishou}`} onClick={this.prev}></i>
            <div className={style.center} onClick={this.toggleStatus}>
              <i className={`iconfont ${this.iconStatus()}`}></i>
            </div>
            <i className={`iconfont icon-xiayishou ${style.xiayishou}`} onClick={this.next}></i>
            <Volume volume={volume} setVolume={this.setVolume}></Volume>
          </div>

          <div className={style.musicListWrap}>
            <span className={style.time}>{`${formatTime(currentTime)} / ${formatTime(currentMusic.dt)}`}</span>
            <i className="iconfont icon-musiclist" onClick={this.handleDrawer}></i>
          </div>
        </div>

        <Drawer
          width="300"
          title={<div style={{ color: 'var(--body-color)' }}>播放列表</div>}
          headerStyle={{ backgroundColor: 'var(--body-bgcolor)' }}
          drawerStyle={{ backgroundColor: 'var(--body-bgcolor)' }}
          placement="right"
          closable={false}
          onClose={this.handleDrawer}
          visible={showDrawer}
        >
          {
            playList.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={() => { this.props.setCurrentIndex(index) }}
                  className={`${style.drawerItem} ${item.id === currentMusic.id ? style.active : ''}`}
                >
                  <p className={style.name}>{item.name}</p>
                  <p className={style.info}>
                    <span>{item.ar[0].name}</span>
                    <span>{formatTime(currentMusic.dt)}</span>
                  </p>
                </div>
              )
            })
          }
        </Drawer>
        <audio ref="_audio" src={musicUrl} ></audio>
      </div>
    )
  }

  playModeIcon() {
    switch (this.state.playMode) {
      case RANDOM:
        return <i className="iconfont icon-random" onClick={this.handleMode}></i>
      case SINGLELOOP:
        return <i className="iconfont icon-danquxunhuan" onClick={this.handleMode}></i>
      default:
        return <i className="iconfont icon-xunhuan" onClick={this.handleMode}></i>
    }
  }

  componentDidMount() {
    this._audio = ReactDOM.findDOMNode(this.refs._audio)
    this.bindEvent()
  }

  componentDidUpdate(preProps) {
    if (preProps.currentMusic.id !== this.props.currentMusic.id) {
      this.props.getMusicUrl(this.props.currentMusic.id)
      this.props.getLyric(this.props.currentMusic.id)
    }

    if (preProps.musicUrl !== this.props.musicUrl && this.props.playStatus) {
      this._audio.play()
    }

    if (preProps.showPlayer !== this.props.showPlayer) {
      if (this.props.showPlayer) {
        document.getElementById("play").style.color = 'white'
        document.getElementById("play").style.backgroundColor = 'rgba(255,255,255,0)'
        setTimeout(() => {
          document.getElementById("play").style.zIndex = '1'
        }, 300)
      } else {
        document.getElementById("play").removeAttribute("style")
      }
    }
  }

  componentWillUnmount() {
    this.unBindEvent()
  }

  next() {
    if (this.props.playList.length) {
      if (this.props.currentIndex === this.props.playList.length - 1) {
        this.props.setCurrentIndex(0)
        return
      }
      this.props.setCurrentIndex(this.props.currentIndex + 1)
    }
  }

  prev() {
    if (this.props.playList.length) {
      if (this.props.currentIndex - 1 <= 0) {
        this.props.setCurrentIndex(0)
        return
      }
      this.props.setCurrentIndex(this.props.currentIndex - 1)
    }
  }

  toggleStatus() {
    if (this.props.currentMusic.id) {
      this.props.setPlayStatus(!this.props.playStatus)
      if (this.props.playStatus) {
        this._audio.pause()
      } else {
        this._audio.play()
      }
    }
  }

  handleDrawer() {
    this.setState({
      showDrawer: !this.state.showDrawer
    })
  }

  audioTimeUpdate() {
    this.setState({
      currentTime: this._audio.currentTime
    })
  }

  setAudioTime(percent) {
    if (!this.props.currentMusic.id) return
    this.props.setTimeToLyric(this.props.currentMusic.dt * percent)
    this._audio.currentTime = this.props.currentMusic.dt * percent
  }

  setVolume(percent) {
    if (percent !== undefined) this._audio.volume = Math.min(Math.max(0, percent.toFixed(1)), 1)
    this.setState({
      volume: this._audio.volume
    })
  }

  handleMode() {
    this.setState((preState) => ({
      playMode: preState.playMode === RANDOM ? LISTLOOP : ++preState.playMode
    }))
  }

  ended() {
    if (this.state.playMode === LISTLOOP) {
      this.next()
    }
    if (this.state.playMode === SINGLELOOP) {
      // this.setAudioTime(0)
      // this.props.setCurrentIndex(0)
    }
  }

  iconStatus() {
    return this.props.playStatus
      ? 'icon-iconstop'
      : 'icon-bofang'
  }

  bindEvent() {
    this._audio.addEventListener('ended', this.ended.bind(this))
    this._audio.addEventListener('timeupdate', this.audioTimeUpdate.bind(this))
  }

  unBindEvent() {
    this._audio.removeEventListener('ended', this.ended.bind(this))
    this._audio.removeEventListener('timeupdate', this.audioTimeUpdate.bind(this))
  }
}

const mapStateToProps = state => {
  return {
    playStatus: state.getIn(['common', 'playStatus']),
    playList: state.getIn(['common', 'playList']).toJS(),
    currentMusic: state.getIn(['common', 'currentMusic']).toJS(),
    currentIndex: state.getIn(['common', 'currentIndex']),
    musicUrl: state.getIn(['common', 'musicUrl']),
    showPlayer: state.getIn(['common', 'showPlayer'])
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayStatus: status => {
    dispatch(getPlayStatusAction(status))
  },
  setCurrentIndex: index => {
    dispatch(getCurrentIndexAction(index))
  },
  setTimeToLyric: time => {
    dispatch(getTimeToLyricAction(time))
  },
  getMusicUrl: id => {
    dispatch(getMusicUrl(id))
  },
  getLyric: id => {
    dispatch(getLyric(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)
