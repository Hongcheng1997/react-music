import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { getPlayStatusAction, getCurrentIndexAction } from '../../store/actionCreators'
import axios from '_axios'
import Progress from '../progress/progress'
import MusicTab from '../music-tab/music-tab'
import Volume from '../volume'
import { Drawer } from 'antd';
import { formatTime } from '@/common/helper/utils'
import style from './mini-player.module.scss'

class MiniPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      musicId: 0,
      currentTime: 0,
      volume: 0,
      showPlayList: false
    }
    const { playList, currentIndex } = this.props
    this.currentMusic = playList[currentIndex] || {}
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.handleDrawer = this.handleDrawer.bind(this)
    this.toggleStatus = this.toggleStatus.bind(this)
    this.setMusicTime = this.setMusicTime.bind(this)
    this.getDrawer = this.getDrawer.bind(this)
  }

  render() {
    const { currentTime, url, volume, showPlayList } = this.state
    const { playList } = this.props
    const proportion = currentTime / this.currentMusic.dt
    return (
      <div className={style.play}>
        <div className={style.progressWrap}>
          <Progress proportion={proportion} updateToProportion={this.setMusicTime} />
        </div>

        <div className={style.operation}>
          <div className={style.tabWrap}>
            <MusicTab handlePlay={this.props.handlePlay}></MusicTab>
          </div>

          <div className={style.cutSong}>
            <i className="iconfont icon-xunhuan"></i>
            <i className={`iconfont icon-shangyishou ${style.shangyishou}`} onClick={this.prev}></i>
            <div className={style.center} onClick={this.toggleStatus}>
              <i className={`iconfont ${this.iconStatus()}`}></i>
            </div>
            <i className={`iconfont icon-xiayishou ${style.xiayishou}`} onClick={this.next}></i>
            <Volume volume={volume} setVolume={this.setVolume}></Volume>
          </div>

          <div className={style.musicListWrap}>
            <span className={style.time}>{`${formatTime(currentTime)} / ${formatTime(this.currentMusic.dt)}`}</span>
            <i className="iconfont icon-musiclist" onClick={this.handleDrawer}></i>
          </div>
        </div>
        <audio ref="_audio" src={url}></audio>
        {this.getDrawer(showPlayList, playList)}
      </div>
    )
  }

  getDrawer(showPlayList, playList) {
    return (
      <Drawer
        width="300"
        title="播放列表"
        headerStyle={{ backgroundColor: 'var(--body-bgcolor)', color: 'var(--body-color)' }}
        drawerStyle={{ backgroundColor: 'var(--body-bgcolor)' }}
        placement="right"
        closable={false}
        onClose={this.handleDrawer}
        visible={showPlayList}
      >
        {
          playList.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => { this.props.setCurrentIndex(index) }}
                className={`${style.drawerItem} ${item.id === this.currentMusic.id ? style.active : ''}`}
              >
                <p className={style.name}>{item.name}</p>
                <p className={style.info}>
                  <span>{item.ar[0].name}</span>
                  <span>{formatTime(this.currentMusic.dt)}</span>
                </p>
              </div>
            )
          })
        }
      </Drawer>
    )
  }

  componentDidMount() {
    this.getMusic(this.currentMusic)
    this._audio = ReactDOM.findDOMNode(this.refs._audio)
    this.setVolume()
    this.bindEvent()
  }

  componentDidUpdate() {
    const { playList, currentIndex } = this.props
    const currentId = playList[currentIndex].id
    if (this.currentMusic.id !== currentId) {
      this.getMusic(playList[currentIndex])
    }
  }

  componentWillUnmount() {
    this.unBindEvent()
  }

  getMusic(currentMusic) {
    axios('/song/url', { id: currentMusic.id }).then(res => {
      if (res.code === 200) {
        this.setState({
          url: res.data[0].url,
          musicId: currentMusic.id
        })
        this.currentMusic = currentMusic
        if (this.props.playStatus) this._audio.play()
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

  handleDrawer() {
    this.setState({
      showPlayList: !this.state.showPlayList
    })
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
    if (percent !== undefined) this._audio.volume = Math.min(Math.max(0, percent.toFixed(1)), 1)
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
  setCurrentIndex: index => {
    dispatch(getCurrentIndexAction(index))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)
