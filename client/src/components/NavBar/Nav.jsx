import React from "react";

import Logo from "../logo";
import "../../styles/nav.scss";

const Nav = () => {
  return (
    <nav>
      <Logo />
      <ul className="nav-links">
        <li>Feed</li>
        <li>Meal Planning</li>
        <li>Saved Recipe</li>
      </ul>
    </nav>
  );
};

export default Nav;
