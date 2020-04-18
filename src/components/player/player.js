import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getShowPlayerAction } from '../../store/actionCreators'
import BScroll from 'better-scroll'
import Lyric from '../../common/helper/parse-lyric'
import style from './player.module.scss'

let scrollInstance = null
let lyricInstance = null

const Player = React.memo((props) => {
  let [lyric, setLyric] = useState([])
  let [lyricIndex, setLyricIndex] = useState(0)
  const { currentMusic, playStatus, timeToLyric, lyricStr, showPlayer, setPlayer } = props

  // 监听 redux 中的 lyricStr，如果改变说明切歌了，将字符串歌词解析成数组
  useEffect(() => {
    lyricInstance && lyricInstance.stop()
    lyricInstance = new Lyric(lyricStr, handler)
    setLyric(lyricInstance.lines)
  }, [lyricStr])

  useEffect(() => {
    setLyricIndex(0)
    scrollInstance = new BScroll(document.querySelector('#LyricScroll'))
    playStatus && !lyricIndex && lyricInstance.play()
  }, [lyric])

  useEffect(() => {
    lyricIndex && lyricInstance.togglePlay()
  }, [playStatus])

  useEffect(() => {
    lyricInstance.seek(timeToLyric * 1000)
  }, [timeToLyric])

  function handler({ lineNum }) {
    if (!lineNum) return
    if (lineNum > 3) {
      scrollInstance.scrollToElement(`#line_${lineNum - 3}`, 1000)
    } else {
      scrollInstance.scrollTo(0, 0, 1000)
    }

    setLyricIndex(lineNum)
  }

  return (
    <div className={style.playContainer} id={showPlayer ? '' : style.playToHidden}>
      <div className={style.playerHeader}>
        <i className="iconfont icon-down" onClick={setPlayer}></i>
      </div>
      <div className={style.main}>
        <div className={style.head}><img src={currentMusic.al && currentMusic.al.picUrl} alt=""></img></div>
        <div className={style.LyricWrap}>
          <p className={style.songName}>{currentMusic.name}</p>
          <p className={style.singer}>歌手：{currentMusic.ar && currentMusic.ar[0].name}</p>
          <div id="LyricScroll" style={{ height: '50%', overflow: 'hidden' }}>
            <div>
              {
                lyric.map((item, index) => {
                  return (
                    <p key={index}
                      id={`line_${index}`}
                      className={index === lyricIndex ? style.active : ''}
                    >
                      {item.txt}
                    </p>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className={style.bg_player} style={{ backgroundImage: `url(${currentMusic.al && currentMusic.al.picUrl})` }}></div>
    </div>
  )
})

const mapStateToProps = (state) => {
  return {
    playStatus: state.getIn(['common', 'playStatus']),
    currentMusic: state.getIn(['common', 'currentMusic']).toJS(),
    lyricStr: state.getIn(['common', 'lyric']),
    showPlayer: state.getIn(['common', 'showPlayer']),
    timeToLyric: state.getIn(['common', 'timeToLyric'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayer() {
      dispatch(getShowPlayerAction())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
