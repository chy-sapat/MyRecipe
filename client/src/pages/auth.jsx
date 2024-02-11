import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import "../styles/auth.scss";

//Images
import picOne from "../assets/pic1.jpeg";
import picTwo from "../assets/pic2.jpeg";
import picThree from "../assets/pic3.jpeg";

const Auth = () => {
  const [activeForm, setActiveForm] = useState(true);
  return (
    <>
      <div className="auth-container">
        <Login activeForm={activeForm} setActiveForm={setActiveForm} />
        <Register activeForm={!activeForm} setActiveForm={setActiveForm} />
        <section className="bg-image">
          <section className="slogan">
            <p className="title">Discover and Share Irresistible Recipes</p>
            <p className="subtitle">
              Unleash Your Culinary Creativity with Our Global Community.
            </p>
          </section>
          <section className="img-collage">
            <img src={picThree} />
            <img src={picTwo} />
            <img src={picOne} />
          </section>
        </section>
      </div>
    </>
  );
};
export default Auth;
