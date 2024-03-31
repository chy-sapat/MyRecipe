import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import HeaderBar from "@components/Heading_Bar/heading";
import Nav from "@components/NavBar/Nav";
import "@styles/layout.scss";
import Feed from "./feed";
import NotificationPanel from "@components/notification_panel/notificationPanel";
import { login } from "@features/signedInSlice";
import { setDetails } from "@features/userDetailsSlice";
import { useGetUserId } from "@hooks/GetUserId";
import CreateRecipe from "@components/Create_Recipe/createRecipe";
import Popup from "@components/popup/popup";
import PostDetails from "@components/Posts/postDetails";
import Profile from "./Profile";
import SearchList from "@components/search/searchList";
import TopRecipe from "./topRecipe";

const Layout = () => {
  const [navStatus, setNavStatus] = useState("close");
  const [notificationPanelOpen, setNotificationPanelOpen] = useState("close");
  const [cookie, _] = useCookies("access_token");
  const signedIn = useSelector((state) => state.signedIn.value);
  const userDetails = useSelector((state) => state.userDetail.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = useGetUserId();

  const fetchuserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth/fetch-user-data/${userId}`
      );
      dispatch(setDetails(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  //Close Sidebar when location is changed
  useEffect(() => {
    setNavStatus("close");
  }, [location]);

  useEffect(() => {
    if (cookie.access_token) {
      !signedIn && dispatch(login());
      fetchuserData();
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
            <Popup />
            <Routes>
              <Route index element={<Feed />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/top-recipe" element={<TopRecipe />} />
              <Route path="/recipe/:id" element={<PostDetails />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/search/:keyword" element={<SearchList />} />
            </Routes>
          </section>
          <NotificationPanel notificationPanelOpen={notificationPanelOpen} />
        </main>
      </div>
    </>
  );
};

export default Layout;
