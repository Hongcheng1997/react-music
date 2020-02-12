import React from 'react'
import axios from '_axios'
import SongsTable from './components/songs-table/songs-table'
import style from './song-sheet-details.module.scss'

class SongSheetDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      playlist: {}
    }
  }

  render() {
    const { playlist } = this.state
    return (
      <div className={style.sheetDetails}>
        <header className={style.header}>
          <div className={style.head}>
            <img src={playlist.coverImgUrl} alt=""></img>
          </div>
          <div className={style.headerContent}>
            <h1>{playlist.name}</h1>
            <p className={style.tags}>
              标签：<span>{playlist.tags && playlist.tags.join(' / ')}</span>
            </p>
            <p className={style.description}>简介：{playlist.description}</p>
          </div>
        </header>
        <div className={`${style.song}`}>
          <span className={style.number}></span>
          <span className={style.operation}>操作</span>
          <span className={style.name}>音乐标题</span>
          <span className={style.singer}>歌手</span>
          <span className={style.album}>专辑</span>
          <span className={style.timer}>时长</span>
        </div>
        <SongsTable tracks={playlist.tracks} />
      </div>
    )
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios('/playlist/detail', {
      id: this.props.match.params.id
    }).then(res => {
      if (res.code === 200) {
        res.playlist.tracks = res.playlist.tracks.map(item => {
          item.dt = parseInt(item.dt.toFixed().substr(0, 3))
          return item
        })
        this.setState({
          playlist: res.playlist
        })
      }
    })
  }
}

export default SongSheetDetails
