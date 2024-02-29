import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
//icons
import {
  FaFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
import {
  IoCreateOutline,
  IoAdd,
  IoNotificationsOutline,
} from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import Logo from "@components/logo";
import "@styles/nav.scss";
import { useGetUserId } from "@hooks/GetUserId";
import { logout } from "@features/signedInSlice";
import { removeDetails } from "@features/userDetailsSlice";
import HeaderBar from "@components/Heading_Bar/heading";
import { toggleNotificationPanel } from "@features/notificationSlice";

const Nav = ({ navStatus, setNavStatus }) => {
  const signedIn = useSelector((state) => state.signedIn.value);
  const userDetails = useSelector((state) => state.userDetail.value);
  const notificationPanel = useSelector(
    (state) => state.notificationPanel.value
  );
  const [cookie, _, removeCookie] = useCookies("access_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userId");
    setNavStatus("close");
    dispatch(logout());
    dispatch(removeDetails());
    navigate("/", { replace: true });
  };
  const toggleNotification = () => {
    if (notificationPanel == "open") {
      dispatch(toggleNotificationPanel("close"));
    } else {
      dispatch(toggleNotificationPanel("open"));
    }
  };
  return (
    <>
      <nav className={`${navStatus}-nav`}>
        <Logo />
        <section className="nav-user-profile">
          {!signedIn ? (
            <button
              className="signup-signin-btn"
              onClick={() => navigate("/auth")}
            >
              Sign In / Sign Up
            </button>
          ) : (
            <section className="user-profile-links">
              <section className="profile-picture">
                <img
                  src={`http://localhost:3000/assets/${userDetails.image}`}
                />
              </section>
              <section className="profile-menu">
                <h3 className="user-name">{userDetails.name}</h3>
                {/* <section className="followers">
                  <section className="count">
                    <span>{userDetails.followers.length}</span>
                    <span>Followers</span>
                  </section>
                  <section className="count">
                    <span>{userDetails.following.length}</span>
                    <span>Following</span>
                  </section>
                </section> */}
                <ul className="profile-menu-links">
                  <li>
                    <NavLink to="/create-recipe" className="profile-menu-link">
                      <div className="icon">
                        <IoCreateOutline size="20px" />
                      </div>
                      <span>New Recipe</span>
                    </NavLink>
                  </li>
                  <li
                    className="profile-menu-link notification-link"
                    onClick={toggleNotification}
                  >
                    <div className="icon">
                      <IoNotificationsOutline size="20px" />
                    </div>
                    <span>Notification</span>
                  </li>
                  <li className="profile-menu-link" onClick={handleLogout}>
                    <div className="icon">
                      <CiLogout size="20px" />
                    </div>
                    <span>Logout</span>
                  </li>
                </ul>
              </section>
            </section>
          )}
        </section>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className="nav-link">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/top-recipe" className="nav-link">
              Top Recipes
            </NavLink>
          </li>
          {signedIn && (
            <>
              <li>
                <NavLink to="/meal-planning" className="nav-link">
                  Meal Planning
                </NavLink>
              </li>
              <li>
                <NavLink to="/saved-recipe" className="nav-link">
                  Saved Recipe
                </NavLink>
              </li>
              <li>
                <NavLink to="/setting" className="nav-link">
                  Setting
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
