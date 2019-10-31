import React from 'react'
import { Carousel } from 'element-react'
import RecommendSongs from '@/components/recommend-songs/recommend-songs'
import axios from '_axios'
import './discover.scss'

class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      imgList: [],
      songSheet: []
    }
  }

  componentDidMount() {
    this.getBanner()
    this.getSongSheet()
  }

  render() {
    return (
      <div className="discover">
        <div className="carousel">
          <Carousel interval="4000" type="card" height="200px">
            {this.state.imgList.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <img src={item.imageUrl} alt="" />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
        <div>
          <RecommendSongs
            data={this.state.songSheet}
            toDetails={this.toDetails.bind(this)}
          />
        </div>
      </div>
    )
  }

  getBanner() {
    axios('banner').then(res => {
      if (res.code === 200) {
        this.setState({
          imgList: res.banners
        })
      }
    })
  }

  getSongSheet() {
    axios('personalized', { limit: 10 }).then(res => {
      if (res.code === 200) {
        this.setState({
          songSheet: res.result
        })
      }
    })
  }

  toDetails(id) {
    this.props.history.push({ pathname: `/song-sheet-details/${id}` })
  }
}

export default Discover
