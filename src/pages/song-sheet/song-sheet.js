import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import RecommendSongs from './components/recommend-songs/recommend-songs'
import style from './song-sheet.module.scss'

class SongSheet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeLabel: '全部歌单'
    }
  }
  render() {
    const { activeLabel } = this.state
    const { list, hotLabel } = this.props
    return (
      <div className={style.songSheet}>
        <ul className={style.labelWrap}>
          {
            hotLabel.slice(0, 30).map(label => {
              return (
                <li
                  key={label.name}
                  className={activeLabel === label.name ? style.active : ''}
                  onClick={() => { this.handleFilter(label.name) }}
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
  }

  componentDidMount() {
    this.props.getSongSheet({ limit: 18 })
    this.props.getHotLabel()
  }

  handleFilter(cat) {
    this.setState({
      activeLabel: cat
    })
    this.props.getSongSheet({ limit: 18, cat })
  }
}

const mapStateToProps = (state) => {
  return {
    hotLabel: state.getIn(['songSheet', 'hotLabel']).toJS(),
    list: state.getIn(['songSheet', 'list']).toJS()
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
