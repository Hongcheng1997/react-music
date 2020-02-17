import React, { PureComponent } from "react";
import { connect } from 'react-redux'
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

    this.scrollInstance = null
    this.lyricInstance = null
    this.handler = this.handler.bind(this)
  }

  render() {
    const { currentMusic } = this.props
    const { lyric, lyricIndex } = this.state
    return (
      <div className={style.playContainer}>
        <div className={style.playerHeader}>
          <i className="iconfont icon-down" onClick={this.props.handlePlay}></i>
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
        <div className={style.bg_player} style={{ backgroundImage: `url(${currentMusic.al && currentMusic.al.picUrl})` }}></div>
      </div>
    )
  }

  componentWillUpdate(nextProps) {
    if (this.props.lyric !== nextProps.lyric) {
      this.lyricInstance = new Lyric(nextProps.lyric, this.handler)
      this.setState(() => ({
        lyricIndex: 0,
        lyric: this.lyricInstance.lines
      }), () => {
        this.scrollInstance = new BScroll(document.querySelector('#LyricScroll'))
        if (nextProps.playStatus && !this.state.lyricIndex) {
          this.lyricInstance.play()
        }
      })
    }

    if ((this.props.playStatus !== nextProps.playStatus) && this.state.lyricIndex) {
      this.lyricInstance.togglePlay()
    }
  }

  handler({ lineNum }) {
    if (!lineNum) return
    if (lineNum > 3) {
      this.scrollInstance.scrollToElement(`#line_${lineNum - 3}`, 200)
    } else {
      this.scrollInstance.scrollTo(0, 0, 200)
    }
    this.setState({
      lyricIndex: lineNum
    })
  }
}

const mapStateToProps = (state) => {
  return {
    playStatus: state.getIn(['common', 'playStatus']),
    currentMusic: state.getIn(['common', 'currentMusic']).toJS(),
    lyric: state.getIn(['common', 'lyric'])
  }
}

export default connect(mapStateToProps, null)(Player)
