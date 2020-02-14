import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import style from './progress.module.scss'

class Progress extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      padding: false,
      showPoint: false
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  render() {
    const { proportion } = this.props
    const { showPoint, padding } = this.state
    return (
      <div className={style.progress}>
        <div
          className={style.bar}
          ref="_bar"
          onMouseDown={(e) => this.onMouseDown(e)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <div className={style.inner} ref="_inner" style={{ width: proportion * 100 + '%' }}>
            {(showPoint || padding) && <span className={style.point}></span>}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // 元素距离屏幕 x 轴坐标
    this.barLeft = ReactDOM.findDOMNode(this.refs._bar).getBoundingClientRect().x
    this.barWidth = ReactDOM.findDOMNode(this.refs._bar).offsetWidth
    this.bindEvents()
  }

  componentWillUnmount() {
    this.unbindEvents()
  }

  onMouseDown(e) {
    this.setPoint(e)
    this.setState({
      padding: true
    })
  }

  onMouseMove(e) {
    this.state.padding && this.setPoint(e)
  }

  onMouseUp(e) {
    if (this.state.padding) {
      this.setPoint(e)
      this.setState({
        padding: false
      })
    }
  }

  onMouseEnter() {
    this.setState({
      showPoint: true
    })
  }

  onMouseLeave() {
    this.setState({
      showPoint: false
    })
  }

  setPoint(e) {
    const pointOffsetWidth = e.pageX - this.barLeft
    const percent = pointOffsetWidth / this.barWidth
    this.props.updateToProportion(percent)
    return percent
  }

  bindEvents() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  unbindEvents() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this))
    document.removeEventListener('mouseup', this.onMouseUp.bind(this))
  }
}

Progress.defaultProps = {
  proportion: 0
};

Progress.propTypes = {
  proportion: PropTypes.number,
  updateToProportion: PropTypes.func
}

export default Progress
