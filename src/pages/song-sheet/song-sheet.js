import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
// import { Pagination } from 'antd';
import RecommendSongs from './components/recommend-songs/recommend-songs'
import style from './song-sheet.module.scss'

class SongSheet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeLabel: '全部歌单'
    }
    this.page = {
      limit: 100
    }
  }

  render() {
    const { activeLabel } = this.state
    const { list, hotLabel, pageTotal } = this.props
    return (
      <div className={style.songSheet}>
        <ul className={style.labelWrap}>
          {
            hotLabel.slice(0, 8).map(label => {
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
        {/* <div className={style.paginationWrap}>
          <Pagination size="small" total={pageTotal} />
        </div> */}
      </div>
    )
  }

  componentDidMount() {
    this.props.getSongSheet(this.page)
    this.props.getHotLabel()
  }

  handleFilter(cat) {
    this.setState({
      activeLabel: cat
    })
    this.props.getSongSheet({ cat, ...this.page })
  }
}

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
