import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
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

    resetTime(e, dt) {
        const percent = (e.pageX - this.barLeft) / this.barWidth * 100
        ReactDOM.findDOMNode(this.refs._inner).style.width = percent + '%'
        this.props.setMusicTime(dt * percent / 100)
    }

    render() {
        const { playList, currentIndex, currentTime } = this.props
        const currentMusic = playList[currentIndex] || {}
        return (
            <div className={style.progress}>
                <span className={style.time}>{formatTime(currentTime)}</span>
                <div className={style.bar} ref="_bar" onClick={(e) => this.resetTime(e, currentMusic.dt)}>
                    <div className={style.inner} ref="_inner" style={{ width: currentTime / currentMusic.dt * 100 + '%' }}>
                        <span className={style.point}>
                            <span className={style.pointInner}></span>
                        </span>
                    </div>
                </div>
                <span className={style.time}>{formatTime(currentMusic.dt)}</span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    playList: state.playList,
    currentIndex: state.currentIndex
})

export default connect(
    mapStateToProps
)(Progress)