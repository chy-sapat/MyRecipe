import React from "react";
import Logo from "../components/logo";
import "../styles/register.scss";
const Register = () => {
  return (
    <section className="register-form-container">
      <header>
        <Logo />
        <button className="signin-button">SIGN IN</button>
      </header>
      <form className="signup">
        <h2>Sign Up</h2>
        <section className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </section>
        <button className="signup-button">SIGN UP</button>
        <p>
          By signing up i agree all the terms and conditions and pivacy policy{" "}
        </p>
      </form>
    </section>
  );
};

export default Register;
