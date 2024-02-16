import React from "react";
import "../styles/logo.scss";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="logo" onClick={() => navigate("/")}>
        MyRecipe
      </h1>
    </>
  );
};

export default Logo;
