import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './music-tab.module.scss'

class MusicTab extends Component {
  render() {
    const { playList, currentIndex } = this.props
    const currentMusic = playList[currentIndex] || {}
    return (
      <div className={style.MusicTab}>
        <div className={style.musicHead}>
          <img src={currentMusic.al && currentMusic.al.picUrl} alt=''></img>
        </div>
        <div className={style.musicInfo}>
          <p className={style.musicName}>{currentMusic.name}</p>
          <p className={style.singer}>{currentMusic.ar && currentMusic.ar[0].name}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playList: state.get('playList').toJS(),
    currentIndex: state.get('currentIndex')
  }
}

export default connect(
  mapStateToProps
)(MusicTab)
