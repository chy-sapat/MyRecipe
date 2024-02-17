import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import defaultProfileImg from "@assets/defaultprofile.jpg";
//icons
import {
  FaFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";

import { logout } from "@features/signedInSlice";
import "../../styles/nav.scss";
import { useGetUserDetail } from "@hooks/GetUserDetails";

const Nav = ({ navStatus, setNavStatus }) => {
  const signedIn = useSelector((state) => state.signedIn.value);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [cookie, _, removeCookie] = useCookies("access_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useGetUserDetail();
  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user-detail");
    setNavStatus("close");
    dispatch(logout());
  };
  return (
    <>
      <nav className={`${navStatus}-nav`}>
        {!signedIn ? (
          <button onClick={() => navigate("/auth")}>Sign In / Sign Up</button>
        ) : (
          <section className="user-profile-link">
            <section className="profile-picture">
              <img src={`http://localhost:3000/assets/default.jpg`} />
            </section>
            <h3 className="user-name">{userDetails.name}</h3>
          </section>
        )}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link">
              Explore
            </NavLink>
          </li>
          {signedIn && (
            <li>
              <NavLink to="/create-recipe" className="nav-link">
                Create Recipe
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/top-recipe" className="nav-link">
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-recipe" className="nav-link">
              Meal Planner
            </NavLink>
          </li>
        </ul>
        {signedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        )}
        <section className="socials-links-icons">
          <div className="facebook-icon">
            <Link to="https://www.facebook.com/neha.maharjan.3114">
              <FaFacebook size="30px" />
            </Link>
          </div>
          <div className="instagram-icon">
            <Link to="https://www.instagram.com/ne.hahahen?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <FaSquareInstagram size="30px" />
            </Link>
          </div>
          <div className="x-icon">
            <Link to="#">
              <FaSquareXTwitter size="30px" />
            </Link>
          </div>
        </section>
        <section className="sidebar-bottom-links">
          <span>About us</span>
          <span>Contact us</span>
          <span>Terms and Conditions</span>
          <span>Privacy Policy</span>
        </section>
      </nav>
    </>
  );
};

export default Nav;
