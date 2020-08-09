import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import style from './progress.module.scss'

let barLeft: number = 0
let barWidth: number = 0

const Progress: React.FC<any> = React.memo((props) => {
  const barEl = useRef<HTMLDivElement>()
  const innerEl = useRef<HTMLDivElement>()
  let [padding, setPadding] = useState(false)
  let [showPoint, setShowPoint] = useState(false)
  const { proportion, updateToProportion } = props

  useEffect(() => {
    barLeft = barEl.current.getBoundingClientRect().x
    barWidth = barEl.current.offsetWidth
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  })

  function onMouseDown(e) {
    setPoint(e)
    setPadding(true)
  }

  function onMouseMove(e) {
    padding && setPoint(e)
  }

  function onMouseUp(e) {
    if (padding) {
      setPoint(e)
      setPadding(false)
    }
  }

  function setPoint(e) {
    const pointOffsetWidth = e.pageX - barLeft
    const percent = pointOffsetWidth / barWidth
    updateToProportion(percent)
    return percent
  }

  return (
    <div className={style.progress}>
      <div
        className={style.bar}
        ref={barEl}
        onMouseDown={(e) => onMouseDown(e)}
        onMouseEnter={() => { setShowPoint(true) }}
        onMouseLeave={() => { setShowPoint(false) }}
      >
        <div className={style.inner} ref={innerEl} style={{ width: proportion * 100 + '%' }}>
          {(showPoint || padding) && <span className={style.point}></span>}
        </div>
      </div>
    </div>
  )
})

Progress.defaultProps = {
  proportion: 0
};

Progress.propTypes = {
  proportion: PropTypes.number,
  updateToProportion: PropTypes.func
}

export default Progress
