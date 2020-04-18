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

export default Volume
