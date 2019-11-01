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
    this.state = {}
  }

  render() {
    const { tracks } = this.props
    return (
      <div className={style.list}>
        {tracks &&
          tracks.map((item, index) => {
            return (
              <div
                key={item.id}
                className={style.song}
                onDoubleClick={() => this.playMusic(tracks, index)}
              >
                {item.name}
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
