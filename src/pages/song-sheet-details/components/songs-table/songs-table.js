import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { formatTime } from '@/common/helper/utils'
import {
  getPlayStatusAction,
  getPlayListAction,
  getCurrentIndexAction
} from '../../../../store/actionCreators'
import style from './songs-table.module.scss'
import imgUrl from '../../../../assets/wave.gif'

const SongsTable = React.memo(props => {
  let [activeId, setActiveId] = useState(-1)
  const { tracks, currentIndex, playList, setPlayStatus, setPlayList, setCurrentIndex } = props
  const currentMusic = playList[currentIndex] || {}

  function playMusic(tracks, index) {
    setPlayStatus(true)
    setPlayList(tracks)
    setCurrentIndex(index)
  }

  return (
    <div className={style.list}>
      {
        tracks && tracks.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`${style.song} ${
                activeId === index ? style.active : ''
                }`}
              onClick={() => setActiveId(index)}
              onDoubleClick={() => playMusic(tracks, index)}
            >
              {
                currentMusic.id === item.id &&
                <span className={style.sound}>
                  <img src={imgUrl} alt="" />
                </span>
              }

              <span className={style.number}>
                <i className="iconfont icon-aixin"></i>
              </span>
              <span className={style.name}>{item.name}</span>
              <span className={style.singer}>{item.ar[0].name}</span>
              <span className={style.album}>{item.al.name}</span>
              <span className={style.timer}>{formatTime(item.dt, true)}</span>
            </div>
          )
        })
      }
    </div>
  )
})

const mapStateToProps = state => ({
  playList: state.getIn(['common', 'playList']).toJS(),
  currentIndex: state.getIn(['common', 'currentIndex'])
})

const mapDispatchToProps = dispatch => ({
  setPlayStatus: status => {
    dispatch(getPlayStatusAction(status))
  },
  setPlayList: list => {
    dispatch(getPlayListAction(fromJS(list)))
  },
  setCurrentIndex: index => {
    dispatch(getCurrentIndexAction(index))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsTable)
