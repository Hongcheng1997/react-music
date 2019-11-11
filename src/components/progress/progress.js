import React from 'react'
import ReactDOM from 'react-dom'
import style from './progress.module.scss'
import { formatTime } from '@/common/helper/utils'

class Progress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            musicTime: 0,
            timer: null,
            padding: false
        }
    }

    componentDidMount() {
        this.barLeft = ReactDOM.findDOMNode(this.refs._bar).offsetLeft
        this.barWidth = ReactDOM.findDOMNode(this.refs._bar).offsetWidth
        this.pointWidthHalf = ReactDOM.findDOMNode(this.refs._point).clientWidth / 2
    }

    refreshTime() {
        clearInterval(this.state.timer)
        this.setState({
            musicTime: 0
        })
        this.setState({
            timer: setInterval(() => {
                this.setState({
                    musicTime: this.state.musicTime + 1
                })
            }, 1000)
        })
    }

    onMouseDown(e) {
        const percent = this.setPoint(e)
        this.props.setPoint(percent)
        this.setState({
            padding: true
        })
    }

    onMouseMove(e) {
        if (this.state.padding) {
            this.setPoint(e)
        }
    }

    onMouseUp(e) {
        const percent = this.setPoint(e)
        this.props.setPoint(percent)
        this.setState({
            padding: false
        })
    }

    setPoint(e) {
        const X = Math.min(Math.max(e.pageX, this.barLeft - this.pointWidthHalf), this.barLeft + this.barWidth - this.pointWidthHalf)
        const percent = (X - this.barLeft + this.pointWidthHalf) / this.barWidth
        ReactDOM.findDOMNode(this.refs._inner).style.width = percent * 100 + '%'
        return percent
    }

    render() {
        const { currentTime, proportion, totalTime, showTimer } = this.props
        return (
            <div className={style.progress}>
                <div
                    className={style.bar}
                    ref="_bar"
                    onMouseDown={(e) => this.onMouseDown(e)}
                    onMouseMove={(e) => this.onMouseMove(e)}
                    onMouseUp={(e) => this.onMouseUp(e)}
                >
                    <div className={style.inner} ref="_inner" style={{ width: proportion * 100 + '%' }}>
                        <span ref="_point" className={style.point}>
                            <span className={style.pointInner}></span>
                        </span>
                    </div>
                </div>
                {showTimer && <span className={style.time}>{formatTime(currentTime) + '/' + formatTime(totalTime)}</span>}
            </div>
        )
    }
}

export default Progress