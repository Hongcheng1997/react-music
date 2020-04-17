import React, { useState } from 'react'
import Progress from '../progress/progress'
import style from './index.module.scss'

let volumeTimer = null

const Volume = React.memo((props) => {
  let [showVolum, setShowVolum] = useState(false)
  const { volume, setVolume } = props

  function handleVolume() {
    setVolume(volume ? 0 : 1)
  }

  function handleIconEnter() {
    setShowVolum(true)
  }

  function handleIconLeave() {
    volumeTimer = setTimeout(() => {
      setShowVolum(false)
    }, 1000)
  }

  function handleSoundEnter() {
    clearTimeout(volumeTimer)
  }

  function handleSoundLeave() {
    setTimeout(() => {
      setShowVolum(false)
    }, 1000)
  }

  function soundIcon() {
    return volume ? 'iconfont icon-yinlianglabashengyin-xianxing' : 'iconfont icon-jingyin'
  }

  return (
    <div className={style.wrapToPoint}>
      <i
        className={soundIcon()}
        onClick={handleVolume}
        onMouseEnter={handleIconEnter}
        onMouseLeave={handleIconLeave}
      ></i>
      {
        showVolum &&
        <div
          className={style.volumeWrap}
          onMouseEnter={handleSoundEnter}
          onMouseLeave={handleSoundLeave}
        >
          <Progress proportion={volume} updateToProportion={setVolume} />
        </div>
      }
    </div>
  )
})
// class Volume extends PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       showVolum: false
//     }
//     this.volumeTimer = null
//     this.handleIconEnter = this.handleIconEnter.bind(this)
//     this.handleIconLeave = this.handleIconLeave.bind(this)
//     this.handleSoundEnter = this.handleSoundEnter.bind(this)
//     this.handleSoundLeave = this.handleSoundLeave.bind(this)
//     this.handleVolume = this.handleVolume.bind(this)
//     this.soundIcon = this.soundIcon.bind(this)
//   }

//   render() {
//     const { showVolum } = this.state
//     const { volume, setVolume } = this.props
//     return (
//       <div className={style.wrapToPoint}>
//         <i
//           className={this.soundIcon()}
//           onClick={this.handleVolume}
//           onMouseEnter={this.handleIconEnter}
//           onMouseLeave={this.handleIconLeave}
//         ></i>
//         {
//           showVolum &&
//           <div
//             className={style.volumeWrap}
//             onMouseEnter={this.handleSoundEnter}
//             onMouseLeave={this.handleSoundLeave}
//           >
//             <Progress proportion={volume} updateToProportion={setVolume} />
//           </div>
//         }
//       </div>
//     )
//   }

//   handleVolume() {
//     const volume = this.props.volume ? 0 : 1
//     this.props.setVolume(volume)
//   }

//   handleIconEnter() {
//     this.setState({
//       showVolum: true
//     })
//   }

//   handleIconLeave() {
//     this.volumeTimer = setTimeout(() => {
//       this.setState({
//         showVolum: false
//       })
//     }, 1000)
//   }

//   handleSoundEnter() {
//     clearTimeout(this.volumeTimer)
//   }

//   handleSoundLeave() {
//     setTimeout(() => {
//       this.setState({
//         showVolum: false
//       })
//     }, 1000)
//   }

//   soundIcon() {
//     return this.props.volume ? 'iconfont icon-yinlianglabashengyin-xianxing' : 'iconfont icon-jingyin'
//   }
// }

export default Volume
