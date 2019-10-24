import React from 'react'
import { Carousel } from 'element-react'
import './discover.scss'

const imgList = [
  'http://p1.music.126.net/58e4BC8iPZOYomzamARtzA==/109951164445608808.jpg',
  'http://p1.music.126.net/hRJA-Y4dJQNW77whuuC8wQ==/109951164444891048.jpg',
  'http://p1.music.126.net/Usy35LGvaxU8dm41y_7p3Q==/109951164444907059.jpg'
]
class Discover extends React.Component {
  render() {
    return (
      <div className="discover">
        <div className="carousel">
          <Carousel interval="4000" type="card" height="200px">
            {imgList.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <img src={item} alt="" />
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default Discover
