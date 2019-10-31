import React from 'react'
import style from './header.module.scss'

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
      </header>
    )
  }

  back() {
    window.history.back()
  }

  prve() {
    window.history.go(1)
  }
}

export default Header
