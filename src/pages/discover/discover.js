import React from 'react'
import { Carousel } from 'element-react'
import axios from '_axios'
import './discover.scss'

class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      imgList: []
    }
  }

  componentDidMount() {
    this.getBanner()
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
      </div>
    )
  }

  getBanner() {
    axios('banner').then(res => {
      if (res.data.code === 200) {
        this.setState({
          imgList: res.data.banners
        })
      }
    })
  }
}

export default Discover
