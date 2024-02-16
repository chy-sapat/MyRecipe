import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../../styles/nav.scss";

const Nav = ({ navStatus }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className={`${navStatus}-nav`}>
        {/* <Logo /> */}
        <button onClick={() => navigate("/auth")}>Sign In / Sign Up</button>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/top-recipe" className="nav-link">
              Top Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-recipe" className="nav-link">
              Saved Recipes
            </NavLink>
          </li>
          {/* <li>
            <a href="#" className="nav-link">
              Feed
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Saved Recipe
            </a>
          </li> */}
        </ul>
        {isSignedIn && <button>Log Out</button>}
      </nav>
    </>
  );
};

export default Nav;
