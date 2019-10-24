import React from 'react';
import './header.scss'

class Header extends React.Component {
  render() {
    return <header>
      <div className="back">
        <i className="iconfont icon-back"></i>
      </div>
      <div className="next">
        <i className="iconfont icon-next"></i>
      </div>
    </header>
  }
}

export default Header
