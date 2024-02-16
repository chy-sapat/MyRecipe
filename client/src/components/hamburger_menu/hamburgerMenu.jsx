import React from "react";
import "./hamburgerMenu.scss";

const HamburgerMenu = ({ state, toggle }) => {
  return (
    <div className={`hamburger ${state}-menu`} onClick={toggle}>
      <div className="top"></div>
      <div className="middle"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default HamburgerMenu;
