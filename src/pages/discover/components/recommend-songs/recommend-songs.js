import React, { Component } from 'react'
import style from './recommend-songs.module.scss'

class RecommendSongs extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data } = this.props
    return (
      <div className={style.RecommendSongs}>
        <p className={style.songTitle}>推荐歌单</p>
        <ul>
          {data.map((item, key) => (
            <li key={key} onClick={this.toDetails.bind(this, item.id)}>
              <div>
                <img src={item.picUrl} alt=""></img>
              </div>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  toDetails(id) {
    this.props.toDetails(id)
  }
}

export default RecommendSongs
