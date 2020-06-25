import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import SongsTable from './components/songs-table/songs-table'
import style from './song-sheet-details.module.scss'

const SongSheetDetails = React.memo(props => {
  const { playList, getData, match } = props

  useEffect(() => {
    getData(match.params.id)
  }, [match.params.id, getData])

  return (
    <div className={style.sheetDetails}>
      <header className={style.header}>
        <div className={style.head}>
          <img src={playList.coverImgUrl} alt=""></img>
        </div>
        <div className={style.headerContent}>
          <h1>{playList.name}</h1>
          <p className={style.tags}>
            标签：<span>{playList.tags && playList.tags.join(' / ')}</span>
          </p>
          <p className={style.description}>简介：{playList.description}</p>
        </div>
      </header>
      <div className={`${style.song}`}>
        <span className={style.number}></span>
        <span className={style.name}>歌曲</span>
        <span className={style.singer}>歌手</span>
        <span className={style.album}>专辑</span>
        <span className={style.timer}>时长</span>
      </div>
      <SongsTable tracks={playList.tracks} />
    </div>
  )
})

const mapStateToProps = (state) => {
  return {
    playList: state.getIn(['songSheetDetails', 'playList']).toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData(id) {
      dispatch(actionCreators.getData(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSheetDetails)
