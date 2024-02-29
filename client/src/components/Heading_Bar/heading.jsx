import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../logo";
import { IoIosNotificationsOutline } from "react-icons/io";
import HamburgerMenu from "../hamburger_menu/hamburgerMenu";
import { toggleNotificationPanel } from "@features/notificationSlice";
import "@styles/heading.scss";

const HeaderBar = ({ navStatus, setNavStatus }) => {
  const notificationPanel = useSelector(
    (state) => state.notificationPanel.value
  );
  const dispatch = useDispatch();
  const toggleNavigation = () => {
    if (navStatus == "open") {
      setNavStatus("close");
    } else {
      setNavStatus("open");
      dispatch(toggleNotificationPanel("close"));
    }
  };

  const toggleNotification = () => {
    if (notificationPanel == "open") {
      dispatch(toggleNotificationPanel("close"));
    } else {
      dispatch(toggleNotificationPanel("open"));
      setNavStatus("close");
    }
  };
  return (
    <>
      <header>
        <HamburgerMenu state={navStatus} toggle={toggleNavigation} />
        <Logo />
        <div
          className={`notification-icon ${notificationPanel}-notification`}
          onClick={toggleNotification}
        >
          <IoIosNotificationsOutline size="35px" />
        </div>
      </header>
    </>
  );
};

export default HeaderBar;
