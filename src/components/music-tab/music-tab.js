import React from 'react'
import style from './music-tab.module.scss'
import { connect } from 'react-redux'

class MusicTab extends React.Component {
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

const mapStateToProps = state => ({
  playList: state.playList,
  currentIndex: state.currentIndex
})

export default connect(
  mapStateToProps
)(MusicTab)
