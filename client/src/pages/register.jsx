import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiShow, BiHide, BiArrowBack } from "react-icons/bi";
import Logo from "../components/logo";
import "../styles/register.scss";
const Register = ({ activeForm, setActiveForm }) => {
  const [activePage, setActivePage] = useState("first");

  const switchForm = () => {
    setActiveForm(activeForm);
  };

  return (
    <>
      <div className="signup-form-container" aria-expanded={activeForm}>
        {activePage == "first" && (
          <>
            <header>
              <Logo />
              <button className="signin-btn" onClick={switchForm}>
                SIGN IN
              </button>
            </header>
            <PageOne
              activeForm={activeForm}
              switchForm={switchForm}
              setActivePage={setActivePage}
            />
          </>
        )}
        {activePage == "second" && <PageTwo setActivePage={setActivePage} />}
      </div>
    </>
  );
};

export default Register;

const PageOne = ({ switchForm, setActivePage }) => {
  const next = () => {
    setActivePage("second");
  };
  return (
    <>
      <form className="signup-form" onSubmit={next}>
        <h2>Sign Up</h2>
        <section className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" required />
        </section>
        <button className="signup-button" type="submit">
          SIGN UP
        </button>
        <p className="signin-link-responsive">
          Already Have an Account?{" "}
          <span className="signin-link" onClick={switchForm}>
            Sign In
          </span>
        </p>
        <p className="terms-condition-sentence">
          By signing up I agree to all the terms and conditions and pivacy
          policy.
        </p>
      </form>
    </>
  );
};

const PageTwo = ({ setActivePage }) => {
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
    <>
      <header>
        <Logo />
      </header>
      <form className="signup-form">
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
        <div
          className="back-icon"
          onClick={() => {
            setActivePage("first");
          }}
        >
          <BiArrowBack size="24px" />
          <span>Back</span>
        </div>
      </form>
    </>
  );
};

const PageThree = () => {
  return (
    <>
      <h1>PageThree</h1>
    </>
  );
};
