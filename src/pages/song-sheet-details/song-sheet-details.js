import React from 'react'
import style from './song-sheet-details.module.scss'
import axios from '_axios'

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
        <div className={style.list}>
          {playlist.tracks &&
            playlist.tracks.map(item => {
              return (
                <div
                  key={item.id}
                  className={style.song}
                  onDoubleClick={this.getMusic.bind(this, item.id)}
                >
                  {item.name}
                </div>
              )
            })}
        </div>
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

  getMusic(id) {
    axios('/song/url', {
      id
    }).then(res => {
      if (res.code === 200) {
        console.log(res)
      }
    })
  }
}

export default SongSheetDetails
