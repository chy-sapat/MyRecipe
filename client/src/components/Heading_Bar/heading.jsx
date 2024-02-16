import React, { useState } from "react";
import Logo from "../logo";
import { IoIosNotificationsOutline } from "react-icons/io";
import HamburgerMenu from "../hamburger_menu/hamburgerMenu";
import "@styles/heading.scss";

const HeaderBar = ({
  navStatus,
  setNavStatus,
  notificationPanelOpen,
  setNotificationPanelOpen,
}) => {
  const toggleNavigation = () => {
    if (navStatus == "open") {
      setNavStatus("close");
    } else {
      setNavStatus("open");
      setNotificationPanelOpen("close");
    }
  };

  const toggleNotification = () => {
    if (notificationPanelOpen == "open") {
      setNotificationPanelOpen("close");
    } else {
      setNotificationPanelOpen("open");
      setNavStatus("close");
    }
  };
  return (
    <>
      <header>
        <HamburgerMenu state={navStatus} toggle={toggleNavigation} />
        <Logo />
        <div
          className={`notification-icon ${notificationPanelOpen}-notification`}
          onClick={toggleNotification}
        >
          <IoIosNotificationsOutline size="35px" />
        </div>
      </header>
    </>
  );
};

export default HeaderBar;
