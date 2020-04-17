import React, { useEffect } from 'react'
import { Popover } from 'antd'
import style from './header.module.scss'
import WhiteTheme from '../../common/scss/theme/white-theme'
import BlackTheme from '../../common/scss/theme/black-theme'

const Header = React.memo(() => {
  useEffect(() => {
    setTheme(1)
  }, [])

  function setTheme(key) {
    const theme = key ? WhiteTheme : BlackTheme
    Object.keys(theme).forEach(color => {
      document.documentElement.style.setProperty(color, theme[color])
    })
  }


  function back() {
    window.history.back()
  }

  function prve() {
    window.history.go(1)
  }

  return (
    <header className={style.header}>
      <div className={style.navWrap}>
        <div className={style.back} onClick={back}>
          <i className="iconfont icon-back"></i>
        </div>
        <div className={style.next} onClick={prve}>
          <i className="iconfont icon-next"></i>
        </div>
      </div>
      <div className={style.title}>GHC-Music</div>
      <Popover content={
        <div className={style.color}>
          <div className={style.black} onClick={() => setTheme(0)}>
            <div className={style.blackInner}></div>
            <p>黑色</p>
          </div>
          <div className={style.white} onClick={() => setTheme(1)}>
            <div className={style.whiteInner}></div>
            <p>浅色</p>
          </div>
        </div>
      }>
        <i className="iconfont icon-zhuti" id={style.zhuti}></i>
      </Popover>
    </header>
  )
})

export default Header
