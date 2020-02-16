import React, { PureComponent } from "react";
import { connect } from 'react-redux'
import axios from '_axios'
import BScroll from 'better-scroll'
import Lyric from 'lyric-parser'
import style from './player.module.scss'

class Player extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      lyric: [],
      lyricIndex: 0
    }

    this.betterScroll = null
    this.lyric = null
    this.currentTime = 0
    this.handler = this.handler.bind(this)
  }

  render() {
    const { playList, currentIndex } = this.props
    const currentMusic = playList[currentIndex]
    const { lyric, lyricIndex } = this.state
    return (
      <div className={style.playContainer} style={{ backgroundImage: `url(${currentMusic.al.picUrl})` }}>
        <div className={style.playerHeader}>
          <i className="iconfont icon-down" onClick={this.props.handlePlay}></i>
        </div>
        <div className={style.main}>
          <div className={style.head}><img src={currentMusic.al.picUrl} alt=""></img></div>
          <div className={style.LyricWrap}>
            <p className={style.songName}>{currentMusic.name}</p>
            <p className={style.singer}>歌手：{currentMusic.ar[0].name}</p>
            <div id="LyricScroll" style={{ height: '50%', overflow: 'hidden' }}>
              <div>
                {
                  lyric.map((item, index) => {
                    return (
                      <p key={item.time}
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
      </div >
    )
  }

  componentDidMount() {
    const { playList, currentIndex } = this.props
    const currentMusic = playList[currentIndex]
    axios('/lyric', { id: currentMusic.id }).then(res => {
      this.lyric = new Lyric(res.lrc.lyric, this.handler)
      this.setState(() => ({
        lyric: this.lyric.lines
      }), () => {
        this.betterScroll = new BScroll(document.querySelector('#LyricScroll'))
      })
    })
  }

  componentWillUpdate(preState) {
    if (this.props.playStatus !== preState.playStatus) {
      if (this.state.lyricIndex) {
        this.lyric.togglePlay()
      } else {
        this.lyric.play()
      }
    }
  }

  handler({ lineNum }) {
    if (!lineNum) return
    if (lineNum > 3) {
      this.betterScroll.scrollToElement(`#line_${lineNum - 3}`, 200)
    } else {
      this.betterScroll.scrollTo(0, 0, 200)
    }
    this.setState({
      lyricIndex: lineNum
    })
  }
}

const mapStateToProps = (state) => {
  return {
    playStatus: state.getIn(['common', 'playStatus']),
    playList: state.getIn(['common', 'playList']).toJS(),
    currentIndex: state.getIn(['common', 'currentIndex'])
  }
}

export default connect(mapStateToProps, null)(Player)
