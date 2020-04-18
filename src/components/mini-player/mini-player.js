import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { getPlayStatusAction, getCurrentIndexAction, getTimeToLyricAction, getMusicUrl } from '../../store/actionCreators'
import Progress from '../progress/progress'
import MusicTab from '../music-tab/music-tab'
import Volume from '../volume'
import { Drawer } from 'antd';
import { formatTime, getRandomInt } from '@/common/helper/utils'
import style from './mini-player.module.scss'

const LISTLOOP = 1
const SINGLELOOP = 2
const RANDOM = 3

const MiniPlayer = React.memo(props => {
  let [currentTime, setCurrentTime] = useState(0)
  let [volume, setVolume] = useState(1)
  let [showDrawer, setShowDrawer] = useState(false)
  let [playMode, setPlayMode] = useState(LISTLOOP)
  const { playList, currentIndex, playStatus, currentMusic, musicUrl, showPlayer, setTimeToLyric, setCurrentIndex, setPlayStatus, handlePlay, dispatchUrl } = props
  const proportion = currentTime / (currentMusic.dt / 1000)
  const audioEl = useRef()

  useEffect(() => {
    if (currentMusic.id) {
      dispatchUrl(currentMusic.id)
    }
  }, [currentMusic.id])

  useEffect(() => {
    playStatus && audioEl.current.play()
  }, [musicUrl])

  useEffect(() => {
    if (showPlayer) {
      document.getElementById("play").style.color = 'white'
      document.getElementById("play").style.backgroundColor = 'rgba(255,255,255,0)'
      setTimeout(() => {
        document.getElementById("play").style.zIndex = '1'
      }, 300)
    } else {
      document.getElementById("play").removeAttribute("style")
    }
  }, [showPlayer])

  // const setAudioTime = useCallback((percent) => {
  //   if (!currentMusic.id) return
  //   setTimeToLyric(currentMusic.dt / 1000 * percent)
  //   audioEl.current.currentTime = currentMusic.dt / 1000 * percent
  // }, [])

  const updateToProportion = useCallback(percent => {
    if (percent !== undefined) audioEl.current.volume = Math.min(Math.max(0, percent.toFixed(1)), 1)
    setVolume(audioEl.current.volume)
  }, [])

  function setAudioTime(percent) {
    if (!currentMusic.id) return
    setTimeToLyric(currentMusic.dt / 1000 * percent)
    audioEl.current.currentTime = currentMusic.dt / 1000 * percent
  }

  function next() {
    if (playList.length) {
      if (currentIndex === playList.length - 1) {
        setCurrentIndex(0)
        return
      }
      setCurrentIndex(currentIndex + 1)
    }
  }

  function prev() {
    if (playList.length) {
      if (currentIndex - 1 <= 0) {
        setCurrentIndex(0)
        return
      }
      setCurrentIndex(currentIndex - 1)
    }
  }

  function toggleStatus() {
    if (currentMusic.id) {
      setPlayStatus(!playStatus)
      if (playStatus) {
        audioEl.current.pause()
      } else {
        audioEl.current.play()
      }
    }
  }

  function handleDrawer() {
    setShowDrawer(!showDrawer)
  }

  function audioTimeUpdate() {
    setCurrentTime(audioEl.current.currentTime)
  }

  function ended() {
    if (playMode === LISTLOOP) {
      next()
    }
    if (playMode === SINGLELOOP) {
      audioEl.current.play()
      setTimeToLyric(0)
    }
    if (playMode === RANDOM) {
      const index = getRandomInt(0, playList.length)
      setCurrentIndex(index)
    }
  }

  function iconStatus() {
    return playStatus ? 'icon-iconstop' : 'icon-bofang'
  }

  function playModeIcon() {
    switch (playMode) {
      case RANDOM:
        return <i className="iconfont icon-random" onClick={() => { setPlayMode(LISTLOOP) }}></i>
      case SINGLELOOP:
        return <i className="iconfont icon-danquxunhuan" onClick={() => { setPlayMode(RANDOM) }}></i>
      default:
        return <i className="iconfont icon-xunhuan" onClick={() => { setPlayMode(SINGLELOOP) }}></i>
    }
  }

  return (
    <div className={style.play} id="play">
      <div className={style.progressWrap}>
        <Progress proportion={proportion} updateToProportion={updateToProportion} />
      </div>

      <div className={style.operation}>
        <div className={style.tabWrap}>
          {currentMusic.id && !showPlayer && <MusicTab handlePlay={handlePlay}></MusicTab>}
        </div>

        <div className={style.cutSong}>
          <div>
            {playModeIcon()}
          </div>
          <i className={`iconfont icon-shangyishou ${style.shangyishou}`} onClick={prev}></i>
          <div className={style.center} onClick={toggleStatus}>
            <i className={`iconfont ${iconStatus()}`}></i>
          </div>
          <i className={`iconfont icon-xiayishou ${style.xiayishou}`} onClick={next}></i>
          <Volume volume={volume} setVolume={setVolume}></Volume>
        </div>

        <div className={style.musicListWrap}>
          <span className={style.time}>{`${formatTime(currentTime)} / ${formatTime(currentMusic.dt, true)}`}</span>
          <i className="iconfont icon-musiclist" onClick={handleDrawer}></i>
        </div>
      </div>

      <Drawer
        width="300"
        title={<div style={{ color: 'var(--body-color)' }}>播放列表</div>}
        headerStyle={{ backgroundColor: 'var(--body-bgcolor)' }}
        drawerStyle={{ backgroundColor: 'var(--body-bgcolor)' }}
        placement="right"
        closable={false}
        onClose={handleDrawer}
        visible={showDrawer}
      >
        {
          playList.map((item, index) => {
            return (
              <div
                key={item.id}
                onDoubleClick={() => { setCurrentIndex(index) }}
                className={`${style.drawerItem} ${item.id === currentMusic.id ? style.active : ''}`}
              >
                <p className={style.name}>{item.name}</p>
                <p className={style.info}>
                  <span>{item.ar[0].name}</span>
                  <span>{formatTime(item.dt, true)}</span>
                </p>
              </div>
            )
          })
        }
      </Drawer>
      <audio ref={audioEl} src={musicUrl} onTimeUpdate={audioTimeUpdate} onEnded={ended}></audio>
    </div>
  )
})

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
  dispatchUrl: id => {
    dispatch(getMusicUrl(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)
