import React, { PureComponent } from 'react'
import Progress from '../progress/progress'
import style from './index.module.scss'

class Volume extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showVolum: false
    }
    this.volumeTimer = null
    this.handleIconEnter = this.handleIconEnter.bind(this)
    this.handleIconLeave = this.handleIconLeave.bind(this)
    this.handleSoundEnter = this.handleSoundEnter.bind(this)
    this.handleSoundLeave = this.handleSoundLeave.bind(this)
    this.handleVolume = this.handleVolume.bind(this)
    this.soundIcon = this.soundIcon.bind(this)
  }

  render() {
    const { showVolum } = this.state
    const { volume, setVolume } = this.props
    return (
      <div className={style.wrapToPoint}>
        <i
          className={this.soundIcon()}
          onClick={this.handleVolume}
          onMouseEnter={this.handleIconEnter}
          onMouseLeave={this.handleIconLeave}
        ></i>
        {
          showVolum &&
          <div
            className={style.volumeWrap}
            onMouseEnter={this.handleSoundEnter}
            onMouseLeave={this.handleSoundLeave}
          >
            <Progress proportion={volume} updateToProportion={setVolume} />
          </div>
        }
      </div>
    )
  }

  handleVolume() {
    const volume = this.props.volume ? 0 : 1
    this.props.setVolume(volume)
  }

  handleIconEnter() {
    this.setState({
      showVolum: true
    })
  }

  handleIconLeave() {
    this.volumeTimer = setTimeout(() => {
      this.setState({
        showVolum: false
      })
    }, 1000)
  }

  handleSoundEnter() {
    clearTimeout(this.volumeTimer)
  }

  handleSoundLeave() {
    setTimeout(() => {
      this.setState({
        showVolum: false
      })
    }, 1000)
  }

  soundIcon() {
    return this.props.volume ? 'iconfont icon-soundsize' : 'iconfont icon-jingyin'
  }
}

export default Volume
