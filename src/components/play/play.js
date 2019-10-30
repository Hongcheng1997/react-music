import React from 'react'
import './play.scss'
import { connect } from 'react-redux'
import { setNum } from '../../store/actions'

class Play extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props)
    this.props.setNum(true)
    console.log(this.props)
  }

  render() {
    return (
      <div className="play">
        <div className="cutSong">
          <div className="left">
            <i className="iconfont icon-bofangqi-xiayiji-copy"></i>
          </div>
          <div className="center">
            <i className="iconfont icon-bofangqi-bofang"></i>
          </div>
          <div className="right">
            <i className="iconfont icon-bofangqi-xiayiji"></i>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  num: state.num
})

const mapDispatchToProps = dispatch => ({
  setNum: status => {
    dispatch(setNum(status))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
