import React from 'react'
import { message } from 'antd';
import { connect } from 'react-redux'
import { getShowPlayerAction } from '../../store/actionCreators'
import style from './music-tab.module.scss'

const MusicTab = React.memo(props => {
  const { currentMusic, musicUrl, showPlayer } = props

  function handlePlayer() {
    if (musicUrl) {
      showPlayer()
    } else {
      message.info('此歌曲无法播放');
    }
  }

  return (
    <div className={style.MusicTab}>
      <div className={style.musicHead} onClick={handlePlayer}>
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
})

const mapStateToProps = state => {
  return {
    currentMusic: state.getIn(['common', 'currentMusic']).toJS(),
    musicUrl: state.getIn(['common', 'musicUrl'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showPlayer() {
      dispatch(getShowPlayerAction())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicTab)
