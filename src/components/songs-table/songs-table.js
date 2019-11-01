import React from 'react'
import style from './songs-table.module.scss'
import { connect } from 'react-redux'
import {
  setPlayStatus,
  setPlayList,
  setCurrentIndex
} from '../../store/actions'

class SongsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: -1
    }
  }

  render() {
    const { tracks } = this.props
    const { activeId } = this.state
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
                <span className={style.number}>
                  {this.repairNumber(index + 1)}
                </span>
                <span className={style.operation}>
                  <i className="iconfont icon-aixin"></i>
                  <i className="iconfont icon-shangchuan"></i>
                </span>
                <span className={style.name}>{item.name}</span>
                <span className={style.singer}>{item.ar[0].name}</span>
                <span className={style.album}>{item.al.name}</span>
                <span className={style.timer}>{this.filterTime(item.dt)}</span>
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

  filterTime(time) {
    const minute = this.repairNumber(parseInt(time.toFixed().substr(0, 3) / 60))
    const second = this.repairNumber(+time.toFixed().substr(0, 3) - minute * 60)
    return `${minute}:${second}`
  }

  repairNumber(number) {
    if (number.toFixed().length === 1) {
      return `0${number}`
    }
    return number
  }
}

const mapDispatchToProps = dispatch => ({
  setPlayStatus: status => {
    dispatch(setPlayStatus(status))
  },
  setPlayList: status => {
    dispatch(setPlayList(status))
  },
  setCurrentIndex: status => {
    dispatch(setCurrentIndex(status))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SongsTable)
