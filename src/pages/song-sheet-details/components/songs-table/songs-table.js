import React from 'react'
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

class SongsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: -1
    }
  }

  render() {
    const { tracks, currentIndex, playList } = this.props
    const { activeId } = this.state
    const currentMusic = playList[currentIndex] || {}
    return (
      <div className={style.list}>
        {tracks &&
          tracks.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`${style.song} ${
                  activeId === index ? style.active : ''
                  }`}
                onClick={() => this.select(index)}
                onDoubleClick={() => this.playMusic(tracks, index)}
              >
                {
                  currentMusic.id === item.id &&
                  <span className={style.sound}>
                    <img src={imgUrl} alt="" />
                  </span>
                }

                <span className={style.number}>
                  {/* {repairNumber(index + 1)} */}
                  <i className="iconfont icon-aixin"></i>
                </span>
                {/* <span className={style.operation}>
                  <i className="iconfont icon-aixin"></i>
                  <i className="iconfont icon-shangchuan"></i>
                </span> */}
                <span className={style.name}>{item.name}</span>
                <span className={style.singer}>{item.ar[0].name}</span>
                <span className={style.album}>{item.al.name}</span>
                <span className={style.timer}>{formatTime(item.dt, true)}</span>
              </div>
            )
          })}
      </div>
    )
  }

  playMusic(tracks, index) {
    this.props.setPlayStatus(true)
    this.props.setPlayList(tracks)
    this.props.setCurrentIndex(index)
  }

  select(index) {
    this.setState({
      activeId: index
    })
  }
}

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
