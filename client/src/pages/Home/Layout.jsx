import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";

import HeaderBar from "@components/Heading_Bar/heading";
import Nav from "@components/NavBar/Nav";
import "@styles/layout.scss";
import Feed from "./feed";
import NotificationPanel from "@components/notification_panel/notificationPanel";
import { login } from "@features/signedInSlice";

const Layout = () => {
  const [navStatus, setNavStatus] = useState("close");
  const [notificationPanelOpen, setNotificationPanelOpen] = useState("close");
  const [cookie, _] = useCookies("access_token");
  const signedIn = useSelector((state) => state.signedIn.value);
  const dispatch = useDispatch();
  const location = useLocation();

  //Close Sidebar when location is changed
  useEffect(() => {
    setNavStatus("close");
  }, [location]);

  useEffect(() => {
    if (cookie.access_token) {
      !signedIn && dispatch(login());
    }
  }, [dispatch]);
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
          <Nav navStatus={navStatus} setNavStatus={setNavStatus} />
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