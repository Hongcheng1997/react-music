import React, { PureComponent } from "react";
import style from './slider-block.module.scss'

class SliderBlock extends PureComponent {
  render() {
    const { item } = this.props
    return (
      <div className={style.wrap}>
        <img src={item.coverImgUrl} alt=""></img>
        <div className={style.playCount}>
          <i className="iconfont icon-erji"></i>
          {(item.playCount / 10000).toFixed(1)} 万
        </div>
        <div className={style.mask}>
          <i className="iconfont icon-bofang1"></i>
        </div>
      </div>
    )
  }
}

export default SliderBlock
