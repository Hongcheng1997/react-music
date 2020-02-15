import React from 'react'
import { Popover } from 'antd'
import style from './header.module.scss'
import WhiteTheme from '../../common/scss/theme/white-theme'
import BlackTheme from '../../common/scss/theme/black-theme'

class Header extends React.Component {
  render() {
    return (
      <header className={style.header}>
        <div className={style.back} onClick={this.back}>
          <i className="iconfont icon-back"></i>
        </div>
        <div className={style.next} onClick={this.prve}>
          <i className="iconfont icon-next"></i>
        </div>
        <Popover content={
          <div className={style.color}>
            <div className={style.black} onClick={() => this.setTheme(0)}>
              <div className={style.blackInner}></div>
              <p>黑色</p>
            </div>
            <div className={style.white} onClick={() => this.setTheme(1)}>
              <div className={style.whiteInner}></div>
              <p>浅色</p>
            </div>
          </div>
        }>
          <i className="iconfont icon-zhuti"></i>
        </Popover>
      </header>
    )
  }

  componentDidMount() {
    this.setTheme(1)
  }

  setTheme(key) {
    const theme = key ? WhiteTheme : BlackTheme
    Object.keys(theme).forEach(color => {
      document.documentElement.style.setProperty(color, theme[color])
    })
  }

  back() {
    window.history.back()
  }

  prve() {
    window.history.go(1)
  }
}

export default Header
