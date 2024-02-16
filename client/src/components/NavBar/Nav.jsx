import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { logout } from "@features/signedInSlice";
import "../../styles/nav.scss";

const Nav = ({ navStatus, setNavStatus }) => {
  const signedIn = useSelector((state) => state.signedIn.value);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [cookie, _, removeCookie] = useCookies("access_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userId");
    setNavStatus("close");
    dispatch(logout());
  };
  return (
    <>
      <nav className={`${navStatus}-nav`}>
        {!signedIn && (
          <button onClick={() => navigate("/auth")}>Sign In / Sign Up</button>
        )}
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
        {signedIn && <button onClick={handleLogout}>Log Out</button>}
      </nav>
    </>
  );
};

export default Nav;
