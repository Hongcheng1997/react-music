import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import RecommendSongs from './components/recommend-songs/recommend-songs'
import style from './song-sheet.module.scss'

class SongSheet extends PureComponent {
  render() {
    const { list } = this.props
    return (
      <div className={style.songSheet}>
        <div>
          <RecommendSongs data={list} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getSongSheet()
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.getIn(['songSheet', 'list']).toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSongSheet() {
      dispatch(actionCreators.getSongSheet())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSheet)
