import React from 'react'
import ReactDOM from 'react-dom'
import style from './progress.module.scss'
import { formatTime } from '@/common/helper/utils'

class Progress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            musicTime: 0,
            timer: null
        }
    }

    componentDidMount() {
        this.barLeft = ReactDOM.findDOMNode(this.refs._bar).offsetLeft
        this.barWidth = ReactDOM.findDOMNode(this.refs._bar).offsetWidth
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

    resetTime(e) {
        const percent = (e.pageX - this.barLeft) / this.barWidth
        ReactDOM.findDOMNode(this.refs._inner).style.width = percent * 100 + '%'
        this.props.setPoint(percent)
    }

    render() {
        const { currentTime, proportion, totalTime } = this.props
        return (
            <div className={style.progress}>
                {currentTime && <span className={style.time}>{formatTime(currentTime)}</span>}
                <div className={style.bar} ref="_bar" onClick={(e) => this.resetTime(e)}>
                    <div className={style.inner} ref="_inner" style={{ width: proportion * 100 + '%' }}>
                        <span className={style.point}>
                            <span className={style.pointInner}></span>
                        </span>
                    </div>
                </div>
                {totalTime && <span className={style.time}>{formatTime(totalTime)}</span>}
            </div>
        )
    }
}

export default Progress