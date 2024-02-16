import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HeaderBar from "@components/Heading_Bar/heading";
import Nav from "@components/NavBar/Nav";
import "@styles/layout.scss";
import Feed from "./feed";
import NotificationPanel from "@components/notification_panel/notificationPanel";

const Layout = () => {
  const [navStatus, setNavStatus] = useState("close");
  const [notificationPanelOpen, setNotificationPanelOpen] = useState("close");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const location = useLocation();

  //Close Sidebar when location is changed
  useEffect(() => {
    setNavStatus("close");
  }, [location]);
  return (
    <>
      <div className="layout-container">
        <HeaderBar
          navStatus={navStatus}
          setNavStatus={setNavStatus}
          notificationPanelOpen={notificationPanelOpen}
          setNotificationPanelOpen={setNotificationPanelOpen}
        />
        <main>
          <Nav navStatus={navStatus} />
          <section className="main-body">
            <Routes>
              <Route index element={<Feed />} />
              <Route
                path="/top-recipe"
                element={<h1>This section shows all the top recipes</h1>}
              />
              <Route
                path="/saved-recipe"
                element={<h1>This section shows all the saved recipes</h1>}
              />
            </Routes>
          </section>
          <NotificationPanel notificationPanelOpen={notificationPanelOpen} />
        </main>
      </div>
    </>
  );
};

export default Layout;
