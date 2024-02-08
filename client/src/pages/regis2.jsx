import React, { useState } from "react";
import Logo from "../components/logo";
import "../styles/register.scss";
import { BiShow, BiHide } from "react-icons/bi";

const Regis2 = () => {
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordFieldType == "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
    setPasswordVisibility(!passwordVisiblity);
  };
  return (
    <section className="register-form-container">
      <header>
        <Logo />
        <button className="signin-button">SIGN IN</button>
      </header>
      <form className="signup">
        <h2>Create Password</h2>
        <section className="form-group">
          <label htmlFor="password">Password</label>
          <input type={passwordFieldType} id="password" required />
          <div
            className="show-hide-icon"
            onClick={togglePasswordVisibility}
            title="show/hide password"
          >
            {passwordVisiblity ? (
              <BiHide size="22px" />
            ) : (
              <BiShow size="22px" />
            )}
          </div>
        </section>
        <section className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input type={passwordFieldType} id="password" required />
          <div
            className="show-hide-icon"
            onClick={togglePasswordVisibility}
            title="show/hide password"
          >
            {passwordVisiblity ? (
              <BiHide size="22px" />
            ) : (
              <BiShow size="22px" />
            )}
          </div>
        </section>
        <button className="signup-button">NEXT</button>
      </form>
    </section>
  );
};

export default Regis2;
