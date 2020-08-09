import React, { useEffect } from "react";
import { Popover } from "antd";
import WhiteTheme from "../../common/scss/theme/white-theme";
import BlackTheme from "../../common/scss/theme/black-theme";
import "./header.scss";

const Header: React.FC<any> = React.memo(() => {
  useEffect(() => {
    setTheme(1);
  }, []);

  function setTheme(key) {
    const theme = key ? WhiteTheme : BlackTheme;
    Object.keys(theme).forEach((color) => {
      document.documentElement.style.setProperty(color, theme[color]);
    });
  }

  return (
    <header className="header">
      <div className="navWrap">
        <div className="back" onClick={() => window.history.back()}>
          <i className="iconfont icon-back"></i>
        </div>
        <div className="next" onClick={() => window.history.go(1)}>
          <i className="iconfont icon-next"></i>
        </div>
      </div>
      <div className="title">GHC-Music</div>
      <Popover
        content={
          <div className="color">
            <div className="black" onClick={() => setTheme(0)}>
              <div className="blackInner"></div>
              <p>黑色</p>
            </div>
            <div className="white" onClick={() => setTheme(1)}>
              <div className="whiteInner"></div>
              <p>浅色</p>
            </div>
          </div>
        }
      >
        <i className="iconfont icon-zhuti" id="zhuti"></i>
      </Popover>
    </header>
  );
});

export default Header;
