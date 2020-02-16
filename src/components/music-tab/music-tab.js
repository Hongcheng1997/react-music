import React from 'react'
import { connect } from 'react-redux'
import style from './music-tab.module.scss'

const MusicTab = props => {
  const { playList, currentIndex } = props
  const currentMusic = playList[currentIndex] || {}
  return (
    <div className={style.MusicTab}>
      <div className={style.musicHead} onClick={props.handlePlay}>
        <img src={currentMusic.al && currentMusic.al.picUrl} alt=''></img>
        <div className={style.top}>
          <i className="iconfont icon-jiantou_yemian_xiangshang_o"></i>
        </div>
      </div>
      <div className={style.musicInfo}>
        <p className={style.musicName}>{currentMusic.name}</p>
        <p className={style.singer}>{currentMusic.ar && currentMusic.ar[0].name}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    playList: state.getIn(['common', 'playList']).toJS(),
    currentIndex: state.getIn(['common', 'currentIndex'])
  }
}

export default connect(
  mapStateToProps
)(MusicTab)
