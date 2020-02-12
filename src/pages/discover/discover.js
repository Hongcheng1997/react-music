import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { Carousel } from 'element-react'
import RecommendSongs from './components/recommend-songs/recommend-songs'
import style from './discover.module.scss'

class Discover extends PureComponent {
  render() {
    const { imgList, songSheet } = this.props
    return (
      <div className={style.discover}>
        <div className={style.carousel}>
          <Carousel interval="4000" type="card" height="200px">
            {imgList.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <img src={item.imageUrl} alt="" />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
        <div>
          <RecommendSongs data={songSheet} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getBanner()
    this.props.getSongSheet()
  }
}

const mapStateToProps = (state) => {
  return {
    imgList: state.getIn(['discover', 'imgList']).toJS(),
    songSheet: state.getIn(['discover', 'songSheet']).toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner() {
      dispatch(actionCreators.getBanner())
    },
    getSongSheet() {
      dispatch(actionCreators.getSongSheet())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover)
