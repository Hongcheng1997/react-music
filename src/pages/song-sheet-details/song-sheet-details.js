import React from 'react'
import style from './song-sheet-details.module.scss'
import axios from '_axios'
import SongsTable from '@/components/songs-table/songs-table'

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
              标签：{playlist.tags && playlist.tags.join('、')}
            </p>
          </div>
        </header>
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
        this.setState({
          playlist: res.playlist
        })
      }
    })
  }
}

export default SongSheetDetails
