import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import RecommendSongs from './components/recommend-songs/recommend-songs'
import style from './song-sheet.module.scss'

const SongSheet = React.memo((props) => {
  let [activeLabel, setActiveLabel] = useState('全部歌单')
  const { list, hotLabel, getSongSheet, getHotLabel } = props
  const page = {
    limit: 100
  }

  useEffect(() => {
    getSongSheet(page)
    getHotLabel()
  }, [])

  function handleFilter(cat) {
    setActiveLabel(cat)
    getSongSheet({ cat, ...page })
  }

  return (
    <div className={style.songSheet}>
      <ul className={style.labelWrap}>
        {
          hotLabel.slice(0, 8).map(label => {
            return (
              <li
                key={label.name}
                className={activeLabel === label.name ? style.active : ''}
                onClick={() => { handleFilter(label.name) }}
              >{label.name}</li>
            )
          })
        }
      </ul>
      <div>
        <RecommendSongs data={list} />
      </div>
    </div>
  )
})

const mapStateToProps = (state) => {
  return {
    hotLabel: state.getIn(['songSheet', 'hotLabel']).toJS(),
    list: state.getIn(['songSheet', 'list']).toJS(),
    pageTotal: state.getIn(['songSheet', 'pageTotal'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSongSheet(params) {
      dispatch(actionCreators.getSongSheet(params))
    },
    getHotLabel() {
      dispatch(actionCreators.getHotLabel())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSheet)
