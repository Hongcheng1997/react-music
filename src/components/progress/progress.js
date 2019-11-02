import React from 'react'
import { connect } from 'react-redux'
import style from './progress.module.scss'
import { filterTime } from '@/common/helper/utils'

class Progress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            musicTime: 0,
            timer: null
        }
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

    render() {
        const { playList, currentIndex } = this.props
        const currentMusic = playList[currentIndex] || {}
        return (
            <div className={style.progress}>
                <span className={style.time}>00:00</span>
                <div className={style.bar}>
                    <div className={style.inner}>
                        <span className={style.point}>
                            <span className={style.pointInner}></span>
                        </span>
                    </div>
                </div>
                <span className={style.time}>{filterTime(currentMusic.dt)}</span>
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